import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import LoginGate from '../auth/LoginGate'
import Footer from '../layout/Footer'
import styles from './ProfilePage.module.css'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, profile, isLoggedIn, signOut } = useAuth()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleDelete = () => {
    // TODO: call Supabase to delete account data, then sign out
    signOut()
    setConfirmDelete(false)
  }

  const pageContent = (
    <div className={styles.page}>
      <div className={styles.avatarWrap}>
        <div className={styles.avatar}>
          {(profile?.display_name || user?.email || '✦')[0].toUpperCase()}
        </div>
        <p className={styles.name}>
          {profile?.display_name || 'Anonymous Soul'}
        </p>
        <p className={styles.email}>{profile?.email || user?.email || ''}</p>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionLabel}>Account</p>

        <button className={styles.row} onClick={signOut}>
          <span className={styles.rowIcon}>↩</span>
          <span className={styles.rowText}>Sign out</span>
        </button>

        <button
          className={`${styles.row} ${styles.danger}`}
          onClick={() => setConfirmDelete(true)}
        >
          <span className={styles.rowIcon}>✕</span>
          <span className={styles.rowText}>Delete my account</span>
        </button>
      </div>

      <p className={styles.note}>
        Elsewhere keeps your reflections private. We never sell your data.
      </p>

      <Footer />

      {/* Confirm delete sheet */}
      {confirmDelete && (
        <div className={styles.confirmOverlay} onClick={() => setConfirmDelete(false)}>
          <div className={styles.confirmSheet} onClick={e => e.stopPropagation()}>
            <p className={styles.confirmTitle}>Delete account?</p>
            <p className={styles.confirmDesc}>
              This will permanently erase all your notes and reflections. This cannot be undone.
            </p>
            <button className={styles.confirmDel} onClick={handleDelete}>
              Yes, delete everything
            </button>
            <button className={styles.confirmCancel} onClick={() => setConfirmDelete(false)}>
              Keep my account
            </button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <LoginGate
      title="Your Elsewhere profile"
      description="Sign in for free to become part of Elsewhere — a quiet space for reflections, feelings, and softer moments."
      onDismiss={() => navigate(-1)}
    >
      {pageContent}
    </LoginGate>
  )
}
