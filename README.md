# Art généré

Application pédagogique destinée à un public francophone. Elle permet
d'explorer l'art génératif en définissant un protocole visuel reproductible :
formes, couleurs, densité, lignes, fond et graine de génération.

Le site public est disponible sur
[kiramind.github.io/generative-art](https://kiramind.github.io/generative-art/).

## Technologies

- Vue 3 et Vue Router
- Vuetify 4
- Paper.js pour le dessin
- Vite pour le développement et le build
- Vitest et Playwright pour les tests

## Prérequis

- Node.js 22.18.0, indiqué dans `.nvmrc`
- npm, fourni avec Node.js
- Google Chrome pour les tests visuels locaux

Avec `nvm` :

```bash
nvm install
nvm use
```

## Installation

Le projet utilise npm et `package-lock.json`. Depuis la racine du dépôt :

```bash
npm ci
```

Dans un environnement configuré avec un registre npm privé, forcer le registre
public pour ce projet personnel :

```bash
env -u NPM_CONFIG_REGISTRY -u YARN_REGISTRY \
  npm_config_registry=https://registry.npmjs.org npm ci
```

Ne pas créer de `yarn.lock` et ne pas utiliser un registre d'entreprise.

## Développement local

```bash
npm run dev
```

Ouvrir l'adresse affichée par Vite, normalement
<http://localhost:5173/generative-art/>.

Pour vérifier le build de production localement :

```bash
npm run build
npm run preview
```

Le résultat est créé dans `dist/` et servi normalement sur
<http://localhost:4173/generative-art/>.

## Tests et validation

Les commandes disponibles sont :

```bash
npm run lint       # règles JavaScript et Vue
npm run test       # tests unitaires du générateur déterministe
npm run build      # build de production Vite
npm run test:e2e   # interactions et régression visuelle Playwright
npm run validate   # ensemble des vérifications ci-dessus
```

Les tests Playwright utilisent trois tailles représentatives :

- grand écran : 1440 × 1000 ;
- petit écran : 1024 × 768 ;
- mobile : 390 × 844.

Deux états (initial et éditeur après interaction) sont capturés pour chaque
taille, soit six images de référence versionnées dans
`tests/e2e/art.spec.js-snapshots/`. Pour les mettre à jour après une modification
visuelle intentionnelle :

```bash
npm run build
npm run test:e2e:update
```

Toujours examiner les trois images modifiées avant de les valider. Ne jamais
mettre à jour les références uniquement pour faire passer un test.

La validation manuelle doit aussi couvrir :

1. le bouton **Commencer...** et les motifs initiaux ;
2. les onglets Motifs 1, Motifs 2, Lignes et Fond ;
3. une modification de forme, de couleur et de graine Position ;
4. le téléchargement PNG `art-genere.png` avec le bouton **Sauvegarder** ;
5. la route expérimentale `#/generated_art` ;
6. un écran d'ordinateur et un écran mobile.

## Intégration continue

`.github/workflows/ci.yml` exécute l'installation reproductible, le lint, les
tests unitaires, le build et les tests de navigateur à chaque pull request et
push sur `master`.

Les captures visuelles sont comparées localement avec Google Chrome. En CI,
Playwright contrôle les interactions, les dimensions et le contenu effectif du
canvas ; cette séparation évite les faux écarts de rendu entre macOS et Linux.

## Déploiement GitHub Pages

Le déploiement n'est jamais automatique. Après fusion sur `master` et
validation du site :

1. Dans **Settings → Pages**, choisir **GitHub Actions** comme source une seule
   fois lors du passage depuis l'ancienne branche `gh-pages`.
2. Ouvrir **Actions → Deploy GitHub Pages**.
3. Choisir **Run workflow** sur `master`.
4. Attendre la réussite du workflow puis vérifier le site public.

Le workflow reconstruit et reteste l'application avant publication. L'ancien
script local qui forçait la branche `gh-pages` a été supprimé afin que chaque
déploiement soit traçable et reproductible.

## Principes de maintenance

- La graine `Artiste` doit continuer à produire le même protocole.
- Chaque contrôle doit actualiser le dessin dès sa première modification.
- La densité d'un motif ne doit pas déplacer ou faire pivoter l'autre motif.
- Les contrôles discrets, comme le nombre de pointes d'une étoile, utilisent
  uniquement des nombres entiers.
- Paper.js doit être synchronisé avec la taille CSS du canvas avant le dessin.
- Une modification des formes, positions, couleurs par défaut ou dimensions du
  canvas est une modification produit et nécessite une validation visuelle.
- Les composants d'édition émettent explicitement les nouveaux modèles ; ils ne
  modifient pas directement les propriétés reçues de leur parent.
