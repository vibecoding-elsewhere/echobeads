import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import styles from './LoginGate.module.css'

export default function LoginGate({ children, title, description, onDismiss }) {
  const { isLoggedIn, pendingConfirm, signUp, signIn } = useAuth()

  const [mode,        setMode]        = useState('signup') // 'signup' | 'signin'
  const [firstName,   setFirstName]   = useState('')
  const [lastName,    setLastName]    = useState('')
  const [email,       setEmail]       = useState('')
  const [password,    setPassword]    = useState('')
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [wantsEmails, setWantsEmails] = useState(false)
  const [error,       setError]       = useState('')
  const [loading,     setLoading]     = useState(false)

  if (isLoggedIn) return children

  // Supabase sent a confirmation email — show a holding screen
  if (pendingConfirm) return (
    <div className={styles.wrap}>
      <div className={styles.dimmed} aria-hidden="true">{children}</div>
      <div className={styles.sheet}>
        <div className={styles.pill} />
        <p className={styles.icon}>✦</p>
        <h2 className={styles.title}>Check your email</h2>
        <p className={styles.desc}>
          We sent a confirmation link to your email address.
          Click it to activate your account and you'll be signed in automatically.
        </p>
        <button className={styles.dismiss} onClick={onDismiss}>back</button>
      </div>
    </div>
  )

  const reset = () => { setError(''); setLoading(false) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (mode === 'signup') {
      if (!firstName.trim() || !lastName.trim()) {
        setError('Please enter your first and last name.')
        return
      }
      if (!agreedTerms) {
        setError('Please agree to the Terms of Service and Privacy Policy to continue.')
        return
      }
    }

    setLoading(true)
    try {
      if (mode === 'signup') {
        await signUp(email, password, firstName, lastName, wantsEmails)
      } else {
        await signIn(email, password)
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setMode(m => m === 'signup' ? 'signin' : 'signup')
    reset()
  }

  return (
    <div className={styles.wrap}>
      {/* Page behind — dimmed */}
      <div className={styles.dimmed} aria-hidden="true">
        {children}
      </div>

      {/* Bottom sheet */}
      <div className={styles.sheet} role="dialog" aria-modal="true">
        <div className={styles.pill} aria-hidden="true" />

        <p className={styles.icon}>✦</p>

        <h2 className={styles.title}>
          {title || (mode === 'signup' ? 'Join Elsewhere' : 'Welcome back')}
        </h2>
        <p className={styles.desc}>
          {description || (mode === 'signup'
            ? 'Create your free account to save reflections and build your emotional archive.'
            : 'Sign in to continue to your account.')}
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* Name row — sign up only */}
          {mode === 'signup' && (
            <div className={styles.row}>
              <input
                className={styles.input}
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                autoComplete="given-name"
                required
              />
              <input
                className={styles.input}
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                autoComplete="family-name"
                required
              />
            </div>
          )}

          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            required
          />

          {/* Consent checkboxes — sign up only */}
          {mode === 'signup' && (
            <div className={styles.consents}>
              <label className={styles.consentRow}>
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={e => setAgreedTerms(e.target.checked)}
                />
                <span className={styles.consentLabel}>
                  I agree to the{' '}
                  <Link to="/terms" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </Link>
                  <span aria-hidden="true"> *</span>
                </span>
              </label>

              <label className={styles.consentRow}>
                <input
                  type="checkbox"
                  checked={wantsEmails}
                  onChange={e => setWantsEmails(e.target.checked)}
                />
                <span className={styles.consentLabel}>
                  I'd like to receive occasional emails, updates, and promotional messages from Elsewhere.
                </span>
              </label>
            </div>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading
              ? '…'
              : mode === 'signup' ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className={styles.toggle}>
          {mode === 'signup' ? 'Already have an account?' : 'New here?'}
          {' '}
          <button className={styles.toggleBtn} onClick={switchMode} type="button">
            {mode === 'signup' ? 'Sign in' : 'Create account'}
          </button>
        </p>

        <button className={styles.dismiss} onClick={onDismiss} type="button">
          maybe later
        </button>
      </div>
    </div>
  )
}
