/**
 * Membuat favicon dan ikon aplikasi dari emblem logo.
 * Jalankan: npm run icons
 *
 * Sumber : public/images/brand/morvo-mark.png (PNG transparan, idealnya ≥ 512 px)
 * Hasil  : src/app/favicon.ico   16, 32, 48 px  (ikon tab browser)
 *          src/app/icon.png      512 px         (ikon modern, transparan)
 *          src/app/apple-icon.png 180 px        (layar utama iPhone, latar cream)
 *
 * Next.js otomatis memasang tag <link rel="icon"> untuk file-file di atas.
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "public/images/brand/morvo-mark.png");
const appDir = join(root, "src/app");
const CREAM = { r: 246, g: 241, b: 231, alpha: 1 };
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };

/** Emblem di tengah kanvas persegi dengan jarak tepi `padding` (0–0.5). */
async function square(size, { padding = 0.06, background = CLEAR } = {}) {
  const inner = Math.round(size * (1 - padding * 2));
  const mark = await sharp(source)
    .trim()
    .resize(inner, inner, { fit: "contain", background: CLEAR })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
}

/** Menggabungkan beberapa PNG menjadi satu file .ico (format PNG-in-ICO). */
function toIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // tipe: ikon
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + 16 * images.length;
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // jumlah warna palet
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bit per piksel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const icoSizes = [16, 32, 48];
// Di ukuran sangat kecil, jarak tepi dikurangi supaya emblem tampil sebesar mungkin.
const icoImages = await Promise.all(
  icoSizes.map(async (size) => ({ size, data: await square(size, { padding: 0.02 }) })),
);
writeFileSync(join(appDir, "favicon.ico"), toIco(icoImages));
writeFileSync(join(appDir, "icon.png"), await square(512));
writeFileSync(
  join(appDir, "apple-icon.png"),
  await square(180, { padding: 0.14, background: CREAM }),
);

console.log("Ikon dibuat: src/app/favicon.ico, src/app/icon.png, src/app/apple-icon.png");
