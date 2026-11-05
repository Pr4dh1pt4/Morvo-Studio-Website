"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/** true jika pengguna meminta animasi dikurangi. Saat prerender dianggap true (aman). */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => true,
  );
}

/**
 * Mengamati apakah elemen sudah masuk viewport. Setelah terlihat sekali,
 * nilainya tetap true (cocok untuk animasi masuk).
 */
export function useInViewOnce<T extends Element>(
  options: IntersectionObserverInit = { rootMargin: "0px 0px -10% 0px" },
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const { root, rootMargin, threshold } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  return [ref, inView] as const;
}
