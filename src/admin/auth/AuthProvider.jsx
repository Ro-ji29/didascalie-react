import { createContext, useContext, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../../lib/supabase'

const AuthContext = createContext(null)

/** Provides the Supabase session and admin role to the admin area. */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [profileLoading, setProfileLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    if (!supabase) return undefined

    let mounted = true

    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (mounted) {
        setSession(data.session)
        setAuthError(error ? 'La session Supabase n’a pas pu être vérifiée.' : '')
        setLoading(false)
      }
    }

    loadSession()

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) setSession(nextSession)
    })

    return () => {
      mounted = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!supabase || !session?.user) {
      setProfile(null)
      setProfileLoading(false)
      return
    }

    let mounted = true
    setProfileLoading(true)
    setAuthError('')

    supabase
      .from('profiles')
      .select('id, role, display_name')
      .eq('id', session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (mounted) {
          setProfile(data)
          setAuthError(error ? 'Votre profil administrateur n’a pas pu être récupéré.' : '')
          setProfileLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [session])

  const signIn = async (email, password) => {
    if (!supabase) {
      return { error: new Error('Supabase n’est pas configuré dans .env.local.') }
    }
    return supabase.auth.signInWithPassword({ email, password })
  }

  const signOut = () => supabase?.auth.signOut()

  const value = {
    session,
    user: session?.user ?? null,
    profile,
    isAdmin: profile?.role === 'admin',
    loading: loading || profileLoading,
    authError,
    configured: isSupabaseConfigured,
    supabaseConfigured: isSupabaseConfigured,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth doit être utilisé dans AuthProvider')
  return context
}
