import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomOrderCard, ProductCard } from "@/components/product/ProductCard";
import { ProductDetail } from "@/components/product/ProductDetail";
import { Container } from "@/components/ui/Container";
import { getProductBySlug, getProducts, getSite } from "@/content";
import { productOrderMessage, whatsappLink } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

// Hanya slug dari generateStaticParams yang dibuat (wajib untuk static export).
export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/produk/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return pageMetadata({
    title: `${product.name} dari Botol PET Daur Ulang`,
    description: `${product.summary} Personalisasi nama, logo, warna, dan QR Letter.`,
    path: `/produk/${product.slug}`,
  });
}

export default async function ProductPage({ params }: PageProps<"/produk/[slug]">) {
  const { slug } = await params;
  const [product, products] = await Promise.all([getProductBySlug(slug), getProducts()]);
  if (!product) notFound();

  const site = getSite();
  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <ProductDetail
        product={product}
        orderHref={whatsappLink(site.contact, productOrderMessage(product.name))}
      />

      <section
        aria-labelledby="produk-lain"
        className="border-t border-line bg-surface py-16 md:py-24"
      >
        <Container>
          <h2 id="produk-lain" className="text-3xl">
            Produk lainnya
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {others.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
            <li>
              <CustomOrderCard
                href={whatsappLink(
                  site.contact,
                  "Halo Morvo, saya punya ide produk custom. Boleh saya ceritakan?",
                )}
              />
            </li>
          </ul>
        </Container>
      </section>
    </>
  );
}
