# Agent instructions

## Product context

This is a public, actively used educational website for a French audience. An
art teacher uses it to teach generative art, protocols, and how following the
same protocol and seed can reproduce an artwork.

Preserve French user-facing text and the deterministic generation behavior.
Treat visual changes, random-number changes, canvas sizing changes, and default
model changes as product changes rather than routine maintenance.

## Technology and deployment

- Vue 2, Vue Router 3, Vuetify 2, Paper.js, and Vue CLI 5.
- Node version is recorded in `.nvmrc`.
- Yarn 1 and `yarn.lock` are authoritative. Do not add `package-lock.json`.
- Production public path is `/generative-art/`.
- GitHub Pages serves the root of the `gh-pages` branch.
- `.github/workflows/ci.yml` validates lint and production build but does not
  deploy.
- `yarn deploy` force-updates `gh-pages`; run it only with explicit user
  approval after visual validation.

This is a personal repository. Use the public npm registry, not an employer's
package registry. In an inherited environment with registry variables, use:

```bash
env -u NPM_CONFIG_REGISTRY -u YARN_REGISTRY \
  yarn install --frozen-lockfile --registry https://registry.npmjs.org
```

## Required checks

For source or dependency changes:

```bash
yarn lint
yarn build
git diff --check
```

Because this application draws on a canvas, successful compilation is not
enough. Serve the production output under `/generative-art/` and compare it to
the live site. Verify that the initial image contains its deterministic stars,
rectangles, gradient, and dashed lines. Then check the **Commencer…** overlay,
the editing tabs, seed input, and save action.

Do not accept a dependency update if motifs disappear or deterministic output
changes unexpectedly. A prior compiler upgrade exposed the invalid expression
`new PaperUtil.shapedPath(...)`; the correct helper call is
`PaperUtil.shapedPath(...)`.

## Security and maintenance boundaries

- Never deploy from an unclean or unreviewed working tree.
- Never commit credentials, private registry URLs, generated `dist/` content,
  or browser profiles/screenshots.
- Vue 2 and Vuetify 2 are end-of-life. Do not perform a Vue 3/Vuetify 3 migration
  as routine dependency maintenance.
- The app does not use `VDatePicker`, user-controlled Vuetify presets, SSR, or
  user-controlled Vue template compilation. Reassess dependency advisories if
  any of those facts change.
- Preserve the legacy shared mutable art-model behavior unless a separately
  tested refactor is explicitly requested. ESLint rules documenting that
  choice are in `package.json`.
