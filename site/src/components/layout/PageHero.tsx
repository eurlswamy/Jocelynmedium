"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string;
  romanNumeral?: string;
  compact?: boolean;
  hideBreadcrumb?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  romanNumeral,
  compact = false,
  hideBreadcrumb = true,
}: PageHeroProps) {
  return (
    <section className={`relative flex items-end overflow-hidden bg-encre ${compact ? "min-h-[32vh] pt-28 pb-10 md:pb-14" : "min-h-[55vh] md:min-h-[65vh] pt-32 pb-16 md:pb-24"}`}>
      {/* Fond cosmique animé */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(27, 122, 143, 0.35) 0%, transparent 50%), radial-gradient(ellipse at 75% 40%, rgba(197, 123, 92, 0.25) 0%, transparent 45%), radial-gradient(ellipse at center, #1A2847 0%, #0B1929 60%, #000000 100%)",
        }}
      />

      {/* Étoiles */}
      <div aria-hidden className="absolute inset-0 opacity-40">
        {Array.from({ length: 70 }).map((_, i) => {
          const x = (i * 41.7) % 100;
          const y = (i * 67.3) % 100;
          const size = ((i * 7) % 2) + 1;
          return (
            <span
              key={i}
              className="absolute rounded-full bg-ivoire animate-twinkle"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${(i % 20) / 10}s`,
              }}
            />
          );
        })}
      </div>

      {/* Numéro romain en filigrane */}
      {romanNumeral && (
        <div
          aria-hidden
          className="absolute -right-12 md:-right-24 top-1/2 -translate-y-1/2 font-serif text-[20rem] md:text-[32rem] leading-none text-or-doux/[0.06] select-none pointer-events-none"
        >
          {romanNumeral}
        </div>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        {!hideBreadcrumb && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 font-sans text-[11px] tracking-widest uppercase text-ivoire/55 mb-12 md:mb-16"
          >
            <Link href="/" className="hover:text-or-clair transition-colors">
              Accueil
            </Link>
            <ChevronRight size={12} className="text-or-doux/60" />
            <span className="text-or-clair">{eyebrow}</span>
          </motion.nav>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          <div
            className="pl-6 lg:pl-8"
            style={{ borderLeft: "1px solid rgba(201, 169, 97, 0.5)" }}
          >
            <p className="text-or-clair font-sans text-[11px] md:text-xs tracking-[0.5em] uppercase mb-5 md:mb-7">
              {eyebrow}
            </p>

            <h1 className={`font-serif text-ivoire leading-[1] tracking-tight mb-6 md:mb-8 ${compact ? "text-3xl md:text-4xl lg:text-5xl" : "text-5xl md:text-6xl lg:text-7xl xl:text-8xl"}`}>
              {title}
              {titleAccent && (
                <>
                  <br />
                  <span className="italic font-light text-or-clair">
                    {titleAccent}
                  </span>
                </>
              )}
            </h1>

            {description && (
              <p className="font-sans text-ivoire/85 text-base md:text-lg leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bande dorée du bas */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-or-doux to-transparent opacity-50"
      />
    </section>
  );
}
