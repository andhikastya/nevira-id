import { CanvasTexture, Color, MeshStandardMaterial, RepeatWrapping, SRGBColorSpace, type MeshStandardMaterialParameters } from "three";

/**
 * Shared low-poly materials. Every material made with `mat()` is registered so the
 * whole world can be desaturated (Problem section) by `applySaturation()`.
 */
type Entry = { m: MeshStandardMaterial; base: Color; grey: Color };
const registry: Entry[] = [];

export function mat(color: string, params: MeshStandardMaterialParameters = {}) {
  const m = new MeshStandardMaterial({ color, flatShading: true, roughness: 0.82, metalness: 0, ...params });
  const base = m.color.clone();
  const l = base.r * 0.299 + base.g * 0.587 + base.b * 0.114;
  registry.push({ m, base, grey: new Color(l, l, l).lerp(new Color("#CDCFD6"), 0.25) });
  return m;
}

let lastSat = -1;
export function applySaturation(amount: number) {
  if (Math.abs(amount - lastSat) < 0.002) return;
  lastSat = amount;
  for (const e of registry) e.m.color.copy(e.grey).lerp(e.base, amount);
}

/** Kilau-tinted palette for the world. Gold is reserved for Saldo Koin only. */
export const M = {
  ground: mat("#8CC56B"),
  rock: mat("#B88A5E"),
  rockDeep: mat("#8E6A4B"),
  wall: mat("#FFFFFF"),
  wallSoft: mat("#F4F4F6"),
  floor: mat("#EBE5F6"),
  purple: mat("#5B369E"),
  purpleMid: mat("#7550BE"),
  purpleLight: mat("#916ED4"),
  lavender: mat("#C3AEE7"),
  lilac: mat("#DCD0F0"),
  ink: mat("#32363E"),
  slate: mat("#818898"),
  glass: mat("#D6F5FF", { roughness: 0.2, metalness: 0.1 }),
  paper: mat("#FFFFFF", { flatShading: false }),
  cloud: new MeshStandardMaterial({ color: "#FFFFFF", emissive: "#EBE5F6", emissiveIntensity: 0.55, roughness: 1 }),
  gold: new MeshStandardMaterial({ color: "#E8B723", metalness: 0.65, roughness: 0.28, emissive: "#8F6F0E", emissiveIntensity: 0.15 }),
  // Soft, smooth-shaded foliage (storybook style): three greens + three blossom pinks.
  leafA: mat("#8AB861", { flatShading: false, roughness: 1 }),
  leafB: mat("#71A24A", { flatShading: false, roughness: 1 }),
  leafC: mat("#A6CD7E", { flatShading: false, roughness: 1 }),
  pinkA: mat("#E6A3B4", { flatShading: false, roughness: 1 }),
  pinkB: mat("#D18A9D", { flatShading: false, roughness: 1 }),
  pinkC: mat("#F3C3CD", { flatShading: false, roughness: 1 }),
  lavenderSprig: mat("#9B7FD6", { flatShading: false }),
  grassTuft: mat("#6FA84A", { flatShading: false, roughness: 1 }),
  trunk: mat("#8A6242", { flatShading: false, roughness: 1 }),
  plaster: mat("#FBF0DA", { flatShading: false, roughness: 0.92 }),
  stone: mat("#E8DDC4", { roughness: 1 }),
  timber: mat("#B3855C", { roughness: 0.9 }),
  frame: mat("#FFFDF7", { flatShading: false }),
  mint: mat("#A8D5BA", { flatShading: false }),
  // Smooth-shaded purples for rounded props and characters (no low-poly facets).
  purpleSoft: mat("#5B369E", { flatShading: false, roughness: 0.6 }),
  purpleLightSoft: mat("#916ED4", { flatShading: false, roughness: 0.6 }),
  skin: mat("#F2C9A0", { flatShading: false, roughness: 0.9 }),
  roofTerracotta: mat("#E07A5F"),
  /** Windows glow at dusk — emissive driven by live.dusk. */
  window: new MeshStandardMaterial({ color: "#EBE5F6", emissive: "#F1D378", emissiveIntensity: 0, flatShading: true }),
};

/** World length of one center-line period (dash + gap). */
export const DASH_PERIOD = 1.4;

/**
 * Black asphalt with fine grain and one crisp center dash per tile.
 * One tile = one DASH_PERIOD along the road; v spans the road width.
 */
