import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aetherkiri.github.io"),
  title: "Aether — 让故事，再次抵达你",
  description:
    "Aether 是由 Godot 承载的跨平台多运行时视觉小说平台，支持 KiriKiri2、ONS、Ren’Py、Siglus、AliceSoft，并集成 Flash 与 TyranoScript 播放。",
  applicationName: "Aether",
  keywords: ["Aether", "AetherKiri", "KiriKiri2", "ONScripter", "Ren’Py", "Siglus", "AliceSoft", "Godot", "visual novel", "open source"],
  icons: {
    icon: "/app-icon.png",
    apple: "/app-icon.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Aether",
    title: "Aether — 让故事，再次抵达你",
    description: "Godot 承载的跨平台多运行时视觉小说平台，汇集原生引擎、Flash 与 TyranoScript。",
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
    description: "Godot 承载的跨平台多运行时视觉小说平台，汇集原生引擎、Flash 与 TyranoScript。",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
