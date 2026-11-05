import Image from "next/image";
import type { SiteConfig, Stat } from "@/content/types";
import { DataFlag } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { whatsappLink } from "@/lib/contact";

type HeroProps = {
  site: SiteConfig;
  stat: Stat;
};

export function Hero({ site, stat }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="layer-lines pointer-events-none absolute inset-0 text-forest opacity-[0.05] dark:text-cream dark:opacity-[0.04]"
      />
      <Container className="relative grid items-center gap-12 py-12 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div>
          
          <h1
            id="hero-title"
            className="text-[2.25rem] leading-[1.08] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]"
          >
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted md:text-lg">
            {site.name} mencetak plakat, gantungan kunci, dan merch personalisasi dari
            filamen botol PET bekas. Setiap produk bisa membawa{" "}
            <strong className="font-semibold text-fg">QR Letter</strong>, pesan pribadi
            darimu yang dibuka penerima dengan sekali pindai.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href="/#produk"
              size="lg"
              icon={<Icon name="arrow-right" className="size-4" />}
            >
              Lihat katalog
            </ButtonLink>
            <ButtonLink
              href={whatsappLink(
                site.contact,
                "Halo Morvo, saya ingin memesan produk. Boleh minta info lebih lanjut?",
              )}
              variant="secondary"
              size="lg"
              icon={<Icon name="whatsapp" className="size-5" />}
              iconPosition="start"
            >
              Pesan via WhatsApp
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-muted">
            Bahan dari mitra bank sampah · Peserta {site.program}
          </p>
        </div>

        {/* Ilustrasi tanpa kotak, menempel ke tepi bawah section (margin negatif
            membatalkan padding bawah). Di desktop, gambar diposisikan absolut setinggi
            kolom teks + padding bawah, jadi puncak botol sejajar dengan judul. */}
        <div className="relative mx-auto -mb-12 w-full max-w-md self-end md:-mb-16 lg:-mb-24 lg:max-w-none lg:self-stretch">
          <Image
            src="/images/hero-botol-pet.svg"
            alt="Ilustrasi tiga botol plastik PET bekas, bahan baku produk Morvo"
            width={1200}
            height={1400}
            priority
            sizes="(min-width: 1024px) 40rem, (min-width: 640px) 28rem, 100vw"
            className="h-auto w-full lg:absolute lg:right-0 lg:bottom-0 lg:h-full lg:w-auto lg:max-w-none"
          />

          <p className="absolute bottom-16 hidden items-center gap-2 rounded-full border border-line bg-surface/95 px-3 py-1.5 text-xs font-semibold text-fg lg:-left-6 lg:inline-flex">
            <Icon name="qr" className="size-4 text-accent-ink" />
            QR Letter di setiap produk
          </p>

          <div className="absolute right-0 bottom-10 rounded-card border border-line bg-surface px-5 py-4 lg:bottom-12">
            <p className="font-serif text-4xl font-semibold text-heading md:text-5xl">
              <CountUp
                value={stat.value}
                decimals={stat.decimals}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted">
              {stat.label}
              {stat.isEstimate && <DataFlag />}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
