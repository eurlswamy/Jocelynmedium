"use client";

import { motion } from "framer-motion";
import { EyeOff, Lock, ShieldCheck } from "lucide-react";

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

// Defauts en dur : le site ne se vide jamais si Sanity est vide ou hors-ligne.
// Seuls les textes (titre, texte) sont editables ; l'icone et la couleur
// d'accent restent cote code (non editoriaux).
const PILIERS = [
  {
    Icon: EyeOff,
    accentHex: "#1B7A8F",
    titre: "Anonymat total",
    texte: "Personne ne sait que vous avez consulté. Vos coordonnées restent strictement privées, jamais transmises ni conservées.",
  },
  {
    Icon: Lock,
    accentHex: "#C9A961",
    titre: "Confidentialité absolue",
    texte: "Ce qui est dit dans la séance reste entre vous et Jocelyn. Aucun enregistrement, aucune note conservée après la consultation.",
  },
  {
    Icon: ShieldCheck,
    accentHex: "#C57B5C",
    titre: "Sans jugement",
    texte: "Venez avec vos doutes, vos peurs, vos questions les plus intimes. Ce que vous portez ne sera jamais minimisé ni commenté en dehors.",
  },
];

// Contenu editable injecte depuis Sanity (page d'accueil, groupe Discretion).
// Tous les champs sont optionnels : repli sur les defauts ci-dessus.
export type DiscretionContent = {
  surtitre?: string;
  titre?: string;
  titreItalique?: string;
  piliers?: { titre?: string; texte?: string }[];
};

function val(value: string | undefined, fallback: string): string {
  return value && value.trim().length > 0 ? value : fallback;
}

export function Discretion({ content }: { content?: DiscretionContent } = {}) {
  const piliers = PILIERS.map((p, i) => ({
    ...p,
    titre: val(content?.piliers?.[i]?.titre, p.titre),
    texte: val(content?.piliers?.[i]?.texte, p.texte),
  }));
  return (
    <section
      id="discretion"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-sable)" }}
    >
      {/* Motif fond léger (identique à la section « Comment je travaille ») */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, var(--color-bleu-majorelle) 0%, transparent 38%), radial-gradient(circle at 90% 80%, var(--color-terre-cuite) 0%, transparent 38%), radial-gradient(circle at 50% 50%, var(--color-or-doux) 0%, transparent 30%)",
        }}
      />
      <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-60" />
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">

        {/* En-tête centré */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: EASE_LUXE }}
          className="text-center max-w-3xl mx-auto mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-or-doux/60" />
            <p className="font-sans text-encre/70 text-[10px] tracking-[0.5em] uppercase">{val(content?.surtitre, "Votre visite vous appartient")}</p>
            <span className="h-px w-8 bg-or-doux/60" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-encre leading-[1.02] tracking-tight">
            {val(content?.titre, "Venez en toute")}{" "}
            <span className="italic text-bleu-majorelle">{val(content?.titreItalique, "discrétion.")}</span>
          </h2>
        </motion.div>

        {/* 3 piliers : cartes colorées par pilier, icône seule (sans numéro) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {piliers.map((p, i) => {
          const PilierIcon = p.Icon;
          return (
            <motion.div
              key={p.titre}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, ease: EASE_LUXE, delay: i * 0.12 }}
              className="group relative rounded-[1.75rem] overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
              style={{
                background: "linear-gradient(160deg, #FFFFFF 0%, #FCF8F0 100%)",
                border: `1px solid ${p.accentHex}40`,
                boxShadow: `0 18px 44px -22px ${p.accentHex}70, 0 4px 14px -8px rgba(0,0,0,0.12)`,
              }}
            >
              {/* Barre d'accent supérieure */}
              <span aria-hidden className="absolute top-0 inset-x-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${p.accentHex}, transparent)` }} />

              <div className="relative p-8 md:p-9 flex flex-col items-center text-center">
                {/* Médaillon icône coloré, icône claire pour le contraste */}
                <div className="relative mb-6">
                  <div aria-hidden className="absolute -inset-2 rounded-2xl" style={{ border: `1px solid ${p.accentHex}25` }} />
                  <div
                    className="relative w-[4.5rem] h-[4.5rem] rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(145deg, ${p.accentHex} 0%, ${p.accentHex}CC 100%)`,
                      boxShadow: `0 12px 28px -8px ${p.accentHex}, inset 0 1px 0 rgba(255,255,255,0.3)`,
                    }}
                  >
                    <PilierIcon size={34} strokeWidth={1.6} style={{ color: "#FFFFFF" }} />
                  </div>
                </div>

                <h3 className="font-serif text-2xl text-encre leading-tight mb-3.5">
                  {p.titre}
                </h3>

                <p className="font-sans text-encre/65 text-sm leading-relaxed">
                  {p.texte}
                </p>
              </div>
            </motion.div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
