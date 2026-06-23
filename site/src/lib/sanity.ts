import { createClient } from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";

// Source d'image Sanity : objet asset avec reference, ou URL deja resolue.
type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0];

// Lecture seule du contenu Sanity, cote serveur (server components).
// Le dataset 'production' est public en lecture : aucun token cote site.
// Le site ne se vide JAMAIS : chaque page applique un repli sur son texte
// d'origine en dur via le helper `pick` (valeur Sanity sinon defaut).

export const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "ji3lirnr";
export const SANITY_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2023-05-03",
  // Pas de CDN : le site vitrine est peu charge, le client veut voir ses
  // modifications publiees tout de suite (cf. piege cache CDN Sanity).
  useCdn: false,
});

const builder = createImageUrlBuilder(sanityClient);
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

// Requete sure : si Sanity est hors-ligne ou la requete echoue, on renvoie
// `fallback` au lieu de planter le rendu de la page.
export async function safeFetch<T>(
  query: string,
  fallback: T,
  params: Record<string, unknown> = {}
): Promise<T> {
  try {
    const data = await sanityClient.fetch<T>(query, params, {
      // Revalidation ISR : contenu rafraichi au plus toutes les 30 s.
      next: { revalidate: 30 },
    });
    return data ?? fallback;
  } catch (err) {
    console.error("[sanity] fetch failed, falling back to defaults:", err);
    return fallback;
  }
}

// Repli champ par champ : renvoie la valeur Sanity si elle est non vide,
// sinon la valeur par defaut codee en dur. Garantit qu'aucun texte ne
// disparait si un champ du Studio est laisse vide.
export function pick(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim().length > 0) return value;
  return fallback;
}
