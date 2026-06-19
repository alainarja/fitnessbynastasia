import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "outlineLight";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[8px] font-semibold tracking-wide transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-sm min-h-[44px]",
  lg: "px-7 py-4 text-base min-h-[52px]",
};

const variants: Record<Variant, string> = {
  primary: "btn-sheen bg-red text-card hover:bg-maroon hover:-translate-y-0.5",
  secondary: "btn-sheen bg-ink text-cream hover:bg-espresso hover:-translate-y-0.5",
  outline: "border-2 border-espresso text-espresso hover:bg-espresso hover:text-cream",
  outlineLight: "border-2 border-cream/60 text-cream hover:bg-cream hover:text-ink",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type AsLink = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">;
type AsButton = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className">;

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props as AsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
