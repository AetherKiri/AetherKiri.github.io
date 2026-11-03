import type { Metadata } from "next";
import { AetherPatch } from "../patch-page";

export const metadata: Metadata = {
  title: "Patch — Aether 游戏补丁",
  description: "按游戏公司、引擎和游戏名查找并下载对应的脚本或补丁包。",
  alternates: { canonical: "/patch/" },
  openGraph: {
    title: "Patch — Aether 游戏补丁",
    description: "查找游戏对应的脚本或补丁包，一键下载。",
    url: "/patch/",
    images: ["/og-aether.png"],
  },
};

export default function PatchPage() {
  return <AetherPatch />;
}
