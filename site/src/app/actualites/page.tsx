import { Footer } from "@/components/sections/Footer";
import { Seuil } from "@/components/sections/Seuil";
import { ActualitesListe } from "@/components/actualites/ActualitesListe";
import {
  ACTUALITES,
  TAGS,
  ACTUALITES_QUERY,
  mapSanityActualite,
} from "@/lib/actualites-data";
import { safeFetch, pick } from "@/lib/sanity";
import { getPageGlobale } from "@/lib/global-content";

export const metadata = {
  title: "Actualités · Jocelyn Amir",
  description:
    "Émissions, distinctions et actualités de Jocelyn Amir, médium voyant à La Réunion.",
};

// Libellés UI editables (singleton "pageActualites"). safeFetch renvoie null si
// Sanity est hors-ligne : repli sur les libellés en dur via pick.
const PAGE_QUERY = `*[_id == "pageActualites"][0]{
  labelFiltrer, labelTrier, messageVide,
  labelAutresArticles, labelCtaReserver, labelCtaQuestion
}`;

// Les actualites elles-memes proviennent du type 'actualite' (statut "publie").
// REPLI : si Sanity renvoie une liste vide ou est hors-ligne, on retombe sur les
// actualites en dur (ACTUALITES) pour ne jamais afficher une page vide.
export default async function ActualitesPage() {
  const [page, sanityActus] = await Promise.all([
    safeFetch<Record<string, unknown> | null>(PAGE_QUERY, null),
    safeFetch<Record<string, unknown>[]>(ACTUALITES_QUERY, []),
  ]);
  const global = await getPageGlobale();

  const mapped = (sanityActus ?? [])
    .map(mapSanityActualite)
    .filter((a) => a.slug);
  const actualites = mapped.length > 0 ? mapped : ACTUALITES;

  const labels = {
    filtrer: pick(page?.labelFiltrer, "Filtrer par"),
    trier: pick(page?.labelTrier, "Trier par date"),
    vide: pick(page?.messageVide, "Aucun article dans cette catégorie."),
  };

  return (
    <main className="bg-ivoire">
      {/* Spacer navbar */}
      <div className="h-20" />

      {/* Blog : filtres gauche + articles droite */}
      <section className="bg-ivoire py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ActualitesListe actualites={actualites} tags={TAGS} labels={labels} />
        </div>
      </section>

      <Seuil content={global.seuil} />
      <Footer content={global.footer} />
    </main>
  );
}
