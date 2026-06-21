"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PAGES = [
  {
    numeral: "I",
    href: "/services",
    eyebrow: "Services & tarifs",
    title: "Deux formules",
    description:
      "Une heure au cabinet ou à distance (120€), ou 30 minutes par téléphone (85€).",
    accent: "or",
  },
  {
    numeral: "II",
    href: "/methodes",
    eyebrow: "Méthodes",
    title: "Quatre approches",
    description:
      "Clairvoyance, clairaudience, tirage de cartes, voyance sur photo. Quatre approches combinées en une heure.",
    accent: "majorelle",
  },
  {
    numeral: "III",
    href: "/a-propos",
    eyebrow: "À propos",
    title: "Trente ans de pratique",
    description:
      "Plus jeune médium de France à 23 ans. Festival de Cannes. Émission Télé Kréol depuis 15 ans.",
    accent: "terre",
  },
  {
    numeral: "IV",
    href: "/temoignages",
    eyebrow: "Témoignages",
    title: "Ce qu'ils en disent",
    description:
      "Des centaines de consultations. Quelques voix recueillies avec leur accord.",
    accent: "majorelle",
  },
  {
    numeral: "V",
    href: "/contact",
    eyebrow: "Contact",
    title: "Réserver une consultation",
    description:
      "Paiement sécurisé en ligne. Confirmation sous 24h. Annulation jusqu'à 24h avant.",
    accent: "or",
  },
];

const ACCENT_MAP = {
  or: {
    border: "border-or-doux/40",
    hoverBorder: "hover:border-or-doux",
    text: "text-or-doux",
    bg: "bg-or-doux",
  },
  majorelle: {
    border: "border-bleu-majorelle/40",
    hoverBorder: "hover:border-bleu-majorelle",
    text: "text-bleu-majorelle",
    bg: "bg-bleu-majorelle",
  },
  terre: {
    border: "border-terre-cuite/40",
    hoverBorder: "hover:border-terre-cuite",
    text: "text-terre-cuite",
    bg: "bg-terre-cuite",
  },
};

export function Discover() {
  return (
    <section
      id="discover"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: "var(--color-ivoire)" }}
    >
      {/* Motifs zellige en filigrane */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, var(--color-bleu-majorelle) 0%, transparent 35%), radial-gradient(circle at 85% 75%, var(--color-terre-cuite) 0%, transparent 35%), radial-gradient(circle at 50% 50%, var(--color-or-doux) 0%, transparent 30%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <p className="inline-block text-encre font-sans text-xs tracking-[0.4em] uppercase mb-5 px-3 py-1 bg-or-doux/30 border border-or-doux/60">
            Explorer le site
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-encre leading-[1.05] mb-6">
            Cinq seuils
            <br />
            <span className="italic text-bleu-majorelle">à franchir.</span>
          </h2>
          <p className="font-sans text-encre/70 text-lg leading-relaxed max-w-xl">
            Chaque page approfondit un aspect de la pratique : ce que je
            propose, comment je travaille, qui je suis, et comment me
            contacter.
          </p>
        </motion.div>

        {/* Grille éditoriale asymétrique */}
        <div className="space-y-px bg-encre/8">
          {PAGES.map((page, i) => {
            const styles = ACCENT_MAP[page.accent as keyof typeof ACCENT_MAP];
            return (
              <motion.div
                key={page.href}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link
                  href={page.href}
                  className={`group relative grid md:grid-cols-12 gap-6 md:gap-10 items-center bg-ivoire px-6 md:px-10 py-8 md:py-10 lg:py-12 border-l-2 ${styles.border} ${styles.hoverBorder} transition-colors duration-500 hover:bg-blanc-casse`}
                >
                  {/* Numéro romain */}
                  <div className="md:col-span-1 flex items-start">
                    <span
                      className={`font-serif text-5xl md:text-6xl lg:text-7xl leading-none ${styles.text} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
                    >
                      {page.numeral}
                    </span>
                  </div>

                  {/* Contenu */}
                  <div className="md:col-span-7">
                    <p
                      className={`font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase mb-2 ${styles.text}`}
                    >
                      {page.eyebrow}
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-encre leading-[1.1] mb-3 group-hover:italic transition-all duration-500">
                      {page.title}
                    </h3>
                    <p className="font-sans text-encre/65 text-sm md:text-base leading-relaxed max-w-2xl">
                      {page.description}
                    </p>
                  </div>

                  {/* CTA visuel */}
                  <div className="md:col-span-4 flex items-center justify-end gap-4">
                    <span className="hidden md:inline-block font-sans text-[11px] tracking-[0.3em] uppercase text-encre/55 group-hover:text-encre transition-colors">
                      Découvrir
                    </span>
                    <span
                      className={`w-14 h-14 flex items-center justify-center rounded-full border ${styles.border} ${styles.text} group-hover:${styles.bg} group-hover:text-ivoire group-hover:border-transparent transition-all duration-500`}
                    >
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.5}
                        className="group-hover:rotate-45 transition-transform duration-500"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
