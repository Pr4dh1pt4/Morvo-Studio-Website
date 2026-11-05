import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Bingkai ponsel sederhana untuk menampilkan cuplikan layar. */
export function PhoneMockup({
  children,
  label,
  className,
}: {
  children: ReactNode;
  /** Deskripsi isi layar untuk pembaca layar. */
  label: string;
  className?: string;
}) {
  return (
    <figure
      aria-label={label}
      className={cn(
        "relative mx-auto w-[17.5rem] rounded-[2.75rem] border border-on-deep/25 bg-[#0f1512] p-2.5",
        className,
      )}
    >
      <div className="relative h-[34rem] overflow-hidden rounded-[2.2rem] bg-bg">
        <div
          aria-hidden="true"
          className="absolute top-2 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#0f1512]"
        />
        <div className="h-full overflow-hidden pt-5">{children}</div>
      </div>
    </figure>
  );
}
