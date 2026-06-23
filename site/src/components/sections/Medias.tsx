"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

// Contenu editable injecte depuis Sanity (page d'accueil, groupe Medias).
// Tous les champs sont optionnels : repli sur les defauts en dur ci-dessous.
export type MediasContent = {
  surtitre?: string;
  titre?: string;
  titreItalique?: string;
  description?: string;
};

function val(value: string | undefined, fallback: string): string {
  return value && value.trim().length > 0 ? value : fallback;
}

export function Medias({ content }: { content?: MediasContent } = {}) {
  return (
    <section
      id="medias"
      className="relative bg-encre text-ivoire overflow-hidden"
    >
      {/* Liseré or haut/bas */}
      <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-50 z-[2]" />
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-50 z-[2]" />

      {/* Image de fond unique : plateau TV (la même que sur mobile) + overlay 30% */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/images/backgrounds/medias-bg.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay : ~30% sur desktop, plus dense sur mobile pour la lisibilité */}
        <div className="absolute inset-0 lg:hidden" style={{ background: "rgba(11,16,26,0.74)" }} />
        <div className="absolute inset-0 hidden lg:block" style={{ background: "rgba(11,16,26,0.45)" }} />
        {/* Dégradé latéral pour faire ressortir le texte à gauche */}
        <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(90deg, rgba(8,14,24,0.85) 0%, rgba(8,14,24,0.45) 42%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Colonne gauche : texte + cartes + CTA ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-or-doux/70" />
                <p className="text-or-clair font-sans text-xs tracking-[0.45em] uppercase">
                  {val(content?.surtitre, "Médias et presse")}
                </p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] text-ivoire leading-[1.05] tracking-tight mb-4">
                {val(content?.titre, "Trente ans")}{" "}
                <span className="italic text-or-clair">{val(content?.titreItalique, "sous les projecteurs.")}</span>
              </h2>
              <p className="font-sans text-ivoire/75 text-base md:text-lg leading-relaxed mb-7 max-w-md">
                {val(content?.description, "Présence hebdomadaire à la télévision réunionnaise depuis quinze ans. Une carrière médiatique construite sur la durée.")}
              </p>
            </motion.div>

            {/* Photo « Le 1Hoo » : sur mobile, juste sous la description (avant les CTA) */}
            <figure className="lg:hidden m-0 mb-8 max-w-md">
              <div
                className="relative overflow-hidden rounded-2xl aspect-video"
                style={{ border: "1px solid rgba(201,169,97,0.45)", boxShadow: "0 24px 60px -22px rgba(0,0,0,0.7)" }}
              >
                <img
                  src="/images/jocelyn-le1hoo.jpeg"
                  alt="Jocelyn Amir sur le plateau de l'émission Le 1Hoo"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <figcaption className="font-sans text-[10px] tracking-[0.25em] uppercase text-ivoire/55 mt-2.5">
                Sur le plateau · « Le 1Hoo »
              </figcaption>
            </figure>

            {/* Deux médias : lignes éditoriales, sans cartes "glass" */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: EASE_LUXE, delay: 0.1 }}
              className="mb-9 max-w-md"
            >
              {/* Télé Kréol */}
              <div className="flex items-baseline justify-between gap-4 py-4 border-t border-ivoire/12">
                <div>
                  <p className="font-serif text-ivoire text-xl leading-tight">Télé Kréol</p>
                  <p className="font-sans text-ivoire/55 text-[13px] mt-0.5">Émission hebdomadaire en direct</p>
                </div>
                <p className="font-sans text-or-clair text-[13px] tracking-wide whitespace-nowrap shrink-0">Mercredi · 19h30</p>
              </div>
              {/* Kréol FM */}
              <div className="flex items-baseline justify-between gap-4 py-4 border-t border-b border-ivoire/12">
                <div>
                  <p className="font-serif text-ivoire text-xl leading-tight">Kréol FM</p>
                  <p className="font-sans text-ivoire/55 text-[13px] mt-0.5">Spiritualité, voyance et traditions</p>
                </div>
                <p className="font-sans text-ivoire/60 text-[13px] tracking-wide whitespace-nowrap shrink-0">Radio régionale</p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/a-propos"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-or-doux text-encre hover:bg-or-clair transition-all font-sans text-xs tracking-[0.22em] uppercase font-medium shadow-[0_14px_40px_-10px_rgba(201,169,97,0.6)] whitespace-nowrap"
              >
                <span>Mon parcours</span>
                <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/reserver"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-ivoire/35 text-ivoire bg-transparent hover:border-or-doux/70 hover:bg-ivoire/5 transition-all font-sans text-xs tracking-[0.22em] uppercase whitespace-nowrap"
              >
                <Calendar size={14} strokeWidth={2} />
                <span>Réserver</span>
              </Link>
            </motion.div>
          </div>

          {/* ── Colonne droite : photo « Le 1Hoo » par-dessus le fond (desktop) ── */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: EASE_LUXE }}
            className="hidden lg:block m-0 lg:justify-self-end w-full max-w-lg"
          >
            <div
              className="relative overflow-hidden rounded-2xl aspect-video"
              style={{ border: "1px solid rgba(201,169,97,0.45)", boxShadow: "0 30px 80px -24px rgba(0,0,0,0.7)" }}
            >
              <img
                src="/images/jocelyn-le1hoo.jpeg"
                alt="Jocelyn Amir sur le plateau de l'émission Le 1Hoo"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(250,246,238,0.10)" }} />
            </div>
            <figcaption className="font-sans text-[10px] tracking-[0.25em] uppercase text-ivoire/55 mt-3 text-center lg:text-right">
              Sur le plateau · « Le 1Hoo »
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
