"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const METHODES = [
  {
    iconSrc: "/icons/methodes/clairvoyance.webp",
    iconAlt: "Œil mystique stylisé symbolisant la clairvoyance",
    title: "Clairvoyance",
    short:
      "Des images, des flashs, des scènes liées à votre passé, présent ou avenir.",
    accentHex: "#1B7A8F",
  },
  {
    iconSrc: "/icons/methodes/clairaudience.webp",
    iconAlt: "Oreille avec ondes sonores symbolisant la clairaudience",
    title: "Clairaudience",
    short:
      "Voix, prénoms, phrases courtes captés à l'oreille intérieure.",
    accentHex: "#C57B5C",
  },
  {
    iconSrc: "/icons/methodes/tirage.webp",
    iconAlt: "Trois cartes de tarot symbolisant le tirage",
    title: "Tirage de cartes",
    short:
      "Tarots et oracles, en complément, pour structurer les visions.",
    accentHex: "#C9A961",
  },
  {
    iconSrc: "/icons/methodes/support.webp",
    iconAlt:
      "Main au-dessus d'un objet symbolisant la voyance sur support",
    title: "Voyance sur support",
    short:
      "Une photo, un courrier, un objet personnel : informations par contact.",
    accentHex: "#B87333",
  },
];

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

const bubbleVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: EASE_LUXE },
  },
};

export function Methodes() {
  return (
    <section
      id="methodes"
      className="relative py-20 md:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "var(--color-sable)" }}
    >
      {/* Motif fond léger */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, var(--color-bleu-majorelle) 0%, transparent 38%), radial-gradient(circle at 90% 80%, var(--color-terre-cuite) 0%, transparent 38%), radial-gradient(circle at 50% 50%, var(--color-or-doux) 0%, transparent 30%)",
        }}
      />

      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-60"
      />
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-60"
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Header centré */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-or-doux/70" />
            <p className="text-encre font-sans text-xs tracking-[0.45em] uppercase">
              Comment je travaille
            </p>
            <span className="h-px w-10 bg-or-doux/70" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-encre leading-[1.05] tracking-tight mb-5">
            Quatre approches,{" "}
            <span className="italic text-bleu-majorelle">une heure.</span>
          </h2>
          <p className="font-sans text-encre/72 text-base md:text-lg leading-relaxed">
            Quatre méthodes combinées dans une seule consultation. Pas de
            prédictions floues : des éléments concrets et vérifiables.
          </p>
        </motion.div>

        {/* Grille de 4 bulles */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 lg:gap-x-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {METHODES.map((m, i) => {
            const number = i + 1;
            return (
              <motion.article
                key={m.title}
                variants={bubbleVariants}
                className="group flex flex-col items-center text-center"
              >
                {/* Bulle : numéro + icône au centre, double anneau coloré */}
                <div className="relative mb-6">
                  {/* Cercle principal */}
                  <div
                    className="relative w-44 h-44 lg:w-48 lg:h-48 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F5EE 100%)',
                      border: '1px solid rgba(0,0,0,0.08)',
                      boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06), 0 10px 30px -10px rgba(0,0,0,0.14)',
                    }}
                  >
                    {/* Icône au centre , drop-shadow fort pour rendre visibles les icônes claires sur fond blanc */}
                    <Image
                      src={m.iconSrc}
                      alt={m.iconAlt}
                      width={192}
                      height={192}
                      className="relative z-10 object-contain w-36 h-36 lg:w-40 lg:h-40"
                      style={{
                        filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.35)) drop-shadow(0 4px 18px rgba(0,0,0,0.20))",
                      }}
                    />

                    {/* Numéro en badge cosmétique */}
                    <span
                      className="absolute -top-2 -right-2 w-9 h-9 rounded-full flex items-center justify-center font-sans text-sm font-medium shadow-md tabular-nums"
                      style={{
                        backgroundColor: m.accentHex,
                        color: "#FAF6EE",
                      }}
                    >
                      {number}
                    </span>
                  </div>
                </div>

                {/* Titre : trait de couleur quasi collé sous le texte, texte par-dessus */}
                <h3 className="font-serif text-2xl text-encre leading-tight mb-3">
                  <span
                    className="inline"
                    style={{
                      backgroundImage: `linear-gradient(${m.accentHex}, ${m.accentHex})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 3px",
                      backgroundPosition: "0 100%",
                      paddingBottom: "1px",
                    }}
                  >
                    {m.title}
                  </span>
                </h3>

                {/* Description */}
                <p className="font-sans text-encre/72 text-[14px] leading-relaxed max-w-[240px]">
                  {m.short}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

        {/* CTA centré */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center gap-5 mt-16 md:mt-20"
        >
          <p className="font-serif italic text-encre/65 text-sm md:text-base text-center max-w-xl">
            Pour comprendre comment je combine ces quatre approches en une heure
          </p>
          <Link
            href="/methodes"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-encre text-ivoire hover:bg-bleu-majorelle transition-all font-sans text-xs tracking-[0.22em] uppercase font-medium shadow-[0_12px_36px_-10px_rgba(28,28,28,0.45)]"
          >
            <span>Découvrir mes méthodes</span>
            <ArrowRight
              size={14}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
