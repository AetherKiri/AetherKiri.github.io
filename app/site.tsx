"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { GROUP_NUMBER, QQ_PAGE, SHARE_URL } from "./community";
import { Cosmos, Cursor, SplitText, copyText, magnetic, reducedMotion, spotlight, tilt, useRevealAll, useScrollMotion } from "./effects";

type Language = "zh" | "en";

const github = "https://github.com/AetherKiri/AetherKiri";
const issues = `${github}/issues`;
const verifiedGames = `${github}/blob/main/doc/verified_games.md`;

const RUNTIMES = [
  { n: "KiriKiri / KiriKiri2", t: "C++17", s: "Stable", d: "TJS2/KAG 完整兼容，主力运行时" },
  { n: "Artemis Engine", t: "artemis", s: "Available", d: "Artemis 脚本与资源管线" },
  { n: "ONScripterYuri", t: "ONS", s: "Stable", d: "ONS/NScripter 系完整支援" },
  { n: "WHITE ALBUM2 (Leaf TtT)", t: "wa2", s: "Available", d: "Leaf 分支引擎，WA2 专线" },
  { n: "minori", t: "Rust", s: "Available", d: "minori 系演出与脚本" },
  { n: "Qlie", t: "Internal", s: "Internal", d: "条件编译，内部验证" },
  { n: "SoftPal", t: "softpal", s: "Available", d: "SoftPal 架构支援" },
  { n: "CatSystem2", t: "catsystem2", s: "Available", d: "CatSystem2 运行时" },
];
const RENDERS = [
  { n: "Godot Native", b: "默认", p: ["RenderingDevice 直驱", "批处理合批", "VSync 自适应"] },
  { n: "GPU Bridge", b: "高性能", p: ["外置 GPU 目标", "零拷贝纹理", "离屏合成"] },
];
const GAMES = ["Fate/stay night", "WHITE ALBUM2", "GINKA", "穗织", "星空列车与白的旅行", "Muv-Luv", "近月少女的礼仪", "樱之诗", "千恋万花", "夏空彼方", "金色ラブリッチェ", "ましろ色シンフォニー", "Clover Day's", "Magical Charming!", "もっと！孕ませ！"];

