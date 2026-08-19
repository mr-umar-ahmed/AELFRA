"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "@/lib/gsap";

// ── Obsidian palette (inverted from the original light-theme reference) ────
const C = {
  off: "#F8FAFC",
  offDim: "rgba(248,250,252,0.28)",
  cyan: "#06B6D4",
  purple: "#9333EA",
  muted: "#64748B",
};

type Props = {
  /** The pinned scroll-range wrapper — drives camera progress via ScrollTrigger. */
  wrapperRef: RefObject<HTMLDivElement | null>;
  /** Fades with the DOM overlay copy (used to keep both in lockstep). */
  overlayRef: RefObject<HTMLDivElement | null>;
  hintRef: RefObject<HTMLDivElement | null>;
};

// ── canvas texture helpers ───────────────────────────────────────────────
function mkTex(draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, w = 512, h = 512) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}
function plane(tex: THREE.Texture, w: number, h: number) {
  return new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }),
  );
}
function precLine(pts: [number, number, number][], col = 0xf8fafc, op = 1) {
  const verts: number[] = [];
  pts.forEach(([x, y, z]) => verts.push(x, y, z || 0));
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  return new THREE.Line(g, new THREE.LineBasicMaterial({ color: col, opacity: op, transparent: true }));
}
function glowSprite(color: string, size: number, opacity = 0.55) {
  const tex = mkTex((ctx, w, h) => {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    grad.addColorStop(0, color);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }, 256, 256);
  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const s = new THREE.Sprite(mat);
  s.scale.set(size, size, 1);
  return s;
}
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ── icon draw functions — dark metallic linework, cyan accent ──────────────
function dShield(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.translate(256, 256);
  ctx.beginPath();
  ctx.moveTo(0, -190);
  ctx.bezierCurveTo(60, -160, 120, -150, 170, -150);
  ctx.lineTo(170, 20);
  ctx.bezierCurveTo(170, 120, 90, 190, 0, 220);
  ctx.bezierCurveTo(-90, 190, -170, 120, -170, 20);
  ctx.lineTo(-170, -150);
  ctx.bezierCurveTo(-120, -150, -60, -160, 0, -190);
  ctx.closePath();
  ctx.lineWidth = 6;
  ctx.strokeStyle = C.off;
  ctx.lineJoin = "round";
  ctx.fillStyle = "rgba(6,182,212,0.06)";
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-70, 10);
  ctx.lineTo(-20, 60);
  ctx.lineTo(90, -60);
  ctx.lineWidth = 12;
  ctx.strokeStyle = C.cyan;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
  ctx.restore();
}

function dNetworkNodes(ctx: CanvasRenderingContext2D) {
  const cx = 256, cy = 256;
  const ring: [number, number][] = [];
  for (let a = 0; a < 8; a++) {
    const rad = (a / 8) * Math.PI * 2;
    ring.push([cx + Math.cos(rad) * 170, cy + Math.sin(rad) * 170]);
  }
  ring.forEach((n) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(n[0], n[1]);
    ctx.strokeStyle = "rgba(6,182,212,0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i], b = ring[(i + 1) % ring.length];
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.strokeStyle = "rgba(248,250,252,0.14)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ring.forEach((n) => {
    ctx.beginPath();
    ctx.arc(n[0], n[1], 10, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.fill();
    ctx.strokeStyle = C.off;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  });
  ctx.beginPath();
  ctx.arc(cx, cy, 24, 0, Math.PI * 2);
  ctx.fillStyle = C.cyan;
  ctx.fill();
  ctx.strokeStyle = C.off;
  ctx.lineWidth = 2.5;
  ctx.stroke();
}

function dPortalMark(ctx: CanvasRenderingContext2D) {
  const cx = 256, cy = 256;
  for (let r = 200; r > 20; r -= 26) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(6,182,212,${0.04 + (200 - r) / 600})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.lineWidth = 5;
  ctx.strokeStyle = C.off;
  ctx.beginPath();
  ctx.arc(cx, cy, 200, 0, Math.PI * 2);
  ctx.stroke();
  roundRect(ctx, cx - 40, cy - 40, 80, 80, 16);
  ctx.fillStyle = C.cyan;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();
}

