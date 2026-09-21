# Didascalie — Liste des tâches

## Légende

- [x] Terminé
- [ ] À faire
- [~] À vérifier ou à finaliser manuellement

## 1. Base technique

- [x] Projet React + Vite fonctionnel
- [x] Styles globaux et design system existants
- [x] Framer Motion installé et utilisé pour les animations discrètes
- [x] Supabase installé avec `@supabase/supabase-js`
- [x] React Router installé et utilisé pour les routes existantes
- [~] TanStack Router installé, mais pas encore utilisé
- [ ] Décider si TanStack Router doit remplacer React Router
- [ ] Ne migrer le routing qu'après validation de la stratégie définitive

## 2. Site public

- [x] Header et navigation publique
- [x] Page d'accueil avec les sections principales
- [x] Hero
- [x] Section Le Père
- [x] Bibliothèque de prières
- [x] Section Enseignements
- [x] Section Didascalie TV
- [x] Agenda
- [x] Boutique sur la page d'accueil
- [x] Galerie
- [x] Dons
- [x] Formulaire Nous contacter
- [x] Footer
- [x] Responsive desktop, tablette et mobile de base
- [ ] Remplacer ou corriger les images locales manquantes
- [ ] Supprimer les anciennes références `file+.vscode-resource...`
- [ ] Vérifier toutes les images après déploiement

## 3. Boutique / Livres

- [x] Grille d'accueil avec 4 cartes placeholder
- [x] Cartes avec proportions et structure identiques
- [x] Responsive de la grille boutique
- [x] Bouton `Voir plus`
- [x] Route `/boutique`
- [x] Page dédiée Boutique
- [x] Section `Où se procurer les livres ?`
- [x] Points de vente Burkina Faso, Abidjan et Libreville déplacés hors du Contact
- [x] Données des points de vente isolées dans `src/data/book-sources.js`
- [ ] Ajouter les vraies couvertures des livres
- [ ] Ajouter les vrais titres, auteurs, prix et descriptions
- [ ] Afficher le catalogue complet sur `/boutique`
- [ ] Ajouter une fiche détaillée pour chaque livre
- [ ] Prévoir le parcours de commande
- [ ] Relier les points de vente aux vraies coordonnées vérifiées

## 4. Nous contacter

- [x] Choix `Demande de prière`
- [x] Choix `Question`
- [x] Choix `Témoignage`
- [x] Choix Email / WhatsApp / absence de recontact
- [x] Champs Email et WhatsApp affichés dynamiquement
- [x] Validation du message et des coordonnées
- [x] Enregistrement des messages dans `contact_messages` si Supabase est configuré
- [x] Bloc éditorial `Joindre le Père`
- [x] Placeholders de contact direct clairement identifiés
- [ ] Remplacer `pere@example.com` par l'email réel
- [ ] Remplacer le numéro WhatsApp fictif par le numéro réel
- [ ] Activer le lien WhatsApp lorsque le vrai numéro sera disponible
- [ ] Tester l'envoi réel d'un message avec Supabase

## 5. Didascalie TV

- [x] Route `/didascalie-tv`
- [x] Route `/didascalie-tv/:videoId`
- [x] Récupération du flux YouTube public
- [x] Jeu de données de secours si le flux échoue
- [x] Recherche de vidéos
- [x] Page détail avec lecteur YouTube
- [x] Liens depuis la section d'accueil
- [ ] Vérifier l'identifiant réel de la chaîne YouTube
- [ ] Ajouter éventuellement une pagination ou un chargement progressif
- [ ] Prévoir la gestion éditoriale des vidéos depuis l'administration

## 6. Espace administrateur

### Authentification

- [x] `AuthProvider.jsx`
- [x] Vérification de la session Supabase
- [x] Connexion avec email et mot de passe
- [x] Déconnexion Supabase
- [x] Écoute des changements de session
- [x] Récupération du profil dans `public.profiles`
- [x] Vérification du rôle `admin`
- [x] État de chargement
- [x] État explicite si Supabase n'est pas configuré
- [x] Gestion des erreurs de session et de profil
- [ ] Tester avec un vrai projet Supabase

### Routes et interface

- [x] Route `/admin/login`
- [x] Route protégée `/admin`
- [x] `ProtectedRoute.jsx`
- [x] `AdminLayout.jsx`
- [x] Navigation admin de base
- [x] Bouton de déconnexion
- [x] `DashboardPage.jsx`
- [x] Styles séparés dans `src/admin/admin.css`
- [ ] Créer les pages CRUD réelles
- [ ] Ajouter une page d'erreur admin dédiée
- [ ] Ajouter une navigation mobile admin plus complète

### Pages admin à créer

- [ ] `/admin/prayers`
- [ ] `/admin/teachings`
- [ ] `/admin/events`
- [ ] `/admin/products`
- [ ] `/admin/gallery`
- [ ] `/admin/didascalie-tv`
- [ ] `/admin/messages`

## 7. Supabase et sécurité

- [x] Client Supabase centralisé dans `src/lib/supabase.js`
- [x] Variables prévues dans `.env.example`
- [x] `.env.local` ignoré par Git
- [x] Table `public.profiles`
- [x] Relation entre `profiles.id` et `auth.users.id`
- [x] RLS activé sur les tables principales
- [x] Fonction `public.is_admin()`
- [x] Policies admin pour les opérations futures
- [x] Migration `supabase/migrations/001_create_profiles.sql`
- [ ] Créer le projet Supabase réel
- [ ] Renseigner `VITE_SUPABASE_URL` dans `.env.local`
- [ ] Renseigner `VITE_SUPABASE_ANON_KEY` dans `.env.local`
- [ ] Exécuter `supabase/schema.sql` dans le SQL Editor
- [ ] Créer le premier utilisateur dans Authentication → Users
- [ ] Créer son profil dans `public.profiles`
- [ ] Attribuer le rôle `admin` manuellement et de manière contrôlée
- [ ] Vérifier les policies RLS dans le projet réel
- [ ] Ne jamais exposer la clé `service_role`

## 8. Tests à réaliser

- [ ] Visiteur non connecté vers `/admin` → redirection vers `/admin/login`
- [ ] Supabase non configuré → message clair, sans écran blanc
- [ ] Identifiants incorrects → message compréhensible
- [ ] Utilisateur connecté sans rôle admin → accès refusé
- [ ] Utilisateur avec rôle admin → accès au Dashboard
- [ ] Déconnexion → retour vers `/admin/login`
- [ ] Actualisation après connexion → session restaurée
- [ ] Bouton Boutique `Voir plus` → `/boutique`
- [ ] Formulaire Contact → enregistrement Supabase réel
- [ ] Responsive sur mobile, tablette et desktop
- [ ] Routes publiques non cassées
- [ ] `npm run build` réussi

## 9. Commandes utiles

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Priorités recommandées

1. Configurer et tester le vrai projet Supabase.
2. Vérifier la connexion admin avec un vrai utilisateur.
3. Corriger les images locales manquantes.
4. Créer la gestion des messages reçus.
5. Créer les premiers écrans CRUD admin.
6. Ajouter les vraies données de la boutique.
7. Décider de conserver React Router ou de migrer vers TanStack Router.
