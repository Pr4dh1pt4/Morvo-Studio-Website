import Link from "next/link";
import type { Product, SiteConfig } from "@/content/types";
import { mainNav } from "@/content/navigation";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { emailLink, whatsappLink } from "@/lib/contact";
import { Logo } from "./Logo";

type FooterProps = {
  site: SiteConfig;
  products: Product[];
};

const linkClass =
  "rounded-sm text-on-deep-muted transition-colors hover:text-pet";

export function Footer({ site, products }: FooterProps) {
  const { contact } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-footer text-on-deep">
      <div
        aria-hidden="true"
        className="layer-lines pointer-events-none absolute inset-0 text-on-deep opacity-[0.04]"
      />
      <Container className="relative grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm text-on-deep-muted">{site.tagline}.</p>
          <p className="mt-4 text-sm text-on-deep-muted">
          <span className="font-semibold text-on-deep">{site.program}</span>.
          </p>
        </div>

        <nav aria-label="Navigasi footer">
          <h2 className="font-sans text-sm font-semibold tracking-[0.14em] text-pet uppercase">
            Jelajahi
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/qr-letter/contoh" className={linkClass}>
                Contoh QR Letter
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-[0.14em] text-pet uppercase">
            Produk
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {products.map((product) => (
              <li key={product.slug}>
                <Link href={`/produk/${product.slug}`} className={linkClass}>
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-[0.14em] text-pet uppercase">
            Kontak
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink(contact)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${linkClass}`}
              >
                <Icon name="whatsapp" className="size-4" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={emailLink(contact)}
                className={`inline-flex items-center gap-2 break-all ${linkClass}`}
              >
                <Icon name="mail" className="size-4 shrink-0" />
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={contact.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${linkClass}`}
              >
                <Icon name="instagram" className="size-4" />
                {contact.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="relative flex flex-col gap-2 border-t border-on-deep/15 py-6 text-xs text-on-deep-muted sm:flex-row sm:justify-between">
        <p>
          © {year} {site.name}. Dibuat dari botol yang tidak jadi dibuang.
        </p>
        <p>Situs ini tidak memakai cookie atau pelacak.</p>
      </Container>
    </footer>
  );
}
