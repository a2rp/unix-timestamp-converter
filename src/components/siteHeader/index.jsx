import { FiArrowUpRight, FiClock, FiGithub } from "react-icons/fi";
import styles from "./styles.module.css";

const SiteHeader = () => (
    <header className={styles.header}>
        <div className={styles.headerInner}>
            <a className={styles.brand} href="#top" aria-label="Unix Timestamp Converter home">
                <span className={styles.brandMark}><FiClock aria-hidden="true" /></span>
                <span><strong>epoch / studio</strong><small>DATE AND TIME CONVERTER</small></span>
            </a>
            <nav className={styles.navigation} aria-label="Main navigation">
                <a href="#converter">Converter</a>
                <a href="#formats">Formats</a>
            </nav>
            <a className={styles.repositoryLink} href="https://github.com/a2rp/unix-timestamp-converter" target="_blank" rel="noreferrer" aria-label="Repository on GitHub, opens in a new tab">
                <FiGithub aria-hidden="true" /><span>Repository</span><FiArrowUpRight aria-hidden="true" className={styles.externalIcon} />
            </a>
        </div>
    </header>
);

export default SiteHeader;
