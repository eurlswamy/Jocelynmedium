import { FrameLoader } from "@/components/hero/FrameLoader";
import { HeroParallax } from "@/components/hero/HeroParallax";
import { Methodes } from "@/components/sections/Methodes";
import { AntiCliches } from "@/components/sections/AntiCliches";
import { Discretion } from "@/components/sections/Discretion";
import { Medias } from "@/components/sections/Medias";
import { FAQ } from "@/components/sections/FAQ";
import { Seuil } from "@/components/sections/Seuil";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <FrameLoader />
      <main className="bg-ivoire">
        <HeroParallax />
        <Methodes />
        <AntiCliches />
        <Discretion />
        <Medias />
        <FAQ />
        <Seuil />
        <Footer />
      </main>
    </>
  );
}
