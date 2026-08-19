"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "@/lib/gsap";

const C = {
  oceanDeep: "#4E635E",
  villaNova: "#E2E0C8",
  sirenSong: "#A6B49E",
  bigRiver: "#818C78",
  abyssal: "#090F0D",
};

type Props = {
  wrapperRef: RefObject<HTMLDivElement | null>;
  onStageChange?: (stageIndex: number) => void;
};

// Texture generator helper
function mkTex(drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, w = 512, h = 512) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  drawFn(ctx, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

function plane(tex: THREE.Texture, w: number, h: number, depthWrite = false) {
  return new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite })
  );
}

function jLine(pts: [number, number, number][], col = 0xe2e0c8, op = 1) {
  const verts: number[] = [];
  pts.forEach(([x, y, z]) => {
    verts.push(x + (Math.random() - 0.5) * 0.02, y + (Math.random() - 0.5) * 0.02, z || 0);
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  return new THREE.Line(g, new THREE.LineBasicMaterial({ color: col, opacity: op, transparent: op < 1 }));
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

// ── Draw Functions ──────────────────────────────────────────────────────────

// Stage 1: Sovereign Sentinel Shield & Trident
function dShield(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.translate(256, 256);
  ctx.strokeStyle = C.villaNova;
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Outer Shield
  ctx.beginPath();
  ctx.moveTo(0, -180);
  ctx.bezierCurveTo(70, -150, 130, -140, 180, -140);
  ctx.lineTo(180, 20);
  ctx.bezierCurveTo(180, 120, 90, 190, 0, 220);
  ctx.bezierCurveTo(-90, 190, -180, 120, -180, 20);
  ctx.lineTo(-180, -140);
  ctx.bezierCurveTo(-130, -140, -70, -150, 0, -180);
  ctx.closePath();
  ctx.fillStyle = "rgba(78, 99, 94, 0.25)";
  ctx.fill();
  ctx.stroke();

  // Aelfra Trident Core
  ctx.beginPath();
  ctx.moveTo(0, -110);
  ctx.lineTo(50, 80);
  ctx.lineTo(0, 40);
  ctx.lineTo(-50, 80);
  ctx.closePath();
  ctx.fillStyle = C.villaNova;
  ctx.fill();
  ctx.strokeStyle = C.sirenSong;
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.font = "bold 32px monospace";
  ctx.fillStyle = C.villaNova;
  ctx.textAlign = "center";
  ctx.fillText("SOVEREIGN PERIMETER", 0, 160);

  ctx.restore();
}

// Stage 2: Enterprise Liability Crisis House
function dCrisisHouse(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = C.villaNova;
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.rect(50, 140, 412, 280);
  ctx.fillStyle = "rgba(16, 25, 22, 0.7)";
  ctx.fill();
  ctx.stroke();

  // Roof
  ctx.beginPath();
  ctx.moveTo(30, 140);
  ctx.lineTo(256, 30);
  ctx.lineTo(482, 140);
  ctx.stroke();

  // 3 Threat Windows
  const windows = ["01 RUNTIME", "02 ATTRITION", "03 FRAUD"];
  windows.forEach((w, i) => {
    const x = 80 + i * 130;
    ctx.beginPath();
    ctx.rect(x, 180, 90, 100);
    ctx.strokeStyle = C.sirenSong;
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.font = "bold 16px monospace";
    ctx.fillStyle = C.villaNova;
    ctx.textAlign = "center";
    ctx.fillText(w, x + 45, 235);
  });

  ctx.font = "bold 36px monospace";
  ctx.fillStyle = C.villaNova;
  ctx.textAlign = "center";
  ctx.fillText("THE ENTERPRISE CRISIS", 256, 380);
}

// Stage 3: Module 01 - Kernel Defense Syscall Towers (Umar Ahmed)
function dKernelTowers(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = C.villaNova;
  ctx.lineWidth = 6;
  ctx.lineCap = "round";

  // 3 eBPF Syscall Towers
  for (let i = 0; i < 3; i++) {
    const x = 70 + i * 135;
    const h = 180 + i * 35;
    const y = 380 - h;
    ctx.beginPath();
    ctx.rect(x, y, 100, h);
    ctx.fillStyle = "rgba(78, 99, 94, 0.4)";
    ctx.fill();
    ctx.stroke();

    // Syscall Nodes
    ctx.beginPath();
    ctx.arc(x + 50, y + 40, 16, 0, Math.PI * 2);
    ctx.fillStyle = C.villaNova;
    ctx.fill();
  }

  ctx.font = "bold 28px monospace";
  ctx.fillStyle = C.villaNova;
  ctx.textAlign = "center";
  ctx.fillText("MODULE 01: LINUX KERNEL DEFENSE", 256, 430);
  ctx.font = "20px monospace";
  ctx.fillStyle = C.sirenSong;
  ctx.fillText("Lead: Umar Ahmed // eBPF Engine", 256, 465);
}

// Stage 4: Module 02 - AI Onboarding RAG Rocket (Syed Sirajuddin Zain)
function dRagRocket(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = C.villaNova;
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Vector Rocket Body
  ctx.beginPath();
  ctx.moveTo(256, 40);
  ctx.bezierCurveTo(180, 120, 160, 260, 160, 360);
  ctx.lineTo(352, 360);
  ctx.bezierCurveTo(352, 260, 332, 120, 256, 40);
  ctx.fillStyle = "rgba(166, 180, 158, 0.3)";
  ctx.fill();
  ctx.stroke();

  // Vector Core Eye
  ctx.beginPath();
  ctx.arc(256, 180, 40, 0, Math.PI * 2);
  ctx.fillStyle = C.villaNova;
  ctx.fill();

  ctx.font = "bold 26px monospace";
  ctx.fillStyle = C.villaNova;
  ctx.textAlign = "center";
  ctx.fillText("MODULE 02: AI ONBOARDING RAG", 256, 420);
  ctx.font = "18px monospace";
  ctx.fillStyle = C.sirenSong;
  ctx.fillText("Lead: Syed Sirajuddin Zain // Vector Engine", 256, 455);
}

// Stage 5: Module 03 - Autonomous AI Audit Flask (Syed Hammad Hussain)
function dAuditFlask(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = C.villaNova;
  ctx.lineWidth = 8;
  ctx.lineCap = "round";

  // Flask Neck & Base
  ctx.beginPath();
  ctx.moveTo(200, 50);
  ctx.lineTo(200, 150);
  ctx.bezierCurveTo(120, 200, 80, 280, 80, 350);
  ctx.bezierCurveTo(80, 410, 432, 410, 432, 350);
  ctx.bezierCurveTo(432, 280, 392, 200, 312, 150);
  ctx.lineTo(312, 50);
  ctx.closePath();
  ctx.fillStyle = "rgba(129, 140, 120, 0.35)";
  ctx.fill();
  ctx.stroke();

  ctx.font = "bold 24px monospace";
  ctx.fillStyle = C.villaNova;
  ctx.textAlign = "center";
  ctx.fillText("MODULE 03: FINANCIAL AUDIT", 256, 440);
  ctx.font = "18px monospace";
  ctx.fillStyle = C.sirenSong;
  ctx.fillText("Lead: Syed Hammad Hussain // Graph Core", 256, 475);
}

// Stage 6: Unified Sovereign Convergence Portal
function dConvergencePortal(ctx: CanvasRenderingContext2D) {
  const cx = 256, cy = 256;
  ctx.strokeStyle = C.villaNova;

  for (let r = 220; r > 20; r -= 24) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(226, 224, 200, ${0.1 + r / 400})`;
    ctx.lineWidth = r > 160 ? 6 : 3;
    ctx.stroke();
  }

  ctx.font = "bold 32px monospace";
  ctx.fillStyle = C.villaNova;
  ctx.textAlign = "center";
  ctx.fillText("AELFRA CONVERGENCE", cx, cy - 10);
  ctx.font = "18px monospace";
  ctx.fillStyle = C.sirenSong;
  ctx.fillText("UNIFIED SOVEREIGN CORE", cx, cy + 30);
}

// Camera Path Keyframes along Z axis
type Key = { t: number; cz: number; cy: number; cx: number; lz: number; ly: number; lx: number; stage: number };
const KEYS: Key[] = [
  { t: 0.00, cz: 20,   cy: 2.2, cx: 0,    lz: -5,   ly: 1.5, lx: 0, stage: 0 },
  { t: 0.15, cz: -15,  cy: 2.0, cx: 0.3,  lz: -35,  ly: 1.5, lx: 0, stage: 1 },
  { t: 0.32, cz: -55,  cy: 2.2, cx: -0.3, lz: -75,  ly: 1.5, lx: 0, stage: 2 },
  { t: 0.48, cz: -95,  cy: 2.4, cx: 0.3,  lz: -115, ly: 1.5, lx: 0, stage: 3 },
  { t: 0.65, cz: -135, cy: 2.4, cx: -0.3, lz: -155, ly: 1.5, lx: 0, stage: 4 },
  { t: 0.82, cz: -175, cy: 2.6, cx: 0,    lz: -195, ly: 1.8, lx: 0, stage: 5 },
  { t: 1.00, cz: -215, cy: 2.2, cx: 0,    lz: -245, ly: 1.0, lx: 0, stage: 5 },
];

/**
 * Scroll-progress target (0..1 of the hero wrapper) for each of the 6 stages.
 * Derived from the camera keyframes so the HUD dots land exactly on a stage,
 * nudged slightly past the boundary so the stage reliably activates.
 */
export const STAGE_SCROLL_TARGETS: number[] = (() => {
  const targets: number[] = [];
  for (let s = 0; s < 6; s++) {
    const key = KEYS.find((k) => k.stage === s);
    targets.push(key ? Math.min(1, key.t + (s === 0 ? 0 : 0.02)) : 1);
  }
  return targets;
})();

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
    stage: a.stage,
  };
}

export function HeroCanvas({ wrapperRef, onStageChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // The scene must be built exactly once. The stage callback is read through
  // a ref so a new callback identity never tears down the WebGL world.
  const onStageChangeRef = useRef(onStageChange);
  useEffect(() => {
    onStageChangeRef.current = onStageChange;
  }, [onStageChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x090f0d, 1);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090f0d);
    scene.fog = new THREE.FogExp2(0x090f0d, 0.018);

    const isMobile = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(isMobile ? 75 : 54, window.innerWidth / window.innerHeight, 0.1, 400);
    camera.position.set(0, 2.2, 20);

    scene.add(new THREE.AmbientLight(0xe2e0c8, 0.8));
    const dl = new THREE.DirectionalLight(0x4e635e, 0.9);
    dl.position.set(6, 12, 8);
    scene.add(dl);

    const G = new THREE.Group();
    scene.add(G);

    // ── 3D Digital Runway Road ─────────────────────────────────────────────
    const roadGroup = new THREE.Group();
    const roadMat = new THREE.MeshBasicMaterial({ color: 0x101916, transparent: true, opacity: 0.7 });
    const roadMesh = new THREE.Mesh(new THREE.PlaneGeometry(6, 260), roadMat);
    roadMesh.rotation.x = -Math.PI / 2;
    roadMesh.position.set(0, -1.2, -120);
    roadGroup.add(roadMesh);

    for (let z = 10; z > -250; z -= 6) {
      roadGroup.add(jLine([[-3, -1.2, z], [-3, -1.2, z - 6]], 0x818c78, 0.3));
      roadGroup.add(jLine([[3, -1.2, z], [3, -1.2, z - 6]], 0x818c78, 0.3));
      if (z % 18 === 0) {
        roadGroup.add(jLine([[0, -1.2, z], [0, -1.2, z - 8]], 0xe2e0c8, 0.4));
      }
    }
    G.add(roadGroup);

    // Volumetric Glows along path
    const glows = [
      { color: "rgba(78,99,94,0.8)", size: 22, x: 0, y: 2, z: -10 },
      { color: "rgba(226,224,200,0.5)", size: 18, x: -5, y: 1, z: -50 },
      { color: "rgba(166,180,158,0.6)", size: 20, x: 5, y: 2, z: -90 },
      { color: "rgba(129,140,120,0.6)", size: 20, x: -4, y: 1, z: -130 },
      { color: "rgba(78,99,94,0.85)", size: 24, x: 0, y: 2, z: -180 },
      { color: "rgba(226,224,200,0.6)", size: 26, x: 0, y: 2, z: -230 },
    ];
    glows.forEach((g) => {
      const sprite = glowSprite(g.color, g.size, 0.35);
      sprite.position.set(g.x, g.y, g.z);
      G.add(sprite);
    });

    // ── 6 Stage Checkpoint Meshes ─────────────────────────────────────────
    const shieldMesh = plane(mkTex(dShield), 4.2, 4.2);
    shieldMesh.position.set(0, 0.8, -6);
    G.add(shieldMesh);

    const crisisMesh = plane(mkTex(dCrisisHouse), 7.2, 7.2);
    crisisMesh.position.set(0, 2.0, -45);
    G.add(crisisMesh);

    const kernelMesh = plane(mkTex(dKernelTowers), 6.8, 6.8);
    kernelMesh.position.set(-3.5, 1.8, -85);
    G.add(kernelMesh);

    const ragMesh = plane(mkTex(dRagRocket), 6.5, 6.5);
    ragMesh.position.set(3.5, 1.8, -125);
    G.add(ragMesh);

    const auditMesh = plane(mkTex(dAuditFlask), 6.5, 6.5);
    auditMesh.position.set(-3.2, 1.8, -165);
    G.add(auditMesh);

    const portalMesh = plane(mkTex(dConvergencePortal), 8.5, 8.5);
    portalMesh.position.set(0, 2.0, -215);
    G.add(portalMesh);

    // ── Side Beacons along the path ──────────────────────────────────────
    for (let z = 0; z > -240; z -= 14) {
      const side = z % 28 === 0 ? -4.5 : 4.5;
      const bGlow = glowSprite("rgba(226,224,200,0.6)", 3, 0.4);
      bGlow.position.set(side, 1.5, z);
      G.add(bGlow);
    }

    // ── Scroll & Animation Lerp ────────────────────────────────────────────
    const progress = { raw: 0, smooth: 0 };
    let currentStage = 0;
    let heroActive = true;

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progress.raw = self.progress;
      },
      onToggle: (self) => {
        heroActive = self.isActive;
      },
    });
    // The hero starts at scroll 0, so it is active on load even before the
    // first toggle fires.
    heroActive = true;

    let raf = 0;
    const timer = new THREE.Timer();

    function animate() {
      raf = requestAnimationFrame(animate);
      timer.update();
      const dt = Math.min(timer.getDelta(), 0.05);
      const T = timer.getElapsed();

      // Skip rendering entirely while the hero is scrolled out of view and
      // the camera has settled — saves GPU for the DOM sections below.
      const settled = Math.abs(progress.raw - progress.smooth) < 0.0005;
      if (!heroActive && settled) return;

      progress.smooth += (progress.raw - progress.smooth) * (reduced ? 1 : 1 - Math.exp(-dt * 5));

      const cam = samplePath(progress.smooth);
      const sway = reduced ? 0 : Math.sin(T * 0.25) * 0.18;
      camera.position.set(cam.cx + sway, cam.cy, cam.cz);
      camera.lookAt(cam.lx + sway * 0.3, cam.ly, cam.lz);

      if (cam.stage !== currentStage) {
        currentStage = cam.stage;
        onStageChangeRef.current?.(currentStage);
      }

      if (!reduced) {
        shieldMesh.position.y = 0.8 + Math.sin(T * 0.6) * 0.06;
        shieldMesh.rotation.z = Math.sin(T * 0.3) * 0.02;

        crisisMesh.position.y = 2.0 + Math.sin(T * 0.5 + 1) * 0.05;

        kernelMesh.position.y = 1.8 + Math.sin(T * 0.7 + 2) * 0.08;
        ragMesh.position.y = 1.8 + Math.sin(T * 0.8 + 3) * 0.1;
        auditMesh.position.y = 1.8 + Math.sin(T * 0.6 + 4) * 0.07;

        portalMesh.rotation.z = T * 0.08;
      }

      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      const isMobile = window.innerWidth < 768;
      camera.fov = isMobile ? 75 : 54;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      st.kill();
      // Free every GPU resource this scene allocated.
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.Sprite) {
          obj.geometry?.dispose?.();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((mat: THREE.Material & { map?: THREE.Texture | null }) => {
            mat?.map?.dispose?.();
            mat?.dispose?.();
          });
        }
      });
      timer.dispose();
      renderer.dispose();
    };
    // Build once on mount — everything dynamic flows through refs above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
