"use client";

import { useEffect, useState } from "react";
import { useInViewOnce, usePrefersReducedMotion } from "@/lib/hooks";

type CountUpProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Durasi animasi dalam milidetik. */
  duration?: number;
  className?: string;
};

const format = (n: number, decimals: number) =>
  n.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/**
 * Angka yang menghitung naik saat terlihat. HTML hasil build sudah berisi
 * angka akhir (aman untuk SEO dan tanpa JS). Pembaca layar selalu
 * mendapat angka akhir lewat teks sr-only.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
  className,
}: CountUpProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [ref, inView] = useInViewOnce<HTMLSpanElement>({ threshold: 0.4 });
  // null = tampilkan angka akhir.
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    if (reducedMotion || !inView) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(t < 1 ? value * eased : null);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, value, duration]);

  const finalText = `${prefix}${format(value, decimals)}${suffix}`;
  const shown = current === null ? value : current;

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true" className="tabular-nums">
        {prefix}
        {format(shown, decimals)}
        {suffix}
      </span>
      <span className="sr-only">{finalText}</span>
    </span>
  );
}
