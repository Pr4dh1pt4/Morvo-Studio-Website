import type { SiteConfig } from "./types";

/**
 * Konfigurasi utama situs. Kontak cukup diubah di sini:
 * semua tombol WhatsApp, email, dan Instagram membaca dari objek ini.
 */
export const site: SiteConfig = {
  name: "Morvo",
  tagline: "Mengubah Botol Plastik Bekas Menjadi Barang yang Bernilai",
  description:
    "Morvo mengolah botol PET bekas dari mitra bank sampah menjadi filamen 3D printing, lalu mencetaknya menjadi plakat, gantungan kunci, dan merch personalisasi, lengkap dengan QR Letter berisi pesan dari pemberinya.",
  // URL situs. Saat ini untuk lokal. Setelah domain siap, isi variabel
  // NEXT_PUBLIC_SITE_URL di file .env.local atau di pengaturan Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "id_ID",
  program: "ITS Youth Technopreneur 2026",
  contact: {
    // ISI DI SINI: nomor WhatsApp format 62xxxxxxxxxx (tanpa +, spasi, atau 0 di depan)
    whatsappNumber: "62XXXXXXXXXX",
    // ISI DI SINI: alamat email
    email: "studio.morvo@gmail.com",
    instagram: {
      handle: "@studio.morvo",
      // ISI DI SINI: link profil Instagram
      url: "https://www.instagram.com/studio.morvo/",
    },
  },
};
