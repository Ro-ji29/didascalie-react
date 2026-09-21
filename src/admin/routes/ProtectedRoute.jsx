import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

/** Restricts admin routes to authenticated users with the admin role. */
export default function ProtectedRoute() {
  const { loading, user, isAdmin, authError, supabaseConfigured } = useAuth()
  const location = useLocation()

  if (!supabaseConfigured) {
    return (
      <div className="admin-state">
        <div>
          <strong>Supabase n’est pas encore configuré.</strong>
          <p>Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env.local.</p>
        </div>
      </div>
    )
  }
  if (loading) return <div className="admin-state">Vérification de la session…</div>
  if (authError) {
    return (
      <div className="admin-state">
        <div>
          <strong>Impossible de vérifier votre accès.</strong>
          <p>{authError}</p>
        </div>
      </div>
    )
  }
  if (!user) return <Navigate to="/admin/login" replace state={{ from: location }} />
  if (!isAdmin)
    return <div className="admin-state">Ce compte n’a pas les droits administrateur.</div>

  return <Outlet />
}
