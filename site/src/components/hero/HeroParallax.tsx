"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Heart,
  MapPin,
  Phone,
  Repeat,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { frameStore, isFrameReady } from "./FrameLoader";

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

const servicesContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const serviceCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: EASE_LUXE },
  },
};

const serviceItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_LUXE },
  },
};

const cardHoverTransition = { type: "spring" as const, stiffness: 260, damping: 22 };

const FRAME_COUNT = 193;

// Contenu editable injecte depuis Sanity (page d'accueil, groupes Hero + Intro).
// Tous les champs sont optionnels : repli sur les defauts en dur ci-dessous.
// Les memes champs alimentent les versions mobile ET desktop des memes textes.
export type HeroContent = {
  heroBadge?: string;
  heroTitre?: string;
  heroTitreItalique?: string;
  heroTitreSuite?: string;
  heroDescription?: string;
  heroCta1?: string;
  heroCta2?: string;
  introSurtitre?: string;
  introTitre?: string;
  introTitreItalique?: string;
  introDescription?: string;
  introStats?: { valeur?: string; label?: string }[];
};

function val(value: string | undefined, fallback: string): string {
  return value && value.trim().length > 0 ? value : fallback;
}

export function HeroParallax({ content }: { content?: HeroContent } = {}) {
  // Defauts en dur des textes editables : le site ne se vide jamais.
  const heroBadge = val(content?.heroBadge, "Médium voyant · La Réunion · Depuis 1994");
  const heroTitre = val(content?.heroTitre, "Voir");
  const heroTitreItalique = val(content?.heroTitreItalique, "au-delà");
  const heroTitreSuite = val(content?.heroTitreSuite, "des portes du visible.");
  const heroDescription = val(
    content?.heroDescription,
    "Trente ans de pratique. Quatre méthodes combinées. Une heure de consultation pour des informations concrètes, pas des prédictions floues."
  );
  const heroCta1 = val(content?.heroCta1, "Réserver une consultation");
  const heroCta2 = val(content?.heroCta2, "Mon parcours");

  const introSurtitre = val(content?.introSurtitre, "Qui je suis");
  const introTitre = val(content?.introTitre, "Je m'appelle Jocelyn.");
  const introTitreItalique = val(content?.introTitreItalique, "Médium depuis 1994.");
  const introDescription = val(
    content?.introDescription,
    "Je vous reçois à Saint-Clotilde, à La Réunion. Je vous accompagne aussi par téléphone et en visio, où que vous soyez dans l'Océan Indien. En une heure, je combine quatre approches : clairvoyance, clairaudience, tirage de cartes, et voyance sur photo ou document."
  );
  const introStatValeur = (i: number, fallback: string) =>
    val(content?.introStats?.[i]?.valeur, fallback);
  const introStatLabel = (i: number, fallback: string) =>
    val(content?.introStats?.[i]?.label, fallback);


  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const badgeLayerRef = useRef<HTMLDivElement>(null);
  const introLayerRef = useRef<HTMLDivElement>(null);
  const servicesLayerRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const currentFrameRef = useRef(0);
  const drawnFrameRef = useRef(-1);

  const findClosestLoadedFrame = (target: number): number => {
    if (isFrameReady(target)) return target;
    for (let i = target - 1; i >= 0; i--) {
      if (isFrameReady(i)) return i;
    }
    for (let i = target + 1; i < FRAME_COUNT; i++) {
      if (isFrameReady(i)) return i;
    }
    return -1;
  };

  const drawFrame = (targetFloat: number, force = false) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    // On vise la frame ENTIÈRE la plus proche (arrondi, pas troncature).
    // Avec 193 frames très rapprochées, le crossfade alpha entre deux images
    // était invisible à l'œil mais doublait le coût de dessin à chaque tick GSAP
    // (deux drawImage plein écran + reset). En ne redessinant qu'au changement
    // de frame entière, on passe d'un dessin continu coûteux à ~193 dessins
    // discrets sur tout le scroll : nettement plus fluide, rendu identique.
    const target = Math.round(targetFloat);
    const best = findClosestLoadedFrame(target);
    if (best < 0) return;
    // `force` : redessine même si la frame est identique (repaint après un
    // canvas vidé hors écran, resize, retour de visibilité).
    if (!force && best === drawnFrameRef.current) return;

    const src = frameStore.bitmaps[best] ?? frameStore.frames[best];
    if (!src) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = src instanceof ImageBitmap ? src.width : src.naturalWidth;
    const ih = src instanceof ImageBitmap ? src.height : src.naturalHeight;
    if (!iw || !ih) return;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    ctx.drawImage(src as CanvasImageSource, (cw - dw) / 2, (ch - dh) / 2, dw, dh);

    drawnFrameRef.current = best;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dimensions physiques de la dernière allocation du canvas. On ne réalloue
    // (ce qui VIDE le canvas → flash bleu marine, et re-échelle l'image → zoom)
    // QUE si ces dimensions changent réellement. La hauteur du canvas étant en
    // lvh (stable), la barre Safari qui se rétracte au scroll ne déclenche plus
    // aucune réallocation : l'animation reste intacte et nette pendant le scroll.
    let lastW = 0;
    let lastH = 0;
    const resize = () => {
      // On rend le canvas à la résolution réelle de l'écran (plafonnée à 2x)
      // pour éviter un flou ajouté par le navigateur lors de l'agrandissement.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);
      if (targetW === lastW && targetH === lastH) return;
      canvas.width = targetW;
      canvas.height = targetH;
      lastW = targetW;
      lastH = targetH;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }
      ctxRef.current = ctx;
      drawFrame(currentFrameRef.current, true);
    };

    // Quand l'onglet/la page redevient visible (ou après un retour d'arrière-plan
    // sur mobile), on repeint le canvas au cas où il aurait été vidé.
    const onVisible = () => {
      if (document.visibilityState === "visible") drawFrame(currentFrameRef.current, true);
    };

    // Filet de sécurité MOBILE UNIQUEMENT : un listener scroll direct qui
    // repeint la frame courante tant que le héros est proche du viewport.
    // Corrige le cas où un navigateur mobile vide le canvas hors écran quand on
    // remonte d'un coup. Sur desktop ce listener entrait en concurrence avec le
    // scrub GSAP (deux boucles de dessin sur le même canvas → saccades), donc on
    // l'y désactive : le scrub GSAP suffit et reste fluide.
    const isMobile = window.innerWidth < 768;
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        // Le héros (ou sa zone collante) est-il visible à l'écran ?
        const visible = rect.bottom > 0 && rect.top < window.innerHeight;
        if (!visible) return;
        // On calcule la frame directement depuis la position de scroll (sans la
        // latence du scrub GSAP) pour repeindre la bonne image immédiatement.
        const total = section.offsetHeight - window.innerHeight;
        const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
        const fp = Math.min((p / 0.65) * (FRAME_COUNT - 1), FRAME_COUNT - 1);
        drawFrame(fp, true);
      });
    };

    resize();
    window.addEventListener("resize", resize);
    if (isMobile) window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      if (isMobile) window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const waitForFirstFrame = () => {
      const firstFrame = frameStore.frames[0];
      if (!firstFrame || !firstFrame.complete) {
        setTimeout(waitForFirstFrame, 50);
        return;
      }
      // Dessine la 1re frame puis active le ScrollTrigger. On rafraîchit tout
      // de suite (rAF, après le 1er paint) au lieu d'attendre 400 ms : sinon,
      // l'écran de chargement débloquait le scroll AVANT que GSAP pilote le
      // canvas → fond bleu marine vide tant que le refresh n'avait pas eu lieu,
      // puis l'animation "réapparaissait à 0 %". Un 2e refresh tardif reste en
      // filet pour le cas où des hauteurs (images, polices) se résolvent après.
      drawFrame(0, true);
      initScrollTrigger();
      requestAnimationFrame(() => ScrollTrigger.refresh());
      setTimeout(() => ScrollTrigger.refresh(), 600);
    };

    let trigger: ScrollTrigger | null = null;

    const initScrollTrigger = () => {
      trigger = ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top",
        end: "bottom bottom",
        // Léger lissage : la frame rattrape la position de scroll en douceur
        // plutôt que de coller au pixel (rendu plus soyeux, moins nerveux).
        // Sur mobile on réduit le lissage (0.3) : avec moins de frames qu'au
        // desktop, un scrub long donnait une impression de latence / d'animation
        // qui traîne derrière le doigt. 0.3 colle mieux au scroll tout en
        // gardant un rendu doux. Desktop conserve 0.6 (toutes les frames).
        scrub: window.innerWidth < 768 ? 0.3 : 0.6,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          // Redessine la frame correspondant à la position actuelle après un
          // recalcul (resize, retour sur la page), pour éviter un canvas figé.
          const p = self.progress;
          const fp = Math.min(p / 0.65, 1) * (FRAME_COUNT - 1);
          drawFrame(Math.min(fp, FRAME_COUNT - 1));
        },
        // Quand on revient sur la zone du héros (notamment en remontant depuis
        // le bas), certains navigateurs mobiles vident le canvas hors écran.
        // On force un redessin immédiat de la frame courante pour qu'il ne
        // disparaisse pas le temps d'un instant.
        onEnter: () => drawFrame(currentFrameRef.current, true),
        onEnterBack: () => drawFrame(currentFrameRef.current, true),
        onUpdate: (self) => {
          const p = self.progress;

          const animProgress = Math.min(p / 0.65, 1);
          const floatFrame = Math.min(animProgress * (FRAME_COUNT - 1), FRAME_COUNT - 1);

          currentFrameRef.current = floatFrame;
          // Dessin synchrone : évite que des frames soient perdues lorsqu'on
          // remonte rapidement depuis le bas de la page (le rAF pouvait être
          // throttlé et l'animation semblait "coincée" au retour vers le haut).
          drawFrame(floatFrame);

          // Hero content
          const hero = heroLayerRef.current;
          const badgeLayer = badgeLayerRef.current;
          let heroOp = 1;
          if (p < 0.2) {
            heroOp = 1;
          } else if (p < 0.28) {
            heroOp = 1 - (p - 0.2) / 0.08;
          } else {
            heroOp = 0;
          }
          if (hero) {
            let y = 0;
            if (p < 0.2) {
              y = -p * 60;
            } else if (p < 0.28) {
              y = -12 - (p - 0.2) * 250;
            } else {
              y = -40;
            }
            hero.style.opacity = String(heroOp);
            hero.style.transform = `translateY(${y}px)`;
            hero.style.pointerEvents = heroOp > 0.1 ? "auto" : "none";
          }
          // Badge layer : on ne lui applique QUE l'opacité , pas de transform ,
          // pour que backdrop-filter puisse continuer à flouter la vidéo derrière
          // (toute transformation/translation crée un stacking context qui isole
          // l'élément de la vidéo et tue le blur).
          if (badgeLayer) {
            badgeLayer.style.opacity = String(heroOp);
          }

          // Intro content : on n'applique QUE l'opacité (pas de transform)
          // pour éviter de créer un stacking context qui tuerait le
          // backdrop-filter de la carte "Qui je suis".
          const intro = introLayerRef.current;
          if (intro) {
            let op = 0;
            if (p < 0.28) {
              op = 0;
            } else if (p < 0.4) {
              op = (p - 0.28) / 0.12;
            } else if (p < 0.70) {
              op = 1;
            } else if (p < 0.78) {
              op = 1 - (p - 0.70) / 0.08;
            } else {
              op = 0;
            }
            intro.style.opacity = String(op);
            intro.style.pointerEvents = op > 0.1 ? "auto" : "none";
          }

          // Services content , apparaît à p=0.78, pleinement visible à p=0.94
          // → seulement ~6% d'extra scroll après que les cartes sont affichées
          const services = servicesLayerRef.current;
          if (services) {
            let op = 0;
            let y = 50;
            if (p < 0.78) {
              op = 0;
              y = 50;
            } else if (p < 0.94) {
              op = (p - 0.78) / 0.16;
              y = 50 - (p - 0.78) * 312;
            } else {
              op = 1;
              y = 0;
            }
            services.style.opacity = String(op);
            services.style.transform = `translateY(${y}px)`;
            services.style.pointerEvents = op > 0.1 ? "auto" : "none";
          }

          // Scroll hint , visible tout le long (forte opacité au début, subtile ensuite)
          // pour signaler que l'animation se pilote au scroll.
          const hint = scrollHintRef.current;
          if (hint) {
            let hintOp: number;
            if (p < 0.08) {
              hintOp = 1;
            } else if (p < 0.14) {
              hintOp = 1 - (p - 0.08) / 0.06;
            } else if (p < 0.88) {
              hintOp = 0.32;
            } else {
              hintOp = Math.max(0, 0.32 - (p - 0.88) * 2.67);
            }
            hint.style.opacity = String(hintOp);
          }
        },
      });
    };

    waitForFirstFrame();

    let redrawScheduled = false;
    frameStore.onFrameLoaded = () => {
      if (redrawScheduled) return;
      redrawScheduled = true;
      requestAnimationFrame(() => {
        redrawScheduled = false;
        drawFrame(currentFrameRef.current);
      });
    };

    return () => {
      trigger?.kill();
      frameStore.onFrameLoaded = undefined;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-encre-fonce"
      style={{ height: "480vh" }}
      aria-label="Bienvenue chez Jocelyn Amir"
    >
      <div className="sr-only">
        <h1>Jocelyn Amir, médium voyant à La Réunion</h1>
        <p>
          Voyance, clairvoyance, clairaudience. Au-delà des portes du visible.
          Médium voyant à La Réunion, consultations à Saint-Clotilde ou à
          distance depuis 1994.
        </p>
      </div>

      {/* Hauteur sticky : 100vh sur desktop (scrub GSAP stable), 100dvh
          uniquement sur mobile pour que la barre Safari ne recouvre pas les CTA. */}
      <div className="sticky top-0 hero-sticky-height w-full overflow-hidden">
        {/* Le canvas a une hauteur STABLE (hero-canvas-height = 100lvh sur
            mobile, la grande hauteur barre Safari rétractée), supérieure ou
            égale à la zone collante. Il ne se redimensionne donc PAS quand la
            barre d'adresse Safari se rétracte au scroll : plus de canvas vidé
            (fond bleu marine) ni de re-échelle (effet zoom). Le débordement
            éventuel en bas est masqué par overflow-hidden de la zone collante. */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full hero-canvas-height block"
          style={{ background: "#0B1929" }}
        />

        {/* Overlay sombre uniforme renforcé (~30%) pour la lisibilité des
            textes hero / Qui je suis / Services. Pas de z-index pour rester
            avant badgeLayer dans le flux et permettre au backdrop-filter de
            capturer le voile + la vidéo dans son flou. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "rgba(0,0,0,0.30)",
          }}
        />

        {/* Voile gradient haut/bas pour ressortir le texte */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 22%, rgba(0,0,0,0.08) 78%, rgba(0,0,0,0.42) 100%)",
          }}
        />

        {/* ═══════ Badge eyebrow (DESKTOP) hors heroLayer ═══════
            Calque sans z-index ni transform → pas de stacking context →
            backdrop-filter peut réellement flouter la vidéo derrière.
            Les enfants invisibles (h2/p/buttons) servent à conserver la même
            mise en page verticale que dans heroLayer pour que le badge
            apparaisse exactement à la même position. */}
        <div
          ref={badgeLayerRef}
          className="absolute inset-0 flex items-end md:items-center justify-center md:justify-start pointer-events-none"
        >
          {/* MOBILE : badge verre dépoli centré en bas */}
          <div className="md:hidden w-full px-5 pb-28 pt-8 text-center">
            <span
              className="inline-block px-3 py-1.5 text-ivoire font-sans text-[8.5px] tracking-[0.08em] uppercase mb-3 rounded-full border border-ivoire/25 whitespace-nowrap"
              style={{
                background:
                  "linear-gradient(135deg, rgba(247,243,236,0.10) 0%, rgba(247,243,236,0.04) 100%)",
                backdropFilter: "blur(20px) saturate(150%)",
                WebkitBackdropFilter: "blur(20px) saturate(150%)",
                textShadow: "0 1px 8px rgba(0,0,0,0.55)",
                boxShadow:
                  "0 6px 24px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              {heroBadge}
            </span>
            {/* Espaceurs invisibles pour aligner verticalement avec heroLayer mobile */}
            <h2
              aria-hidden
              className="font-serif text-[clamp(1.65rem,7.5vw,2rem)] leading-[1.08] mb-5 invisible"
            >
              Au-delà des portes du visible.
            </h2>
            <p
              aria-hidden
              className="font-sans text-[13px] leading-relaxed mb-7 px-2 max-w-[42ch] mx-auto invisible"
            >
              Médium voyant à La Réunion depuis plus de 30 ans, au cabinet ou à distance.
            </p>
            <div aria-hidden className="flex flex-col gap-3 px-2 invisible">
              <div className="h-12" />
              <div className="h-12" />
            </div>
          </div>


          {/* DESKTOP : badge verre dépoli aligné gauche au centre vertical */}
          <div className="hidden md:block w-[58%] lg:w-1/2 px-12 lg:px-20 text-left">
            <div className="max-w-2xl">
              <span
                className="inline-block px-5 py-2.5 text-ivoire font-sans text-[10px] lg:text-[11px] tracking-[0.45em] uppercase mb-7 lg:mb-9 rounded-full border border-ivoire/25"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(247,243,236,0.10) 0%, rgba(247,243,236,0.04) 100%)",
                  backdropFilter: "blur(22px) saturate(150%)",
                  WebkitBackdropFilter: "blur(22px) saturate(150%)",
                  textShadow: "0 1px 8px rgba(0,0,0,0.55)",
                  boxShadow:
                    "0 6px 24px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
              >
                {heroBadge}
              </span>
              {/* Espaceurs invisibles pour aligner verticalement avec heroLayer */}
              <h2
                aria-hidden
                className="font-serif text-5xl lg:text-6xl xl:text-7xl leading-[1.02] mb-6 lg:mb-8 tracking-tight invisible"
              >
                Voir au-delà des portes du visible.
              </h2>
              <p
                aria-hidden
                className="font-sans text-base lg:text-lg leading-relaxed mb-10 max-w-md invisible"
              >
                Trente ans de pratique. Quatre méthodes combinées. Une heure de
                consultation pour des informations concrètes, pas des
                prédictions floues.
              </p>
              <div
                aria-hidden
                className="flex flex-col sm:flex-row gap-4 invisible"
              >
                <div className="h-14 w-[200px]" />
                <div className="h-14 w-[180px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Le header global est dans le layout (Navbar) */}

        {/* ═══════ LAYER 1 : Hero ═══════ */}
        <div
          ref={heroLayerRef}
          className="absolute inset-0 z-30 flex items-end md:items-center justify-center md:justify-start"
        >
          {/* MOBILE : texte direct avec text-shadow fort, plus de panneau.
              Le badge "Médium voyant · La Réunion · Depuis 1994" est dans le
              badgeLayer (hors du stacking context) pour bénéficier d'un vrai
              effet verre dépoli. Le placeholder invisible ci-dessous garde
              l'alignement vertical identique. */}
          <div className="md:hidden w-full px-5 pb-28 pt-8 text-center">
            <span
              aria-hidden
              className="inline-block px-3 py-1.5 text-[8.5px] tracking-[0.08em] uppercase mb-3 invisible"
            >
              Médium voyant · La Réunion · 1994
            </span>

            <h2
              className="font-serif text-[clamp(1.65rem,7.5vw,2rem)] leading-[1.08] text-ivoire mb-5"
              style={{
                textShadow:
                  "0 3px 18px rgba(0,0,0,0.95), 0 0 32px rgba(0,0,0,0.8), 0 0 64px rgba(0,0,0,0.5)",
              }}
            >
              {val(content?.heroTitre, "Au-delà des")}{" "}
              <span className="italic font-light text-or-clair underline decoration-or-clair/70 decoration-1 underline-offset-[6px]">
                {val(content?.heroTitreItalique, "portes du visible.")}
              </span>
              {val(content?.heroTitreSuite, "").trim().length > 0 ? <>{" "}{content?.heroTitreSuite}</> : null}
            </h2>

            <p
              className="font-sans text-ivoire/95 text-[13px] leading-relaxed mb-7 px-2 max-w-[42ch] mx-auto text-balance"
              style={{
                textShadow:
                  "0 2px 16px rgba(0,0,0,0.95), 0 0 28px rgba(0,0,0,0.7)",
              }}
            >
              {val(content?.heroDescription, "Médium voyant à La Réunion depuis plus de 30 ans, au cabinet ou à distance.")}
            </p>

            <div className="flex flex-col gap-3 px-2">
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-or-doux text-encre font-medium text-sm tracking-wide hover:bg-or-clair transition-all duration-300"
              >
                {heroCta1}
              </Link>
              <Link
                href="/a-propos"
                className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full border border-white/30 text-ivoire bg-white/10 backdrop-blur-xl font-medium text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] transition-all duration-300"
              >
                {val(content?.heroCta2, "Découvrir mon parcours")}
              </Link>
            </div>
          </div>

          {/* DESKTOP : texte renforcé (le badge eyebrow est dans badgeLayerRef,
              hors du stacking context, pour permettre le vrai blur sur la vidéo) */}
          <div className="hidden md:block w-[58%] lg:w-1/2 px-12 lg:px-20 text-left">
            <div className="max-w-2xl">
              {/* Placeholder invisible occupant la même hauteur que le badge :
                  garde l'alignement vertical du h2 identique. */}
              <span
                aria-hidden
                className="inline-block px-5 py-2.5 text-[10px] lg:text-[11px] tracking-[0.45em] uppercase mb-7 lg:mb-9 invisible"
              >
                Médium voyant · La Réunion · Depuis 1994
              </span>

              <h2
                className="font-serif text-5xl lg:text-6xl xl:text-7xl text-ivoire leading-[1.02] mb-6 lg:mb-8 tracking-tight"
                style={{
                  textShadow:
                    "0 4px 32px rgba(0,0,0,1), 0 2px 12px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.6)",
                }}
              >
                {heroTitre}{" "}
                <span className="italic font-light text-or-clair">
                  {heroTitreItalique}
                </span>{" "}
                {heroTitreSuite}
              </h2>

              <p
                className="font-sans text-ivoire text-base lg:text-lg leading-relaxed mb-10 max-w-md"
                style={{
                  textShadow:
                    "0 2px 16px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.4)",
                }}
              >
                {heroDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/reserver"
                  className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-or-doux text-encre font-medium text-base tracking-wide hover:bg-or-clair hover:shadow-lg hover:shadow-or-doux/30 transition-all duration-300"
                >
                  {heroCta1}
                </Link>
                <Link
                  href="/a-propos"
                  className="inline-flex items-center justify-center h-14 px-8 rounded-full border border-or-doux/40 text-ivoire bg-encre/30 backdrop-blur-md font-medium text-base tracking-wide hover:bg-encre/50 hover:border-or-doux/70 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300"
                >
                  {heroCta2}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ LAYER 2 : Intro ═══════
            Pas de z-index (z-auto) ni de transform en JS → pas de stacking
            context → la carte glassmorphique à l'intérieur peut réellement
            flouter la vidéo derrière via backdrop-filter. */}
        <div
          ref={introLayerRef}
          className="absolute inset-0 flex items-center justify-center opacity-0"
        >
          {/* MOBILE : vraie carte verre dépoli */}
          <div className="md:hidden w-full px-5 py-10">
            <div
              className="relative overflow-hidden border border-or-doux/55 px-5 py-7 text-center rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(20,28,48,0.30) 0%, rgba(15,22,40,0.20) 50%, rgba(11,25,41,0.36) 100%)",
                backdropFilter: "blur(24px) saturate(170%)",
                WebkitBackdropFilter: "blur(24px) saturate(170%)",
                boxShadow:
                  "0 35px 90px -20px rgba(0,0,0,0.75), 0 0 0 1px rgba(201,169,97,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              {/* Voile sombre interne */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.20) 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-1.5 border border-or-doux/25 pointer-events-none"
              />
              <div
                aria-hidden
                className="absolute top-2.5 left-2.5 w-5 h-5 pointer-events-none"
                style={{
                  borderTop: "1px solid rgba(232,199,122,0.65)",
                  borderLeft: "1px solid rgba(232,199,122,0.65)",
                }}
              />
              <div
                aria-hidden
                className="absolute top-2.5 right-2.5 w-5 h-5 pointer-events-none"
                style={{
                  borderTop: "1px solid rgba(232,199,122,0.65)",
                  borderRight: "1px solid rgba(232,199,122,0.65)",
                }}
              />
              <div
                aria-hidden
                className="absolute bottom-2.5 left-2.5 w-5 h-5 pointer-events-none"
                style={{
                  borderBottom: "1px solid rgba(232,199,122,0.65)",
                  borderLeft: "1px solid rgba(232,199,122,0.65)",
                }}
              />
              <div
                aria-hidden
                className="absolute bottom-2.5 right-2.5 w-5 h-5 pointer-events-none"
                style={{
                  borderBottom: "1px solid rgba(232,199,122,0.65)",
                  borderRight: "1px solid rgba(232,199,122,0.65)",
                }}
              />

              <div className="relative flex justify-center mb-5">
                <div className="relative w-24 aspect-[4/5]">
                  <div className="absolute -inset-1.5 border border-or-doux/75" />
                  <div aria-hidden className="absolute inset-0 z-0 bg-encre" />
                  <Image
                    src="/images/jocelyn-portrait.jpg"
                    alt="Jocelyn Amir"
                    fill
                    className="object-cover relative z-10"
                    sizes="120px"
                  />
                </div>
              </div>

              <div className="relative mb-3">
                <p
                  className="text-or-clair font-sans text-[10px] tracking-[0.45em] uppercase"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
                >
                  {introSurtitre}
                </p>
              </div>
              <h3
                className="relative font-serif text-[1.65rem] leading-[1.1] text-ivoire mb-4"
                style={{ textShadow: "0 2px 14px rgba(0,0,0,0.55)" }}
              >
                {val(content?.introTitre, "Je m'appelle Jocelyn.")}
                <br />
                <span className="italic text-or-clair">
                  {content?.introTitreItalique && content.introTitreItalique.trim().length > 0 ? (
                    content.introTitreItalique
                  ) : (
                    <>
                      Médium depuis{" "}
                      <span className="not-italic font-sans font-medium tracking-tight">
                        1994
                      </span>
                      .
                    </>
                  )}
                </span>
              </h3>
              <p
                className="relative font-sans text-ivoire text-[13.5px] leading-relaxed mb-5 px-1"
                style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
              >
                {val(content?.introDescription, "Je vous reçois à Saint-Clotilde. Je vous accompagne aussi par téléphone et en visio. En une heure, je combine clairvoyance, clairaudience, tirage de cartes et voyance sur photo.")}
              </p>

              <div className="relative grid grid-cols-4 gap-2 pt-4 border-t border-or-doux/30">
                <StatMobile number={introStatValeur(0, "30+")} label={introStatLabel(0, "Ans")} />
                <StatMobile number={introStatValeur(1, "4")} label={introStatLabel(1, "Méthodes")} />
                <StatMobile number={introStatValeur(2, "1h")} label={introStatLabel(2, "Séance")} />
                <StatMobile number={introStatValeur(3, "15ans")} label={introStatLabel(3, "de TV")} />
              </div>
            </div>
          </div>

          {/* DESKTOP : vraie carte verre dépoli (fond très transparent + blur fort) */}
          <div className="hidden md:flex max-w-6xl w-full px-8 lg:px-12 items-center justify-center">
            <div
              className="relative w-full overflow-hidden border border-or-doux/55 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(20,28,48,0.14) 0%, rgba(15,22,40,0.10) 45%, rgba(11,25,41,0.18) 100%)",
                backdropFilter: "blur(28px) saturate(180%)",
                WebkitBackdropFilter: "blur(28px) saturate(180%)",
                boxShadow:
                  "0 50px 140px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(201,169,97,0.18), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -2px 30px rgba(0,0,0,0.35)",
              }}
            >
              {/* Voile sombre additionnel pour la lisibilité */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.25) 100%)",
                }}
              />

              {/* Liseré or interne double */}
              <div
                aria-hidden
                className="absolute inset-2 border border-or-doux/30 pointer-events-none"
              />
              <div
                aria-hidden
                className="absolute inset-3.5 border border-or-doux/12 pointer-events-none"
              />

              {/* Ornement coin haut-gauche */}
              <div
                aria-hidden
                className="absolute top-4 left-4 w-8 h-8 pointer-events-none"
                style={{
                  borderTop: "1px solid rgba(232,199,122,0.6)",
                  borderLeft: "1px solid rgba(232,199,122,0.6)",
                }}
              />
              <div
                aria-hidden
                className="absolute top-4 right-4 w-8 h-8 pointer-events-none"
                style={{
                  borderTop: "1px solid rgba(232,199,122,0.6)",
                  borderRight: "1px solid rgba(232,199,122,0.6)",
                }}
              />
              <div
                aria-hidden
                className="absolute bottom-4 left-4 w-8 h-8 pointer-events-none"
                style={{
                  borderBottom: "1px solid rgba(232,199,122,0.6)",
                  borderLeft: "1px solid rgba(232,199,122,0.6)",
                }}
              />
              <div
                aria-hidden
                className="absolute bottom-4 right-4 w-8 h-8 pointer-events-none"
                style={{
                  borderBottom: "1px solid rgba(232,199,122,0.6)",
                  borderRight: "1px solid rgba(232,199,122,0.6)",
                }}
              />

              {/* Halos décoratifs */}
              <div
                aria-hidden
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(232,199,122,0.22) 0%, transparent 70%)",
                }}
              />
              <div
                aria-hidden
                className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(125,181,199,0.16) 0%, transparent 70%)",
                }}
              />

              <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 md:p-10 lg:p-12">
                <div className="lg:col-span-4 flex justify-center lg:justify-start">
                  <div className="relative aspect-[4/5] w-44 lg:w-52 max-w-[220px]">
                    <div className="absolute -inset-2 border border-or-doux/65" />
                    <div aria-hidden className="absolute inset-0 z-0 bg-encre" />
                    <Image
                      src="/images/jocelyn-portrait.jpg"
                      alt="Jocelyn Amir"
                      fill
                      className="object-cover relative z-10"
                      sizes="220px"
                    />
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 bg-or-doux text-encre text-[9px] tracking-[0.3em] font-medium whitespace-nowrap">
                      JOCELYN AMIR SWAMY
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 text-left">
                  <p
                    className="text-or-clair font-sans text-xs tracking-[0.45em] uppercase mb-4"
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
                  >
                    {introSurtitre}
                  </p>
                  <h3
                    className="font-serif text-3xl lg:text-4xl xl:text-5xl text-ivoire leading-[1.08] mb-5 lg:mb-6"
                    style={{ textShadow: "0 3px 20px rgba(0,0,0,0.65), 0 1px 4px rgba(0,0,0,0.5)" }}
                  >
                    {introTitre}
                    <br />
                    <span className="italic text-or-clair">
                      {content?.introTitreItalique && content.introTitreItalique.trim().length > 0 ? (
                        content.introTitreItalique
                      ) : (
                        <>
                          Médium depuis{" "}
                          <span className="not-italic font-sans font-medium tracking-tight">
                            1994
                          </span>
                          .
                        </>
                      )}
                    </span>
                  </h3>
                  <p
                    className="font-sans text-ivoire text-[15px] lg:text-base leading-relaxed max-w-xl"
                    style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
                  >
                    {introDescription}
                  </p>

                  <div className="grid grid-cols-4 gap-4 lg:gap-5 mt-8 lg:mt-9 pt-6 lg:pt-7 border-t border-or-doux/30 max-w-2xl">
                    <StatDesktop number={introStatValeur(0, "30+")} label={introStatLabel(0, "Années")} />
                    <StatDesktop number={introStatValeur(1, "4")} label={introStatLabel(1, "Méthodes")} />
                    <StatDesktop number={introStatValeur(2, "1h")} label={introStatLabel(2, "Par séance")} />
                    <StatDesktop number={introStatValeur(3, "15ans")} label={introStatLabel(3, "de TV")} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ LAYER 3 : Services ═══════ */}
        <div
          ref={servicesLayerRef}
          className="absolute inset-0 z-30 flex items-center justify-center opacity-0"
        >
          {/* MOBILE : swipeable horizontal, cards riches */}
          <div className="md:hidden w-full py-4">
            <div className="text-center mb-5 px-6">
              <p
                className="text-or-clair font-sans text-[9px] tracking-[0.30em] uppercase mb-2"
                style={{
                  textShadow:
                    "0 2px 14px rgba(0,0,0,0.95), 0 0 28px rgba(0,0,0,0.7)",
                }}
              >
                Réservation en ligne · Paiement sécurisé
              </p>
              <h2
                className="font-serif text-[1.3rem] text-ivoire leading-[1.1]"
                style={{
                  textShadow:
                    "0 3px 18px rgba(0,0,0,0.95), 0 0 32px rgba(0,0,0,0.8)",
                }}
              >
                Choisissez votre{" "}
                <span className="italic text-or-clair">formule.</span>
              </h2>
            </div>

            <div
              className="flex gap-3 overflow-x-auto px-6 pb-3 snap-x snap-mandatory scrollbar-hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {/* Card Cabinet (mobile) */}
              <article className="relative snap-start shrink-0 w-[82%] flex flex-col p-4 bg-encre/82 backdrop-blur-md border border-or-doux/50 rounded-2xl">
                <div className="absolute top-3 right-3 flex items-center px-3 py-1 rounded-full bg-or-doux/15 backdrop-blur-sm border border-or-doux/45">
                  <span className="font-sans text-or-clair text-[8px] tracking-[0.2em] uppercase font-medium whitespace-nowrap">
                    Recommandé
                  </span>
                </div>
                <div className="w-8 h-8 mb-2.5 flex items-center justify-center rounded-full bg-or-doux/25 text-or-clair">
                  <MapPin size={14} strokeWidth={1.5} />
                </div>
                <p className="font-sans text-[8.5px] tracking-[0.3em] uppercase mb-1 text-or-clair">
                  Cabinet ou à distance
                </p>
                <h3 className="font-serif text-lg leading-tight mb-2.5 text-ivoire">
                  Une heure
                </h3>

                <ul className="space-y-1.5 mb-3 text-[11.5px] text-ivoire font-medium">
                  <li className="flex gap-1.5 items-start">
                    <Check size={11} className="mt-0.5 shrink-0 text-or-clair" />
                    <span>1 heure · quatre méthodes combinées</span>
                  </li>
                  <li className="flex gap-1.5 items-start">
                    <Check size={11} className="mt-0.5 shrink-0 text-or-clair" />
                    <span>Au cabinet à Saint-Clotilde ou à distance</span>
                  </li>
                </ul>

                <div className="flex items-end justify-between pt-2.5 border-t border-ivoire/15 mb-3">
                  <span className="font-sans text-[8.5px] tracking-[0.3em] text-ivoire uppercase font-medium">
                    1 heure
                  </span>
                  <div className="flex items-baseline">
                    <span className="font-sans font-medium text-2xl text-or-clair">120</span>
                    <span className="font-sans text-sm text-ivoire ml-0.5">€</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Link
                    href="/reserver/au-cabinet"
                    className="flex items-center justify-between w-full px-3 py-2 rounded-full bg-or-doux text-encre font-sans text-[11px] tracking-wide"
                  >
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} strokeWidth={2} />
                      <span>Réserver</span>
                    </span>
                    <ArrowRight size={12} />
                  </Link>
                  <Link
                    href="/services#cabinet"
                    className="flex items-center justify-between w-full px-3 py-2 rounded-full bg-transparent border border-ivoire/25 text-ivoire font-sans text-[11px] tracking-wide"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </article>

              {/* Card Distance (mobile) */}
              <article className="relative snap-start shrink-0 w-[82%] flex flex-col p-4 bg-encre/72 backdrop-blur-md border border-ivoire/20 rounded-2xl">
                <div className="w-8 h-8 mb-2.5 flex items-center justify-center rounded-full bg-ivoire/10 text-ivoire/90">
                  <Phone size={14} strokeWidth={1.5} />
                </div>
                <p className="font-sans text-[8.5px] tracking-[0.3em] uppercase mb-1 text-bleu-chefchaouen">
                  Téléphone · Partout
                </p>
                <h3 className="font-serif text-lg leading-tight mb-2.5 text-ivoire">
                  30 minutes
                </h3>

                <ul className="space-y-1.5 mb-3 text-[11.5px] text-ivoire font-medium">
                  <li className="flex gap-1.5 items-start">
                    <Check size={11} className="mt-0.5 shrink-0 text-bleu-chefchaouen" />
                    <span>30 min · mêmes méthodes, en condensé</span>
                  </li>
                  <li className="flex gap-1.5 items-start">
                    <Check size={11} className="mt-0.5 shrink-0 text-bleu-chefchaouen" />
                    <span>Jocelyn vous appelle au rendez-vous</span>
                  </li>
                </ul>

                <div className="flex items-end justify-between pt-2.5 border-t border-ivoire/15 mb-3">
                  <span className="font-sans text-[8.5px] tracking-[0.3em] text-ivoire uppercase font-medium">
                    30 min
                  </span>
                  <div className="flex items-baseline">
                    <span className="font-sans font-medium text-2xl text-ivoire">85</span>
                    <span className="font-sans text-sm text-ivoire ml-0.5">€</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Link
                    href="/reserver/a-distance"
                    className="flex items-center justify-between w-full px-3 py-2 rounded-full bg-ivoire text-encre font-sans text-[11px] tracking-wide"
                  >
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} strokeWidth={2} />
                      <span>Réserver</span>
                    </span>
                    <ArrowRight size={12} />
                  </Link>
                  <Link
                    href="/services#distance"
                    className="flex items-center justify-between w-full px-3 py-2 rounded-full bg-transparent border border-ivoire/25 text-ivoire font-sans text-[11px] tracking-wide"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </article>

              {/* Card Coaching (mobile) */}
              <article className="relative snap-start shrink-0 w-[82%] flex flex-col p-4 bg-encre/72 backdrop-blur-md border border-terre-cuite/30 rounded-2xl">
                <div className="absolute top-3 right-3 flex items-center justify-center px-2 py-0.5 rounded-full bg-terre-cuite/20 border border-terre-cuite/40">
                  <span className="font-sans text-terre-cuite text-[7.5px] leading-none tracking-[0.2em] uppercase font-medium">Nouveau</span>
                </div>
                <div className="w-8 h-8 mb-2.5 flex items-center justify-center rounded-full bg-terre-cuite/20 text-terre-cuite">
                  <Heart size={14} strokeWidth={1.5} />
                </div>
                <p className="font-sans text-[8.5px] tracking-[0.3em] uppercase mb-1 text-terre-cuite">
                  Accompagnement personnel
                </p>
                <h3 className="font-serif text-lg leading-tight mb-2.5 text-ivoire">
                  Coaching de vie
                </h3>
                <ul className="space-y-1.5 mb-3 text-[11.5px] text-ivoire font-medium">
                  <li className="flex gap-1.5 items-start">
                    <Check size={11} className="mt-0.5 shrink-0 text-terre-cuite" />
                    <span>Estime de soi, reconversion, relations</span>
                  </li>
                  <li className="flex gap-1.5 items-start">
                    <Check size={11} className="mt-0.5 shrink-0 text-terre-cuite" />
                    <span>Écoute bienveillante, sans jugement</span>
                  </li>
                </ul>
                <div className="flex items-end justify-between pt-2.5 border-t border-ivoire/15 mb-3">
                  <span className="font-sans text-[8.5px] tracking-[0.3em] text-ivoire uppercase font-medium">
                    Sur mesure
                  </span>
                  <span className="font-serif italic text-ivoire text-sm">Sur demande</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Link
                    href="/contact"
                    className="flex items-center justify-between w-full px-3 py-2 rounded-full bg-terre-cuite/80 text-ivoire font-sans text-[11px] tracking-wide"
                  >
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} strokeWidth={2} />
                      <span>Nous contacter</span>
                    </span>
                    <ArrowRight size={12} />
                  </Link>
                  <Link
                    href="/services#coaching"
                    className="flex items-center justify-between w-full px-3 py-2 rounded-full bg-transparent border border-ivoire/25 text-ivoire font-sans text-[11px] tracking-wide"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </article>

              {/* Card Séances régulières (mobile) */}
              <article className="relative snap-start shrink-0 w-[82%] flex flex-col p-4 bg-encre/72 backdrop-blur-md border border-bleu-chefchaouen/35 rounded-2xl">
                <div className="absolute top-3 right-3 flex items-center justify-center px-2 py-0.5 rounded-full border" style={{ background: "rgba(125,181,199,0.18)", borderColor: "rgba(125,181,199,0.45)" }}>
                  <span className="font-sans text-[7.5px] leading-none tracking-[0.2em] uppercase font-medium" style={{ color: "#9FCBD8" }}>Fidélité</span>
                </div>
                <div className="w-8 h-8 mb-2.5 flex items-center justify-center rounded-full" style={{ background: "rgba(125,181,199,0.20)", color: "#9FCBD8" }}>
                  <Repeat size={14} strokeWidth={1.5} />
                </div>
                <p className="font-sans text-[8.5px] tracking-[0.3em] uppercase mb-1" style={{ color: "#9FCBD8" }}>
                  Suivi dans la durée
                </p>
                <h3 className="font-serif text-lg leading-tight mb-2.5 text-ivoire">
                  Séances régulières
                </h3>
                <ul className="space-y-1.5 mb-3 text-[11.5px] text-ivoire font-medium">
                  <li className="flex gap-1.5 items-start">
                    <Check size={11} className="mt-0.5 shrink-0" style={{ color: "#9FCBD8" }} />
                    <span>Tarif préférentiel sur vos consultations</span>
                  </li>
                  <li className="flex gap-1.5 items-start">
                    <Check size={11} className="mt-0.5 shrink-0" style={{ color: "#9FCBD8" }} />
                    <span>Plusieurs séances dans l&apos;année</span>
                  </li>
                </ul>
                <div className="flex items-end justify-between pt-2.5 border-t border-ivoire/15 mb-3">
                  <span className="font-sans text-[8.5px] tracking-[0.3em] text-ivoire uppercase font-medium">
                    Préférentiel
                  </span>
                  <span className="font-serif italic text-ivoire text-sm">Sur devis</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Link
                    href="/contact"
                    className="flex items-center justify-between w-full px-3 py-2 rounded-full text-ivoire font-sans text-[11px] tracking-wide"
                    style={{ background: "rgba(27,122,143,0.85)" }}
                  >
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} strokeWidth={2} />
                      <span>Nous contacter</span>
                    </span>
                    <ArrowRight size={12} />
                  </Link>
                  <Link
                    href="/services#regulier"
                    className="flex items-center justify-between w-full px-3 py-2 rounded-full bg-transparent border border-ivoire/25 text-ivoire font-sans text-[11px] tracking-wide"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            </div>

            <p
              className="text-center font-sans text-[9px] text-ivoire/55 mt-3 tracking-wider"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
            >
              Glissez pour voir toutes les formules
            </p>
          </div>

          {/* DESKTOP : cards riches avec ornements. Le calque est centré
              verticalement (items-center) ; un léger padding-top compense la
              navbar fixe sans coller les cartes au bas de la section. */}
          <div className="hidden md:block max-w-7xl w-full px-8 lg:px-10 pt-16 lg:pt-20">
            <div className="max-w-2xl mb-8 lg:mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-6 bg-or-doux/80" />
                <p
                  className="text-or-clair font-sans text-[10px] tracking-[0.32em] uppercase"
                  style={{ textShadow: "0 2px 14px rgba(0,0,0,0.9)" }}
                >
                  Réservation en ligne · Paiement sécurisé
                </p>
              </div>
              <h2
                className="font-serif text-2xl lg:text-3xl xl:text-4xl text-ivoire leading-[1.05] mb-1.5"
                style={{ textShadow: "0 4px 24px rgba(0,0,0,0.9)" }}
              >
                Choisissez votre{" "}
                <span className="italic text-mystique">formule.</span>
              </h2>
              <p
                className="font-sans text-ivoire/60 text-[10.5px] tracking-wide"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
              >
                Prépaiement obligatoire · Confirmation sous 24h
              </p>
            </div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
              variants={servicesContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {/* Card Cabinet (desktop) */}
              <motion.article
                variants={serviceCardVariants}
                whileHover={{ y: -8, scale: 1.012 }}
                transition={cardHoverTransition}
                className="group/card relative flex flex-col p-5 overflow-hidden border border-or-doux/55 rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] hover:shadow-[0_50px_120px_-20px_rgba(201,169,97,0.35)]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20,28,48,0.88) 0%, rgba(15,22,40,0.78) 50%, rgba(11,25,41,0.94) 100%)",
                  backdropFilter: "blur(16px) saturate(150%)",
                  WebkitBackdropFilter: "blur(16px) saturate(150%)",
                }}
              >
                {/* Bande gold verticale gauche */}
                <div aria-hidden className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-or-clair via-or-doux to-cuivre rounded-l-3xl" />

                {/* Numéro romain filigrane */}
                <div aria-hidden className="absolute -top-8 -right-2 font-serif text-[11rem] leading-none select-none pointer-events-none text-or-doux/[0.08]">
                  I
                </div>

                {/* Badge RECOMMANDÉ : pastille discrète et raffinée */}
                <div className="absolute top-5 right-5 z-10 flex items-center px-3.5 py-1.5 rounded-full bg-or-doux/15 backdrop-blur-sm border border-or-doux/45 shadow-[0_4px_18px_-6px_rgba(201,169,97,0.45)]">
                  <span className="font-sans text-or-clair text-[9.5px] tracking-[0.28em] uppercase font-medium whitespace-nowrap">
                    Recommandé
                  </span>
                </div>

                <div className="relative flex flex-col flex-1">
                  {/* Icon double-ring */}
                  <div className="relative w-11 h-11 mb-3">
                    <div aria-hidden className="absolute inset-0 rounded-full border border-or-doux/40" />
                    <div className="absolute inset-1 rounded-full bg-or-doux/15 backdrop-blur-sm flex items-center justify-center text-or-clair">
                      <MapPin size={17} strokeWidth={1.5} />
                    </div>
                  </div>

                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-1.5 text-or-clair">
                    Au cabinet ou à distance
                  </p>
                  <h3 className="font-serif text-xl lg:text-2xl leading-tight text-ivoire">
                    Une heure
                  </h3>
                  <div aria-hidden className="flex items-center gap-2 mt-2 mb-4">
                    <span className="h-px w-6 bg-or-doux/70" />
                    <span className="w-1 h-1 rounded-full bg-or-doux/60" />
                    <span className="h-px flex-1 bg-or-doux/15" />
                  </div>

                  <p className="font-sans text-[12px] leading-relaxed mb-3 text-ivoire font-medium"
                     style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
                  >
                    Une heure complète, à mon bureau de Saint-Clotilde ou à
                    distance. Quatre méthodes combinées sans précipitation.
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={11} strokeWidth={1.8} className="text-or-clair" />
                    <p className="font-sans text-[9.5px] tracking-[0.35em] uppercase text-or-clair">
                      Ce qui est inclus
                    </p>
                  </div>
                  <ul className="space-y-1.5 mb-4 text-[12.5px] text-ivoire font-medium">
                    {[
                      "Une heure pleine, au cabinet ou à distance",
                      "Quatre méthodes combinées en une séance",
                      "Photos, courriers ou objets bienvenus",
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start group/item">
                        <span className="relative shrink-0 mt-1 w-3.5 h-3.5">
                          <span aria-hidden className="absolute inset-0 rounded-full bg-or-doux/15" />
                          <span className="relative w-full h-full flex items-center justify-center text-or-clair">
                            <Check size={8} strokeWidth={3} />
                          </span>
                        </span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-end justify-between pt-3 mb-4 mt-auto" style={{ borderTop: "1px dashed rgba(247,243,236,0.18)" }}>
                    <div>
                      <div className="font-sans text-[9px] tracking-[0.3em] text-ivoire/85 uppercase mb-0.5 font-medium">
                        Durée
                      </div>
                      <div className="font-sans text-base text-ivoire/95">1 heure</div>
                    </div>
                    <div className="flex items-baseline gap-0.5">
                      <span className="font-sans font-semibold text-4xl text-mystique leading-none tabular-nums tracking-tight">120</span>
                      <span className="font-sans text-xl text-or-doux/85">€</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href="/reserver/au-cabinet"
                      className="group/btn flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-full bg-or-doux text-encre hover:bg-or-clair transition-all font-sans text-[12px] tracking-[0.15em] uppercase whitespace-nowrap font-medium shadow-[0_8px_24px_-6px_rgba(201,169,97,0.55)]"
                    >
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} strokeWidth={2} />
                        <span>Réserver</span>
                      </span>
                      <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                    <Link
                      href="/services#cabinet"
                      className="group/btn2 flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-full border border-ivoire/30 text-ivoire bg-transparent hover:bg-ivoire/5 hover:border-or-doux/70 transition-all font-sans text-[12px] tracking-[0.15em] uppercase whitespace-nowrap"
                    >
                      <span>En savoir plus</span>
                      <ArrowRight size={13} className="transition-transform group-hover/btn2:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>

              {/* Card Distance (desktop) - icone Video unique */}
              <motion.article
                variants={serviceCardVariants}
                whileHover={{ y: -8, scale: 1.012 }}
                transition={cardHoverTransition}
                className="group/card relative flex flex-col p-5 overflow-hidden border border-bleu-chefchaouen/30 rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] hover:shadow-[0_50px_120px_-20px_rgba(125,181,199,0.30)]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20,28,48,0.85) 0%, rgba(15,22,40,0.72) 50%, rgba(11,25,41,0.92) 100%)",
                  backdropFilter: "blur(16px) saturate(150%)",
                  WebkitBackdropFilter: "blur(16px) saturate(150%)",
                }}
              >
                {/* Bande chefchaouen verticale gauche */}
                <div aria-hidden className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-bleu-chefchaouen via-bleu-majorelle to-bleu-cosmique rounded-l-3xl" />

                {/* Numéro romain filigrane */}
                <div aria-hidden className="absolute -top-8 -right-2 font-serif text-[11rem] leading-none select-none pointer-events-none text-bleu-chefchaouen/[0.10]">
                  II
                </div>

                <div className="relative flex flex-col flex-1">
                  {/* Icon double-ring */}
                  <div className="relative w-11 h-11 mb-3">
                    <div aria-hidden className="absolute inset-0 rounded-full border border-bleu-chefchaouen/45" />
                    <div className="absolute inset-1 rounded-full bg-bleu-chefchaouen/15 backdrop-blur-sm flex items-center justify-center text-bleu-chefchaouen">
                      <Phone size={17} strokeWidth={1.5} />
                    </div>
                  </div>

                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-1.5 text-bleu-chefchaouen">
                    Téléphone · Partout
                  </p>
                  <h3 className="font-serif text-xl lg:text-2xl leading-tight text-ivoire">
                    30 minutes
                  </h3>
                  <div aria-hidden className="flex items-center gap-2 mt-2 mb-4">
                    <span className="h-px w-6 bg-bleu-chefchaouen/70" />
                    <span className="w-1 h-1 rounded-full bg-bleu-chefchaouen/60" />
                    <span className="h-px flex-1 bg-bleu-chefchaouen/15" />
                  </div>

                  <p className="font-sans text-[12px] leading-relaxed mb-3 text-ivoire font-medium"
                     style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
                  >
                    Trente minutes par téléphone, depuis l&apos;Île
                    Maurice, la métropole, n&apos;importe où.
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={11} strokeWidth={1.8} className="text-bleu-chefchaouen" />
                    <p className="font-sans text-[9.5px] tracking-[0.35em] uppercase text-bleu-chefchaouen">
                      Ce qui est inclus
                    </p>
                  </div>
                  <ul className="space-y-1.5 mb-4 text-[12.5px] text-ivoire font-medium">
                    {[
                      "Consultation de 30 minutes par téléphone",
                      "Jocelyn vous appelle à l'heure du rendez-vous",
                      "Mêmes méthodes que le cabinet, en condensé",
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span className="relative shrink-0 mt-1 w-3.5 h-3.5">
                          <span aria-hidden className="absolute inset-0 rounded-full bg-bleu-chefchaouen/15" />
                          <span className="relative w-full h-full flex items-center justify-center text-bleu-chefchaouen">
                            <Check size={8} strokeWidth={3} />
                          </span>
                        </span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-end justify-between pt-3 mb-4 mt-auto" style={{ borderTop: "1px dashed rgba(247,243,236,0.18)" }}>
                    <div>
                      <div className="font-sans text-[9px] tracking-[0.3em] text-ivoire/85 uppercase mb-0.5 font-medium">
                        Durée
                      </div>
                      <div className="font-sans text-base text-ivoire/95">30 minutes</div>
                    </div>
                    <div className="flex items-baseline gap-0.5">
                      <span className="font-sans font-semibold text-4xl text-ivoire leading-none tabular-nums tracking-tight">85</span>
                      <span className="font-sans text-xl text-or-doux/80">€</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href="/reserver/a-distance"
                      className="group/btn flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-full bg-ivoire text-encre hover:bg-or-clair transition-all font-sans text-[12px] tracking-[0.15em] uppercase whitespace-nowrap font-medium shadow-[0_8px_24px_-6px_rgba(247,243,236,0.35)]"
                    >
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} strokeWidth={2} />
                        <span>Réserver</span>
                      </span>
                      <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                    <Link
                      href="/services#distance"
                      className="group/btn2 flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-full border border-ivoire/30 text-ivoire bg-transparent hover:bg-ivoire/5 hover:border-bleu-chefchaouen/70 transition-all font-sans text-[12px] tracking-[0.15em] uppercase whitespace-nowrap"
                    >
                      <span>En savoir plus</span>
                      <ArrowRight size={13} className="transition-transform group-hover/btn2:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>

              {/* Card Coaching (desktop) - icone Heart */}
              <motion.article
                variants={serviceCardVariants}
                whileHover={{ y: -8, scale: 1.012 }}
                transition={cardHoverTransition}
                className="group/card relative flex flex-col p-5 overflow-hidden border border-cuivre/35 rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] hover:shadow-[0_50px_120px_-20px_rgba(197,123,92,0.30)]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20,28,48,0.85) 0%, rgba(15,22,40,0.72) 50%, rgba(11,25,41,0.92) 100%)",
                  backdropFilter: "blur(16px) saturate(150%)",
                  WebkitBackdropFilter: "blur(16px) saturate(150%)",
                }}
              >
                <div aria-hidden className="absolute top-0 bottom-0 left-0 w-[3px] rounded-l-3xl" style={{ background: "linear-gradient(180deg, #C57B5C, #B87333, #8a4f37)" }} />

                <div aria-hidden className="absolute -top-8 -right-2 font-serif text-[11rem] leading-none select-none pointer-events-none" style={{ color: "rgba(197,123,92,0.10)" }}>
                  III
                </div>

                <div className="absolute top-5 right-5 z-10 flex items-center px-3 py-1.5 rounded-full border" style={{ background: "rgba(197,123,92,0.15)", borderColor: "rgba(197,123,92,0.45)" }}>
                  <span className="font-sans text-[9.5px] tracking-[0.28em] uppercase font-medium" style={{ color: "#E0A586" }}>
                    Nouveau
                  </span>
                </div>

                <div className="relative flex flex-col flex-1">
                  <div className="relative w-11 h-11 mb-3">
                    <div aria-hidden className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(197,123,92,0.45)" }} />
                    <div className="absolute inset-1 rounded-full backdrop-blur-sm flex items-center justify-center" style={{ background: "rgba(197,123,92,0.15)", color: "#E0A586" }}>
                      <Heart size={17} strokeWidth={1.5} />
                    </div>
                  </div>

                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: "#E0A586" }}>
                    Accompagnement personnel
                  </p>
                  <h3 className="font-serif text-xl lg:text-2xl leading-tight text-ivoire">
                    Coaching de vie
                  </h3>
                  <div aria-hidden className="flex items-center gap-2 mt-2 mb-4">
                    <span className="h-px w-6" style={{ background: "rgba(197,123,92,0.7)" }} />
                    <span className="w-1 h-1 rounded-full" style={{ background: "rgba(197,123,92,0.6)" }} />
                    <span className="h-px flex-1" style={{ background: "rgba(197,123,92,0.15)" }} />
                  </div>

                  <p className="font-sans text-[12px] leading-relaxed mb-3 text-ivoire font-medium" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
                    Un suivi personnalisé pour surmonter les obstacles et avancer
                    vers vos objectifs.
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={11} strokeWidth={1.8} style={{ color: "#E0A586" }} />
                    <p className="font-sans text-[9.5px] tracking-[0.35em] uppercase" style={{ color: "#E0A586" }}>
                      Ce qui est inclus
                    </p>
                  </div>
                  <ul className="space-y-1.5 mb-4 text-[12.5px] text-ivoire font-medium">
                    {[
                      "Écoute active et empathique, sans jugement",
                      "Estime de soi, reconversion, relations",
                      "Complément aux consultations de voyance",
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span className="relative shrink-0 mt-1 w-3.5 h-3.5">
                          <span aria-hidden className="absolute inset-0 rounded-full" style={{ background: "rgba(197,123,92,0.15)" }} />
                          <span className="relative w-full h-full flex items-center justify-center" style={{ color: "#E0A586" }}>
                            <Check size={8} strokeWidth={3} />
                          </span>
                        </span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-end justify-between pt-3 mb-4 mt-auto" style={{ borderTop: "1px dashed rgba(247,243,236,0.18)" }}>
                    <div>
                      <div className="font-sans text-[9px] tracking-[0.3em] text-ivoire/85 uppercase mb-0.5 font-medium">
                        Tarif
                      </div>
                      <div className="font-sans text-base text-ivoire/95">Sur mesure</div>
                    </div>
                    <span className="font-serif italic text-ivoire text-xl">Sur devis</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href="/contact"
                      className="group/btn flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-full text-encre transition-all font-sans text-[12px] tracking-[0.15em] uppercase font-medium"
                      style={{ background: "#C57B5C", boxShadow: "0 8px 24px -6px rgba(197,123,92,0.55)" }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} strokeWidth={2} />
                        <span>Me contacter</span>
                      </span>
                      <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                    <Link
                      href="/services#coaching"
                      className="group/btn2 flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-full border border-ivoire/30 text-ivoire bg-transparent hover:bg-ivoire/5 transition-all font-sans text-[12px] tracking-[0.15em] uppercase whitespace-nowrap"
                    >
                      <span>En savoir plus</span>
                      <ArrowRight size={13} className="transition-transform group-hover/btn2:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>

              {/* Card Séances régulières (desktop) - icone Repeat */}
              <motion.article
                variants={serviceCardVariants}
                whileHover={{ y: -8, scale: 1.012 }}
                transition={cardHoverTransition}
                className="group/card relative flex flex-col p-5 overflow-hidden border border-bleu-chefchaouen/35 rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] hover:shadow-[0_50px_120px_-20px_rgba(125,181,199,0.30)]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20,28,48,0.85) 0%, rgba(15,22,40,0.72) 50%, rgba(11,25,41,0.92) 100%)",
                  backdropFilter: "blur(16px) saturate(150%)",
                  WebkitBackdropFilter: "blur(16px) saturate(150%)",
                }}
              >
                <div aria-hidden className="absolute top-0 bottom-0 left-0 w-[3px] rounded-l-3xl" style={{ background: "linear-gradient(180deg, #7DB5C7, #1B7A8F, #155C6B)" }} />

                <div aria-hidden className="absolute -top-8 -right-2 font-serif text-[11rem] leading-none select-none pointer-events-none" style={{ color: "rgba(125,181,199,0.10)" }}>
                  IV
                </div>

                <div className="absolute top-5 right-5 z-10 flex items-center px-3 py-1.5 rounded-full border" style={{ background: "rgba(125,181,199,0.15)", borderColor: "rgba(125,181,199,0.45)" }}>
                  <span className="font-sans text-[9.5px] tracking-[0.28em] uppercase font-medium" style={{ color: "#9FCBD8" }}>
                    Fidélité
                  </span>
                </div>

                <div className="relative flex flex-col flex-1">
                  <div className="relative w-11 h-11 mb-3">
                    <div aria-hidden className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(125,181,199,0.45)" }} />
                    <div className="absolute inset-1 rounded-full backdrop-blur-sm flex items-center justify-center" style={{ background: "rgba(125,181,199,0.15)", color: "#9FCBD8" }}>
                      <Repeat size={17} strokeWidth={1.5} />
                    </div>
                  </div>

                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-1.5" style={{ color: "#9FCBD8" }}>
                    Suivi dans la durée
                  </p>
                  <h3 className="font-serif text-xl lg:text-2xl leading-tight text-ivoire">
                    Séances régulières
                  </h3>
                  <div aria-hidden className="flex items-center gap-2 mt-2 mb-4">
                    <span className="h-px w-6" style={{ background: "rgba(125,181,199,0.7)" }} />
                    <span className="w-1 h-1 rounded-full" style={{ background: "rgba(125,181,199,0.6)" }} />
                    <span className="h-px flex-1" style={{ background: "rgba(125,181,199,0.15)" }} />
                  </div>

                  <p className="font-sans text-[12px] leading-relaxed mb-3 text-ivoire font-medium" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
                    Vous consultez plusieurs fois dans l&apos;année ? Profitez
                    d&apos;un tarif préférentiel pour un suivi régulier.
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={11} strokeWidth={1.8} style={{ color: "#9FCBD8" }} />
                    <p className="font-sans text-[9.5px] tracking-[0.35em] uppercase" style={{ color: "#9FCBD8" }}>
                      Ce qui est inclus
                    </p>
                  </div>
                  <ul className="space-y-1.5 mb-4 text-[12.5px] text-ivoire font-medium">
                    {[
                      "Tarif préférentiel sur vos consultations",
                      "Formule au cabinet ou à distance",
                      "Devis personnalisé selon votre rythme",
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span className="relative shrink-0 mt-1 w-3.5 h-3.5">
                          <span aria-hidden className="absolute inset-0 rounded-full" style={{ background: "rgba(125,181,199,0.15)" }} />
                          <span className="relative w-full h-full flex items-center justify-center" style={{ color: "#9FCBD8" }}>
                            <Check size={8} strokeWidth={3} />
                          </span>
                        </span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-end justify-between pt-3 mb-4 mt-auto" style={{ borderTop: "1px dashed rgba(247,243,236,0.18)" }}>
                    <div>
                      <div className="font-sans text-[9px] tracking-[0.3em] text-ivoire/85 uppercase mb-0.5 font-medium">
                        Tarif
                      </div>
                      <div className="font-sans text-base text-ivoire/95">Préférentiel</div>
                    </div>
                    <span className="font-serif italic text-ivoire text-xl">Sur devis</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href="/contact"
                      className="group/btn flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-full text-encre transition-all font-sans text-[12px] tracking-[0.15em] uppercase font-medium"
                      style={{ background: "#7DB5C7", boxShadow: "0 8px 24px -6px rgba(125,181,199,0.55)" }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} strokeWidth={2} />
                        <span>Me contacter</span>
                      </span>
                      <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                    <Link
                      href="/services#regulier"
                      className="group/btn2 flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-full border border-ivoire/30 text-ivoire bg-transparent hover:bg-ivoire/5 transition-all font-sans text-[12px] tracking-[0.15em] uppercase whitespace-nowrap"
                    >
                      <span>En savoir plus</span>
                      <ArrowRight size={13} className="transition-transform group-hover/btn2:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            </motion.div>
          </div>
        </div>

        {/* Indicateur scroll persistant */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        >
          <div className="animate-scroll-hint">
            <ChevronDown
              size={30}
              strokeWidth={1.5}
              className="text-or-clair drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatMobile({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div
        className="font-sans font-medium text-lg text-or-clair leading-none mb-1"
        style={{
          textShadow: "0 2px 14px rgba(0,0,0,0.95), 0 0 24px rgba(0,0,0,0.7)",
        }}
      >
        {number}
      </div>
      <div
        className="font-sans text-[8.5px] text-ivoire/80 tracking-wider uppercase"
        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
      >
        {label}
      </div>
    </div>
  );
}

function StatDesktop({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div
        className="font-sans font-medium text-3xl text-or-clair mb-1"
        style={{ textShadow: "0 2px 14px rgba(0,0,0,0.9)" }}
      >
        {number}
      </div>
      <div
        className="font-sans text-xs text-ivoire/70 tracking-wider uppercase"
        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
      >
        {label}
      </div>
    </div>
  );
}
