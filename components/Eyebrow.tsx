type Props = {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

/** Small uppercase letter-spaced label with a leading red dot. */
export function Eyebrow({ children, tone = "dark", className = "" }: Props) {
  const color = tone === "light" ? "text-cream/80" : "text-brown";
  return (
    <span className={`label-eyebrow inline-flex items-center gap-2.5 ${color} ${className}`}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-red" aria-hidden />
      {children}
    </span>
  );
}
