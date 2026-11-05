import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "pet" | "wood" | "leaf" | "deep";

const tones: Record<Tone, string> = {
  neutral: "border-line-strong text-muted",
  pet: "border-pet/70 bg-pet/40 text-ink dark:bg-pet/15 dark:text-pet",
  wood: "border-wood/40 bg-wood/10 text-wood-ink",
  leaf: "border-leaf/50 bg-leaf/10 text-accent-ink",
  deep: "border-on-deep/30 text-on-deep",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Penanda angka atau data yang belum final. Bergaris putus-putus supaya
 * mudah terlihat dan tidak ikut terbit tanpa sengaja.
 */
export function DataFlag({
  kind = "estimate",
  className,
  tone = "default",
}: {
  kind?: "estimate" | "placeholder";
  className?: string;
  tone?: "default" | "deep";
}) {
  const label = kind === "estimate" ? "Estimasi" : "Data contoh";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-dashed px-2 py-0.5 text-[0.7rem] font-semibold tracking-wide uppercase",
        tone === "deep"
          ? "border-on-deep/60 text-on-deep"
          : "border-wood-ink/70 text-wood-ink",
        className,
      )}
      title={
        kind === "estimate"
          ? "Angka perkiraan, perbarui dengan data asli"
          : "Belum data asli, ganti di src/content"
      }
    >
      {label}
    </span>
  );
}
