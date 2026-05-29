import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const goTo = (path) => { setOpen(false); navigate(path) }

  return (
    <>
      <header className={styles.header}>
        <span className={styles.brand}>Elsewhere</span>
        <button className={styles.myNotes} onClick={() => navigate('/mynotes')} aria-label="My Notes">
          My Notes <span className={styles.lock}>🔒</span>
        </button>
      </header>
    </>
  )
}
