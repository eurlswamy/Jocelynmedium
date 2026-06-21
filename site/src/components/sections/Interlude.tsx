"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Interlude() {
  return (
    <section
      className="relative bg-encre-fonce overflow-hidden"
      aria-label="Interlude poétique"
    >
      <div className="relative h-[60vh] md:h-[80vh] w-full">
        {/* Image lanternes en background */}
        <Image
          src="/images/lanternes-flottantes.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />

        {/* Overlay léger pour lisibilité de la citation */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,25,41,0.55) 0%, rgba(11,25,41,0.3) 40%, rgba(11,25,41,0.55) 100%)",
          }}
        />

        {/* Citation centrale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
        >
          <div className="text-center max-w-3xl">
            <p
              className="text-or-clair font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
            >
              Avant de continuer
            </p>
            <p
              className="font-serif italic text-2xl md:text-4xl lg:text-5xl text-ivoire leading-[1.25]"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.85)" }}
            >
              «&nbsp;Tout l&apos;entretien est strictement
              <br className="hidden md:inline" />
              <span className="text-or-clair"> confidentiel.</span>
              <br className="hidden md:inline" />
              Mieux vaut consulter seul.&nbsp;»
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
