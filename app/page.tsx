import { Clients } from "@/components/sections/Clients";
import { Connected } from "@/components/sections/Connected";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Needs } from "@/components/sections/Needs";
import { Peran } from "@/components/sections/Peran";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { Proof } from "@/components/sections/Proof";
import { Turn } from "@/components/sections/Turn";
import { Usp } from "@/components/sections/Usp";

// Backdrops, 3D scene, scroll driver, nav and footer live in app/layout.tsx.
export default function Home() {
  return (
    <main>
      <Hero />
      <Needs />
      <Problem />
      <Turn />
      <Journey />
      <Peran />
      <Connected />
      <Usp />
      <Pricing />
      <Proof />
      <Clients />
      <Faq />
      <FinalCta />
    </main>
  );
}
