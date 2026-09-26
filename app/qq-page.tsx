"use client";
/* Also bundled by the plain-Vite GitHub Pages build, where next/link is unavailable. */
/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { GROUP_NUMBER, QQ_APP_URL, SHARE_URL } from "./community";
import { Cosmos, Cursor, SplitText, copyText, magnetic, spotlight, tilt, useScrollMotion } from "./effects";

type Language = "zh" | "en";

const copy = {
  zh: {
    back: "返回首页",
    kicker: "AETHER 官方社群",
    titleA: "加入",
    titleB: "Aether 用户群",
    desc: "新游适配、运行时进展、构建与联调问题直接群内响应",
    highlights: ["新游适配", "运行时进展", "构建与联调"],
    groupName: "Aether用户群",
    groupMeta: "QQ 群 · 官方",
    official: "OFFICIAL",
    numberLabel: "群号",
    tapToCopy: "点击复制",
    join: "打开链接加入群聊",
    copyJump: "复制群号并打开 QQ",
    copyNumber: "复制群号",
    linkLabel: "邀请链接",
    copyLink: "复制链接",
    toastNumber: "群号已复制",
    toastLink: "邀请链接已复制",
    toastJump: "群号已复制，正在打开 QQ…",
    toastFail: "复制失败，请手动选择群号",
    guideTitle: "打不开链接？",
    guide: ["复制群号 1108465212", "打开 QQ，点击右上角「＋」→「加好友/群」", "粘贴群号搜索，申请加入即可"],
    footer: "Stories, across every screen.",
  },
  en: {
    back: "Back home",
    kicker: "AETHER OFFICIAL COMMUNITY",
    titleA: "Join the",
    titleB: "Aether community",
    desc: "Game adaptation, runtime progress, build & integration support",
    highlights: ["Game adaptation", "Runtime progress", "Build & integration"],
    groupName: "Aether用户群",
    groupMeta: "QQ Group · Official",
    official: "OFFICIAL",
    numberLabel: "Group number",
    tapToCopy: "Tap to copy",
    join: "Join via invite link",
    copyJump: "Copy number & open QQ",
    copyNumber: "Copy number",
    linkLabel: "Invite link",
    copyLink: "Copy link",
    toastNumber: "Group number copied",
    toastLink: "Invite link copied",
    toastJump: "Number copied — opening QQ…",
    toastFail: "Copy failed — please select the number manually",
    guideTitle: "Link won’t open?",
    guide: ["Copy the group number 1108465212", "Open QQ, tap “+” → “Add friends/groups”", "Paste the number, search, and request to join"],
    footer: "Stories, across every screen.",
  },
} as const;

const isMobile = () =>
  /Android|iPhone|iPad|iPod|HarmonyOS|Mobile/i.test(navigator.userAgent) ||
  (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent));

/* Tries the QQ app first; if the page is still in front after a moment, falls back to the web invite. */
function openQQ() {
  if (!isMobile()) {
    window.open(SHARE_URL, "_blank", "noopener");
    return;
  }
  let left = false;
  const onHide = () => { left = true; };
  document.addEventListener("visibilitychange", onHide, { once: true });
  window.addEventListener("pagehide", onHide, { once: true });
  window.location.href = QQ_APP_URL;
  window.setTimeout(() => {
    document.removeEventListener("visibilitychange", onHide);
    window.removeEventListener("pagehide", onHide);
    if (!left && document.visibilityState === "visible") window.location.href = SHARE_URL;
  }, 1600);
}

