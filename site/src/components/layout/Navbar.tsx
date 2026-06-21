"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Calendar, X, Home, Sparkles, Eye, User, Tv, Newspaper, Mail, Menu } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Accueil", Icon: Home },
  { href: "/services", label: "Services", Icon: Sparkles },
  { href: "/methodes", label: "Méthodes", Icon: Eye },
  { href: "/a-propos", label: "Qui je suis", Icon: User },
  { href: "/temoignages", label: "Médias", Icon: Tv },
  { href: "/actualites", label: "Actualités", Icon: Newspaper },
  { href: "/contact", label: "Contact", Icon: Mail },
];

const LIGHT_BG_PAGES = ["/a-propos", "/services", "/contact", "/reserver", "/temoignages", "/actualites", "/methodes"];
const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const isLightPage = LIGHT_BG_PAGES.some((p) => pathname.startsWith(p));
  const forceOpaque = isLightPage || scrolled;

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-[80]"
      >
        {/* Fond : le flou est constant (statique) pour rester fluide ; seule
            l'opacité du voile change au scroll (animer backdrop-filter est
            coûteux et saccadé, on l'évite). */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            willChange: "opacity",
          }}
          animate={{
            background: forceOpaque
              ? "linear-gradient(180deg, rgba(11,25,41,0.97) 0%, rgba(11,25,41,0.93) 100%)"
              : "linear-gradient(180deg, rgba(11,25,41,0.32) 0%, rgba(11,25,41,0.05) 100%)",
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />

        {/* Liseré or */}
        <motion.div
          className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
          animate={{ opacity: forceOpaque ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,97,0.5) 30%, rgba(232,199,122,0.8) 50%, rgba(201,169,97,0.5) 70%, transparent)" }}
        />

        <div className="relative max-w-[1400px] mx-auto px-5 md:px-12 lg:px-16">
          {/* Header : 68px sur mobile (un peu plus aéré), 72px sur desktop */}
          <div className="flex items-center justify-between h-[68px] md:h-[72px]">

            {/* Logo : monogramme JAS + sous-titre fin sur mobile pour une
                signature plus premium et lisible qu'un simple "JAS". */}
            <Link href="/" aria-label="Jocelyn Amir Swamy, accueil" className="shrink-0 group flex items-center gap-3">
              <span className="font-serif text-ivoire text-2xl tracking-[0.18em] group-hover:text-or-clair transition-colors duration-300 font-medium leading-none">
                JAS
              </span>
              {/* Sous-titre visible sur mobile uniquement (le desktop a déjà la nav) */}
              <span className="lg:hidden flex items-center gap-2.5">
                <span aria-hidden className="h-5 w-px bg-or-doux/40" />
                <span className="flex flex-col leading-none">
                  <span className="font-serif italic text-or-clair text-[13px] leading-tight">Jocelyn Amir</span>
                  <span className="font-sans text-ivoire/55 text-[8px] tracking-[0.32em] uppercase mt-0.5">Médium voyant</span>
                </span>
              </span>
            </Link>

                    {/* Nav desktop avec curseur glissant + cercle englobant */}
            <NavDesktop active={forceOpaque} />

            {/* CTA + burger */}
            <div className="flex items-center gap-4">
              <Link
                href="/reserver"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full font-sans text-[10px] tracking-[0.22em] uppercase font-semibold text-encre hover:bg-or-clair transition-colors duration-300"
                style={{ background: "#C9A961", boxShadow: "0 2px 14px -4px rgba(201,169,97,0.5)" }}
              >
                <Calendar size={11} strokeWidth={2.5} />
                Réserver
              </Link>

              {/* Bouton menu mobile : pastille verre dépoli liserée or, plus
                  nette et premium que l'ancien "Menu + deux traits". */}
              <button
                aria-label="Ouvrir le menu"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full text-ivoire hover:text-or-clair transition-colors duration-300 active:scale-95"
                style={{
                  background: "rgba(247,243,236,0.08)",
                  border: "1px solid rgba(201,169,97,0.45)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
              >
                <Menu size={20} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[88] bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-[90] w-full max-w-sm flex flex-col"
              style={{ background: "linear-gradient(160deg, #0B1929 0%, #0F2035 60%, #0B1929 100%)" }}
            >
              <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span key={i} className="absolute rounded-full bg-ivoire animate-twinkle" style={{ left: `${(i * 41.7) % 100}%`, top: `${(i * 67.3) % 100}%`, width: `${((i * 5) % 2) + 1}px`, height: `${((i * 5) % 2) + 1}px`, animationDelay: `${(i % 20) / 10}s` }} />
                ))}
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(201,169,97,0.6) 30%, rgba(232,199,122,0.8) 50%, rgba(201,169,97,0.6) 70%, transparent)" }} />

              <div className="relative flex flex-col h-full px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" onClick={() => setMobileOpen(false)} aria-label="Jocelyn Amir Swamy, accueil">
                    <span className="font-serif text-ivoire text-2xl tracking-[0.18em] font-medium">JAS</span>
                  </Link>
                  <button onClick={() => setMobileOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full border border-ivoire/15 text-ivoire/60 hover:text-or-clair hover:border-or-doux/40 transition-all">
                    <X size={17} strokeWidth={1.5} />
                  </button>
                </div>

                <nav className="flex flex-col flex-1 gap-2 overflow-y-auto scrollbar-hidden -mx-1 px-1">
                  {NAV_LINKS.map((link, i) => {
                    const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                    const LinkIcon = link.Icon;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 + 0.12, ease: EASE, duration: 0.45 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }}
                          className="group relative flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-300"
                          style={{
                            background: active
                              ? "linear-gradient(135deg, rgba(201,169,97,0.18) 0%, rgba(201,169,97,0.04) 100%)"
                              : "rgba(255,255,255,0.025)",
                            border: active ? "1px solid rgba(201,169,97,0.45)" : "1px solid rgba(247,243,236,0.07)",
                          }}
                        >
                          {/* Médaillon icône */}
                          <span
                            className="relative flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-colors duration-300"
                            style={{
                              background: active ? "rgba(201,169,97,0.22)" : "rgba(255,255,255,0.04)",
                              border: active ? "1px solid rgba(201,169,97,0.5)" : "1px solid rgba(247,243,236,0.12)",
                              color: active ? "#E8C77A" : "rgba(247,243,236,0.55)",
                            }}
                          >
                            <LinkIcon size={16} strokeWidth={1.6} />
                          </span>

                          <span
                            className="font-serif italic text-xl leading-none flex-1 transition-colors duration-300"
                            style={{ color: active ? "#E8C77A" : "rgba(247,243,236,0.92)" }}
                          >
                            {link.label}
                          </span>

                          <span
                            className="font-sans text-base transition-all duration-300 group-hover:translate-x-1"
                            style={{ color: active ? "rgba(232,199,122,0.8)" : "rgba(247,243,236,0.25)" }}
                          >
                            →
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, ease: EASE }} className="pt-6">
                  <Link href="/reserver" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-sans text-xs tracking-[0.25em] uppercase font-semibold text-encre" style={{ background: "#C9A961", boxShadow: "0 8px 32px -8px rgba(201,169,97,0.5)" }}>
                    <Calendar size={12} strokeWidth={2.5} />
                    Réserver une consultation
                  </Link>
                  <p className="text-center font-serif italic text-ivoire/30 text-xs mt-5 tracking-wider">Saint-Clotilde · La Réunion</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavDesktop({ active }: { active: boolean }) {
  const [cursorPos, setCursorPos] = useState({ left: 0, width: 0, opacity: 0 });
  const pathname = usePathname();

  return (
    <nav
      className="hidden lg:flex items-center relative px-2.5 py-2 rounded-full transition-colors duration-300"
      style={{
        border: active ? "1px solid rgba(247,243,236,0.30)" : "1px solid rgba(247,243,236,0.14)",
        background: active ? "rgba(11,25,41,0.55)" : "rgba(11,25,41,0.28)",
        backdropFilter: "blur(16px) saturate(150%)",
        WebkitBackdropFilter: "blur(16px) saturate(150%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), 0 8px 30px -12px rgba(0,0,0,0.5)",
      }}
      onMouseLeave={() => setCursorPos((p) => ({ ...p, opacity: 0 }))}
    >
      {/* Curseur glissant au hover */}
      <motion.div
        animate={cursorPos}
        transition={{ type: "spring", stiffness: 500, damping: 38, mass: 0.6 }}
        className="absolute z-0 h-8 rounded-full pointer-events-none"
        style={{ background: "rgba(201,169,97,0.18)", border: "1px solid rgba(201,169,97,0.35)" }}
      />

      {/* Indicateur page active */}
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
        return (
          <NavTab key={link.href} href={link.href} setCursorPos={setCursorPos} isActive={isActive} scrolled={active}>
            {link.label}
          </NavTab>
        );
      })}
    </nav>
  );
}

function NavTab({
  href,
  children,
  setCursorPos,
  isActive,
  scrolled,
}: {
  href: string;
  children: React.ReactNode;
  setCursorPos: (pos: { left: number; width: number; opacity: number }) => void;
  isActive: boolean;
  scrolled: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Au scroll (fond opaque) : texte blanc franc. Sinon : ivoire légèrement atténué.
  const color = isActive
    ? "#FFFFFF"
    : scrolled
    ? "rgba(255,255,255,0.92)"
    : "rgba(247,243,236,0.66)";

  return (
    <Link
      ref={ref}
      href={href}
      onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setCursorPos({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10 px-3.5 py-1.5 font-sans text-[11px] tracking-[0.18em] uppercase transition-colors duration-150"
      style={{ color }}
    >
      {isActive && (
        <span
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(201,169,97,0.55)", background: "rgba(201,169,97,0.08)" }}
        />
      )}
      {children}
    </Link>
  );
}
