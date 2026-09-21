import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

/** Renders the Supabase administrator sign-in form. */
export default function LoginPage() {
  const { configured, user, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to="/admin" replace />

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    const { error: signInError } = await signIn(email.trim(), password)
    setSubmitting(false)

    if (signInError) {
      setError('Connexion impossible. Vérifiez vos identifiants.')
      return
    }

    navigate(location.state?.from?.pathname || '/admin', { replace: true })
  }

  return (
    <main className="admin-login">
      <section className="admin-login-card" aria-labelledby="login-title">
        <a className="admin-brand" href="/">
          <strong>Didascalie</strong>
          <span>Administration</span>
        </a>
        <h1 id="login-title">Connexion administrateur</h1>
        <p className="admin-muted">Accédez à la gestion du contenu de la plateforme.</p>

        {!configured && (
          <div className="admin-alert" role="alert">
            Supabase n’est pas configuré. Ajoutez `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`
            dans `.env.local` avant de vous connecter.
          </div>
        )}

        {error && (
          <div className="admin-alert admin-alert-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              disabled={!configured || submitting}
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              disabled={!configured || submitting}
            />
          </label>
          <button
            type="submit"
            className="admin-primary-button"
            disabled={!configured || submitting}
          >
            {submitting ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </section>
    </main>
  )
}
