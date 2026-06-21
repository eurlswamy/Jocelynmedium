import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, ArrowRight } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { Seuil } from "@/components/sections/Seuil";
import { ACTUALITES } from "@/lib/actualites-data";

export function generateStaticParams() {
  return ACTUALITES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ACTUALITES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.titre} · Jocelyn Amir`,
    description: article.resume,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ACTUALITES.find((a) => a.slug === slug);
  if (!article) notFound();

  const autres = ACTUALITES.filter((a) => a.slug !== article.slug).slice(0, 2);

  const paragraphs = article.contenu.split("\n\n").filter(Boolean);

  return (
    <main className="bg-ivoire">

      {/* Hero article */}
      <div className="relative pt-28 md:pt-36 pb-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-encre/80 via-encre/70 to-ivoire" />

        <div className="relative max-w-3xl mx-auto px-6 md:px-12 pb-16 md:pb-20">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-[0.2em] uppercase text-ivoire/60 hover:text-ivoire transition-colors mb-8"
          >
            <ChevronLeft size={14} strokeWidth={2} />
            Toutes les actualités
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span
              className="px-3 py-1 rounded-full font-sans text-[9px] tracking-[0.25em] uppercase font-medium text-ivoire"
              style={{ background: article.tagColor }}
            >
              {article.tag}
            </span>
            <span className="font-sans text-ivoire/50 text-xs">{article.date}</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivoire leading-[1.05] tracking-tight">
            {article.titre}
          </h1>
        </div>
      </div>

      {/* Contenu */}
      <section className="bg-ivoire py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 md:px-12">

          {/* Resume */}
          <p className="font-serif italic text-bleu-majorelle text-xl md:text-2xl leading-relaxed mb-10 pb-10 border-b border-encre/10">
            {article.resume}
          </p>

          {/* Corps */}
          <div className="space-y-6 font-sans text-encre/75 leading-relaxed text-base md:text-lg">
            {paragraphs.map((para, i) => {
              if (para.startsWith("**") && para.endsWith("**")) {
                return (
                  <h3 key={i} className="font-serif text-xl md:text-2xl text-encre leading-tight mt-8 mb-2">
                    {para.replace(/\*\*/g, "")}
                  </h3>
                );
              }
              if (para.startsWith("- ")) {
                const items = para.split("\n").map((l) => l.replace(/^- /, ""));
                return (
                  <ul key={i} className="space-y-2 pl-0">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-or-doux" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="leading-relaxed">
                  {para}
                </p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-14 pt-10 border-t border-encre/10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/reserver"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans text-xs tracking-[0.22em] uppercase font-medium bg-or-doux text-encre hover:bg-or-clair transition-colors"
            >
              <Calendar size={13} strokeWidth={2} />
              <span>Réserver une consultation</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans text-xs tracking-[0.22em] uppercase border border-encre/25 text-encre hover:border-encre/50 transition-colors"
            >
              <span>Poser une question</span>
              <ArrowRight size={12} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* Autres articles */}
      {autres.length > 0 && (
        <section className="bg-blanc-casse py-12 md:py-16 border-t border-encre/8">
          <div className="max-w-3xl mx-auto px-6 md:px-12">
            <p className="font-sans text-xs tracking-[0.45em] uppercase text-encre/40 mb-8">Autres articles</p>
            <div className="grid sm:grid-cols-2 gap-5">
              {autres.map((a) => (
                <Link
                  key={a.slug}
                  href={`/actualites/${a.slug}`}
                  className="group rounded-2xl overflow-hidden border border-encre/8 hover:border-encre/20 transition-colors bg-ivoire"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.titre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span
                      className="absolute top-3 left-3 px-2 py-0.5 rounded text-[8px] tracking-[0.2em] uppercase font-sans font-medium text-ivoire"
                      style={{ background: a.tagColor }}
                    >
                      {a.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-serif text-base text-encre leading-snug group-hover:text-bleu-majorelle transition-colors">
                      {a.titre}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Seuil />
      <Footer />
    </main>
  );
}
