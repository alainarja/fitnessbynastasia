import Link from "next/link";
import { site } from "@/content/site";

type Props = {
  tone?: "dark" | "light";
  className?: string;
  compact?: boolean;
};

/** Editorial wordmark in Playfair. */
export function Logo({ tone = "dark", className = "" }: Props) {
  const text = tone === "light" ? "text-cream" : "text-espresso";
  const sub = tone === "light" ? "text-cream/60" : "text-brown";

  return (
    <Link href="/" aria-label={`${site.brandName} home`} className={`group inline-flex items-center ${className}`}>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-bold tracking-tight ${text}`}>Fitness by Nastasia</span>
        <span className={`label-eyebrow mt-1 text-[0.55rem] ${sub}`}>Strength. Health. Coaching.</span>
      </span>
    </Link>
  );
}
