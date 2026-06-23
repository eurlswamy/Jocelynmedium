import { MethodesClient } from "./MethodesClient";
import { safeFetch } from "@/lib/sanity";
import { getPageGlobale } from "@/lib/global-content";

// Contenu editorial de la page methodes, edite depuis le Studio Sanity
// (singleton "pageMethodes"). safeFetch renvoie null si Sanity est hors-ligne :
// le composant client applique alors son repli sur les textes d'origine.
// Certains champs Sanity sont volontairement vides (description/exemples des
// methodes II a IV) : le repli val() conserve le texte d'origine en dur.
const METHODES_QUERY = `*[_id == "pageMethodes"][0]{
  heroSurtitre, heroTitre, heroTitreItalique, heroDescription,
  methodes[]{numeral, teaser, titre, definition, description, exemples},
  citationTexte, citationAuteur
}`;

export default async function MethodesPage() {
  const data = await safeFetch<Record<string, unknown> | null>(METHODES_QUERY, null);
  const global = await getPageGlobale();

  const content = {
    heroSurtitre: data?.heroSurtitre as string | undefined,
    heroTitre: data?.heroTitre as string | undefined,
    heroTitreItalique: data?.heroTitreItalique as string | undefined,
    heroDescription: data?.heroDescription as string | undefined,
    methodes: data?.methodes as {
      numeral?: string;
      teaser?: string;
      titre?: string;
      definition?: string;
      description?: string;
      exemples?: string[];
    }[] | undefined,
    citationTexte: data?.citationTexte as string | undefined,
    citationAuteur: data?.citationAuteur as string | undefined,
  };

  return (
    <MethodesClient
      content={content}
      seuilContent={global.seuil}
      footerContent={global.footer}
    />
  );
}
