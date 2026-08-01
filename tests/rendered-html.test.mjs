import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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
  assert.match(html, /新功能预览/);
  assert.match(html, /GitHub Issues/);
  assert.match(html, /hero-character/);
  assert.match(html, /hero-particles/);
  assert.match(html, /GitHub/);
  assert.doesNotMatch(html, /LATEST UPDATE|codex-preview|Your site is taking shape/);
});

test("contains static hosting and social preview assets", async () => {
  const [pagesHtml, packageJson] = await Promise.all([
    readFile(new URL("../github-pages/index.html", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    access(new URL("../public/app-icon.png", import.meta.url)),
    access(new URL("../public/aetherkiri-muse.png", import.meta.url)),
    access(new URL("../public/og-aether.png", import.meta.url)),
  ]);

  assert.match(pagesHtml, /https:\/\/aetherkiri\.github\.io\//);
  assert.match(pagesHtml, /og-aether\.png/);
  assert.match(packageJson, /"build:pages"/);
});
