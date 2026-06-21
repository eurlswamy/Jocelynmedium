"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

export function AntiCliches() {
  return (
    <section
      id="anti-cliches"
      className="relative text-ivoire py-14 md:py-20"
    >
      {/* Fond mobile , pas de fixed attachment (non supporté iOS Safari) */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none md:hidden"
        style={{
          backgroundImage: "url(/frames/desktop/frame_0193.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Fond desktop , effet parallaxe fixe */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none hidden md:block"
        style={{
          backgroundImage: "url(/frames/desktop/frame_0193.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Voile sombre */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(11,16,26,0.88) 0%, rgba(11,16,26,0.75) 50%, rgba(11,16,26,0.90) 100%)",
        }}
      />

      {/* Liserés or */}
      <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-55 z-[2]" />
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-55 z-[2]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: EASE_LUXE }}
          className="flex gap-4 md:gap-6 items-start"
        >
          {/* Grand guillemet à gauche */}
          <div
            aria-hidden
            className="shrink-0 font-serif text-[7rem] md:text-[9rem] leading-none text-or-doux/25 select-none mt-[-1rem] md:mt-[-1.5rem]"
          >
            "
          </div>

          {/* Citation + attribution + CTAs */}
          <div className="pt-1">
            <blockquote
              className="font-serif text-xl md:text-2xl lg:text-[1.85rem] text-ivoire leading-[1.42] tracking-tight mb-5"
              style={{ textWrap: "balance" }}
            >
              Je ne vends pas de rêves. Des faits vérifiables{" "}
              <span className="italic text-or-clair">
                au moment même de la séance.
              </span>{" "}
              Pas de sorts, pas de mise en scène, pas de dépendance.
            </blockquote>

            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-6 bg-or-doux/50" />
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-or-clair/75">
                Jocelyn Amir Swamy · Médium voyant
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/a-propos"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-or-doux text-encre hover:bg-or-clair transition-all font-sans text-xs tracking-[0.22em] uppercase font-medium shadow-[0_14px_40px_-10px_rgba(201,169,97,0.7)] self-start sm:self-auto"
              >
                <span>Mon parcours</span>
                <ArrowRight size={13} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/reserver"
                className="group hidden sm:inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-ivoire/35 text-ivoire bg-transparent hover:border-or-doux/70 hover:bg-ivoire/5 transition-all font-sans text-xs tracking-[0.22em] uppercase"
              >
                <span>Prendre rendez-vous</span>
                <ArrowRight size={13} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
