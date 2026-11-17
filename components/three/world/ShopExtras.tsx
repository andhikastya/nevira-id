"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils, MeshBasicMaterial, type Group } from "three";
import { M, canvasTexture } from "../materials";
import { featureStation } from "../stations";
import { InfoBubble, damp, inFocus } from "./kit";
import { Courier, Person } from "./Person";
import { Vespa } from "./Van";
import { Box, Cyl } from "./parts";

// Shop-local coordinates (see Shop.tsx): counter top ≈ y 1.15 at z 0.55, facade at z ≈ 1.6.

const ABS = {
  hero: featureStation("karyawan-absensi", 0),
  s1: featureStation("karyawan-absensi", 1),
};
const ANTAR_S2 = featureStation("antar-jemput", 2);

const DEVICE: [number, number, number] = [-1.75, 0.16, 2.2];

/** Attendance terminal by the shop door (always part of the town). */
export function AttendanceDevice() {
  const screen = useMemo(
    () =>
      new MeshBasicMaterial({
        toneMapped: false,
        map: canvasTexture(160, 200, (c, w, h) => {
          c.fillStyle = "#FFFFFF";
          c.fillRect(0, 0, w, h);
          c.fillStyle = "#5B369E";
          c.fillRect(0, 0, w, 36);
          c.fillStyle = "#FFFFFF";
          c.font = "700 18px 'Red Hat Text', sans-serif";
          c.textAlign = "center";
          c.fillText("Absen", w / 2, 25);
          // QR code to scan with the staff app
          c.fillStyle = "#32363E";
          for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) if ((x * 5 + y * 11 + x * y) % 3 === 0) c.fillRect(44 + x * 9, 52 + y * 9, 8, 8);
          c.fillRect(44, 52, 22, 22);
          c.fillRect(100, 52, 22, 22);
          c.fillRect(44, 108, 22, 22);
          c.fillStyle = "#32363E";
          c.font = "600 16px 'Red Hat Text', sans-serif";
          c.fillText("07.58", w / 2, 172);
        }),
      }),
    [],
  );
  return (
    <group position={DEVICE} rotation={[0, 0.25, 0]}>
      <Cyl r={0.05} h={1.15} at={[0, 0.58, 0]} material={M.ink} seg={8} />
      <Box size={[0.34, 0.42, 0.1]} at={[0, 1.36, 0]} material={M.ink} />
      <mesh position={[0, 1.33, 0.052]} material={screen}>
        <planeGeometry args={[0.28, 0.34]} />
      </mesh>
    </group>
  );
}

/** /fitur/karyawan-absensi station 1: staff checking in at the shop door (the later stations are office screens). */
export function AbsensiScene() {
  return (
    <group>
      {/* staff #1 scanning the terminal QR with a phone, #2 waiting */}
      <group position={[DEVICE[0] + 0.05, 0.16, DEVICE[2] + 0.62]} rotation={[0, Math.PI + 0.25, 0]} scale={1.5}>
        <Person shirt={M.purpleSoft} hair={M.ink} pose="phone" />
      </group>
      <group position={[DEVICE[0] + 0.55, 0.16, DEVICE[2] + 1.35]} rotation={[0, Math.PI + 0.5, 0]} scale={1.5}>
        <Person shirt={M.purpleSoft} hair={M.timber} pose="stand" />
      </group>
      <InfoBubble stations={[ABS.hero, ABS.s1]} at={[DEVICE[0] + 0.2, 2.35, DEVICE[2] + 0.4]} icon="✓" tone="green" title="Check-in 07.58" sub="Lokasi GPS ✓ · Scan QR ✓" />

    </group>
  );
}

/** /fitur/antar-jemput station 2: three orders handed to one courier at the shop front. */
export function AntarShopScene() {
  const boxes = useRef<(Group | null)[]>([]);
  const k = useRef(0);
  useFrame((_, dt) => {
    k.current = damp(k.current, inFocus(ANTAR_S2) ? 1 : 0, dt, 1.1);
    boxes.current.forEach((g, i) => {
      if (!g) return;
      const t = MathUtils.smoothstep(k.current, 0.05 + i * 0.25, 0.35 + i * 0.25);
      // from the counter to a stack beside the parked vespa
      g.position.set(MathUtils.lerp(0.6, 1.55, t), MathUtils.lerp(1.3, 0.3 + i * 0.25, t) + Math.sin(t * Math.PI) * 0.5, MathUtils.lerp(0.6, 2.55, t));
      g.visible = t > 0.01;
    });
  });
  return (
    <group>
      <group position={[2.15, 0.16, 3.0]} rotation={[0, -Math.PI / 2, 0]} scale={1.35}>
        <Vespa />
      </group>
      <group position={[1.2, 0.16, 2.75]} rotation={[0, Math.PI / 2 + 0.3, 0]} scale={1.55}>
        <Courier pose="hold" />
      </group>
      {[0, 1, 2].map((i) => (
        <group
          key={i}
          ref={(el) => {
            boxes.current[i] = el;
          }}
          visible={false}
        >
          <RoundedBox args={[0.42, 0.24, 0.34]} radius={0.03} smoothness={2} material={M.purpleSoft} castShadow />
          <RoundedBox args={[0.43, 0.05, 0.35]} radius={0.015} smoothness={2} position={[0, 0.1, 0]} material={M.purpleLightSoft} />
        </group>
      ))}
      <InfoBubble stations={ANTAR_S2} at={[1.4, 2.35, 2.6]} icon="➜" title="3 order → Kurir 1" sub="Ditugaskan sekaligus, jadwal bisa diubah" />
    </group>
  );
}
