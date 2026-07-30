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
  title: "AetherKiri — Godot 驱动的 KiriKiri2 跨平台运行时",
  description:
    "AetherKiri 是一个由 Godot 4.7 承载、以 C++17 引擎核心驱动的跨平台 KiriKiri2 运行时。",
  applicationName: "AetherKiri",
  keywords: ["AetherKiri", "KiriKiri2", "Godot", "visual novel", "open source"],
  icons: {
    icon: "/app-icon.png",
    apple: "/app-icon.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "AetherKiri",
    title: "AetherKiri — 让每一段故事，跨越屏幕，再次相遇",
    description: "Godot 驱动的 KiriKiri2 跨平台运行时。",
    locale: "zh_CN",
    images: [
      {
        url: "/og.png",
        width: 1728,
        height: 910,
        alt: "AetherKiri — 让每一段故事，跨越屏幕，再次相遇",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AetherKiri — 让每一段故事，跨越屏幕，再次相遇",
    description: "Godot 驱动的 KiriKiri2 跨平台运行时。",
    images: ["/og.png"],
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
