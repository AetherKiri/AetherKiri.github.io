// Support scope: https://github.com/AetherKiri/Aether/blob/main/README.md
// Includes the README's player integrations and WA2 / Minori availability notes.
export const runtimes = [
  { name: "KiriKiri / KiriKiri2", tag: "TJS2 / KAG", status: "available", description: { zh: "C++17 引擎核心，承载脚本、图层、音频与插件。", en: "A C++17 core for scripts, layers, audio and plugins." } },
  { name: "ONScripterYuri", tag: "ONS", status: "available", description: { zh: "ONS / NScripter 游戏，支持键鼠、触摸与游戏目录存档。", en: "ONS / NScripter games with pointer, touch and keyboard input and game-local saves." } },
  { name: "Ren’Py 8", tag: "Ren’Py", status: "available", description: { zh: "在 Aether 窗口内原生播放，覆盖 macOS、iOS、Android 与 Linux。", en: "Native playback in the Aether window on macOS, iOS, Android and Linux." } },
  { name: "Siglus", tag: "siglus_rs", status: "available", description: { zh: "通过 siglus_rs 接入 Siglus 游戏与原生输入。", en: "Siglus game playback through the siglus_rs runtime." } },
  { name: "Artemis Engine", tag: "Artemis", status: "available", description: { zh: "Artemis 脚本与资源管线，支持 E-mote 演出。", en: "Artemis scripts and resources with E-mote animation support." } },
  { name: "CatSystem2", tag: "CatSystem2", status: "available", description: { zh: "CatSystem2 游戏运行时，提供原生画面与交互。", en: "Native rendering and interaction for CatSystem2 games." } },
  { name: "BGI / Ethornell", tag: "BGI", status: "available", description: { zh: "BGI / Ethornell 游戏与汉化资源支持。", en: "BGI / Ethornell games with support for translated resources." } },
  { name: "ADV Player HD", tag: "WillPlus", status: "available", description: { zh: "剧情、存读档、历史与鉴赏，存档保存在游戏目录。", en: "Story playback, saves, backlog and galleries, with saves kept alongside the game." } },
  { name: "YU-RIS", tag: "YBN", status: "available", description: { zh: "独立 C++17 运行时，支持源码项目与编译后的 YBN 游戏。", en: "An independent C++17 runtime for source projects and compiled YBN games." } },
  { name: "SoftPal", tag: "SoftPal", status: "available", description: { zh: "原生 SoftPal 游戏支持，已开放使用。", en: "Native SoftPal game support, available without a coffee purchase." } },
  { name: "WHITE ALBUM2", tag: "Leaf TtT", status: "available", description: { zh: "Leaf TtT / WA2 专用运行时。", en: "The Leaf TtT runtime for WHITE ALBUM2." } },
  { name: "minori", tag: "Rust", status: "coffee", description: { zh: "minori 系脚本与演出；iOS / macOS 正式构建需有效的 30 天咖啡权益。", en: "Minori scripts and presentation. iOS / macOS release builds require an active 30-day coffee entitlement." } },
  { name: "AliceSoft System 1–3", tag: "system3", status: "available", description: { zh: "原生 DAT 游戏播放，支持中日文编码与汉化字体配置。", en: "Native DAT games with Japanese and Chinese text and translated font settings." } },
  { name: "AliceSoft System 3.5 / 3.9", tag: "xsystem35", status: "available", description: { zh: "导入 ALD 游戏目录，支持中日文与可选虚拟按键。", en: "ALD directory imports, Japanese and Chinese text, and optional virtual keys." } },
  { name: "AliceSoft System 4", tag: "xsystem4", status: "available", description: { zh: "原生 System 4 播放，支持文字、音频、视频与汉化资源。", en: "Native System 4 playback with text, audio, movies and translated resources." } },
  { name: "Escu:de / ACPX", tag: "Escude", status: "new", description: { zh: "Escu:de 游戏支持，可使用游戏目录中的 Lua 资源接口。", en: "Escu:de games with game-local Lua resource hooks." } },
  { name: "SystemC", tag: "ACT / SPT", status: "new", description: { zh: "CandySoft / Interheart 游戏，保留原版界面与 E-mote 演出。", en: "CandySoft / Interheart games with their original UI and E-mote rendering." } },
  { name: "EntisGLS / Cotopha", tag: "CSX / NOA", status: "new", description: { zh: "公开的桌面端运行时，支持传统 CSX 脚本与 NOA 资源。", en: "A public desktop runtime for traditional CSX scripts and NOA resources." } },
  { name: "Flash", tag: "Ruffle", status: "available", description: { zh: "独立 Flash 分类，播放本地 SWF，支持声音、触摸与嵌套目录。", en: "A dedicated library for local SWFs, with sound, touch controls and nested folders." } },
  { name: "TyranoScript", tag: "WebView", status: "experimental", description: { zh: "macOS、iOS 与 Android 网页项目播放，提供独立存档和虚拟按键。", en: "Browser-project playback on macOS, iOS and Android, with isolated saves and virtual keys." } },
] as const;

export const runtimeStatus = {
  available: { zh: "可用", en: "Available" },
  new: { zh: "新集成", en: "New" },
  coffee: { zh: "咖啡权益", en: "Coffee" },
  experimental: { zh: "实验性", en: "Experimental" },
} as const;
