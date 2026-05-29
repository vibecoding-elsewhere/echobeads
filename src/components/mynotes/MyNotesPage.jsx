import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotes } from '../../hooks/useNotes'
import { useAuth } from '../../hooks/useAuth'
import LoginGate from '../auth/LoginGate'
import styles from './MyNotesPage.module.css'

const MONTHS  = ['January','February','March','April','May','June',
                 'July','August','September','October','November','December']
const DAYS    = ['Su','Mo','Tu','We','Th','Fr','Sa']

function formatTimestamp(iso) {
  const d = new Date(iso)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
    '  ·  ' + d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function MyNotesPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { notes, notesByDate, loading, editNote, deleteNote } = useNotes(user?.id)

  const now   = new Date()
  const [year,  setYear]  = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [selectedKey, setSelectedKey] = useState(null)
  const [editingId, setEditingId]     = useState(null)
  const [editText,  setEditText]      = useState('')

  const changeMonth = (dir) => {
    let m = month + dir, y = year
    if (m < 0)  { m = 11; y-- }
    if (m > 11) { m = 0;  y++ }
    setMonth(m); setYear(y)
  }

  const todayKey   = now.toISOString().slice(0, 10)
  const firstDay   = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const noteDates  = new Set(Object.keys(notesByDate))

  const dayNotes = selectedKey ? (notesByDate[selectedKey] || []) : []

  const startEdit = (note) => { setEditingId(note.id); setEditText(note.content) }
  const cancelEdit = () => { setEditingId(null); setEditText('') }
  const handleSave = async (id) => {
    await editNote(id, editText)
    cancelEdit()
  }
  const handleDelete = async (id) => {
    if (window.confirm('Delete this note?')) await deleteNote(id)
  }

  const pageContent = (
    <div className={styles.page}>
      <h2 className={styles.title}>My Notes</h2>
      <p className={styles.subtitle}>Your reflections, saved privately.</p>

      {/* Calendar */}
      <div className={styles.calendar}>
        <div className={styles.calHeader}>
          <button className={styles.calNav} onClick={() => changeMonth(-1)}>‹</button>
          <span className={styles.calMonth}>{MONTHS[month]} {year}</span>
          <button className={styles.calNav} onClick={() => changeMonth(1)}>›</button>
        </div>
        <div className={styles.calGrid}>
          {DAYS.map(d => <div key={d} className={styles.dayLabel}>{d}</div>)}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`e${i}`} className={styles.dayEmpty} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d   = i + 1
            const key = `${year}-${String(month + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
            return (
              <div
                key={d}
                className={[
                  styles.day,
                  key === todayKey     ? styles.today    : '',
                  key === selectedKey  ? styles.selected : '',
                  noteDates.has(key)   ? styles.hasNotes : '',
                ].join(' ')}
                onClick={() => setSelectedKey(key)}
              >{d}</div>
            )
          })}
        </div>
      </div>

      {/* Notes for selected date */}
      {selectedKey && (
        <div className={styles.notesSection}>
          <p className={styles.dateLabel}>
            {new Date(selectedKey + 'T00:00:00').toLocaleDateString([], {
              weekday: 'long', month: 'long', day: 'numeric'
            })}
          </p>

          {dayNotes.length === 0 && (
            <p className={styles.empty}>No notes for this day.</p>
          )}

          {dayNotes.map(note => (
            <div key={note.id} className={styles.noteCard}>
              {note.quote && <p className={styles.noteQuote}>"{note.quote}"</p>}
              <span className={styles.noteMood}>{note.mood}</span>

              {editingId === note.id ? (
                <textarea
                  className={styles.editArea}
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  rows={3}
                  autoFocus
                />
              ) : (
                <p className={styles.noteText}>{note.content}</p>
              )}

              <div className={styles.noteFooter}>
                <span className={styles.timestamp}>{formatTimestamp(note.created_at)}</span>
                <div className={styles.actions}>
                  {editingId === note.id ? (
                    <>
                      <button className={`${styles.btn} ${styles.save}`}   onClick={() => handleSave(note.id)}>save</button>
                      <button className={`${styles.btn} ${styles.cancel}`} onClick={cancelEdit}>cancel</button>
                    </>
                  ) : (
                    <button className={`${styles.btn} ${styles.edit}`} onClick={() => startEdit(note)}>edit</button>
                  )}
                  <button className={`${styles.btn} ${styles.del}`} onClick={() => handleDelete(note.id)}>delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!selectedKey && !loading && notes.length === 0 && (
        <p className={styles.empty} style={{ marginTop: 24 }}>
          No notes yet. Tap Reflect to write your first one.
        </p>
      )}
    </div>
  )

  return (
    <LoginGate
      title="Your emotional calendar"
      description="Sign in for free to build your own emotional calendar — a quiet place for your reflections, feelings, and softer moments."
      onDismiss={() => navigate('/')}
    >
      {pageContent}
    </LoginGate>
  )
}
