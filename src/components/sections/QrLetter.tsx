import type { QrLetter as QrLetterData, QrLetterStep } from "@/content/types";
import { LetterView } from "@/components/qr-letter/LetterView";
import { PhoneMockup } from "@/components/qr-letter/PhoneMockup";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type QrLetterProps = {
  steps: QrLetterStep[];
  sample: QrLetterData;
};

export function QrLetter({ steps, sample }: QrLetterProps) {
  return (
    <section
      id="qr-letter"
      aria-labelledby="qr-letter-title"
      className="relative overflow-hidden bg-deep py-20 text-on-deep md:py-28"
    >
      <div
        aria-hidden="true"
        className="layer-lines pointer-events-none absolute inset-0 text-on-deep opacity-[0.05]"
      />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            {/* Lingkaran pet di belakang ponsel, seperti gulungan filamen */}
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 size-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[18px] border-pet/25"
            />
            <PhoneMockup
              label={`Contoh tampilan QR Letter di ponsel: surat dari ${sample.senderName} untuk ${sample.recipientName}`}
              className="relative"
            >
              <LetterView letter={sample} variant="compact" />
            </PhoneMockup>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            id="qr-letter-title"
            tone="deep"
            eyebrow="QR Letter"
            title="Setiap penghargaan membawa surat dari pemberinya"
            lead="Kode QR kecil di badan produk membuka pesan digital yang kamu tulis sendiri. Bendanya disimpan, ceritanya tetap bisa dibaca."
          />
          <ol className="mt-10 space-y-6">
            {steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.step}
                delay={i * 100}
                className="grid grid-cols-[3rem_1fr] gap-4"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-4xl leading-none font-semibold text-pet"
                >
                  {step.step}
                </span>
                <div>
                  <h3 className="text-xl text-on-deep">
                    <span className="sr-only">Langkah {step.step}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-1 text-on-deep-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10">
            <ButtonLink
              href="/qr-letter/contoh"
              variant="on-deep"
              size="lg"
              icon={<Icon name="qr" className="size-5" />}
              iconPosition="start"
            >
              Lihat contoh QR Letter
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
