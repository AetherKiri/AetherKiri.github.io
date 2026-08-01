"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

type Language = "zh" | "en";

const github = "https://github.com/AetherKiri/AetherKiri";
const issues = `${github}/issues`;

const copy = {
  zh: {
    announcement: "Aether 0.1.0-alpha.3 已发布",
    announcementAction: "看看更新了什么",
    nav: [
      ["#about", "关于"],
      ["#contact", "联系"],
    ],
    hero: {
      eyebrow: "OPEN-SOURCE KIRIKIRI2 RUNTIME",
      titleA: "让故事",
      titleB: "再次抵达你",
      text: "Aether 用 Godot 与 C++ 重构 KiriKiri2 运行时，让熟悉的视觉小说自然抵达今天的每一块屏幕。",
      contact: "在 GitHub 联系我们",
      preview: "新功能预览",
      platforms: ["macOS", "iOS / iPadOS", "Android", "Web"],
    },
    about: {
      title: "什么是 Aether？",
      text: "Aether 是一个由 Godot 承载、以 C++17 核心驱动的跨平台 KiriKiri2 运行时。熟悉的脚本、图层、声音、存档与插件仍然保留，并以现代渲染和多平台体验与你重新相遇。",
    },
    contact: {
      title: "我们可以在哪里找到您？",
      repositoryBefore: "想了解开发进展、源代码和发布版本，可以前往我们的",
      repository: "GitHub 仓库",
      issuesBefore: "如果你想分享想法、提出问题、参与项目方向讨论，或反馈缺陷与游戏兼容性问题，欢迎来到",
      issues: "GitHub Issues",
    },
    panel: {
      eyebrow: "WHAT'S NEW",
      title: "版本能力预览",
      intro: "从最新修复到跨平台基础，看看每个公开版本带来了什么。",
      close: "关闭版本预览",
      openRelease: "查看完整发布说明",
      latest: "LATEST",
      foundation: "FOUNDATION",
      versions: [
        {
          tag: "0.1.0-alpha.3",
          date: "2026.08.01",
          label: "LATEST",
          title: "渲染与角色图层兼容",
          items: ["恢复兼容的角色图层显示", "避免重型转场过程出现黑帧"],
        },
        {
          tag: "0.1.0-alpha.2",
          date: "2026.07.31",
          label: "FOUNDATION",
          title: "跨平台运行基础",
          items: [
            "升级 Godot 4.7 与原生渲染链路",
            "接入 Web、Linux、Android 与 iOS 支持",
            "加入内置多语言 KAG3 Demo",
            "改善存储、字体、视频与插件兼容能力",
          ],
        },
      ],
    },
    footer: {
      line: "A Godot-hosted KiriKiri2 runtime.",
      source: "Source",
      releases: "Releases",
      license: "GPL-3.0-or-later",
    },
  },
  en: {
    announcement: "Aether 0.1.0-alpha.3 is live",
    announcementAction: "See what changed",
    nav: [
      ["#about", "About"],
      ["#contact", "Contact"],
    ],
    hero: {
      eyebrow: "OPEN-SOURCE KIRIKIRI2 RUNTIME",
      titleA: "Let stories",
      titleB: "find you again",
      text: "Aether rebuilds the KiriKiri2 runtime with Godot and C++, bringing familiar visual novels naturally to today’s screens.",
      contact: "Find us on GitHub",
      preview: "Preview what’s new",
      platforms: ["macOS", "iOS / iPadOS", "Android", "Web"],
    },
    about: {
      title: "What is Aether?",
      text: "Aether is a cross-platform KiriKiri2 runtime hosted by Godot and driven by a C++17 core. Familiar scripts, layers, sound, saves, and plugins remain—meeting you again through modern rendering and a multi-platform experience.",
    },
    contact: {
      title: "Where can we find you?",
      repositoryBefore: "For development progress, source code, and releases, visit our",
      repository: "GitHub repository",
      issuesBefore: "To share ideas, ask questions, shape the project, or report bugs and game compatibility findings, visit",
      issues: "GitHub Issues",
    },
    panel: {
      eyebrow: "WHAT'S NEW",
      title: "Version capability preview",
      intro: "From the latest fixes to the cross-platform foundation, see what each public release added.",
      close: "Close version preview",
      openRelease: "Read the full release notes",
      latest: "LATEST",
      foundation: "FOUNDATION",
      versions: [
        {
          tag: "0.1.0-alpha.3",
          date: "AUG 01, 2026",
          label: "LATEST",
          title: "Rendering and character layers",
          items: ["Restored compatible character-layer rendering", "Prevented black frames during heavy transitions"],
        },
        {
          tag: "0.1.0-alpha.2",
          date: "JUL 31, 2026",
          label: "FOUNDATION",
          title: "Cross-platform runtime foundation",
          items: [
            "Upgraded to Godot 4.7 and native rendering",
            "Added Web, Linux, Android, and iOS support",
            "Bundled a multilingual KAG3 demo",
            "Improved storage, fonts, video, and plugin compatibility",
          ],
        },
      ],
    },
    footer: {
      line: "A Godot-hosted KiriKiri2 runtime.",
      source: "Source",
      releases: "Releases",
      license: "GPL-3.0-or-later",
    },
  },
} as const;

