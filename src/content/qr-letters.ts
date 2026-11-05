import type { QrLetter, QrLetterStep } from "./types";

export const qrLetterSteps: QrLetterStep[] = [
  {
    step: 1,
    title: "Pemberi menulis pesan",
    description:
      "Saat memesan, kamu menulis pesan atau cerita untuk penerima. Bisa ucapan, kenangan, atau alasan ia layak dihargai.",
  },
  {
    step: 2,
    title: "Morvo mencetak QR di produk",
    description:
      "Kode QR unik dicetak langsung di badan produk, menyatu dengan lapisan rPET-nya.",
  },
  {
    step: 3,
    title: "Penerima memindai",
    description:
      "Penerima memindai QR dengan kamera ponsel dan membaca pesanmu, kapan saja, bertahun-tahun kemudian.",
  },
];

/**
 * Surat contoh untuk halaman /qr-letter/contoh.
 * Nama dan isi surat fiktif.
 */
export const qrLetters: QrLetter[] = [
  {
    id: "contoh",
    occasion: "Penghargaan Asisten Laboratorium Terbaik",
    recipientName: "Nadia",
    senderName: "Bu Ratna",
    senderRole: "Kepala Laboratorium",
    date: "2026-06-14",
    greeting: "Untuk Nadia,",
    body: [
      "Dua tahun lalu kamu datang ke lab dengan satu pertanyaan yang belum bisa dijawab siapa pun di ruangan itu. Sejak saat itu, kamu tidak berhenti bertanya, dan adik-adik tingkatmu ikut belajar bertanya.",
      "Plakat ini dicetak dari botol-botol plastik yang dulu dianggap sampah. Seperti kamu yang selalu melihat nilai di hal-hal kecil, kami harap benda ini mengingatkanmu bahwa sesuatu bisa diberi arti baru.",
      "Terima kasih untuk malam-malam panjang, catatan yang rapi, dan kesabaranmu mengajari orang lain. Lab ini lebih baik karena kamu pernah di sini.",
    ],
    closing: "Dengan bangga,",
    product: {
      name: "Plakat",
      slug: "plakat",
      image: {
        src: "/images/qr-letter-plakat.svg",
        alt: "Plakat penghargaan dengan QR Letter di sisi belakang",
        width: 1200,
        height: 800,
      },
      bottlesUsed: 12,
    },
    isSample: true,
  },
];
