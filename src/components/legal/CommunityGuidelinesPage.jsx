import { useNavigate } from 'react-router-dom'
import styles from './LegalPage.module.css'
import guideStyles from './CommunityGuidelinesPage.module.css'

export default function CommunityGuidelinesPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        <span className={styles.backArrow}>←</span> back
      </button>

      <div className={styles.hero}>
        <p className={styles.eyebrow}>Elsewhere</p>
        <h1 className={styles.title}>Community Guidelines</h1>
        <p className={styles.subtitle}>
          Elsewhere is a quiet place. People come here to pause, to feel, and
          to leave something honest behind. These guidelines exist to protect
          that softness.
        </p>
        <p className={styles.updated}>Last updated: May 2026</p>
      </div>

      <div className={styles.body}>

        <div className={styles.highlight}>
          <p className={styles.p}>
            Everything shared here is anonymous. Someone on the other side of
            the screen is feeling something real. Treat it that way.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Be kind</h2>
          <p className={styles.p}>
            This is not a debate forum. It's not a place to challenge, criticise,
            or judge what someone has shared. People open up here because it
            feels safe. Keep it that way.
          </p>
          <p className={styles.p}>
            Kindness doesn't require agreement. It just requires a little
            generosity toward someone you've never met.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Respect vulnerability</h2>
          <p className={styles.p}>
            When someone shares something honest — something heavy, something
            quiet, something they've never said out loud — that's a brave thing.
            Honour it by receiving it gently.
          </p>
          <p className={styles.p}>
            Do not mock, minimise, or trivialise what others share. Even a
            brief note in a community feed represents something real to the
            person who wrote it.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>No harassment</h2>
          <p className={styles.p}>
            Any content that targets, demeans, threatens, or intimidates — even
            indirectly — will be removed. Repeated violations will result in
            account removal.
          </p>
          <p className={styles.p}>
            This includes any content that discriminates based on identity,
            background, beliefs, or appearance.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Protect your own privacy</h2>
          <p className={styles.p}>
            Community reflections are anonymous, but they are visible to all
            users of the app. Please don't share sensitive personal details —
            full names, contact information, locations, or anything that could
            identify you or someone else.
          </p>
          <p className={styles.p}>
            If you want to write something deeply personal, save it privately
            in your notes. That space is only for you.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>This is not a crisis resource</h2>
          <p className={styles.p}>
            Elsewhere is a space for reflection and stillness. It is not a
            substitute for professional support. If you or someone you know
            needs immediate help, please reach out to a mental health
            professional or crisis line in your region.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Keep it honest</h2>
          <p className={styles.p}>
            Elsewhere is built on the premise that honesty, even quiet honesty,
            is worthwhile. Share what you actually feel. There's no performance
            required here — no need to be eloquent, put-together, or positive.
            Just be real.
          </p>
        </div>

        <div className={guideStyles.closingNote}>
          <p>
            ✦ &ensp; thank you for being here gently &ensp; ✦
          </p>
        </div>

      </div>

      <div className={styles.legalFooter}>
        <p>made with care · elsewhere</p>
      </div>
    </div>
  )
}
