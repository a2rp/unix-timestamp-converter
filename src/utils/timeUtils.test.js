import test from "node:test";
import assert from "node:assert/strict";
import {
    formatDateDetails,
    formatDateTimeLocal,
    formatEpochPair,
    formatRelativeTime,
    parseLocalDateTime,
    parseTimestamp,
} from "./timeUtils.js";

test("detects seconds and milliseconds from the timestamp size", () => {
    assert.equal(parseTimestamp("1700000000").milliseconds, 1_700_000_000_000);
    assert.equal(parseTimestamp("1700000000000").milliseconds, 1_700_000_000_000);
    assert.equal(parseTimestamp("1700000000000").unit, "milliseconds");
});

test("respects an explicitly selected timestamp unit", () => {
    assert.equal(parseTimestamp("1700", "seconds").milliseconds, 1_700_000);
    assert.equal(parseTimestamp("1700", "milliseconds").milliseconds, 1_700);
});

test("accepts decimal seconds and timestamps before the epoch", () => {
    assert.equal(parseTimestamp("0.125", "seconds").milliseconds, 125);
    assert.equal(parseTimestamp("-1").milliseconds, -1000);
});

test("reports empty, malformed, non-finite, and out-of-range timestamps", () => {
    assert.equal(parseTimestamp("").ok, false);
    assert.equal(parseTimestamp("1e5").ok, false);
    assert.equal(parseTimestamp("Infinity").ok, false);
    assert.equal(parseTimestamp("999999999999999999999999999", "milliseconds").ok, false);
    assert.equal(parseTimestamp("123", "minutes").ok, false);
});

test("converts local date fields to timestamps and back", () => {
    const parsed = parseLocalDateTime("2024-02-29T12:34:56");
    assert.equal(parsed.ok, true);
    assert.equal(formatDateTimeLocal(parsed.date), "2024-02-29T12:34:56");
    assert.equal(parseLocalDateTime("").ok, false);
    assert.equal(parseLocalDateTime("not a date").ok, false);
});

test("formats seconds and milliseconds without losing fractional seconds", () => {
    assert.deepEqual(formatEpochPair(1700000000125), { seconds: "1700000000.125", milliseconds: "1700000000125" });
    assert.deepEqual(formatEpochPair(1700000000000), { seconds: "1700000000", milliseconds: "1700000000000" });
});

test("formats date details in ISO, UTC, local time, and relative time", () => {
    const date = new Date("2026-01-10T10:00:00.000Z");
    const details = formatDateDetails(date, date.getTime());
    assert.equal(details.iso, "2026-01-10T10:00:00.000Z");
    assert.equal(details.utc, "Sat, 10 Jan 2026 10:00:00 GMT");
    assert.equal(details.weekday, new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(date));
    assert.equal(details.relative, "just now");
    assert.equal(typeof details.timezone, "string");
    assert.equal(formatDateDetails(new Date(NaN)), null);
});

test("expresses past and future values in readable relative time", () => {
    assert.equal(formatRelativeTime(130_000, 100_000), "in 30 seconds");
    assert.equal(formatRelativeTime(70_000, 100_000), "30 seconds ago");
});
