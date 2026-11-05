"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { THEME_STORAGE_KEY } from "./ThemeScript";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
// Saat prerender tema belum diketahui; ikon ditentukan setelah hidrasi.
const getServerSnapshot = () => null;

export function ThemeToggle({ className }: { className?: string }) {
  const isDark = useSyncExternalStore<boolean | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // localStorage bisa diblokir (mode privat); tema tetap berganti untuk sesi ini.
    }
  };

  const label = isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-leaf hover:text-accent-ink",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-5"
      >
        {isDark ? (
          // Matahari: klik untuk kembali ke terang.
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
          </>
        ) : (
          // Bulan: klik untuk mode gelap.
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        )}
      </svg>
    </button>
  );
}
