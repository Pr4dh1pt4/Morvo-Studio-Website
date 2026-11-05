import type { MetadataRoute } from "next";
import { getProducts, getSite } from "@/content";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { url } = getSite();
  const products = await getProducts();
  const lastModified = new Date();
  // trailingSlash: true di next.config, jadi semua URL diakhiri "/".
  const page = (path: string) => new URL(path, url).toString();

  return [
    { url: page("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    ...products.map((product) => ({
      url: page(`/produk/${product.slug}/`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: page("/qr-letter/contoh/"), lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];
}
