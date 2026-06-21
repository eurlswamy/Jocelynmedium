"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Mail, ArrowRight, Sparkles } from "lucide-react";

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

export function Seuil() {
  return (
    <section
      id="seuil"
      className="relative flex items-center text-ivoire py-14 md:py-16 overflow-hidden"
    >
      {/* Photo de fond : silhouette face au lever de soleil , "franchir le seuil" */}
      <div className="absolute inset-0 z-0">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/images/backgrounds/seuil-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,25,41,0.78) 0%, rgba(11,25,41,0.58) 35%, rgba(11,25,41,0.62) 65%, rgba(11,25,41,0.92) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </div>

      {/* Étoiles d'ambiance */}
      <div className="absolute inset-0 z-[1] opacity-35 pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (i * 41.7) % 100;
          const y = (i * 67.3) % 100;
          const size = ((i * 7) % 2) + 1;
          return (
            <span
              key={i}
              className="absolute rounded-full bg-ivoire animate-twinkle"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${(i % 20) / 10}s`,
              }}
            />
          );
        })}
      </div>

      {/* Bordures haut/bas */}
      <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-50 z-[2]" />
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-50 z-[2]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center w-full">
        {/* Eyebrow ornement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE_LUXE }}
          className="flex items-center justify-center gap-3 mb-7"
        >
          <span className="h-px w-12 bg-or-doux/65" />
          <Sparkles size={16} strokeWidth={1.5} className="text-or-clair" />
          <span className="h-px w-12 bg-or-doux/65" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_LUXE }}
          className="text-or-clair font-sans text-xs md:text-sm tracking-[0.5em] uppercase mb-7"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
        >
          Prêt à franchir le seuil
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, delay: 0.18, ease: EASE_LUXE }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivoire leading-[1.02] tracking-tight mb-6"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 2px 12px rgba(0,0,0,0.6)" }}
        >
          Encore une question,
          <br />
          <span className="italic text-or-clair">ou prêt à réserver&nbsp;?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE_LUXE }}
          className="font-sans text-ivoire/85 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-12 md:mb-14"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
        >
          Posez-moi votre question par email, ou réservez directement votre
          créneau. Vous êtes recontacté sous 24h pour confirmer, annulation
          possible jusqu&apos;à 24h avant le rendez-vous.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE_LUXE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/reserver"
            className="group inline-flex items-center justify-between gap-3 px-7 py-4 rounded-full bg-or-doux text-encre hover:bg-or-clair transition-all font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-medium shadow-[0_15px_50px_-10px_rgba(201,169,97,0.65)] hover:shadow-[0_20px_60px_-10px_rgba(201,169,97,0.8)]"
          >
            <span className="flex items-center gap-2.5">
              <Calendar size={16} strokeWidth={2} />
              <span>Réserver une consultation</span>
            </span>
            <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="mailto:contact@jocelynamir.com"
            className="group inline-flex items-center justify-between gap-3 px-7 py-4 rounded-full border border-ivoire/30 text-ivoire bg-encre/30 backdrop-blur-md hover:bg-encre/50 hover:border-or-doux/70 transition-all font-sans text-xs md:text-sm tracking-[0.2em] uppercase shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)]"
          >
            <span className="flex items-center gap-2.5">
              <Mail size={16} strokeWidth={2} />
              <span>Poser une question</span>
            </span>
            <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Mention rassurance */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-12 text-[11px] md:text-xs text-ivoire/65 tracking-wide"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-or-doux" />
            Paiement sécurisé par Stripe
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-or-doux" />
            Confirmation sous 24h
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-or-doux" />
            Confidentialité absolue
          </span>
        </motion.div>
      </div>
    </section>
  );
}
