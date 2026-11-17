"use client";

import { Billboard, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { AdditiveBlending, MeshBasicMaterial, type Group, type Sprite } from "three";
import { PLACES, localPoint, type Place } from "../layout";
import { canvasTexture, glowTexture } from "../materials";
import { live } from "../runtime";
import { featureStation } from "../stations";
import { NAVIGATE_EVENT } from "@/lib/events";
import { InfoBubble, damp, usePage, type V3 } from "./kit";

const MAP_STATION = "fitur-map";

type Pin = { label: string; href: string; icon: string; place: Place; local: V3 };

const PINS: Pin[] = [
  { label: "Kasir & POS Tablet", href: "/fitur/kasir-pos", icon: "ri-store-2-line", place: PLACES.shop, local: [0.6, 3.9, 0.4] },
  { label: "Karyawan & Absensi", href: "/fitur/karyawan-absensi", icon: "ri-fingerprint-line", place: PLACES.shop, local: [-1.75, 2.2, 2.2] },
  { label: "Produksi", href: "/fitur/produksi", icon: "ri-t-shirt-air-line", place: PLACES.workshop, local: [0, 3.3, 0] },
  { label: "Antar-Jemput", href: "/fitur/antar-jemput", icon: "ri-e-bike-2-line", place: PLACES.home, local: [-0.3, 3.6, 1.2] },
  { label: "Aplikasi Owner", href: "/fitur/aplikasi-owner", icon: "ri-smartphone-line", place: PLACES.office, local: [0.3, 2.3, 2.5] },
  { label: "Back Office & Laporan", href: "/fitur/back-office", icon: "ri-dashboard-line", place: PLACES.office, local: [-0.2, 4.9, -0.4] },
  { label: "Self-Service", href: "/fitur/self-service", icon: "ri-shirt-line", place: PLACES.selfService, local: [0, 3.9, 0] },
];

/** Overlay element (app/layout.tsx) the pins render into, so they sit above the page content. */
const overlay = () => ({ current: document.getElementById("scene-overlay") as HTMLElement });

/** /fitur hero: every building gets a clickable pin; hovering one lights the building. */
function FeatureMap() {
  const portal = useMemo(() => overlay(), []);
  const wrap = useRef<HTMLDivElement[]>([]);
  const glow = useRef<Sprite>(null);
  const [hover, setHover] = useState<number | null>(null);
  const k = useRef(0);
  useFrame((_, dt) => {
    k.current = damp(k.current, live.focus === MAP_STATION ? 1 : 0, dt, 6);
    for (const el of wrap.current) {
      if (!el) continue;
      el.style.opacity = k.current.toFixed(3);
      el.style.pointerEvents = k.current > 0.6 ? "auto" : "none";
    }
    if (glow.current) {
      glow.current.visible = hover !== null && k.current > 0.5;
      if (hover !== null) {
        const p = localPoint(PINS[hover].place, [PINS[hover].local[0], 1.4, PINS[hover].local[2]]);
        glow.current.position.set(...p);
      }
    }
  });
  return (
    <group>
      <sprite ref={glow} scale={[6, 6, 1]} visible={false}>
        <spriteMaterial map={glowTexture()} color="#C3AEE7" transparent opacity={0.9} depthWrite={false} blending={AdditiveBlending} />
      </sprite>
      {PINS.map((p, i) => (
        <Html key={p.href} position={localPoint(p.place, p.local)} center portal={portal} zIndexRange={[40, 30]}>
          <div
            ref={(el) => {
              if (el) wrap.current[i] = el;
            }}
            style={{ opacity: 0, pointerEvents: "none" }}
            // Phone width: the labels would cover the hero copy; the feature list below has the same links.
            className="max-md:hidden"
          >
            <a
              href={p.href}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover((h) => (h === i ? null : h))}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, { detail: p.href }));
              }}
              className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-background/95 py-1.5 pr-3 pl-1.5 text-[13px] font-semibold text-text-1 shadow-2 transition-transform hover:-translate-y-0.5 hover:text-accent"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-accent text-white">
                <i className={`${p.icon} text-[14px] leading-none`} aria-hidden />
              </span>
              {p.label}
            </a>
          </div>
        </Html>
      ))}
    </group>
  );
}

/** /bantuan hero: question marks drifting around the hub tower (the town's "info tower"). */
function InfoMarks() {
  const g = useRef<Group>(null);
  const k = useRef(0);
  const mat = useMemo(
    () =>
      new MeshBasicMaterial({
        toneMapped: false,
        transparent: true,
        map: canvasTexture(128, 128, (c, w, h) => {
          c.fillStyle = "#FFFFFF";
          c.beginPath();
          c.arc(w / 2, h / 2, 56, 0, Math.PI * 2);
          c.fill();
          c.fillStyle = "#5B369E";
          c.font = "800 80px 'Red Hat Text', sans-serif";
          c.textAlign = "center";
          c.textBaseline = "middle";
          c.fillText("?", w / 2, h / 2 + 4);
        }),
      }),
    [],
  );
  useFrame((_, dt) => {
    k.current = damp(k.current, live.focus === "bantuan" ? 1 : 0, dt, 3);
    if (!g.current) return;
    g.current.rotation.y = live.time * 0.25;
    g.current.scale.setScalar(Math.max(0.0001, k.current));
    g.current.children.forEach((c, i) => {
      c.position.y = 3.3 + i * 0.45 + Math.sin(live.time * 1.4 + i) * 0.15;
    });
  });
  return (
    <group ref={g}>
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <group key={i} position={[Math.cos(a) * 1.7, 3.3, Math.sin(a) * 1.7]}>
            <Billboard>
              <mesh material={mat}>
                <planeGeometry args={[0.6, 0.6]} />
              </mesh>
            </Billboard>
          </group>
        );
      })}
    </group>
  );
}

/** /fitur/back-office station 3: outlets on the town map. */
function OutletPins() {
  const st = featureStation("back-office", 3);
  const spots: [string, string, Place][] = [
    ["Outlet 1 · Kiloan", "Kasir, produksi, kurir", PLACES.shop],
    ["Outlet 2 · Ruang cuci", "Produksi terpusat", PLACES.workshop],
    ["Outlet 3 · Self-service", "Mesin & langganan", PLACES.selfService],
  ];
  return (
    <group>
      {spots.map(([t, s, p]) => (
        <InfoBubble key={t} stations={st} at={localPoint(p, [0, 4.6, 0])} size={2.6} icon="⌂" title={t} sub={s} />
      ))}
    </group>
  );
}

/** Page-level pieces that aren't tied to one building. */
export function PagePieces() {
  const mapPage = usePage(MAP_STATION);
  const helpPage = usePage("bantuan");
  const backOffice = usePage(featureStation("back-office", 0));
  return (
    <group>
      {mapPage && <FeatureMap />}
      {helpPage && <InfoMarks />}
      {backOffice && <OutletPins />}
    </group>
  );
}

