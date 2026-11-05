import type { AudienceSegment } from "./types";

export const audienceSegments: AudienceSegment[] = [
  {
    id: "individu",
    title: "Untuk individu",
    lead: "Hadiah yang terasa personal, dengan cerita yang bisa dibagikan.",
    who: ["Mahasiswa", "Fresh graduate", "Young professional"],
    useCases: [
      "Kado wisuda dan sidang",
      "Ucapan terima kasih untuk dosen atau mentor",
      "Hadiah perpisahan rekan kerja",
    ],
    cta: {
      label: "Pesan hadiah",
      whatsappMessage:
        "Halo Morvo, saya ingin memesan hadiah personalisasi. Boleh dibantu pilihan produk dan QR Letter-nya?",
    },
  },
  {
    id: "institusi",
    title: "Untuk institusi",
    lead: "Penghargaan dan merchandise acara yang sejalan dengan komitmen keberlanjutan.",
    who: ["Kampus", "Perusahaan", "Event organizer"],
    useCases: [
      "Plakat penghargaan dan apresiasi pembicara",
      "Seminar kit dan merchandise acara",
      "Pesanan jumlah besar dengan laporan botol terolah",
    ],
    cta: {
      label: "Minta penawaran B2B",
      whatsappMessage:
        "Halo Morvo, saya dari [nama institusi]. Kami ingin meminta penawaran untuk [plakat/merch/gantungan kunci] sebanyak [jumlah] pcs untuk acara [nama acara].",
    },
  },
];