function dServerRack(ctx: CanvasRenderingContext2D) {
  ctx.lineWidth = 5;
  ctx.strokeStyle = C.off;
  ctx.lineJoin = "round";
  roundRect(ctx, 110, 40, 292, 432, 10);
  ctx.fillStyle = "rgba(6,182,212,0.03)";
  ctx.fill();
  ctx.stroke();
  for (let i = 0; i < 8; i++) {
    const y = 64 + i * 50;
    roundRect(ctx, 132, y, 248, 38, 4);
    ctx.strokeStyle = "rgba(248,250,252,0.28)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(154, y + 19, 5, 0, Math.PI * 2);
    ctx.fillStyle = i < 6 ? C.cyan : C.purple;
    ctx.fill();
    for (let s = 0; s < 5; s++) {
      ctx.beginPath();
      ctx.moveTo(190 + s * 36, y + 10);
      ctx.lineTo(190 + s * 36, y + 28);
      ctx.strokeStyle = "rgba(248,250,252,0.1)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}

// ── camera path (trimmed to the hero's own scroll range, same easing model
//    as the source file's full journey) ─────────────────────────────────────
type Key = { t: number; cz: number; cy: number; cx: number; lz: number; ly: number; lx: number };
const KEYS: Key[] = [
  { t: 0.0, cz: 20, cy: 2.2, cx: 0, lz: -5, ly: 1.5, lx: 0 },
  { t: 0.22, cz: 9, cy: 1.9, cx: 0.4, lz: -12, ly: 1.3, lx: 0 },
  { t: 0.48, cz: -2, cy: 2.1, cx: -0.4, lz: -20, ly: 1.4, lx: 0 },
  { t: 0.72, cz: -12, cy: 2.4, cx: 0.2, lz: -28, ly: 1.6, lx: 0 },
  { t: 1.0, cz: -20, cy: 2.6, cx: 0, lz: -36, ly: 1.7, lx: 0 },
];
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function samplePath(p: number) {
  let a = KEYS[0], b = KEYS[KEYS.length - 1];
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (p >= KEYS[i].t && p <= KEYS[i + 1].t) {
      a = KEYS[i];
      b = KEYS[i + 1];
      break;
    }
  }
  const range = b.t - a.t;
  const f = range < 0.001 ? 0 : easeInOut((p - a.t) / range);
  return {
    cz: a.cz + (b.cz - a.cz) * f,
    cy: a.cy + (b.cy - a.cy) * f,
    cx: a.cx + (b.cx - a.cx) * f,
    lz: a.lz + (b.lz - a.lz) * f,
    ly: a.ly + (b.ly - a.ly) * f,
    lx: a.lx + (b.lx - a.lx) * f,
  };
}

export function HeroCanvas({ wrapperRef, overlayRef, hintRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.028);

    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 300);
    camera.position.set(0, 2.2, 20);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dl = new THREE.DirectionalLight(0x06b6d4, 0.4);
    dl.position.set(6, 10, 8);
    scene.add(dl);

    const G = new THREE.Group();
    scene.add(G);

    // Receding technical floor grid — the "dark metallic foundation".
    const floor = new THREE.Group();
    for (let z = 6; z > -70; z -= 4) {
      floor.add(precLine([[-16, -2.6, z], [16, -2.6, z]], 0xf8fafc, 0.028));
    }
    for (let x = -16; x <= 16; x += 2.6) {
      floor.add(precLine([[x, -2.6, 6], [x, -2.6, -70]], 0xf8fafc, 0.028));
    }
    G.add(floor);

    // Faint volumetric purple wash, deep in the fog — reads as ambient depth.
    const purpleWash = glowSprite("rgba(147,51,234,0.9)", 22, 0.16);
    purpleWash.position.set(-4, 3, -24);
    G.add(purpleWash);
    const cyanWash = glowSprite("rgba(6,182,212,0.9)", 18, 0.14);
    cyanWash.position.set(5, -1, -14);
    G.add(cyanWash);

    // Centerpiece shield, softly backlit.
    const shieldGlow = glowSprite("rgba(6,182,212,0.85)", 7, 0.5);
    shieldGlow.position.set(0, 0.6, -6.4);
    G.add(shieldGlow);
    const shield = plane(mkTex(dShield), 3.4, 3.4);
    shield.position.set(0, 0.6, -6);
    G.add(shield);

    const orbitDefs = [
      { tex: mkTex(dServerRack), x: -6, y: 1.4, z: -10, s: 1.7 },
      { tex: mkTex(dNetworkNodes), x: 6, y: -0.6, z: -13, s: 2.1 },
      { tex: mkTex(dPortalMark), x: -5.2, y: -1.8, z: -20, s: 1.9 },
      { tex: mkTex(dNetworkNodes), x: 5, y: 2.4, z: -24, s: 1.5 },
      { tex: mkTex(dServerRack), x: -3, y: 0.4, z: -30, s: 1.4 },
    ];
    const orbitMeshes = orbitDefs.map((o, i) => {
      const m = plane(o.tex, o.s, o.s);
      m.name = "orbit" + i;
      m.position.set(o.x, o.y, o.z);
      m.material.opacity = 0.82;
      G.add(m);
      return m;
    });

    // ── ScrollTrigger drives progress; RAF loop lerps the camera to it ──────
    const progress = { raw: 0, smooth: 0 };
    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progress.raw = self.progress;
      },
    });

    function setOverlays(p: number) {
      const overlay = overlayRef.current;
      const hint = hintRef.current;
      if (overlay) {
        // Fully visible at rest; fades out as the camera pushes into the scene.
        const o = 1 - Math.max(0, Math.min(1, (p - 0.58) / 0.16));
        overlay.style.opacity = String(o);
        overlay.style.transform = `translateY(${(1 - o) * -18}px) scale(${1 - (1 - o) * 0.02})`;
        overlay.style.pointerEvents = o > 0.6 ? "auto" : "none";
      }
      if (hint) {
        hint.style.opacity = p < 0.02 ? "1" : "0";
      }
    }

    let raf = 0;
    const timer = new THREE.Timer();
    function animate() {
      raf = requestAnimationFrame(animate);
      timer.update();
      const dt = Math.min(timer.getDelta(), 0.05);
      const T = timer.getElapsed();

      progress.smooth += (progress.raw - progress.smooth) * (reduced ? 1 : 1 - Math.exp(-dt * 6));

      const cam = samplePath(progress.smooth);
      const sway = reduced ? 0 : Math.sin(T * 0.22) * 0.16;
      camera.position.set(cam.cx + sway, cam.cy, cam.cz);
      camera.lookAt(cam.lx + sway * 0.3, cam.ly, cam.lz);

      if (!reduced) {
        shield.position.y = 0.6 + Math.sin(T * 0.6) * 0.05;
        shield.rotation.z = Math.sin(T * 0.3) * 0.025;
        shieldGlow.position.y = shield.position.y;
        orbitMeshes.forEach((m, i) => {
          m.position.y += 0;
          m.rotation.z = Math.sin(T * 0.35 + i * 1.3) * 0.03;
          m.material.opacity = 0.72 + Math.sin(T * 0.8 + i) * 0.1;
        });
        purpleWash.rotation.z = T * 0.02;
      }

      setOverlays(progress.smooth);
      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      st.kill();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Sprite) {
          obj.geometry?.dispose?.();
          const mat = obj.material as THREE.Material & { map?: THREE.Texture | null };
          mat.map?.dispose?.();
          mat.dispose?.();
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
