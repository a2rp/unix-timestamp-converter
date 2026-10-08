import { FiAlertCircle, FiCalendar, FiCheck, FiClock, FiCopy, FiGlobe } from "react-icons/fi";
import styles from "./styles.module.css";

const CopyAction = ({ value, label, copied, onCopy }) => (
    <button className={styles.copyAction} type="button" onClick={() => onCopy(value, label)} aria-label={`Copy ${label}`}>
        {copied === label ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
        <span>{copied === label ? "Copied" : "Copy"}</span>
    </button>
);

const TimeResult = ({ mode, valid, error, details, epochPair, copied, onCopy, interpretedUnit }) => (
    <section className={styles.result} aria-labelledby="result-title">
        <div className={styles.resultHeading}>
            <div><span className={styles.resultIcon}>{mode === "timestamp" ? <FiCalendar aria-hidden="true" /> : <FiClock aria-hidden="true" />}</span><div><p>{mode === "timestamp" ? "CONVERTED DATE" : "UNIX OUTPUT"}</p><h3 id="result-title">{mode === "timestamp" ? "Readable date" : "Epoch values"}</h3></div></div>
            <span className={`${styles.status} ${valid ? styles.ready : styles.waiting}`}><i aria-hidden="true" />{valid ? mode === "timestamp" ? `Read as ${interpretedUnit}` : `${details.timezone} input` : "Enter a valid value"}</span>
        </div>
        {valid && mode === "timestamp" && <>
            <div className={styles.localDate}>
                <span>YOUR LOCAL TIME <b>{details.timezone}</b></span>
                <strong>{details.local}</strong>
                <small><FiClock aria-hidden="true" /> {details.relative} <i /> {details.weekday}</small>
            </div>
            <div className={styles.detailRow}>
                <div><span>ISO 8601</span><code>{details.iso}</code></div>
                <CopyAction value={details.iso} label="ISO date" copied={copied} onCopy={onCopy} />
            </div>
            <div className={styles.detailRow}>
                <div><span>UTC</span><code>{details.utc}</code></div>
                <CopyAction value={details.utc} label="UTC date" copied={copied} onCopy={onCopy} />
            </div>
        </>}
        {valid && mode === "date" && <div className={styles.epochOutputs}>
            <article>
                <div><span>SECONDS</span><small>Unix time in seconds</small></div>
                <code>{epochPair.seconds}</code>
                <CopyAction value={epochPair.seconds} label="seconds" copied={copied} onCopy={onCopy} />
            </article>
            <article>
                <div><span>MILLISECONDS</span><small>Unix time in milliseconds</small></div>
                <code>{epochPair.milliseconds}</code>
                <CopyAction value={epochPair.milliseconds} label="milliseconds" copied={copied} onCopy={onCopy} />
            </article>
            <p className={styles.utcNote}><FiGlobe aria-hidden="true" /> {details.utc} <i /> {details.timezone} input</p>
        </div>}
        {!valid && <div className={styles.emptyResult} role="status"><span><FiAlertCircle aria-hidden="true" /></span><strong>Waiting for a date</strong><p>{error}</p></div>}
        {valid && <p className={styles.resultFootnote}>Conversion is calculated in this browser. Date display uses your local timezone.</p>}
    </section>
);

export default TimeResult;
