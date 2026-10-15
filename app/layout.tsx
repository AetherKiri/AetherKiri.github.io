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
    "Aether 是一个由 Godot 4.7 承载、以 C++17 引擎核心驱动的跨平台 KiriKiri2 运行时。",
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
    description: "Godot 驱动的 KiriKiri2 跨平台运行时。",
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
    description: "Godot 驱动的 KiriKiri2 跨平台运行时。",
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
