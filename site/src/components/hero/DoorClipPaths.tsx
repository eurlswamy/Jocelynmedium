/**
 * SVG défs partagés pour découper les battants de la porte.
 *
 * Coordonnées en `objectBoundingBox` (0..1), relatives au div parent, donc
 * responsive automatique.
 *
 * Mesurées depuis les images :
 *  • porte-desktop.png  (1672×941, ratio 16:9)
 *  • porte-mobile.png   (1024×1536, ratio 2:3)
 */

export function DoorClipPaths() {
  return (
    <svg
      width="0"
      height="0"
      className="absolute pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        {/* ════════ DESKTOP ════════ */}

        {/* Battant gauche : du gond gauche au centre, avec courbure de l'arche */}
        <clipPath
          id="left-door-desktop"
          clipPathUnits="objectBoundingBox"
        >
          <path d="M 0.437 0.913 L 0.437 0.287 Q 0.437 0.117 0.511 0.117 L 0.511 0.913 Z" />
        </clipPath>

        {/* Battant droit : du centre au gond droit */}
        <clipPath
          id="right-door-desktop"
          clipPathUnits="objectBoundingBox"
        >
          <path d="M 0.589 0.913 L 0.589 0.287 Q 0.589 0.117 0.511 0.117 L 0.511 0.913 Z" />
        </clipPath>

        {/* Mur + cadre SANS les battants (fill-rule evenodd) : on dessine le rectangle complet PUIS la zone des battants ; les deux s'annulent dans l'intersection */}
        <clipPath
          id="wall-only-desktop"
          clipPathUnits="objectBoundingBox"
          clipRule="evenodd"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M 0 0 L 1 0 L 1 1 L 0 1 Z M 0.437 0.913 L 0.437 0.287 Q 0.437 0.117 0.511 0.117 Q 0.589 0.117 0.589 0.287 L 0.589 0.913 Z"
          />
        </clipPath>

        {/* ════════ MOBILE ════════ */}

        <clipPath
          id="left-door-mobile"
          clipPathUnits="objectBoundingBox"
        >
          <path d="M 0.225 0.918 L 0.225 0.306 Q 0.225 0.130 0.500 0.130 L 0.500 0.918 Z" />
        </clipPath>

        <clipPath
          id="right-door-mobile"
          clipPathUnits="objectBoundingBox"
        >
          <path d="M 0.775 0.918 L 0.775 0.306 Q 0.775 0.130 0.500 0.130 L 0.500 0.918 Z" />
        </clipPath>

        <clipPath
          id="wall-only-mobile"
          clipPathUnits="objectBoundingBox"
          clipRule="evenodd"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M 0 0 L 1 0 L 1 1 L 0 1 Z M 0.225 0.918 L 0.225 0.306 Q 0.225 0.130 0.500 0.130 Q 0.775 0.130 0.775 0.306 L 0.775 0.918 Z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
