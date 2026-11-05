import type { Product, SiteConfig } from "@/content/types";
import { CustomOrderCard, ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatsappLink } from "@/lib/contact";

type ProductsProps = {
  products: Product[];
  site: SiteConfig;
};

export function Products({ products, site }: ProductsProps) {
  return (
    <section
      id="produk"
      aria-labelledby="produk-title"
      className="border-y border-line bg-surface py-20 md:py-28"
    >
      <Container>
        <SectionHeading
          id="produk-title"
          eyebrow="Katalog"
          title="Benda kecil yang membawa penghargaan besar"
          lead="Setiap produk dicetak dari filamen botol PET bekas dan bisa dipersonalisasi: nama, logo, warna, sampai pesan QR Letter."
        />
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {products.map((product, i) => (
            <Reveal as="li" key={product.slug} delay={i * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
          <Reveal as="li" delay={products.length * 80}>
            <CustomOrderCard
              href={whatsappLink(
                site.contact,
                "Halo Morvo, saya punya ide produk custom. Boleh saya ceritakan?",
              )}
            />
          </Reveal>
        </ul>
      </Container>
    </section>
  );
}
