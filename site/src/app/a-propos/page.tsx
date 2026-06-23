import Image from "next/image";
import { Seuil } from "@/components/sections/Seuil";
import { Footer } from "@/components/sections/Footer";
import { Users, Target, Brain } from "lucide-react";
import { safeFetch } from "@/lib/sanity";
import { getPageGlobale } from "@/lib/global-content";

export const metadata = {
  title: "À propos · Jocelyn Amir, médium voyant & coach à La Réunion",
  description:
    "Plus jeune médium de France à 23 ans. Trente ans de carrière médiatique entre Marseille, Paris, Cannes et La Réunion.",
};

// Defauts en dur : le site ne se vide jamais. Seuls les textes sont editables ;
// icones, couleurs d'accent et image de portrait restent cote code.
const FRISE = [
  { year: "1994", label: "Début · Prix presse à Marseille" },
  { year: "1996", label: "Prix meilleur voyant · Grenoble" },
  { year: "1997", label: "Prix meilleur voyant médium · Créteil" },
  { year: "2000", label: "Festival de Cannes · deux éditions" },
  { year: "2010+", label: "Émission hebdo · Télé Kréol" },
  { year: "Aujourd'hui", label: "Médium & coach · Saint-Clotilde" },
];

const BIO_PARAGRAPHES = [
  "À 23 ans, prix de la presse et des médias à Marseille, plus jeune médium de France. Prix du meilleur voyant à Grenoble (1996), Prix du meilleur voyant médium à Créteil (1997), Festival de Cannes en 2000 et 2001.",
  "Montmartre, le Maroc, et finalement La Réunion. Trois mois après mon installation, les médias locaux m'ont contacté. Depuis : une émission hebdomadaire sur Télé Kréol et Kréol FM, chaque mercredi à 19h30, depuis quinze ans.",
];

const CROYANCES = [
  { titre: "Précision", texte: "Des éléments vérifiables, pas des banalités." },
  { titre: "Honnêteté", texte: "Je dis ce que je vois. Ni plus, ni moins." },
  { titre: "Liberté", texte: "Rien n'est figé. Vos choix restent les vôtres." },
];

const COACHING_PILLIERS = [
  {
    icon: Users,
    titre: "Écoute sans jugement",
    texte: "Chaque personne arrive avec son histoire. L'écoute active et l'empathie sont le fondement de tout accompagnement efficace.",
    accent: "#1B7A8F",
  },
  {
    icon: Target,
    titre: "Objectifs concrets",
    texte: "Confiance en soi, reconversion, relations, émotions : le coaching vise des résultats mesurables.",
    accent: "#C9A961",
  },
  {
    icon: Brain,
    titre: "Complémentaire à la voyance",
    texte: "Là où la consultation éclaire votre chemin, le coaching vous donne les outils pour l'emprunter.",
    accent: "#C57B5C",
  },
];

