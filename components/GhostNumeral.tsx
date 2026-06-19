type Props = {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

/** Oversized faint numeral sitting behind a section label. Decorative. */
export function GhostNumeral({ children, tone = "dark", className = "" }: Props) {
  return (
    <span
      aria-hidden
      className={`ghost-numeral ${tone === "light" ? "ghost-numeral--light" : ""} text-[7rem] sm:text-[9rem] ${className}`}
    >
      {children}
    </span>
  );
}
