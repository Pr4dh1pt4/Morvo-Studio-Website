/**
 * Pintu akses konten.
 *
 * Komponen dan halaman HANYA mengambil data lewat fungsi di file ini.
 * Saat konten dipindah ke database, ganti isi fungsi-fungsi ini dengan
 * query (fungsinya sudah async), dan komponen tidak perlu diubah.
 */
import { audienceSegments } from "./audience";
import { partners } from "./partners";
import { problemPoints } from "./problem";
import { processSteps } from "./process";
import { products } from "./products";
import { qrLetterSteps, qrLetters } from "./qr-letters";
import { site } from "./site";
import { heroStatId, impactStats } from "./stats";

export type * from "./types";

export function getSite() {
  return site;
}

export async function getProducts() {
  return [...products].sort((a, b) => a.order - b.order);
}

export async function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProblemPoints() {
  return problemPoints;
}

export async function getProcessSteps() {
  return processSteps;
}

export async function getImpactStats() {
  return impactStats;
}

export async function getHeroStat() {
  return impactStats.find((s) => s.id === heroStatId) ?? impactStats[0];
}

export async function getPartners() {
  return partners;
}

export async function getAudienceSegments() {
  return audienceSegments;
}

export async function getQrLetterSteps() {
  return qrLetterSteps;
}

export async function getQrLetterById(id: string) {
  return qrLetters.find((l) => l.id === id) ?? null;
}
