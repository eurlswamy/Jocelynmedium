"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer, type FooterContent } from "@/components/sections/Footer";
import { Seuil, type SeuilContent } from "@/components/sections/Seuil";
import { ArrowRight, Eye, AudioLines, Layers, Hand } from "lucide-react";

const METHODES = [
  {
    num: "I",
    teaser: "Je vois.",
    titre: "Clairvoyance",
    accentHex: "#1B7A8F",
    iconSrc: "/icons/methodes/clairvoyance.webp",
    Icon: Eye,
    def: "La capacité à percevoir des images, des scènes et des flashs visuels liés au passé, au présent ou à l'avenir.",
    description:
      "Lors d'une consultation, des visions précises apparaissent spontanément : des lieux, des visages, des situations, des dates, des symboles. Ces images décrivent des faits réels, vérifiables au moment même de la séance. C'est la méthode la plus immédiate, celle qui s'active en premier.",
    exemples: [
      "Vision d'un lieu spécifique avec ses détails exacts",
      "Perception d'un événement passé que le consultant reconnaît",
      "Flash sur une personne absente avec description physique précise",
    ],
  },
  {
    num: "II",
    teaser: "J'entends.",
    titre: "Clairaudience",
    accentHex: "#C57B5C",
    iconSrc: "/icons/methodes/clairaudience.webp",
    Icon: AudioLines,
    def: "La perception auditive interne : voix, prénoms, mots, phrases courtes surgissant dans le canal auditif intérieur.",
    description:
      "Des informations très précises sont transmises par cette voie : le prénom d'un proche disparu, un mot clé lié à une situation, une phrase que la personne reconnaîtra immédiatement. Là où les images donnent un contexte, les mots donnent une précision chirurgicale.",
    exemples: [
      "Prénom d'un défunt prononcé clairement pendant la séance",
      "Phrase prononcée lors d'un événement passé que personne d'autre ne connaît",
      "Mot clé qui déverrouille la compréhension d'une situation bloquée",
    ],
  },
  {
    num: "III",
    teaser: "Je lis.",
    titre: "Tirage de cartes",
    accentHex: "#C9A961",
    iconSrc: "/icons/methodes/tirage.webp",
    Icon: Layers,
    def: "Tarots et oracles utilisés en complément des perceptions directes pour structurer la lecture.",
    description:
      "Les cartes ne dictent pas un destin figé : elles illustrent les énergies présentes, les tendances et les possibilités ouvertes selon vos choix actuels. Elles servent de support pour organiser les visions reçues par clairvoyance et clairaudience.",
    exemples: [
      "Structuration d'une période de transition professionnelle",
      "Mise en lumière des influences actives autour d'une relation",
      "Clarification des options ouvertes face à une décision importante",
    ],
  },
  {
    num: "IV",
    teaser: "Je capte.",
    titre: "Voyance sur support",
    accentHex: "#B87333",
    iconSrc: "/icons/methodes/support.webp",
    Icon: Hand,
    def: "Reception d'informations par contact ou proximité avec un objet personnel : photo, lettre, bijou, document.",
    description:
      "L'objet agit comme un amplificateur : il renforce la connexion et permet de cibler une personne absente ou une situation éloignée. Vous pouvez apporter vos supports directement au cabinet, ou envoyer une photo pour une consultation à distance.",
    exemples: [
      "Photo d'un proche absent : informations sur sa situation actuelle",
      "Courrier professionnel : lecture de l'énergie autour d'un projet",
      "Objet personnel : connexion à une personne disparue",
    ],
  },
];

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

// Contenu editable injecte depuis Sanity (singleton "pageMethodes").
// Tous les champs sont optionnels : repli sur les defauts ci-dessus.
export type MethodesContent = {
  heroSurtitre?: string;
  heroTitre?: string;
  heroTitreItalique?: string;
  heroDescription?: string;
  methodes?: {
    numeral?: string;
    teaser?: string;
    titre?: string;
    definition?: string;
    description?: string;
    exemples?: string[];
  }[];
  citationTexte?: string;
  citationAuteur?: string;
};

function val(value: string | undefined, fallback: string): string {
  return value && value.trim().length > 0 ? value : fallback;
}

