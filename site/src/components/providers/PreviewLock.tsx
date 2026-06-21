"use client";

import { useEffect } from "react";

/**
 * PreviewLock , désactive toute navigation (liens & boutons) en mode aperçu client.
 * Activé uniquement quand NEXT_PUBLIC_PREVIEW_LOCK=true.
 */
export function PreviewLock() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Remonter jusqu'à trouver un <a> ou un <button> dans la chaîne de cibles
      let target = e.target as HTMLElement | null;
      while (target) {
        if (
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.getAttribute("role") === "button" ||
          target.getAttribute("role") === "link"
        ) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        target = target.parentElement;
      }
    };

    // Capture phase pour attraper tous les clics avant les handlers React
    document.addEventListener("click", handler, true);

    // Cursor visuel uniquement , pas de pointer-events pour ne pas casser le swipe natif
    const style = document.createElement("style");
    style.id = "preview-lock-style";
    style.textContent = `
      a, button, [role="button"], [role="link"] {
        cursor: default !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("click", handler, true);
      document.getElementById("preview-lock-style")?.remove();
    };
  }, []);

  return null;
}
