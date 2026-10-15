import type { Metadata } from "next";
import { AetherDownload } from "../download-page";

export const metadata: Metadata = {
  title: "下载 Aether — 最新稳定版",
  description: "下载最新稳定版 Aether，选择 Android、iOS、macOS 或 Linux 安装包，让喜欢的故事再次抵达你。",
  alternates: { canonical: "/download/" },
  openGraph: { title: "下载 Aether — 最新稳定版", description: "选择你的平台，开启下一段故事。", url: "/download/", images: ["/og-aether.png"] },
};

export default function DownloadPage() {
  return <AetherDownload />;
}