const copy = {
  zh: {
    announcement: "Aether 0.1.0-alpha.3 已发布",
    announcementAction: "看看更新了什么",
    nav: [
      ["#about", "关于"],
      ["#runtime", "多 Runtime"],
      ["#games", "游戏支持"],
      ["#contact", "联系"],
    ],
    hero: {
      eyebrow: "OPEN-SOURCE MULTI-RUNTIME ENGINE",
      titleA: "让故事",
      titleB: "再次抵达你",
      text: "Aether 以 Godot 为宿主、C++17 为核心，支持 KiriKiri2、ONS、WHITE ALBUM2、minori、SoftPal、Artemis、CatSystem2、Qlie 八大运行时，让经典视觉小说自然抵达今天的每一块屏幕。",
      contact: "在 GitHub 联系我们",
      preview: "下载 Aether",
      platforms: ["macOS", "iOS / iPadOS", "Android", "Web", "Linux", "Windows"],
    },
    qq: {
      eyebrow: "加入社群",
      title: "QQ 群 1108465212",
      desc: "新游适配、运行时进展、构建与联调问题直接群内响应",
      joinBtn: "一键加群",
      webBtn: "网页加群",
      copyBtn: "复制群号",
      copied: "已复制",
    },
    runtime: {
      title: "多 Runtime",
      desc: "八大引擎统一调度，游戏自动选择最佳运行时",
    },
    render: {
      title: "渲染高性能",
      desc: "Godot 原生渲染与 GPU Bridge 双模式，零拷贝纹理低延迟呈现",
    },
    games: {
      title: "已验证游戏",
      desc: "74 款游戏人工烟测与流程验证，覆盖主流 Galgame",
      verified: "Flow 验证",
      smoke: "Smoke 验证",
    },
    about: {
      title: "什么是 Aether？",
      text: "Aether 是一个由 Godot 承载、以 C++17 核心驱动的跨平台多运行时引擎。熟悉的脚本、图层、声音与插件仍然保留，并以现代渲染和多平台体验与你重新相遇。",
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
      line: "A Godot-hosted multi-runtime engine.",
      source: "Source",
      releases: "Releases",
      license: "GPL-3.0-or-later",
    },
    marquee: ["KiriKiri2", "ONScripterYuri", "WHITE ALBUM2", "minori", "SoftPal", "Artemis", "CatSystem2", "Qlie"],
    stats: [
      ["8", "Runtime"],
      ["74", "已验证游戏"],
      ["C++17", "引擎核心"],
      ["GPL-3.0", "开源协议"],
    ],
  },
  en: {
    announcement: "Aether 0.1.0-alpha.3 is live",
    announcementAction: "See what changed",
    nav: [
      ["#about", "About"],
      ["#runtime", "Runtimes"],
      ["#games", "Games"],
      ["#contact", "Contact"],
    ],
    hero: {
      eyebrow: "OPEN-SOURCE MULTI-RUNTIME ENGINE",
      titleA: "Let stories",
      titleB: "find you again",
      text: "Aether is hosted by Godot with a C++17 core, supporting 8 runtimes: KiriKiri2, ONS, WHITE ALBUM2, minori, SoftPal, Artemis, CatSystem2, Qlie—bringing classic visual novels naturally to today’s screens.",
      contact: "Find us on GitHub",
      preview: "Download Aether",
      platforms: ["macOS", "iOS / iPadOS", "Android", "Web", "Linux", "Windows"],
    },
    qq: {
      eyebrow: "Join Community",
      title: "QQ Group 1108465212",
      desc: "Game adaptation, runtime progress, build & integration support",
      joinBtn: "Join Now",
      webBtn: "Web Join",
      copyBtn: "Copy Number",
      copied: "Copied",
    },
    runtime: {
      title: "Multi-Runtime",
      desc: "8 engines unified dispatch, automatic runtime selection",
    },
    render: {
      title: "High-Performance Rendering",
      desc: "Godot native & GPU Bridge dual modes, zero-copy texture low-latency presentation",
    },
    games: {
      title: "Verified Games",
      desc: "74 games manually smoke & flow tested, covering mainstream Galgame",
      verified: "Flow Verified",
      smoke: "Smoke Verified",
    },
    about: {
      title: "What is Aether?",
      text: "Aether is a cross-platform multi-runtime engine hosted by Godot and driven by a C++17 core. Familiar scripts, layers, sound, and plugins remain—meeting you again through modern rendering and a multi-platform experience.",
    },
    contact: {
      title: "Where can we find you?",
      repositoryBefore: "For development progress, source code, and releases, visit our",
      repository: "GitHub repository",
      issuesBefore: "To share ideas, ask questions, shape the project, or report bugs and game compatibility findings, visit",
      issues: "GitHub Issues",
    },
    panel: {
      eyebrow: "WHAT’S NEW",
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
      line: "A Godot-hosted multi-runtime engine.",
      source: "Source",
      releases: "Releases",
      license: "GPL-3.0-or-later",
    },
    marquee: ["KiriKiri2", "ONScripterYuri", "WHITE ALBUM2", "minori", "SoftPal", "Artemis", "CatSystem2", "Qlie"],
    stats: [
      ["8", "Runtime"],
      ["74", "Verified Games"],
      ["C++17", "Engine Core"],
      ["GPL-3.0", "License"],
    ],
  },
} as const;

/* Paragraph whose words brighten as it is scrolled through. */
function ScrubText({ text, language }: { text: string; language: Language }) {
  const parts = language === "zh" ? Array.from(text) : text.split(/(\s+)/);
  const total = parts.length;
  return (
    <p className="scrub" data-scrub>
      {parts.map((part, index) => (
        <span key={index} style={{ "--i": (index / total).toFixed(4) } as CSSProperties}>{part}</span>
      ))}
    </p>
  );
}

