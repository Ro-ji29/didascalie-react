# Didascalie — version React

Version React (Vite) de la maquette du site du Père Paul-Marie MBA.
Mêmes couleurs, mêmes polices, mêmes sections — mais en composants
réutilisables avec de vrais filtres en state React.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvre l'adresse affichée dans le terminal (en général http://localhost:5173).

## Ajouter les photos du Père

Dans `src/App.jsx`, cherche le commentaire dans le composant `LePere` :

```jsx
{/* Remplacer par une vraie photo : <img src="/images/pere-portrait.jpg" alt="Père Paul-Marie MBA" /> */}
```

1. Crée un dossier `public/images/`
2. Dépose tes photos dedans (ex: `pere-portrait.jpg`)
3. Remplace le SVG par la balise `<img>` indiquée en commentaire

Fais la même chose pour la Galerie (`Galerie`) en remplaçant les blocs
de couleur par de vraies images.

## Tailwind CSS

Tailwind est déjà configuré (`tailwind.config.js`, `postcss.config.js`), avec
les couleurs de la marque disponibles comme classes utilitaires :
`bg-ink`, `bg-ivory`, `text-gold`, `text-clay`, `bg-sage`, `font-display`
(Fraunces), `font-body` (Work Sans).

Le CSS existant (`.hero`, `.prow`, `.tcard`, etc.) reste tel quel et continue
de fonctionner — Tailwind est ajouté par-dessus. Pour tout nouveau composant,
tu peux écrire directement en utilitaires Tailwind, par exemple :

```jsx
<button className="bg-gold text-ink font-body font-semibold px-6 py-3 rounded-lg">
  Faire un don
</button>
```

## Structure

```
src/
  App.jsx       <- toutes les sections du site (Header, Hero, LePere, Prieres, ...)
  index.css     <- tout le style (couleurs, polices, mise en page)
  main.jsx      <- point d'entrée React
index.html      <- charge les polices Google (Fraunces, Work Sans)
```

## Étape suivante

Pour un vrai site en production avec plusieurs pages, panier boutique,
espace admin et commandes WhatsApp automatiques, utilise le fichier
`prompt-didascalie.txt` dans Bolt.new ou Cursor — il décrit une version
complète construite sur ce même design.
