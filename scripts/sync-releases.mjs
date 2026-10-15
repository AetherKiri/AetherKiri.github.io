import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = new URL("../", import.meta.url);
const repository = "AetherKiri/Aether";

export function mirrorUrl(base, tag, name) {
  if (!base) return null;
  if (!base.startsWith("/") && !base.startsWith("https://")) throw new Error("DOWNLOAD_BASE_URL must be an HTTPS URL or an absolute path");
  const url = new URL(base, "https://aetherkiri.github.io");
  if (url.protocol !== "https:" || base.startsWith("//") || url.search || url.hash || url.username || url.password) throw new Error("DOWNLOAD_BASE_URL must use HTTPS without credentials, query, or fragment");
  const path = `${base.replace(/\/$/, "")}/${encodeURIComponent(tag)}/${encodeURIComponent(name)}`;
  if (base.startsWith("/") && !base.startsWith("//")) return path;
  return `${url.href.replace(/\/$/, "")}/${encodeURIComponent(tag)}/${encodeURIComponent(name)}`;
}

export function platformFor(name) {
  if (/android.*\.apk$/i.test(name)) return "Android";
  if (/ios.*\.ipa$/i.test(name)) return "iOS";
  if (/macos/i.test(name)) return "macOS";
  if (/linux/i.test(name)) return "Linux";
  if (/web/i.test(name)) return "Web";
  if (/windows|\.exe$|\.msi$/i.test(name)) return "Windows";
  return "Other";
}

export function normalizeReleases(releases, base = "") {
  return releases.filter((release) => !release.draft).sort((a, b) =>
    Date.parse(b.published_at) - Date.parse(a.published_at),
  ).map((release) => ({
    tag: release.tag_name,
    name: release.name || release.tag_name,
    publishedAt: release.published_at,
    prerelease: release.prerelease,
    url: release.html_url,
    // The disk filename contains an encoded tag; encode it again for HTTP.
    notesUrl: `/releases/${encodeURIComponent(encodeURIComponent(release.tag_name))}.json`,
    assets: release.assets.filter((asset) => asset.state === "uploaded").map((asset) => ({
      name: asset.name,
      size: asset.size,
      platform: platformFor(asset.name),
      url: asset.browser_download_url,
      mirror: mirrorUrl(base, release.tag_name, asset.name),
      digest: asset.digest || null,
    })),
  }));
}

async function main() {
  const releases = [];
  for (let page = 1; ; page++) {
    const response = await fetch(`https://api.github.com/repos/${repository}/releases?per_page=100&page=${page}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error(`GitHub releases: ${response.status} ${response.statusText}`);
    const batch = await response.json();
    releases.push(...batch);
    if (batch.length < 100) break;
  }
  const versions = normalizeReleases(releases, process.env.DOWNLOAD_BASE_URL || "");
  if (!versions.length) throw new Error("No public releases found; refusing to replace the catalog");
  const catalog = { repository, versions };
  await mkdir(new URL("public/releases/", root), { recursive: true });
  await Promise.all(releases.filter((release) => !release.draft).map((release) =>
    writeFile(join(fileURLToPath(new URL("public/releases/", root)), `${encodeURIComponent(release.tag_name)}.json`), JSON.stringify({ body: release.body || "" })),
  ));
  await writeFile(new URL("app/releases.json", root), JSON.stringify(catalog, null, 2) + "\n");
  await writeFile(new URL("public/releases/index.json", root), JSON.stringify(catalog));
  console.log(`Synced ${versions.length} releases and ${versions.reduce((sum, version) => sum + version.assets.length, 0)} assets`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
