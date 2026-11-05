import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  /** Tambahkan tekstur serat kayu (untuk produk bermaterial kayu). */
  woodGrain?: boolean;
};

/** Kartu dasar: latar paper, sudut 12px, border tipis tanpa bayangan tebal. */
export function Card({ className, woodGrain, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-surface",
        woodGrain && "wood-grain",
        className,
      )}
      {...props}
    />
  );
}
