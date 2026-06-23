import Link from "next/link";
import { ChevronLeft, Check, MapPin } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { PaymentButton } from "@/components/reservation/PaymentButton";
import { DelaiBanner } from "@/components/reservation/DelaiBanner";
import { safeFetch, pick } from "@/lib/sanity";
import { getPageGlobale } from "@/lib/global-content";

const ACCENT = "#C9A961";

// Contenu editorial (singleton "pageReserverCabinet"). Repli sur les textes
// en dur via pick si Sanity est vide ou hors-ligne.
const CABINET_QUERY = `*[_id == "pageReserverCabinet"][0]{
  surtitre, titre, descriptionPaiement, labelFormule, detailFormule, features[], prix
}`;

export const metadata = {
  title: "Réserver une heure · Jocelyn Amir",
  description:
    "Réservez votre consultation d'une heure avec Jocelyn Amir : au cabinet à Saint-Clotilde ou à distance, au même tarif. Quatre méthodes combinées. 120€.",
};

export default async function AuCabinetPage() {
  const p = await safeFetch<Record<string, unknown> | null>(CABINET_QUERY, null);
  const global = await getPageGlobale();
  const prix = typeof p?.prix === "number" ? (p.prix as number) : 120;
  const features = (p?.features as string[] | undefined) ?? [];
  const featuresList = features.length > 0 ? features : [
    "Quatre méthodes combinées en une seule séance",
    "Au cabinet à Saint-Clotilde ou à distance",
    "Photos, courriers ou objets bienvenus",
    "Récap oral à la fin de la séance",
  ];
  return (
    <main className="bg-ivoire">
      {/* On arrive directement sur l'étape de paiement (pas de grande intro) */}
      <section className="relative bg-ivoire pt-24 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="relative max-w-2xl mx-auto px-6 md:px-12">
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
              {pick(p?.surtitre, "Réservation · Une heure")}
            </p>
            <h1 className="font-serif text-2xl md:text-3xl text-encre leading-tight mb-2">
              {pick(p?.titre, "Confirmez et réglez votre séance")}
            </h1>
            <p className="font-sans text-encre/60 text-sm mb-7">
              {pick(p?.descriptionPaiement, "Le paiement sécurisé valide définitivement votre rendez-vous. Vous indiquez vos coordonnées au moment du règlement et précisez si la séance a lieu au cabinet ou à distance.")}
            </p>

            {/* Récap formule, juste au-dessus du bouton */}
            <div
              className="flex items-center justify-between gap-4 py-4 px-5 rounded-2xl mb-6 border"
              style={{ borderColor: `${ACCENT}28`, backgroundColor: `${ACCENT}08` }}
            >
              <div className="min-w-0">
                <p className="font-sans text-[9px] tracking-[0.3em] uppercase mb-0.5" style={{ color: ACCENT }}>
                  Formule sélectionnée
                </p>
                <p className="font-serif text-encre text-lg">
                  {pick(p?.labelFormule, "Une heure")}{" "}
                  <span className="font-sans text-encre/55 text-sm ml-1">{pick(p?.detailFormule, "(cabinet ou à distance)")}</span>
                </p>
              </div>
              <div className="flex items-baseline gap-1 shrink-0">
                <span className="font-sans font-semibold text-3xl tabular-nums leading-none" style={{ color: ACCENT }}>{prix}</span>
                <span className="font-sans text-base text-encre/65">€</span>
              </div>
            </div>

            <PaymentButton formuleSlug="au-cabinet" priceEur={prix} accentHex={ACCENT} />
          </div>

          {/* Récapitulatif du service, en dessous */}
          <div
            className="relative mt-8 rounded-3xl border bg-encre text-ivoire p-7 md:p-9 overflow-hidden"
            style={{ borderColor: "rgba(201,169,97,0.40)", boxShadow: "0 30px 80px -25px rgba(0,0,0,0.45)" }}
          >
            <span aria-hidden className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-or-clair via-or-doux to-cuivre rounded-l-3xl" />

            <div className="flex items-center justify-between gap-3 sm:gap-4 mb-5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-or-doux/15 flex items-center justify-center text-or-clair shrink-0">
                  <MapPin size={18} strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-[9px] tracking-[0.16em] sm:text-[10px] sm:tracking-[0.3em] uppercase text-or-clair mb-0.5">Au cabinet ou à distance</p>
                  <h2 className="font-serif text-xl sm:text-2xl text-ivoire leading-tight whitespace-nowrap">{pick(p?.labelFormule, "Une heure")}</h2>
                </div>
              </div>
              <div className="flex items-baseline gap-1 shrink-0">
                <span className="font-sans font-semibold text-3xl sm:text-4xl text-or-clair leading-none tabular-nums">{prix}</span>
                <span className="font-sans text-lg sm:text-xl text-or-doux/80">€</span>
              </div>
            </div>

            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-[13px] text-ivoire/90">
              {featuresList.map((item) => (
                <li key={item} className="flex gap-2.5 items-start">
                  <span className="relative shrink-0 mt-1 w-3.5 h-3.5">
                    <span aria-hidden className="absolute inset-0 rounded-full bg-or-doux/15" />
                    <span className="relative w-full h-full flex items-center justify-center text-or-clair">
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
