import type { Partner } from "./types";

/**
 * Mitra Morvo. Logo disimpan di public/images/mitra/.
 * Untuk menambah mitra: salin satu blok di bawah, ganti id, nama, type, logo
 * (src, alt, width, height sesuai ukuran asli gambar), dan url (opsional).
 * Grup tampilan diatur oleh `type`: "komunitas", "bank-sampah", atau "institusi".
 */
export const partners: Partner[] = [
  {
    id: "gekrafs-surabaya",
    name: "GEKRAFS Surabaya",
    type: "komunitas",
    logo: {
      src: "/images/mitra/gekrafs-surabaya.webp",
      alt: "Logo GEKRAFS (Gerakan Ekonomi Kreatif Nasional) Surabaya",
      width: 480,
      height: 586,
    },
    isPlaceholder: false,
  },
  {
    id: "urbandesign1618",
    name: "urbandesign1618",
    type: "komunitas",
    logo: {
      src: "/images/mitra/urbandesign1618.webp",
      alt: "Logo urbandesign1618",
      width: 569,
      height: 230,
    },
    isPlaceholder: false,
  },
  {
    id: "youthgeist-community-forum",
    name: "Youthgeist Community Forum",
    type: "komunitas",
    logo: {
      src: "/images/mitra/youthgeist-community-forum.webp",
      alt: "Logo Youthgeist Community Forum Surabaya Chapter",
      width: 480,
      height: 531,
    },
    isPlaceholder: false,
  },
  {
    id: "its",
    name: "Institut Teknologi Sepuluh Nopember",
    type: "institusi",
    logo: {
      src: "/images/mitra/its.webp",
      alt: "Logo Institut Teknologi Sepuluh Nopember (ITS)",
      width: 380,
      height: 380,
    },
    url: "https://www.its.ac.id/",
    isPlaceholder: false,
  },
];
