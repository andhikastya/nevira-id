"use client";

import { useEffect, useMemo } from "react";
import { MeshBasicMaterial, SRGBColorSpace, TextureLoader } from "three";
import { SCREENS_READY } from "@/content/screens";
import { canvasTexture, roundRect } from "./materials";

export type ScreenKind = "kasir" | "produksi" | "kurir" | "wa" | "admin";

const SRC: Record<ScreenKind, string> = {
  kasir: "/screens/pos-kasir.png",
  produksi: "/screens/pos-produksi.png",
  kurir: "/screens/pos-kurir.png",
  wa: "/screens/wa-notif.png",
  admin: "/screens/admin.png",
};

const P = { purple: "#5B369E", ink: "#32363E", sub: "#818898", line: "#E6E7EA", surf: "#F4F4F6", lav: "#EBE5F6", lav2: "#C3AEE7" };

/** Stand-in UI drawn on canvas until the real screenshots are dropped into /public/screens. */
function drawMock(kind: ScreenKind) {
  return canvasTexture(640, 400, (g, w, h) => {
    g.fillStyle = "#FFFFFF";
    g.fillRect(0, 0, w, h);
    // top bar
    g.fillStyle = P.purple;
    g.fillRect(0, 0, w, 44);
    g.fillStyle = "#FFFFFF";
    g.font = "600 20px 'Red Hat Text', sans-serif";
    const titles: Record<ScreenKind, string> = {
      kasir: "POS Kasir",
      produksi: "POS Produksi",
      kurir: "POS Kurir",
      wa: "WhatsApp",
      admin: "Website Admin",
    };
    g.fillText(titles[kind], 20, 29);

    g.font = "500 16px 'Red Hat Text', sans-serif";
    if (kind === "kasir") {
      const rows = ["Cuci Kering Setrika · 4 kg", "Bed Cover · 1 pcs", "Express 6 Jam"];
      rows.forEach((r, i) => {
        g.fillStyle = i % 2 ? "#FFFFFF" : P.surf;
        g.fillRect(20, 64 + i * 52, 380, 44);
        g.fillStyle = P.ink;
        g.fillText(r, 34, 92 + i * 52);
        g.fillText(["Rp36.000", "Rp25.000", "Rp10.000"][i], 300, 92 + i * 52);
      });
      roundRect(g, 420, 64, 200, 200, 12);
      g.fillStyle = P.lav;
      g.fill();
      g.fillStyle = P.sub;
      g.fillText("Total", 440, 96);
      g.fillStyle = P.ink;
      g.font = "700 30px 'Red Hat Text', sans-serif";
      g.fillText("Rp71.000", 440, 136);
      roundRect(g, 440, 196, 160, 48, 12);
      g.fillStyle = P.purple;
      g.fill();
      g.fillStyle = "#FFF";
      g.font = "600 18px 'Red Hat Text', sans-serif";
      g.fillText("Bayar & Cetak", 462, 226);
    } else if (kind === "produksi") {
      const cols = ["Antre", "Dicuci", "Setrika"];
      cols.forEach((c, i) => {
        const x = 20 + i * 205;
        g.fillStyle = P.sub;
        g.fillText(c, x, 76);
        for (let j = 0; j < 3 - (i === 2 ? 1 : 0); j++) {
          roundRect(g, x, 92 + j * 90, 190, 78, 10);
          g.fillStyle = j === 0 && i === 1 ? P.lav : P.surf;
          g.fill();
          g.fillStyle = P.ink;
          g.fillText(`WO-0${41 + i * 3 + j}`, x + 14, 120 + j * 90);
          g.fillStyle = P.lav2;
          g.fillRect(x + 14, 136 + j * 90, 120 - j * 20, 8);
        }
      });
    } else if (kind === "kurir") {
      g.fillStyle = P.lav;
      g.fillRect(20, 64, 360, 316);
      g.strokeStyle = "#FFFFFF";
      g.lineWidth = 10;
      g.beginPath();
      g.moveTo(40, 340);
      g.lineTo(150, 250);
      g.lineTo(140, 140);
      g.lineTo(330, 100);
      g.stroke();
      g.strokeStyle = P.purple;
      g.lineWidth = 5;
      g.setLineDash([12, 8]);
      g.stroke();
      g.setLineDash([]);
      [[40, 340], [330, 100]].forEach(([x, y]) => {
        g.fillStyle = P.purple;
        g.beginPath();
        g.arc(x, y, 10, 0, Math.PI * 2);
        g.fill();
      });
      ["Jemput · Jl. Ijen 12", "Antar · Jl. Soekarno 3", "Antar · Perum Asri B4"].forEach((t, i) => {
        roundRect(g, 400, 64 + i * 70, 220, 58, 10);
        g.fillStyle = i === 0 ? P.lav : P.surf;
        g.fill();
        g.fillStyle = P.ink;
        g.fillText(t, 412, 98 + i * 70);
      });
    } else if (kind === "wa") {
      g.fillStyle = "#F4F4F6";
      g.fillRect(0, 44, w, h - 44);
      const msgs = ["Halo Kak, cucian Anda sudah kami terima.", "Cucian sudah selesai dan siap diantar.", "Kurir sedang menuju alamat Anda."];
      msgs.forEach((m, i) => {
        roundRect(g, 24, 70 + i * 100, 470, 76, 12);
        g.fillStyle = "#FFFFFF";
        g.fill();
        g.fillStyle = P.ink;
        g.fillText(m, 42, 112 + i * 100);
        g.fillStyle = P.sub;
        g.font = "400 13px 'Red Hat Text', sans-serif";
        g.fillText(["09.12", "15.40", "16.05"][i] + "  ✓✓", 420, 136 + i * 100);
        g.font = "500 16px 'Red Hat Text', sans-serif";
      });
    } else {
      ["Penjualan", "Pengeluaran", "Laba"].forEach((k, i) => {
        roundRect(g, 20 + i * 205, 60, 190, 80, 10);
        g.fillStyle = P.surf;
        g.fill();
        g.fillStyle = P.sub;
        g.fillText(k, 34 + i * 205, 88);
        g.fillStyle = P.ink;
        g.font = "700 24px 'Red Hat Text', sans-serif";
        g.fillText(["Rp48,2jt", "Rp19,6jt", "Rp28,6jt"][i], 34 + i * 205, 124);
        g.font = "500 16px 'Red Hat Text', sans-serif";
      });
      const bars = [0.35, 0.5, 0.42, 0.6, 0.55, 0.72, 0.68, 0.85];
      bars.forEach((b, i) => {
        g.fillStyle = i === bars.length - 1 ? P.purple : P.lav2;
        const bh = b * 200;
        roundRect(g, 40 + i * 72, 370 - bh, 44, bh, 6);
        g.fill();
      });
    }
  });
}

/** A screen surface (w×h world units) showing a real screenshot or its mock. */
export function ScreenPanel({ kind, width, height }: { kind: ScreenKind; width: number; height: number }) {
  const material = useMemo(() => {
    const m = new MeshBasicMaterial({ toneMapped: false });
    if (SCREENS_READY) {
      new TextureLoader().load(SRC[kind], (t) => {
        t.colorSpace = SRGBColorSpace;
        m.map = t;
        m.needsUpdate = true;
      });
    } else {
      m.map = drawMock(kind);
    }
    return m;
  }, [kind]);
  useEffect(() => () => material.dispose(), [material]);

  return (
    <mesh material={material}>
      <planeGeometry args={[width, height]} />
    </mesh>
  );
}
