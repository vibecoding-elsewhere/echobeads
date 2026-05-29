import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.links}>
        <Link to="/privacy"              className={styles.link}>Privacy</Link>
        <span className={styles.dot} aria-hidden="true">·</span>
        <Link to="/terms"                className={styles.link}>Terms</Link>
        <span className={styles.dot} aria-hidden="true">·</span>
        <Link to="/community-guidelines" className={styles.link}>Community</Link>
      </nav>
      <p className={styles.wordmark}>elsewhere</p>
    </footer>
  )
}
