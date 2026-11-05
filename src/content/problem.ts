import type { ProblemPoint } from "./types";

/**
 * Data masalah. Angka botol PET dan sampah plastik berasal dari sumber
 * yang dikutip. Periksa ulang sumber sebelum presentasi, karena data
 * pemerintah bisa diperbarui.
 */
export const problemPoints: ProblemPoint[] = [
  {
    id: "botol",
    eyebrow: "Masalah 1",
    title: "Botol PET menumpuk lebih cepat dari yang bisa diolah",
    body: "Botol minuman sekali pakai adalah salah satu sampah plastik paling umum. Sebagian sudah didaur ulang, tetapi masih ada ratusan ribu ton yang belum terkumpul setiap tahun.",
    facts: [
      {
        value: "12,87 juta ton",
        label: "sampah plastik tercatat di Indonesia",
        source: {
          label: "KLHK, data SIPSN (via Investortrust)",
          url: "https://investortrust.id/esg/23161/sampah-plastik-di-indonesia-hampir-13-juta-ton-klhk-ini-permasalahan-serius",
          date: "4 Maret 2024",
        },
      },
      {
        value: "435.000 ton",
        label: "sampah botol PET per tahun",
        source: {
          label: "Kementerian Perindustrian (via Antara)",
          url: "https://en.antaranews.com/news/426009/homepage-v2.html",
          date: "7 Agustus 2026",
        },
      },
      {
        value: "± 128.000 ton",
        label: "botol PET per tahun yang belum terkumpul untuk didaur ulang",
        note: "Dihitung dari data Kemenperin: 435.000 ton timbulan dikurangi 307.000 ton yang terkumpul.",
        source: {
          label: "Kementerian Perindustrian (via Antara)",
          url: "https://en.antaranews.com/news/426009/homepage-v2.html",
          date: "7 Agustus 2026",
        },
      },
    ],
  },
  {
    id: "penghargaan",
    eyebrow: "Masalah 2",
    title: "Penghargaan yang seragam, tanpa cerita",
    body: "Plakat akrilik dan trofi logam sering dipesan dari katalog yang sama, berakhir di lemari, lalu terlupakan. Penerima jarang tahu kenapa ia dipilih, dan bahannya menambah sampah baru.",
    facts: [],
  },
];
