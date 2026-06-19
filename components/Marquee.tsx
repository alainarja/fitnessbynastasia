type Props = {
  items: string[];
  tone?: "dark" | "light";
};

/**
 * Editorial scrolling word strip. Pure CSS animation, pauses on hover, and stops
 * for reduced-motion users. The items are duplicated so the loop is seamless.
 */
export function Marquee({ items, tone = "dark" }: Props) {
  const color = tone === "light" ? "text-cream" : "text-espresso";
  const dot = tone === "light" ? "text-red" : "text-red";
  const sequence = [...items, ...items];

  return (
    <div className="marquee-strip overflow-hidden py-5">
      <div className="marquee-track" aria-hidden>
        {sequence.map((item, i) => (
          <span key={i} className={`flex items-center whitespace-nowrap font-display text-2xl sm:text-3xl ${color}`}>
            <span className="px-6 italic">{item}</span>
            <span className={`text-lg ${dot}`}>&bull;</span>
          </span>
        ))}
      </div>
      <span className="sr-only">{items.join(", ")}</span>
    </div>
  );
}
