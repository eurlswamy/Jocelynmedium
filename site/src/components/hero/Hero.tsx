"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoDesktopRef = useRef<HTMLVideoElement>(null);
  const videoMobileRef = useRef<HTMLVideoElement>(null);

  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // ═══ Scroll-scrubbing : la vidéo joue au rythme du scroll ═══
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // 0..0.85 du scroll mappé sur 0..duration de la vidéo
      // Les derniers 0.85..1 sont gardés pour le fade out vers la section suivante
      const t = Math.min(latest / 0.85, 1);

      [videoDesktopRef.current, videoMobileRef.current].forEach((video) => {
        if (video && video.duration && !isNaN(video.duration)) {
          video.currentTime = t * video.duration;
        }
      });
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Marque la vidéo prête quand elle est suffisamment chargée
  useEffect(() => {
    const handleReady = () => setVideoReady(true);
    const desktop = videoDesktopRef.current;
    const mobile = videoMobileRef.current;

    desktop?.addEventListener("loadeddata", handleReady);
    mobile?.addEventListener("loadeddata", handleReady);
    return () => {
      desktop?.removeEventListener("loadeddata", handleReady);
      mobile?.removeEventListener("loadeddata", handleReady);
    };
  }, []);

  // Fade out du contenu hero (texte + CTA) au début du scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  // Indicateur de scroll
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Fade out global du hero à la fin (transition vers Services)
  const heroOpacity = useTransform(scrollYProgress, [0.88, 1], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative h-[300vh] w-full bg-encre-fonce"
      aria-label="Bienvenue chez Jocelyn Amir"
    >
      {/* SEO + accessibility */}
      <div className="sr-only">
        <h1>Jocelyn Amir, médium voyant à La Réunion</h1>
        <p>
          Voyance, clairvoyance, clairaudience. Au-delà des portes du visible.
          Médium voyant à La Réunion, consultations à Saint-Clotilde ou à
          distance depuis 1994.
        </p>
      </div>

      <motion.div
        style={{ opacity: heroOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* ═══ Vidéo desktop ═══ */}
        <video
          ref={videoDesktopRef}
          src="/videos/hero-desktop.mp4"
          poster="/images/porte-desktop.jpg"
          preload="metadata"
          muted
          playsInline
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
        />

        {/* ═══ Vidéo mobile ═══ */}
        <video
          ref={videoMobileRef}
          src="/videos/hero-mobile.mp4"
          poster="/images/porte-mobile.jpg"
          preload="metadata"
          muted
          playsInline
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover md:hidden"
        />

        {/* ═══ Overlay subtil pour lisibilité du texte ═══ */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* ═══ Header ═══ */}
        <header className="absolute top-0 left-0 right-0 z-40 px-6 md:px-12 py-6 flex items-center justify-between">
          <div className="font-serif text-ivoire text-sm md:text-base tracking-[0.3em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            <span className="hidden md:inline">JOCELYN AMIR</span>
            <span className="md:hidden">JOCELYN</span>
            <span className="text-or-clair"> · </span>
            <span className="text-ivoire/85">MÉDIUM</span>
          </div>

          <button
            aria-label="Ouvrir le menu"
            className="text-ivoire hover:text-or-clair transition-colors p-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </header>

        {/* ═══ Texte hero + CTA ═══ */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-30 flex items-end md:items-center justify-center md:justify-start pointer-events-none"
        >
          <div className="w-full md:w-1/2 px-6 md:px-16 lg:px-20 pb-32 md:pb-0 text-center md:text-left pointer-events-auto">
            <p
              className="text-or-clair font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 md:mb-6"
              style={{
                textShadow:
                  "0 2px 12px rgba(0,0,0,0.85), 0 0 24px rgba(0,0,0,0.5)",
              }}
            >
              Voyance · Clairvoyance · Clairaudience
            </p>

            <h2
              className="font-serif text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-ivoire leading-[1.05] mb-5 md:mb-7"
              style={{
                textShadow:
                  "0 4px 24px rgba(0,0,0,0.85), 0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              Au-delà des{" "}
              <span className="italic font-light text-mystique">
                portes du visible.
              </span>
            </h2>

            <p
              className="font-sans text-ivoire/95 text-sm md:text-base lg:text-lg leading-relaxed mb-8 md:mb-10 max-w-md mx-auto md:mx-0"
              style={{ textShadow: "0 2px 14px rgba(0,0,0,0.85)" }}
            >
              Médium voyant à La Réunion depuis plus de 30 ans.
              <br className="hidden md:inline" />
              Consultations au cabinet à Saint-Clotilde ou à distance.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center md:items-start justify-center md:justify-start">
              <Button variant="gold" size="lg">
                Réserver une consultation
              </Button>
              <Button variant="outline" size="lg">
                Découvrir mon parcours
              </Button>
            </div>
          </div>
        </motion.div>

        {/* ═══ Indicateur scroll ═══ */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none"
        >
          <p
            className="font-serif italic text-ivoire/95 text-xs tracking-widest"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
          >
            Franchissez le seuil
          </p>
          <div className="animate-scroll-hint">
            <ChevronDown
              size={26}
              strokeWidth={1.2}
              className="text-or-clair drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            />
          </div>
        </motion.div>

        {/* ═══ Indicateur de chargement de la vidéo ═══ */}
        {!videoReady && (
          <div className="absolute bottom-2 right-3 z-50 text-ivoire/40 text-[10px] font-sans tracking-wider">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-or-clair animate-pulse mr-2" />
            Chargement…
          </div>
        )}
      </motion.div>
    </section>
  );
}
