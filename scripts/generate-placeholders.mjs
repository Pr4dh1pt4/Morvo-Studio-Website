/**
 * Membuat gambar placeholder SVG di public/images/.
 * Jalankan: npm run placeholders
 *
 * Setiap placeholder diberi label "FOTO: ..." yang menjelaskan foto apa
 * yang perlu diambil. Saat foto asli tersedia, simpan dengan nama yang sama
 * (atau ganti `src` di src/content/*.ts) lalu hapus placeholder-nya.
 * File yang sudah ada TIDAK ditimpa kecuali memakai flag --force.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const force = process.argv.includes("--force");

const C = {
  forest: "#1F4D3A",
  leaf: "#5B8C5A",
  cream: "#F6F1E7",
  paper: "#FFFDF8",
  wood: "#8B5E3C",
  pet: "#A8D1DF",
  ink: "#1C2420",
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

/** Bungkus label menjadi beberapa baris pendek. */
function wrap(text, max) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max) {
      lines.push(line.trim());
      line = w;
    } else line += " " + w;
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

const layerLines = (id, color, opacity = 0.08) => `
  <pattern id="${id}" width="8" height="6" patternUnits="userSpaceOnUse">
    <rect width="8" height="1" fill="${color}" opacity="${opacity}"/>
  </pattern>`;

