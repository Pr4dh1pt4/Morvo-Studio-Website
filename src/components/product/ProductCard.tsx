import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/content/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

/** true jika kayu adalah material utama (bukan opsional). */
export const usesWood = (product: Product) =>
  product.materials.some((m) => m.kind === "kayu" && !m.optional);

export function MaterialBadges({ product }: { product: Product }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Material">
      {product.materials.map((m) => (
        <li key={m.name}>
          <Badge tone={m.kind === "pet" ? "pet" : "wood"}>
            {m.kind === "pet" ? "rPET" : m.optional ? "Opsi kayu" : "Kayu limbah"}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

/** Kartu katalog. Seluruh kartu bisa diklik lewat tautan pada judul. */
export function ProductCard({ product, headingLevel = "h3" }: { product: Product; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const wood = usesWood(product);
  return (
    <Card
      woodGrain={wood}
      className="group relative flex h-full flex-col overflow-hidden transition-colors hover:border-leaf"
    >
      <div className="overflow-hidden border-b border-line bg-cream">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          width={product.image.width}
          height={product.image.height}
          sizes="(min-width: 1024px) 18rem, 50vw"
          className="aspect-square h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <Heading className="text-lg md:text-xl">
          <Link
            href={`/produk/${product.slug}`}
            className="rounded-sm after:absolute after:inset-0 after:content-['']"
          >
            {product.name}
          </Link>
        </Heading>
        <p className="text-sm text-muted">{product.summary}</p>
        <div className="mt-auto flex flex-col gap-3">
          <MaterialBadges product={product} />
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink"
          >
            Lihat detail
            <Icon
              name="arrow-right"
              className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </span>
        </div>
      </div>
    </Card>
  );
}

/** Kartu penutup grid katalog: pesanan bentuk custom. */
export function CustomOrderCard({ href }: { href: string }) {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-card bg-deep p-5 text-on-deep md:p-6">
      <div
        aria-hidden="true"
        className="layer-lines pointer-events-none absolute inset-0 text-on-deep opacity-[0.05]"
      />
      <div className="relative">
        <p className="text-sm font-semibold text-pet">Pesanan custom</p>
        <h3 className="mt-2 text-xl text-on-deep md:text-2xl">Punya ide bentuk sendiri?</h3>
        <p className="mt-3 text-sm text-on-deep-muted">
          Trofi, medali, piagam, atau bentuk lain dari logo acaramu. Ceritakan idenya,
          kami bantu wujudkan dari rPET.
        </p>
      </div>
      <div className="relative mt-6">
        <ButtonLink
          href={href}
          variant="on-deep"
          className="w-full"
          icon={<Icon name="whatsapp" className="size-4" />}
          iconPosition="start"
        >
          Request Design
        </ButtonLink>
      </div>
    </div>
  );
}
