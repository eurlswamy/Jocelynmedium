"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Actualite } from "@/lib/actualites-data";

// UI interactive de la liste d'actualites (filtres + tri). Les donnees et les
// libellés sont injectes depuis le server component parent (page.tsx), qui les
// lit depuis Sanity avec repli sur les valeurs en dur.
export type ActualitesListeLabels = {
  filtrer: string;
  trier: string;
  vide: string;
};

export function ActualitesListe({
  actualites,
  tags,
  labels,
}: {
  actualites: Actualite[];
  tags: string[];
  labels: ActualitesListeLabels;
}) {
  const [activeTag, setActiveTag] = useState("Tout");
  const [sortOrder, setSortOrder] = useState<"recent" | "ancien">("recent");

  const filtered = actualites
    .filter((a) => activeTag === "Tout" || a.tag === activeTag)
    .sort((a, b) =>
      sortOrder === "recent" ? b.annee - a.annee : a.annee - b.annee
    );

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
      {/* Filtres gauche */}
      <aside className="lg:w-52 shrink-0">
        <div className="lg:sticky lg:top-28">
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-encre/40 mb-4">{labels.filtrer}</p>

          {/* Filtres par categorie */}
          <div className="flex flex-row lg:flex-col gap-2 flex-wrap mb-6">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-xl font-sans text-[11px] tracking-[0.15em] uppercase transition-all text-left ${
                  activeTag === tag
                    ? "bg-encre text-ivoire"
                    : "bg-encre/5 text-encre/60 hover:bg-encre/12"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="border-t border-encre/10 pt-6 mt-2">
            <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-encre/40 mb-4">{labels.trier}</p>
            <div className="flex flex-row lg:flex-col gap-2 flex-wrap">
              {([
                { key: "recent", label: "Plus récents" },
                { key: "ancien", label: "Plus anciens" },
              ] as const).map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSortOrder(opt.key)}
                  className={`px-4 py-2 rounded-xl font-sans text-[11px] tracking-[0.15em] uppercase transition-all text-left ${
                    sortOrder === opt.key
                      ? "bg-encre text-ivoire"
                      : "bg-encre/5 text-encre/50 hover:bg-encre/12"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <p className="hidden lg:block font-sans text-encre/30 text-xs mt-6">
            {filtered.length} article{filtered.length > 1 ? "s" : ""}
          </p>
        </div>
      </aside>

      {/* Articles */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-encre/35 text-xs mb-6 lg:hidden">
          {filtered.length} article{filtered.length > 1 ? "s" : ""}
        </p>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <article
              key={a.slug}
              className="group rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: "#FDFAF4",
                border: "1.5px solid rgba(0,0,0,0.07)",
                boxShadow: "0 8px 40px -12px rgba(0,0,0,0.08)",
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-encre/10">
                <img
                  src={a.image}
                  alt={a.titre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <span
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full font-sans text-ivoire text-[9px] tracking-[0.25em] uppercase font-medium"
                  style={{ background: `${a.tagColor}ee` }}
                >
                  {a.tag}
                </span>
                <p className="absolute bottom-4 right-4 font-sans text-ivoire/75 text-[10px] tracking-wide">
                  {a.date}
                </p>
              </div>

              {/* Contenu */}
              <div className="flex flex-col flex-1 p-6">
                <h2 className="font-serif text-xl text-encre mb-3 leading-snug group-hover:text-bleu-majorelle transition-colors duration-300">
                  {a.titre}
                </h2>
                <p className="font-sans text-encre/60 text-sm leading-relaxed flex-1 mb-5">
                  {a.resume}
                </p>
                <Link
                  href={`/actualites/${a.slug}`}
                  className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.2em] uppercase font-medium transition-all self-start px-4 py-2 rounded-full border"
                  style={{ color: a.tagColor, borderColor: `${a.tagColor}40` }}
                >
                  Voir plus
                  <ArrowRight size={11} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-serif italic text-encre/40 text-xl">{labels.vide}</p>
          </div>
        )}
      </div>
    </div>
  );
}