function asphaltTexture() {
  const t = canvasTexture(512, 256, (g, w, h) => {
    g.fillStyle = "#2E3137";
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 2200; i++) {
      const v = 40 + Math.random() * 36;
      g.fillStyle = `rgba(${v},${v + 3},${v + 8},0.5)`;
      g.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }
    // Dash centered in the tile (50% duty), rounded ends, exact middle of the lane.
    const dw = w * 0.5;
    const dh = 12;
    g.fillStyle = "#F4F4F6";
    g.beginPath();
    g.roundRect((w - dw) / 2, h / 2 - dh / 2, dw, dh, dh / 2);
    g.fill();
  });
  t.wrapS = t.wrapT = RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

/**
 * A logo image centered on a rounded board (canvas texture). The board draws
 * immediately; the logo is painted in once the image has loaded.
 */
export function logoBoardTexture(
  src: string,
  { width, height, pad, fill = "#FFFFFF", border, radius = 36 }: { width: number; height: number; pad: number; fill?: string; border?: string; radius?: number },
) {
  const tex = canvasTexture(width, height, (g, w, h) => {
    roundRect(g, 6, 6, w - 12, h - 12, radius);
    g.fillStyle = fill;
    g.fill();
    if (border) {
      g.lineWidth = 12;
      g.strokeStyle = border;
      g.stroke();
    }
  });
  const img = new Image();
  img.onload = () => {
    const c = tex.image as HTMLCanvasElement;
    const g = c.getContext("2d")!;
    const maxW = c.width - pad * 2;
    const maxH = c.height - pad * 2;
    const scale = Math.min(maxW / img.width, maxH / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    g.drawImage(img, (c.width - dw) / 2, (c.height - dh) / 2, dw, dh);
    tex.needsUpdate = true;
  };
  img.src = src;
  return tex;
}

/** Scalloped roof tiles (shingles), drawn row by row with per-tile tone jitter. */
export function shingleTexture(base: [number, number, number], edge: string, repeat: [number, number]) {
  let seed = 3;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const t = canvasTexture(256, 256, (g, s) => {
    g.fillStyle = `rgb(${base.join(",")})`;
    g.fillRect(0, 0, s, s);
    const w = 42;
    const h = 28;
    for (let row = 0; row < s / h + 2; row++) {
      const off = (row % 2) * (w / 2);
      for (let col = -1; col < s / w + 1; col++) {
        const x = col * w + off;
        const y = row * h;
        const tone = Math.round(rnd() * 26 - 14);
        g.fillStyle = `rgb(${base[0] + tone},${base[1] + tone},${base[2] + tone})`;
        g.strokeStyle = edge;
        g.lineWidth = 1.8;
        g.beginPath();
        g.moveTo(x, y);
        g.lineTo(x + w, y);
        g.lineTo(x + w, y + h * 0.55);
        g.arc(x + w / 2, y + h * 0.55, w / 2, 0, Math.PI);
        g.closePath();
        g.fill();
        g.stroke();
      }
    }
  });
  t.wrapS = t.wrapT = RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = 8;
  return t;
}

/** Plain light concrete for the plaza under the hub. */
function concreteTexture() {
  const t = canvasTexture(256, 256, (g, w, h) => {
    g.fillStyle = "#D9DBE0";
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 900; i++) {
      const v = 200 + Math.random() * 30;
      g.fillStyle = `rgba(${v},${v},${v + 4},0.5)`;
      g.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }
  });
  t.wrapS = t.wrapT = RepeatWrapping;
  t.repeat.set(4, 4);
  return t;
}

/** Road + plaza surfaces. Built lazily (needs `document`). */
let surfaces: { road: MeshStandardMaterial; plaza: MeshStandardMaterial } | null = null;
export function roadMaterials() {
  if (!surfaces) {
    surfaces = {
      road: mat("#FFFFFF", { map: asphaltTexture(), flatShading: false, roughness: 0.95 }),
      plaza: mat("#FFFFFF", { map: concreteTexture(), flatShading: false, roughness: 0.9 }),
    };
  }
  return surfaces;
}

/** Soft radial glow texture for additive "fake bloom" sprites. */
let glowTex: CanvasTexture | null = null;
export function glowTexture() {
  if (glowTex) return glowTex;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.25, "rgba(255,255,255,0.55)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  glowTex = new CanvasTexture(c);
  glowTex.colorSpace = SRGBColorSpace;
  return glowTex;
}

/** Draws on a 2D canvas and returns it as a texture (signs, UI mocks, bubbles). */
export function canvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D, w: number, h: number) => void) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  draw(g, w, h);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.roundRect(x, y, w, h, r);
}
