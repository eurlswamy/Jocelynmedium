"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const AVIS = [
  {
    name: "Sandrine M.",
    initials: "SM",
    photo: "/images/temoignages/sandrine-m.jpg",
    location: "Saint-Denis, La Réunion",
    rating: 5,
    text: "Jocelyn a une approche très professionnelle et bienveillante. J'avais des doutes au départ, et il m'a donné des informations précises que personne ne pouvait connaître. Je recommande vivement.",
    date: "Il y a 2 mois",
    duration: "1:42",
    gradient: "linear-gradient(135deg, #1B7A8F 0%, #2BA5BD 50%, #0B1929 100%)",
    accentHex: "#1B7A8F",
  },
  {
    name: "Christophe L.",
    initials: "CL",
    photo: "/images/temoignages/christophe-l.jpg",
    location: "Saint-Pierre, La Réunion",
    rating: 5,
    text: "Consultation par téléphone très fluide. Aucun jugement, juste une vraie écoute. Les éléments donnés se sont vérifiés dans les semaines qui ont suivi. Merci pour cette honnêteté qui change.",
    date: "Il y a 3 mois",
    duration: "2:08",
    gradient: "linear-gradient(135deg, #C9A961 0%, #E8C77A 50%, #B87333 100%)",
    accentHex: "#C9A961",
  },
  {
    name: "Émilie R.",
    initials: "ER",
    photo: "/images/temoignages/emilie-r.jpg",
    location: "Port-Louis, Île Maurice",
    rating: 5,
    text: "J'ai consulté à distance depuis Maurice. Aussi précis qu'en présentiel. Jocelyn ne dit pas ce qu'on a envie d'entendre, il dit ce qu'il voit. C'est rare et précieux.",
    date: "Il y a 6 mois",
    duration: "1:25",
    gradient: "linear-gradient(135deg, #C57B5C 0%, #E8A084 50%, #8B4A2F 100%)",
    accentHex: "#C57B5C",
  },
  {
    name: "Patrick D.",
    initials: "PD",
    photo: "/images/temoignages/patrick-d.jpg",
    location: "Saint-Clotilde, La Réunion",
    rating: 5,
    text: "Ambiance zen au cabinet, aucune mise en scène. On sent quelqu'un qui maîtrise vraiment son sujet depuis longtemps. Les conseils donnés m'ont fait gagner du temps et de l'argent, comme promis.",
    date: "Il y a 1 mois",
    duration: "2:31",
    gradient: "linear-gradient(135deg, #1A2847 0%, #1B7A8F 50%, #2BA5BD 100%)",
    accentHex: "#1B7A8F",
  },
  {
    name: "Nadia B.",
    initials: "NB",
    photo: "/images/temoignages/nadia-b.jpg",
    location: "Le Tampon, La Réunion",
    rating: 5,
    text: "Une consultation qui m'a apaisée. Jocelyn m'a parlé avec franchise mais sans jamais me brusquer. Plusieurs choses qu'il a vues se sont confirmées depuis. Merci pour cette clarté.",
    date: "Il y a 4 mois",
    duration: "1:58",
    gradient: "linear-gradient(135deg, #B87333 0%, #C9A961 50%, #1C1C1C 100%)",
    accentHex: "#B87333",
  },
];

