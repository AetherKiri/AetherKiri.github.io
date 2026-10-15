import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { mirrorUrl, normalizeReleases, platformFor } from "../scripts/sync-releases.mjs";

test("mirror URLs encode release and asset names and reject invalid bases", () => {
  assert.equal(mirrorUrl("", "v1", "a.apk"), null);
  assert.equal(mirrorUrl("https://cdn.example.org/aether/", "v1/beta", "Aether 中文.apk"), "https://cdn.example.org/aether/v1%2Fbeta/Aether%20%E4%B8%AD%E6%96%87.apk");
  assert.equal(mirrorUrl("/downloads", "v1", "a b.apk"), "/downloads/v1/a%20b.apk");
  for (const base of ["http://cdn.example.org", "//cdn.example.org", "relative", "https://cdn.example.org/?token=x", "https://cdn.example.org/#x", "https://user:pass@cdn.example.org"]) {
    assert.throws(() => mirrorUrl(base, "v1", "a.apk"));
  }
});

test("catalog excludes drafts and incomplete assets and preserves preview channels", () => {
  const release = (tag, date, extra = {}) => ({ tag_name: tag, published_at: date, prerelease: false, html_url: `https://github.com/AetherKiri/Aether/releases/tag/${tag}`, assets: [], ...extra });
  const catalog = normalizeReleases([
    release("old", "2026-01-01"),
    release("draft", "2026-03-01", { draft: true }),
    release("preview", "2026-02-01", { prerelease: true, assets: [
      { name: "aether-android.apk", state: "uploaded", size: 123, browser_download_url: "https://example.org/a.apk", digest: "sha256:abc" },
      { name: "unfinished.apk", state: "starter" },
    ] }),
  ], "/downloads");
  assert.deepEqual(catalog.map((item) => item.tag), ["preview", "old"]);
  assert.equal(catalog[0].prerelease, true);
  assert.equal(catalog[0].assets.length, 1);
  assert.equal(catalog[0].assets[0].platform, "Android");
  assert.equal(catalog[0].assets[0].mirror, "/downloads/preview/aether-android.apk");
  assert.equal(catalog[0].assets[0].digest, "sha256:abc");
  assert.equal(normalizeReleases([release("v1/beta 中文", "2026-01-01")])[0].notesUrl, "/releases/v1%252Fbeta%2520%25E4%25B8%25AD%25E6%2596%2587.json");
});

test("published catalog has valid notes and download targets for every release", async () => {
  const catalog = JSON.parse(await readFile(new URL("../app/releases.json", import.meta.url), "utf8"));
  assert.ok(catalog.versions.length > 2);
  assert.ok(catalog.versions.some((item) => !item.prerelease));
  assert.ok(catalog.versions.some((item) => item.prerelease));
  await Promise.all(catalog.versions.map(async (version) => {
    const notes = JSON.parse(await readFile(new URL(`../public${version.notesUrl}`, import.meta.url), "utf8"));
    assert.equal(typeof notes.body, "string");
    for (const asset of version.assets) {
      assert.ok(asset.size > 0);
      assert.equal(new URL(asset.url).hostname, "github.com");
      assert.match(asset.url, /\/AetherKiri\/Aether\/releases\/download\//);
      assert.equal(asset.platform, platformFor(asset.name));
      if (asset.digest) assert.match(asset.digest, /^sha256:[a-f\d]{64}$/);
    }
  }));
});
