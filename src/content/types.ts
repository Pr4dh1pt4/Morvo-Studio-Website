/**
 * Tipe data konten Morvo.
 *
 * Semua konten situs mengikuti tipe di file ini. Saat konten dipindah ke
 * database, cukup pastikan query mengembalikan bentuk yang sama, lalu ganti
 * implementasi fungsi di `src/content/index.ts`. Komponen tidak perlu diubah.
 */

/** Gambar statis di `public/`. `src` diawali "/" (misal "/images/produk-plakat.svg"). */
export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Rujukan sumber data (untuk angka/statistik yang dikutip). */
export interface Source {
  label: string;
  url: string;
  /** Tanggal publikasi sumber, format bebas (misal "7 Agustus 2026"). */
  date?: string;
}

// ---------------------------------------------------------------------------
// Situs & kontak
// ---------------------------------------------------------------------------

export interface SiteConfig {
  name: string;
  tagline: string;
  /** Kalimat pendek untuk meta description & subjudul hero. */
  description: string;
  /** URL dasar situs, dipakai sitemap, robots, dan Open Graph. */
  url: string;
  locale: string;
  program: string;
  contact: ContactInfo;
}

export interface ContactInfo {
  /**
   * Nomor WhatsApp format internasional tanpa "+", spasi, atau 0 di depan.
   * Contoh: 6281234567890
   */
  whatsappNumber: string;
  email: string;
  instagram: {
    handle: string;
    url: string;
  };
}

// ---------------------------------------------------------------------------
// Produk
// ---------------------------------------------------------------------------

export type MaterialKind = "pet" | "kayu";

export interface ProductMaterial {
  kind: MaterialKind;
  name: string;
  detail: string;
  /** true jika material ini opsional (bisa dipilih pemesan). */
  optional?: boolean;
}

export interface PersonalizationOption {
  name: string;
  detail: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  /** Dipakai sebagai URL: /produk/[slug] */
  slug: string;
  name: string;
  /** Satu kalimat pendek untuk kartu katalog. */
  summary: string;
  /** Paragraf deskripsi di halaman detail. */
  description: string[];
  image: ImageAsset;
  gallery: ImageAsset[];
  materials: ProductMaterial[];
  personalization: PersonalizationOption[];
  specs: ProductSpec[];
  idealFor: string[];
  qrLetter: boolean;
  /** Urutan tampil di katalog (kecil → besar). */
  order: number;
}

// ---------------------------------------------------------------------------
// Landing page
// ---------------------------------------------------------------------------

export interface ProblemFact {
  value: string;
  label: string;
  source: Source;
  /** Catatan cara perhitungan, jika angka diturunkan dari sumber. */
  note?: string;
}

export interface ProblemPoint {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  facts: ProblemFact[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  /** Nama ikon dari komponen `Icon`. */
  icon: IconName;
  /** Label kecil di bawah judul, misal "Mitra bank sampah". */
  tag?: string;
}

export interface QrLetterStep {
  step: number;
  title: string;
  description: string;
}

export interface AudienceSegment {
  id: string;
  title: string;
  lead: string;
  who: string[];
  useCases: string[];
  cta: {
    label: string;
    /** Pesan awal WhatsApp yang terisi otomatis. */
    whatsappMessage: string;
  };
}

export interface Stat {
  id: string;
  value: number;
  /** Jumlah digit desimal saat ditampilkan. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Penjelasan singkat cara angka diperoleh. */
  note?: string;
  /** true = angka perkiraan, tampil dengan badge "Estimasi". */
  isEstimate: boolean;
}

export type PartnerType = "bank-sampah" | "institusi";

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  logo: ImageAsset;
  url?: string;
  /** true = belum mitra resmi, tampil dengan badge "Data contoh". */
  isPlaceholder: boolean;
}

// ---------------------------------------------------------------------------
// QR Letter
// ---------------------------------------------------------------------------

export interface QrLetter {
  /** ID unik yang nantinya tercetak di QR (misal /qr-letter/abc123). */
  id: string;
  occasion: string;
  recipientName: string;
  senderName: string;
  senderRole?: string;
  /** Tanggal ISO (YYYY-MM-DD). */
  date: string;
  greeting: string;
  body: string[];
  closing: string;
  product: {
    name: string;
    slug: string;
    image: ImageAsset;
    /** Perkiraan jumlah botol PET yang dipakai untuk produk ini. */
    bottlesUsed?: number;
  };
  /** true = surat contoh, bukan pesan asli. */
  isSample: boolean;
}

// ---------------------------------------------------------------------------

export type IconName =
  | "bottle"
  | "shred"
  | "spool"
  | "printer"
  | "pen"
  | "qr"
  | "phone"
  | "arrow-right"
  | "whatsapp"
  | "mail"
  | "instagram";
