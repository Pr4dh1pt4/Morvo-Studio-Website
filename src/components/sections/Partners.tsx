import Image from "next/image";
import type { Partner, PartnerType, SiteConfig } from "@/content/types";
import { DataFlag } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatsappLink } from "@/lib/contact";

const groups: { type: PartnerType; title: string }[] = [
  { type: "bank-sampah", title: "Mitra bank sampah" },
  { type: "institusi", title: "Institusi pendukung" },
];

function PartnerLogo({ partner }: { partner: Partner }) {
  const logo = (
    <Image
      src={partner.logo.src}
      alt={partner.logo.alt}
      width={partner.logo.width}
      height={partner.logo.height}
      sizes="12rem"
      className="h-auto w-full max-w-48 rounded-md"
    />
  );
  return (
    <li className="relative flex flex-col items-center justify-center gap-3 rounded-card border border-line bg-surface p-5">
      {partner.url ? (
        <a href={partner.url} target="_blank" rel="noopener noreferrer" className="rounded-md">
          {logo}
          <span className="sr-only"> (membuka tab baru)</span>
        </a>
      ) : (
        logo
      )}
      {partner.isPlaceholder && <DataFlag kind="placeholder" />}
    </li>
  );
}

export function Partners({ partners, site }: { partners: Partner[]; site: SiteConfig }) {
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
              "Halo Morvo, kami tertarik menjadi mitra (bank sampah/institusi). Boleh berdiskusi?",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-sm text-sm font-semibold text-accent-ink underline underline-offset-4"
          >
            Ingin bermitra dengan Morvo?
            <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
          </a>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {groups.map((group) => {
            const items = partners.filter((p) => p.type === group.type);
            if (items.length === 0) return null;
            return (
              <div key={group.type}>
                <h3 className="font-sans text-sm font-semibold tracking-[0.14em] text-muted uppercase">
                  {group.title}
                </h3>
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                  {items.map((partner) => (
                    <PartnerLogo key={partner.id} partner={partner} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
