import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "on-deep" | "outline-on-deep";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border text-center font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 sm:whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "border-primary bg-primary text-on-primary hover:bg-primary-hover hover:border-primary-hover",
  secondary:
    "border-line-strong bg-transparent text-fg hover:border-leaf hover:text-accent-ink",
  // Untuk dipakai di atas section gelap (bg-deep).
  "on-deep":
    "border-cream bg-cream text-forest hover:bg-pet hover:border-pet",
  "outline-on-deep":
    "border-on-deep/40 bg-transparent text-on-deep hover:border-pet hover:text-pet",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  /** Ikon di sisi kanan/kiri label. */
  icon?: ReactNode;
  iconPosition?: "start" | "end";
} & Omit<ComponentPropsWithoutRef<"a">, "href">;

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/** Tombol berbentuk tautan. Tautan eksternal otomatis memakai <a>. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  iconPosition = "end",
  ...props
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {icon && iconPosition === "start" && icon}
      <span>{children}</span>
      {icon && iconPosition === "end" && icon}
    </>
  );

  if (isExternal(href)) {
    const opensNewTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {content}
        {opensNewTab && <span className="sr-only"> (membuka tab baru)</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}