/** Bentuk sederhana sesuai isi foto, digambar dalam kotak 400×400 lalu diskalakan. */
const shapes = {
  plakat: `
    <rect x="70" y="300" width="260" height="56" rx="6" fill="${C.wood}"/>
    <g stroke="#6F4A2E" stroke-width="2" fill="none" opacity=".5">
      <path d="M80 318c60-6 120 6 180 0s50-4 60 0"/><path d="M80 336c50 5 110-7 170-1s60 5 70 1"/>
    </g>
    <path d="M120 300V96c0-14 10-24 24-24h112c14 0 24 10 24 24v204z" fill="${C.forest}"/>
    <g stroke="${C.cream}" stroke-width="1.2" opacity=".18">${Array.from({ length: 34 }, (_, i) => `<path d="M120 ${100 + i * 6}h160"/>`).join("")}</g>
    <circle cx="200" cy="150" r="30" fill="none" stroke="${C.pet}" stroke-width="5"/>
    <rect x="150" y="210" width="100" height="8" rx="4" fill="${C.cream}" opacity=".8"/>
    <rect x="165" y="230" width="70" height="6" rx="3" fill="${C.cream}" opacity=".5"/>`,
  keychain: `
    <circle cx="200" cy="92" r="34" fill="none" stroke="#9AA6A0" stroke-width="7"/>
    <rect x="186" y="118" width="28" height="30" rx="8" fill="${C.leaf}"/>
    <rect x="110" y="140" width="180" height="200" rx="36" fill="${C.pet}"/>
    <g stroke="${C.forest}" stroke-width="1.2" opacity=".15">${Array.from({ length: 32 }, (_, i) => `<path d="M112 ${146 + i * 6}h176"/>`).join("")}</g>
    <circle cx="200" cy="176" r="12" fill="${C.cream}"/>
    <rect x="140" y="236" width="120" height="16" rx="8" fill="${C.forest}" opacity=".85"/>
    <rect x="160" y="264" width="80" height="10" rx="5" fill="${C.forest}" opacity=".5"/>`,
  merch: `
    <circle cx="140" cy="250" r="88" fill="${C.wood}"/>
    <circle cx="140" cy="250" r="62" fill="${C.pet}"/>
    <circle cx="140" cy="250" r="62" fill="none" stroke="${C.forest}" stroke-width="1" opacity=".2" stroke-dasharray="2 4"/>
    <rect x="236" y="80" width="56" height="210" rx="8" fill="${C.forest}" transform="rotate(8 264 185)"/>
    <path d="M300 340l40-120h24l-30 120z" fill="${C.leaf}"/>`,
  texture: `
    <rect x="0" y="0" width="400" height="400" fill="${C.forest}"/>
    <g stroke="${C.cream}" stroke-width="2.4" opacity=".22">${Array.from({ length: 50 }, (_, i) => `<path d="M0 ${4 + i * 8}c100 ${i % 2 ? 1 : -1} 300 ${i % 2 ? -1 : 1} 400 0"/>`).join("")}</g>`,
  qr: `
    <rect x="80" y="80" width="240" height="240" rx="16" fill="${C.paper}" stroke="${C.forest}" stroke-width="3"/>
    <g fill="${C.forest}">
      <rect x="104" y="104" width="56" height="56" rx="4"/><rect x="240" y="104" width="56" height="56" rx="4"/><rect x="104" y="240" width="56" height="56" rx="4"/>
      ${[[180, 110], [200, 140], [180, 180], [220, 200], [250, 180], [270, 220], [190, 230], [240, 250], [200, 270], [260, 280], [280, 260], [120, 190], [150, 210]].map(([x, y]) => `<rect x="${x}" y="${y}" width="16" height="16"/>`).join("")}
    </g>
    <g fill="${C.paper}"><rect x="116" y="116" width="32" height="32"/><rect x="252" y="116" width="32" height="32"/><rect x="116" y="252" width="32" height="32"/></g>
    <g fill="${C.forest}"><rect x="124" y="124" width="16" height="16"/><rect x="260" y="124" width="16" height="16"/><rect x="124" y="260" width="16" height="16"/></g>`,
  colors: `
    ${[C.forest, C.pet, C.leaf, C.wood].map((c, i) => `<rect x="${50 + i * 80}" y="${130 + (i % 2) * 30}" width="64" height="120" rx="18" fill="${c}"/><circle cx="${82 + i * 80}" cy="${152 + (i % 2) * 30}" r="7" fill="${C.cream}"/>`).join("")}`,
  package: `
    <path d="M90 170l110-50 110 50v140l-110 50-110-50z" fill="${C.wood}" opacity=".85"/>
    <path d="M90 170l110 50 110-50M200 220v140" stroke="${C.cream}" stroke-width="3" fill="none" opacity=".6"/>
    <rect x="236" y="250" width="54" height="34" rx="4" fill="${C.paper}" transform="rotate(-22 263 267)"/>`,
  hero: `
    <path d="M300 40h28v18c0 6 4 10 9 14 12 9 18 20 18 34v170c0 10-8 18-18 18h-48c-10 0-18-8-18-18V106c0-14 6-25 18-34 5-4 9-8 9-14z" fill="${C.pet}" opacity=".55"/>
    <g transform="translate(-30 20)">
      <rect x="70" y="300" width="260" height="56" rx="6" fill="${C.wood}"/>
      <path d="M120 300V96c0-14 10-24 24-24h112c14 0 24 10 24 24v204z" fill="${C.forest}"/>
      <g stroke="${C.cream}" stroke-width="1.2" opacity=".18">${Array.from({ length: 34 }, (_, i) => `<path d="M120 ${100 + i * 6}h160"/>`).join("")}</g>
      <circle cx="200" cy="150" r="30" fill="none" stroke="${C.pet}" stroke-width="5"/>
      <rect x="150" y="210" width="100" height="8" rx="4" fill="${C.cream}" opacity=".8"/>
    </g>`,
  logo: `
    <rect x="40" y="110" width="320" height="180" rx="20" fill="none" stroke="${C.forest}" stroke-width="4" stroke-dasharray="10 8" opacity=".5"/>`,
};

