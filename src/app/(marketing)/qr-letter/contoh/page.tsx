import { notFound } from "next/navigation";
import { LetterView } from "@/components/qr-letter/LetterView";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { getQrLetterById, getSite } from "@/content";
import { whatsappLink } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contoh QR Letter",
  description:
    "Lihat apa yang dibaca penerima saat memindai QR Letter di produk Morvo: pesan pribadi dari pemberi penghargaan.",
  path: "/qr-letter/contoh",
});

export default async function QrLetterSamplePage() {
  // Nanti: route dinamis /qr-letter/[id] yang mengambil surat dari database.
  const letter = await getQrLetterById("contoh");
  if (!letter) notFound();
  const site = getSite();

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="layer-lines pointer-events-none absolute inset-x-0 top-0 h-80 text-forest opacity-[0.05] dark:text-cream dark:opacity-[0.04]"
      />
      <Container size="narrow" className="relative py-10 md:py-16">
        {letter.isSample && (
          <p
            role="note"
            className="mb-8 rounded-card border border-dashed border-wood-ink/60 bg-wood/5 px-4 py-3 text-center text-sm text-fg"
          >
            Ini <strong>contoh</strong> QR Letter. Nama dan isi pesannya fiktif, untuk
            menunjukkan apa yang dilihat penerima saat memindai QR di produk Morvo.
          </p>
        )}

        <LetterView letter={letter} />

        <div className="mt-12 rounded-card bg-deep p-7 text-center text-on-deep md:p-10">
          <h2 className="text-2xl text-on-deep md:text-3xl">
            Ingin menulis QR Letter-mu sendiri?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-on-deep-muted">
            Ceritakan siapa yang ingin kamu hargai. Kami bantu memilih produk dan menyiapkan
            pesannya.
          </p>
          <div className="mt-6 flex justify-center">
            <ButtonLink
              href={whatsappLink(
                site.contact,
                "Halo Morvo, saya ingin memesan produk dengan QR Letter. Bagaimana caranya?",
              )}
              variant="on-deep"
              size="lg"
              icon={<Icon name="whatsapp" className="size-5" />}
              iconPosition="start"
            >
              Pesan dengan QR Letter
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
