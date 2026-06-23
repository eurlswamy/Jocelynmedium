import { PageHero } from "@/components/layout/PageHero";
import { Footer } from "@/components/sections/Footer";
import { getPageGlobale } from "@/lib/global-content";

export const metadata = {
  title: "Conditions générales de vente · Jocelyn Amir, médium voyant",
  description:
    "Conditions générales de vente des consultations de voyance et du coaching de vie proposés par Jocelyn Amir : prix, paiement, réservation, annulation et report.",
};

export default async function CgvPage() {
  const global = await getPageGlobale();

  return (
    <main className="bg-ivoire">
      <PageHero
        eyebrow="Vos achats"
        title="Conditions générales"
        titleAccent="de vente"
        description="Modalités applicables aux consultations de voyance et aux prestations de coaching réservées et payées sur jocelynamir.com."
        compact
      />

      <section className="relative bg-ivoire py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12">

          <p className="font-sans text-xs md:text-sm text-encre/55 leading-relaxed bg-white border border-encre/10 rounded-xl px-5 py-4 mb-12">
            Note : ce document est un modèle. Compte tenu des règles propres à la
            vente de services à distance et au droit de rétractation, il est
            vivement recommandé de le faire valider par un professionnel du droit
            avant sa mise en ligne définitive, et de compléter les champs signalés.
          </p>

          <article className="space-y-12">

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Article 1 · Objet et prestataire
              </h2>
              <p className="font-sans text-encre/70 leading-relaxed text-sm md:text-base">
                Les présentes conditions générales de vente régissent les prestations
                de voyance, de médiumnité et de coaching de vie proposées par
                [À COMPLÉTER PAR LE CLIENT : raison sociale exacte, ex. EURL SWAMY],
                représentée par Jocelyn Amir Swamy, dont le siège est situé
                [À COMPLÉTER PAR LE CLIENT : adresse du siège]. Toute réservation
                vaut acceptation pleine et entière des présentes conditions.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Article 2 · Prestations et prix
              </h2>
              <div className="font-sans text-encre/70 leading-relaxed text-sm md:text-base space-y-2">
                <p>Les prix sont indiqués en euros, toutes taxes comprises :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Consultation d'une heure (au cabinet ou à distance) : 120 euros.</li>
                  <li>Consultation de 30 minutes par téléphone : 85 euros.</li>
                  <li>Coaching de vie : sur devis personnalisé.</li>
                </ul>
                <p>
                  Les prestations de voyance et de médiumnité relèvent du
                  divertissement et du bien-être. Elles ne constituent pas un avis
                  médical, juridique, financier ou psychologique.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Article 3 · Réservation et paiement
              </h2>
              <p className="font-sans text-encre/70 leading-relaxed text-sm md:text-base">
                La réservation s'effectue en ligne. Le paiement est réalisé par carte
                bancaire via notre prestataire sécurisé Stripe. Le prépaiement est
                obligatoire et vaut réservation du rendez-vous. La confirmation du
                créneau est adressée sous 24 heures par e-mail. Tant que le paiement
                n'a pas été enregistré, aucun rendez-vous n'est garanti.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Article 4 · Annulation et report
              </h2>
              <p className="font-sans text-encre/70 leading-relaxed text-sm md:text-base">
                L'annulation est possible jusqu'à 24 heures avant le rendez-vous.
                Au-delà de ce délai, l'acompte versé n'est pas remboursable, mais le
                rendez-vous peut être reporté une fois, à une date convenue d'un
                commun accord.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Article 5 · Droit de rétractation
              </h2>
              <div className="font-sans text-encre/70 leading-relaxed text-sm md:text-base space-y-2">
                <p>
                  Conformément au code de la consommation, le consommateur dispose en
                  principe d'un délai de 14 jours pour se rétracter d'un contrat conclu
                  à distance. Toutefois, ce droit connaît des aménagements pour les
                  prestations de service exécutées à une date convenue.
                </p>
                <p>
                  En réservant une consultation à un créneau déterminé, le client
                  demande expressément l'exécution de la prestation à cette date. La
                  politique d'annulation et de report décrite à l'article 4 s'applique
                  alors en lieu et place d'un remboursement automatique. Pour le
                  coaching réalisé sur devis, les conditions de rétractation sont
                  précisées dans le devis accepté.
                </p>
                <p>
                  Cette clause étant sensible au regard du droit de la consommation,
                  son adaptation précise (exclusion ou aménagement du droit de
                  rétractation, recueil de l'accord exprès du client) doit être
                  validée par un professionnel du droit.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Article 6 · Médiation de la consommation
              </h2>
              <p className="font-sans text-encre/70 leading-relaxed text-sm md:text-base">
                Conformément au code de la consommation, le client peut recourir
                gratuitement à un médiateur de la consommation en vue de la résolution
                amiable d'un litige. Coordonnées du médiateur compétent :
                [À COMPLÉTER PAR LE CLIENT : nom, adresse postale et site internet du
                médiateur de la consommation souscrit par la société].
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Article 7 · Droit applicable et juridiction
              </h2>
              <p className="font-sans text-encre/70 leading-relaxed text-sm md:text-base">
                Les présentes conditions sont soumises au droit français. En cas de
                litige, et à défaut de résolution amiable ou par médiation, les
                tribunaux français sont compétents, dans les conditions prévues par
                la loi.
              </p>
            </section>

          </article>
        </div>
      </section>

      <Footer content={global.footer} />
    </main>
  );
}
