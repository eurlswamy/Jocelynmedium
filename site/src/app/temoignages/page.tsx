import { Seuil } from "@/components/sections/Seuil";
import { Footer } from "@/components/sections/Footer";
import { ArrowRight, Calendar, Play } from "lucide-react";
import { safeFetch, pick } from "@/lib/sanity";
import { getPageGlobale } from "@/lib/global-content";

// Contenu editorial (singleton "pageMedias"). Repli sur les textes en dur via
// pick / arrays par defaut si Sanity est vide ou hors-ligne.
const MEDIAS_QUERY = `*[_id == "pageMedias"][0]{
  surtitre, titre, titreItalique,
  medias[]{label, nom, description, frequence, lieu},
  videosSurtitre, videosTitre,
  videos[]{titre, description, lien},
  nationaleSurtitre, nationaleTitre, nationaleTitreItalique, nationaleDescription,
  distinctions[]{annee, label, lieu},
  labelCta1, labelCta2
}`;

type Media = { label?: string; nom?: string; description?: string; frequence?: string; lieu?: string };
type Distinction = { annee?: string; label?: string; lieu?: string };
type VideoEmission = { titre?: string; description?: string; lien?: string };

// Videos par defaut (lives et rediffusions Facebook de Jocelyn). Editables
// depuis le Studio ; le bloc ne s'affiche que s'il y a au moins une video
// avec un lien valide.
const VIDEOS_DEFAUT: VideoEmission[] = [
  {
    titre: "Jocelyn en direct à la télévision",
    description: "Émission en direct à revoir.",
    lien: "https://www.facebook.com/share/v/19EXTwkeGN/",
  },
  {
    titre: "Rediffusion : passage télévisé",
    description: "Un de ses passages à revoir.",
    lien: "https://www.facebook.com/share/v/1BQRfTSB5p/",
  },
  {
    titre: "Jocelyn à l'antenne",
    description: "Une autre émission à revoir.",
    lien: "https://www.facebook.com/share/v/1LJXM3pND9/",
  },
];

export const metadata = {
  title: "Médias & Presse · Jocelyn Amir",
  description:
    "Trente ans de présence médiatique. Télé Kréol, Kréol FM, distinctions nationales et présence à La Réunion depuis 2010.",
};

// Defauts en dur. Le champ `side` (position au-dessus/en-dessous de la timeline)
// reste non editorial : il est conserve par index meme si Sanity fournit les
// distinctions. Seuls year/label/lieu sont editables.
const DISTINCTIONS_DEFAUT = [
  { year: "1994", label: "Prix de la presse et des médias", lieu: "Marseille", side: "bottom" },
  { year: "1996", label: "Prix du public du meilleur voyant", lieu: "Grenoble", side: "top" },
  { year: "1997", label: "Prix du meilleur voyant médium", lieu: "Créteil", side: "bottom" },
  { year: "2000", label: "Festival de Cannes", lieu: "Cannes", side: "top" },
  { year: "2001", label: "2e Festival de Cannes", lieu: "Cannes", side: "bottom" },
];

