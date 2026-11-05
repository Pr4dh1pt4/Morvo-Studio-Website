export interface NavLink {
  label: string;
  href: string;
}

/** Menu utama. Anchor mengarah ke section di halaman utama. */
export const mainNav: NavLink[] = [
  { label: "Proses", href: "/#proses" },
  { label: "Produk", href: "/#produk" },
  { label: "QR Letter", href: "/#qr-letter" },
  { label: "Untuk Siapa", href: "/#untuk-siapa" },
  { label: "Dampak", href: "/#dampak" },
  { label: "Kontak", href: "/#kontak" },
];
