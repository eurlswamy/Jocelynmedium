import { Footer } from "@/components/sections/Footer";
import { Seuil } from "@/components/sections/Seuil";
import { MapPin, Phone, Mail, Calendar } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact et réservation · Jocelyn Amir, médium voyant La Réunion",
  description:
    "Réservez votre consultation ou posez votre question à Jocelyn Amir. Cabinet à Saint-Clotilde (La Réunion), consultations à distance disponibles. Réponse sous 24h.",
  keywords: [
    "contact médium La Réunion",
    "réserver consultation voyance",
    "Jocelyn Amir rendez-vous",
    "voyance Saint-Clotilde contact",
  ],
};

export default function ContactPage() {
  return (
    <main className="bg-ivoire">

      {/* Contenu principal : on arrive directement sur le formulaire */}
      <section className="relative bg-ivoire pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Formulaire (client component) */}
            <div>
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="h-px w-8 bg-or-doux/60" />
                <p className="font-sans text-bleu-majorelle text-[11px] tracking-[0.45em] uppercase">Contact</p>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl text-encre leading-tight tracking-tight mb-2">
                Écrivez à{" "}
                <span className="italic text-bleu-majorelle">Jocelyn.</span>
              </h1>
              <p className="font-sans text-encre/60 text-sm leading-relaxed mb-7 max-w-md">
                Une question avant de réserver ? Réponse sous 24h. La réservation, elle, se fait en ligne.
              </p>
              <ContactForm />
            </div>

            {/* Infos + Réservation rapide */}
            <div className="space-y-5">

              {/* Réservation rapide */}
              <div
                className="p-7 rounded-2xl text-ivoire relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1C1C1C 0%, #0B1929 100%)" }}
              >
                <div aria-hidden className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{ background: "radial-gradient(circle, rgba(201,169,97,0.15) 0%, transparent 70%)" }} />
                <div className="relative">
                  <Calendar size={24} className="text-or-clair mb-4" strokeWidth={1.5} />
                  <p className="font-sans text-or-clair text-xs tracking-[0.4em] uppercase mb-3">
                    Réserver maintenant
                  </p>
                  <h3 className="font-serif text-2xl text-ivoire mb-4 leading-tight">
                    Choisissez votre formule.
                  </h3>
                  <div className="space-y-2.5">
                    <a
                      href="/reserver/au-cabinet"
                      className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-sans text-sm tracking-wide transition-all"
                      style={{ background: "#C9A961", color: "#1C1C1C" }}
                    >
                      <span>Une heure · cabinet ou à distance · 120€</span>
                      <span>→</span>
                    </a>
                    <a
                      href="/reserver/a-distance"
                      className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-sans text-sm tracking-wide border border-ivoire/20 text-ivoire transition-all hover:border-or-doux/50"
                    >
                      <span>30 min · par téléphone · 85€</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Coordonnées */}
              <div className="space-y-3">
                <a
                  href="mailto:contact@jocelynamir.com"
                  className="group flex items-start gap-4 p-4 rounded-xl border border-encre/8 hover:border-or-doux/40 bg-white transition-all"
                >
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-or-doux/15 text-or-doux">
                    <Mail size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-encre/45 mb-0.5">Email</p>
                    <p className="font-sans text-encre group-hover:text-or-doux transition-colors text-base">
                      contact@jocelynamir.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+262692813606"
                  className="group flex items-start gap-4 p-4 rounded-xl border border-encre/8 hover:border-bleu-majorelle/40 bg-white transition-all"
                >
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-bleu-majorelle/15 text-bleu-majorelle">
                    <Phone size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-encre/45 mb-0.5">Téléphone</p>
                    <p className="font-sans text-encre group-hover:text-bleu-majorelle transition-colors text-base tabular-nums">
                      +262 692 81 36 06
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-encre/8 bg-white">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-terre-cuite/15 text-terre-cuite">
                    <MapPin size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-encre/45 mb-0.5">Cabinet</p>
                    <p className="font-sans text-encre text-base leading-snug font-medium">
                      Saint-Clotilde<br />
                      <span className="font-sans font-normal text-encre/55 text-sm">La Réunion (974)</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-sable/20 border border-or-doux/20">
                <p className="font-sans text-encre/60 text-xs leading-relaxed">
                  <span className="font-medium text-encre/80">Confidentialité garantie.</span> Tout ce que vous partagez reste strictement entre nous. Aucune information n&apos;est transmise à un tiers.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Seuil />
      <Footer />
    </main>
  );
}
