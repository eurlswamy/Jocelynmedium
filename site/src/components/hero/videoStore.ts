/**
 * Partage l'élément <video> entre FrameLoader (qui le crée et gère le chargement)
 * et HeroParallax (qui lit video.currentTime et dessine sur le canvas).
 */
export type VideoStore = {
  video: HTMLVideoElement | null;
  ready: boolean;
  onReady?: () => void;
};

export const videoStore: VideoStore = {
  video: null,
  ready: false,
};