function val(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

// Contenu editorial de la page A propos, edite depuis le Studio Sanity
// (singleton "pageAPropos"). safeFetch renvoie null si Sanity est hors-ligne :
// chaque champ applique alors son repli sur le texte d'origine en dur.
// bioParagraphes et certains coachingPiliers.texte sont vides cote Sanity :
// le repli conserve les paragraphes d'origine.
const APROPOS_QUERY = `*[_id == "pageAPropos"][0]{
  frise, bioParagraphes, bioCitation, croyancesTitre,
  croyances[]{titre, texte},
  coachingSurtitre, coachingTitre, coachingTitreItalique, coachingDescription, coachingLabelCta,
  coachingPiliers[]{titre, texte}
}`;

export default async function AProposPage() {
  const data = await safeFetch<Record<string, unknown> | null>(APROPOS_QUERY, null);
  const global = await getPageGlobale();

  const friseSanity = data?.frise as { year?: string; label?: string }[] | undefined;
  const frise = FRISE.map((f, i) => ({
    year: val(friseSanity?.[i]?.year, f.year),
    label: val(friseSanity?.[i]?.label, f.label),
  }));

  const bioSanity = data?.bioParagraphes as string[] | undefined;
  const bioParagraphes =
    Array.isArray(bioSanity) && bioSanity.filter((x) => typeof x === "string" && x.trim().length > 0).length > 0
      ? bioSanity
      : BIO_PARAGRAPHES;

  const croyancesSanity = data?.croyances as { titre?: string; texte?: string }[] | undefined;
  const croyances = CROYANCES.map((c, i) => ({
    titre: val(croyancesSanity?.[i]?.titre, c.titre),
    texte: val(croyancesSanity?.[i]?.texte, c.texte),
  }));

  const piliersSanity = data?.coachingPiliers as { titre?: string; texte?: string }[] | undefined;
  const piliers = COACHING_PILLIERS.map((p, i) => ({
    ...p,
    titre: val(piliersSanity?.[i]?.titre, p.titre),
    texte: val(piliersSanity?.[i]?.texte, p.texte),
  }));

  return (
    <main className="bg-ivoire">

      {/* Spacer navbar */}
      <div className="h-20" />

      {/* Bio */}
      <section className="relative bg-ivoire py-16 md:py-20 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Photo + frise */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] max-w-[160px] md:max-w-[220px] mx-auto lg:mx-0">
                <div className="absolute -inset-2 border border-or-doux/40" />
                <Image
                  src="/images/jocelyn-portrait.jpg"
                  alt="Portrait de Jocelyn Amir, médium voyant à La Réunion"
                  fill
                  className="object-cover relative z-10"
                  sizes="(max-width: 640px) 160px, (max-width: 1024px) 220px, 30vw"
                />
              </div>

              <div className="mt-8 space-y-2.5">
                {frise.map(({ year, label }) => (
                  <div key={year} className="flex gap-3 items-start">
                    <span className="shrink-0 font-sans font-medium text-[10px] tracking-wide text-or-doux w-16 pt-0.5">{year}</span>
                    <span className="font-sans text-encre/60 text-[12px] leading-snug">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Texte bio */}
            <div className="lg:col-span-8 space-y-4 font-sans text-encre/70 leading-relaxed text-sm md:text-base">
              <p className="font-serif text-xl md:text-2xl italic text-bleu-majorelle leading-tight">
                Ma carrière médiatique a débuté en <span className="not-italic font-sans font-medium">1994</span>.
              </p>
              {bioParagraphes.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              <p className="font-serif italic text-lg text-encre">
                «&nbsp;{val(data?.bioCitation, "On n'échappe pas à son destin médiatique.")}&nbsp;»
              </p>

              <div className="pt-4 border-t border-encre/10">
                <p className="font-sans text-xs tracking-[0.4em] uppercase text-bleu-majorelle mb-4">{val(data?.croyancesTitre, "Ce en quoi je crois")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {croyances.map(({ titre, texte }) => (
                    <div key={titre} className="p-4 bg-sable/30 rounded-xl">
                      <p className="font-serif text-base text-encre mb-1">{titre}</p>
                      <p className="font-sans text-encre/55 text-xs leading-relaxed">{texte}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching de vie - version courte */}
      <section className="relative py-14 md:py-18 overflow-hidden" style={{ backgroundColor: "var(--color-blanc-casse)" }}>
        <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-40" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            <div>
              <p className="font-sans text-xs tracking-[0.45em] uppercase text-terre-cuite mb-4">{val(data?.coachingSurtitre, "Une démarche complémentaire")}</p>
              <h2 className="font-serif text-3xl md:text-4xl text-encre leading-tight tracking-tight mb-5">
                {val(data?.coachingTitre, "Coach de vie &")}{" "}
                <span className="italic text-terre-cuite">{val(data?.coachingTitreItalique, "développement personnel.")}</span>
              </h2>
              <p className="font-sans text-encre/65 leading-relaxed text-sm md:text-base mb-6">
                {val(data?.coachingDescription, "À la suite de nombreuses demandes, j'ai formalisé un accompagnement que j'exerçais déjà naturellement. Le coaching de vie, en complément de la voyance : confiance en soi, reconversion, relations, gestion des émotions.")}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-medium bg-terre-cuite text-ivoire hover:opacity-90 transition-opacity"
              >
                {val(data?.coachingLabelCta, "Nous contacter")}
              </a>
            </div>

            {/* Piliers - 3 items sobres sans numérotation */}
            <div className="flex flex-col gap-0">
              {piliers.map(({ titre, texte, accent }) => (
                <div key={titre} className="flex items-start gap-5 py-5 border-b border-encre/8 last:border-0">
                  <div className="shrink-0 w-1 h-full min-h-[3rem] self-stretch rounded-full" style={{ background: `${accent}50` }} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-semibold text-sm text-encre mb-1 tracking-wide">{titre}</h3>
                    <p className="font-sans text-encre/55 text-sm leading-relaxed">{texte}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Seuil content={global.seuil} />
      <Footer content={global.footer} />
    </main>
  );
}
