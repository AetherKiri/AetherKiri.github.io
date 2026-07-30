"use client";

import { useEffect, useState } from "react";

type Language = "zh" | "en";

const copy = {
  zh: {
    nav: {
      features: "核心能力",
      architecture: "技术架构",
      compatibility: "兼容进展",
      source: "开源",
      github: "GitHub",
    },
    hero: {
      badge: "Godot 驱动的 KiriKiri2 跨平台运行时",
      line1: "让每一段故事",
      line2: "跨越屏幕，再次相遇",
      description:
        "AetherKiri 以 C++17 引擎核心承载 KiriKiri2 内容，由 Godot 4.7 负责现代化界面、原生 GPU 渲染与多平台交付。",
      source: "探索源代码",
      guide: "阅读构建指南",
      platforms: "已接入导出链路",
      native: "Godot Native",
      backend: "默认渲染后端",
      demo: "内置 KAG3 Demo",
      demoNote: "开箱即可体验",
      library: "游戏库",
      settings: "设置",
      diagnostics: "诊断",
      welcome: "欢迎回来",
      libraryNote: "你的故事，都在这里。",
      builtin: "AetherKiri KAG3 Demo",
      bundled: "内置 · 多语言",
      imported: "导入你的视觉小说",
      local: "本地内容",
      render: "渲染链路",
      gpu: "Godot 持有的 GPU 资源",
      status: "Ready",
    },
    ribbon: ["C++17 Engine", "Godot 4.7", "KiriKiri2 Runtime", "GDExtension", "Open Source"],
    intro: {
      eyebrow: "不只是在运行",
      title: "把熟悉的世界，带到今天的设备上",
      description:
        "从脚本、图层、音频到存储与插件，AetherKiri 重建完整的运行时链路；再用 Godot 将它包装成一套干净、现代、可跨平台演进的产品体验。",
    },
    features: {
      eyebrow: "核心能力",
      title: "一套核心，兼顾性能、兼容与体验",
      renderTitle: "原生 GPU 渲染",
      renderText:
        "默认使用 Godot Native 路径，让引擎帧直接进入 Godot 持有的 RenderingDevice 资源；GPU Bridge 作为可选兼容后端。",
      renderTag: "DEFAULT PATH",
      runtimeTitle: "完整运行时核心",
      runtimeText: "视觉、音频、存储、VM 与插件支持，由 C++17 核心统一驱动。",
      crossTitle: "跨平台交付",
      crossText: "已接入 macOS、iOS / iPadOS、Android 与 Web 导出链路。",
      demoTitle: "从第一次启动就能体验",
      demoText:
        "随产品内置多语言 KAG3 Demo，像普通游戏一样进入游戏库，并拥有同样的启动、游玩时长与本地存档流程。",
      webTitle: "为 Web 场景认真设计",
      webText:
        "浏览器端可授权本地目录或 XP3 文件，按需读取大体积内容；存档留在当前站点的 IndexedDB 持久化目录中。",
      backendTitle: "运行时切换后端",
      backendText: "渲染后端设置可持久化，调试路径保持可见、可比较、可复现。",
    },
    architecture: {
      eyebrow: "技术架构",
      title: "每一层都清晰，每一步都可追踪",
      description:
        "产品界面与引擎核心保持边界：Godot 专注交互与渲染资源，稳定的 C ABI 连接原生运行时，让平台适配和兼容演进可以并行发生。",
      layers: [
        ["01", "Godot App Shell", "产品 UI、设置、导出配置与平台打包"],
        ["02", "GDExtension Host", "Godot 原生宿主与渲染资源管理"],
        ["03", "C ABI Engine API", "稳定、清晰的宿主驱动接口"],
        ["04", "C++ Engine Core", "视觉、音频、存储、VM 与输入"],
        ["05", "KiriKiri Runtime / Plugins", "脚本运行时与插件兼容层"],
      ],
    },
    compatibility: {
      eyebrow: "兼容进展",
      title: "兼容性不是一句口号",
      description:
        "项目维护逐游戏的手动验证记录，明确区分冒烟验证与完整流程验证，并注明平台、构建类型和测试范围。",
      count: "34",
      countLabel: "款游戏已手动验证",
      updated: "清单更新于 2026.07.29",
      report: "查看完整兼容清单",
      chips: ["RIDDLE JOKER", "9-nine-", "NEKOPARA Vol. 1", "千恋＊万花", "GINKA", "まいてつ"],
      scopeTitle: "验证范围",
      scopes: ["导入与启动", "图层与文字渲染", "音频与影片", "存读档流程", "插件路径", "跨平台输入"],
    },
    platforms: {
      eyebrow: "平台支持",
      title: "从桌面，到掌心，再到浏览器",
      cards: [
        ["macOS", "13.0+", "当前原生构建面向 Apple Silicon"],
        ["iOS / iPadOS", "17.0+", "真机 arm64，支持模拟器开发"],
        ["Android", "7.0+", "当前产品导出为 arm64-v8a"],
        ["Web", "Modern Browser", "需要 WASM SIMD、Threads 与跨源隔离"],
      ],
      sourceNote: "Linux 与 Windows 当前可从源码构建。",
    },
    open: {
      eyebrow: "OPEN SOURCE · GPL-3.0-OR-LATER",
      title: "为热爱而构建，也为后来者留下路标",
      description:
        "AetherKiri 的公开版本无需私有组件即可构建与运行。测试、诊断、兼容记录和开发文档都与代码一起开放。",
      star: "在 GitHub 上查看项目",
      issues: "参与讨论",
    },
    footer: {
      statement: "A Godot-hosted KiriKiri2 runtime.",
      source: "源代码",
      docs: "开发文档",
      issues: "Issues",
      license: "GPL-3.0-or-later",
      note: "Built with care for visual novel preservation.",
    },
  },
  en: {
    nav: {
      features: "Features",
      architecture: "Architecture",
      compatibility: "Compatibility",
      source: "Open source",
      github: "GitHub",
    },
    hero: {
      badge: "A Godot-powered, cross-platform KiriKiri2 runtime",
      line1: "Let every story",
      line2: "find you on every screen",
      description:
        "AetherKiri runs KiriKiri2 content on a C++17 engine core, with Godot 4.7 delivering a modern interface, native GPU rendering, and multi-platform exports.",
      source: "Explore the source",
      guide: "Read the build guide",
      platforms: "Export paths wired for",
      native: "Godot Native",
      backend: "Default render backend",
      demo: "Built-in KAG3 Demo",
      demoNote: "Ready from first launch",
      library: "Library",
      settings: "Settings",
      diagnostics: "Diagnostics",
      welcome: "Welcome back",
      libraryNote: "All your stories, one library.",
      builtin: "AetherKiri KAG3 Demo",
      bundled: "Bundled · Multilingual",
      imported: "Import your visual novel",
      local: "Local content",
      render: "Render path",
      gpu: "Godot-owned GPU resources",
      status: "Ready",
    },
    ribbon: ["C++17 Engine", "Godot 4.7", "KiriKiri2 Runtime", "GDExtension", "Open Source"],
    intro: {
      eyebrow: "MORE THAN EMULATION",
      title: "Bring familiar worlds to today’s devices",
      description:
        "From scripts, layers and audio to storage and plugins, AetherKiri rebuilds the complete runtime path—then wraps it in a clean, modern Godot experience designed to evolve across platforms.",
    },
    features: {
      eyebrow: "CORE FEATURES",
      title: "One core, built for performance, compatibility, and experience",
      renderTitle: "Native GPU rendering",
      renderText:
        "Godot Native is the default product path, moving engine frames into Godot-owned RenderingDevice resources. GPU Bridge remains an optional compatibility backend.",
      renderTag: "DEFAULT PATH",
      runtimeTitle: "A complete runtime core",
      runtimeText: "Visuals, audio, storage, VM, and plugin support are driven by one C++17 core.",
      crossTitle: "Cross-platform delivery",
      crossText: "Export paths are wired for macOS, iOS / iPadOS, Android, and Web.",
      demoTitle: "Playable from the first launch",
      demoText:
        "A multilingual KAG3 demo ships in the product library with the same launch, play-time, and local save flow as imported games.",
      webTitle: "Web, designed deliberately",
      webText:
        "Authorize a local directory or XP3 file in the browser, stream large content on demand, and keep saves in the site’s IndexedDB-backed storage.",
      backendTitle: "Runtime-selectable backends",
      backendText: "Persist render settings and keep diagnostic paths visible, comparable, and reproducible.",
    },
    architecture: {
      eyebrow: "ARCHITECTURE",
      title: "Clear boundaries. Traceable behavior.",
      description:
        "The product shell and engine core stay cleanly separated: Godot owns interaction and render resources, while a stable C ABI drives the native runtime so platform work and compatibility work can move in parallel.",
      layers: [
        ["01", "Godot App Shell", "Product UI, settings, export presets, and packaging"],
        ["02", "GDExtension Host", "Native host integration and render resource ownership"],
        ["03", "C ABI Engine API", "A stable, explicit host-to-engine interface"],
        ["04", "C++ Engine Core", "Visuals, audio, storage, VM, and input"],
        ["05", "KiriKiri Runtime / Plugins", "Script runtime and plugin compatibility"],
      ],
    },
    compatibility: {
      eyebrow: "COMPATIBILITY",
      title: "Compatibility, backed by evidence",
      description:
        "The project maintains a per-title manual verification log that distinguishes smoke checks from flow tests, with platforms, builds, and tested scope recorded.",
      count: "34",
      countLabel: "titles manually verified",
      updated: "List updated 2026.07.29",
      report: "View the full compatibility log",
      chips: ["RIDDLE JOKER", "9-nine-", "NEKOPARA Vol. 1", "Senren＊Banka", "GINKA", "Maitetsu"],
      scopeTitle: "VERIFICATION SCOPE",
      scopes: ["Import & launch", "Layers & text", "Audio & video", "Save flows", "Plugin paths", "Cross-platform input"],
    },
    platforms: {
      eyebrow: "PLATFORMS",
      title: "From desktop, to handheld, to browser",
      cards: [
        ["macOS", "13.0+", "Current native build targets Apple Silicon"],
        ["iOS / iPadOS", "17.0+", "arm64 devices with simulator builds for development"],
        ["Android", "7.0+", "Current product export targets arm64-v8a"],
        ["Web", "Modern Browser", "Requires WASM SIMD, Threads, and cross-origin isolation"],
      ],
      sourceNote: "Linux and Windows can currently be built from source.",
    },
    open: {
      eyebrow: "OPEN SOURCE · GPL-3.0-OR-LATER",
      title: "Built for the stories we love—and for those who come next",
      description:
        "AetherKiri’s public repository builds and runs without private packages. Tests, diagnostics, compatibility notes, and development guides live alongside the code.",
      star: "View the project on GitHub",
      issues: "Join the discussion",
    },
    footer: {
      statement: "A Godot-hosted KiriKiri2 runtime.",
      source: "Source",
      docs: "Developer guide",
      issues: "Issues",
      license: "GPL-3.0-or-later",
      note: "Built with care for visual novel preservation.",
    },
  },
} as const;

