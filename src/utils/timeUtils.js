const maxDateMilliseconds = 8.64e15;
const millisecondsInSecond = 1000;
const autoMillisecondsThreshold = 100_000_000_000;

export const parseTimestamp = (input, unit = "auto") => {
    const valueText = String(input ?? "").trim();
    if (!valueText) return { ok: false, error: "Enter a timestamp to convert." };
    if (!/^-?\d+(?:\.\d+)?$/.test(valueText)) return { ok: false, error: "Use a number, with an optional decimal point and leading minus sign." };

    const value = Number(valueText);
    if (!Number.isFinite(value)) return { ok: false, error: "That timestamp is outside the supported range." };
    const detectedUnit = unit === "auto"
        ? Math.abs(value) >= autoMillisecondsThreshold ? "milliseconds" : "seconds"
        : unit;
    if (detectedUnit !== "seconds" && detectedUnit !== "milliseconds") return { ok: false, error: "Choose seconds, milliseconds, or automatic detection." };

    const milliseconds = detectedUnit === "seconds" ? value * millisecondsInSecond : value;
    if (!Number.isFinite(milliseconds) || Math.abs(milliseconds) > maxDateMilliseconds) return { ok: false, error: "That timestamp is outside the supported date range." };
    const date = new Date(milliseconds);
    if (Number.isNaN(date.getTime())) return { ok: false, error: "That timestamp is outside the supported date range." };

    return { ok: true, date, milliseconds: date.getTime(), unit: detectedUnit };
};

export const parseLocalDateTime = (input) => {
    const value = String(input ?? "").trim();
    if (!value) return { ok: false, error: "Choose a date and time to convert." };
    const parts = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?$/);
    if (!parts) return { ok: false, error: "Choose a valid local date and time." };
    const date = new Date(value);
    const [, year, month, day, hour, minute, second = "0", fraction = ""] = parts;
    const millisecond = Number(fraction.padEnd(3, "0"));
    if (
        Number.isNaN(date.getTime())
        || date.getFullYear() !== Number(year)
        || date.getMonth() + 1 !== Number(month)
        || date.getDate() !== Number(day)
        || date.getHours() !== Number(hour)
        || date.getMinutes() !== Number(minute)
        || date.getSeconds() !== Number(second)
        || date.getMilliseconds() !== millisecond
    ) return { ok: false, error: "That local date and time does not exist." };
    return { ok: true, date, milliseconds: date.getTime() };
};

export const formatDateTimeLocal = (date) => {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
    const pad = (value) => String(value).padStart(2, "0");
    return `${String(date.getFullYear()).padStart(4, "0")}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

export const formatEpochPair = (milliseconds) => ({
    seconds: (milliseconds / millisecondsInSecond).toFixed(3).replace(/\.?0+$/, ""),
    milliseconds: String(Math.trunc(milliseconds)),
});

export const formatRelativeTime = (targetMilliseconds, baseMilliseconds = Date.now()) => {
    const differenceSeconds = Math.round((targetMilliseconds - baseMilliseconds) / millisecondsInSecond);
    if (Math.abs(differenceSeconds) < 2) return "just now";
    const relative = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
    const units = [
        [31_536_000, "year"],
        [2_592_000, "month"],
        [86_400, "day"],
        [3_600, "hour"],
        [60, "minute"],
        [1, "second"],
    ];
    const [unitSeconds, unitName] = units.find(([seconds]) => Math.abs(differenceSeconds) >= seconds) || units.at(-1);
    return relative.format(Math.round(differenceSeconds / unitSeconds), unitName);
};

export const formatDateDetails = (date, nowMilliseconds = Date.now()) => {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) return null;
    const timezone = new Intl.DateTimeFormat(undefined, { timeZoneName: "short" }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value || "Local time";
    return {
        iso: date.toISOString(),
        local: new Intl.DateTimeFormat(undefined, { dateStyle: "full", timeStyle: "long" }).format(date),
        utc: date.toUTCString(),
        timezone,
        relative: formatRelativeTime(date.getTime(), nowMilliseconds),
        weekday: new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(date),
    };
};
