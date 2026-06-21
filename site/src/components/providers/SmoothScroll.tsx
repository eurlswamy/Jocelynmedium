"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Enregistre ScrollTrigger sur le scroll natif du navigateur.
 * Lenis retiré : il superposait une inertie artificielle au-dessus
 * du momentum natif des trackpads macOS, créant un décalage de plusieurs secondes.
 * Le scroll natif est instantané et déjà fluide sur tous les appareils modernes.
 */
export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Synchronise ScrollTrigger avec le scroll natif. Après le premier paint
    // (rAF) pour que les hauteurs (héros sticky, section 480vh) soient résolues.
    requestAnimationFrame(() => ScrollTrigger.refresh());

    // NB : pas de kill() ici. Ce composant ne crée aucun ScrollTrigger ;
    // appeler ScrollTrigger.getAll().kill() au démontage tuait aussi le trigger
    // du HeroParallax (canvas figé, animation qui ne se lançait plus). Chaque
    // composant nettoie ses propres triggers dans son effet.
  }, []);

  return null;
}
