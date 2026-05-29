import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header                   from './components/layout/Header'
import BottomNav                 from './components/layout/BottomNav'
import EchoPage                  from './components/echo/EchoPage'
import ReflectPage               from './components/reflect/ReflectPage'
import CommunityPage             from './components/community/CommunityPage'
import MyNotesPage               from './components/mynotes/MyNotesPage'
import ProfilePage               from './components/profile/ProfilePage'
import AuthCallback              from './components/auth/AuthCallback'
import PrivacyPage               from './components/legal/PrivacyPage'
import TermsPage                 from './components/legal/TermsPage'
import CommunityGuidelinesPage   from './components/legal/CommunityGuidelinesPage'
import './styles/global.css'

// ─────────────────────────────────────────────────────────────
//  Shell — wraps main app routes with shared header + bottom nav
// ─────────────────────────────────────────────────────────────
function Shell() {
  return (
    <div className="phone-shell">
      <Header />
      <Routes>
        <Route path="/"              element={<EchoPage />} />
        <Route path="/reflect"       element={<ReflectPage />} />
        <Route path="/community"     element={<CommunityPage />} />
        <Route path="/mynotes"       element={<MyNotesPage />} />
        <Route path="/profile"       element={<ProfilePage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
      <BottomNav />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
//  Legal shell — full-height scrollable, no nav chrome
// ─────────────────────────────────────────────────────────────
function LegalShell({ children }) {
  return (
    <div className="phone-shell" style={{ height: 'auto', minHeight: '100dvh', overflow: 'visible' }}>
      {children}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Legal pages — scrollable, no header/bottom nav */}
          <Route path="/privacy"
            element={<LegalShell><PrivacyPage /></LegalShell>} />
          <Route path="/terms"
            element={<LegalShell><TermsPage /></LegalShell>} />
          <Route path="/community-guidelines"
            element={<LegalShell><CommunityGuidelinesPage /></LegalShell>} />

          {/* All other routes — main app shell */}
          <Route path="*" element={<Shell />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
