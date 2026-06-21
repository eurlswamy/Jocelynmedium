"use client";

import Image from "next/image";

/**
 * Ornement zellige réutilisable : utilisé comme séparateur ou accent décoratif.
 * Variant "small" : petit cercle ~80px (en ligne avec du texte)
 * Variant "medium" : ~160px (comme tampon)
 * Variant "large" : ~280px (centre de section)
 */
type ZelligeProps = {
  size?: "small" | "medium" | "large";
  opacity?: number;
  className?: string;
};

const SIZE_MAP = {
  small: 80,
  medium: 160,
  large: 280,
};

export function Zellige({
  size = "medium",
  opacity = 1,
  className = "",
}: ZelligeProps) {
  const px = SIZE_MAP[size];

  return (
    <div
      className={`relative rounded-full overflow-hidden border-2 border-or-doux/30 shadow-lg ${className}`}
      style={{
        width: px,
        height: px,
        opacity,
      }}
      aria-hidden
    >
      <Image
        src="/images/zellige.png"
        alt=""
        fill
        className="object-cover"
        sizes={`${px}px`}
      />
    </div>
  );
}

/**
 * Séparateur décoratif horizontal : ligne fine + zellige central + ligne fine.
 * Idéal pour terminer une section avec élégance.
 */
export function ZelligeSeparator({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-or-doux/40" />
      <Zellige size="small" />
      <span className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-or-doux/40" />
    </div>
  );
}
