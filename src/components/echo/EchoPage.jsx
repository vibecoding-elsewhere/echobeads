import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAffirmation } from '../../hooks/useAffirmation'
import styles from './EchoPage.module.css'


function cap(str) { return str.charAt(0).toUpperCase() + str.slice(1) }

// Glowing bob particles — scattered across the page
const PARTICLES = [
  { top: '8%',  left: '8%',  delay: '0s',   size: 5, dur: '9s'  },
  { top: '12%', left: '88%', delay: '1.4s', size: 4, dur: '11s' },
  { top: '20%', left: '4%',  delay: '2.6s', size: 4, dur: '8s'  },
  { top: '18%', left: '80%', delay: '0.8s', size: 5, dur: '13s' },
  { top: '32%', left: '6%',  delay: '3.8s', size: 4, dur: '10s' },
  { top: '28%', left: '93%', delay: '2.0s', size: 4, dur: '9s'  },
  { top: '45%', left: '2%',  delay: '3.0s', size: 5, dur: '12s' },
  { top: '48%', left: '95%', delay: '4.2s', size: 4, dur: '8s'  },
  { top: '60%', left: '14%', delay: '1.6s', size: 4, dur: '11s' },
  { top: '56%', left: '82%', delay: '3.4s', size: 5, dur: '9s'  },
  { top: '72%', left: '22%', delay: '0.4s', size: 4, dur: '14s' },
  { top: '68%', left: '74%', delay: '4.8s', size: 4, dur: '10s' },
  { top: '82%', left: '10%', delay: '2.2s', size: 3, dur: '12s' },
  { top: '78%', left: '88%', delay: '1.0s', size: 3, dur: '8s'  },
]

// Sparkling stars — brief flare & fade, random positions
const STARS = [
  { top: '6%',  left: '30%', delay: '0s',   dur: '3.5s' },
  { top: '15%', left: '60%', delay: '1.8s', dur: '4s'   },
  { top: '25%', left: '20%', delay: '3.2s', dur: '3s'   },
  { top: '35%', left: '75%', delay: '0.6s', dur: '4.5s' },
  { top: '50%', left: '40%', delay: '2.4s', dur: '3.8s' },
  { top: '65%', left: '15%', delay: '1.2s', dur: '4.2s' },
  { top: '70%', left: '65%', delay: '3.8s', dur: '3s'   },
  { top: '85%', left: '45%', delay: '0.9s', dur: '4.8s' },
  { top: '42%', left: '88%', delay: '2.7s', dur: '3.4s' },
  { top: '88%', left: '70%', delay: '1.5s', dur: '5s'   },
]

// Ambient affirmations that drift across the background
const AMBIENT = [
  'you are enough',
  'breathe',
  'this too shall pass',
  'rest is sacred',
  'you belong here',
  'be gentle with yourself',
  'slow down',
  'you are seen',
]

// Full-page absolute SVG: sweeping arc lines converging on orb
function SweepingCurves() {
  const c = 'rgba(185,138,96,'
  return (
    <svg className={styles.sweepSvg} viewBox="0 0 390 800"
      xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
      <path d={`M-8,168 C80,210 148,262 195,290`}  stroke={`${c}0.28)`} strokeWidth="0.75" strokeLinecap="round"/>
      <path d={`M-8,190 C86,228 154,272 195,302`}  stroke={`${c}0.20)`} strokeWidth="0.65" strokeLinecap="round"/>
      <path d={`M-8,146 C74,190 140,248 195,278`}  stroke={`${c}0.16)`} strokeWidth="0.60" strokeLinecap="round"/>
      <path d={`M398,168 C310,210 242,262 195,290`} stroke={`${c}0.28)`} strokeWidth="0.75" strokeLinecap="round"/>
      <path d={`M398,190 C304,228 236,272 195,302`} stroke={`${c}0.20)`} strokeWidth="0.65" strokeLinecap="round"/>
      <path d={`M398,146 C316,190 250,248 195,278`} stroke={`${c}0.16)`} strokeWidth="0.60" strokeLinecap="round"/>
    </svg>
  )
}

// Glowing orb with wide tilted elliptical rings
function Orb() {
  return (
    <div className={styles.orbWrap}>
      <div className={styles.orbGlow} />
      <svg className={styles.orbSvg} viewBox="-195 -88 390 176"
        xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
        <circle cx="0" cy="0" r="3.5" fill="rgba(255,252,230,1)"/>
        <circle cx="0" cy="0" r="10"  fill="rgba(255,238,185,0.55)"/>
        <circle cx="0" cy="0" r="22"  fill="rgba(252,220,150,0.18)"/>
        {[
          [ 28,  8,  1.5, 0.82],
          [ 55,  15, 1.1, 0.64],
          [ 88,  24, 0.85,0.46],
          [124,  33, 0.70,0.32],
          [160,  42, 0.55,0.20],
          [192,  50, 0.42,0.11],
        ].map(([rx,ry,sw,op],i) => (
          <ellipse key={i} cx="0" cy="0" rx={rx} ry={ry}
            stroke={`rgba(192,150,72,${op})`} strokeWidth={sw}
            transform="rotate(-12)"/>
        ))}
      </svg>
    </div>
  )
}

// Cycling ambient affirmation ghost-text
function AmbientAffirmation() {
  const [idx, setIdx]       = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % AMBIENT.length)
        setVisible(true)
      }, 800)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <p className={`${styles.ambientText} ${visible ? styles.ambientVisible : styles.ambientHidden}`}>
      {AMBIENT[idx]}
    </p>
  )
}

export default function EchoPage() {
  const { quote, action, fading } = useAffirmation()
  const navigate = useNavigate()

  return (
    <div className={styles.page}>

      {/* Sweeping curves behind everything */}
      <SweepingCurves />

      {/* Central glow */}
      <div className={styles.pageGlow} aria-hidden="true"/>

      {/* Ambient affirmation cycling in the background */}
      <AmbientAffirmation />

      {/* Floating bob particles */}
      <div className={styles.particles} aria-hidden="true">
        {PARTICLES.map((p,i) => (
          <span key={i} className={styles.particle} style={{
            top: p.top, left: p.left,
            width: p.size, height: p.size,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}/>
        ))}
      </div>

      {/* Sparkling stars — brief twinkle flare */}
      <div className={styles.stars} aria-hidden="true">
        {STARS.map((s,i) => (
          <span key={i} className={styles.star4} style={{
            top: s.top, left: s.left,
            animationDelay: s.delay,
            animationDuration: s.dur,
          }}>✦</span>
        ))}
      </div>

      <section className={styles.hero}>

        {/* Large italic quote */}
        <h1 className={`${styles.quote} ${fading ? styles.fade : ''}`}>
          {cap(quote)}
        </h1>

        {/* Star divider */}
        <div className={styles.starDivider} aria-hidden="true">✧</div>

        {/* Orb */}
        <Orb />

        {/* Gentle note */}
        <p className={styles.gentle}>Gentle Note</p>
        <p className={`${styles.note} ${fading ? styles.fade : ''}`}>
          {cap(action)}
        </p>

        <div className={styles.heart} aria-hidden="true">♡</div>

        <p className={styles.tapHint}>
          ✦&ensp;tap your bracelet again for a new echo&ensp;✦
        </p>

        <p className={styles.share}
          role="button" tabIndex={0}
          onClick={() => navigate('/reflect', { state: { quote, action } })}
          onKeyDown={e => e.key==='Enter' && navigate('/reflect',{state:{quote,action}})}>
          Share and store your feelings anonymously →
        </p>

      </section>
    </div>
  )
}
