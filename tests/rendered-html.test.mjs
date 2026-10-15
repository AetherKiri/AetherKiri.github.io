import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Aether organization website", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Aether/);
  assert.match(html, /Godot/);
  assert.match(html, /KiriKiri2/);
  assert.match(html, /0\.1\.0-alpha\.3/);
  assert.match(html, /下载 Aether/);
  assert.match(html, /GitHub Issues/);
  assert.match(html, /GitHub/);
  assert.doesNotMatch(html, /LATEST UPDATE|codex-preview|Your site is taking shape/);
});

test("server-renders the dedicated stable download page", async () => {
  const response = await render("/download");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /最新稳定版/);
  assert.match(html, /选择你的平台/);
  assert.match(html, /github\.com\/AetherKiri\/Aether\/releases\/download\//);
  assert.doesNotMatch(html, /全部版本|搜索版本|最新预览版|version-options/);
});

test("contains static hosting and social preview assets", async () => {
  const [pagesHtml, packageJson] = await Promise.all([
    readFile(new URL("../github-pages/index.html", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    access(new URL("../public/app-icon.png", import.meta.url)),
    access(new URL("../public/hero-background-v2.webp", import.meta.url)),
    access(new URL("../public/hero-character-v2.webp", import.meta.url)),
    access(new URL("../public/hero-orrery-v2.webp", import.meta.url)),
    access(new URL("../public/og-aether.png", import.meta.url)),
  ]);

  assert.match(pagesHtml, /https:\/\/aetherkiri\.github\.io\//);
  assert.match(pagesHtml, /og-aether\.png/);
  assert.match(packageJson, /"build:pages"/);
});