export function AetherQQ() {
  const [language, setLanguage] = useState<Language>("zh");
  const [toast, setToast] = useState<{ id: number; text: string; ok: boolean } | null>(null);
  const [burst, setBurst] = useState(0);
  const toastTimer = useRef(0);
  const scrolled = useScrollMotion();
  const t = copy[language];

  /* `?lang=en` deep-links straight into English (read after hydration). */
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("lang") !== "en") return;
    const raf = window.requestAnimationFrame(() => setLanguage("en"));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const notify = (text: string, ok = true) => {
    window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), text, ok });
    toastTimer.current = window.setTimeout(() => setToast(null), 2400);
  };

  const copyNumber = async () => {
    const ok = await copyText(GROUP_NUMBER);
    if (ok) setBurst((n) => n + 1);
    notify(ok ? t.toastNumber : t.toastFail, ok);
  };
  const copyLink = async () => {
    const ok = await copyText(SHARE_URL);
    notify(ok ? t.toastLink : t.toastFail, ok);
  };
  const copyAndJump = () => {
    /* Start the copy inside the click, then navigate without waiting so popups are not blocked. */
    const copied = copyText(GROUP_NUMBER);
    openQQ();
    void copied.then((ok) => {
      if (ok) setBurst((n) => n + 1);
      notify(ok ? t.toastJump : t.toastFail, ok);
    });
  };

  return (
    <div className="site qq-site">
      <a className="skip-link" href="#content">Skip to content</a>
      <Cosmos />
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="grain" aria-hidden="true" />
      <Cursor />

      <div className="qq-backdrop" aria-hidden="true">
        <img src="/hero-background-v2.webp" alt="" />
        <svg className="qq-orbits" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="390" />
          <circle cx="400" cy="400" r="300" strokeDasharray="2 12" />
          <circle cx="400" cy="400" r="210" />
          <g className="qq-orbit-a"><circle className="qq-orbit-body" cx="400" cy="10" r="4" /></g>
          <g className="qq-orbit-b"><circle className="qq-orbit-body warm" cx="700" cy="400" r="3" /></g>
          <g className="qq-orbit-c"><circle className="qq-orbit-body" cx="400" cy="610" r="3" /></g>
        </svg>
      </div>

      <header className={scrolled ? "site-header is-quick is-scrolled" : "site-header is-quick"}>
        <div className="header-shell qq-header-shell">
          <a className="brand" href="/" aria-label="Aether home">
            <span className="brand-mark"><img src="/app-icon.png" alt="" width="34" height="34" /></span>
            <span className="brand-name">Aether</span>
          </a>
          <div className="header-actions">
            <div className="language-toggle" role="group" aria-label="Language" data-lang={language}>
              <span className="language-thumb" aria-hidden="true" />
              <button className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")} aria-pressed={language === "zh"}>中</button>
              <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
            </div>
            <a className="header-contact qq-back" href="/" onPointerMove={spotlight}>
              <span aria-hidden="true">←</span>
              <span>{t.back}</span>
            </a>
          </div>
        </div>
      </header>

      <main id="content" className="qq-main">
        <section className="qq-intro">
          <p className="section-kicker qq-rise" style={{ "--d": ".1s" } as CSSProperties}><i />{t.kicker}</p>
          <h1 key={language}>
            <span className="qq-line"><SplitText text={t.titleA} delay={0.2} step={language === "zh" ? 0.08 : 0.035} /></span>
            <em className="qq-line"><SplitText text={t.titleB} delay={0.38} step={language === "zh" ? 0.07 : 0.035} /></em>
          </h1>
          <p className="qq-desc qq-rise" style={{ "--d": ".75s" } as CSSProperties}>{t.desc}</p>
          <ul className="qq-highlights" aria-label={t.desc}>
            {t.highlights.map((item, index) => (
              <li key={item} style={{ "--d": `${0.85 + index * 0.08}s` } as CSSProperties}><i aria-hidden="true" />{item}</li>
            ))}
          </ul>
        </section>

        <section className="qq-stage" aria-label={t.groupName}>
          <article className="qq-invite" {...tilt(4)}>
            <span className="qq-beam" aria-hidden="true" />
            <span className="card-glow" aria-hidden="true" />
            <span className="qq-holo" aria-hidden="true" />

            <div className="qq-identity">
              <div className="qq-avatar" aria-hidden="true">
                <img src="/app-icon.png" alt="" width="72" height="72" />
                <i /><i />
              </div>
              <div className="qq-name">
                <h2>{t.groupName}</h2>
                <p>{t.groupMeta}</p>
              </div>
              <span className="qq-official"><i aria-hidden="true" />{t.official}</span>
            </div>

            <button className="qq-number" onClick={copyNumber} onPointerMove={spotlight} aria-label={`${t.copyNumber} ${GROUP_NUMBER}`}>
              <span className="qq-number-head">
                <span>{t.numberLabel}</span>
                <span className="qq-number-hint">{t.tapToCopy}<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="5" y="5" width="9" height="9" rx="2" /><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" /></svg></span>
              </span>
              <span className="qq-digits" aria-hidden="true">
                {Array.from(GROUP_NUMBER).map((digit, index) => (
                  <span className="qq-digit" key={index} style={{ "--v": Number(digit) + 10, "--i": index } as CSSProperties}>
                    <span className="qq-digit-strip">
                      {Array.from({ length: 20 }, (_, n) => <span key={n}>{n % 10}</span>)}
                    </span>
                  </span>
                ))}
              </span>
              {burst > 0 && (
                <span className="qq-burst" key={burst} aria-hidden="true">
                  {Array.from({ length: 14 }, (_, n) => <i key={n} style={{ "--a": `${n * (360 / 14)}deg`, "--r": `${70 + (n % 3) * 26}px` } as CSSProperties} />)}
                </span>
              )}
            </button>

            <div className="qq-buttons">
              <a className="button button-primary qq-join" href={SHARE_URL} target="_blank" rel="noreferrer" {...magnetic}>
                <span className="button-label">{t.join}</span>
                <span className="button-icon" aria-hidden="true">↗</span>
              </a>
              <div className="qq-button-row">
                <button className="button button-glass qq-jump" onClick={copyAndJump} {...magnetic}>
                  <span className="button-label">{t.copyJump}</span>
                  <span className="button-icon" aria-hidden="true">→</span>
                </button>
                <button className="button button-glass" onClick={copyNumber} {...magnetic}>
                  <span className="button-label">{t.copyNumber}</span>
                  <span className="button-icon" aria-hidden="true">⧉</span>
                </button>
              </div>
            </div>

            <div className="qq-link">
              <span className="qq-link-label">{t.linkLabel}</span>
              <div className="qq-link-field">
                <a href={SHARE_URL} target="_blank" rel="noreferrer" title={SHARE_URL}>
                  <b>qun.qq.com</b>/universal-share/share?ac=1&amp;authKey=qzBhrmLZl3…
                </a>
                <button onClick={copyLink}>{t.copyLink}</button>
              </div>
            </div>
          </article>
        </section>

        <section className="qq-guide qq-rise" style={{ "--d": "1.05s" } as CSSProperties}>
          <p className="qq-guide-title">{t.guideTitle}</p>
          <ol>
            {t.guide.map((step, index) => (
              <li key={step}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{step}</li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="qq-footer">
        <span>© {new Date().getFullYear()} Aether</span>
        <span>{t.footer}</span>
      </footer>

      <div className="qq-toast-region" role="status" aria-live="polite">
        {toast && (
          <div className={toast.ok ? "qq-toast" : "qq-toast is-error"} key={toast.id}>
            <span className="qq-toast-icon" aria-hidden="true">{toast.ok ? "✓" : "!"}</span>
            {toast.text}
          </div>
        )}
      </div>
    </div>
  );
}
