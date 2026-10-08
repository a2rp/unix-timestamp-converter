import { FiCalendar, FiMapPin, FiRefreshCw } from "react-icons/fi";
import styles from "./styles.module.css";

const DateInput = ({ value, onChange, timezone, onPreset }) => (
    <section className={styles.dateInput} aria-labelledby="date-label">
        <div className={styles.fieldHeading}>
            <div><span className={styles.fieldNumber}>01</span><div><h3 id="date-label">Calendar date</h3><p>Choose a local date and time.</p></div></div>
            <FiCalendar aria-hidden="true" />
        </div>
        <label className={styles.inputLabel} htmlFor="calendar-value">Date and time</label>
        <input id="calendar-value" className={styles.valueInput} type="datetime-local" step="1" value={value} onChange={(event) => onChange(event.target.value)} aria-describedby="date-hint" />
        <div className={styles.zoneNote}><FiMapPin aria-hidden="true" /><span>Interpreted in your local timezone</span><strong>{timezone}</strong></div>
        <p className={styles.hint} id="date-hint">The epoch value represents the same moment in UTC, independent of your display timezone.</p>
        <div className={styles.quickValues} aria-label="Date examples">
            <span>Try</span>
            <button type="button" onClick={() => onPreset("now")}><FiRefreshCw aria-hidden="true" /> Now</button>
            <button type="button" onClick={() => onPreset("epoch")}>Unix epoch</button>
            <button type="button" onClick={() => onPreset("y2k")}>Y2K</button>
        </div>
    </section>
);

export default DateInput;
