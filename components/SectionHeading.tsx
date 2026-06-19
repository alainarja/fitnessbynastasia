import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow?: React.ReactNode;
  /** Text before the emphasised word. */
  lead: string;
  /** The word set in italic red for emphasis. */
  emphasis?: string;
  /** Optional text after the emphasised word. */
  tail?: string;
  as?: "h1" | "h2" | "h3";
  tone?: "dark" | "light";
  align?: "left" | "center";
  rule?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeMap = {
  sm: "text-2xl sm:text-3xl",
  md: "text-3xl sm:text-4xl",
  lg: "text-4xl sm:text-5xl",
  xl: "text-5xl sm:text-6xl lg:text-7xl",
};

export function SectionHeading({
  eyebrow,
  lead,
  emphasis,
  tail,
  as: Tag = "h2",
  tone = "dark",
  align = "left",
  rule = true,
  className = "",
  size = "lg",
}: Props) {
  const headingColor = tone === "light" ? "text-cream" : "text-espresso";
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <Eyebrow tone={tone} className="mb-4">
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Tag className={`${sizeMap[size]} ${headingColor} text-balance`}>
        {lead}
        {emphasis ? (
          <>
            {" "}
            <em className="font-display italic text-red">{emphasis}</em>
          </>
        ) : null}
        {tail ? ` ${tail}` : null}
      </Tag>
      {rule ? <span className={`red-rule mt-6 ${align === "center" ? "mx-auto" : ""}`} aria-hidden /> : null}
    </div>
  );
}
