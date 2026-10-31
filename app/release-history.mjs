/**
 * @typedef {{ tag: string, publishedAt: string, url: string, prerelease?: boolean, draft?: boolean }} Release
 * @typedef {Release & { title: { zh: string, en: string }, items: { zh: string[], en: string[] } }} ReleaseHighlight
 */

/** @param {Release} version */
function isStable(version) {
  return !version.prerelease && !version.draft && /^v?\d+\.\d+\.\d+$/.test(version.tag);
}

/**
 * Merge the latest download metadata without dropping authored release history.
 * @param {Release} latest
 * @param {ReleaseHighlight[]} highlights
 * @returns {ReleaseHighlight[]}
 */
export function getReleaseHistory(latest, highlights) {
  const history = new Map(highlights.filter(isStable).map((version) => [version.tag, version]));
  if (isStable(latest)) {
    const summary = history.get(latest.tag);
    history.set(latest.tag, {
      ...latest,
      title: summary?.title ?? { zh: "正式版更新", en: "Stable release" },
      items: summary?.items ?? {
        zh: ["详细更新请参阅官方发布说明。"],
        en: ["See the official release notes for the full list of changes."],
      },
    });
  }
  return [...history.values()].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}
