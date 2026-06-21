"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Intro() {
  return (
    <section
      id="intro"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Fond ivoire avec ornements zellige discrets */}
      <div
        aria-hidden
        className="absolute inset-0 bg-ivoire"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 32%, var(--color-bleu-majorelle) 0%, transparent 38%), radial-gradient(circle at 82% 68%, var(--color-or-doux) 0%, transparent 38%), radial-gradient(circle at 50% 50%, var(--color-terre-cuite) 0%, transparent 32%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glassmorphic outer card */}
          <div
            className="relative overflow-hidden border border-or-doux/40 shadow-[0_40px_120px_-30px_rgba(28,28,28,0.35)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(247,243,236,0.55) 0%, rgba(247,243,236,0.30) 50%, rgba(232,213,183,0.35) 100%)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            {/* Liseré or interne */}
            <div
              aria-hidden
              className="absolute inset-2 border border-or-doux/25 pointer-events-none"
            />

            {/* Bandeau diagonal très discret en arrière-plan */}
            <div
              aria-hidden
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,169,97,0.18) 0%, transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(27,122,143,0.14) 0%, transparent 70%)",
              }}
            />

            <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-14 items-center p-8 md:p-12 lg:p-16">
              {/* Photo (réduite) */}
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="relative aspect-[4/5] w-52 md:w-60 lg:w-full max-w-[260px]"
                >
                  <div className="absolute -inset-2 md:-inset-3 border border-or-doux/55" />
                  <div className="absolute -inset-1 bg-bleu-majorelle/8" />
                  <Image
                    src="/images/jocelyn-portrait.jpg"
                    alt="Jocelyn Amir, médium voyant à La Réunion"
                    fill
                    className="object-cover relative z-10"
                    sizes="(max-width: 1024px) 240px, 260px"
                  />
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 bg-or-doux text-encre text-[9px] tracking-[0.3em] font-medium">
                    JOCELYN AMIR
                  </div>
                </motion.div>
              </div>

              {/* Texte */}
              <div className="lg:col-span-8">
                <p className="text-bleu-majorelle font-sans text-xs tracking-[0.4em] uppercase mb-5">
                  Qui je suis
                </p>

                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-encre leading-[1.05] mb-7">
                  Je m&apos;appelle Jocelyn.
                  <br />
                  <span className="italic text-bleu-majorelle">
                    Médium depuis{" "}
                    <span className="not-italic font-sans font-medium tracking-tight">
                      1994
                    </span>
                    .
                  </span>
                </h2>

                <div className="space-y-4 text-encre/82 font-sans text-base md:text-[17px] leading-relaxed max-w-xl">
                  <p>
                    Je vous reçois à{" "}
                    <strong className="text-encre">
                      Saint-Clotilde, à La Réunion
                    </strong>
                    . Je vous accompagne aussi par téléphone et en visio, où
                    que vous soyez dans l&apos;Océan Indien.
                  </p>
                  <p>
                    Au cours d&apos;une consultation d&apos;une heure, je
                    combine quatre approches : clairvoyance, clairaudience,
                    tirage de cartes, et voyance sur photo ou document.
                  </p>
                  <p className="font-serif italic text-lg md:text-xl text-bleu-majorelle">
                    «&nbsp;Voici ce que je fais. Et ce que je ne fais
                    pas.&nbsp;»
                  </p>
                </div>

                {/* Stats (chiffres sans-serif) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 mt-10 pt-8 border-t border-encre/12">
                  <Stat number="30+" label="Années de pratique" />
                  <Stat number="4" label="Méthodes combinées" />
                  <Stat number="1h" label="Par consultation" />
                  <Stat number="15 ans" label="À l'antenne TV" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-sans font-medium text-3xl md:text-4xl text-or-doux mb-1 tabular-nums tracking-tight">
        {number}
      </div>
      <div className="font-sans text-xs md:text-sm text-encre/60 tracking-wide">
        {label}
      </div>
    </div>
  );
}
