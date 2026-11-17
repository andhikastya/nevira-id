"use client";

import { Billboard, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { MathUtils, MeshBasicMaterial, PlaneGeometry, type Group } from "three";
import { featureStation } from "../stations";
import { M, canvasTexture, roundRect } from "../materials";
import { live } from "../runtime";
import { Person, type PoseName } from "./Person";
import { tooltipsHidden } from "./kit";
import { Box } from "./parts";

/**
 * Set piece for /fitur/kasir-pos, mounted inside the Shop group (shop-local coordinates:
 * counter top ≈ y 1.15 at z 0.55, facade at z ≈ 1.6). Each station gets its own moment:
 *   hero — morning, a customer walks in;  1 — basket on the scale, weight read-out;
 *   2 — payment: QRIS stand + customer's phone;  3 — a receipt rolls out of the printer.
 */
const ST = {
  hero: featureStation("kasir-pos", 0),
  s1: featureStation("kasir-pos", 1),
  s2: featureStation("kasir-pos", 2),
  s3: featureStation("kasir-pos", 3),
};

/** People read as toys at world scale; inside the shop they stand at counter height. */
const CASHIER_SCALE = 1.6;
const CUSTOMER_SCALE = 1.75;
/** Where the customer stands: left end of the counter, side-on. */
const CUSTOMER_AT: [number, number, number] = [-1.08, 0.16, 0.95];

const damp = (cur: number, goal: number, dt: number, rate = 3) => MathUtils.lerp(cur, goal, 1 - Math.exp(-dt * rate));

function bubbleMaterial(title: string, sub: string, icon: string, tint: string, ink: string) {
  return new MeshBasicMaterial({
    toneMapped: false,
    transparent: true,
    map: canvasTexture(640, 220, (c, w, h) => {
      c.shadowColor = "rgba(13,13,18,0.18)";
      c.shadowBlur = 24;
      c.shadowOffsetY = 6;
      roundRect(c, 20, 16, w - 40, h - 60, 28);
      c.fillStyle = "#FFFFFF";
      c.fill();
      c.shadowColor = "transparent";
      c.beginPath();
      c.moveTo(w / 2 - 22, h - 46);
      c.lineTo(w / 2, h - 12);
      c.lineTo(w / 2 + 22, h - 46);
      c.fill();
      c.fillStyle = tint;
      c.beginPath();
      c.arc(80, 82, 30, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = ink;
      c.font = "700 30px 'Red Hat Text', sans-serif";
      c.textAlign = "center";
      c.fillText(icon, 80, 93);
      c.textAlign = "left";
      c.fillStyle = "#32363E";
      c.font = "700 30px 'Red Hat Text', sans-serif";
      c.fillText(title, 130, 70);
      c.fillStyle = "#4C515D";
      c.font = "500 26px 'Red Hat Text', sans-serif";
      c.fillText(sub, 130, 112);
    }),
  });
}

/** Floating card above the counter, shown only while its station is in focus. */
function Bubble({
  station,
  at,
  title,
  sub,
  icon,
  tint = "#EBE5F6",
  ink = "#5B369E",
}: {
  station: string;
  at: [number, number, number];
  title: string;
  sub: string;
  icon: string;
  tint?: string;
  ink?: string;
}) {
  const g = useRef<Group>(null);
  const s = useRef(0);
  const material = useMemo(() => bubbleMaterial(title, sub, icon, tint, ink), [title, sub, icon, tint, ink]);
  useFrame(({ size }, dt) => {
    s.current = damp(s.current, live.focus === station && !tooltipsHidden(size.width) ? 1 : 0, dt, 5);
    if (g.current) {
      g.current.scale.setScalar(Math.max(0.0001, s.current));
      g.current.position.y = at[1] + Math.sin(live.time * 1.6) * 0.04;
    }
  });
  return (
    <group ref={g} position={at}>
      <Billboard>
        <mesh material={material}>
          <planeGeometry args={[1.3, 0.45]} />
        </mesh>
      </Billboard>
    </group>
  );
}

/** Digital read-out on the scale under the basket. */
function ScaleDisplay() {
  const g = useRef<Group>(null);
  const k = useRef(0);
  const material = useMemo(
    () =>
      new MeshBasicMaterial({
        toneMapped: false,
        map: canvasTexture(256, 96, (c, w, h) => {
          roundRect(c, 4, 4, w - 8, h - 8, 14);
          c.fillStyle = "#2B194D";
          c.fill();
          c.fillStyle = "#EAFFF0";
          c.font = "700 54px 'Red Hat Text', sans-serif";
          c.textAlign = "center";
          c.textBaseline = "middle";
          c.fillText("3,2 kg", w / 2, h / 2 + 3);
        }),
      }),
    [],
  );
  useFrame((_, dt) => {
    k.current = damp(k.current, live.focus === ST.s1 ? 1 : 0.0001, dt, 6);
    if (g.current) g.current.scale.setScalar(k.current);
  });
  return (
    // read-out on the front face of the counter, below the scale, facing the customer
    <group ref={g} position={[-0.25, 0.94, 0.862]}>
      <mesh material={material}>
        <planeGeometry args={[0.32, 0.12]} />
      </mesh>
    </group>
  );
}

/** QRIS stand on the counter + the customer's phone tapping toward it (station 2: payment). */
function Payment() {
  const phone = useRef<Group>(null);
  const stand = useRef<Group>(null);
  const k = useRef(0);
  const qr = useMemo(
    () =>
      new MeshBasicMaterial({
        toneMapped: false,
        map: canvasTexture(128, 160, (c, w, h) => {
          c.fillStyle = "#FFFFFF";
          c.fillRect(0, 0, w, h);
          c.fillStyle = "#5B369E";
          c.fillRect(0, 0, w, 30);
          c.fillStyle = "#FFFFFF";
          c.font = "700 18px 'Red Hat Text', sans-serif";
          c.textAlign = "center";
          c.fillText("QRIS", w / 2, 22);
          c.fillStyle = "#32363E";
          // deterministic pseudo-QR pattern
          for (let y = 0; y < 9; y++) for (let x = 0; x < 9; x++) if ((x * 7 + y * 13 + x * y) % 3 === 0) c.fillRect(19 + x * 10, 44 + y * 10, 9, 9);
          c.fillRect(19, 44, 26, 26);
          c.fillRect(83, 44, 26, 26);
          c.fillRect(19, 108, 26, 26);
        }),
      }),
    [],
  );
  useFrame((_, dt) => {
    k.current = damp(k.current, live.focus === ST.s2 ? 1 : 0, dt, 1.8);
    const t = MathUtils.smoothstep(k.current, 0.1, 0.9);
    if (stand.current) stand.current.scale.setScalar(Math.max(0.0001, MathUtils.smoothstep(k.current, 0, 0.3)));
    if (phone.current) {
      // from the customer's hand toward the QR stand, then hovers to "scan"
      phone.current.position.set(MathUtils.lerp(-0.78, -0.02, t), MathUtils.lerp(1.12, 1.3, t) + Math.sin(live.time * 3) * 0.01 * t, MathUtils.lerp(1.05, 0.92, t));
      phone.current.rotation.set(0.2, MathUtils.lerp(0.6, Math.PI, t), 0);
      phone.current.visible = k.current > 0.02;
    }
  });
  return (
    <group>
      <group ref={stand} position={[0.0, 1.15, 0.78]}>
        <Box size={[0.26, 0.3, 0.03]} at={[0, 0.17, 0]} material={M.ink} />
        <mesh position={[0, 0.17, 0.017]} material={qr}>
          <planeGeometry args={[0.22, 0.27]} />
        </mesh>
      </group>
      <group ref={phone}>
        <RoundedBox args={[0.09, 0.17, 0.016]} radius={0.01} smoothness={2} material={M.ink} />
      </group>
    </group>
  );
}

/** Thermal receipt rolling out of the printer slot. */
function Receipt() {
  const g = useRef<Group>(null);
  const k = useRef(0);
  const LEN = 0.46;
  const geometry = useMemo(() => new PlaneGeometry(0.15, LEN).translate(0, LEN / 2, 0), []);
  const material = useMemo(
    () =>
      new MeshBasicMaterial({
        toneMapped: false,
        side: 2,
        map: canvasTexture(150, 460, (c, w, h) => {
          c.fillStyle = "#FFFFFF";
          c.fillRect(0, 0, w, h);
          c.fillStyle = "#32363E";
          c.textAlign = "center";
          c.font = "700 20px 'Red Hat Text', sans-serif";
          c.fillText("NEVIRA", w / 2, 40);
          c.font = "500 13px 'Red Hat Text', sans-serif";
          c.fillText("Order #0412", w / 2, 64);
          c.fillStyle = "#B3B7C1";
          for (let i = 0; i < 6; i++) c.fillRect(16, 96 + i * 34, i % 2 ? 70 : 100, 8);
          c.fillRect(16, 316, w - 32, 2);
          c.fillStyle = "#32363E";
          c.font = "700 16px 'Red Hat Text', sans-serif";
          c.fillText("TOTAL", w / 2, 350);
          c.fillStyle = "#B3B7C1";
          for (let x = 18; x < w - 18; x += 6) c.fillRect(x, 390, x % 4 ? 2 : 4, 44);
        }),
      }),
    [],
  );
  useFrame((_, dt) => {
    // Unrolls while station 3 is in focus; tucks back in when you scroll away.
    k.current = damp(k.current, live.focus === ST.s3 ? 1 : 0, dt, 1.2);
    if (g.current) {
      g.current.scale.set(1, Math.max(0.0001, k.current), 1);
      g.current.rotation.x = -0.25 - k.current * 0.35; // curls toward the customer as it grows
    }
  });
  return (
    <group position={[1.45, 1.29, 0.6]}>
      <group ref={g}>
        <mesh geometry={geometry} material={material} />
      </group>
    </group>
  );
}

/** Customer pose per station: stands at the counter, pays with a phone, takes the receipt. */
function customerPose(): PoseName {
  if (live.focus === ST.s2) return "phone";
  if (live.focus === ST.s3) return "hold";
  return "stand";
}

/**
 * Cashier behind the counter (turned toward the POS screen) and a customer who walks in,
 * then stands side-on at the end of the counter so the camera sees them in profile, not from behind.
 */
function People() {
  const customer = useRef<Group>(null);
  const k = useRef(0);
  const [pose, setPose] = useState<PoseName>("stand");
  useFrame((_, dt) => {
    const atCounter = live.focus === ST.s1 || live.focus === ST.s2 || live.focus === ST.s3;
    k.current = damp(k.current, atCounter ? 1 : 0, dt, 1.4);
    const t = k.current;
    if (customer.current) {
      // door (facing in) → end of the counter (facing along it)
      customer.current.position.set(MathUtils.lerp(-0.5, CUSTOMER_AT[0], t), 0.16, MathUtils.lerp(2.9, CUSTOMER_AT[2], t));
      customer.current.rotation.y = MathUtils.lerp(Math.PI, Math.PI / 2, MathUtils.smoothstep(t, 0.6, 1));
      const walking = Math.abs((atCounter ? 1 : 0) - t) > 0.05;
      customer.current.position.y += walking ? Math.abs(Math.sin(live.time * 7)) * 0.03 : 0;
    }
    const next = customerPose();
    if (next !== pose) setPose(next);
  });
  return (
    <group>
      {/* cashier on a raised step behind the counter, turned toward the POS screen */}
      <group position={[0.3, 0.36, -0.08]} rotation={[0, -0.35, 0]} scale={CASHIER_SCALE}>
        <Person shirt={M.purpleSoft} hair={M.ink} pose="hold" />
      </group>
      <group ref={customer} position={[-0.5, 0.16, 2.9]} rotation={[0, Math.PI, 0]} scale={CUSTOMER_SCALE}>
        <Person shirt={M.mint} hair={M.timber} pose={pose} />
      </group>
    </group>
  );
}

export function KasirScene() {
  return (
    <group>
      <People />
      <ScaleDisplay />
      <Payment />
      <Receipt />
      <Bubble station={ST.s1} at={[0.2, 2.0, 0.95]} icon="⚖" title="Cuci setrika · Express" sub="Harga bertingkat · 3,2 kg" />
      <Bubble station={ST.s2} at={[0.35, 1.95, 1.15]} icon="✓" tint="#EAFFF0" ink="#277547" title="Lunas · QRIS Rp28.800" sub="Tunai · QRIS · EDC · transfer · nanti" />
      <Bubble station={ST.s3} at={[1.05, 1.9, 1.05]} icon="✓" tint="#EAFFF0" ink="#277547" title="Struk tercetak" sub="Juga bisa dikirim ke WhatsApp" />
    </group>
  );
}
