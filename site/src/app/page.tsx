import { FrameLoader } from "@/components/hero/FrameLoader";
import { HeroParallax } from "@/components/hero/HeroParallax";
import { Methodes } from "@/components/sections/Methodes";
import { AntiCliches } from "@/components/sections/AntiCliches";
import { Discretion } from "@/components/sections/Discretion";
import { Medias } from "@/components/sections/Medias";
import { FAQ } from "@/components/sections/FAQ";
import { Seuil } from "@/components/sections/Seuil";
import { Footer } from "@/components/sections/Footer";
import { safeFetch } from "@/lib/sanity";
import { getPageGlobale } from "@/lib/global-content";

// Contenu editorial de la page d'accueil, edite depuis le Studio Sanity
// (singleton "pageAccueil"). safeFetch renvoie null si Sanity est hors-ligne :
// chaque section applique alors son repli sur le texte d'origine en dur.
const HOME_QUERY = `*[_id == "pageAccueil"][0]{
  discretionSurtitre, discretionTitre, discretionTitreItalique,
  discretionPiliers[]{titre, texte},
  heroBadge, heroTitre, heroTitreItalique, heroTitreSuite,
  heroDescription, heroCta1, heroCta2,
  introSurtitre, introTitre, introTitreItalique, introDescription,
  introStats[]{valeur, label},
  mediasSurtitre, mediasTitre, mediasTitreItalique, mediasDescription,
  methodesApercuSurtitre, methodesApercuTitre, methodesApercuTitreItalique,
  methodesApercuDescription, apercuMethodes[]{titre, description},
  faqSurtitre, faqTitre, faqTitreItalique,
  faqQuestions[]{question, reponse}
}`;

export default async function Home() {
  const home = await safeFetch<Record<string, unknown> | null>(HOME_QUERY, null);
  const global = await getPageGlobale();

  const discretion = {
    surtitre: home?.discretionSurtitre as string | undefined,
    titre: home?.discretionTitre as string | undefined,
    titreItalique: home?.discretionTitreItalique as string | undefined,
    piliers: home?.discretionPiliers as { titre?: string; texte?: string }[] | undefined,
  };

  const hero = {
    heroBadge: home?.heroBadge as string | undefined,
    heroTitre: home?.heroTitre as string | undefined,
    heroTitreItalique: home?.heroTitreItalique as string | undefined,
    heroTitreSuite: home?.heroTitreSuite as string | undefined,
    heroDescription: home?.heroDescription as string | undefined,
    heroCta1: home?.heroCta1 as string | undefined,
    heroCta2: home?.heroCta2 as string | undefined,
    introSurtitre: home?.introSurtitre as string | undefined,
    introTitre: home?.introTitre as string | undefined,
    introTitreItalique: home?.introTitreItalique as string | undefined,
    introDescription: home?.introDescription as string | undefined,
    introStats: home?.introStats as { valeur?: string; label?: string }[] | undefined,
  };

  const medias = {
    surtitre: home?.mediasSurtitre as string | undefined,
    titre: home?.mediasTitre as string | undefined,
    titreItalique: home?.mediasTitreItalique as string | undefined,
    description: home?.mediasDescription as string | undefined,
  };

  const faq = {
    surtitre: home?.faqSurtitre as string | undefined,
    titre: home?.faqTitre as string | undefined,
    titreItalique: home?.faqTitreItalique as string | undefined,
    questions: home?.faqQuestions as { question?: string; reponse?: string }[] | undefined,
  };

  const methodes = {
    surtitre: home?.methodesApercuSurtitre as string | undefined,
    titre: home?.methodesApercuTitre as string | undefined,
    titreItalique: home?.methodesApercuTitreItalique as string | undefined,
    description: home?.methodesApercuDescription as string | undefined,
    cartes: home?.apercuMethodes as { titre?: string; description?: string }[] | undefined,
  };

  return (
    <>
      <FrameLoader />
      <main className="bg-ivoire">
        <HeroParallax content={hero} />
        <Methodes content={methodes} />
        <AntiCliches content={global.antiCliches} />
        <Discretion content={discretion} />
        <Medias content={medias} />
        <FAQ content={faq} />
        <Seuil content={global.seuil} />
        <Footer content={global.footer} />
      </main>
    </>
  );
}
