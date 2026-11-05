import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { MaterialBadges, usesWood } from "./ProductCard";

type ProductDetailProps = {
  product: Product;
  /** Tautan WhatsApp dengan pesan otomatis berisi nama produk. */
  orderHref: string;
};

export function ProductDetail({ product, orderHref }: ProductDetailProps) {
  const [first, ...rest] = [product.image, ...product.gallery];

  return (
    <article aria-labelledby="produk-nama">
      <Container className="pt-8 md:pt-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <li>
              <Link href="/" className="rounded-sm hover:text-accent-ink">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/#produk" className="rounded-sm hover:text-accent-ink">
                Produk
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-fg">
              {product.name}
            </li>
          </ol>
        </nav>
      </Container>

      <Container className="grid gap-10 py-8 md:py-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        {/* Galeri */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="col-span-2 overflow-hidden rounded-card border border-line bg-cream">
            <Image
              src={first.src}
              alt={first.alt}
              width={first.width}
              height={first.height}
              priority
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="aspect-[4/5] h-auto w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </div>
          {rest.map((img) => (
            <div key={img.src} className="overflow-hidden rounded-card border border-line bg-cream">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1024px) 18rem, 50vw"
                className="aspect-square h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <MaterialBadges product={product} />
          <h1 id="produk-nama" className="mt-4 text-4xl md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-muted">{product.summary}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href={orderHref}
              size="lg"
              icon={<Icon name="whatsapp" className="size-5" />}
              iconPosition="start"
            >
              Pesan {product.name} via WhatsApp
            </ButtonLink>
            {product.qrLetter && (
              <ButtonLink href="/qr-letter/contoh" variant="secondary" size="lg">
                Lihat contoh QR Letter
              </ButtonLink>
            )}
          </div>
          <p className="mt-3 text-sm text-muted">
            Harga menyesuaikan jumlah dan personalisasi. Pesan WhatsApp sudah terisi nama
            produk, tinggal kirim.
          </p>

          <div className="mt-10 space-y-4 text-fg">
            {product.description.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>

          <dl className="mt-8 grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {product.specs.map((spec) => (
              <div key={spec.label} className="py-4 sm:px-4 sm:first:pl-0">
                <dt className="text-xs font-semibold tracking-wide text-muted uppercase">
                  {spec.label}
                </dt>
                <dd className="mt-1 font-semibold">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <Container className="grid gap-6 pb-20 md:grid-cols-2 md:pb-28">
        <Card className="p-6 md:p-8">
          <h2 className="text-2xl">Opsi personalisasi</h2>
          <ul className="mt-5 space-y-4">
            {product.personalization.map((opt) => (
              <li key={opt.name} className="grid grid-cols-[1.25rem_1fr] gap-3">
                <span aria-hidden="true" className="mt-2 size-2.5 rounded-full bg-leaf" />
                <span>
                  <span className="block font-semibold">{opt.name}</span>
                  <span className="text-sm text-muted">{opt.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card woodGrain={usesWood(product)} className="p-6 md:p-8">
          <h2 className="text-2xl">Material</h2>
          <ul className="mt-5 space-y-4">
            {product.materials.map((m) => (
              <li key={m.name} className="grid grid-cols-[1.25rem_1fr] gap-3">
                <span
                  aria-hidden="true"
                  className={
                    m.kind === "pet"
                      ? "mt-2 size-2.5 rounded-full bg-pet ring-2 ring-pet/40"
                      : "mt-2 size-2.5 rounded-full bg-wood"
                  }
                />
                <span>
                  <span className="block font-semibold">
                    {m.name}
                    {m.optional && (
                      <span className="ml-1.5 text-sm font-normal text-muted">(opsional)</span>
                    )}
                  </span>
                  <span className="text-sm text-muted">{m.detail}</span>
                </span>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 font-sans text-sm font-semibold tracking-wide text-muted uppercase">
            Cocok untuk
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {product.idealFor.map((use) => (
              <li
                key={use}
                className="rounded-full border border-line-strong bg-surface px-3 py-1 text-sm"
              >
                {use}
              </li>
            ))}
          </ul>
        </Card>
      </Container>
    </article>
  );
}
