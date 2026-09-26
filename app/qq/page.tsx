import type { Metadata } from "next";
import { AetherQQ } from "../qq-page";

export const metadata: Metadata = {
  title: "加入 Aether 用户群 — QQ 1108465212",
  description: "Aether 官方 QQ 用户群 1108465212：新游适配、运行时进展、构建与联调问题直接群内响应。",
  openGraph: {
    title: "加入 Aether 用户群 — QQ 1108465212",
    description: "新游适配、运行时进展、构建与联调问题直接群内响应。",
    url: "/qq/",
    images: ["/og-aether.png"],
  },
};

export default function QQPage() {
  return <AetherQQ />;
}
