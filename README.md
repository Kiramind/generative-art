# Art généré

Application pédagogique destinée à un public francophone. Elle permet
d'explorer l'art génératif en définissant un protocole visuel reproductible :
formes, couleurs, densité, lignes, fond et graine de génération.

Le site public est disponible sur
[kiramind.github.io/generative-art](https://kiramind.github.io/generative-art/).

## Prérequis

- Node.js 22 (voir `.nvmrc`)
- Yarn 1.x

Le projet utilise Yarn comme seul gestionnaire de dépendances. Ne pas ajouter
de `package-lock.json`.

## Installation

```bash
yarn install --frozen-lockfile
```

Dans un environnement professionnel configuré avec un registre privé, utiliser
explicitement le registre public npm pour ce projet personnel :

```bash
env -u NPM_CONFIG_REGISTRY -u YARN_REGISTRY \
  yarn install --frozen-lockfile --registry https://registry.npmjs.org
```

## Développement

Lancer le serveur local :

```bash
yarn serve
```

Vérifier le code et construire la version de production :

```bash
yarn lint
yarn build
```

Le build est généré dans `dist/`. GitHub Actions exécute automatiquement le
lint et le build à chaque pull request et chaque push sur `master`.

## Déploiement

Le site GitHub Pages est actuellement publié depuis la branche `gh-pages`.
Après avoir validé visuellement le build local :

```bash
yarn deploy
```

Cette commande reconstruit le site puis remplace le contenu de `gh-pages`.
Comme le site est utilisé en classe, ne pas déployer directement une mise à
jour de dépendances sans avoir vérifié au minimum :

1. La page principale à la taille d'un écran d'ordinateur.
2. Le bouton **Commencer…** et l'affichage des motifs.
3. Les onglets Motifs, Lignes et Fond.
4. La modification d'au moins une forme, une couleur et la graine Position.
5. Le bouton **Sauvegarder**.
6. Un second écran étroit ou mobile.

## Maintenance

Le projet reste volontairement sur Vue 2 et Vuetify 2 afin de préserver
l'application pédagogique existante. Ces versions sont en fin de vie. Une
migration vers Vue 3/Vuetify 3 doit donc être traitée comme un projet séparé,
avec tests d'interaction et validation visuelle, et non comme une simple mise à
jour de dépendances.

Dependabot propose chaque mois des mises à jour mineures et correctives. Les
mises à jour majeures de Vue, Vue Router, Vuetify et Vue CLI sont ignorées pour
éviter une migration accidentelle.
