import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { stableDownload } from "../scripts/sync-download.mjs";

test("download sync rejects previews, drafts and empty releases", () => {
  const base = { tag_name: "1.0.0", assets: [] };
  assert.throws(() => stableDownload({ ...base, prerelease: true }));
  assert.throws(() => stableDownload({ ...base, draft: true }));
  assert.throws(() => stableDownload(base));
  const release = stableDownload({ ...base, assets: [
    { name: "aether-android.apk", state: "uploaded", browser_download_url: "https://example.org/a.apk", size: 100 },
    { name: "unfinished.apk", state: "starter" },
    { name: "aether-ios-unsigned.ipa", state: "uploaded" },
    { name: "aether-ios-app-store.ipa", state: "uploaded" },
  ] });
  assert.equal(release.assets.length, 1);
  assert.equal(release.assets[0].platform, "Android");
});

test("download metadata contains one stable release with official assets", async () => {
  const release = JSON.parse(await readFile(new URL("../app/download-release.json", import.meta.url)));
  const published = JSON.parse(await readFile(new URL("../public/download/latest.json", import.meta.url)));
  assert.deepEqual(release, published);
  assert.match(release.tag, /^v?\d+\.\d+\.\d+$/);
  assert.ok(release.assets.length > 0);
  for (const asset of release.assets) {
    assert.notEqual(asset.platform, "iOS");
    const url = new URL(asset.url);
    assert.equal(url.hostname, "github.com");
    assert.equal(url.protocol, "https:");
    assert.ok(url.pathname.startsWith(`/AetherKiri/Aether/releases/download/${encodeURIComponent(release.tag)}/`));
    assert.ok(asset.size > 0);
    if (asset.digest) assert.match(asset.digest, /^sha256:[a-f0-9]{64}$/);
  }
});