export default async function MediasPressePage() {
  const p = await safeFetch<Record<string, unknown> | null>(MEDIAS_QUERY, null);
  const global = await getPageGlobale();

  const sanityMedias = (p?.medias as Media[] | undefined) ?? [];
  const m0 = sanityMedias[0] ?? {};
  const m1 = sanityMedias[1] ?? {};

  const sanityDist = (p?.distinctions as Distinction[] | undefined) ?? [];
  // On garde le `side` par index (mise en page non editoriale). Si Sanity
  // fournit plus d'entrees que de defauts, on alterne top/bottom.
  const DISTINCTIONS = (sanityDist.length > 0
    ? sanityDist.map((d, i) => ({
        year: pick(d.annee, DISTINCTIONS_DEFAUT[i]?.year ?? ""),
        label: pick(d.label, DISTINCTIONS_DEFAUT[i]?.label ?? ""),
        lieu: pick(d.lieu, DISTINCTIONS_DEFAUT[i]?.lieu ?? ""),
        side: DISTINCTIONS_DEFAUT[i]?.side ?? (i % 2 === 0 ? "bottom" : "top"),
      }))
    : DISTINCTIONS_DEFAUT);

  // Videos : on prend celles de Sanity si au moins une a un lien, sinon les
  // defauts. Seules les videos avec un lien non vide sont affichees.
  const sanityVideos = ((p?.videos as VideoEmission[] | undefined) ?? []).filter(
    (v) => (v?.lien ?? "").trim().length > 0
  );
  const videos = sanityVideos.length > 0 ? sanityVideos : VIDEOS_DEFAUT;

  return (
    <main className="bg-ivoire">

      {/* Agenda permanent - section éditoriale. Le fond sombre démarre tout en
          haut (pt pour dégager la navbar) afin d'éviter une bande claire visible. */}
      <section
        className="relative overflow-hidden pt-32 md:pt-40"
        style={{ background: "linear-gradient(160deg, #080F1E 0%, #0B1929 50%, #0D1E33 100%)" }}
      >
        {/* Orbes d'ambiance */}
        <div aria-hidden className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(201,169,97,0.06) 0%, transparent 65%)", transform: "translate(-30%, -30%)" }} />
        <div aria-hidden className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(27,122,143,0.07) 0%, transparent 65%)", transform: "translate(20%, 30%)" }} />

        {/* Eyebrow + titre */}
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 pb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-or-doux/50" />
            <p className="font-sans text-or-clair text-[9px] tracking-[0.6em] uppercase">{pick(p?.surtitre, "Agenda permanent")}</p>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-ivoire leading-tight tracking-tight">
            {pick(p?.titre, "Présence médiatique")}
            <span className="italic text-or-clair"> {pick(p?.titreItalique, "régulière.")}</span>
          </h2>
        </div>

        {/* 2 médias : présentation éditoriale en rangées (plus de cartes "glass") */}
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 pb-16 md:pb-20">

          {/* Télé Kréol */}
          <div className="group grid md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-10 py-8 border-t border-ivoire/10">
            <div className="flex items-center gap-5">
              <img src="/images/logo-tele-kreol.jpg" alt="Télé Kréol" className="h-12 w-auto object-contain shrink-0" style={{ mixBlendMode: "lighten" }} />
              <div>
                <p className="font-sans text-or-clair text-[10px] tracking-[0.32em] uppercase mb-1">{pick(m0.label, "Télévision")}</p>
                <p className="font-serif text-ivoire text-3xl leading-none">{pick(m0.nom, "Télé Kréol")}</p>
              </div>
            </div>

            <p className="font-sans text-ivoire/60 text-sm leading-relaxed max-w-md">
              {pick(m0.description, "En direct depuis 2010, Jocelyn répond aux questions des téléspectateurs réunionnais sur la médiumnité et la voyance.")}
            </p>

            <div className="md:text-right md:border-l md:border-ivoire/10 md:pl-10">
              <p className="font-serif italic text-or-clair text-lg leading-tight">{pick(m0.frequence, "Chaque mercredi")}</p>
              <p className="font-sans text-ivoire/55 text-sm tabular-nums mt-0.5">{pick(m0.lieu, "19h30, La Réunion")}</p>
            </div>
          </div>

          {/* Kréol FM */}
          <div className="group grid md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-10 py-8 border-t border-b border-ivoire/10">
            <div className="flex items-center gap-5">
              <img src="/images/logo-kreol-fm.jpg" alt="Kréol FM" className="h-12 w-auto object-contain shrink-0" style={{ mixBlendMode: "lighten" }} />
              <div>
                <p className="font-sans text-[10px] tracking-[0.32em] uppercase mb-1" style={{ color: "#7DD3E8" }}>{pick(m1.label, "Radio")}</p>
                <p className="font-serif text-ivoire text-3xl leading-none">{pick(m1.nom, "Kréol FM")}</p>
              </div>
            </div>

            <p className="font-sans text-ivoire/60 text-sm leading-relaxed max-w-md">
              {pick(m1.description, "Des émissions consacrées à la spiritualité, aux traditions réunionnaises et à la voyance.")}
            </p>

            <div className="md:text-right md:border-l md:border-ivoire/10 md:pl-10">
              <p className="font-serif italic text-lg leading-tight" style={{ color: "#7DD3E8" }}>{pick(m1.frequence, "Interventions régulières")}</p>
              <p className="font-sans text-ivoire/55 text-sm mt-0.5">{pick(m1.lieu, "La Réunion")}</p>
            </div>
          </div>
        </div>

        <div aria-hidden className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux/30 to-transparent" />
      </section>

      {/* Emissions a revoir : cartes liees aux videos Facebook (preuve sociale).
          Liens ouverts dans un nouvel onglet, aucun script tiers charge. */}
      <section className="bg-ivoire py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-sans text-xs tracking-[0.45em] uppercase text-encre/40 mb-3">
              {pick(p?.videosSurtitre as string | undefined, "À revoir en vidéo")}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-encre leading-tight">
              {pick(p?.videosTitre as string | undefined, "Jocelyn à la télévision")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((v, i) => (
              <a
                key={i}
                href={v.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-2xl overflow-hidden border border-encre/12 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-bleu-majorelle/40 hover:shadow-xl"
              >
                {/* Vignette : bandeau couleur + bouton lecture (pas de miniature
                    Facebook pour eviter tout script tiers). */}
                <div
                  className="relative aspect-video flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #1B7A8F 0%, #0B1929 100%)" }}
                >
                  <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play size={26} strokeWidth={1.8} className="text-ivoire ml-1" fill="currentColor" />
                  </span>
                  <span className="absolute top-3 left-3 font-sans text-[10px] tracking-[0.2em] uppercase text-ivoire/80 bg-black/25 rounded-full px-3 py-1">
                    Vidéo
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-serif text-lg text-encre leading-snug mb-1.5">
                    {v.titre || "Émission à revoir"}
                  </h3>
                  {v.description ? (
                    <p className="font-sans text-encre/60 text-sm leading-relaxed mb-4">
                      {v.description}
                    </p>
                  ) : null}
                  <span className="mt-auto inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.12em] uppercase text-bleu-majorelle">
                    Voir l&apos;émission
                    <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <p className="text-center font-sans text-encre/40 text-[11px] mt-6">
            Les vidéos s&apos;ouvrent sur Facebook dans un nouvel onglet.
          </p>
        </div>
      </section>

      {/* Festival de Cannes */}
      <section className="bg-ivoire py-14 md:py-18">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-sans text-xs tracking-[0.45em] uppercase text-encre/40 mb-3">{pick(p?.nationaleSurtitre, "Présence nationale")}</p>
              <h2 className="font-serif text-3xl md:text-4xl text-encre leading-tight mb-4">
                {pick(p?.nationaleTitre, "Du Festival de Cannes")}{" "}
                <span className="italic text-bleu-majorelle">{pick(p?.nationaleTitreItalique, "aux plateaux télé.")}</span>
              </h2>
              <p className="font-sans text-encre/65 text-base leading-relaxed mb-5">
                {pick(p?.nationaleDescription, "Présent au Festival de Cannes en 2000 et 2001, une reconnaissance nationale de sa pratique. Aujourd'hui, Jocelyn continue de passer régulièrement à la télévision.")}
              </p>
              <div className="flex items-center gap-3">
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-encre/40 px-3 py-1 border border-encre/15 rounded-full">2000</span>
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-encre/40 px-3 py-1 border border-encre/15 rounded-full">2001</span>
              </div>
            </div>
            {/* Photo : Jocelyn à la télévision (cohérent avec « passe à la télé ») */}
            <figure className="m-0">
              <div
                className="relative overflow-hidden rounded-2xl aspect-video"
                style={{ border: "1px solid rgba(201,169,97,0.35)", boxShadow: "0 24px 60px -20px rgba(11,25,41,0.45)" }}
              >
                <img
                  src="/images/jocelyn-le1hoo.jpeg"
                  alt="Jocelyn Amir sur le plateau de l'émission Le 1Hoo"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(250,246,238,0.08)" }} />
              </div>
              <figcaption className="font-sans text-xs tracking-[0.2em] uppercase text-encre/40 mt-3 text-center">
                Sur le plateau · « Le 1Hoo »
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Distinctions - timeline horizontale */}
      <section
        className="relative py-16 md:py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0B1929 0%, #1A2847 100%)" }}
      >
        <div aria-hidden className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-40" />

        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-14">
            <span className="h-px w-8 bg-or-doux/60" />
            <p className="font-sans text-xs tracking-[0.45em] uppercase text-or-clair">Distinctions</p>
          </div>

          {/* Timeline horizontale sur desktop */}
          <div className="hidden md:block">
            {/* Textes AU-DESSUS */}
            <div className="grid grid-cols-5 gap-0 mb-0">
              {DISTINCTIONS.map(({ year, label, lieu, side }) => (
                <div key={"top-" + year} className="flex flex-col items-center">
                  {side === "top" ? (
                    <div className="text-center px-2 pb-4">
                      <p className="font-sans text-ivoire text-sm leading-snug mb-0.5">{label}</p>
                      <p className="font-sans text-ivoire/40 text-[10px]">{lieu}</p>
                    </div>
                  ) : (
                    <div className="pb-4 invisible">
                      <p className="text-sm">x</p>
                      <p className="text-xs">x</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Ligne + ronds : la ligne passe pile au centre des ronds */}
            <div className="relative h-3">
              {/* Ligne horizontale, centrée verticalement sur les ronds */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-or-doux/35" />

              <div className="relative grid grid-cols-5 gap-0 w-full h-full">
                {DISTINCTIONS.map(({ year }) => (
                  <div key={"dot-" + year} className="relative flex items-center justify-center">
                    <div className="relative z-10">
                      <div className="w-3 h-3 rounded-full bg-or-doux" />
                      <div className="absolute -inset-1.5 rounded-full border border-or-doux/35" />
                    </div>
                    {/* Année positionnée sous le rond, sans décaler la ligne */}
                    <p className="absolute top-[calc(100%+0.5rem)] font-sans font-semibold text-or-clair text-[10px] tracking-wider tabular-nums">{year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Textes EN DESSOUS */}
            <div className="grid grid-cols-5 gap-0 mt-0">
              {DISTINCTIONS.map(({ year, label, lieu, side }) => (
                <div key={"bot-" + year} className="flex flex-col items-center">
                  {side === "bottom" ? (
                    <div className="text-center px-2 pt-9">
                      <p className="font-sans text-ivoire text-sm leading-snug mb-0.5">{label}</p>
                      <p className="font-sans text-ivoire/40 text-[10px]">{lieu}</p>
                    </div>
                  ) : (
                    <div className="pt-9 invisible">
                      <p className="text-sm">x</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Version mobile - verticale */}
          <div className="md:hidden relative pl-8">
            <div className="absolute left-2.5 top-0 bottom-0 w-px bg-or-doux/25" />
            <div className="flex flex-col gap-7">
              {DISTINCTIONS.map(({ year, label, lieu }) => (
                <div key={year + label} className="relative">
                  <div className="absolute -left-[22px] top-1 w-2.5 h-2.5 rounded-full bg-or-doux" />
                  <p className="font-sans font-semibold text-or-clair text-[10px] tracking-wider mb-2">{year}</p>
                  <p className="font-sans text-ivoire text-base leading-snug">{label}</p>
                  <p className="font-sans text-ivoire/40 text-xs mt-1">{lieu}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col sm:flex-row gap-3">
            <a href="/a-propos" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans text-xs tracking-[0.22em] uppercase font-medium bg-or-doux text-encre hover:bg-or-clair transition-colors">
              <span>{pick(p?.labelCta1, "Mon parcours complet")}</span>
              <ArrowRight size={13} strokeWidth={2} />
            </a>
            <a href="/reserver" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans text-xs tracking-[0.22em] uppercase border border-ivoire/35 text-ivoire hover:border-or-doux/70 transition-colors">
              <Calendar size={13} strokeWidth={2} />
              <span>{pick(p?.labelCta2, "Réserver")}</span>
            </a>
          </div>
        </div>
        <div aria-hidden className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-40" />
      </section>

      <Seuil content={global.seuil} />
      <Footer content={global.footer} />
    </main>
  );
}
