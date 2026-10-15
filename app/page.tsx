import { Connected } from "@/components/sections/Connected";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Nav } from "@/components/sections/Nav";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { Proof } from "@/components/sections/Proof";
import { Turn } from "@/components/sections/Turn";
import { ScrollDriver } from "@/components/ScrollDriver";
import { SceneRoot } from "@/components/three/SceneRoot";

export default function Home() {
  return (
    <>
      {/* Hero shine stage — the only gradient on the page; sits behind the 3D canvas. */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-[radial-gradient(120%_80%_at_75%_30%,#EBE5F6_0%,#F6F3FB_40%,#FFFFFF_75%)]"
      />
      {/* Dusk sky for the Proof → CTA stretch; opacity driven by the 3D scene (--dusk). */}
      <div
        aria-hidden
        className="fixed inset-0 -z-[9] bg-[linear-gradient(180deg,#2B194D_0%,#5B369E_45%,#C3AEE7_80%,#EBE5F6_100%)] opacity-[var(--dusk,0)]"
      />
      <SceneRoot />
      <ScrollDriver />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Turn />
        <Journey />
        <Connected />
        <Pricing />
        <Proof />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
