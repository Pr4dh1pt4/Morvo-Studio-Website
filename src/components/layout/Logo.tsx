import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * File logo ada di public/images/brand/:
 * - morvo-logo.png          emblem + "ORVO" tanpa tagline (navbar, footer)
 * - morvo-logo-tagline.png  versi lengkap dengan "Where Waste Morphs Into Value"
 * - morvo-mark.png          emblem saja
 *
 * Logo berwarna (biru-hijau). Pakai di atas latar terang atau sangat gelap;
 * di atas hijau tua (bg-deep) huruf hijaunya kurang terbaca.
 */
const LOGO = { src: "/images/brand/morvo-logo.png", width: 534, height: 160 };
const MARK = { src: "/images/brand/morvo-mark.png", width: 482, height: 512 };

/** Emblem Morvo (tanpa tulisan). Dekoratif: pakai di samping teks yang sudah menyebut Morvo. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={MARK.src}
      alt=""
      width={MARK.width}
      height={MARK.height}
      className={cn("h-8 w-auto", className)}
    />
  );
}

/** Logo lengkap Morvo. */
export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  /** true untuk logo di atas lipatan (navbar) supaya dimuat lebih dulu. */
  priority?: boolean;
}) {
  return (
    <Image
      src={LOGO.src}
      alt="Morvo"
      width={LOGO.width}
      height={LOGO.height}
      priority={priority}
      className={cn("h-9 w-auto sm:h-10", className)}
    />
  );
}
