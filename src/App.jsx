import { FiArrowRight, FiCalendar, FiClock, FiGlobe, FiTrendingUp } from "react-icons/fi";
import TimeConverter from "./components/timeConverter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import BackToTop from "./components/backToTop/index.jsx";
import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell} id="top">
        <SiteHeader />
        <main>
            <section className={styles.intro} aria-labelledby="intro-title">
                <div className={styles.introInner}>
                    <div className={styles.introCopy}>
                        <p className={styles.introLabel}><FiClock aria-hidden="true" /> Unix time, made clear</p>
                        <h1 id="intro-title">Make a moment<br /><span>easy to read.</span></h1>
                        <p className={styles.introDescription}>Translate epoch numbers into dates, or turn a calendar time into Unix seconds and milliseconds. Your local timezone stays in view.</p>
                        <a className={styles.startLink} href="#converter">Open the converter <FiArrowRight aria-hidden="true" /></a>
                    </div>
                    <div className={styles.dateCard} role="img" aria-label="Example conversion from a Unix timestamp to a UTC calendar date">
                        <div className={styles.dateCardTop}><span><i /> TIME SNAPSHOT</span><FiTrendingUp aria-hidden="true" /></div>
                        <div className={styles.epochSample}><small>UNIX SECONDS</small><code>1717200000</code></div>
                        <div className={styles.connector}><i /><i /><i /></div>
                        <div className={styles.calendarSample}><span className={styles.calendarIcon}><FiCalendar aria-hidden="true" /></span><div><small>UTC DATE</small><strong>Jun 01, 2024</strong><span>12:00:00 AM GMT</span></div><b>+00:00</b></div>
                        <div className={styles.dateCardFoot}><FiGlobe aria-hidden="true" /> SAME MOMENT, DIFFERENT FORMAT</div>
                    </div>
                </div>
                <div className={styles.introRail}><span>SECONDS</span><i /><span>MILLISECONDS</span><i /><span>LOCAL DATE &amp; TIME</span></div>
            </section>
            <TimeConverter />
            <section className={styles.formats} id="formats" aria-labelledby="formats-title">
                <div className={styles.formatsHeading}><p>Quick reference</p><h2 id="formats-title">Choose the format that fits.</h2><span>The same point on the timeline can be written in a few useful ways.</span></div>
                <div className={styles.formatGrid}>
                    <article><span>01</span><div><h3>Seconds</h3><code>1717200000</code><p>Common in APIs, databases, and command-line tools.</p></div></article>
                    <article><span>02</span><div><h3>Milliseconds</h3><code>1717200000000</code><p>Used by JavaScript dates and many browser APIs.</p></div></article>
                    <article><span>03</span><div><h3>ISO 8601</h3><code>2024-06-01T00:00:00.000Z</code><p>Readable date and time with an explicit UTC marker.</p></div></article>
                </div>
            </section>
        </main>
        <SiteFooter />
        <BackToTop />
    </div>
);

export default App;
