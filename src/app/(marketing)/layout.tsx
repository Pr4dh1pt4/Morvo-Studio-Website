import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getProducts, getSite } from "@/content";
import { mainNav } from "@/content/navigation";
import { whatsappLink } from "@/lib/contact";

export default async function MarketingLayout({ children }: LayoutProps<"/">) {
  const site = getSite();
  const products = await getProducts();

  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Langsung ke konten utama
      </a>
      <Navbar
        links={mainNav}
        orderHref={whatsappLink(
          site.contact,
          "Halo Morvo, saya ingin bertanya tentang pemesanan produk.",
        )}
      />
      <main id="konten" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer site={site} products={products} />
    </>
  );
}