export function AetherSite() {
  const heroRef = useRef<HTMLElement>(null);
  const [language, setLanguage] = useState<Language>("zh");
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  useEffect(() => {
    if (!previewOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewOpen(false);
    };
    document.body.classList.add("preview-is-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("preview-is-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [previewOpen]);

  const closeMenu = () => setMenuOpen(false);
  const openPreview = () => {
    setMenuOpen(false);
    setPreviewOpen(true);
  };

  const setHeroMotion = (x: number, y: number) => {
    const hero = heroRef.current;
    if (!hero) return;
    hero.style.setProperty("--bg-x", `${x * -7}px`);
    hero.style.setProperty("--bg-y", `${y * -4}px`);
    hero.style.setProperty("--character-x", `${x * 14}px`);
    hero.style.setProperty("--character-y", `${y * 9}px`);
    hero.style.setProperty("--orrery-x", `${x * 26}px`);
    hero.style.setProperty("--orrery-y", `${y * 17}px`);
    hero.style.setProperty("--dust-x", `${x * 34}px`);
    hero.style.setProperty("--dust-y", `${y * 22}px`);
  };

  const moveHero = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    setHeroMotion(x, y);
  };

  return (
    <div className="marketing-site">
      <a className="skip-link" href="#content">Skip to content</a>

      <div className="announcement">
        <span>{t.announcement}</span>
        <button onClick={openPreview}>{t.announcementAction}<i>↗</i></button>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Aether home">
          <img src="/app-icon.png" alt="" width="40" height="40" />
          <span>Aether</span>
        </a>

        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
          {t.nav.map(([href, label]) => <a href={href} key={href} onClick={closeMenu}>{label}</a>)}
        </nav>

        <div className="header-actions">
          <div className="language-toggle" aria-label="Language">
            <button className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")}>中</button>
            <span>/</span>
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
          </div>
          <a className="header-contact" href={github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            <i /><i />
          </button>
        </div>
      </header>

      <main id="content">
        <section
          className="hero"
          id="top"
          ref={heroRef}
          onPointerMove={moveHero}
          onPointerLeave={() => setHeroMotion(0, 0)}
        >
          <div className="hero-scene" aria-hidden="true">
            <div className="hero-layer hero-background-layer">
              <img className="hero-background-image" src="/hero-background-v2.png" alt="" />
            </div>
            <div className="hero-nebula" />
            <div className="hero-constellation">
              <i /><i /><i />
            </div>
            <div className="hero-layer hero-character-layer">
              <img className="hero-character-image" src="/hero-character-v2.png" alt="" />
            </div>
            <div className="hero-layer hero-orrery-layer">
              <div className="hero-orrery-motion">
                <img className="hero-orrery-image" src="/hero-orrery-v2.png" alt="" />
                <i className="hero-orrery-ring ring-one" />
                <i className="hero-orrery-ring ring-two" />
              </div>
            </div>
            <div className="hero-dust">
              {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
            </div>
          </div>
          <div className="hero-shade" />
          <div className="hero-stars" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow light"><i />{t.hero.eyebrow}</p>
            <h1><span>{t.hero.titleA}</span><em>{t.hero.titleB}</em></h1>
            <p className="hero-text">{t.hero.text}</p>
            <div className="hero-actions">
              <a className="button button-light" href={github} target="_blank" rel="noreferrer">{t.hero.contact}<span>↗</span></a>
              <button className="button button-ghost" onClick={openPreview}>{t.hero.preview}<span>＋</span></button>
            </div>
            <div className="platform-list" aria-label="Supported platforms">
              {t.hero.platforms.map((platform) => <span key={platform}>{platform}</span>)}
            </div>
          </div>
          <a className="scroll-note" href="#about"><span>SCROLL</span><i /></a>
        </section>

        <section className="info-section" id="about">
          <div className="paper-orbit orbit-one" aria-hidden="true">✦</div>
          <div className="paper-orbit orbit-two" aria-hidden="true">A</div>
          <div className="section-inner info-grid">
            <article className="info-column">
              <h2>{t.about.title}</h2>
              <p>{t.about.text}</p>
            </article>
            <article className="info-column" id="contact">
              <h2>{t.contact.title}</h2>
              <p>{t.contact.repositoryBefore} <a href={github} target="_blank" rel="noreferrer">{t.contact.repository}</a>{language === "zh" ? "。" : "."}</p>
              <p>{t.contact.issuesBefore} <a href={issues} target="_blank" rel="noreferrer">{t.contact.issues}</a>{language === "zh" ? "。" : "."}</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand"><img src="/app-icon.png" alt="" width="46" height="46" /><div><strong>Aether</strong><span>{t.footer.line}</span></div></div>
          <div className="footer-links">
            <a href={github} target="_blank" rel="noreferrer">{t.footer.source}</a>
            <a href={`${github}/releases`} target="_blank" rel="noreferrer">{t.footer.releases}</a>
            <a href={`${github}/blob/main/LICENSE`} target="_blank" rel="noreferrer">{t.footer.license}</a>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Aether</span><span>Stories, across every screen.</span></div>
      </footer>

      {previewOpen && (
        <div className="preview-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.currentTarget === event.target) setPreviewOpen(false);
        }}>
          <section className="preview-panel" role="dialog" aria-modal="true" aria-labelledby="preview-title">
            <div className="preview-head">
              <div>
                <p className="eyebrow">{t.panel.eyebrow}</p>
                <h2 id="preview-title">{t.panel.title}</h2>
                <p>{t.panel.intro}</p>
              </div>
              <button className="preview-close" onClick={() => setPreviewOpen(false)} aria-label={t.panel.close}>×</button>
            </div>
            <div className="version-list">
              {t.panel.versions.map((version) => (
                <article className="version-card" key={version.tag}>
                  <div className="version-meta"><span>{version.label}</span><time>{version.date}</time></div>
                  <div className="version-body">
                    <div><strong>{version.tag}</strong><h3>{version.title}</h3></div>
                    <ul>{version.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <a href={`${github}/releases/tag/${version.tag}`} target="_blank" rel="noreferrer">{t.panel.openRelease}<span>↗</span></a>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
