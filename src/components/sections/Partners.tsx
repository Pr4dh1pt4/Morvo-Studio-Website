import Image from "next/image";
import type { Partner, SiteConfig } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatsappLink } from "@/lib/contact";

/**
 * Jumlah total deret logo di jalur marquee (harus genap: separuh pertama
 * identik dengan separuh kedua agar geseran -50% menyambung mulus).
 * Dengan sedikit mitra, deret diulang supaya selalu lebih lebar dari layar.
 */
function groupCount(itemCount: number) {
  const perHalf = Math.max(1, Math.ceil(12 / Math.max(itemCount, 1)));
  return perHalf * 2;
}

function PartnerLogo({ partner, decorative = false }: { partner: Partner; decorative?: boolean }) {
  const logo = (
    <Image
      src={partner.logo.src}
      alt={decorative ? "" : partner.logo.alt}
      width={partner.logo.width}
      height={partner.logo.height}
      sizes="(min-width: 768px) 20rem, 13rem"
      title={partner.name}
      className="h-20 w-auto max-w-52 rounded-lg object-contain sm:h-24 md:h-32 md:max-w-80"
    />
  );
  if (!partner.url || decorative) return logo;
  return (
    <a href={partner.url} target="_blank" rel="noopener noreferrer" className="block rounded-md">
      {logo}
      <span className="sr-only"> (membuka tab baru)</span>
    </a>
  );
}

const groupClass = "flex shrink-0 items-center gap-16 pr-16 sm:gap-20 sm:pr-20 md:gap-28 md:pr-28";

export function Partners({ partners, site }: { partners: Partner[]; site: SiteConfig }) {
  const copies = groupCount(partners.length) - 1;

  return (
    <section id="mitra" aria-labelledby="mitra-title" className="py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="mitra-title"
            eyebrow="Mitra"
            title="Bersama mereka, botol kembali berguna"
          />
          <a
            href={whatsappLink(
              site.contact,
              "Halo Morvo, kami tertarik menjadi mitra (bank sampah/komunitas/institusi). Boleh berdiskusi?",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-sm text-sm font-semibold text-accent-ink underline underline-offset-4"
          >
            Ingin bermitra dengan Morvo?
            <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
          </a>
        </div>
      </Container>

      {partners.length > 0 && (
        <div className="marquee mt-12 overflow-hidden py-6 md:mt-16">
          <div className="marquee-track">
            {/* Deret asli: satu-satunya yang dibaca screen reader dan bisa difokus. */}
            <ul aria-label="Mitra dan institusi pendukung Morvo" className={groupClass}>
              {partners.map((partner) => (
                <li key={partner.id}>
                  <PartnerLogo partner={partner} />
                </li>
              ))}
            </ul>
            {/* Salinan dekoratif untuk efek berjalan tanpa jeda. */}
            {Array.from({ length: copies }, (_, i) => (
              <div key={i} aria-hidden="true" data-marquee-copy className={groupClass}>
                {partners.map((partner) => (
                  <PartnerLogo key={partner.id} partner={partner} decorative />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
