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

## Deployment

This repository is intended to be named `AetherKiri.github.io` so the
organization website is published at
[https://aetherkiri.github.io/](https://aetherkiri.github.io/).

## Release catalog and downloads

The home page combines release browsing and downloads. It recommends the newest
stable release and lists every public release, with channel search, platform
filters, checksums when provided by GitHub, and release notes loaded on demand.

```bash
npm run sync:releases
```

`scripts/sync-releases.mjs` fetches all pages of `AetherKiri/Aether` releases and
writes `app/releases.json`, `public/releases/index.json`, and one notes JSON per
tag under `public/releases/`. These generated files are checked in so local
builds work offline. Set `GITHUB_TOKEN` for authenticated API limits. Visitors
use the generated data without making GitHub API requests.

Pages deployment refreshes the catalog on each push, manual dispatch, and every
six hours. Release publication does not directly trigger this repository; use a
manual workflow run for an immediate refresh.

Files currently download from GitHub Releases. To use a future mirror, set the
repository Actions variable `DOWNLOAD_BASE_URL` to an HTTPS base URL (for example,
`https://downloads.example.org/aether`) and rerun deployment. The corresponding
files must already exist at `<base>/<encoded-tag>/<encoded-filename>`. A path
such as `/downloads` is also supported if the hosting domain serves it. The
page retains a GitHub fallback link for mirrored files. This setting only changes
links; it does not upload files or create a proxy. GitHub Pages cannot host the
roughly 34 GB release archive or attach a proxy to `aetherkiri.github.io`.

## Content sources

Product claims, platform requirements, architecture, and compatibility numbers
are based on the public
[Aether runtime repository](https://github.com/AetherKiri/Aether).

The app icon is reused from the main project. The rest of the site design and
visual system are purpose-built for the organization website.