const github = "https://github.com/AetherKiri/AetherKiri";

export function AetherKiriSite() {
  const [language, setLanguage] = useState<Language>("zh");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [language]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="AetherKiri home">
            <img src="/app-icon.png" alt="" width="42" height="42" />
            <span>AetherKiri</span>
          </a>

          <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
            <a href="#features" onClick={closeMenu}>{t.nav.features}</a>
            <a href="#architecture" onClick={closeMenu}>{t.nav.architecture}</a>
            <a href="#compatibility" onClick={closeMenu}>{t.nav.compatibility}</a>
            <a href="#open-source" onClick={closeMenu}>{t.nav.source}</a>
          </nav>

          <div className="nav-actions">
            <div className="language-switch" aria-label="Language">
              <button
                className={language === "zh" ? "active" : ""}
                onClick={() => setLanguage("zh")}
                aria-pressed={language === "zh"}
              >
                中文
              </button>
              <span>/</span>
              <button
                className={language === "en" ? "active" : ""}
                onClick={() => setLanguage("en")}
                aria-pressed={language === "en"}
              >
                EN
              </button>
            </div>
            <a className="nav-github" href={github} target="_blank" rel="noreferrer">
              {t.nav.github}
              <span aria-hidden="true">↗</span>
            </a>
            <button
              className="menu-button"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="aurora aurora-one" aria-hidden="true" />
          <div className="aurora aurora-two" aria-hidden="true" />
          <div className="star-field" aria-hidden="true" />

          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow-pill">
                <span className="pulse-dot" />
                {t.hero.badge}
              </div>
              <h1>
                <span>{t.hero.line1}</span>
                <span className="gradient-text">{t.hero.line2}</span>
              </h1>
              <p>{t.hero.description}</p>
              <div className="hero-actions">
                <a className="button button-primary" href={github} target="_blank" rel="noreferrer">
                  {t.hero.source}
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="button button-secondary"
                  href={`${github}/blob/main/${language === "zh" ? "README.zh-CN.md#构建" : "README.md#build"}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="play-mark" aria-hidden="true">›</span>
                  {t.hero.guide}
                </a>
              </div>
              <div className="platform-line">
                <span>{t.hero.platforms}</span>
                <div>
                  <b>macOS</b>
                  <b>iOS</b>
                  <b>Android</b>
                  <b>Web</b>
                </div>
              </div>
            </div>

            <div className="hero-product" aria-label="AetherKiri product experience visualization">
              <div className="product-halo" />
              <div className="app-window">
                <div className="window-topbar">
                  <div className="window-dots"><i /><i /><i /></div>
                  <div className="window-title">AetherKiri</div>
                  <div className="status-pill"><span />{t.hero.status}</div>
                </div>
                <div className="window-body">
                  <aside className="app-sidebar">
                    <div className="app-logo">
                      <img src="/app-icon.png" alt="" width="56" height="56" />
                    </div>
                    <div className="side-item active"><span>◇</span>{t.hero.library}</div>
                    <div className="side-item"><span>⌁</span>{t.hero.settings}</div>
                    <div className="side-item"><span>⌘</span>{t.hero.diagnostics}</div>
                    <div className="side-version">AETHER / 0.1</div>
                  </aside>
                  <div className="library-view">
                    <div className="library-heading">
                      <div>
                        <span className="micro-label">{t.hero.library}</span>
                        <h2>{t.hero.welcome}</h2>
                        <p>{t.hero.libraryNote}</p>
                      </div>
                      <button type="button" tabIndex={-1} aria-hidden="true">＋</button>
                    </div>
                    <div className="game-grid">
                      <div className="game-card featured-game">
                        <div className="card-art">
                          <div className="moon" />
                          <div className="horizon" />
                          <span>KAG3</span>
                        </div>
                        <strong>{t.hero.builtin}</strong>
                        <small>{t.hero.bundled}</small>
                      </div>
                      <div className="game-card import-card">
                        <div className="import-icon">＋</div>
                        <strong>{t.hero.imported}</strong>
                        <small>{t.hero.local}</small>
                      </div>
                    </div>
                    <div className="render-bar">
                      <div>
                        <span className="render-icon">R</span>
                        <p><small>{t.hero.render}</small><strong>{t.hero.native}</strong></p>
                      </div>
                      <span>{t.hero.gpu}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="floating-card floating-render">
                <span className="floating-icon">R</span>
                <p><small>{t.hero.backend}</small><strong>{t.hero.native}</strong></p>
              </div>
              <div className="floating-card floating-demo">
                <span className="demo-spark">✦</span>
                <p><strong>{t.hero.demo}</strong><small>{t.hero.demoNote}</small></p>
              </div>
            </div>
          </div>

          <a className="scroll-cue" href="#story" aria-label="Scroll to learn more">
            <span>SCROLL</span>
            <i />
          </a>
        </section>

        <div className="tech-ribbon" aria-hidden="true">
          <div className="ribbon-track">
            {[...t.ribbon, ...t.ribbon].map((item, index) => (
              <span key={`${item}-${index}`}>
                {item}<i>✦</i>
              </span>
            ))}
          </div>
        </div>

        <section className="story section" id="story">
          <div className="section-inner story-inner reveal">
            <p className="section-kicker">{t.intro.eyebrow}</p>
            <h2>{t.intro.title}</h2>
            <p className="story-copy">{t.intro.description}</p>
            <div className="story-mark" aria-hidden="true">
              <span>物語</span>
              <i />
            </div>
          </div>
        </section>

        <section className="features section" id="features">
          <div className="section-inner">
            <div className="section-heading reveal">
              <p className="section-kicker">{t.features.eyebrow}</p>
              <h2>{t.features.title}</h2>
            </div>

            <div className="bento-grid">
              <article className="feature-card render-card reveal">
                <div className="card-topline">
                  <span className="feature-number">01</span>
                  <span className="tag">{t.features.renderTag}</span>
                </div>
                <div className="render-visual" aria-hidden="true">
                  <div className="render-core">GPU</div>
                  <div className="render-ring ring-one" />
                  <div className="render-ring ring-two" />
                  <div className="render-node node-one">Frame</div>
                  <div className="render-node node-two">RD</div>
                  <div className="render-node node-three">Godot</div>
                </div>
                <div>
                  <h3>{t.features.renderTitle}</h3>
                  <p>{t.features.renderText}</p>
                </div>
              </article>

              <article className="feature-card runtime-card reveal">
                <span className="feature-number">02</span>
                <div className="code-stack" aria-hidden="true">
                  {["visual", "audio", "storage", "vm", "plugins"].map((item, index) => (
                    <span key={item} style={{ "--index": index } as React.CSSProperties}>{item}</span>
                  ))}
                </div>
                <div>
                  <h3>{t.features.runtimeTitle}</h3>
                  <p>{t.features.runtimeText}</p>
                </div>
              </article>

              <article className="feature-card cross-card reveal">
                <span className="feature-number">03</span>
                <div className="platform-orbit" aria-hidden="true">
                  <span className="orbit-core">AK</span>
                  <span className="orbit-item orbit-mac">mac</span>
                  <span className="orbit-item orbit-ios">iOS</span>
                  <span className="orbit-item orbit-android">A</span>
                  <span className="orbit-item orbit-web">web</span>
                </div>
                <div>
                  <h3>{t.features.crossTitle}</h3>
                  <p>{t.features.crossText}</p>
                </div>
              </article>

              <article className="feature-card demo-card reveal">
                <span className="feature-number">04</span>
                <div className="demo-scene" aria-hidden="true">
                  <span className="scene-star star-a">✦</span>
                  <span className="scene-star star-b">✧</span>
                  <div className="scene-moon" />
                  <div className="scene-mountain mountain-back" />
                  <div className="scene-mountain mountain-front" />
                  <div className="dialog-box">
                    <span>AetherKiri</span>
                    <i /><i />
                  </div>
                </div>
                <div>
                  <h3>{t.features.demoTitle}</h3>
                  <p>{t.features.demoText}</p>
                </div>
              </article>

              <article className="feature-card web-card reveal">
                <span className="feature-number">05</span>
                <div className="file-flow" aria-hidden="true">
                  <div className="file-chip">XP3</div>
                  <div className="flow-line"><i /><i /><i /></div>
                  <div className="browser-chip">WASM</div>
                </div>
                <div>
                  <h3>{t.features.webTitle}</h3>
                  <p>{t.features.webText}</p>
                </div>
              </article>

              <article className="feature-card backend-card reveal">
                <span className="feature-number">06</span>
                <div className="backend-switch" aria-hidden="true">
                  <span className="active">Native</span>
                  <span>Bridge</span>
                  <span>Debug</span>
                </div>
                <div>
                  <h3>{t.features.backendTitle}</h3>
                  <p>{t.features.backendText}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="architecture section" id="architecture">
          <div className="architecture-glow" aria-hidden="true" />
          <div className="section-inner architecture-inner">
            <div className="architecture-copy reveal">
              <p className="section-kicker">{t.architecture.eyebrow}</p>
              <h2>{t.architecture.title}</h2>
              <p>{t.architecture.description}</p>
              <a className="text-link" href={`${github}/blob/main/doc/development.zh-CN.md`} target="_blank" rel="noreferrer">
                {language === "zh" ? "深入开发文档" : "Explore the developer guide"} <span>↗</span>
              </a>
            </div>
            <div className="architecture-stack">
              {t.architecture.layers.map(([number, title, description], index) => (
                <article className="architecture-layer reveal" key={title} style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <i aria-hidden="true">→</i>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="compatibility section" id="compatibility">
          <div className="section-inner">
            <div className="compat-grid">
              <div className="compat-copy reveal">
                <p className="section-kicker">{t.compatibility.eyebrow}</p>
                <h2>{t.compatibility.title}</h2>
                <p>{t.compatibility.description}</p>
                <a className="button button-dark" href={`${github}/blob/main/doc/verified_games.zh-CN.md`} target="_blank" rel="noreferrer">
                  {t.compatibility.report}<span>↗</span>
                </a>
              </div>
              <div className="compat-stat reveal">
                <div className="number">{t.compatibility.count}<sup>+</sup></div>
                <strong>{t.compatibility.countLabel}</strong>
                <small>{t.compatibility.updated}</small>
                <div className="title-cloud">
                  {t.compatibility.chips.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            </div>
            <div className="scope-panel reveal">
              <span>{t.compatibility.scopeTitle}</span>
              <div>
                {t.compatibility.scopes.map((item, index) => (
                  <p key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="platforms section">
          <div className="section-inner">
            <div className="section-heading reveal">
              <p className="section-kicker">{t.platforms.eyebrow}</p>
              <h2>{t.platforms.title}</h2>
            </div>
            <div className="platform-grid">
              {t.platforms.cards.map(([name, version, note], index) => (
                <article className="platform-card reveal" key={name} style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}>
                  <span className="platform-index">{String(index + 1).padStart(2, "0")}</span>
                  <div className={`platform-glyph platform-${index}`} aria-hidden="true">
                    <i />
                  </div>
                  <h3>{name}</h3>
                  <strong>{version}</strong>
                  <p>{note}</p>
                </article>
              ))}
            </div>
            <p className="source-platform-note reveal">{t.platforms.sourceNote}</p>
          </div>
        </section>

        <section className="open-source section" id="open-source">
          <div className="open-grid" aria-hidden="true" />
          <div className="open-orb" aria-hidden="true" />
          <div className="section-inner open-inner reveal">
            <div className="open-icon">
              <img src="/app-icon.png" alt="" width="112" height="112" />
            </div>
            <p className="section-kicker">{t.open.eyebrow}</p>
            <h2>{t.open.title}</h2>
            <p>{t.open.description}</p>
            <div className="open-actions">
              <a className="button button-light" href={github} target="_blank" rel="noreferrer">
                {t.open.star}<span>↗</span>
              </a>
              <a className="button button-ghost" href={`${github}/issues`} target="_blank" rel="noreferrer">
                {t.open.issues}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="#top">
              <img src="/app-icon.png" alt="" width="48" height="48" />
              <span>AetherKiri</span>
            </a>
            <p>{t.footer.statement}</p>
          </div>
          <div className="footer-links">
            <a href={github} target="_blank" rel="noreferrer">{t.footer.source}</a>
            <a href={`${github}/blob/main/doc/development.zh-CN.md`} target="_blank" rel="noreferrer">{t.footer.docs}</a>
            <a href={`${github}/issues`} target="_blank" rel="noreferrer">{t.footer.issues}</a>
            <a href={`${github}/blob/main/LICENSE`} target="_blank" rel="noreferrer">{t.footer.license}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} AetherKiri</span>
          <span>{t.footer.note}</span>
        </div>
      </footer>
    </div>
  );
}
