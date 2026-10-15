# Aether Organization Website

The official static website for Aether, maintained by the
[AetherKiri](https://github.com/AetherKiri) GitHub organization.

## Development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

The local development server uses the vinext app in `app/`.

## Builds

```bash
# Validate the Sites-compatible build
npm run build

# Generate the fully static GitHub Pages artifact
npm run build:pages
```

The static artifact is written to `dist-pages/`. The workflow in
`.github/workflows/pages.yml` publishes that artifact to GitHub Pages.

## Download page

The standalone `/download/` page shows only the latest public stable release
from [Aether](https://github.com/AetherKiri/Aether). Run `npm run sync:download`
to refresh `app/download-release.json` and `public/download/latest.json`.
The deployment workflow fetches the latest stable release on every push and
every hour, then validates, builds, and deploys the site automatically. Version
numbers, dates, asset links, sizes, and checksums require no manual edits.
GitHub may delay scheduled runs. A `repository_dispatch` event with type
`stable-release-published` can also trigger an immediate refresh.
Drafts, previews, and historical releases are not included. Android and desktop
files are downloaded directly from official GitHub Releases assets. iOS uses
`https://apps.apple.com/app/id6796580469`, without a pinned storefront or language;
installation, availability, versions, and updates are managed by the App Store.

## Deployment

This repository is intended to be named `AetherKiri.github.io` so the
organization website is published at
[https://aetherkiri.github.io/](https://aetherkiri.github.io/).

## Content sources

Product claims, platform requirements, architecture, and compatibility numbers
are based on the public
[Aether runtime repository](https://github.com/AetherKiri/AetherKiri).

The app icon is reused from the main project. The rest of the site design and
visual system are purpose-built for the organization website.
