import { Services } from "@/components/sections/Services";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { Seuil } from "@/components/sections/Seuil";
import { safeFetch } from "@/lib/sanity";
import { getPageGlobale } from "@/lib/global-content";

export const metadata = {
  title: "Services & tarifs · Jocelyn Amir, médium voyant à La Réunion",
  description:
    "Consultation d'une heure au cabinet à Saint-Clotilde ou à distance (120€), séance de 30 minutes par téléphone (85€), ou coaching de vie. Paiement sécurisé, confirmation sous 24h.",
  keywords: [
    "médium voyant La Réunion",
    "consultation voyance prix",
    "voyance à distance Réunion",
    "coaching de vie La Réunion",
    "Jocelyn Amir tarifs",
  ],
};

// Contenu editorial de la page services, edite depuis le Studio Sanity
// (singleton "pageServices"). safeFetch renvoie null si Sanity est hors-ligne :
// le composant Services applique alors son repli sur les textes d'origine.
// La FAQ detaillee reste en dur (non incluse dans ce singleton).
const SERVICES_QUERY = `*[_id == "pageServices"][0]{
  surtitre, titre, titreItalique, description,
  formules[]{surtitre, titre, duree, prix, accroche, features, tag, labelCta}
}`;

export default async function ServicesPage() {
  const data = await safeFetch<Record<string, unknown> | null>(SERVICES_QUERY, null);
  const global = await getPageGlobale();

  const content = {
    surtitre: data?.surtitre as string | undefined,
    titre: data?.titre as string | undefined,
    titreItalique: data?.titreItalique as string | undefined,
    description: data?.description as string | undefined,
    formules: data?.formules as {
      surtitre?: string;
      titre?: string;
      duree?: string;
      prix?: string;
      accroche?: string;
      features?: string[];
      tag?: string;
      labelCta?: string;
    }[] | undefined,
  };

  return (
    <main className="bg-ivoire">
      <Services content={content} />
      <FAQ />
      <Seuil content={global.seuil} />
      <Footer content={global.footer} />
    </main>
  );
}
