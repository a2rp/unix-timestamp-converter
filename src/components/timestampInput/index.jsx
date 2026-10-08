import { FiClock, FiRefreshCw } from "react-icons/fi";
import styles from "./styles.module.css";

const TimestampInput = ({ value, onChange, unit, onUnitChange, onPreset }) => (
    <section className={styles.timestampInput} aria-labelledby="timestamp-label">
        <div className={styles.fieldHeading}>
            <div><span className={styles.fieldNumber}>01</span><div><h3 id="timestamp-label">Unix timestamp</h3><p>Paste seconds or milliseconds.</p></div></div>
            <FiClock aria-hidden="true" />
        </div>
        <label className={styles.inputLabel} htmlFor="timestamp-value">Timestamp value</label>
        <input id="timestamp-value" className={styles.valueInput} type="text" inputMode="decimal" autoComplete="off" spellCheck="false" value={value} onChange={(event) => onChange(event.target.value)} placeholder="e.g. 1735689600" aria-describedby="timestamp-hint" />
        <div className={styles.unitRow}>
            <label htmlFor="timestamp-unit">Input unit</label>
            <select id="timestamp-unit" value={unit} onChange={(event) => onUnitChange(event.target.value)}>
                <option value="auto">Detect automatically</option>
                <option value="seconds">Seconds</option>
                <option value="milliseconds">Milliseconds</option>
            </select>
        </div>
        <p className={styles.hint} id="timestamp-hint">Automatic mode treats values below 100 billion as seconds and larger values as milliseconds.</p>
        <div className={styles.quickValues} aria-label="Timestamp examples">
            <span>Try</span>
            <button type="button" onClick={() => onPreset("now")}><FiRefreshCw aria-hidden="true" /> Now</button>
            <button type="button" onClick={() => onPreset("epoch")}>Unix epoch</button>
            <button type="button" onClick={() => onPreset("y2k")}>Y2K</button>
        </div>
    </section>
);

export default TimestampInput;
