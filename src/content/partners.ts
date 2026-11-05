import type { Partner } from "./types";

/**
 * Mitra Morvo. Semua masih placeholder. Ganti nama, logo (taruh di
 * public/images/mitra/), dan url, lalu ubah isPlaceholder menjadi false.
 */
export const partners: Partner[] = [
  {
    id: "bank-sampah-1",
    name: "Bank Sampah Mitra 1",
    type: "bank-sampah",
    logo: {
      src: "/images/mitra/bank-sampah-1.svg",
      alt: "Logo Bank Sampah Mitra 1",
      width: 320,
      height: 160,
    },
    isPlaceholder: true,
  },
  {
    id: "bank-sampah-2",
    name: "Bank Sampah Mitra 2",
    type: "bank-sampah",
    logo: {
      src: "/images/mitra/bank-sampah-2.svg",
      alt: "Logo Bank Sampah Mitra 2",
      width: 320,
      height: 160,
    },
    isPlaceholder: true,
  },
  {
    id: "institusi-1",
    name: "Institusi Pendukung 1",
    type: "institusi",
    logo: {
      src: "/images/mitra/institusi-1.svg",
      alt: "Logo Institusi Pendukung 1",
      width: 320,
      height: 160,
    },
    isPlaceholder: true,
  },
  {
    id: "institusi-2",
    name: "Institusi Pendukung 2",
    type: "institusi",
    logo: {
      src: "/images/mitra/institusi-2.svg",
      alt: "Logo Institusi Pendukung 2",
      width: 320,
      height: 160,
    },
    isPlaceholder: true,
  },
];
