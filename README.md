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

The homepage announcement uses the same stable release metadata. Bilingual
release summaries are maintained in `app/release-highlights.json`, with each
official release's date, URL, and Chinese / English highlights. Only published
stable releases belong in this history; exclude drafts and prereleases. Append
new stable summaries without replacing or removing earlier entries. The archive
covers all 25 stable releases from 0.2.0 through 1.1.1.
If a new stable release arrives before its summary is written, the homepage
links to its official notes while retaining the complete authored history.
`app/release-history.mjs` merges the latest metadata, filters out previews and
drafts, and orders entries by publication date. Download synchronization only
updates download metadata; it never rewrites this archive.

## Runtime support

`app/runtimes.ts` contains the bilingual runtime / player catalog and status
labels. The homepage count and scrolling names derive from this single list.
Its 20 entries reflect the main repository's README, including the separate
Flash, TyranoScript and Ren’Py players and the WA2 / Minori availability notes.
Keep experimental, newly integrated and platform-specific support qualified;
the catalog describes main-branch progress, not a promise that every feature
ships in the current stable download. Verify new entries against the README
before changing the catalog.

The 75-game count follows the main repository's verified-game list dated
2026-10-30; it counts records of smoke / flow checks, not full-game guarantees.

## Patch page

The `/patch/` page lists game companies, engines, game titles, and downloadable
scripts and archives. Add entries to `app/patches.ts` and put each game's file
in its own directory under `public/patch/`. The `script` field points to the
downloadable file; links preserve its actual filename, such as `xp3filter.tjs`,
`aether.lua` or `aether.zip`. Keep original bytes and encoding unchanged when
copying files. Chinese subtitles are optional; set `titleLanguage` for titles
that are not Japanese.

Both the vinext app and the static GitHub Pages build include this page.

## Deployment

This repository is intended to be named `AetherKiri.github.io` so the
organization website is published at
[https://aetherkiri.github.io/](https://aetherkiri.github.io/).

## Content sources

Product claims, platform requirements, architecture, and compatibility numbers
are based on the public
[Aether runtime repository](https://github.com/AetherKiri/Aether), its
[README](https://github.com/AetherKiri/Aether/blob/main/README.md),
[verified-game list](https://github.com/AetherKiri/Aether/blob/main/doc/verified_games.md),
and [official releases](https://github.com/AetherKiri/Aether/releases).

The app icon is reused from the main project. The rest of the site design and
visual system are purpose-built for the organization website.
