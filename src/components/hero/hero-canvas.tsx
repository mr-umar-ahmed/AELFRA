"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "@/lib/gsap";

// Palette matching user swatches:
const C = {
  oceanDeep: "#4E635E",
  villaNova: "#E2E0C8",
  sirenSong: "#A6B49E",
  bigRiver: "#818C78",
  abyssal: "#090F0D",
};

type Props = {
  wrapperRef: RefObject<HTMLDivElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
  hintRef: RefObject<HTMLDivElement | null>;
};

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
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })
  );
}

function precLine(pts: [number, number, number][], col = 0xE2E0C8, op = 1) {
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

// Draw emblem in Ocean Deep + Villa Nova
function dEmblem(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.translate(256, 256);
  ctx.beginPath();
  ctx.arc(0, 0, 190, 0, Math.PI * 2);
  ctx.lineWidth = 4;
  ctx.strokeStyle = C.villaNova;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, 160, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = C.sirenSong;
  ctx.stroke();

  // Geometric Aelfra Trident Symbol
  ctx.beginPath();
  ctx.moveTo(0, -110);
  ctx.lineTo(60, 90);
  ctx.lineTo(0, 50);
  ctx.lineTo(-60, 90);
  ctx.closePath();
  ctx.fillStyle = "rgba(78, 99, 94, 0.4)";
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = C.villaNova;
  ctx.stroke();

  ctx.restore();
}

function dSyscallNodes(ctx: CanvasRenderingContext2D) {
  const cx = 256, cy = 256;
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = cx + Math.cos(angle) * 140;
    const y = cy + Math.sin(angle) * 140;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "rgba(166, 180, 158, 0.4)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fillStyle = C.oceanDeep;
    ctx.fill();
    ctx.strokeStyle = C.villaNova;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(cx, cy, 28, 0, Math.PI * 2);
  ctx.fillStyle = C.villaNova;
  ctx.fill();
}

type Key = { t: number; cz: number; cy: number; cx: number; lz: number; ly: number; lx: number };
const KEYS: Key[] = [
  { t: 0.0, cz: 20, cy: 2.2, cx: 0, lz: -5, ly: 1.5, lx: 0 },
  { t: 0.25, cz: 9, cy: 1.9, cx: 0.4, lz: -12, ly: 1.3, lx: 0 },
  { t: 0.50, cz: -2, cy: 2.1, cx: -0.4, lz: -20, ly: 1.4, lx: 0 },
  { t: 0.75, cz: -12, cy: 2.4, cx: 0.2, lz: -28, ly: 1.6, lx: 0 },
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
    renderer.setClearColor(0x090F0D, 1);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090F0D);
    scene.fog = new THREE.FogExp2(0x090F0D, 0.026);

    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 300);
    camera.position.set(0, 2.2, 20);

    scene.add(new THREE.AmbientLight(0xE2E0C8, 0.7));
    const dl = new THREE.DirectionalLight(0x4E635E, 0.8);
    dl.position.set(6, 10, 8);
    scene.add(dl);

    const G = new THREE.Group();
    scene.add(G);

    // Oceanic Floor Grid
    const floor = new THREE.Group();
    for (let z = 6; z > -70; z -= 4) {
      floor.add(precLine([[-16, -2.6, z], [16, -2.6, z]], 0x818C78, 0.04));
    }
    for (let x = -16; x <= 16; x += 2.6) {
      floor.add(precLine([[x, -2.6, 6], [x, -2.6, -70]], 0x818C78, 0.04));
    }
    G.add(floor);

    // Ocean Deep Volumetric Glow Sprites
    const deepWash = glowSprite("rgba(78,99,94,0.85)", 24, 0.35);
    deepWash.position.set(0, 2, -15);
    G.add(deepWash);

    const villaWash = glowSprite("rgba(226,224,200,0.4)", 16, 0.25);
    villaWash.position.set(-6, -1, -20);
    G.add(villaWash);

    // Centerpiece Emblem
    const emblemGlow = glowSprite("rgba(78,99,94,0.9)", 8, 0.6);
    emblemGlow.position.set(0, 0.6, -6.4);
    G.add(emblemGlow);

    const emblem = plane(mkTex(dEmblem), 3.6, 3.6);
    emblem.position.set(0, 0.6, -6);
    G.add(emblem);

    const syscallPlane = plane(mkTex(dSyscallNodes), 3.2, 3.2);
    syscallPlane.position.set(6, -0.6, -13);
    G.add(syscallPlane);

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
        emblem.position.y = 0.6 + Math.sin(T * 0.6) * 0.05;
        emblem.rotation.z = Math.sin(T * 0.3) * 0.025;
        emblemGlow.position.y = emblem.position.y;
        syscallPlane.rotation.z = T * 0.1;
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
    };
  }, [wrapperRef, overlayRef, hintRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
