"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function FloatingCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const isHidden =
    pathname.startsWith("/reserver") || pathname === "/contact";
  const isHome = pathname === "/";

  useEffect(() => {
    // Sur l'accueil : on cache le bouton tant qu'on est dans le héros (plein écran),
    // puis on l'affiche dès la première section. Ailleurs : dès un petit scroll.
    const onScroll = () => {
      const threshold = isHome ? window.innerHeight * 0.85 : 80;
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <AnimatePresence>
      {visible && !isHidden && (
        <motion.div
          key="floating-cta"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-4 z-50 md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <Link
            href="/reserver"
            className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-or-doux text-encre font-sans text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-or-clair transition-colors"
            style={{
              border: "1.5px solid rgba(250,246,238,0.85)",
              boxShadow: "0 10px 30px -6px rgba(201,169,97,0.6), 0 6px 18px rgba(0,0,0,0.18)",
            }}
          >
            <Calendar size={13} strokeWidth={2.2} />
            <span>Réserver</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