export function Avis() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevIndex = (activeIndex - 1 + AVIS.length) % AVIS.length;
  const nextIndex = (activeIndex + 1) % AVIS.length;
  const current = AVIS[activeIndex];

  const goPrev = () => setActiveIndex(prevIndex);
  const goNext = () => setActiveIndex(nextIndex);

  // Contrôles vidéo (carte centrale uniquement)
  const [centerVideo, setCenterVideo] = useState<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const scrubberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!centerVideo) return;

    const onTime = () => setCurrentTime(centerVideo.currentTime);
    const onLoaded = () => setDuration(centerVideo.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    centerVideo.addEventListener("timeupdate", onTime);
    centerVideo.addEventListener("loadedmetadata", onLoaded);
    centerVideo.addEventListener("play", onPlay);
    centerVideo.addEventListener("pause", onPause);

    // Synchro initiale (le ref peut arriver après que la vidéo a déjà ses métadonnées)
    if (centerVideo.duration && Number.isFinite(centerVideo.duration)) {
      setDuration(centerVideo.duration);
    }
    setIsPlaying(!centerVideo.paused);
    setIsMuted(centerVideo.muted);
    setCurrentTime(centerVideo.currentTime);

    return () => {
      centerVideo.removeEventListener("timeupdate", onTime);
      centerVideo.removeEventListener("loadedmetadata", onLoaded);
      centerVideo.removeEventListener("play", onPlay);
      centerVideo.removeEventListener("pause", onPause);
    };
  }, [centerVideo]);

  const togglePlay = () => {
    if (!centerVideo) return;
    if (centerVideo.paused) {
      centerVideo.play().catch(() => {});
    } else {
      centerVideo.pause();
    }
  };

  const toggleMute = () => {
    if (!centerVideo) return;
    centerVideo.muted = !centerVideo.muted;
    setIsMuted(centerVideo.muted);
  };

  const handleScrub = (clientX: number) => {
    if (!centerVideo || !scrubberRef.current) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const dur = centerVideo.duration;
    if (dur && Number.isFinite(dur)) {
      centerVideo.currentTime = ratio * dur;
    }
  };

  return (
    <section
      id="avis"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: "var(--color-blanc-casse)" }}
    >
      {/* Motif fond */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 25%, var(--color-bleu-majorelle) 0%, transparent 38%), radial-gradient(circle at 88% 75%, var(--color-terre-cuite) 0%, transparent 38%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <p className="text-encre font-sans text-xs tracking-[0.45em] uppercase mb-4">
            Témoignages vidéo
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-encre leading-[1.02] tracking-tight">
            Ce qu&apos;en disent{" "}
            <span className="italic text-bleu-majorelle">
              celles et ceux que j&apos;ai accompagnés.
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Gauche : texte du témoignage actif (compact + raffiné) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-xl"
              >
                {/* En-tête : étoiles + date sur une seule ligne */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className="fill-or-doux text-or-doux"
                      />
                    ))}
                  </div>
                  <span
                    aria-hidden
                    className="h-3 w-px"
                    style={{ backgroundColor: `${current.accentHex}55` }}
                  />
                  <p className="font-sans text-encre/55 text-[11px] tracking-[0.18em] uppercase tabular-nums">
                    {current.date}
                  </p>
                </div>

                {/* Citation : icône réduite + texte plus contenu */}
                <Quote
                  size={28}
                  strokeWidth={1.5}
                  className="mb-4"
                  style={{ color: current.accentHex, opacity: 0.7 }}
                />

                <p className="font-serif italic text-encre text-lg md:text-xl lg:text-[1.4rem] leading-[1.5] mb-7">
                  «&nbsp;{current.text}&nbsp;»
                </p>

                {/* Signature : avatar + nom + lieu */}
                <div className="flex items-center gap-3.5">
                  <div
                    className="relative w-12 h-12 rounded-full overflow-hidden shadow-md shrink-0"
                    style={{
                      boxShadow: `0 0 0 1px ${current.accentHex}33, 0 8px 22px -8px rgba(0,0,0,0.25)`,
                    }}
                  >
                    <img
                      src={current.photo}
                      alt={`Portrait de ${current.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-encre text-[15px] leading-tight">
                      {current.name}
                    </p>
                    <p className="font-sans text-encre/55 text-[12px] mt-0.5 tracking-wide">
                      {current.location}
                    </p>
                  </div>
                </div>

                {/* Compteur + barre de progression discrète */}
                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-encre/12">
                  <span className="font-sans text-encre/50 text-[11px] tracking-[0.3em] uppercase tabular-nums">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(AVIS.length).padStart(2, "0")}
                  </span>
                  <div className="flex-1 h-px bg-encre/10 relative">
                    <motion.div
                      className="absolute inset-y-0 left-0"
                      style={{ backgroundColor: current.accentHex }}
                      animate={{
                        width: `${((activeIndex + 1) / AVIS.length) * 100}%`,
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Droite : deck de vidéos */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative h-[400px] md:h-[440px] lg:h-[480px] flex items-center justify-center">
            {/* Card previous (gauche, scale down) */}
            <button
              onClick={goPrev}
              aria-label={`Témoignage précédent : ${AVIS[prevIndex].name}`}
              className="hidden md:block absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-10 cursor-pointer group"
              style={{ width: "22%", aspectRatio: "9/16" }}
            >
              <motion.div
                key={`prev-${prevIndex}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.55, x: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full overflow-hidden rounded-3xl border border-encre/15 shadow-xl group-hover:opacity-80 transition-opacity"
                style={{ background: AVIS[prevIndex].gradient, filter: "blur(1.5px)" }}
              >
                <video
                  src="/videos/temoignage-mock.mp4"
                  poster="/videos/temoignage-mock-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-sans font-medium text-ivoire text-2xl tracking-widest" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.7)" }}>
                    {AVIS[prevIndex].initials}
                  </span>
                </div>
              </motion.div>
            </button>

            {/* Card next (droite, scale down) */}
            <button
              onClick={goNext}
              aria-label={`Témoignage suivant : ${AVIS[nextIndex].name}`}
              className="hidden md:block absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-10 cursor-pointer group"
              style={{ width: "22%", aspectRatio: "9/16" }}
            >
              <motion.div
                key={`next-${nextIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 0.55, x: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full overflow-hidden rounded-3xl border border-encre/15 shadow-xl group-hover:opacity-80 transition-opacity"
                style={{ background: AVIS[nextIndex].gradient, filter: "blur(1.5px)" }}
              >
                <video
                  src="/videos/temoignage-mock.mp4"
                  poster="/videos/temoignage-mock-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-sans font-medium text-ivoire text-2xl tracking-widest" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.7)" }}>
                    {AVIS[nextIndex].initials}
                  </span>
                </div>
              </motion.div>
            </button>

            {/* Card current (centre, foreground) */}
            <div className="relative z-20 mx-auto" style={{ width: "48%", aspectRatio: "9/16" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full overflow-hidden rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.45)]"
                  style={{ background: current.gradient }}
                >
                  {/* Vidéo (même fichier pour les 3 cartes : juste pour illustrer la mise en page) */}
                  <video
                    ref={setCenterVideo}
                    src="/videos/temoignage-mock.mp4"
                    poster="/videos/temoignage-mock-poster.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onClick={togglePlay}
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                  />

                  {/* Voile pour contraste (laisse passer les clics vers la vidéo) */}
                  <div aria-hidden className="absolute inset-0 bg-black/20 pointer-events-none" />

                  {/* Cadre or */}
                  <div aria-hidden className="absolute inset-2 border border-or-doux/35 pointer-events-none" />

                  {/* Coins ornement */}
                  <div aria-hidden className="absolute top-3 left-3 w-6 h-6 pointer-events-none" style={{ borderTop: "1px solid rgba(232,199,122,0.7)", borderLeft: "1px solid rgba(232,199,122,0.7)" }} />
                  <div aria-hidden className="absolute top-3 right-3 w-6 h-6 pointer-events-none" style={{ borderTop: "1px solid rgba(232,199,122,0.7)", borderRight: "1px solid rgba(232,199,122,0.7)" }} />
                  <div aria-hidden className="absolute bottom-3 left-3 w-6 h-6 pointer-events-none" style={{ borderBottom: "1px solid rgba(232,199,122,0.7)", borderLeft: "1px solid rgba(232,199,122,0.7)" }} />
                  <div aria-hidden className="absolute bottom-3 right-3 w-6 h-6 pointer-events-none" style={{ borderBottom: "1px solid rgba(232,199,122,0.7)", borderRight: "1px solid rgba(232,199,122,0.7)" }} />

                  {/* Overlay Play affiché quand la vidéo est en pause */}
                  {!isPlaying && (
                    <button
                      onClick={togglePlay}
                      aria-label="Lancer la vidéo"
                      className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 backdrop-blur-[2px] group"
                    >
                      <span className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-or-doux text-encre shadow-[0_10px_40px_-5px_rgba(201,169,97,0.6)] group-hover:scale-110 transition-transform">
                        <Play size={24} strokeWidth={2} fill="currentColor" className="ml-0.5" />
                      </span>
                    </button>
                  )}

                  {/* Mute toggle (haut droite) */}
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Activer le son" : "Couper le son"}
                    className="absolute top-3 right-12 z-30 flex items-center justify-center w-8 h-8 rounded-full bg-encre/70 backdrop-blur-sm border border-or-doux/30 text-ivoire hover:bg-encre/90 hover:text-or-clair transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX size={14} strokeWidth={1.8} />
                    ) : (
                      <Volume2 size={14} strokeWidth={1.8} />
                    )}
                  </button>

                  {/* Bas de carte : identité (gauche) + scrubber (droite) */}
                  <div className="absolute bottom-0 inset-x-0 p-5 z-20 bg-gradient-to-t from-black/85 via-black/55 to-transparent">
                    <div className="flex items-end justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-ivoire text-lg leading-tight mb-1 truncate">
                          {current.name}
                        </p>
                        <p className="font-sans text-ivoire/85 text-[11px] tracking-wide truncate">
                          {current.location}
                        </p>
                      </div>

                      {/* Scrubber en bas à droite */}
                      <div className="shrink-0 flex flex-col items-end gap-1.5 w-28 md:w-32">
                        <div
                          ref={scrubberRef}
                          role="slider"
                          tabIndex={0}
                          aria-label="Position de lecture"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={
                            duration > 0
                              ? Math.round((currentTime / duration) * 100)
                              : 0
                          }
                          onClick={(e) => handleScrub(e.clientX)}
                          onKeyDown={(e) => {
                            if (!centerVideo || !duration) return;
                            if (e.key === "ArrowRight") {
                              centerVideo.currentTime = Math.min(
                                duration,
                                centerVideo.currentTime + 1
                              );
                            } else if (e.key === "ArrowLeft") {
                              centerVideo.currentTime = Math.max(
                                0,
                                centerVideo.currentTime - 1
                              );
                            }
                          }}
                          className="relative w-full h-1.5 bg-ivoire/25 rounded-full cursor-pointer hover:h-2 transition-all"
                        >
                          <div
                            className="absolute inset-y-0 left-0 bg-or-doux rounded-full"
                            style={{
                              width:
                                duration > 0
                                  ? `${(currentTime / duration) * 100}%`
                                  : "0%",
                            }}
                          />
                        </div>
                        <span className="font-sans text-or-clair text-[10px] tracking-wide tabular-nums">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Badge "VIDÉO" */}
                  <div className="absolute top-4 left-4 px-2 py-1 bg-encre/85 text-or-clair text-[9px] tracking-[0.3em] uppercase font-medium border border-or-doux/30 pointer-events-none">
                    Vidéo
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Flèches navigation */}
            <button
              onClick={goPrev}
              aria-label="Témoignage précédent"
              className="absolute left-2 lg:-left-12 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-ivoire border border-encre/15 text-encre hover:bg-encre hover:text-ivoire shadow-lg transition-all"
            >
              <ChevronLeft size={20} strokeWidth={1.8} />
            </button>
            <button
              onClick={goNext}
              aria-label="Témoignage suivant"
              className="absolute right-2 lg:-right-12 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-ivoire border border-encre/15 text-encre hover:bg-encre hover:text-ivoire shadow-lg transition-all"
            >
              <ChevronRight size={20} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Note */}
        <p className="text-center font-serif italic text-encre/55 text-sm mt-14 max-w-xl mx-auto">
          Témoignages publiés avec consentement. Prénoms parfois modifiés pour
          préserver la confidentialité.
        </p>
      </div>
    </section>
  );
}
