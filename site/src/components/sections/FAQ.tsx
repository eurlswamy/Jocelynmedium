"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const QUESTIONS = [
  {
    q: "Comment se déroule une consultation ?",
    a: "Le plus simplement et naturellement possible. Mon bureau est zen et chaleureux. À vous de vous détendre. La consultation commence rapidement : des choses surprenantes, parfois difficiles à croire, seront dites. C'est normal. Je vous guide, j'éclaire votre chemin, je projette une lumière sur votre avenir. Rien n'est figé, tout peut évoluer selon vos choix.",
  },
  {
    q: "Faut-il préparer quelque chose à l'avance ?",
    a: "Non. Vous venez tel que vous êtes. Vous pouvez apporter une photo ou un document si vous voulez consulter sur une personne ou une situation précise. Sinon, je travaille directement avec vous, sans support.",
  },
  {
    q: "Puis-je consulter à distance ?",
    a: "Oui. Les consultations téléphoniques de 30 minutes sont disponibles. La précision est identique : la voyance ne dépend pas de la proximité physique. C'est idéal si vous êtes à l'Île Maurice, en métropole, ou ailleurs.",
  },
  {
    q: "Comment payer ?",
    a: "Le paiement se fait directement en ligne lors de la réservation, par carte bancaire (Visa, Mastercard, Apple Pay, Google Pay). Paiement 100% sécurisé via Stripe. Une fois le paiement effectué, vous êtes recontacté sous 24h pour confirmer votre rendez-vous et convenir du créneau.",
  },
  {
    q: "Puis-je annuler ?",
    a: "Oui, jusqu'à 24h avant la consultation, sans frais. Au-delà, l'acompte n'est pas remboursable, mais le rendez-vous peut être reporté une fois si vous me prévenez à temps.",
  },
  {
    q: "Le secret professionnel est-il garanti ?",
    a: "Absolument. Tout l'entretien est strictement confidentiel. Je n'évoque jamais ce qui se dit en consultation avec qui que ce soit. Mieux vaut consulter seul, pour vous, pour la qualité du travail.",
  },
  {
    q: "Que faire si je suis bouleversé après la consultation ?",
    a: "C'est normal. Une consultation provoque des émotions, joyeuses ou tristes : on fait remonter de vieux souvenirs, parfois des épreuves enfouies. Prenez le temps, parlez à un proche. Et soyez vraiment sûr de vous avant de prendre rendez-vous.",
  },
  {
    q: "Proposez-vous autre chose que de la voyance ?",
    a: "Oui. À la suite de nombreuses demandes de consultants souhaitant un suivi régulier, je propose désormais un accompagnement coaching de vie et développement personnel. Estime de soi, reconversion, relations, gestion des émotions, épanouissement : un espace d'écoute bienveillant et orienté action. Ce service est complémentaire à la voyance , il ne s'y substitue pas, et ne remplace pas non plus un suivi psychologique ou médical.",
  },
];

// Contenu editable injecte depuis Sanity (page d'accueil, groupe FAQ).
// En-tete et liste des questions editables ; repli sur les valeurs en dur.
export type FaqContent = {
  surtitre?: string;
  titre?: string;
  titreItalique?: string;
  questions?: { question?: string; reponse?: string }[];
};

function val(value: string | undefined, fallback: string): string {
  return value && value.trim().length > 0 ? value : fallback;
}

export function FAQ({ content }: { content?: FaqContent } = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Repli : on prend les questions Sanity si au moins une est remplie,
  // sinon les questions d'origine en dur. Le site ne se vide jamais.
  const sanityQuestions = (content?.questions ?? [])
    .map((item) => ({
      q: (item?.question ?? "").trim(),
      a: (item?.reponse ?? "").trim(),
    }))
    .filter((item) => item.q.length > 0 && item.a.length > 0);
  const questions = sanityQuestions.length > 0 ? sanityQuestions : QUESTIONS;

  return (
    <section
      id="faq"
      className="relative bg-ivoire py-24 md:py-32 overflow-hidden"
    >
      <div className="relative max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-or-doux" />
            <p className="text-bleu-majorelle font-sans text-xs tracking-[0.45em] uppercase">
              {val(content?.surtitre, "Avant de prendre rendez-vous")}
            </p>
            <span className="h-px w-10 bg-or-doux" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-encre leading-[1.02] tracking-tight">
            {val(content?.titre, "Vos questions,")}{" "}
            <span className="italic text-bleu-majorelle">{val(content?.titreItalique, "mes réponses.")}</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {questions.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="border-b border-encre/15"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg md:text-xl text-encre group-hover:text-bleu-majorelle transition-colors">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-full transition-all ${
                      isOpen
                        ? "bg-bleu-majorelle text-ivoire"
                        : "bg-bleu-majorelle/10 text-bleu-majorelle group-hover:bg-bleu-majorelle group-hover:text-ivoire"
                    }`}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-encre/75 leading-relaxed pb-6 max-w-2xl">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* La carte CTA "Prêt à franchir le seuil" a été extraite dans une
            section dédiée <Seuil /> placée juste avant le footer sur la home. */}
      </div>
    </section>
  );
}
