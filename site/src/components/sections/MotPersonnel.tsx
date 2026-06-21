"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

export function MotPersonnel() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={sectionRef}
      id="mot-personnel"
      className="relative text-ivoire py-14 md:py-20 overflow-hidden"
    >
      {/* Image parallaxe , dernière frame de l'animation */}
      <motion.div
        aria-hidden
        className="absolute inset-[-15%] z-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url(/frames/desktop/frame_0193.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </motion.div>

      {/* Voile sombre pour lisibilité */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(11,16,26,0.88) 0%, rgba(11,16,26,0.72) 50%, rgba(11,16,26,0.88) 100%)",
        }}
      />

      {/* Liserés or */}
      <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-50 z-[2]" />
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-50 z-[2]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE_LUXE }}
          className="flex gap-6 md:gap-8 items-start"
        >
          {/* Décoration gauche : deux traits verticaux */}
          <div className="shrink-0 flex flex-col gap-1.5 mt-2">
            <span className="w-0.5 h-8 bg-or-doux/70 rounded-full" />
            <span className="w-0.5 h-3 bg-or-doux/35 rounded-full" />
          </div>

          {/* Contenu */}
          <div>
            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl leading-[1.38] italic text-ivoire mb-6" style={{ textWrap: "balance" }}>
              «&nbsp;Je ne dicterai jamais votre vie.
              Vous êtes adulte, responsable, et vous ferez ce que vous voudrez.{" "}
              <span className="text-or-clair not-italic">
                Je suis là pour optimiser les belles choses
              </span>{" "}
              et, si possible, éviter les catastrophes.&nbsp;»
            </blockquote>

            <p className="font-serif text-ivoire/65 text-sm tracking-widest">
              Jocelyn Amir
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
