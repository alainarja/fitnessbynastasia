import { ImageSlot } from "./ImageSlot";

type Props = {
  /** When quote is empty the card renders as a clearly labelled placeholder. */
  quote?: string;
  name?: string;
  detail?: string;
  photoSrc?: string;
  tone?: "dark" | "light";
};

/**
 * Placeholder aware testimonial. No quotes are invented. Until Nastasia fills in
 * real client words, the card shows a labelled empty state.
 * TODO(nastasia): replace each placeholder with a real testimonial (with consent).
 */
export function TestimonialCard({ quote, name, detail, photoSrc, tone = "dark" }: Props) {
  const light = tone === "light";
  const surface = light ? "bg-ink/60 border-cream/10" : "bg-card border-brown/12";
  const text = light ? "text-cream" : "text-espresso";
  const muted = light ? "text-cream/60" : "text-brown";

  const isPlaceholder = !quote;

  return (
    <figure className={`lift flex h-full flex-col rounded-[8px] border p-7 ${surface}`}>
      <span aria-hidden className="font-display text-5xl leading-none text-red">&ldquo;</span>

      {isPlaceholder ? (
        <blockquote className={`mt-2 flex-1 text-[1.02rem] leading-relaxed ${muted}`}>
          <span className="label-eyebrow text-[0.62rem] text-red">TODO: real testimonial</span>
          <span className="mt-2 block italic">
            Her client&apos;s real words go here. Add the quote, name, and an optional photo.
          </span>
        </blockquote>
      ) : (
        <blockquote className={`mt-2 flex-1 text-[1.02rem] leading-relaxed ${text}`}>{quote}</blockquote>
      )}

      <figcaption className="mt-6 flex items-center gap-3">
        <div className="h-11 w-11 shrink-0">
          <ImageSlot
            src={photoSrc}
            alt={name ? `${name}` : ""}
            label="PHOTO"
            ratio="aspect-square"
            rounded
            className="!rounded-full"
          />
        </div>
        <span className="flex flex-col">
          <span className={`font-semibold ${text}`}>{name || "Client name"}</span>
          <span className={`text-sm ${muted}`}>{detail || "Coaching client"}</span>
        </span>
      </figcaption>
    </figure>
  );
}
