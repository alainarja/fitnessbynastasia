import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

type Stat = { big: string; small: string };

/** Parse a leading integer so "250+" animates as a count-up with a "+" suffix. */
function parseNumeric(big: string): { to: number; suffix: string } | null {
  const m = big.match(/^(\d+)(\D*)$/);
  if (!m) return null;
  return { to: parseInt(m[1], 10), suffix: m[2] };
}

/** Dark dramatic band of short stats / promises in Playfair. */
export function StatBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-ink text-cream">
      <div className="container-page grid grid-cols-1 divide-y divide-cream/10 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((s, i) => {
          const numeric = parseNumeric(s.big);
          return (
            <Reveal
              key={s.big + s.small}
              delay={i * 120}
              direction="up"
              className="group flex flex-col items-center gap-1 px-4 py-9 text-center transition-colors duration-300 hover:bg-cream/[0.03]"
            >
              <span className="font-display text-3xl font-bold text-cream sm:text-4xl">
                {numeric ? <CountUp to={numeric.to} suffix={numeric.suffix} /> : s.big}
              </span>
              <span className="label-eyebrow text-cream/60">{s.small}</span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
