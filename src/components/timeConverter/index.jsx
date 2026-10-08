import { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowDownLeft, FiArrowUpRight, FiCheck, FiClock, FiCopy } from "react-icons/fi";
import DateInput from "../dateInput/index.jsx";
import TimeResult from "../timeResult/index.jsx";
import TimestampInput from "../timestampInput/index.jsx";
import { formatDateDetails, formatDateTimeLocal, formatEpochPair, parseLocalDateTime, parseTimestamp } from "../../utils/timeUtils.js";
import styles from "./styles.module.css";

const knownTimestampMilliseconds = {
    epoch: 0,
    y2k: 946684800000,
};

const TimeConverter = () => {
    const [mode, setMode] = useState("timestamp");
    const [timestampValue, setTimestampValue] = useState(() => String(Math.floor(Date.now() / 1000)));
    const [timestampUnit, setTimestampUnit] = useState("auto");
    const [dateValue, setDateValue] = useState(() => formatDateTimeLocal(new Date()));
    const [now, setNow] = useState(() => Date.now());
    const [copied, setCopied] = useState("");
    const [copyNotice, setCopyNotice] = useState("");
    const copyTimer = useRef(null);

    useEffect(() => {
        const timerId = window.setInterval(() => setNow(Date.now()), 1000);
        return () => window.clearInterval(timerId);
    }, []);

    useEffect(() => () => window.clearTimeout(copyTimer.current), []);

    const conversion = mode === "timestamp"
        ? parseTimestamp(timestampValue, timestampUnit)
        : parseLocalDateTime(dateValue);
    const details = conversion.ok ? formatDateDetails(conversion.date, now) : null;
    const epochPair = conversion.ok && mode === "date" ? formatEpochPair(conversion.milliseconds) : null;
    const currentDate = new Date(now);
    const currentDetails = formatDateDetails(currentDate, now);
    const currentTimeLabel = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(currentDate);
    const currentTimestamp = formatEpochPair(now);
    const interpretedUnit = conversion.ok && mode === "timestamp" ? conversion.unit : timestampUnit;

    const copyValue = useCallback(async (value, label) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(label);
            setCopyNotice(`${label} copied to clipboard.`);
            window.clearTimeout(copyTimer.current);
            copyTimer.current = window.setTimeout(() => setCopied(""), 1400);
        } catch {
            setCopied("");
            setCopyNotice("Clipboard access is unavailable in this browser.");
        }
    }, []);

    const setTimestampPreset = (preset) => {
        const milliseconds = preset === "now" ? Date.now() : knownTimestampMilliseconds[preset];
        const value = timestampUnit === "milliseconds" ? milliseconds : Math.floor(milliseconds / 1000);
        setTimestampValue(String(value));
        setCopyNotice("");
    };

    const setDatePreset = (preset) => {
        const milliseconds = preset === "now" ? Date.now() : knownTimestampMilliseconds[preset];
        setDateValue(formatDateTimeLocal(new Date(milliseconds)));
        setCopyNotice("");
    };

    return (
        <section className={styles.converter} id="converter" aria-labelledby="converter-title">
            <div className={styles.converterHeader}>
                <div><p className={styles.sectionLabel}>Convert time</p><h2 id="converter-title">One moment, two formats.</h2><span>Move between epoch numbers and dates with the timezone made clear.</span></div>
                <div className={styles.liveBadge}><i /> Updating clock</div>
            </div>
            <div className={styles.nowCard}>
                <div className={styles.clockReadout}>
                    <span><FiClock aria-hidden="true" /> YOUR LOCAL TIME <b>{currentDetails.timezone}</b></span>
                    <time dateTime={currentDate.toISOString()}>{currentTimeLabel}</time>
                    <small>{currentDetails.local}</small>
                </div>
                <div className={styles.nowValues}>
                    <div><span>SECONDS</span><code>{currentTimestamp.seconds}</code><button type="button" onClick={() => copyValue(currentTimestamp.seconds, "Current seconds")} aria-label="Copy current Unix timestamp in seconds">{copied === "Current seconds" ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}<span>{copied === "Current seconds" ? "Copied" : "Copy"}</span></button></div>
                    <div><span>MILLISECONDS</span><code>{currentTimestamp.milliseconds}</code><button type="button" onClick={() => copyValue(currentTimestamp.milliseconds, "Current milliseconds")} aria-label="Copy current Unix timestamp in milliseconds">{copied === "Current milliseconds" ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}<span>{copied === "Current milliseconds" ? "Copied" : "Copy"}</span></button></div>
                </div>
            </div>
            <div className={styles.modeHeading}>
                <div><p>Converter</p><span>Choose an input format</span></div>
                <div className={styles.modeControl} role="group" aria-label="Conversion direction">
                    <button type="button" aria-pressed={mode === "timestamp"} className={mode === "timestamp" ? styles.modeActive : ""} onClick={() => { setMode("timestamp"); setCopyNotice(""); }}><FiArrowDownLeft aria-hidden="true" /> Timestamp to date</button>
                    <button type="button" aria-pressed={mode === "date"} className={mode === "date" ? styles.modeActive : ""} onClick={() => { setMode("date"); setCopyNotice(""); }}><FiArrowUpRight aria-hidden="true" /> Date to timestamp</button>
                </div>
            </div>
            <div className={styles.conversionGrid}>
                {mode === "timestamp"
                    ? <TimestampInput value={timestampValue} onChange={setTimestampValue} unit={timestampUnit} onUnitChange={setTimestampUnit} onPreset={setTimestampPreset} />
                    : <DateInput value={dateValue} onChange={setDateValue} timezone={currentDetails.timezone} onPreset={setDatePreset} />}
                <TimeResult mode={mode} valid={conversion.ok} error={conversion.error} details={details} epochPair={epochPair} copied={copied} onCopy={copyValue} interpretedUnit={interpretedUnit} />
            </div>
            <p className={styles.timezoneTip}><FiCheck aria-hidden="true" /><span>Seconds are the standard Unix format. Milliseconds include the extra three digits. The live clock updates every second.</span></p>
            {copyNotice && <p className={styles.copyNotice} role="status" aria-live="polite">{copyNotice}</p>}
        </section>
    );
};

export default TimeConverter;