function placeholder({ width, height, label, shape, bg = C.cream, prefix = "FOTO", labelPos = "bottom", fontSize: fixedFont }) {
  const scale = Math.min(width, height) / 400 * 0.78;
  const sx = (width - 400 * scale) / 2;
  const sy = (height - 400 * scale) / 2 + (labelPos === "top" ? height * 0.06 : -height * 0.06);
  const fontSize = fixedFont ?? Math.max(14, Math.round(Math.min(width, height) / 26));
  const lines = wrap(`${prefix}: ${label}`, Math.round(width / (fontSize * 0.62)));
  const boxH = lines.length * fontSize * 1.35 + fontSize * 1.2;
  const boxY = labelPos === "top" ? height * 0.05 : height - boxH - height * 0.05;
  const textBlock = lines
    .map(
      (l, i) =>
        `<text x="${width / 2}" y="${boxY + fontSize * 1.4 + i * fontSize * 1.35}" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="${fontSize}" font-weight="600" fill="${C.ink}">${esc(l)}</text>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(label)}">
  <defs>${layerLines("ll", C.forest)}</defs>
  <rect width="${width}" height="${height}" fill="${bg}"/>
  <rect width="${width}" height="${height}" fill="url(#ll)"/>
  <g transform="translate(${sx} ${sy}) scale(${scale})">${shapes[shape]}</g>
  <rect x="${width * 0.06}" y="${boxY}" width="${width * 0.88}" height="${boxH}" rx="${fontSize * 0.6}" fill="${C.paper}" fill-opacity=".92" stroke="${C.ink}" stroke-opacity=".25" stroke-dasharray="6 5"/>
  ${textBlock}
</svg>
`;
}

const items = [
  { file: "produk-plakat.svg", width: 800, height: 1000, shape: "plakat", label: "Plakat rPET dengan alas kayu limbah, tampak depan" },
  { file: "produk-plakat-detail-tekstur.svg", width: 800, height: 800, shape: "texture", label: "Close-up tekstur lapisan cetak 3D pada plakat" },
  { file: "produk-plakat-detail-qr.svg", width: 800, height: 800, shape: "qr", label: "QR Letter tercetak di sisi belakang plakat" },
  { file: "produk-gantungan-kunci.svg", width: 800, height: 1000, shape: "keychain", label: "Gantungan kunci rPET dengan nama timbul" },
  { file: "produk-gantungan-kunci-detail-warna.svg", width: 800, height: 800, shape: "colors", label: "Beberapa gantungan kunci dalam pilihan warna rPET" },
  { file: "produk-gantungan-kunci-detail-qr.svg", width: 800, height: 800, shape: "qr", label: "QR Letter kecil di belakang gantungan kunci" },
  { file: "produk-merch.svg", width: 800, height: 1000, shape: "merch", label: "Kumpulan merch rPET: tatakan gelas, pembatas buku, penyangga ponsel" },
  { file: "produk-merch-detail-tatakan.svg", width: 800, height: 800, shape: "merch", label: "Tatakan gelas rPET dengan kombinasi kayu limbah" },
  { file: "produk-merch-detail-kemasan.svg", width: 800, height: 800, shape: "package", label: "Merch dalam kemasan siap bagi untuk peserta acara" },
  { file: "qr-letter-plakat.svg", width: 1200, height: 800, shape: "plakat", label: "Plakat di tangan penerima, QR Letter terlihat di belakang" },
  ...[1, 2].map((n) => ({ file: `mitra/bank-sampah-${n}.svg`, width: 320, height: 160, shape: "logo", label: `Logo Bank Sampah Mitra ${n}`, prefix: "LOGO", fontSize: 24, labelPos: "top", bg: C.paper })),
  ...[1, 2].map((n) => ({ file: `mitra/institusi-${n}.svg`, width: 320, height: 160, shape: "logo", label: `Logo Institusi Pendukung ${n}`, prefix: "LOGO", fontSize: 24, labelPos: "top", bg: C.paper })),
];

let written = 0;
for (const item of items) {
  const out = join(root, item.file);
  if (existsSync(out) && !force) continue;
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, placeholder(item));
  written++;
}
console.log(`Placeholder dibuat: ${written} file (lewati ${items.length - written} yang sudah ada).`);
