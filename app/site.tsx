"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Language = "zh" | "en";

const github = "https://github.com/AetherKiri/AetherKiri";

const copy = {
  zh: {
    nav: [
      ["#about", "关于"],
      ["#magic", "能力"],
      ["#journey", "旅程"],
      ["#compatibility", "兼容"],
    ],
    hero: {
      overline: "A KIRIKIRI2 STORY ENGINE, REIMAGINED",
      titleA: "让故事",
      titleB: "再次抵达你",
      text: "Aether 以 C++17 重构 KiriKiri2 运行时，并由 Godot 4.7 将熟悉的视觉小说带到今天的屏幕。",
      primary: "开启这段旅程",
      secondary: "查看源代码",
      side: "Stories, across every screen",
      platforms: ["macOS", "iOS / iPadOS", "Android", "Web"],
    },
    about: {
      eyebrow: "WHAT IS AETHER?",
      title: "旧日的故事，\n新的相遇方式。",
      text: "它是一套由 Godot 承载、以 C++ 引擎核心驱动的 KiriKiri2 运行时。脚本、图层、声音、存档与插件仍然熟悉，而运行它们的舞台已经焕然一新。",
      note: "为视觉小说的保存、研究与跨平台体验而生",
    },
    magic: {
      eyebrow: "A LITTLE RUNTIME MAGIC",
      title: "每一层技术，\n都为了不打断沉浸。",
      items: [
        ["✦", "原生 GPU 渲染", "默认使用 Godot Native 路径，让画面直接进入 Godot 持有的 RenderingDevice 资源。"],
        ["◇", "完整运行时核心", "视觉、音频、存储、VM 与插件支持，由一套 C++17 核心统一驱动。"],
        ["⌁", "跨平台交付", "macOS、iOS / iPadOS、Android 与 Web 已接入正式导出链路。"],
        ["◌", "从第一次启动就能玩", "内置多语言 KAG3 Demo，与导入游戏共享游戏库、游玩时长和存档流程。"],
      ],
    },
    journey: {
      eyebrow: "HOW STORIES TRAVEL",
      title: "从一份游戏，\n到每一块屏幕。",
      text: "清晰的产品边界，让平台体验和兼容能力可以一起生长。",
      steps: [
        ["01", "导入", "选择本地游戏目录或 XP3 内容"],
        ["02", "运行", "KiriKiri Runtime 与插件解析故事"],
        ["03", "呈现", "Godot Native 接管图形资源与界面"],
        ["04", "延续", "设置和存档在设备上持续保留"],
      ],
      web: "Web 版支持按需读取大型内容，存档保留在当前站点的 IndexedDB 中。",
    },
    compatibility: {
      eyebrow: "COMPATIBILITY, WITH EVIDENCE",
      title: "不是“应该能玩”，\n而是认真玩过。",
      number: "34",
      label: "款游戏已手动验证",
      updated: "兼容清单更新于 2026.08.01",
      text: "每一条记录都注明平台、构建类型、验证范围与测试者，并明确区分冒烟验证和完整流程验证。",
      action: "翻开完整兼容清单",
      games: ["RIDDLE JOKER", "9-nine-", "NEKOPARA Vol. 1", "千恋＊万花", "GINKA", "まいてつ"],
    },
    architecture: {
      eyebrow: "BEHIND THE CURTAIN",
      title: "幕后魔法的\n五层结构。",
      text: "从产品外壳到脚本运行时，每一层都有清楚的职责，也留下可调试、可复现的路径。",
      layers: [
        ["Godot App Shell", "产品 UI、设置与多平台打包"],
        ["GDExtension Host", "原生宿主与渲染资源管理"],
        ["C ABI Engine API", "稳定的宿主驱动接口"],
        ["C++ Engine Core", "视觉、音频、存储、VM 与输入"],
        ["KiriKiri Runtime / Plugins", "脚本运行时与插件兼容层"],
      ],
    },
    open: {
      eyebrow: "OPEN SOURCE · GPL-3.0-OR-LATER",
      title: "故事属于每一个\n愿意守护它的人。",
      text: "公开版本无需私有组件即可构建。代码、测试、诊断工具、兼容记录与开发文档都留在阳光下。",
      source: "在 GitHub 上相遇",
      issues: "参与讨论",
    },
    footer: {
      line: "A Godot-hosted KiriKiri2 runtime.",
      source: "源代码",
      docs: "开发文档",
      issues: "Issues",
      license: "GPL-3.0-or-later",
    },
  },
  en: {
    nav: [
      ["#about", "About"],
      ["#magic", "Features"],
      ["#journey", "Journey"],
      ["#compatibility", "Compatibility"],
    ],
    hero: {
      overline: "A KIRIKIRI2 STORY ENGINE, REIMAGINED",
      titleA: "Let stories",
      titleB: "find you again",
      text: "Aether rebuilds the KiriKiri2 runtime in C++17, with Godot 4.7 bringing familiar visual novels to today’s screens.",
      primary: "Begin the journey",
      secondary: "Explore the source",
      side: "Stories, across every screen",
      platforms: ["macOS", "iOS / iPadOS", "Android", "Web"],
    },
    about: {
      eyebrow: "WHAT IS AETHER?",
      title: "Stories remembered,\nencounters renewed.",
      text: "A Godot-hosted KiriKiri2 runtime driven by a native C++ engine core. Scripts, layers, sound, saves, and plugins remain familiar—only their stage has been renewed.",
      note: "Made for visual novel preservation, research, and cross-platform play",
    },
    magic: {
      eyebrow: "A LITTLE RUNTIME MAGIC",
      title: "Every technical layer\nprotects the immersion.",
      items: [
        ["✦", "Native GPU rendering", "Godot Native is the default path, moving frames into Godot-owned RenderingDevice resources."],
        ["◇", "A complete runtime core", "Visuals, audio, storage, VM, and plugin support are driven by one C++17 core."],
        ["⌁", "Cross-platform delivery", "Export paths are wired for macOS, iOS / iPadOS, Android, and Web."],
        ["◌", "Playable from first launch", "A multilingual KAG3 demo joins the library with the same play-time and save flow."],
      ],
    },
    journey: {
      eyebrow: "HOW STORIES TRAVEL",
      title: "From one game\nto every screen.",
      text: "Clear product boundaries let platform experience and compatibility grow together.",
      steps: [
        ["01", "Import", "Choose a local directory or XP3 content"],
        ["02", "Run", "KiriKiri Runtime and plugins interpret the story"],
        ["03", "Render", "Godot Native owns graphics resources and UI"],
        ["04", "Continue", "Settings and saves persist on the device"],
      ],
      web: "On the Web, large files stream on demand while saves persist in IndexedDB for the current site.",
    },
    compatibility: {
      eyebrow: "COMPATIBILITY, WITH EVIDENCE",
      title: "Not “it should run.”\nActually played.",
      number: "34",
      label: "titles manually verified",
      updated: "Compatibility list updated 2026.08.01",
      text: "Every record names the platform, build, verification scope, and tester—and distinguishes smoke checks from full flow tests.",
      action: "Open the compatibility log",
      games: ["RIDDLE JOKER", "9-nine-", "NEKOPARA Vol. 1", "Senren＊Banka", "GINKA", "Maitetsu"],
    },
    architecture: {
      eyebrow: "BEHIND THE CURTAIN",
      title: "Five layers\nbehind the magic.",
      text: "From product shell to script runtime, every layer has a clear role and leaves a path that can be debugged and reproduced.",
      layers: [
        ["Godot App Shell", "Product UI, settings, and platform packaging"],
        ["GDExtension Host", "Native hosting and render resources"],
        ["C ABI Engine API", "A stable host-to-engine interface"],
        ["C++ Engine Core", "Visuals, audio, storage, VM, and input"],
        ["KiriKiri Runtime / Plugins", "Script runtime and plugin compatibility"],
      ],
    },
    open: {
      eyebrow: "OPEN SOURCE · GPL-3.0-OR-LATER",
      title: "Stories belong to everyone\nwho chooses to preserve them.",
      text: "The public build needs no private packages. Code, tests, diagnostics, compatibility notes, and developer guides all live in the open.",
      source: "Meet us on GitHub",
      issues: "Join the discussion",
    },
    footer: {
      line: "A Godot-hosted KiriKiri2 runtime.",
      source: "Source",
      docs: "Developer guide",
      issues: "Issues",
      license: "GPL-3.0-or-later",
    },
  },
} as const;

