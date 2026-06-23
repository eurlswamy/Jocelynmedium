"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Heart, ArrowRight, Check, Calendar, Repeat } from "lucide-react";

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  {
    id: "cabinet",
    Icon: MapPin,
    eyebrow: "Au cabinet ou à distance",
    title: "Une heure",
    duration: "1 heure",
    price: "120",
    hook: "La consultation complète : au cabinet à Saint-Clotilde ou à distance, au même tarif. Les quatre méthodes combinées, sans précipitation.",
    features: [
      "Au cabinet à Saint-Clotilde ou à distance",
      "Clairvoyance, clairaudience, tirage, support",
      "Photos, courriers, objets bienvenus",
    ],
    reserveHref: "/reserver/au-cabinet",
    featured: true,
    accentHex: "#C9A961",
    tag: "Recommandé",
  },
  {
    id: "distance",
    Icon: Phone,
    eyebrow: "Par téléphone · partout",
    title: "30 minutes",
    duration: "30 min",
    price: "85",
    hook: "Une séance condensée, uniquement par téléphone. Depuis La Réunion, l'Île Maurice, la métropole ou n'importe où.",
    features: [
      "Consultation par téléphone uniquement",
      "Mêmes méthodes que le cabinet, en condensé",
      "Idéal pour les emplois du temps chargés",
    ],
    reserveHref: "/reserver/a-distance",
    featured: false,
    accentHex: "#1B7A8F",
    tag: null,
  },
  {
    id: "coaching",
    Icon: Heart,
    eyebrow: "Accompagnement personnel",
    title: "Coaching de vie",
    duration: "Sur mesure",
    price: null,
    hook: "Un suivi personnalisé pour surmonter les obstacles, retrouver confiance en soi et avancer vers vos objectifs.",
    features: [
      "Écoute active et empathique, sans jugement",
      "Estime de soi, reconversion, relations",
      "Complément aux consultations de voyance",
    ],
    reserveHref: "/contact",
    featured: false,
    accentHex: "#C57B5C",
    tag: "Nouveau",
  },
  {
    id: "regulier",
    Icon: Repeat,
    eyebrow: "Suivi dans la durée",
    title: "Séances régulières",
    duration: "Sur mesure",
    price: null,
    hook: "Vous souhaitez consulter plusieurs fois dans l'année ? Bénéficiez d'un tarif préférentiel pour un accompagnement suivi.",
    features: [
      "Tarif préférentiel sur vos consultations",
      "Formule au cabinet ou à distance",
      "Devis personnalisé selon votre rythme",
    ],
    reserveHref: "/contact",
    featured: false,
    accentHex: "#7DB5C7",
    tag: null,
  },
];

// Contenu editable injecte depuis Sanity (singleton "pageServices").
// Tous les champs sont optionnels : repli sur les defauts ci-dessus.
export type ServicesContent = {
  surtitre?: string;
  titre?: string;
  titreItalique?: string;
  description?: string;
  formules?: {
    surtitre?: string;
    titre?: string;
    duree?: string;
    prix?: string;
    accroche?: string;
    features?: string[];
    tag?: string;
    labelCta?: string;
  }[];
};

function val(value: string | undefined, fallback: string): string {
  return value && value.trim().length > 0 ? value : fallback;
}

