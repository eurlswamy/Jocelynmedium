"use client";

import { useEffect, useState } from "react";

const FRAME_COUNT = 193;
const DESKTOP_FRAME_PATH = (i: number) =>
  `/frames/desktop/frame_${String(i).padStart(4, "0")}.webp`;
const MOBILE_FRAME_PATH = (i: number) =>
  `/frames/mobile/frame_${String(i).padStart(4, "0")}.webp`;

const VISIBLE_THRESHOLD_COUNT = 10;

type FrameStore = {
  frames: HTMLImageElement[];
  bitmaps: (ImageBitmap | null)[];
  ready: boolean;
  onFrameLoaded?: (index: number) => void;
};

export const frameStore: FrameStore = {
  frames: new Array(FRAME_COUNT),
  bitmaps: new Array(FRAME_COUNT).fill(null),
  ready: false,
};

export function isFrameReady(index: number): boolean {
  const img = frameStore.frames[index];
  return !!(img && img.complete && img.naturalWidth > 0);
}

export function FrameLoader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const isMobile = window.innerWidth < 768;
    const pathFn = isMobile ? MOBILE_FRAME_PATH : DESKTOP_FRAME_PATH;

    // Sur mobile, on ne charge qu'une frame sur STEP pour alléger le
    // téléchargement et la mémoire. STEP = 3 (~64 frames, ~7-8 Mo) plutôt que 4 :
    // un tiers de frames en plus rend l'animation nettement plus fluide au scroll
    // pour un surcoût de poids modéré. drawFrame() retombe sur la frame chargée la
    // plus proche, donc pas de trou même entre deux frames intermédiaires.
    const STEP = isMobile ? 3 : 1;

    // Liste des indices réellement chargés (1-based pour le chemin fichier)
    const indices: number[] = [];
    for (let i = 1; i <= FRAME_COUNT; i += STEP) indices.push(i);
    // On garde toujours la toute dernière frame pour une fin nette
    if (indices[indices.length - 1] !== FRAME_COUNT) indices.push(FRAME_COUNT);

    const totalToLoad = indices.length;
    let loaded = 0;
    let revealed = false;
    const threshold = Math.min(VISIBLE_THRESHOLD_COUNT, totalToLoad);

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      document.body.style.overflow = "";
      setTimeout(() => setHidden(true), 150);
      setTimeout(() => setRemoved(true), 850);
    };

    // Filet de sécurité : quoi qu'il arrive (frames lentes, 404, réseau coupé),
    // on retire l'écran de chargement au bout de 4 s pour ne jamais bloquer
    // le scroll ni les clics sur le site.
    const safetyTimer = window.setTimeout(reveal, 4000);

    const handleProgress = (loadedIndex: number) => {
      loaded += 1;
      setProgress(Math.round((loaded / totalToLoad) * 100));

      frameStore.onFrameLoaded?.(loadedIndex);

      // On ne débloque le scroll que lorsque le seuil de frames est atteint ET
      // que la TOUTE PREMIÈRE frame (index 0) est chargée. Sinon le scroll
      // pouvait être débloqué alors que le canvas du héros n'avait pas encore
      // sa première image → fond bleu marine vide au tout début du scroll.
      const firstFrameReady = isFrameReady(0);
      if (!revealed && loaded >= threshold && firstFrameReady) {
        reveal();
      }

      if (loaded === totalToLoad) {
        frameStore.ready = true;
      }
    };

    indices.forEach((i, order) => {
      const img = new window.Image();
      const frameIndex = i - 1;
      img.onload = () => {
        // Sur mobile on évite createImageBitmap : décoder et garder 48 bitmaps
        // en mémoire provoquait des saccades / un gel de l'animation. On dessine
        // directement l'élément <img>, qui est déjà décodé après onload.
        if (!isMobile && typeof createImageBitmap !== "undefined") {
          createImageBitmap(img).then((bmp) => {
            frameStore.bitmaps[frameIndex] = bmp;
          }).catch(() => {});
        }
        handleProgress(frameIndex);
      };
      img.onerror = () => handleProgress(frameIndex);
      if (order < VISIBLE_THRESHOLD_COUNT) {
        img.fetchPriority = "high";
      }
      img.src = pathFn(i);
      frameStore.frames[frameIndex] = img;
    });

    return () => {
      window.clearTimeout(safetyTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700 ease-out ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at center, #1A2847 0%, #0B1929 60%, #000000 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-40">
        {Array.from({ length: 60 }).map((_, i) => {
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

      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-8">
        <p className="font-serif text-ivoire text-3xl tracking-wide leading-none mb-6">
          Jocelyn Amir
        </p>
        <p className="font-sans text-or-clair/85 text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-10">
          Médium Voyant à La Réunion
        </p>
        <div className="w-full max-w-xs">
          <div className="relative h-px bg-ivoire/15 overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-or-doux to-or-clair transition-all duration-200 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="font-serif italic text-ivoire/50 text-[11px] tracking-wide">
              Au-delà des portes…
            </span>
            <span className="font-sans text-or-clair text-[11px] tracking-widest tabular-nums">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
