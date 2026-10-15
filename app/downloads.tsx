"use client";

import { useEffect, useMemo, useState } from "react";
import catalog from "./releases.json";
import { copyText, spotlight } from "./effects";

export const versions = catalog.versions;
export const stableRelease = versions.find((version) => !version.prerelease) || versions[0];
export const latestRelease = versions[0];
type Version = (typeof versions)[number];
type Language = "zh" | "en";
const platforms = ["All", "Android", "iOS", "macOS", "Linux", "Web", "Windows"];

function assetLabel(name: string, language: Language) {
  if (name.includes("ios-unsigned")) return language === "zh" ? "iOS · 未签名 IPA" : "iOS · Unsigned IPA";
  if (name.includes("app-store")) return `${name.includes("ios") ? "iOS" : "macOS"} · ${language === "zh" ? "App Store 分发包" : "App Store distribution"}`;
  if (name.includes("linux-arm64")) return "Linux · ARM64";
  if (name.includes("linux-x86_64")) return "Linux · x86_64";
  if (name.endsWith(".apk")) return "Android · APK";
  if (name.includes("macos")) return "macOS · ZIP";
  if (name.includes("web")) return language === "zh" ? "Web · 静态导出包" : "Web · Static export";
  return name;
}

function Notes({ version, language }: { version: Version; language: Language }) {
  const [result, setResult] = useState<{ tag: string; body?: string; error?: boolean }>();
  useEffect(() => {
    const controller = new AbortController();
    fetch(version.notesUrl, { signal: controller.signal }).then((response) => {
      if (!response.ok) throw new Error(String(response.status));
      return response.json();
    }).then((data) => setResult({ tag: version.tag, body: data.body }))
      .catch(() => { if (!controller.signal.aborted) setResult({ tag: version.tag, error: true }); });
    return () => controller.abort();
  }, [version.tag, version.notesUrl]);
  if (result?.tag !== version.tag) return <p role="status">{language === "zh" ? "正在加载更新说明…" : "Loading release notes…"}</p>;
  if (result.error) return <p>{language === "zh" ? "更新说明暂时无法加载，可通过下方链接查看。" : "Notes unavailable. Read the original release below."}</p>;
  const body = (result.body || "").replace(/<!--[\s\S]*?-->/g, "").trim();
  return <div className="release-notes">{body ? body.split(/\r?\n/).filter(Boolean).map((line, index) => {
    const text = line.replace(/^#+\s*|^[-*]\s+/g, "").replace(/\*\*/g, "");
    const content = text.split(/(https:\/\/[^\s<>]+)/g).map((part, i) => part.startsWith("https://")
      ? <a key={i} href={part} target="_blank" rel="noreferrer">{part.replace("https://github.com/", "")}</a> : part);
    return line.startsWith("#") ? <h4 key={index}>{content}</h4> : <p key={index}>{content}</p>;
  }) : <p>{language === "zh" ? "此版本未提供更新说明。" : "No release notes for this version."}</p>}</div>;
}

export function Downloads({ language }: { language: Language }) {
  const zh = language === "zh";
  const [selected, setSelected] = useState(stableRelease.tag);
  const [channel, setChannel] = useState("all");
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("All");
  const [copied, setCopied] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);
  const version = versions.find((item) => item.tag === selected) || stableRelease;
  const filtered = useMemo(() => versions.filter((item) =>
    (channel === "all" || (channel === "preview" ? item.prerelease : !item.prerelease)) &&
    `${item.tag} ${item.name}`.toLowerCase().includes(query.toLowerCase()),
  ), [channel, query]);
  const assets = version.assets.filter((asset) => platform === "All" || asset.platform === platform);
  const choose = (tag: string) => { setSelected(tag); setCopied(""); };

  return <section className="downloads-section" id="downloads" aria-labelledby="downloads-title">
    <div className="section-inner">
      <div className="download-heading" data-reveal>
        <div className="section-head">
          <p className="section-kicker"><span>01</span><i />GET AETHER</p>
          <h2 id="downloads-title">{zh ? "故事，从这里继续。" : "Your next chapter starts here."}</h2>
          <p className="section-desc">{zh ? "选择你的设备，带走喜欢的版本。最新发布与历史版本，都在这里。" : "Choose your device and your version. Every public release, in one place."}</p>
        </div>
        <span className="catalog-count"><i />{versions.length} {zh ? "个公开版本" : "public releases"}</span>
      </div>
      <div className="release-picks">
        {[stableRelease, ...(latestRelease.tag !== stableRelease.tag ? [latestRelease] : [])].map((item, index) =>
          <button key={item.tag} className={`release-pick ${selected === item.tag ? "is-selected" : ""}`} onClick={() => { setChannel("all"); setQuery(""); choose(item.tag); }} onPointerMove={spotlight}>
            <span className="card-glow" aria-hidden="true" />
            <span className="release-pick-icon" aria-hidden="true">{index === 0 ? "✦" : "↗"}</span>
            <span><small>{index === 0 ? (zh ? "推荐 · 最新稳定版" : "RECOMMENDED · STABLE") : (zh ? "尝鲜 · 最新预览版" : "EXPLORE · PREVIEW")}</small><strong>{item.tag}</strong></span>
            <span className="release-pick-arrow" aria-hidden="true">→</span>
          </button>)}
      </div>
      <div className="download-workspace">
        <aside className="version-browser" aria-label={zh ? "版本列表" : "Release catalog"}>
          <div className="version-browser-head"><h3>{zh ? "全部版本" : "All versions"}</h3><span>{filtered.length}</span></div>
          <div className="channel-filter" role="group" aria-label={zh ? "发布类型" : "Release channel"}>
            {[["all", zh ? "全部" : "All"], ["stable", zh ? "稳定" : "Stable"], ["preview", zh ? "预览" : "Preview"]].map(([key, label]) =>
              <button key={key} aria-pressed={channel === key} onClick={() => setChannel(key)}>{label}</button>)}
          </div>
          <label className="version-search"><span aria-hidden="true">⌕</span><input type="search" aria-label={zh ? "搜索版本" : "Search versions"} placeholder={zh ? "搜索版本号…" : "Find a version…"} value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          <div className="version-options">
            {filtered.map((item) => <button key={item.tag} className={item.tag === selected ? "is-selected" : ""} aria-pressed={item.tag === selected} onClick={() => choose(item.tag)}>
              <span><strong>{item.tag}</strong><time dateTime={item.publishedAt}>{item.publishedAt.slice(0, 10)}</time></span>
              <i className={item.prerelease ? "channel-dot is-preview" : "channel-dot"} aria-label={item.prerelease ? (zh ? "预览版" : "Preview") : (zh ? "稳定版" : "Stable")} />
            </button>)}
            {!filtered.length && <p className="empty-versions">{zh ? "没有匹配的版本" : "No matching versions"}</p>}
          </div>
        </aside>
        <div className="release-detail">
          <div className="release-detail-head">
            <div><span className={`release-channel ${version.prerelease ? "is-preview" : ""}`}>{version.prerelease ? (zh ? "预览版" : "PREVIEW") : (zh ? "稳定版" : "STABLE")}</span><h3>Aether <span>{version.tag}</span></h3><p><time dateTime={version.publishedAt}>{version.publishedAt.slice(0, 10)}</time><span> / </span>{version.assets.length} {zh ? "个文件" : "files"}</p></div>
            <span className="download-emblem" aria-hidden="true">↓</span>
          </div>
          <div className="platform-filter" role="group" aria-label={zh ? "下载平台" : "Download platform"}>
            {platforms.map((item) => <button key={item} aria-pressed={platform === item} onClick={() => setPlatform(item)}>{item === "All" ? (zh ? "全部平台" : "All platforms") : item}</button>)}
          </div>
          <div className="asset-list" aria-live="polite">
            {assets.map((asset) => <article className="download-asset" key={asset.name}>
              <span className="asset-type" aria-hidden="true">{asset.name.endsWith(".tar.gz") ? "TGZ" : asset.name.split(".").at(-1)?.toUpperCase()}</span>
              <div className="asset-info"><h4>{assetLabel(asset.name, language)}</h4><p>{asset.name}</p><span>{(asset.size / 1024 / 1024).toFixed(1)} MB{asset.name.includes("app-store") ? (zh ? " · 用于商店分发" : " · Store distribution") : ""}</span>
                {asset.digest && <details className="asset-checksum"><summary>SHA-256</summary><code>{asset.digest.replace("sha256:", "")}</code><button onClick={async () => { if (await copyText(asset.digest!.replace("sha256:", ""))) setCopied(asset.name); }}>{copied === asset.name ? (zh ? "已复制" : "Copied") : (zh ? "复制校验值" : "Copy checksum")}</button></details>}
              </div>
              <div className="asset-actions"><a className="asset-download" href={asset.mirror || asset.url}>{zh ? "下载" : "Download"}<span aria-hidden="true">↓</span></a>{asset.mirror && <a className="asset-original" href={asset.url}>{zh ? "GitHub 原始链接" : "GitHub source"}</a>}</div>
            </article>)}
            {!assets.length && <div className="no-assets"><span aria-hidden="true">◇</span><h4>{zh ? "此版本暂无该平台的安装包" : "No package for this platform"}</h4><p>{platform === "Windows" ? (zh ? "Windows 目前需从源代码构建。" : "Windows currently requires a source build.") : (zh ? "试试其他版本，或切换到全部平台。" : "Try another release or select all platforms.")}</p><a href="https://github.com/AetherKiri/Aether#build" target="_blank" rel="noreferrer">{zh ? "查看构建文档 ↗" : "Build instructions ↗"}</a></div>}
          </div>
          <p className="download-hint">{version.assets.some((asset) => asset.mirror) ? (zh ? "优先使用镜像下载，也可选择 GitHub 原始文件。" : "Mirror downloads are available, with GitHub as an alternative.") : (zh ? "文件由 GitHub Releases 提供，下载速度取决于网络连接。" : "Files are hosted on GitHub Releases. Download speed depends on your connection.")} {zh ? "iOS 未签名包需要自行签名安装；App Store 分发包供开发者上传商店，不用于直接安装；Web 包需自行部署。" : "Unsigned iOS packages require signing. App Store packages are for developer distribution, not direct installation. Web exports require hosting."}</p>
          <p className="download-hint">{zh ? "当前平台要求：Android 8.0+（ARM64）、iOS / iPadOS 16.0+、macOS 13.0+。历史版本请同时参考各版更新说明。" : "Current requirements: Android 8.0+ (ARM64), iOS / iPadOS 16.0+, macOS 13.0+. Check the release notes for older versions."}</p>
          <details className="notes-disclosure" onToggle={(event) => setNotesOpen(event.currentTarget.open)}>
            <summary>{zh ? "更新说明" : "Release notes"}<span aria-hidden="true">＋</span></summary>
            {notesOpen && <Notes version={version} language={language} />}
            <a className="release-source" href={version.url} target="_blank" rel="noreferrer">{zh ? "在 GitHub 查看此版本 ↗" : "View this release on GitHub ↗"}</a>
          </details>
        </div>
      </div>
    </div>
  </section>;
}
