import Link from "next/link";
import { ChevronLeft, Check, Phone } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { PaymentButton } from "@/components/reservation/PaymentButton";
import { DelaiBanner } from "@/components/reservation/DelaiBanner";
import { safeFetch, pick } from "@/lib/sanity";
import { getPageGlobale } from "@/lib/global-content";

const ACCENT = "#1B7A8F";

// Contenu editorial (singleton "pageReserverDistance"). Repli sur les textes
// en dur via pick si Sanity est vide ou hors-ligne.
const DISTANCE_QUERY = `*[_id == "pageReserverDistance"][0]{
  surtitre, titre, descriptionPaiement, labelFormule, detailFormule, features[], prix
}`;

export const metadata = {
  title: "Réserver à distance · Jocelyn Amir",
  description:
    "Consultation à distance de 30 minutes par téléphone avec Jocelyn Amir. Depuis La Réunion, Maurice, la métropole ou n'importe où. 85€.",
};


export default async function ADistancePage() {
  const p = await safeFetch<Record<string, unknown> | null>(DISTANCE_QUERY, null);
  const global = await getPageGlobale();
  const prix = typeof p?.prix === "number" ? (p.prix as number) : 85;
  const features = (p?.features as string[] | undefined) ?? [];
  const featuresList = features.length > 0 ? features : [
    "Consultation de 30 minutes par téléphone",
    "Jocelyn vous appelle à l'heure du rendez-vous",
    "Mêmes méthodes que le cabinet, en condensé",
    "Aucun déplacement, où que vous soyez",
  ];
  return (
    <main className="bg-ivoire">
      {/* On arrive directement sur le formulaire (pas de grande section d'intro) */}
      <section className="relative bg-ivoire pt-24 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-6 md:px-12">
          <Link
            href="/reserver"
            className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-[0.2em] uppercase text-encre/55 hover:text-encre transition-colors mb-8"
          >
            <ChevronLeft size={14} strokeWidth={2} />
            Changer de formule
          </Link>

          {/* Bandeau délai d'attente actuel */}
          <DelaiBanner />

          {/* Carte paiement */}
          <div
            className="rounded-3xl border bg-ivoire p-7 md:p-9 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.18)]"
            style={{ borderColor: `${ACCENT}40` }}
          >
            <div aria-hidden className="h-1 rounded-full mb-7" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
            <p className="font-sans text-[10.5px] tracking-[0.3em] uppercase mb-2" style={{ color: ACCENT }}>
              {pick(p?.surtitre, "Réservation · 30 minutes par téléphone")}
            </p>
            <h1 className="font-serif text-2xl md:text-3xl text-encre leading-tight mb-2">
              {pick(p?.titre, "Confirmez et réglez votre séance")}
            </h1>
            <p className="font-sans text-encre/60 text-sm mb-7">
              {pick(p?.descriptionPaiement, "Le paiement sécurisé valide votre rendez-vous. Vous indiquez vos coordonnées au moment du règlement, Jocelyn vous appelle à l'heure convenue.")}
            </p>

            <div
              className="flex items-center justify-between gap-4 py-4 px-5 rounded-2xl mb-6 border"
              style={{ borderColor: `${ACCENT}28`, backgroundColor: `${ACCENT}08` }}
            >
              <div className="min-w-0">
                <p className="font-sans text-[9px] tracking-[0.3em] uppercase mb-0.5" style={{ color: ACCENT }}>
                  Formule sélectionnée
                </p>
                <p className="font-serif text-encre text-lg">
                  {pick(p?.labelFormule, "Par téléphone")}{" "}
                  <span className="font-sans text-encre/55 text-sm ml-1">{pick(p?.detailFormule, "(30 minutes)")}</span>
                </p>
              </div>
              <div className="flex items-baseline gap-1 shrink-0">
                <span className="font-sans font-semibold text-3xl tabular-nums leading-none" style={{ color: ACCENT }}>{prix}</span>
                <span className="font-sans text-base text-encre/65">€</span>
              </div>
            </div>

            <PaymentButton formuleSlug="a-distance" priceEur={prix} accentHex={ACCENT} />
          </div>

          {/* Récapitulatif du service, en dessous */}
          <div
            className="relative mt-8 rounded-3xl border bg-encre text-ivoire p-7 md:p-9 overflow-hidden"
            style={{ borderColor: "rgba(27,122,143,0.45)", boxShadow: "0 30px 80px -25px rgba(0,0,0,0.45)" }}
          >
            <span aria-hidden className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-bleu-chefchaouen via-bleu-majorelle to-bleu-cosmique rounded-l-3xl" />

            <div className="flex items-center justify-between gap-3 sm:gap-4 mb-5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-bleu-chefchaouen/15 flex items-center justify-center text-bleu-chefchaouen shrink-0">
                  <Phone size={18} strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-[9px] tracking-[0.16em] sm:text-[10px] sm:tracking-[0.3em] uppercase text-bleu-chefchaouen mb-0.5">Téléphone · Partout</p>
                  <h2 className="font-serif text-xl sm:text-2xl text-ivoire leading-tight whitespace-nowrap">{pick(p?.labelFormule, "30 minutes")}</h2>
                </div>
              </div>
              <div className="flex items-baseline gap-1 shrink-0">
                <span className="font-sans font-semibold text-3xl sm:text-4xl text-ivoire leading-none tabular-nums">{prix}</span>
                <span className="font-sans text-lg sm:text-xl text-or-doux/80">€</span>
              </div>
            </div>

            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-[13px] text-ivoire/90">
              {featuresList.map((item) => (
                <li key={item} className="flex gap-2.5 items-start">
                  <span className="relative shrink-0 mt-1 w-3.5 h-3.5">
                    <span aria-hidden className="absolute inset-0 rounded-full bg-bleu-chefchaouen/15" />
                    <span className="relative w-full h-full flex items-center justify-center text-bleu-chefchaouen">
                      <Check size={8} strokeWidth={3} />
                    </span>
                  </span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer content={global.footer} />
    </main>
  );
}
