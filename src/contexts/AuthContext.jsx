import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,           setUser]           = useState(undefined) // undefined=loading, null=logged out
  const [profile,        setProfile]        = useState(null)
  const [pendingConfirm, setPendingConfirm] = useState(false)

  // ── Fetch profile, or create it if it doesn't exist yet ───
  // This handles three cases:
  //   1. Returning sign-in   → row exists, just fetch it
  //   2. New sign-up (email confirmation OFF) → no row yet, create it
  //   3. New sign-up (email confirmation ON)  → user confirms email,
  //      SIGNED_IN fires, no row yet, create it from user_metadata
  const fetchOrCreateProfile = async (authUser) => {
    // 1. Try fetching an existing row
    // maybeSingle() returns null (no error) when 0 rows found.
    // single() would throw PGRST116 on a brand-new user — don't use it here.
    const { data: existing } = await supabase
      .from('User')
      .select('*')
      .eq('user_id', authUser.id)
      .maybeSingle()

    if (existing) {
      setProfile(existing)
      return
    }

    // 2. Row doesn't exist — create it now.
    //    display_name was stored in user_metadata during signUp.
    const displayName =
      authUser.user_metadata?.display_name ||
      authUser.email.split('@')[0]

    const agreeToMarketing =
      authUser.user_metadata?.agree_to_marketing ?? false

    const { data: created, error: insertError } = await supabase
      .from('User')
      .insert({
        user_id:            authUser.id,
        email:              authUser.email,
        display_name:       displayName,
        agree_to_marketing: agreeToMarketing,
      })
      .select()
      .single()

    if (insertError) {
      console.error('[AuthContext] Could not create user profile:', insertError.message)
    } else {
      setProfile(created)
    }
  }

  // ── On mount: check for an existing session ───────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) fetchOrCreateProfile(u)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const u = session?.user ?? null
        setUser(u)
        if (u) fetchOrCreateProfile(u)
        else   setProfile(null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // ── Sign up ───────────────────────────────────────────────
  const signUp = async (email, password, firstName, lastName, agreeToMarketing = false) => {
    const displayName = `${firstName.trim()} ${lastName.trim()}`

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Saved in auth.users.raw_user_meta_data so fetchOrCreateProfile
        // can read it when the session is established.
        data: { display_name: displayName, agree_to_marketing: agreeToMarketing },
      },
    })

    if (error) throw new Error(error.message)

    if (data.session) {
      // Email confirmation is disabled — session is live immediately.
      // onAuthStateChange will fire and call fetchOrCreateProfile.
    } else if (data.user) {
      // Email confirmation is required.
      setPendingConfirm(true)
    }
  }

  // ── Sign in ───────────────────────────────────────────────
  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)
    // onAuthStateChange fires → fetchOrCreateProfile
  }

  // ── Sign out ──────────────────────────────────────────────
  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading:        user === undefined,
      isLoggedIn:     user !== null && user !== undefined,
      pendingConfirm,
      signUp,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
