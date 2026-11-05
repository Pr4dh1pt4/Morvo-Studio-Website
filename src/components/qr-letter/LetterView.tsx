import Image from "next/image";
import Link from "next/link";
import type { QrLetter } from "@/content/types";
import { cn } from "@/lib/cn";

type LetterViewProps = {
  /** Data surat. Nanti bisa diambil dari database berdasarkan ID di QR. */
  letter: QrLetter;
  /**
   * "full": tampilan penerima di halaman /qr-letter/...
   * "compact": cuplikan untuk mockup ponsel di landing page.
   */
  variant?: "full" | "compact";
  className?: string;
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

/**
 * Tampilan yang dilihat penerima setelah memindai QR Letter.
 * Komponen ini murni dari props, tanpa mengambil data sendiri.
 */
export function LetterView({ letter, variant = "full", className }: LetterViewProps) {
  const compact = variant === "compact";
  const body = compact ? letter.body.slice(0, 1) : letter.body;
  const HeadingTag = compact ? "p" : "h1";

  return (
    <div className={cn("text-fg", className)}>
      {/* Kepala surat */}
      <header className={cn("text-center", compact ? "px-4 pt-6" : "px-2")}>
        <p
          className={cn(
            "font-semibold tracking-[0.18em] text-accent-ink uppercase",
            compact ? "text-[0.6rem]" : "text-xs",
          )}
        >
          QR Letter · Morvo
        </p>
        <HeadingTag
          className={cn(
            "mt-2 font-serif font-semibold text-heading",
            compact ? "text-xl leading-tight" : "text-4xl md:text-5xl",
          )}
        >
          Untuk {letter.recipientName}
        </HeadingTag>
        <p className={cn("mt-2 text-muted", compact ? "text-[0.7rem]" : "text-base")}>
          {letter.occasion}
        </p>
      </header>

      {/* Isi surat */}
      <div
        className={cn(
          "relative overflow-hidden border border-line bg-surface",
          compact ? "mx-3 mt-4 rounded-[10px] p-4" : "mt-8 rounded-card p-7 md:p-12",
        )}
      >
        <div
          aria-hidden="true"
          className="layer-lines pointer-events-none absolute inset-x-0 top-0 h-2 text-pet opacity-80"
        />
        <p className={cn("font-serif font-semibold text-heading", compact ? "text-sm" : "text-2xl")}>
          {letter.greeting}
        </p>
        <div className={cn(compact ? "mt-2 space-y-2 text-[0.72rem] leading-relaxed" : "mt-6 space-y-5 md:text-lg")}>
          {body.map((para) => (
            <p key={para.slice(0, 32)}>{para}</p>
          ))}
          {compact && letter.body.length > 1 && <p className="text-muted">…</p>}
        </div>
        <div className={cn(compact ? "mt-3" : "mt-10")}>
          <p className={cn("text-muted", compact && "text-[0.7rem]")}>{letter.closing}</p>
          <p
            className={cn(
              "font-serif font-semibold text-heading",
              compact ? "text-base" : "mt-1 text-3xl",
            )}
          >
            {letter.senderName}
          </p>
          {letter.senderRole && (
            <p className={cn("text-muted", compact ? "text-[0.65rem]" : "text-sm")}>
              {letter.senderRole}
            </p>
          )}
          {!compact && (
            <p className="mt-6 text-sm text-muted">
              <time dateTime={letter.date}>{formatDate(letter.date)}</time>
            </p>
          )}
        </div>
      </div>

      {/* Asal benda */}
      {compact ? (
        <p className="mx-3 mt-3 rounded-[10px] border border-pet bg-pet/30 px-3 py-2 text-[0.65rem] text-fg dark:bg-pet/10">
          Ditulis untuk {letter.product.name} dari ± {letter.product.bottlesUsed ?? "beberapa"} botol PET bekas.
        </p>
      ) : (
        <aside
          aria-label="Tentang benda ini"
          className="mt-6 grid items-center gap-5 rounded-card border border-line bg-surface p-5 sm:grid-cols-[10rem_1fr] md:p-6"
        >
          <Image
            src={letter.product.image.src}
            alt={letter.product.image.alt}
            width={letter.product.image.width}
            height={letter.product.image.height}
            sizes="10rem"
            className="h-auto w-full rounded-[10px] border border-line"
          />
          <div>
            <p className="font-semibold">Pesan ini menempel pada sebuah {letter.product.name.toLowerCase()}.</p>
            <p className="mt-1 text-sm text-muted">
              Benda di tanganmu dicetak dari
              {letter.product.bottlesUsed
                ? ` sekitar ${letter.product.bottlesUsed} botol PET bekas`
                : " botol PET bekas"}{" "}
              yang dikumpulkan lewat mitra bank sampah Morvo.
            </p>
            <Link
              href={`/produk/${letter.product.slug}`}
              className="mt-3 inline-block rounded-sm text-sm font-semibold text-accent-ink underline underline-offset-2"
            >
              Lihat produk {letter.product.name}
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
}
