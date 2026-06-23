import { cache } from "react";
import { safeFetch } from "@/lib/sanity";
import type { SeuilContent } from "@/components/sections/Seuil";
import type { AntiClichesContent } from "@/components/sections/AntiCliches";
import type { FooterContent } from "@/components/sections/Footer";

// Contenu editorial partage par toutes les pages (bloc d'appel final, citation
// manifeste, pied de page). Edite depuis le singleton Sanity "pageGlobale".
// Tous les champs sont optionnels : chaque composant applique son repli sur le
// texte d'origine en dur si Sanity est vide ou hors-ligne.
export type GlobalContent = {
  seuil: SeuilContent;
  antiCliches: AntiClichesContent;
  footer: FooterContent;
};

const GLOBAL_QUERY = `*[_id == "pageGlobale"][0]{
  seuilSurtitre, seuilTitre, seuilTitreItalique, seuilDescription,
  seuilCtaReserver, seuilCtaQuestion, seuilMention1, seuilMention2, seuilMention3,
  antiClichesCitation, antiClichesCitationItalique, antiClichesSuite,
  antiClichesAuteur, antiClichesCta1, antiClichesCta2,
  footerTitre, footerDescription, footerContactTitre, footerVille, footerRegion,
  footerTelephone, footerEmail, footerRetrouveTitre, footerTv, footerRadio,
  footerSocial, footerCopyright, footerCredit
}`;

// `cache()` de React deduplique l'appel par rendu de page : meme si plusieurs
// composants demandent ce contenu, Sanity n'est interroge qu'une seule fois.
export const getPageGlobale = cache(async (): Promise<GlobalContent> => {
  const data = await safeFetch<Record<string, unknown> | null>(GLOBAL_QUERY, null);

  return {
    seuil: {
      surtitre: data?.seuilSurtitre as string | undefined,
      titre: data?.seuilTitre as string | undefined,
      titreItalique: data?.seuilTitreItalique as string | undefined,
      description: data?.seuilDescription as string | undefined,
      ctaReserver: data?.seuilCtaReserver as string | undefined,
      ctaQuestion: data?.seuilCtaQuestion as string | undefined,
      mention1: data?.seuilMention1 as string | undefined,
      mention2: data?.seuilMention2 as string | undefined,
      mention3: data?.seuilMention3 as string | undefined,
    },
    antiCliches: {
      citation: data?.antiClichesCitation as string | undefined,
      citationItalique: data?.antiClichesCitationItalique as string | undefined,
      suite: data?.antiClichesSuite as string | undefined,
      auteur: data?.antiClichesAuteur as string | undefined,
      cta1: data?.antiClichesCta1 as string | undefined,
      cta2: data?.antiClichesCta2 as string | undefined,
    },
    footer: {
      titre: data?.footerTitre as string | undefined,
      description: data?.footerDescription as string | undefined,
      contactTitre: data?.footerContactTitre as string | undefined,
      ville: data?.footerVille as string | undefined,
      region: data?.footerRegion as string | undefined,
      telephone: data?.footerTelephone as string | undefined,
      email: data?.footerEmail as string | undefined,
      retrouveTitre: data?.footerRetrouveTitre as string | undefined,
      tv: data?.footerTv as string | undefined,
      radio: data?.footerRadio as string | undefined,
      social: data?.footerSocial as string | undefined,
      copyright: data?.footerCopyright as string | undefined,
      credit: data?.footerCredit as string | undefined,
    },
  };
});
