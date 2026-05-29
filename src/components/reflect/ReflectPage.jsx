import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNotes } from '../../hooks/useNotes'
import { useAuth } from '../../hooks/useAuth'
import { getCurrentAffirmation } from '../../lib/affirmations'
import LoginGate from '../auth/LoginGate'
import styles from './ReflectPage.module.css'

const MOODS = ['Peaceful', 'Hopeful', 'Emotional', 'Heavy', 'Lonely', 'Other…']

export default function ReflectPage() {
  const location = useLocation()
  const navigate  = useNavigate()
  const { user }  = useAuth()
  const { saveNote } = useNotes(user?.id)

  const { quote: stateQuote = '' } = location.state || {}
  const fallback  = getCurrentAffirmation()
  const fullQuote = stateQuote || fallback[0]

  const { isLoggedIn } = useAuth()

  const [mood,       setMood]       = useState('')
  const [customMood, setCustomMood] = useState('')
  const [text,       setText]       = useState('')
  const [saving,     setSaving]     = useState(false)
  const [gating,     setGating]     = useState(false)
  const [saveError,  setSaveError]  = useState('')

  // Field-level error visibility — only shown after first submit attempt
  const [submitted,       setSubmitted]       = useState(false)
  const isOther            = mood === 'Other…'
  const effectiveMood      = isOther ? customMood.trim() : mood

  const moodMissing        = !mood
  const customMoodMissing  = isOther && !customMood.trim()
  const textMissing        = !text.trim()

  // When the user logs in via the gate, dismiss it so the form
  // (with mood/text/quote still intact) comes back into view.
  useEffect(() => {
    if (isLoggedIn && gating) setGating(false)
  }, [isLoggedIn])

  const handleSubmit = async () => {
    setSubmitted(true)
    if (moodMissing || customMoodMissing || textMissing) return
    if (!isLoggedIn) { setGating(true); return }

    setSaving(true)
    setSaveError('')
    const { error } = await saveNote({
      quote:  fullQuote,
      mood:   effectiveMood,
      text:   text.trim(),
      shared: true,
    })
    setSaving(false)
    if (error) {
      setSaveError('Something went wrong saving your note. Please try again.')
      return
    }
    navigate('/community')
  }

  if (gating) {
    return (
      <LoginGate
        title="Join Elsewhere"
        description="Sign in for free to become part of Elsewhere — a quiet space for reflections, feelings, and softer moments."
        onDismiss={() => setGating(false)}
      >
        <div className={styles.page} aria-hidden="true">
          <h2 className={styles.title}>Store your feelings away</h2>
          <p className={styles.subtitle}>Your reflection stays here with other souls.</p>
        </div>
      </LoginGate>
    )
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Store your feelings away</h2>
      <p className={styles.subtitle}>Your reflection stays here with other souls.</p>

      {fullQuote && (
        <div className={styles.quoteRef}>"{fullQuote}"</div>
      )}

      {/* Mood chips */}
      <div className={styles.moodHeader}>
        <p className={styles.moodLabel}>I'm feeling</p>
        {submitted && moodMissing && (
          <span className={styles.fieldError}>required</span>
        )}
      </div>
      <div className={`${styles.moodTop} ${submitted && moodMissing ? styles.groupError : ''}`}>
        {MOODS.slice(0, 3).map(m => (
          <button
            key={m}
            className={`${styles.chip} ${mood === m ? styles.selected : ''}`}
            onClick={() => { setMood(m); if (m !== 'Other…') setCustomMood('') }}
          >{m}</button>
        ))}
      </div>
      <div className={`${styles.moodBottom} ${submitted && moodMissing ? styles.groupError : ''}`}>
        {MOODS.slice(3).map(m => (
          <button
            key={m}
            className={`${styles.chip} ${mood === m ? styles.selected : ''}`}
            onClick={() => { setMood(m); if (m !== 'Other…') setCustomMood('') }}
          >{m}</button>
        ))}
      </div>

      {/* Custom mood input (Other…) */}
      {isOther && (
        <div className={styles.customMoodWrap}>
          <input
            className={`${styles.customMoodInput} ${submitted && customMoodMissing ? styles.inputError : ''}`}
            type="text"
            placeholder="Describe your feeling…"
            value={customMood}
            onChange={e => setCustomMood(e.target.value)}
            autoFocus
            maxLength={100}
          />
          <div className={styles.customMoodMeta}>
            {submitted && customMoodMissing && (
              <span className={styles.fieldError}>required</span>
            )}
            <span className={styles.charCount}>{customMood.length}/100</span>
          </div>
        </div>
      )}

      {/* Reflection textarea */}
      <textarea
        className={`${styles.textarea} ${submitted && textMissing ? styles.inputError : ''}`}
        placeholder="Write what came up for you… or just sit with it."
        value={text}
        onChange={e => setText(e.target.value)}
        rows={4}
      />
      {submitted && textMissing && (
        <span className={styles.fieldError}>please write something before sharing</span>
      )}

      <p className={styles.anonNote}>All notes will be shared anonymously with the community.</p>

      {saveError && <p className={styles.errorNote}>{saveError}</p>}

      <button className={styles.submitBtn} onClick={handleSubmit} disabled={saving}>
        {saving ? 'Saving…' : 'Leave your note ♡'}
      </button>
    </div>
  )
}
