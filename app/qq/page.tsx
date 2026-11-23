import type { Metadata } from "next";
import { GROUP_NUMBER } from "../community";
import { AetherQQ } from "../qq-page";

const title = "加入 Aether 官方 QQ 用户群";
const description = `Aether 官方 QQ 用户群 ${GROUP_NUMBER}，交流新游适配、运行时进展、构建与联调。`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/qq/",
    images: ["/og-aether.png"],
  },
};

export default function QQPage() {
  return <AetherQQ />;
}
