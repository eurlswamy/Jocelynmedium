"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "gold" | "outline" | "ghost";
type Size = "default" | "lg";

const base =
  "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-or-doux/60 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

const variants: Record<Variant, string> = {
  gold: "bg-or-doux text-encre hover:bg-or-clair hover:shadow-lg hover:shadow-or-doux/30",
  outline:
    "border border-or-doux/40 text-ivoire bg-encre/30 backdrop-blur-md hover:bg-encre/50 hover:border-or-doux/70 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)]",
  ghost: "text-ivoire hover:text-or-clair",
};

const sizes: Record<Size, string> = {
  default: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  // Quand href est fourni, le bouton devient un lien de navigation (next/link).
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "gold", size = "default", href, ...props }, ref) => {
    const classes = cn(base, variants[variant], sizes[size], className);

    // Lien interne : on rend un <Link> (donc un <a>) pour une vraie navigation.
    if (href) {
      const { children, ...rest } = props;
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return <button ref={ref} className={classes} {...props} />;
  }
);

Button.displayName = "Button";
