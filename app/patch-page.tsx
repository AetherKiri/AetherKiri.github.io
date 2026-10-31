"use client";
/* Shared with the standalone Vite entry used by GitHub Pages. */
/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useState } from "react";
import { patches } from "./patches";
import "./download.css";
import "./patch.css";

export function AetherPatch() {
  const [language, setLanguage] = useState<"zh" | "en">("zh");
  const zh = language === "zh";

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("lang") !== "en") return;
    const frame = window.requestAnimationFrame(() => setLanguage("en"));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = zh ? "zh-CN" : "en";
  }, [zh]);

  return (
    <div className="dl-page patch-page">
      <a className="skip-link" href="#patch-content">{zh ? "跳转到补丁列表" : "Skip to patches"}</a>
      <div className="dl-sky" aria-hidden="true" />

      <header className="dl-header">
        <a className="dl-brand" href="/" aria-label={zh ? "Aether 首页" : "Aether home"}>
          <img src="/app-icon.png" alt="" width="36" height="36" />
          <span>Aether<i> / </i><small>Patch</small></span>
        </a>
        <div className="dl-header-actions">
          <a className="dl-home" href="/"><span aria-hidden="true">←</span>{zh ? "返回首页" : "Back home"}</a>
          <button className="dl-language" onClick={() => setLanguage(zh ? "en" : "zh")} aria-label={zh ? "Switch to English" : "切换至中文"}>
            {zh ? "EN" : "中文"}<span aria-hidden="true">⌄</span>
          </button>
        </div>
      </header>

      <main className="dl-main patch-main" id="patch-content">
        <div className="dl-intro patch-intro">
          <div>
            <p className="dl-eyebrow"><span aria-hidden="true" />PATCH LIBRARY</p>
            <h1>{zh ? "游戏补丁" : "Game patches"}</h1>
            <p className="patch-description">{zh ? "按游戏查找并下载对应脚本。" : "Find and download the script for your game."}</p>
          </div>
          <span className="dl-intro-note">AETHER / PATCH</span>
        </div>

        <section className="patch-library" aria-labelledby="patch-list-title">
          <div className="patch-list-heading">
            <h2 id="patch-list-title">{zh ? "补丁列表" : "Available patches"}</h2>
            <span>{patches.length} {zh ? "个脚本" : "scripts"}</span>
          </div>
          <p className="patch-scroll-hint" id="patch-scroll-hint">{zh ? "左右滑动查看完整列表及下载按钮。" : "Scroll horizontally to see all columns and download links."}</p>
          <div className="patch-table-scroll" role="region" aria-labelledby="patch-list-title" aria-describedby="patch-scroll-hint" tabIndex={0}>
            <table className="patch-table">
              <caption className="patch-caption">{zh ? "游戏补丁脚本下载" : "Game patch script downloads"}</caption>
              <thead>
                <tr>
                  <th scope="col">{zh ? "游戏公司" : "Game company"}</th>
                  <th scope="col">{zh ? "引擎" : "Engine"}</th>
                  <th scope="col">{zh ? "游戏名" : "Game title"}</th>
                  <th scope="col">{zh ? "脚本" : "Script"}</th>
                </tr>
              </thead>
              <tbody>
                {patches.map((patch) => (
                  <tr key={patch.id}>
                    <td className="patch-company">{patch.company}</td>
                    <td><span className="patch-engine">{patch.engine}</span></td>
                    <th scope="row" className="patch-game">
                      <span lang="ja">{patch.title}</span>
                      <small lang="zh-CN">（{patch.chineseTitle}）</small>
                    </th>
                    <td>
                      <a className="patch-download" href={patch.script} download="xp3filter.tjs" aria-label={`${zh ? "下载" : "Download"} ${patch.title} xp3filter.tjs`}>
                        <span><strong>{zh ? "下载脚本" : "Download"}</strong><code>xp3filter.tjs</code></span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 3v12m-4-4 4 4 4-4M5 17v4h14v-4" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="patch-list-footer">
            <span>{zh ? "每款游戏对应独立脚本，请按游戏名下载。" : "Each game has its own script. Choose the matching title."}</span>
            <a href={zh ? "/qq/" : "/qq/?lang=en"}>{zh ? "需要帮助？" : "Need help?"}<span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <footer className="dl-footer">
          <span>© {new Date().getFullYear()} Aether</span>
          <span>Stories, across every screen.</span>
          <a href={zh ? "/download/" : "/download/?lang=en"}>{zh ? "下载 Aether" : "Download Aether"} <span aria-hidden="true">↗</span></a>
        </footer>
      </main>
    </div>
  );
}
