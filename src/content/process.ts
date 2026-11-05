import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Botol dikumpulkan",
    description:
      "Botol PET bekas kami terima dari mitra bank sampah. Warga mendapat nilai tabungan, botol tidak berakhir di TPA.",
    icon: "bottle",
    tag: "Kemitraan bank sampah",
  },
  {
    step: 2,
    title: "Dipilah, dicuci, dicacah",
    description:
      "Label dan tutup dilepas, botol dicuci bersih, lalu dicacah menjadi serpihan kecil yang seragam.",
    icon: "shred",
  },
  {
    step: 3,
    title: "Dilelehkan jadi filamen",
    description:
      "Serpihan PET dilelehkan dan ditarik menjadi filamen rPET, bahan baku untuk printer 3D.",
    icon: "spool",
  },
  {
    step: 4,
    title: "Dicetak jadi produk",
    description:
      "Filamen dicetak lapis demi lapis menjadi plakat, gantungan kunci, atau merch, dipadukan dengan kayu limbah, lalu diberi QR Letter.",
    icon: "printer",
  },
];
