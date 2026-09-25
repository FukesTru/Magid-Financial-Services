import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "gold" | "outline" | "quiet";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-sans font-semibold " +
  "tracking-wide transition-[background-color,border-color,color,box-shadow,transform] " +
  "duration-200 ease-brand active:translate-y-px";

const variants: Record<Variant, string> = {
  /** Primary action. One per screenful, at most. */
  gold:
    "bg-gold-500 text-navy-950 shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset] " +
    "hover:bg-gold-400 hover:shadow-[0_8px_24px_-8px_rgba(201,168,76,0.55)]",
  /** Secondary action beside a gold button. */
  outline:
    "border border-accent/40 text-accent hover:border-accent " +
    "hover:bg-accent/10 hover:text-accent-soft",
  /** Tertiary — reads as a link with a target the size of a button. */
  quiet: "text-ink-200 hover:text-accent-soft",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[0.9375rem]",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  variant = "gold",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  // Phone and mail links are not app routes — render a plain anchor.
  if (/^(tel:|mailto:|https?:)/.test(href)) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/** Small right-pointing chevron used on card and inline links. */
export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`h-4 w-4 ${className}`}
    >
      <path
        d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