export function Services({ compact = false, content }: { compact?: boolean; content?: ServicesContent } = {}) {
  const services = SERVICES.map((s, i) => {
    const f = content?.formules?.[i];
    const features = Array.isArray(f?.features) && f.features.filter((x) => typeof x === "string" && x.trim().length > 0).length > 0
      ? f.features
      : s.features;
    return {
      ...s,
      eyebrow: val(f?.surtitre, s.eyebrow),
      title: val(f?.titre, s.title),
      duration: val(f?.duree, s.duration),
      price: s.price === null ? (f?.prix && f.prix.trim().length > 0 ? f.prix : null) : val(f?.prix, s.price),
      hook: val(f?.accroche, s.hook),
      features,
      tag: s.tag === null ? (f?.tag && f.tag.trim().length > 0 ? f.tag : null) : val(f?.tag, s.tag),
      labelCta: f?.labelCta && f.labelCta.trim().length > 0 ? f.labelCta : null,
    };
  });
  return (
    <section
      id="services"
      className="relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-28"
      style={{ background: "linear-gradient(180deg, #0B1929 0%, #111E35 50%, #0B1929 100%)" }}
    >
      <div aria-hidden className="absolute inset-0 z-0 opacity-25" style={{ backgroundImage: "url('/images/oasis-cosmique-desktop.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div aria-hidden className="absolute inset-0 z-0" style={{ background: "rgba(11,25,41,0.72)" }} />
      <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux/60 to-transparent z-10" />
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux/60 to-transparent z-10" />

      <div className="relative z-10 max-w-[88rem] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-or-doux/60" />
            <p className="text-or-clair font-sans text-xs tracking-[0.45em] uppercase">{val(content?.surtitre, "Formules de consultation")}</p>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivoire leading-tight tracking-tight">
            {val(content?.titre, "Plusieurs façons de")}{" "}
            <span className="italic text-or-clair">{val(content?.titreItalique, "vous accompagner.")}</span>
          </h2>
          {!compact && (
            <p className="font-sans text-ivoire/85 text-base mt-4 max-w-xl">
              {val(content?.description, "Paiement sécurisé en ligne · Confirmation sous 24h · Annulation jusqu'à 24h avant")}
            </p>
          )}
        </motion.div>

        {/* Grille 3 cartes style pricing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-stretch">
          {services.map((s, i) => {
            const Icon = s.Icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE_LUXE, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-3xl mt-4 ${s.featured ? "scale-[1.02] md:scale-105 z-10" : ""}`}
                style={{
                  background: s.featured
                    ? "linear-gradient(160deg, #1E2A46 0%, #131E38 100%)"
                    : "linear-gradient(160deg, rgba(20,28,46,0.95) 0%, rgba(12,20,36,0.92) 100%)",
                  border: s.featured
                    ? "2px solid rgba(255,255,255,0.90)"
                    : "2px solid rgba(255,255,255,0.55)",
                  boxShadow: s.featured
                    ? "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)"
                    : "0 10px 40px -15px rgba(0,0,0,0.5)",
                }}
              >
                {/* Shimmer top */}
                <div aria-hidden className="absolute top-0 inset-x-0 h-px rounded-t-3xl" style={{ background: `linear-gradient(90deg, transparent, ${s.accentHex}60, transparent)` }} />

                {/* Tag badge */}
                {s.tag && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <span
                      className="inline-flex items-center justify-center h-7 px-4 rounded-full font-sans text-[9px] tracking-[0.3em] uppercase font-semibold leading-none"
                      style={
                        s.featured
                          ? {
                              background: "linear-gradient(135deg, #14233E 0%, #0B1929 100%)",
                              color: "#E8C77A",
                              border: "1px solid rgba(201,169,97,0.6)",
                              boxShadow: "0 4px 16px -4px rgba(201,169,97,0.45)",
                            }
                          : { background: s.accentHex, color: "#FAF6EE" }
                      }
                    >
                      {s.tag}
                    </span>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-7 md:p-8 pt-10">
                  {/* Icone : fond plein couleur accent pour rester bien visible sur mobile */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: s.accentHex,
                      boxShadow: `0 10px 28px -10px ${s.accentHex}CC`,
                    }}
                  >
                    <Icon size={24} strokeWidth={1.8} style={{ color: "#FAF6EE" }} />
                  </div>

                  {/* Eyebrow - badge blanc */}
                  <div className="inline-flex mb-2">
                    <span
                      className="font-sans text-[9px] tracking-[0.32em] uppercase px-2.5 py-1 rounded"
                      style={{ background: "rgba(255,255,255,0.95)", color: s.accentHex, fontWeight: 600 }}
                    >
                      {s.eyebrow}
                    </span>
                  </div>

                  {/* Titre */}
                  <h3 className="font-serif text-2xl md:text-3xl text-ivoire leading-tight mb-3">
                    {s.title}
                  </h3>

                  {/* Prix */}
                  <div className="flex items-baseline gap-1 mb-5 pb-5 border-b border-ivoire/10">
                    {s.price ? (
                      <>
                        <span className="font-sans font-semibold text-4xl md:text-5xl text-ivoire tabular-nums leading-none">
                          {s.price}
                        </span>
                        <span className="font-sans text-xl mb-1" style={{ color: `${s.accentHex}99` }}>€</span>
                        <span className="font-sans text-ivoire/80 text-xs ml-1 font-medium">{s.duration}</span>
                      </>
                    ) : (
                      <span className="font-serif italic text-ivoire text-xl">Sur devis</span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="font-sans text-ivoire text-sm leading-relaxed mb-5 font-medium">
                    {s.hook}
                  </p>

                  {/* Features */}
                  <ul className="flex flex-col gap-2 mb-8 flex-1">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13px] text-ivoire font-sans font-medium">
                        <Check size={13} strokeWidth={2.5} className="shrink-0 mt-0.5" style={{ color: s.accentHex }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={s.reserveHref}
                    className="group/cta flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-sans text-xs tracking-[0.2em] uppercase font-medium transition-all"
                    style={
                      s.featured
                        ? { background: s.accentHex, color: "#1C1C1C" }
                        : { background: "rgba(255,255,255,0.95)", color: s.accentHex }
                    }
                  >
                    <Calendar size={12} strokeWidth={2} />
                    <span>{val(s.labelCta ?? undefined, s.price === null ? "Nous contacter" : "Réserver en ligne")}</span>
                    <ArrowRight size={11} className="transition-transform group-hover/cta:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