function Lines({ children }: { children: string }) {
  return <>{children.split("\n").map((line, index) => <span key={`${line}-${index}`}>{line}</span>)}</>;
}

export function AetherSite() {
  const [language, setLanguage] = useState<Language>("zh");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [language]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="dream-site">
      <a className="skip-link" href="#content">Skip to content</a>

      <header className="dream-header">
        <a className="dream-brand" href="#top" onClick={closeMenu} aria-label="Aether home">
          <img src="/app-icon.png" alt="" width="42" height="42" />
          <span>Aether</span>
        </a>
        <nav className={menuOpen ? "dream-nav open" : "dream-nav"} aria-label="Primary navigation">
          {t.nav.map(([href, label]) => <a href={href} key={href} onClick={closeMenu}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <div className="language-toggle" aria-label="Language">
            <button className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")}>中文</button>
            <i />
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
          </div>
          <a className="header-github" href={github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            <span /><span />
          </button>
        </div>
      </header>

      <main id="content">
        <section className="dream-hero" id="top">
          <img className="hero-illustration" src="/aetherkiri-muse.png" alt="Blue-haired anime astronomer in a starlit study" />
          <div className="hero-veil" />
          <div className="constellation constellation-a" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="constellation constellation-b" aria-hidden="true"><i /><i /><i /></div>
          <span className="floating-glyph glyph-one" aria-hidden="true">✦</span>
          <span className="floating-glyph glyph-two" aria-hidden="true">◇</span>
          <span className="floating-glyph glyph-three" aria-hidden="true">☾</span>

          <div className="hero-copy">
            <p className="hero-overline"><i />{t.hero.overline}</p>
            <h1><span>{t.hero.titleA}</span><em>{t.hero.titleB}</em></h1>
            <p className="hero-description">{t.hero.text}</p>
            <div className="hero-buttons">
              <a className="dream-button primary" href="#about">{t.hero.primary}<span>↓</span></a>
              <a className="dream-button quiet" href={github} target="_blank" rel="noreferrer">{t.hero.secondary}<span>↗</span></a>
            </div>
            <div className="hero-platforms">
              {t.hero.platforms.map((platform) => <span key={platform}>{platform}</span>)}
            </div>
          </div>

          <p className="hero-side-note">{t.hero.side}</p>
          <a className="hero-scroll" href="#about" aria-label="Scroll down"><span>SCROLL</span><i /></a>
        </section>

        <section className="paper-section about-section" id="about">
          <div className="paper-wave" aria-hidden="true" />
          <div className="ink-star star-left" aria-hidden="true">✦</div>
          <div className="ink-orbit" aria-hidden="true"><i /><span>AE</span></div>
          <div className="section-wrap about-grid reveal">
            <div>
              <p className="chapter-label">{t.about.eyebrow}</p>
              <h2 className="editorial-title"><Lines>{t.about.title}</Lines></h2>
            </div>
            <div className="about-copy">
              <p>{t.about.text}</p>
              <div className="hand-note"><span>↳</span>{t.about.note}</div>
              <div className="signature">Aether <i>✦</i></div>
            </div>
          </div>
        </section>

        <section className="magic-section" id="magic">
          <div className="magic-cloud cloud-one" aria-hidden="true" />
          <div className="magic-cloud cloud-two" aria-hidden="true" />
          <div className="section-wrap">
            <div className="magic-heading reveal">
              <p className="chapter-label">{t.magic.eyebrow}</p>
              <h2 className="editorial-title"><Lines>{t.magic.title}</Lines></h2>
            </div>
            <div className="magic-cards">
              {t.magic.items.map(([icon, title, text], index) => (
                <article className={`magic-card magic-card-${index + 1} reveal`} key={title} style={{ "--delay": `${index * 80}ms` } as CSSProperties}>
                  <div className="card-charm" aria-hidden="true">{icon}</div>
                  <span className="card-index">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="journey-section" id="journey">
          <div className="journey-stars" aria-hidden="true" />
          <div className="section-wrap journey-grid">
            <div className="journey-heading reveal">
              <p className="chapter-label light">{t.journey.eyebrow}</p>
              <h2 className="editorial-title light"><Lines>{t.journey.title}</Lines></h2>
              <p>{t.journey.text}</p>
              <div className="web-note"><span>WEB</span>{t.journey.web}</div>
            </div>
            <div className="journey-steps">
              {t.journey.steps.map(([number, title, text], index) => (
                <article className="journey-step reveal" key={title} style={{ "--delay": `${index * 90}ms` } as CSSProperties}>
                  <div className="step-number">{number}</div>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <span aria-hidden="true">{index === t.journey.steps.length - 1 ? "✦" : "↓"}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="compat-section" id="compatibility">
          <div className="section-wrap compat-grid">
            <div className="compat-copy reveal">
              <p className="chapter-label">{t.compatibility.eyebrow}</p>
              <h2 className="editorial-title"><Lines>{t.compatibility.title}</Lines></h2>
              <p className="compat-description">{t.compatibility.text}</p>
              <a className="ink-link" href={`${github}/blob/main/doc/verified_games.zh-CN.md`} target="_blank" rel="noreferrer">{t.compatibility.action}<span>↗</span></a>
            </div>
            <div className="compat-card reveal">
              <div className="compat-moon" aria-hidden="true">☾</div>
              <div className="compat-number">{t.compatibility.number}<sup>+</sup></div>
              <strong>{t.compatibility.label}</strong>
              <small>{t.compatibility.updated}</small>
              <div className="game-ribbons">
                {t.compatibility.games.map((game, index) => <span key={game} style={{ "--rotate": `${index % 2 ? 1.4 : -1.1}deg` } as CSSProperties}>{game}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="architecture-section">
          <div className="section-wrap architecture-grid">
            <div className="architecture-heading reveal">
              <p className="chapter-label">{t.architecture.eyebrow}</p>
              <h2 className="editorial-title"><Lines>{t.architecture.title}</Lines></h2>
              <p>{t.architecture.text}</p>
            </div>
            <div className="layer-book">
              {t.architecture.layers.map(([title, text], index) => (
                <article className="layer-row reveal" key={title} style={{ "--delay": `${index * 70}ms` } as CSSProperties}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <i aria-hidden="true">✦</i>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="open-section" id="open-source">
          <div className="open-sky" aria-hidden="true" />
          <div className="open-symbol symbol-a" aria-hidden="true">✧</div>
          <div className="open-symbol symbol-b" aria-hidden="true">◇</div>
          <div className="open-content reveal">
            <img src="/app-icon.png" alt="Aether app icon" width="104" height="104" />
            <p className="chapter-label light">{t.open.eyebrow}</p>
            <h2 className="editorial-title light"><Lines>{t.open.title}</Lines></h2>
            <p>{t.open.text}</p>
            <div className="open-buttons">
              <a className="dream-button paper" href={github} target="_blank" rel="noreferrer">{t.open.source}<span>↗</span></a>
              <a className="dream-button outline" href={`${github}/issues`} target="_blank" rel="noreferrer">{t.open.issues}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="dream-footer">
        <div className="footer-top">
          <div className="footer-brand"><img src="/app-icon.png" alt="" width="54" height="54" /><div><strong>Aether</strong><span>{t.footer.line}</span></div></div>
          <div className="footer-links">
            <a href={github} target="_blank" rel="noreferrer">{t.footer.source}</a>
            <a href={`${github}/blob/main/doc/development.zh-CN.md`} target="_blank" rel="noreferrer">{t.footer.docs}</a>
            <a href={`${github}/issues`} target="_blank" rel="noreferrer">{t.footer.issues}</a>
            <a href={`${github}/blob/main/LICENSE`} target="_blank" rel="noreferrer">{t.footer.license}</a>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Aether</span><span>Stories, across every screen.</span></div>
      </footer>
    </div>
  );
}
