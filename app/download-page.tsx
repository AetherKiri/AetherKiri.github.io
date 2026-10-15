"use client";
/* Shared with the standalone Vite entry used by GitHub Pages. */
/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useState } from "react";
import release from "./download-release.json";
import { IOS_APP_STORE_URL } from "./download-links";
import { copyText, spotlight } from "./effects";
import "./download.css";

type Language = "zh" | "en";
type Asset = (typeof release.assets)[number];
const platforms = [...new Set([...release.assets.map(asset => asset.platform), "iOS"])].sort((a, b) => ["Android", "iOS", "Linux", "macOS", "Windows", "Web", "Other"].indexOf(a) - ["Android", "iOS", "Linux", "macOS", "Windows", "Web", "Other"].indexOf(b));

function PlatformIcon({ platform }: { platform: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {platform === "Android" ? <><path d="m7 5-2-3m12 3 2-3M4 11a8 8 0 0 1 16 0v7H4zM8 18v4m8-4v4M1 12v5m22-5v5" /><path d="M8 8h.01M16 8h.01" strokeWidth="2.5" /></>
      : platform === "iOS" ? <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 5h4m-3 14h2" /></>
      : platform === "Linux" ? <><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m7 9 3 3-3 3m6 0h4" /></>
      : platform === "macOS" ? <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 22h8m-4-5v5M2 13h20" /></>
      : <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a20 20 0 0 1 0 20 20 20 0 0 1 0-20" /></>}
  </svg>;
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M12 3v13m-5-5 5 5 5-5M4 17v4h16v-4" />}</svg>;
}

function assetTitle(asset: Asset, zh: boolean) {
  if (asset.name.includes("app-store")) return zh ? "App Store 分发包" : "App Store distribution";
  if (asset.name.includes("unsigned")) return zh ? "未签名安装包" : "Unsigned package";
  if (asset.name.includes("arm64")) return "ARM64";
  if (asset.name.includes("x86_64")) return "x86_64";
  if (asset.platform === "Android") return zh ? "Android 安装包" : "Android package";
  if (asset.platform === "macOS") return zh ? "macOS 应用程序" : "macOS application";
  return asset.platform;
}

const requirements: Record<string, [string, string]> = {
  Android: ["Android 8.0 及以上 · ARM64", "Android 8.0 or later · ARM64"],
  iOS: ["iOS / iPadOS 16.0+ · A12 或更新芯片", "iOS / iPadOS 16.0+ · A12 or later"],
  macOS: ["macOS 13.0 及以上", "macOS 13.0 or later"],
  Linux: ["ARM64 / x86_64", "ARM64 / x86_64"],
};

export function AetherDownload() {
  const [language, setLanguage] = useState<Language>("zh");
  const [platform, setPlatform] = useState(platforms[0]);
  const [copied, setCopied] = useState("");
  const zh = language === "zh";
  const assets = release.assets.filter(asset => asset.platform === platform).sort((a, b) => Number(a.name.includes("app-store")) - Number(b.name.includes("app-store")));

  useEffect(() => {
    const agent = navigator.userAgent;
    const detected = /Android/.test(agent) ? "Android" : /iPad|iPhone|iPod/.test(agent) || (/Macintosh/.test(agent) && navigator.maxTouchPoints > 1) ? "iOS" : /Mac/.test(agent) ? "macOS" : /Linux/.test(agent) ? "Linux" : platforms[0];
    const frame = requestAnimationFrame(() => {
      if (platforms.includes(detected)) setPlatform(detected);
      if (new URLSearchParams(location.search).get("lang") === "en") setLanguage("en");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = zh ? "zh-CN" : "en";
  }, [zh]);

  return <div className="dl-page">
    <a className="skip-link" href="#download-content">{zh ? "跳至下载" : "Skip to downloads"}</a>
    <div className="dl-sky" aria-hidden="true" />
    <header className="dl-header">
      <a className="dl-brand" href="/" aria-label="Aether home"><img src="/app-icon.png" alt="" width="36" height="36" /><span>Aether<i> / </i><small>{zh ? "下载" : "Downloads"}</small></span></a>
      <div className="dl-header-actions">
        <a className="dl-home" href="/"><span aria-hidden="true">←</span> {zh ? "返回首页" : "Back home"}</a>
        <button className="dl-language" onClick={() => setLanguage(zh ? "en" : "zh")} aria-label={zh ? "Switch to English" : "切换至中文"}>{zh ? "EN" : "中文"}<span aria-hidden="true">⌄</span></button>
      </div>
    </header>

    <main className="dl-main" id="download-content">
      <div className="dl-intro"><div><p className="dl-eyebrow"><span />THE NEXT CHAPTER</p><h1>{zh ? "故事，随你启程。" : "Your next chapter awaits."}</h1></div><span className="dl-intro-note">AETHER / DOWNLOAD CENTER</span></div>

      <div className="dl-workspace">
        <aside className="dl-release" aria-label={zh ? "最新稳定版本" : "Latest stable release"}>
          <div className="dl-release-top"><span className="dl-step">01 / RELEASE</span><span className="dl-stable"><i />{zh ? "最新稳定版" : "LATEST STABLE"}</span></div>
          <div className="dl-version-block"><span className="dl-product">Aether</span><h2><span>v</span>{release.tag}</h2><p>{zh ? "让喜欢的故事，再次抵达你。" : "Let your favorite stories find you again."}</p></div>
          <div className="dl-art" aria-hidden="true"><div className="dl-orbit dl-orbit-one" /><div className="dl-orbit dl-orbit-two" /><div className="dl-orbit dl-orbit-three" /><div className="dl-art-glow" /><img src="/hero-orrery-v2.webp" alt="" width="340" height="340" decoding="async" /><span className="dl-art-star">✦</span><span className="dl-art-coordinate">AETHER · {release.tag}</span></div>
          <div className="dl-release-bottom"><div><span>{zh ? "发布日期" : "RELEASED"}</span><time dateTime={release.publishedAt}>{release.publishedAt.slice(0, 10).replaceAll("-", ".")}</time></div><a href={release.url} target="_blank" rel="noreferrer">{zh ? "更新说明" : "Release notes"}<Arrow diagonal /></a></div>
        </aside>

        <section className="dl-packages" aria-labelledby="dl-platform-title">
          <div className="dl-packages-heading"><div><span className="dl-step">02 / PLATFORM</span><h2 id="dl-platform-title">{zh ? "选择你的平台" : "Choose your platform"}</h2><p>{zh ? "同一个 Aether，抵达不同的屏幕。" : "One Aether. All your favorite screens."}</p></div><span className="dl-heading-symbol" aria-hidden="true">↙</span></div>
          <div className="dl-platforms" role="group" aria-label={zh ? "选择下载平台" : "Download platform"}>
            {platforms.map(item => <button key={item} aria-pressed={platform === item} onClick={() => { setPlatform(item); setCopied(""); }}><PlatformIcon platform={item} /><span>{item === "iOS" ? "iOS / iPadOS" : item}</span><i /></button>)}
          </div>
          <div className="dl-platform-meta"><span><i />{platform}</span><span>{requirements[platform]?.[zh ? 0 : 1]}</span></div>
          <div className="dl-assets" aria-live="polite" key={platform}>
            {platform === "iOS" ? <article className="dl-asset dl-store is-primary" onPointerMove={spotlight}>
              <div className="dl-asset-top"><span className="dl-file-icon"><PlatformIcon platform="iOS" /></span><span className="dl-file-label">{zh ? "官方商店" : "OFFICIAL STORE"}</span><span className="dl-file-extension">APP STORE</span></div>
              <div className="dl-asset-body"><div><h3>Aether</h3><p>All-in-One Player</p><span className="dl-store-meta">iPhone / iPad</span></div><a className="dl-download" href={IOS_APP_STORE_URL}><span>{zh ? "前往下载" : "Get the app"}<small>App Store</small></span><Arrow diagonal /></a></div>
              <div className="dl-store-caption"><span>{zh ? "从 App Store 安装，后续更新由商店管理。" : "Install from the App Store and receive updates through the store."}</span></div>
            </article> : assets.map((asset, index) => {
              const distribution = asset.name.includes("app-store");
              const extension = asset.name.endsWith(".tar.gz") ? "TAR.GZ" : asset.name.split(".").at(-1)?.toUpperCase();
              return <article className={`dl-asset ${index === 0 ? "is-primary" : ""}`} key={asset.name} onPointerMove={spotlight}>
                <div className="dl-asset-top"><span className="dl-file-icon"><PlatformIcon platform={platform} /></span><span className="dl-file-label">{distribution ? (zh ? "开发者分发" : "DISTRIBUTION") : (zh ? "设备安装包" : "APP PACKAGE")}</span><span className="dl-file-extension">{extension}</span></div>
                <div className="dl-asset-body"><div><h3>{assetTitle(asset, zh)}</h3><p>{asset.name}</p><span className="dl-file-size">{(asset.size / 1024 / 1024).toFixed(1)} <small>MB</small><i />{release.tag}</span></div><a className="dl-download" href={asset.url}><span>{zh ? "下载" : "Download"}<small>{extension}</small></span><Arrow /></a></div>
                {asset.digest && <details className="dl-checksum"><summary><span>SHA-256 <span>{zh ? "文件校验" : "Verification"}</span></span><b aria-hidden="true">＋</b></summary><div><code>{asset.digest.replace("sha256:", "")}</code><button onClick={async () => { const ok = await copyText(asset.digest!.replace("sha256:", "")); setCopied(ok ? asset.name : "failed"); }}>{copied === asset.name ? (zh ? "已复制 ✓" : "Copied ✓") : (zh ? "复制" : "Copy")}</button></div></details>}
              </article>;
            })}
          </div>
          <div className="dl-install-note"><span aria-hidden="true">ⓘ</span><p>{platform === "iOS" ? (zh ? "链接不限定地区，Apple 将引导你前往适用商店。可用地区、版本和设备要求以 App Store 为准。" : "This link is not tied to a region. Apple directs you to the applicable store. Availability, version and device requirements are determined by the App Store.") : platform === "macOS" ? (zh ? "ZIP 为应用程序包；App Store 分发包仅供开发者上传商店。" : "The ZIP contains the app. App Store packages are for developer distribution.") : platform === "Linux" ? (zh ? "选择与你的设备架构一致的文件，解压后运行。" : "Choose the matching architecture, extract the archive, and run the app.") : (zh ? "下载 APK 后，在设备上打开文件并按提示安装。" : "Open the downloaded APK on your device and follow the installation steps.")}</p></div>
          <div className="dl-package-footer"><span><svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor"><path d="m8 1 6 2v5c0 4-6 7-6 7S2 12 2 8V3z" /><path d="m5 8 2 2 4-4" /></svg>{platform === "iOS" ? (zh ? "官方 App Store 下载" : "Official App Store download") : (zh ? "官方 GitHub Releases 下载" : "Official GitHub Releases")}</span><a href="/qq/">{zh ? "需要帮助？" : "Need help?"}<span aria-hidden="true">↗</span></a></div>
          <p className="dl-status" role="status">{copied === "failed" ? (zh ? "复制失败，请手动选择校验值复制。" : "Copy failed. Select and copy the checksum manually.") : ""}</p>
        </section>
      </div>
      <footer className="dl-footer"><span>© {new Date().getFullYear()} Aether</span><span>Stories, across every screen.</span><a href="https://github.com/AetherKiri/Aether" target="_blank" rel="noreferrer">OPEN SOURCE <span aria-hidden="true">↗</span></a></footer>
    </main>
  </div>;
}