export function MethodesClient({
  content,
  seuilContent,
  footerContent,
}: {
  content?: MethodesContent;
  seuilContent?: SeuilContent;
  footerContent?: FooterContent;
} = {}) {
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);

  const methodes = METHODES.map((m, i) => {
    const c = content?.methodes?.[i];
    const exemples = Array.isArray(c?.exemples) && c.exemples.filter((x) => typeof x === "string" && x.trim().length > 0).length > 0
      ? c.exemples
      : m.exemples;
    return {
      ...m,
      teaser: val(c?.teaser, m.teaser),
      titre: val(c?.titre, m.titre),
      def: val(c?.definition, m.def),
      description: val(c?.description, m.description),
      exemples,
    };
  });

  return (
    <main style={{ background: "linear-gradient(180deg, #0B1929 0%, #111E35 100%)", minHeight: "100vh" }}>

      {/* Header */}
      <div className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="absolute rounded-full bg-ivoire animate-twinkle" style={{ left: `${(i * 37.3) % 100}%`, top: `${(i * 61.7) % 100}%`, width: `${((i * 5) % 2) + 1}px`, height: `${((i * 5) % 2) + 1}px`, animationDelay: `${(i % 20) / 10}s` }} />
          ))}
        </div>
        {/* Pas de liseré bas - supprimé */}

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE_LUXE }}>
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-or-doux/60" />
              <p className="font-sans text-or-clair text-[10px] tracking-[0.5em] uppercase">{val(content?.heroSurtitre, "Méthodes de travail")}</p>
              <span className="h-px w-10 bg-or-doux/60" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-ivoire leading-[1.02] tracking-tight mb-4">
              {val(content?.heroTitre, "Quatre voies,")}{" "}
              <span className="italic text-or-clair">{val(content?.heroTitreItalique, "une lecture.")}</span>
            </h1>
            <p className="font-sans text-ivoire/55 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
              {val(content?.heroDescription, "Cliquez sur une méthode pour en découvrir le fonctionnement.")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ════ Accordéon des 4 méthodes (desktop + mobile) ════ */}
      <section className="px-5 md:px-12 pb-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-3 md:gap-4">
          {methodes.map((item, i) => {
            const active = mobileOpen === i;
            const ItemIcon = item.Icon;
            return (
              <div
                key={item.num}
                className="rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300"
                style={{
                  background: active
                    ? `linear-gradient(155deg, ${item.accentHex}2E 0%, rgba(11,25,41,0.85) 100%)`
                    : `linear-gradient(160deg, ${item.accentHex}1A 0%, rgba(11,25,41,0.6) 100%)`,
                  border: active ? `1.5px solid ${item.accentHex}` : `1px solid ${item.accentHex}40`,
                  boxShadow: active ? `0 24px 60px -24px ${item.accentHex}70` : "none",
                }}
              >
                <button
                  onClick={() => setMobileOpen(active ? null : i)}
                  aria-expanded={active}
                  className="group flex items-center gap-4 md:gap-5 w-full px-4 md:px-6 py-3.5 md:py-4 text-left"
                >
                  {/* Rond : fond = couleur d'accent pleine, icône claire (contraste max) */}
                  <div
                    className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{ background: item.accentHex, boxShadow: `0 6px 20px -6px ${item.accentHex}` }}
                  >
                    <ItemIcon size={28} strokeWidth={1.6} style={{ color: "#FFFFFF" }} className="md:hidden" />
                    <ItemIcon size={32} strokeWidth={1.6} style={{ color: "#FFFFFF" }} className="hidden md:block" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif italic text-base md:text-xl leading-tight" style={{ color: active ? item.accentHex : "rgba(247,243,236,0.92)" }}>{item.teaser}</p>
                    <p className="font-sans text-[10px] md:text-[11px] tracking-[0.12em] md:tracking-[0.16em] uppercase mt-0.5 text-ivoire/55">{item.titre}</p>
                  </div>
                  <span aria-hidden className="shrink-0 text-xl md:text-2xl transition-transform duration-300 leading-none" style={{ color: item.accentHex, transform: active ? "rotate(180deg)" : "none" }}>⌄</span>
                </button>

                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      key="c"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE_LUXE }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-7 pb-5 md:pb-8 pt-1">
                        <div aria-hidden className="h-px mb-5 md:mb-6" style={{ background: `linear-gradient(90deg, ${item.accentHex}55, transparent)` }} />
                        <p className="font-sans text-ivoire/75 text-[13px] md:text-base leading-relaxed mb-3 md:mb-4">{item.def}</p>
                        <p className="font-sans text-ivoire/65 text-[13px] md:text-base leading-relaxed mb-4 md:mb-6">{item.description}</p>
                        <div className="rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6" style={{ background: `${item.accentHex}10`, border: `1px solid ${item.accentHex}30` }}>
                          <p className="font-sans text-[8px] md:text-[9px] tracking-[0.35em] md:tracking-[0.4em] uppercase mb-3 md:mb-5" style={{ color: item.accentHex }}>Exemples concrets</p>
                          <ul className="space-y-2 md:space-y-3">
                            {item.exemples.map((ex, idx) => (
                              <li key={ex} className="flex items-start gap-2.5 md:gap-3.5 font-sans text-[12.5px] md:text-sm text-ivoire/70">
                                <span className="shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center font-sans font-semibold text-[10px] md:text-[11px]" style={{ background: `${item.accentHex}25`, color: item.accentHex }}>{idx + 1}</span>
                                <span className="leading-snug pt-0.5">{ex}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <a href="/reserver" className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full font-sans text-[10px] tracking-[0.22em] uppercase font-semibold text-encre transition-all hover:opacity-90" style={{ background: item.accentHex }}>
                          Réserver
                          <ArrowRight size={11} strokeWidth={2.5} />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Citation */}
      <section className="py-12 text-ivoire border-t border-ivoire/8" style={{ background: "linear-gradient(135deg, #0B1929 0%, #1A2847 100%)" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <p className="font-serif italic text-xl md:text-2xl text-ivoire/80 leading-relaxed mb-5">
            «&nbsp;{val(content?.citationTexte, "Je ne choisis pas d'utiliser une méthode plutôt qu'une autre. Elles s'activent naturellement, selon ce que la séance demande.")}&nbsp;»
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-or-doux/50" />
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-ivoire/40">{val(content?.citationAuteur, "Jocelyn Amir")}</p>
            <span className="h-px w-10 bg-or-doux/50" />
          </div>
        </div>
      </section>

      <Seuil content={seuilContent} />
      <Footer content={footerContent} />
    </main>
  );
}
