import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

const adminLinks = [
  { to: '/admin', label: 'Tableau de bord', end: true },
  { to: '/admin/prayers', label: 'Prières' },
  { to: '/admin/teachings', label: 'Enseignements' },
  { to: '/admin/events', label: 'Événements' },
  { to: '/admin/products', label: 'Produits' },
  { to: '/admin/gallery', label: 'Galerie' },
]

/** Provides navigation and session actions for protected admin pages. */
export default function AdminLayout() {
  const { profile, user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a href="/" className="admin-brand">
          <strong>Didascalie</strong>
          <span>Administration</span>
        </a>
        <nav aria-label="Administration">
          {adminLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="admin-main">
        <header className="admin-header">
          <div>
            <span className="admin-muted">Connecté en tant que</span>
            <strong>{profile?.display_name || user?.email}</strong>
          </div>
          <button type="button" className="admin-quiet-button" onClick={handleSignOut}>
            Se déconnecter
          </button>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
