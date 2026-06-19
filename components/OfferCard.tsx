import { Button } from "./Button";
import type { Offer } from "@/content/site";

export function OfferCard({ offer }: { offer: Offer }) {
  const featured = offer.featured;

  return (
    <article
      className={`lift flex h-full flex-col rounded-[8px] border p-7 sm:p-8 ${
        featured ? "border-red bg-card shadow-[0_2px_0_0_var(--color-red)]" : "border-brown/15 bg-card"
      }`}
    >
      {featured ? (
        <span className="label-eyebrow mb-4 inline-block w-fit rounded-full bg-red px-3 py-1 text-[0.6rem] text-card">
          Most popular
        </span>
      ) : null}

      <h3 className="text-2xl text-espresso">{offer.name}</h3>
      <p className="label-eyebrow mt-2 text-red">{offer.bestFor}</p>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-brown">{offer.tagline}</p>

      <div className="mt-5 flex items-baseline gap-2">
        {offer.price ? (
          <span className="font-display text-3xl font-bold text-espresso">{offer.price}</span>
        ) : null}
        <span className="label-eyebrow text-brown/70">{offer.priceNote}</span>
      </div>

      <span className="red-rule my-6" aria-hidden />

      <ul className="flex-1 space-y-3">
        {offer.inclusions.map((item) => (
          <li key={item} className="flex gap-3 text-[0.92rem] leading-relaxed text-espresso">
            <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
            {item}
          </li>
        ))}
      </ul>

      <Button
        href={offer.ctaHref}
        variant={featured ? "primary" : "outline"}
        size="lg"
        className="mt-8 w-full"
      >
        {offer.ctaLabel}
      </Button>
    </article>
  );
}
