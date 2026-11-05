import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** id untuk dihubungkan dengan aria-labelledby pada <section>. */
  id?: string;
  align?: "start" | "center";
  /** "deep" untuk dipakai di atas section gelap. */
  tone?: "default" | "deep";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  align = "start",
  tone = "default",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const deep = tone === "deep";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold tracking-[0.14em] uppercase",
            deep ? "text-pet" : "text-accent-ink",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          "text-3xl sm:text-4xl md:text-[2.75rem]",
          deep && "text-on-deep",
        )}
      >
        {title}
      </Heading>
      {lead && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg",
            deep ? "text-on-deep-muted" : "text-muted",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
