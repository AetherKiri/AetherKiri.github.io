import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export function platformFor(name) {
  if (/android.*\.apk$/i.test(name)) return "Android";
  if (/ios.*\.ipa$/i.test(name)) return "iOS";
  if (/macos/i.test(name)) return "macOS";
  if (/linux/i.test(name)) return "Linux";
  if (/web/i.test(name)) return "Web";
  if (/windows|\.exe$|\.msi$/i.test(name)) return "Windows";
  return "Other";
}

export function stableDownload(release) {
  if (release.draft || release.prerelease || !release.tag_name) throw new Error("Expected a public stable release");
  const assets = release.assets.filter(asset => asset.state === "uploaded" && platformFor(asset.name) !== "iOS").map(asset => ({
    name: asset.name,
    size: asset.size,
    platform: platformFor(asset.name),
    url: asset.browser_download_url,
    digest: asset.digest || null,
  }));
  if (!assets.length) throw new Error("Stable release has no downloadable files");
  return { tag: release.tag_name, publishedAt: release.published_at, url: release.html_url, assets };
}

async function main() {
  let response;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      response = await fetch("https://api.github.com/repos/AetherKiri/Aether/releases/latest", {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
        },
        signal: AbortSignal.timeout(30000),
      });
      if (response.ok || (response.status < 500 && response.status !== 429)) break;
    } catch (error) {
      if (attempt === 2) throw error;
    }
    if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt));
  }
  if (!response) throw new Error("GitHub stable release request failed");
  if (!response.ok) throw new Error(`GitHub stable release: ${response.status}`);
  const release = stableDownload(await response.json());
  const root = new URL("../", import.meta.url);
  await mkdir(new URL("public/download/", root), { recursive: true });
  await writeFile(new URL("app/download-release.json", root), JSON.stringify(release, null, 2) + "\n");
  await writeFile(new URL("public/download/latest.json", root), JSON.stringify(release));
  console.log(`Synced stable ${release.tag}: ${release.assets.length} files`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
