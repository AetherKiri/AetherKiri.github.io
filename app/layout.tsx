import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aetherkiri.github.io"),
  title: "Aether — 让故事，再次抵达你",
  description:
    "Aether 是 Godot 驱动的跨平台多运行时视觉小说平台，支持 KiriKiri2、ONS、Ren’Py 与 Flash 等。浏览和下载全部公开版本。",
  applicationName: "Aether",
  keywords: ["Aether", "AetherKiri", "KiriKiri2", "Godot", "visual novel", "open source"],
  icons: {
    icon: "/app-icon.png",
    apple: "/app-icon.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Aether",
    title: "Aether — 让故事，再次抵达你",
    description: "让喜欢的故事再次抵达你。探索 Aether 多运行时平台，下载最新与历史版本。",
    locale: "zh_CN",
    images: [
      {
        url: "/og-aether.png",
        width: 1200,
        height: 675,
        alt: "Aether — 让故事，再次抵达你",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aether — 让故事，再次抵达你",
    description: "让喜欢的故事再次抵达你。探索 Aether 多运行时平台，下载最新与历史版本。",
    images: ["/og-aether.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}
