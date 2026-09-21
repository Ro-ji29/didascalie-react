import { useAuth } from '../auth/AuthProvider'

/** Shows the admin status and the next required Supabase setup steps. */
export default function DashboardPage() {
  const { configured } = useAuth()

  return (
    <section>
      <div className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">Administration</span>
          <h1>Tableau de bord</h1>
          <p className="admin-muted">Gérez les contenus visibles sur le site Didascalie.</p>
        </div>
      </div>
      <div className="admin-notice">
        <h2>{configured ? 'Base Supabase détectée' : 'Configuration Supabase requise'}</h2>
        <p>
          {configured
            ? 'Les écrans de gestion seront activés après la création des tables, du profil administrateur et des politiques RLS.'
            : 'Créez un projet Supabase puis renseignez les variables d’environnement avant d’activer la gestion des contenus.'}
        </p>
      </div>
    </section>
  )
}
