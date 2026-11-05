"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { NavLink } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

type NavbarProps = {
  links: NavLink[];
  orderHref: string;
};

export function Navbar({ links, orderHref }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Tutup menu mobile dengan Escape dan kembalikan fokus ke tombol menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Morvo, ke beranda" className="rounded-md">
          <Logo priority />
        </Link>

        <nav aria-label="Menu utama" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-semibold">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm text-fg transition-colors hover:text-accent-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:block">
            <ButtonLink
              href={orderHref}
              size="md"
              icon={<Icon name="whatsapp" className="size-4" />}
              iconPosition="start"
            >
              Pesan
            </ButtonLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Tutup menu" : "Buka menu"}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              aria-hidden="true"
              className="size-5"
            >
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <div
        id={menuId}
        className={cn("border-t border-line bg-bg lg:hidden", !open && "hidden")}
      >
        <Container as="nav" aria-label="Menu utama (mobile)" className="py-4">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md py-3 font-semibold text-fg hover:text-accent-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 sm:hidden">
              <ButtonLink
                href={orderHref}
                className="w-full"
                icon={<Icon name="whatsapp" className="size-4" />}
                iconPosition="start"
              >
                Pesan via WhatsApp
              </ButtonLink>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  );
}
