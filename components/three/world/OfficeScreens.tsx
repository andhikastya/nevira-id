"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MeshBasicMaterial, type CanvasTexture } from "three";
import { featureStation } from "../stations";
import { appScreen, damp, inFocus, line, text } from "./kit";

/**
 * Screens that take over the office desk monitor on specific feature-page stations.
 * Each is a canvas mock of the real back-office view the copy talks about.
 */
const P = { purple: "#5B369E", lav: "#C3AEE7", green: "#277547", greenBg: "#EAFFF0", sub: "#818898", line: "#E6E7EA" };

function jadwal() {
  return appScreen("Jadwal kurir · hari ini", (c, w) => {
    const rows = [
      ["Kurir 1", "08.00", "Jemput", "3 order"],
      ["Kurir 1", "10.30", "Antar", "2 order"],
      ["Kurir 2", "09.00", "Antar", "4 order"],
      ["Kurir 2", "13.00", "Jemput", "1 order"],
      ["—", "—", "Tanpa jadwal", "2 order"],
    ];
    ["Kurir", "Jam", "Tugas", "Isi"].forEach((h, i) => text(c, h, 24 + i * 150, 78, { size: 15, weight: 700, color: P.sub }));
    rows.forEach((r, j) => {
      const y = 112 + j * 52;
      line(c, 16, y + 16, w - 32, P.line, 1);
      r.forEach((v, i) => text(c, v, 24 + i * 150, y, { size: 18, weight: i === 0 ? 700 : 500, color: v === "Tanpa jadwal" ? P.purple : "#32363E" }));
    });
  });
}

function penjualan() {
  return appScreen("Laporan penjualan", (c, w, h) => {
    text(c, "Penjualan bulan ini", 24, 80, { size: 15, color: P.sub });
    text(c, "Rp48,6 jt", 24, 118, { size: 34, weight: 700 });
    text(c, "▲ 12% dari bulan lalu", 24, 146, { size: 15, weight: 600, color: P.green });
    const bars = [0.35, 0.5, 0.42, 0.62, 0.55, 0.78, 0.92];
    bars.forEach((v, i) => {
      const bh = v * 170;
      c.fillStyle = i === bars.length - 1 ? P.purple : P.lav;
      c.fillRect(300 + i * 44, h - 40 - bh, 30, bh);
    });
    line(c, 290, h - 38, w - 310, P.line, 2);
  });
}

function bukuBesar() {
  return appScreen("Buku besar · Neraca", (c, w) => {
    ["Akun", "Debit", "Kredit"].forEach((hd, i) => text(c, hd, i === 0 ? 24 : 330 + (i - 1) * 150, 78, { size: 15, weight: 700, color: P.sub }));
    const rows = [
      ["Kas", "12.400.000", ""],
      ["Piutang usaha", "3.150.000", ""],
      ["Pendapatan jasa", "", "14.900.000"],
      ["Beban operasional", "2.250.000", ""],
      ["Modal", "", "2.900.000"],
    ];
    rows.forEach((r, j) => {
      const y = 114 + j * 48;
      line(c, 16, y + 16, w - 32, P.line, 1);
      text(c, r[0], 24, y, { size: 18, weight: 600 });
      text(c, r[1], 330, y, { size: 18 });
      text(c, r[2], 480, y, { size: 18 });
    });
    text(c, "Seimbang ✓", 24, 372, { size: 16, weight: 700, color: P.green });
  });
}

function rekap() {
  return appScreen("Rekap kehadiran · minggu ini", (c) => {
    const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    days.forEach((d, i) => text(c, d, 220 + i * 66, 80, { size: 15, weight: 700, color: P.sub, align: "center" }));
    const staff = ["Kasir 1", "Kasir 2", "Produksi 1", "Produksi 2", "Kurir 1"];
    staff.forEach((s, j) => {
      const y = 118 + j * 52;
      text(c, s, 24, y + 6, { size: 18, weight: 600 });
      days.forEach((_, i) => {
        const late = (i + j) % 7 === 3;
        c.fillStyle = late ? "#FCE8EC" : P.greenBg;
        c.beginPath();
        c.arc(220 + i * 66, y, 15, 0, Math.PI * 2);
        c.fill();
        text(c, late ? "!" : "✓", 220 + i * 66, y + 6, { size: 16, weight: 700, color: late ? "#DF1C41" : P.green, align: "center" });
      });
    });
  });
}

