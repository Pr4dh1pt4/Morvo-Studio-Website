import type { Metadata } from "next";
import { LogoMark } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  // Next.js otomatis menambahkan noindex untuk halaman 404.
  title: "Halaman tidak ditemukan",
};

export default function NotFound() {
  return (
    <main id="konten" className="relative flex flex-1 items-center overflow-hidden py-24">
      <div
        aria-hidden="true"
        className="layer-lines pointer-events-none absolute inset-0 text-forest opacity-[0.05] dark:text-cream dark:opacity-[0.04]"
      />
      <Container size="narrow" className="relative text-center">
        <LogoMark className="mx-auto h-16" />
        <p className="mt-8 font-serif text-7xl font-semibold text-heading">404</p>
        <h1 className="mt-4 text-3xl">Halaman ini belum sempat dicetak</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Tautannya mungkin salah ketik atau halamannya sudah dipindah. Kembali ke beranda
          untuk melihat produk Morvo.
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/" size="lg">
            Kembali ke beranda
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
