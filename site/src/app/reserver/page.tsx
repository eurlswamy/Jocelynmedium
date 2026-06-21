import Link from "next/link";
import { ArrowRight, Calendar, Check, MapPin, Mail, Phone, Repeat } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { Seuil } from "@/components/sections/Seuil";
import { DelaiBanner } from "@/components/reservation/DelaiBanner";

export const metadata = {
  title: "Réserver · Jocelyn Amir",
  description:
    "Réservez votre consultation en ligne avec Jocelyn Amir. Une heure au cabinet ou à distance, ou 30 minutes par téléphone. Paiement sécurisé, confirmation sous 24h.",
};

export default function ReserverPage() {
  return (
    <main className="bg-ivoire">
      <section className="relative bg-ivoire pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 md:px-12">

          {/* Titre compact */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-or-doux/60" />
              <p className="font-sans text-or-doux text-[11px] tracking-[0.45em] uppercase">Réservation en ligne</p>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-encre leading-tight tracking-tight">
              Choisissez votre{" "}
              <span className="italic text-or-doux">formule.</span>
            </h1>
          </div>

          {/* Bandeau délai d'attente actuel */}
          <DelaiBanner />

          {/* Bandeau info réservation en ligne uniquement */}
          <div className="flex items-start gap-3 p-4 rounded-xl mb-10 bg-or-doux/10 border border-or-doux/30">
            <Calendar size={16} strokeWidth={1.5} className="text-or-doux shrink-0 mt-0.5" />
            <p className="font-sans text-encre/75 text-sm leading-relaxed">
              <strong className="font-medium text-encre">La réservation se fait exclusivement en ligne.</strong>{" "}
              Les messages et appels ne permettent pas de bloquer un créneau. Choisissez votre formule ci-dessous pour accéder au formulaire et au paiement sécurisé.
            </p>
          </div>

          {/* 2 formules */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">

            {/* Cabinet */}
            <Link
              href="/reserver/au-cabinet"
              className="group relative flex flex-col p-7 lg:p-9 overflow-hidden border border-or-doux/55 rounded-3xl bg-encre text-ivoire shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] hover:shadow-[0_40px_100px_-20px_rgba(201,169,97,0.35)] transition-all duration-500"
            >
              <span aria-hidden className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-or-clair via-or-doux to-cuivre rounded-l-3xl" />

              <div className="absolute top-5 right-5 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-or-doux/15 backdrop-blur-sm border border-or-doux/45">
                <span className="font-sans text-or-clair text-[9.5px] tracking-[0.28em] uppercase font-medium">Recommandé</span>
              </div>

              <div className="relative w-14 h-14 mb-5">
                <div aria-hidden className="absolute inset-0 rounded-full border border-or-doux/40" />
                <div className="absolute inset-1 rounded-full bg-or-doux/15 flex items-center justify-center text-or-clair">
                  <MapPin size={20} strokeWidth={1.5} />
                </div>
              </div>

              <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-2 text-or-clair">Au cabinet ou à distance</p>
              <h2 className="font-serif text-3xl lg:text-4xl mb-4 text-ivoire">Une heure</h2>
              <p className="font-sans text-ivoire/85 text-[14px] leading-relaxed mb-6">
                Une heure complète, dans mon bureau zen à Saint-Clotilde ou à distance, au même tarif. Les quatre méthodes combinées sans précipitation.
              </p>

              <ul className="space-y-2 mb-7 text-[13px] text-ivoire/90 flex-1">
                {[
                  "Consultation d'une heure pleine, au cabinet ou à distance",
                  "Quatre méthodes combinées en une séance",
                  "Photos, courriers ou objets bienvenus",
                  "Récap oral à la fin de la séance",
                ].map((item) => (
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

              <div className="flex items-end justify-between pt-5 mb-6 border-t border-ivoire/15">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] text-ivoire/55 uppercase mb-1">Durée</p>
                  <p className="font-sans text-base text-ivoire/95">1 heure</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-sans font-semibold text-5xl text-or-clair leading-none tabular-nums">120</span>
                  <span className="font-sans text-xl text-or-doux/80">€</span>
                </div>
              </div>

              <div
                className="flex items-center justify-between mt-auto px-5 py-3.5 rounded-full font-sans text-[12px] tracking-[0.2em] uppercase font-semibold text-encre transition-all group-hover:brightness-105"
                style={{ background: "#C9A961", boxShadow: "0 12px 30px -10px rgba(201,169,97,0.7)" }}
              >
                <span className="flex items-center gap-2">
                  <Calendar size={14} strokeWidth={2.2} />
                  Réserver en ligne
                </span>
                <ArrowRight size={16} strokeWidth={2.2} className="transition-transform group-hover:translate-x-1.5" />
              </div>
            </Link>

            {/* Distance */}
            <Link
              href="/reserver/a-distance"
              className="group relative flex flex-col p-7 lg:p-9 overflow-hidden border border-bleu-chefchaouen/45 rounded-3xl bg-encre/95 text-ivoire shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] hover:shadow-[0_40px_100px_-20px_rgba(125,181,199,0.30)] transition-all duration-500"
            >
              <span aria-hidden className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-bleu-chefchaouen via-bleu-majorelle to-bleu-cosmique rounded-l-3xl" />

              <div className="relative w-14 h-14 mb-5">
                <div aria-hidden className="absolute inset-0 rounded-full border border-bleu-chefchaouen/45" />
                <div className="absolute inset-1 rounded-full bg-bleu-chefchaouen/15 flex items-center justify-center text-bleu-chefchaouen">
                  <Phone size={20} strokeWidth={1.5} />
                </div>
              </div>

              <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-2 text-bleu-chefchaouen">Par téléphone · Partout</p>
              <h2 className="font-serif text-3xl lg:text-4xl mb-4 text-ivoire">30 minutes</h2>
              <p className="font-sans text-ivoire/85 text-[14px] leading-relaxed mb-6">
                Trente minutes par téléphone, depuis La Réunion, l&apos;Île Maurice, la métropole ou n&apos;importe où.
              </p>

              <ul className="space-y-2 mb-7 text-[13px] text-ivoire/90 flex-1">
                {[
                  "Consultation de 30 minutes par téléphone uniquement",
                  "Jocelyn vous appelle à l'heure du rendez-vous",
                  "Mêmes méthodes que le cabinet, en condensé",
                  "Aucun déplacement, où que vous soyez",
                ].map((item) => (
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

              <div className="flex items-end justify-between pt-5 mb-6 border-t border-ivoire/15">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.3em] text-ivoire/55 uppercase mb-1">Durée</p>
                  <p className="font-sans text-base text-ivoire/95">30 minutes</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-sans font-semibold text-5xl text-ivoire leading-none tabular-nums">85</span>
                  <span className="font-sans text-xl text-or-doux/80">€</span>
                </div>
              </div>

              <div
                className="flex items-center justify-between mt-auto px-5 py-3.5 rounded-full font-sans text-[12px] tracking-[0.2em] uppercase font-semibold text-ivoire transition-all group-hover:brightness-110"
                style={{ background: "#1B7A8F", boxShadow: "0 12px 30px -10px rgba(27,122,143,0.7)" }}
              >
                <span className="flex items-center gap-2">
                  <Calendar size={14} strokeWidth={2.2} />
                  Réserver en ligne
                </span>
                <ArrowRight size={16} strokeWidth={2.2} className="transition-transform group-hover:translate-x-1.5" />
              </div>
            </Link>
          </div>

          {/* Carte séances régulières / tarif préférentiel */}
          <div
            className="group relative flex flex-col md:flex-row md:items-center gap-6 p-7 md:p-9 rounded-3xl border border-bleu-chefchaouen/35 overflow-hidden mb-16 bg-encre text-ivoire shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)]"
          >
            <span aria-hidden className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-bleu-chefchaouen via-bleu-majorelle to-bleu-cosmique rounded-l-3xl" />

            <div className="relative shrink-0 w-14 h-14">
              <div aria-hidden className="absolute inset-0 rounded-full border border-bleu-chefchaouen/45" />
              <div className="absolute inset-1 rounded-full bg-bleu-chefchaouen/15 flex items-center justify-center text-bleu-chefchaouen">
                <Repeat size={20} strokeWidth={1.5} />
              </div>
            </div>

            <div className="flex-1">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-2 text-bleu-chefchaouen">Suivi dans la durée</p>
              <h3 className="font-serif text-2xl md:text-3xl text-ivoire mb-2">Séances régulières, tarif préférentiel</h3>
              <p className="font-sans text-ivoire/80 text-sm md:text-base leading-relaxed max-w-2xl">
                Vous souhaitez consulter plusieurs fois dans l&apos;année ? Un tarif préférentiel s&apos;applique pour un accompagnement suivi, au cabinet ou à distance. Le détail se fait sur devis, selon votre rythme.
              </p>
            </div>

            <Link
              href="/contact"
              className="group/btn shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-sans text-[12px] tracking-[0.2em] uppercase font-semibold text-encre transition-all group-hover:brightness-110"
              style={{ background: "#7DB5C7", boxShadow: "0 12px 30px -10px rgba(125,181,199,0.6)" }}
            >
              <span>Demander un devis</span>
              <ArrowRight size={15} strokeWidth={2.2} className="transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>

          {/* Section contact secondaire */}
          <div
            className="relative p-7 md:p-9 rounded-2xl border border-encre/12 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #F5EFE0 0%, #EDE5D3 100%)" }}
          >
            <div aria-hidden className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-or-doux/40 to-transparent" />

            <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-encre/40 mb-3">Autre demande</p>
            <h3 className="font-serif text-2xl md:text-3xl text-encre mb-3">Coaching de vie ou question spécifique ?</h3>
            <p className="font-sans text-encre/65 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
              Pour un accompagnement coaching, une question avant de réserver, ou toute autre demande, contactez directement Jocelyn.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-medium bg-encre text-ivoire hover:bg-encre/85 transition-colors"
              >
                <Mail size={13} strokeWidth={2} />
                <span>Envoyer un message</span>
              </Link>
              <Link
                href="tel:+262692813606"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans text-xs tracking-[0.2em] uppercase border border-encre/25 text-encre hover:border-encre/50 transition-colors"
              >
                <Phone size={13} strokeWidth={2} />
                <span>Appeler</span>
              </Link>
            </div>
          </div>

          <p className="text-center font-serif italic text-encre/55 text-sm mt-10 max-w-2xl mx-auto">
            Paiement sécurisé. Après le règlement, vous êtes recontacté sous 24h pour confirmer votre rendez-vous. Annulation possible jusqu&apos;à 24h avant.
          </p>
        </div>
      </section>

      <Seuil />
      <Footer />
    </main>
  );
}