function laporanSs() {
  return appScreen("Self-service · laporan & dana", (c, w) => {
    text(c, "Pendapatan mesin (bulan ini)", 24, 80, { size: 15, color: P.sub });
    text(c, "Rp9,2 jt", 24, 118, { size: 34, weight: 700 });
    const rows = [
      ["Mesin 1", "142 sesi"],
      ["Mesin 2", "128 sesi"],
      ["Mesin 3", "Maintenance"],
      ["Mesin 4", "151 sesi"],
    ];
    rows.forEach((r, j) => {
      const y = 170 + j * 40;
      line(c, 16, y + 14, 300, P.line, 1);
      text(c, r[0], 24, y, { size: 17, weight: 600 });
      text(c, r[1], 300, y, { size: 17, color: r[1] === "Maintenance" ? "#A47A06" : "#32363E", align: "right" });
    });
    c.fillStyle = P.purple;
    c.beginPath();
    c.roundRect(360, 300, w - 384, 60, 12);
    c.fill();
    text(c, "Tarik dana ke rekening", 360 + (w - 384) / 2, 337, { size: 18, weight: 700, color: "#FFFFFF", align: "center" });
  });
}

function karyawan() {
  return appScreen("Karyawan · level akses", (c, w) => {
    const rows = [
      ["Sari", "Kasir"],
      ["Budi", "Produksi"],
      ["Andi", "Kurir"],
      ["Rina", "Kasir"],
    ];
    ["Nama", "Level akses"].forEach((h, i) => text(c, h, i === 0 ? 24 : 300, 78, { size: 15, weight: 700, color: P.sub }));
    rows.forEach((r, j) => {
      const y = 114 + j * 46;
      line(c, 16, y + 16, w - 32, P.line, 1);
      text(c, r[0], 24, y, { size: 18, weight: 600 });
      c.fillStyle = "#EBE5F6";
      c.beginPath();
      c.roundRect(296, y - 22, 120, 32, 16);
      c.fill();
      text(c, r[1], 356, y - 1, { size: 16, weight: 600, color: P.purple, align: "center" });
    });
    c.fillStyle = P.purple;
    c.beginPath();
    c.roundRect(24, 320, 190, 48, 12);
    c.fill();
    text(c, "+ Tambah karyawan", 119, 351, { size: 16, weight: 700, color: "#FFFFFF", align: "center" });
  });
}

const SCREENS: [string, () => CanvasTexture][] = [
  [featureStation("antar-jemput", 1), jadwal],
  [featureStation("back-office", 1), penjualan],
  [featureStation("back-office", 2), bukuBesar],
  [featureStation("karyawan-absensi", 2), rekap],
  [featureStation("karyawan-absensi", 3), karyawan],
  [featureStation("self-service", 3), laporanSs],
];

/** Overlays the desk monitor (same transform as the admin ScreenPanel). */
export function OfficeScreens({ width, height }: { width: number; height: number }) {
  const mats = useMemo(
    () => SCREENS.map(([, make]) => new MeshBasicMaterial({ toneMapped: false, transparent: true, opacity: 0, map: make() })),
    [],
  );
  const k = useRef(SCREENS.map(() => 0));
  useFrame((_, dt) => {
    SCREENS.forEach(([station], i) => {
      k.current[i] = damp(k.current[i], inFocus(station) ? 1 : 0, dt, 4);
      mats[i].opacity = k.current[i];
      mats[i].visible = k.current[i] > 0.01;
    });
  });
  return (
    <group position={[0, 0, 0.004]}>
      {mats.map((m, i) => (
        <mesh key={i} material={m} position={[0, 0, i * 0.0005]}>
          <planeGeometry args={[width, height]} />
        </mesh>
      ))}
    </group>
  );
}
