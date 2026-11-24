import type { Metadata } from "next";
import { AetherDownload } from "../download-page";

export const metadata: Metadata = {
  title: "下载 Aether — 最新稳定版",
  description: "获取最新稳定版 Aether。iOS 和 macOS 前往 App Store，Android 和 Linux 下载官方发布文件。",
  alternates: { canonical: "/download/" },
  openGraph: { title: "下载 Aether — 最新稳定版", description: "选择你的平台，开启下一段故事。", url: "/download/", images: ["/og-aether.png"] },
};

export default function DownloadPage() {
  return <AetherDownload />;
}
