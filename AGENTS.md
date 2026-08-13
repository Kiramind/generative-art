# Agent instructions

## Product context

This is a public, actively used educational website for a French audience. An
art teacher uses it to teach generative art, protocols, and how the same
protocol and seed reproduce an artwork.

Keep user-facing text in French. Preserve deterministic generation, defaults,
canvas sizing, and the classroom workflow. Treat changes to any of those as
product changes requiring explicit visual review.

## Stack and package management

- Vue 3, Vue Router 5, Vuetify 4, Paper.js, and Vite 8.
- Vitest protects deterministic logic; Playwright protects browser behavior.
- Use the Node version in `.nvmrc`.
- npm and `package-lock.json` are authoritative. Do not add `yarn.lock`.
- The production base path is `/generative-art/`.

This is a personal repository. Never use or record an employer package
registry. In an inherited environment, install with:

```bash
env -u NPM_CONFIG_REGISTRY -u YARN_REGISTRY \
  npm_config_registry=https://registry.npmjs.org npm ci
```

## Architecture invariants

- `src/util/util.js` contains the seeded pseudo-random generator. Its reference
  sequence for `Artiste` is a compatibility contract.
- Paper.js is a singleton drawing context. Set `paper.view.viewSize` from the
  canvas client dimensions before drawing, particularly on mobile.
- `src/projects/App.vue` owns the artwork model and seed.
- Editor components work on local drafts and emit `update:*` events. Do not
  reintroduce nested prop mutation or redraw loops through component lifecycle
  hooks.
- Schedule a redraw only after Vue has committed emitted model updates. Every
  list, text field, color picker, and slider must affect the next canvas frame,
  without a one-interaction delay.
- Motif layers use stable, independent segments of the seeded random sequence.
  Changing one motif's density must not move or rotate the other motif. The
  second segment deliberately skips the ten default Motif 1 points to preserve
  the historical `Artiste` artwork.
- Shape point counts and the other discrete geometry controls are integers;
  normalize point counts defensively before passing them to Paper.js.
- `PaperUtil.shapedPath(...)` is a factory call; do not prefix it with `new`.
- The secondary `#/generated_art` route is experimental but must remain usable.

## Required validation

For every source, dependency, build, or layout change run:

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
git diff --check
```

`npm run validate` runs the four npm checks. Playwright serves the production
build at `/generative-art/` and tests 1440×1000, 1024×768, and 390×844.

Visual baselines live in `tests/e2e/art.spec.js-snapshots/`. Update them only
for an intentional visual change:

```bash
npm run build
npm run test:e2e:update
```

Inspect every changed PNG. Confirm that stars, rectangles, dashed lines, and
the gradient remain present; the start overlay is centered; controls remain
usable; and the mobile canvas contains the full motif set. A successful build
alone is not acceptance.

## CI and deployment

- `.github/workflows/ci.yml` validates pull requests and `master`.
- `.github/workflows/deploy-pages.yml` is manual (`workflow_dispatch`) and
  deploys the tested `dist/` artifact through GitHub Pages Actions.
- The GitHub Pages source must be set to **GitHub Actions**, not `gh-pages`, when
  the migration is accepted.
- Never push, merge, change the Pages source, or deploy without explicit user
  approval after the user has had an opportunity to validate locally.
- Never commit `dist/`, Playwright reports/traces, browser profiles, secrets, or
  private registry information.

## Review boundaries

- Keep French labels and accessible names stable unless copy changes are part
  of the request.
- Avoid unrelated visual redesign during dependency maintenance.
- Do not accept regenerated screenshots without explaining the intended visual
  change.
- Keep deployment reversible and verify the public site after any approved
  deployment.
