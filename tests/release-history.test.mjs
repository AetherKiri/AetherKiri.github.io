import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { getReleaseHistory } from "../app/release-history.mjs";

const highlights = JSON.parse(await readFile(new URL("../app/release-highlights.json", import.meta.url)));
const latest = highlights[0];

test("keeps the published stable archive with bilingual summaries and official links", () => {
  const tags = highlights.map((version) => version.tag);
  const archivedTags = ["1.0.10", "1.0.9", "1.0.8", "1.0.7", "1.0.6", "1.0.5", "1.0.4", "1.0.3", "1.0.2", "1.0.1", "1.0.0", "0.5.0", "0.4.4", "0.4.3", "0.4.2", "0.4.1", "0.4.0", "0.3.0", "0.2.4", "0.2.3", "0.2.2", "0.2.1", "0.2.0"];
  for (const tag of archivedTags) assert.ok(tags.includes(tag), `Missing archived release ${tag}`);
  assert.equal(new Set(tags).size, tags.length);
  for (const version of highlights) {
    assert.equal(version.prerelease, false);
    assert.match(version.tag, /^\d+\.\d+\.\d+$/);
    assert.equal(version.url, `https://github.com/AetherKiri/Aether/releases/tag/${version.tag}`);
    assert.ok(Number.isFinite(Date.parse(version.publishedAt)));
    for (const language of ["zh", "en"]) {
      assert.ok(version.title[language].trim());
      assert.ok(version.items[language].length > 0);
      assert.ok(version.items[language].every((item) => item.trim()));
    }
  }
});

test("a newly synced download keeps every older summary and uses its own release link", () => {
  const future = { ...latest, tag: "99.0.0", publishedAt: "2099-01-01T00:00:00Z", url: "https://github.com/AetherKiri/Aether/releases/tag/99.0.0" };
  const history = getReleaseHistory(future, highlights);
  assert.equal(history.length, highlights.length + 1);
  assert.equal(history[0].tag, future.tag);
  assert.equal(history[0].url, future.url);
  assert.match(history[0].items.en[0], /official release notes/);
  for (const version of highlights) assert.deepEqual(history.find((item) => item.tag === version.tag), version);
});

test("rejects prereleases and drafts and sorts the stable archive without duplicates", () => {
  const preview = { ...highlights[0], tag: "2.0.0-alpha.1", prerelease: true };
  const unflaggedPreview = { ...preview, prerelease: false };
  const flagged = { ...preview, tag: "2.0.0" };
  const draft = { ...highlights[0], tag: "3.0.0", draft: true };
  const mixed = [preview, unflaggedPreview, flagged, draft, ...highlights.toReversed()];
  const history = getReleaseHistory(latest, mixed);
  assert.equal(history.length, highlights.length);
  assert.deepEqual(history.map((version) => version.tag), highlights.map((version) => version.tag));
  assert.deepEqual(history[0].items, highlights[0].items);
  assert.deepEqual(getReleaseHistory(preview, mixed).map((version) => version.tag), history.map((version) => version.tag));
});
