import type { Metadata } from "next";
import { AetherQQ } from "../qq-page";

export const metadata: Metadata = {
  title: "加入 Aether 官方 QQ 用户群",
  description: "Aether 官方 QQ 用户群：一群 1108465212，二群 493244394。交流新游适配、运行时进展、构建与联调。",
  openGraph: {
    title: "加入 Aether 官方 QQ 用户群",
    description: "一群 1108465212，二群 493244394。交流新游适配、运行时进展、构建与联调。",
    url: "/qq/",
    images: ["/og-aether.png"],
  },
};

export default function QQPage() {
  return <AetherQQ />;
}
