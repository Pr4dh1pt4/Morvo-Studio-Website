import type { Stat } from "./types";

/**
 * Angka dampak Morvo. Saat ini PERKIRAAN (isEstimate: true) untuk tahap
 * awal produksi. Ganti dengan data pencatatan asli, lalu ubah isEstimate
 * menjadi false supaya badge "Estimasi" hilang.
 *
 * Asumsi: 1 botol PET 600 ml ≈ 18 gram.
 * 1.200 botol × 18 g ≈ 21,6 kg.
 */
export const BOTTLE_WEIGHT_GRAMS = 18;

export const impactStats: Stat[] = [
  {
    id: "botol",
    value: 1200,
    suffix: "+",
    label: "botol PET terolah",
    note: "Botol dari mitra bank sampah yang sudah diolah menjadi filamen.",
    isEstimate: true,
  },
  {
    id: "plastik",
    value: 21.6,
    decimals: 1,
    suffix: " kg",
    label: "plastik terselamatkan dari TPA",
    note: `Dihitung dari jumlah botol × ±${BOTTLE_WEIGHT_GRAMS} g per botol 600 ml.`,
    isEstimate: true,
  },
  {
    id: "mitra",
    value: 2,
    label: "mitra bank sampah",
    note: "Bank sampah yang rutin memasok botol PET ke Morvo.",
    isEstimate: true,
  },
];

/** Angka yang ditampilkan mengambang di hero. */
export const heroStatId = "botol";
