import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

// ─────────────────────────────────────────────────────────────
//  /auth/callback — landing page after Google OAuth redirect.
//
//  Real flow:
//    Google → Supabase → redirects to this URL with ?code=...
//    Supabase JS SDK automatically exchanges the code for a session.
//    onAuthStateChange fires → AuthContext sets user → we redirect.
//
//  Mock flow:
//    signInWithOAuth resolves immediately, onAuthStateChange fires,
//    user is set, this component redirects to /profile.
// ─────────────────────────────────────────────────────────────

export default function AuthCallback() {
  const navigate  = useNavigate()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (loading) return           // still checking session
    if (user) {
      navigate('/profile', { replace: true })
    } else {
      // Session exchange failed — send back to landing
      navigate('/', { replace: true })
    }
  }, [user, loading, navigate])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100dvh',
      background: '#f5ede6',
      fontFamily: 'Cormorant Garamond, Georgia, serif',
      fontSize: '18px',
      fontStyle: 'italic',
      color: '#9b7468',
      letterSpacing: '2px',
    }}>
      signing you in…
    </div>
  )
}
