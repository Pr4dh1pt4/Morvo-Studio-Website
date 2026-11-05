import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  /** "narrow" untuk teks panjang (surat, artikel). */
  size?: "default" | "narrow";
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({
  as,
  size = "default",
  className,
  ...props
}: ContainerProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "narrow" ? "max-w-3xl" : "max-w-6xl",
        className,
      )}
      {...props}
    />
  );
}
