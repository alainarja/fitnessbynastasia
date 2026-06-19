import type { Pillar } from "@/content/site";

type Props = { pillar: Pillar; tone?: "dark" | "light" };

export function PillarCard({ pillar, tone = "dark" }: Props) {
  const light = tone === "light";
  const surface = light ? "bg-ink/60 border-cream/10" : "bg-card border-brown/10";
  const title = light ? "text-cream" : "text-espresso";
  const body = light ? "text-cream/70" : "text-brown";
  const num = light ? "text-cream/15" : "text-espresso/10";

  return (
    <article className={`lift group relative overflow-hidden rounded-[8px] border p-7 ${surface}`}>
      <span
        aria-hidden
        className={`pointer-events-none absolute right-3 top-1 font-display text-7xl font-extrabold leading-none transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110 ${num}`}
      >
        {pillar.num}
      </span>
      <div className="relative">
        <span className="red-rule mb-5" aria-hidden />
        <h3 className={`text-2xl ${title}`}>{pillar.title}</h3>
        <p className={`mt-3 text-[0.95rem] leading-relaxed ${body}`}>{pillar.blurb}</p>
      </div>
    </article>
  );
}
