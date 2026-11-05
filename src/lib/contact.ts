import type { ContactInfo } from "@/content/types";

/** Membuat tautan wa.me dengan pesan yang sudah terisi. */
export function whatsappLink(contact: ContactInfo, message?: string): string {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function emailLink(contact: ContactInfo, subject?: string): string {
  const base = `mailto:${contact.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

/** Pesan WhatsApp default untuk pemesanan satu produk. */
export function productOrderMessage(productName: string): string {
  return `Halo Morvo, saya tertarik memesan ${productName}. Boleh minta info opsi personalisasi, harga, dan estimasi waktu pengerjaannya?`;
}
