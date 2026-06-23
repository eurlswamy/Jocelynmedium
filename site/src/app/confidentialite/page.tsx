import { PageHero } from "@/components/layout/PageHero";
import { Footer } from "@/components/sections/Footer";
import { getPageGlobale } from "@/lib/global-content";

export const metadata = {
  title: "Politique de confidentialité · Jocelyn Amir, médium voyant",
  description:
    "Politique de confidentialité du site jocelynamir.com : données collectées, finalités, destinataires, durées de conservation et droits RGPD.",
};

export default async function ConfidentialitePage() {
  const global = await getPageGlobale();

  return (
    <main className="bg-ivoire">
      <PageHero
        eyebrow="Vos données"
        title="Politique de"
        titleAccent="confidentialité"
        description="Comment vos données personnelles sont collectées, utilisées et protégées, conformément au Règlement général sur la protection des données (RGPD)."
        compact
      />

      <section className="relative bg-ivoire py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12">

          <p className="font-sans text-xs md:text-sm text-encre/55 leading-relaxed bg-white border border-encre/10 rounded-xl px-5 py-4 mb-12">
            Note : ce document est un modèle. Il est recommandé de le faire relire
            par un professionnel du droit avant sa mise en ligne définitive, et de
            compléter les champs signalés ci-dessous.
          </p>

          <article className="space-y-12">

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Responsable de traitement
              </h2>
              <p className="font-sans text-encre/70 leading-relaxed text-sm md:text-base">
                Le responsable du traitement des données est
                [À COMPLÉTER PAR LE CLIENT : raison sociale exacte, ex. EURL SWAMY],
                représentée par Jocelyn Amir Swamy, dont le siège est situé
                [À COMPLÉTER PAR LE CLIENT : adresse du siège]. Pour toute question
                relative à vos données, vous pouvez écrire à contact@jocelynamir.com.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Données collectées
              </h2>
              <div className="font-sans text-encre/70 leading-relaxed text-sm md:text-base space-y-2">
                <p>Nous collectons uniquement les données que vous nous transmettez :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Via le formulaire de contact : votre nom, votre adresse e-mail, le sujet et le contenu de votre message.</li>
                  <li>Via la réservation et le paiement : les données nécessaires à la transaction sont saisies et traitées directement par notre prestataire de paiement Stripe (notamment les informations de carte bancaire), que nous ne stockons pas.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Finalités et bases légales
              </h2>
              <div className="font-sans text-encre/70 leading-relaxed text-sm md:text-base space-y-2">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Répondre à vos demandes de contact : base légale de l'intérêt légitime, ou de votre consentement lorsque vous nous écrivez spontanément.</li>
                  <li>Gérer vos réservations et paiements : base légale de l'exécution du contrat.</li>
                  <li>Respecter nos obligations comptables et légales : base légale de l'obligation légale.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Destinataires et sous-traitants
              </h2>
              <div className="font-sans text-encre/70 leading-relaxed text-sm md:text-base space-y-2">
                <p>Vos données peuvent être traitées par les prestataires suivants, strictement pour les finalités décrites :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Web3Forms : acheminement des messages envoyés depuis le formulaire de contact.</li>
                  <li>Stripe : traitement sécurisé des paiements.</li>
                  <li>Vercel Inc. : hébergement du site.</li>
                </ul>
                <p>Vos données ne sont jamais vendues à des tiers.</p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Transferts hors Union européenne
              </h2>
              <p className="font-sans text-encre/70 leading-relaxed text-sm md:text-base">
                Certains de nos prestataires (Web3Forms, Stripe, Vercel) sont
                susceptibles de traiter des données sur des serveurs situés hors de
                l'Union européenne, notamment aux États-Unis. Ces transferts sont en
                principe encadrés par des garanties appropriées (clauses
                contractuelles types ou mécanismes équivalents). Il est recommandé de
                vérifier les garanties à jour de chacun de ces prestataires :
                [À COMPLÉTER PAR LE CLIENT : confirmer les garanties de transfert de
                Web3Forms, Stripe et Vercel].
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Durée de conservation
              </h2>
              <p className="font-sans text-encre/70 leading-relaxed text-sm md:text-base">
                Les données issues d'une demande de contact sont conservées le temps
                nécessaire au traitement de votre demande, puis archivées ou
                supprimées. Les données liées à une réservation ou un paiement sont
                conservées pendant la durée requise par les obligations légales et
                comptables : [À COMPLÉTER PAR LE CLIENT : préciser les durées de
                conservation retenues, par exemple 3 ans après le dernier contact pour
                la prospection et la durée légale pour les pièces comptables].
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Vos droits
              </h2>
              <div className="font-sans text-encre/70 leading-relaxed text-sm md:text-base space-y-2">
                <p>
                  Conformément au RGPD, vous disposez d'un droit d'accès, de
                  rectification, d'effacement, d'opposition, de limitation et de
                  portabilité de vos données. Vous pouvez exercer ces droits en
                  écrivant à{" "}
                  <a href="mailto:contact@jocelynamir.com" className="text-bleu-majorelle underline underline-offset-2 hover:opacity-80">
                    contact@jocelynamir.com
                  </a>
                  .
                </p>
                <p>
                  Vous avez également le droit d'introduire une réclamation auprès de
                  la Commission nationale de l'informatique et des libertés (CNIL),
                  autorité compétente y compris pour les départements et régions
                  d'outre-mer dont La Réunion : CNIL, 3 place de Fontenoy, TSA 80715,
                  75334 Paris Cedex 07, www.cnil.fr.
                </p>
              </div>
            </section>

          </article>
        </div>
      </section>

      <Footer content={global.footer} />
    </main>
  );
}
