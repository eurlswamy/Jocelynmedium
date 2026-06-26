import { PageHero } from "@/components/layout/PageHero";
import { Footer } from "@/components/sections/Footer";
import { getPageGlobale } from "@/lib/global-content";

export const metadata = {
  title: "Mentions légales · Jocelyn Amir, médium voyant à La Réunion",
  description:
    "Mentions légales du site jocelynamir.com : éditeur, directeur de la publication, hébergeur et coordonnées, conformément à la loi pour la confiance dans l'économie numérique.",
};

export default async function MentionsLegalesPage() {
  const global = await getPageGlobale();

  return (
    <main className="bg-ivoire">
      <PageHero
        eyebrow="Informations légales"
        title="Mentions"
        titleAccent="légales"
        description="Éditeur du site, hébergement et coordonnées, conformément à la loi pour la confiance dans l'économie numérique (LCEN, loi n° 2004-575 du 21 juin 2004)."
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
                Éditeur du site
              </h2>
              <div className="font-sans text-encre/70 leading-relaxed text-sm md:text-base space-y-1">
                <p>Le site jocelynamir.com est édité par :</p>
                <p>Raison sociale : SARL SWAMY</p>
                <p>Forme juridique : société à responsabilité limitée (SARL)</p>
                <p>Représentant légal : Franck Richard, gérant</p>
                <p>Adresse du siège social : Apt 2A Résidence Les Lilas, 10 rue Adolphe Ramassamy, 97490 Saint-Denis, La Réunion</p>
                <p>Capital social : [À COMPLÉTER PAR LE CLIENT : montant du capital social]</p>
                <p>Numéro SIREN : 483 360 996</p>
                <p>RCS : Saint-Denis 483 360 996</p>
                <p>Numéro de TVA intracommunautaire : [À COMPLÉTER PAR LE CLIENT : numéro de TVA si assujetti, sinon mentionner « non assujetti à la TVA »]</p>
                <p>Téléphone : +262 692 81 36 06</p>
                <p>Adresse e-mail : contact@jocelynamir.com</p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Directeur de la publication
              </h2>
              <p className="font-sans text-encre/70 leading-relaxed text-sm md:text-base">
                Le directeur de la publication est Jocelyn Amir Swamy, en sa qualité
                de représentant légal de la société éditrice.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Hébergeur
              </h2>
              <div className="font-sans text-encre/70 leading-relaxed text-sm md:text-base space-y-1">
                <p>Le site est hébergé par :</p>
                <p>Vercel Inc.</p>
                <p>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                <p>Site : vercel.com</p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Propriété intellectuelle
              </h2>
              <p className="font-sans text-encre/70 leading-relaxed text-sm md:text-base">
                L'ensemble des contenus présents sur ce site (textes, images,
                logos, mise en page) est protégé par le droit de la propriété
                intellectuelle. Toute reproduction ou représentation, totale ou
                partielle, sans autorisation préalable de l'éditeur est interdite.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Données personnelles
              </h2>
              <p className="font-sans text-encre/70 leading-relaxed text-sm md:text-base">
                Le traitement des données personnelles collectées sur ce site est
                détaillé dans notre{" "}
                <a href="/confidentialite" className="text-bleu-majorelle underline underline-offset-2 hover:opacity-80">
                  politique de confidentialité
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-encre tracking-tight mb-4">
                Nature de l'activité
              </h2>
              <p className="font-sans text-encre/70 leading-relaxed text-sm md:text-base">
                Les consultations de voyance et de médiumnité proposées sur ce site
                relèvent du domaine du divertissement et du bien-être. Elles ne se
                substituent en aucun cas à un avis médical, juridique, financier ou
                psychologique délivré par un professionnel habilité.
              </p>
            </section>

          </article>
        </div>
      </section>

      <Footer content={global.footer} />
    </main>
  );
}
