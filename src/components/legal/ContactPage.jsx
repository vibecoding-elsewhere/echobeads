import { useNavigate } from 'react-router-dom'
import styles from './LegalPage.module.css'

export default function ContactPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/')}>
        <span className={styles.backArrow}>←</span> back
      </button>

      <div className={styles.hero}>
        <p className={styles.eyebrow}>Elsewhere</p>
        <h1 className={styles.title}>Contact Us</h1>
      </div>

      <div className={styles.body}>
        <div className={styles.section}>
          <p className={styles.p}>
            For any questions or concerns, please contact us at{' '}
            <a href="mailto:elsewhereofficial.echo@gmail.com">
              elsewhereofficial.echo@gmail.com
            </a>
            .
          </p>
        </div>
      </div>

      <div className={styles.legalFooter}>
        <p>made with care · elsewhere</p>
      </div>
    </div>
  )
}
