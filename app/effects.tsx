"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ------------------------------------------------------------------ */
/* Cosmos — one fixed canvas behind the whole page: depth stars,       */
/* cursor-drawn constellations, and the occasional meteor.             */
/* ------------------------------------------------------------------ */
type Star = { x: number; y: number; z: number; r: number; phase: number; speed: number; hue: number };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number; len: number };

export function Cosmos() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const calm = reducedMotion();
    const pointer = { x: -9999, y: -9999, px: 0, py: 0, tx: 0, ty: 0 };
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let frame = 0;
    let last = performance.now();
    let meteorClock = 1800;
    let scroll = window.scrollY;
    let visible = true;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(360, Math.round((width * height) / 4600));
      stars = Array.from({ length: count }, () => {
        const z = Math.random() ** 1.6;
        return {
          x: Math.random() * width,
          y: Math.random() * height * 3,
          z,
          r: 0.3 + z * 1.5,
          phase: Math.random() * Math.PI * 2,
          speed: 0.35 + Math.random() * 1.6,
          hue: Math.random(),
        };
      });
    };

    const wrap = (value: number, size: number) => ((value % size) + size) % size;

    const draw = (time: number) => {
      const dt = Math.min(time - last, 48);
      last = time;
      pointer.px += (pointer.tx - pointer.px) * 0.05;
      pointer.py += (pointer.ty - pointer.py) * 0.05;
      ctx.clearRect(0, 0, width, height);

      const near: { x: number; y: number; a: number }[] = [];
      for (const star of stars) {
        const depth = 0.2 + star.z * 0.8;
        const x = wrap(star.x + pointer.px * depth * 24, width);
        const y = wrap(star.y - scroll * depth * 0.22 + pointer.py * depth * 16, height);
        const twinkle = calm ? 0.7 : 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(time * 0.001 * star.speed + star.phase));
        const alpha = twinkle * (0.18 + star.z * 0.8);
        const color = star.hue > 0.9 ? "255,221,170" : star.hue > 0.62 ? "190,214,255" : "255,255,255";

        ctx.beginPath();
        ctx.arc(x, y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.fill();
        if (star.z > 0.9) {
          ctx.beginPath();
          ctx.arc(x, y, star.r * 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color},${alpha * 0.08})`;
          ctx.fill();
        }

        const d = Math.hypot(x - pointer.x, y - pointer.y);
        if (d < 170 && star.z > 0.25) near.push({ x, y, a: 1 - d / 170 });
      }

      /* Constellation: link the stars closest to the cursor. */
      if (near.length > 1) {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const a = near[i];
            const b = near[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d > 110) continue;
            ctx.strokeStyle = `rgba(170,200,255,${Math.min(a.a, b.a) * (1 - d / 110) * 0.55})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (!calm) {
        meteorClock -= dt;
        if (meteorClock <= 0) {
          meteorClock = 3200 + Math.random() * 5200;
          meteors.push({
            x: width * (0.3 + Math.random() * 0.8),
            y: -40 - Math.random() * height * 0.25,
            vx: -0.55 - Math.random() * 0.3,
            vy: 0.38 + Math.random() * 0.22,
            life: 1,
            len: 120 + Math.random() * 160,
          });
        }
        meteors = meteors.filter((m) => m.life > 0 && m.y < height + 200);
        for (const m of meteors) {
          m.x += m.vx * dt;
          m.y += m.vy * dt;
          m.life -= dt * 0.00055;
          const norm = Math.hypot(m.vx, m.vy) || 1;
          const tailX = m.x - (m.vx / norm) * m.len;
          const tailY = m.y - (m.vy / norm) * m.len;
          const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255,244,222,${m.life * 0.95})`);
          grad.addColorStop(0.3, `rgba(160,196,255,${m.life * 0.4})`);
          grad.addColorStop(1, "rgba(160,196,255,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
        }
      }

      frame = visible ? window.requestAnimationFrame(draw) : 0;
    };

    const onPointer = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.tx = (event.clientX / width - 0.5) * 2;
      pointer.ty = (event.clientY / height - 0.5) * 2;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.tx = 0;
      pointer.ty = 0;
    };
    const onScroll = () => { scroll = window.scrollY; };
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible && !frame) {
        last = performance.now();
        frame = window.requestAnimationFrame(draw);
      }
    };

    seed();
    frame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", seed);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", seed);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas className="cosmos" ref={canvasRef} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* Scroll reveal — any [data-reveal] on the page, observed once.        */
/* ------------------------------------------------------------------ */
export function useRevealAll(dep: unknown) {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    if (reducedMotion()) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [dep]);
}

/* ------------------------------------------------------------------ */
/* Scroll-linked CSS variables: page progress, hero exit, velocity.    */
/* ------------------------------------------------------------------ */
export function useScrollMotion() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let lastY = window.scrollY;
    let velocity = 0;
    const tick = () => {
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      velocity += ((y - lastY) - velocity) * 0.18;
      lastY = y;
      root.style.setProperty("--page-progress", (max > 0 ? Math.min(y / max, 1) : 0).toFixed(4));
      root.style.setProperty("--hero-exit", Math.min(y / window.innerHeight, 1.2).toFixed(4));
      root.style.setProperty("--scroll-velocity", Math.max(-60, Math.min(60, velocity)).toFixed(2));
      setScrolled(y > 24);

      /* Words light up as the about paragraph crosses the viewport. */
      document.querySelectorAll<HTMLElement>("[data-scrub]").forEach((node) => {
        const rect = node.getBoundingClientRect();
        const p = (window.innerHeight * 0.85 - rect.top) / (rect.height + window.innerHeight * 0.35);
        node.style.setProperty("--scrub", Math.max(0, Math.min(1, p)).toFixed(4));
      });

      raf = Math.abs(velocity) > 0.05 ? window.requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => { if (!raf) raf = window.requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return scrolled;
}

/* ------------------------------------------------------------------ */
/* Cursor — a precise dot plus a lagging halo that swells on targets.  */
/* ------------------------------------------------------------------ */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!finePointer() || reducedMotion()) return;
    document.documentElement.classList.add("has-cursor");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2, rx: window.innerWidth / 2, ry: window.innerHeight / 2 };
    let raf = 0;
    const loop = () => {
      pos.rx += (pos.x - pos.rx) * 0.16;
      pos.ry += (pos.y - pos.ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.rx}px, ${pos.ry}px, 0)`;
      raf = window.requestAnimationFrame(loop);
    };
    const onMove = (event: PointerEvent) => {
      pos.x = event.clientX;
      pos.y = event.clientY;
      const target = event.target as Element | null;
      const hot = target?.closest("a, button, [data-cursor]");
      ring.current?.classList.toggle("is-hot", Boolean(hot));
      document.documentElement.classList.remove("cursor-hidden");
    };
    const onDown = () => ring.current?.classList.add("is-down");
    const onUp = () => ring.current?.classList.remove("is-down");
    const onLeave = () => document.documentElement.classList.add("cursor-hidden");
    raf = window.requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ring} aria-hidden="true"><i /></div>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Pointer helpers                                                     */
/* ------------------------------------------------------------------ */

/* Local spotlight: exposes the pointer position inside an element. */
export const spotlight = (event: ReactPointerEvent<HTMLElement>) => {
  if (event.pointerType === "touch") return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${(event.clientX - bounds.left).toFixed(1)}px`);
  event.currentTarget.style.setProperty("--my", `${(event.clientY - bounds.top).toFixed(1)}px`);
};

/* Spotlight + gentle 3D tilt for cards. */
export const tilt = (strength = 6) => ({
  onPointerMove: (event: ReactPointerEvent<HTMLElement>) => {
    spotlight(event);
    if (event.pointerType === "touch" || reducedMotion()) return;
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--rx", `${(-y * strength).toFixed(2)}deg`);
    node.style.setProperty("--ry", `${(x * strength).toFixed(2)}deg`);
  },
  onPointerLeave: (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  },
});

/* Magnetic buttons drift toward the cursor and spring back. */
export const magnetic = {
  onPointerMove: (event: ReactPointerEvent<HTMLElement>) => {
    spotlight(event);
    if (event.pointerType === "touch" || reducedMotion()) return;
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.setProperty("--tx", `${(x * 0.22).toFixed(1)}px`);
    node.style.setProperty("--ty", `${(y * 0.3).toFixed(1)}px`);
  },
  onPointerLeave: (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tx", "0px");
    event.currentTarget.style.setProperty("--ty", "0px");
  },
};

/* ------------------------------------------------------------------ */
/* Typography motion                                                   */
/* ------------------------------------------------------------------ */

/* Splits a heading into characters that rise in sequence; words never break. */
export function SplitText({ text, delay = 0, step = 0.045 }: { text: string; delay?: number; step?: number }) {
  let index = 0;
  return (
    <span className="split">
      <span className="sr-only">{text}</span>
      {text.split(/(\s+)/).map((word, w) =>
        /^\s+$/.test(word) ? (
          <span key={w}> </span>
        ) : (
          <span className="split-word" aria-hidden="true" key={w}>
            {Array.from(word).map((char) => (
              <span className="split-char" key={index} style={{ "--d": `${delay + index++ * step}s` } as CSSProperties}>{char}</span>
            ))}
          </span>
        ),
      )}
    </span>
  );
}

/* Clipboard with a fallback for insecure contexts and older webviews. */
export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;opacity:0;pointer-events:none";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}
