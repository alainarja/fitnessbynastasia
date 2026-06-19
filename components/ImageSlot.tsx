import Image from "next/image";
import type { ImageAsset } from "@/content/site";

type Props = {
  /** Pass an ImageAsset from content/site.ts, or the individual fields below. */
  image?: ImageAsset;
  src?: string;
  alt?: string;
  label?: string;
  /** Aspect ratio utility, e.g. "aspect-[4/5]". */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  className?: string;
  /** Extra classes on the <img>, e.g. "ken-burns". */
  imgClassName?: string;
  objectPosition?: string;
};

/**
 * Renders a real photo (grayscale, to match her grid) when a src is provided,
 * otherwise a clearly labelled placeholder so Nastasia sees exactly what photo
 * goes where. All imagery is black and white by default via the .photo class.
 */
export function ImageSlot({
  image,
  src,
  alt,
  label,
  ratio = "aspect-[4/5]",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  rounded = true,
  className = "",
  imgClassName = "",
  objectPosition = "center",
}: Props) {
  const finalSrc = src ?? image?.src ?? "";
  const finalAlt = alt ?? image?.alt ?? "";
  const finalLabel = label ?? image?.label ?? "IMAGE SLOT";
  const radius = rounded ? "rounded-[8px]" : "";

  if (finalSrc) {
    return (
      <div className={`photo relative overflow-hidden ${radius} ${ratio} ${className}`}>
        <Image
          src={finalSrc}
          alt={finalAlt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
          style={{ objectPosition }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-brown/20 bg-cream-deep ${radius} ${ratio} ${className}`}
      role="img"
      aria-label={finalLabel}
    >
      <div className="flex flex-col items-center gap-2 px-6 text-center">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-brown/50" aria-hidden>
          <path
            d="M4 7h3l1.5-2h7L17 7h3v12H4V7Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <span className="label-eyebrow max-w-[24ch] text-[0.62rem] leading-relaxed text-brown/70">{finalLabel}</span>
      </div>
    </div>
  );
}