/* Heading shared by all dark sections. */
function SectionHead({ index, kicker, title, desc, children }: { index: string; kicker: string; title: string; desc: string; children?: ReactNode }) {
  return (
    <div className="section-head" data-reveal>
      <p className="section-kicker"><span>{index}</span><i />{kicker}</p>
      <h2>{title}</h2>
      {desc ? <p className="section-desc">{desc}</p> : null}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Count-up numbers                                                    */
/* ------------------------------------------------------------------ */
function CountUp({ value }: { value: string }) {
  const match = useMemo(() => /^(\d+)(.*)$/.exec(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(match ? "0" : value);

  useEffect(() => {
    if (!match) return;
    const node = ref.current;
    if (!node) return;
    const target = Number(match[1]);
    let raf = 0;
    if (reducedMotion()) {
      raf = window.requestAnimationFrame(() => setShown(match[1]));
      return () => window.cancelAnimationFrame(raf);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1600, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          setShown(String(Math.round(target * eased)));
          if (p < 1) raf = window.requestAnimationFrame(tick);
        };
        raf = window.requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(raf);
    };
  }, [match]);

  return (
    <span className={match ? "stat-value" : "stat-value is-text"} ref={ref}>
      {match ? shown : value}
      {match ? <i>{match[2]}</i> : null}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee band — speed and skew respond to scroll velocity via CSS.   */
/* ------------------------------------------------------------------ */
function Marquee({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  return (
    <div className={reverse ? "marquee is-reverse" : "marquee"} aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((pass) => (
          <div className="marquee-group" key={pass}>
            {items.map((item) => (
              <span key={`${pass}-${item}`}>{item}<b>✦</b></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Site                                                                */
/* ------------------------------------------------------------------ */
const SECTIONS = ["about", "runtime", "games", "contact"] as const;

export function AetherSite() {
  const heroRef = useRef<HTMLElement>(null);
  const [language, setLanguage] = useState<Language>("zh");
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [qCopied, setQCopied] = useState(false);
  const scrolled = useScrollMotion();
  const t = copy[language];
  useRevealAll(language);

  const copyQQ = async () => {
    if (!(await copyText(GROUP_NUMBER))) return;
    setQCopied(true);
    window.setTimeout(() => setQCopied(false), 1800);
  };

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  useEffect(() => {
    if (!previewOpen && !menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setPreviewOpen(false);
      setMenuOpen(false);
    };
    if (previewOpen) document.body.classList.add("preview-is-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("preview-is-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [previewOpen, menuOpen]);

  /* Track which section is in view to drive the nav indicator. */
  useEffect(() => {
    const nodes = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    const onScroll = () => { if (window.scrollY < window.innerHeight * 0.5) setActive(""); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const openPreview = () => {
    setMenuOpen(false);
    setPreviewOpen(true);
  };

  const moveHero = (event: ReactPointerEvent<HTMLElement>) => {
    const hero = heroRef.current;
    if (!hero || event.pointerType === "touch" || reducedMotion()) return;
    const bounds = hero.getBoundingClientRect();
    hero.style.setProperty("--px", (((event.clientX - bounds.left) / bounds.width - 0.5) * 2).toFixed(3));
    hero.style.setProperty("--py", (((event.clientY - bounds.top) / bounds.height - 0.5) * 2).toFixed(3));
  };
  const resetHero = () => {
    heroRef.current?.style.setProperty("--px", "0");
    heroRef.current?.style.setProperty("--py", "0");
  };

  const period = language === "zh" ? "。" : ".";
  const activeIndex = SECTIONS.indexOf(active as (typeof SECTIONS)[number]);

  return (
    <div className="site">
      <a className="skip-link" href="#content">Skip to content</a>

      <div className="boot" aria-hidden="true">
        <div className="boot-mark">
          <img src="/app-icon.png" alt="" width="64" height="64" />
          <i />
        </div>
        <span>AETHER</span>
      </div>

      <Cosmos />
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true"><i /></div>
      <Cursor />

      <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
        <div className="header-shell">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="Aether home">
            <span className="brand-mark"><img src="/app-icon.png" alt="" width="34" height="34" /></span>
            <span className="brand-name">Aether</span>
          </a>

          <nav
            className={menuOpen ? "site-nav is-open" : "site-nav"}
            aria-label="Primary navigation"
            style={{ "--active": activeIndex } as CSSProperties}
          >
            <span className="nav-indicator" data-visible={activeIndex >= 0} aria-hidden="true" />
            {t.nav.map(([href, label], index) => (
              <a
                href={href}
                key={href}
                onClick={closeMenu}
                className={activeIndex === index ? "is-active" : undefined}
                style={{ "--i": index } as CSSProperties}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <div className="language-toggle" role="group" aria-label="Language" data-lang={language}>
              <span className="language-thumb" aria-hidden="true" />
              <button className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")} aria-pressed={language === "zh"}>中</button>
              <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
            </div>
            <a className="header-contact" href={github} target="_blank" rel="noreferrer" onPointerMove={spotlight}>
              <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
              <span>GitHub</span>
            </a>
            <button className={menuOpen ? "menu-button is-open" : "menu-button"} onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
              <i /><i />
            </button>
          </div>
        </div>
      </header>

      <main id="content">
        {/* ---------------------------------------------------------- HERO */}
        <section className="hero" id="top" ref={heroRef} onPointerMove={moveHero} onPointerLeave={resetHero}>
          <div className="hero-scene" aria-hidden="true">
            <div className="hero-bg"><img src="/hero-background-v2.webp" alt="" /></div>
            <div className="hero-moonlight" />
            <svg className="hero-orbits" viewBox="0 0 800 800">
              <defs>
                <linearGradient id="orbit-stroke" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#bcd4ff" stopOpacity=".7" />
                  <stop offset=".5" stopColor="#8f7dff" stopOpacity=".15" />
                  <stop offset="1" stopColor="#ffd9a8" stopOpacity=".6" />
                </linearGradient>
              </defs>
              <g className="orbit orbit-a"><circle cx="400" cy="400" r="370" /><circle className="orbit-body" cx="400" cy="30" r="4" /></g>
              <g className="orbit orbit-b"><circle cx="400" cy="400" r="290" strokeDasharray="2 10" /><circle className="orbit-body warm" cx="690" cy="400" r="3" /></g>
              <g className="orbit orbit-c"><circle cx="400" cy="400" r="210" /><circle className="orbit-body" cx="400" cy="610" r="2.5" /></g>
            </svg>
            <div className="hero-character"><img src="/hero-character-v2.webp" alt="" /></div>
            <div className="hero-orrery">
              <div className="hero-orrery-float">
                <img src="/hero-orrery-v2.webp" alt="" />
                <i className="orrery-core" />
              </div>
            </div>
            <div className="hero-motes">
              {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ "--n": index } as CSSProperties} />)}
            </div>
          </div>
          <div className="hero-vignette" aria-hidden="true" />

          <div className="hero-copy">
            <button className="announce" onClick={openPreview} onPointerMove={spotlight}>
              <span className="announce-dot" aria-hidden="true" />
              <span className="announce-text">{t.announcement}</span>
              <span className="announce-action">{t.announcementAction}<i aria-hidden="true">→</i></span>
            </button>
            <p className="hero-eyebrow"><i aria-hidden="true" />{t.hero.eyebrow}</p>
            <h1 key={language}>
              <span className="hero-line"><SplitText text={t.hero.titleA} delay={0.9} step={language === "zh" ? 0.09 : 0.035} /></span>
              <em className="hero-line"><SplitText text={t.hero.titleB} delay={1.15} step={language === "zh" ? 0.09 : 0.035} /></em>
            </h1>
            <p className="hero-text">{t.hero.text}</p>
            <div className="hero-actions">
              <a className="button button-primary" href={github} target="_blank" rel="noreferrer" {...magnetic}>
                <span className="button-label">{t.hero.contact}</span>
                <span className="button-icon" aria-hidden="true">↗</span>
              </a>
              <a className="button button-glass" href={language === "zh" ? "/download/" : "/download/?lang=en"} {...magnetic}>
                <span className="button-label">{t.hero.preview}</span>
                <span className="button-icon" aria-hidden="true">↓</span>
              </a>
            </div>
            <ul className="platform-list" aria-label="Supported platforms">
              {t.hero.platforms.map((platform, index) => (
                <li key={platform} style={{ "--i": index } as CSSProperties}>{platform}</li>
              ))}
            </ul>
          </div>

          <a className="scroll-cue" href="#about" aria-label="Scroll">
            <span className="scroll-cue-mouse"><i /></span>
            <span>SCROLL</span>
          </a>
        </section>

        <Marquee items={t.marquee} />

        {/* --------------------------------------------------------- ABOUT */}
        <section className="about-section" id="about">
          <div className="section-inner about-grid">
            <div className="about-copy">
              <SectionHead index="01" kicker="ABOUT" title={t.about.title} desc="" />
              <div data-reveal><ScrubText text={t.about.text} language={language} /></div>
            </div>
            <div className="stat-grid">
              {t.stats.map(([value, label], index) => (
                <div className="stat" key={label} data-reveal style={{ "--delay": `${index * 90}ms` } as CSSProperties} {...tilt(8)}>
                  <span className="card-glow" aria-hidden="true" />
                  <CountUp value={value} />
                  <span className="stat-label">{label}</span>
                  <span className="stat-index" aria-hidden="true">0{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- RUNTIME */}
        <section className="runtime-section" id="runtime">
          <div className="section-inner">
            <SectionHead index="02" kicker="RUNTIMES" title={t.runtime.title} desc={t.runtime.desc} />
            <div className="runtime-grid">
              {RUNTIMES.map((r, index) => (
                <article
                  className={index === 0 ? "runtime-card is-primary" : "runtime-card"}
                  key={r.n}
                  data-reveal
                  style={{ "--delay": `${(index % 4) * 70}ms` } as CSSProperties}
                  {...tilt(index === 0 ? 4 : 7)}
                >
                  <span className="card-glow" aria-hidden="true" />
                  <span className="card-border" aria-hidden="true" />
                  <div className="runtime-top">
                    <span className="runtime-tag">{r.t}</span>
                    <span className={r.s === "Internal" ? "runtime-status is-internal" : r.s === "Stable" ? "runtime-status is-stable" : "runtime-status"}>
                      <i aria-hidden="true" />{r.s}
                    </span>
                  </div>
                  <h3>{r.n}</h3>
                  <p>{r.d}</p>
                  <span className="runtime-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  {index === 0 ? (
                    <div className="runtime-orbit" aria-hidden="true">
                      <i /><i /><i />
                      <b />
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- RENDER */}
        <section className="render-section">
          <div className="section-inner">
            <SectionHead index="03" kicker="RENDERING" title={t.render.title} desc={t.render.desc} />
            <div className="render-grid">
              {RENDERS.map((r, index) => (
                <article className="render-card" key={r.n} data-reveal style={{ "--delay": `${index * 120}ms` } as CSSProperties} {...tilt(4)}>
                  <span className="card-glow" aria-hidden="true" />
                  <span className="card-border" aria-hidden="true" />
                  <div className={index === 0 ? "render-visual is-native" : "render-visual is-bridge"} aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => <i key={i} style={{ "--n": i } as CSSProperties} />)}
                    <b />
                  </div>
                  <div className="render-body">
                    <span className="render-badge">{r.b}</span>
                    <h3>{r.n}</h3>
                    <ul>
                      {r.p.map((x, i) => <li key={x} style={{ "--i": i } as CSSProperties}>{x}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- GAMES */}
        <section className="games-section" id="games">
          <div className="section-inner">
            <SectionHead index="04" kicker="COMPATIBILITY" title={t.games.title} desc={t.games.desc} />
          </div>
          <div className="game-rails" aria-hidden="true">
            <div className="game-rail">
              <div className="game-rail-track">
                {[...GAMES, ...GAMES].map((g, i) => <span key={i}>{g}</span>)}
              </div>
            </div>
            <div className="game-rail is-reverse">
              <div className="game-rail-track">
                {[...GAMES.slice(7), ...GAMES.slice(0, 7), ...GAMES.slice(7), ...GAMES.slice(0, 7)].map((g, i) => <span key={i}>{g}</span>)}
              </div>
            </div>
          </div>
          <div className="section-inner">
            <div className="game-grid">
              {GAMES.slice(0, 9).map((g, index) => (
                <div className="game-card" key={g} data-reveal style={{ "--delay": `${(index % 3) * 80}ms` } as CSSProperties} onPointerMove={spotlight}>
                  <span className="card-glow" aria-hidden="true" />
                  <span className="game-no" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div className="game-title">{g}</div>
                  <div className="game-badge"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6.2 5 8.6l4.6-5" /></svg>{t.games.verified}</div>
                </div>
              ))}
            </div>
            <a className="games-note" href={verifiedGames} target="_blank" rel="noreferrer" data-reveal>
              完整 74 款见仓库 doc/verified_games.md<i aria-hidden="true">↗</i>
            </a>
          </div>
        </section>

        <Marquee items={t.marquee} reverse />

        {/* ------------------------------------------------ CONTACT + QQ */}
        <section className="contact-section" id="contact">
          <div className="contact-halo" aria-hidden="true" />
          <div className="section-inner">
            <SectionHead index="05" kicker="CONTACT" title={t.contact.title} desc="" />
            <div className="contact-grid">
              <a className="contact-card" href={github} target="_blank" rel="noreferrer" data-reveal {...tilt(5)}>
                <span className="card-glow" aria-hidden="true" />
                <span className="card-border" aria-hidden="true" />
                <span className="contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
                </span>
                <p>{t.contact.repositoryBefore} <strong>{t.contact.repository}</strong>{period}</p>
                <span className="contact-go" aria-hidden="true">↗</span>
              </a>
              <a className="contact-card" href={issues} target="_blank" rel="noreferrer" data-reveal style={{ "--delay": "110ms" } as CSSProperties} {...tilt(5)}>
                <span className="card-glow" aria-hidden="true" />
                <span className="card-border" aria-hidden="true" />
                <span className="contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16"><path fill="currentColor" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /><path fill="currentColor" d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" /></svg>
                </span>
                <p>{t.contact.issuesBefore} <strong>{t.contact.issues}</strong>{period}</p>
                <span className="contact-go" aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="qq-card" data-reveal onPointerMove={spotlight}>
              <span className="card-glow" aria-hidden="true" />
              <div className="qq-rings" aria-hidden="true"><i /><i /><i /></div>
              <div className="qq-content">
                <p className="section-kicker"><i />{t.qq.eyebrow}</p>
                <h2>{t.qq.title}</h2>
                <p>{t.qq.desc}</p>
              </div>
              <div className="qq-actions">
                <a className="button button-primary" href={QQ_PAGE} {...magnetic}>
                  <span className="button-label">{t.qq.joinBtn}</span><span className="button-icon" aria-hidden="true">↗</span>
                </a>
                <a className="button button-glass" href={SHARE_URL} target="_blank" rel="noreferrer" {...magnetic}>
                  <span className="button-label">{t.qq.webBtn}</span><span className="button-icon" aria-hidden="true">↗</span>
                </a>
                <button className={qCopied ? "button button-glass is-copied" : "button button-glass"} onClick={copyQQ} {...magnetic}>
                  <span className="button-label" key={String(qCopied)}>{qCopied ? t.qq.copied : `${t.qq.copyBtn} 1108465212`}</span>
                  <span className="button-icon" aria-hidden="true">{qCopied ? "✓" : "⧉"}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ------------------------------------------------------------ FOOTER */}
      <footer className="site-footer">
        <div className="footer-word" aria-hidden="true">Aether</div>
        <div className="footer-inner" data-reveal>
          <div className="footer-brand">
            <img src="/app-icon.png" alt="" width="44" height="44" />
            <div><strong>Aether</strong><span>{t.footer.line}</span></div>
          </div>
          <div className="footer-links">
            <a href={github} target="_blank" rel="noreferrer">{t.footer.source}</a>
            <a href="/download/">{t.footer.releases}</a>
            <a href={`${github}/blob/main/LICENSE`} target="_blank" rel="noreferrer">{t.footer.license}</a>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Aether</span><span>Stories, across every screen.</span></div>
      </footer>

      {/* ------------------------------------------------------- PREVIEW */}
      {previewOpen && (
        <div
          className="preview-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setPreviewOpen(false);
          }}
        >
          <section className="preview-panel" role="dialog" aria-modal="true" aria-labelledby="preview-title">
            <div className="preview-head">
              <div>
                <p className="section-kicker"><i />{t.panel.eyebrow}</p>
                <h2 id="preview-title">{t.panel.title}</h2>
                <p>{t.panel.intro}</p>
              </div>
              <button className="preview-close" onClick={() => setPreviewOpen(false)} aria-label={t.panel.close} autoFocus>
                <i /><i />
              </button>
            </div>
            <ol className="version-list">
              {t.panel.versions.map((version, index) => (
                <li className="version-card" key={version.tag} style={{ "--i": index } as CSSProperties}>
                  <span className="version-node" aria-hidden="true" />
                  <div className="version-meta">
                    <span className={index === 0 ? "version-label is-latest" : "version-label"}>{version.label}</span>
                    <time>{version.date}</time>
                  </div>
                  <strong className="version-tag">{version.tag}</strong>
                  <h3>{version.title}</h3>
                  <ul>{version.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  <a href={`${github}/releases/tag/${version.tag}`} target="_blank" rel="noreferrer">
                    {t.panel.openRelease}<span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </div>
      )}
    </div>
  );
}
