import type { IconName, SiteConfig } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { emailLink, whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/cn";

type Channel = {
  icon: IconName;
  title: string;
  detail: string;
  href: string;
  primary?: boolean;
};

export function Contact({ site }: { site: SiteConfig }) {
  const { contact } = site;
  const channels: Channel[] = [
    {
      icon: "whatsapp",
      title: "Pesan via WhatsApp",
      detail: "Untuk pesanan satuan dan hadiah personal.",
      href: whatsappLink(
        contact,
        "Halo Morvo, saya ingin memesan produk. Boleh dibantu pilihan dan harganya?",
      ),
      primary: true,
    },
    {
      icon: "whatsapp",
      title: "Minta penawaran B2B",
      detail: "Untuk kampus, perusahaan, dan event organizer.",
      href: whatsappLink(
        contact,
        "Halo Morvo, saya dari [nama institusi]. Kami ingin meminta penawaran untuk [produk] sebanyak [jumlah] pcs. Kebutuhan tanggal: [tanggal].",
      ),
    },
    {
      icon: "mail",
      title: "Email",
      detail: contact.email,
      href: emailLink(contact, "Pertanyaan untuk Morvo"),
    },
    {
      icon: "instagram",
      title: "Instagram",
      detail: contact.instagram.handle,
      href: contact.instagram.url,
    },
  ];

  return (
    <section
      id="kontak"
      aria-labelledby="kontak-title"
      className="border-t border-line bg-surface py-20 md:py-28"
    >
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <SectionHeading
          id="kontak-title"
          eyebrow="Kontak"
          title="Ceritakan siapa yang ingin kamu hargai"
          lead="Pemesanan dan konsultasi lewat WhatsApp, biasanya dibalas di hari yang sama. Untuk pesanan institusi, kirim jumlah dan tanggal acara supaya kami bisa langsung menyiapkan penawaran."
        />
        <ul className="grid gap-3">
          {channels.map((ch) => {
            const external = ch.href.startsWith("http");
            return (
              <li key={ch.title}>
                <a
                  href={ch.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={cn(
                    "group grid grid-cols-[3rem_1fr_auto] items-center gap-4 rounded-card border p-4 transition-colors md:p-5",
                    ch.primary
                      ? "border-primary bg-primary text-on-primary hover:bg-primary-hover"
                      : "border-line bg-bg hover:border-leaf",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center rounded-full",
                      ch.primary ? "bg-on-primary/15" : "bg-pet/40 text-ink dark:bg-pet/15 dark:text-pet",
                    )}
                  >
                    <Icon name={ch.icon} className="size-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold">{ch.title}</span>
                    <span
                      className={cn(
                        "block text-sm break-words",
                        ch.primary ? "text-on-primary/85" : "text-muted",
                      )}
                    >
                      {ch.detail}
                    </span>
                  </span>
                  <Icon
                    name="arrow-right"
                    className="size-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                  {external && <span className="sr-only"> (membuka tab baru)</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
