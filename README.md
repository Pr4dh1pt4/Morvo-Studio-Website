# Morvo — company profile

Situs company profile Morvo, peserta ITS Youth Technopreneur 2026. Morvo mengolah botol PET bekas
dari mitra bank sampah menjadi filamen 3D printing, lalu mencetaknya menjadi plakat, gantungan kunci,
dan merch personalisasi yang bisa membawa QR Letter.

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- Situs statis (`output: "export"`): tanpa backend, tanpa database
- Mode terang/gelap dengan tombol toggle (pilihan disimpan di browser)

---

## 1. Menjalankan di lokal

Butuh Node.js 20.9 atau lebih baru.

```bash
npm install
npm run dev        # http://localhost:3000, otomatis reload saat file diubah
```

Perintah lain:

| Perintah | Fungsi |
| --- | --- |
| `npm run build` | Build statis ke folder `out/`. Butuh internet (font Google diunduh saat build). |
| `npm run preview` | Menyajikan folder `out/` di http://localhost:3000 untuk mengecek hasil build. |
| `npm run lint` | Cek kode dengan ESLint. |
| `npm run placeholders` | Membuat ulang gambar placeholder yang hilang di `public/images/`. |

---

## 2. Struktur folder

```
src/
├─ app/
│  ├─ layout.tsx              root: font, tema, metadata dasar
│  ├─ globals.css             warna (CSS variables + token Tailwind), motif, animasi
│  ├─ icon.svg                favicon
│  ├─ og.png/route.tsx        gambar Open Graph, dibuat saat build → /og.png
│  ├─ sitemap.ts · robots.ts · not-found.tsx
│  ├─ (marketing)/            halaman publik (Navbar + Footer)
│  │  ├─ page.tsx             landing page
│  │  ├─ produk/[slug]/       detail produk, dibuat statis per produk
│  │  └─ qr-letter/contoh/    contoh tampilan penerima QR Letter
│  └─ (app)/                  kosong, disiapkan untuk dashboard
├─ components/
│  ├─ ui/                     Button, Card, SectionHeading, Container, Badge, Icon, Reveal, CountUp
│  ├─ sections/               Hero, Problem, Process, Products, QrLetter, Audience, Impact, Partners, Contact
│  ├─ layout/                 Navbar, Footer, Logo, ThemeToggle, ThemeScript
│  ├─ product/                ProductCard, ProductDetail
│  └─ qr-letter/              LetterView, PhoneMockup
├─ content/                   SEMUA konten situs (lihat bagian 3)
├─ lib/                       helper: link WhatsApp, metadata SEO, hooks
└─ assets/fonts/              font TTF untuk gambar Open Graph
public/images/                gambar (sekarang placeholder SVG)
scripts/                      generator placeholder
```

Nama folder dalam kurung, seperti `(marketing)`, tidak muncul di URL.

---

## 3. Mengganti konten

Semua teks dan data ada di `src/content/`. Komponen tidak perlu disentuh.

| File | Isi |
| --- | --- |
| `site.ts` | Nama, tagline, deskripsi, **nomor WhatsApp, email, Instagram** |
| `products.ts` | Katalog produk: nama, deskripsi, material, opsi personalisasi, spesifikasi, gambar |
| `problem.ts` | Data sampah PET beserta sumbernya |
| `process.ts` | 4 langkah proses |
| `qr-letters.ts` | 3 langkah QR Letter dan isi surat contoh |
| `audience.ts` | Blok "Untuk individu" dan "Untuk institusi", termasuk pesan WhatsApp otomatisnya |
| `stats.ts` | Angka dampak |
| `partners.ts` | Mitra bank sampah dan institusi pendukung |
| `navigation.ts` | Menu navbar |
| `types.ts` | Tipe data semua konten di atas |

### Kontak (wajib diisi)

Buka `src/content/site.ts` dan cari komentar `ISI DI SINI`:

```ts
contact: {
  whatsappNumber: "62XXXXXXXXXX",   // format 62..., tanpa +, spasi, atau 0 di depan
  email: "studio.morvo@gmail.com",
  instagram: {
    handle: "@studio.morvo",
    url: "https://www.instagram.com/studio.morvo/",
  },
},
```

Setelah nomor WhatsApp diisi, semua tombol WhatsApp di situs ikut terisi, termasuk pesan otomatis
per produk.

### Data yang masih perkiraan atau contoh

- **Angka dampak** (`stats.ts`): masih perkiraan (`isEstimate: true`) dan tampil dengan badge
  "Estimasi". Ganti dengan data asli, lalu ubah menjadi `isEstimate: false`.
- **Mitra** (`partners.ts`): masih placeholder (`isPlaceholder: true`) dengan badge "Data contoh".
  Isi nama, logo, dan URL asli, lalu ubah menjadi `false`.
- **Spesifikasi produk** (`products.ts`): ukuran, minimal pesanan, dan waktu produksi masih
  perkiraan. Sesuaikan dengan kapasitas produksi.
- **Data masalah** (`problem.ts`): sudah memakai sumber asli (KLHK/SIPSN 2024 dan Kemenperin 2026).
  Cek ulang sebelum presentasi karena data pemerintah bisa diperbarui.

### Menambah produk

Tambahkan objek baru ke array di `products.ts` dengan `slug` unik. Halaman `/produk/<slug>/`,
kartu katalog, link footer, dan sitemap akan dibuat otomatis saat build.

---

## 4. Mengganti gambar

Semua gambar ada di `public/images/` dan saat ini berupa placeholder SVG. Setiap placeholder punya
label `FOTO: ...` yang menjelaskan foto apa yang perlu diambil.

Cara mengganti:

1. Ambil foto sesuai label. Pakai rasio yang sama supaya layout tidak bergeser:

   | Gambar | Rasio | Ukuran disarankan |
   | --- | --- | --- |
   | `hero-botol-pet` (ilustrasi, boleh diganti foto) | 4:5 | 1200 × 1500 |
   | `produk-*.svg` (foto utama) | 4:5 | 800 × 1000 |
   | `produk-*-detail-*.svg` | 1:1 | 800 × 800 |
   | `qr-letter-plakat` | 3:2 | 1200 × 800 |
   | `mitra/*.svg` (logo) | 2:1 | 320 × 160 |

2. Simpan sebagai `.jpg` atau `.webp` (kompres dulu, idealnya di bawah 300 KB) di `public/images/`.
3. Ganti `src` di file konten terkait, misalnya `"/images/produk-plakat.svg"` menjadi
   `"/images/produk-plakat.jpg"`. Gambar hero ada di `src/components/sections/Hero.tsx`.
4. Perbarui `alt` supaya menggambarkan isi foto yang sebenarnya.
5. Hapus file placeholder `.svg` yang sudah tidak dipakai.

Karena situs statis, gambar tidak dioptimasi otomatis (`images.unoptimized: true`), jadi kompres
foto sebelum dipakai.

### Logo

Logo ada di `public/images/brand/` dan dipakai lewat komponen `src/components/layout/Logo.tsx`:

| File | Isi | Dipakai di |
| --- | --- | --- |
| `morvo-logo.png` | Emblem + "ORVO", tanpa tagline | Navbar, footer |
| `morvo-logo-tagline.png` | Versi lengkap dengan "Where Waste Morphs Into Value" | Belum dipakai, disiapkan |
| `morvo-mark.png` | Emblem saja (≥ 512 px) | Halaman 404, sumber favicon |

Cara mengganti logo di seluruh situs:

1. Siapkan PNG berlatar transparan, lalu timpa file di `public/images/brand/` dengan nama yang sama.
   Jika rasio logo berubah, sesuaikan `width`/`height` di `src/components/layout/Logo.tsx`.
2. Buat ulang favicon (ikon di tab browser) dari `morvo-mark.png`:
   ```bash
   npm run icons
   ```
   Perintah ini menghasilkan `src/app/favicon.ico`, `src/app/icon.png`, dan `src/app/apple-icon.png`.
3. Jalankan `npm run build`. Gambar pratinjau link (`/og.png`) otomatis memakai `morvo-logo.png` yang baru.
4. Browser sering menyimpan favicon lama di cache. Jika ikon di tab belum berubah, tekan
   **Ctrl + F5** atau buka situs di jendela penyamaran.

---

## 5. Warna dan tema

Palet didefinisikan sekali di `src/app/globals.css`:

- `:root`: mode terang (`forest`, `leaf`, `cream`, `paper`, `wood`, `pet`, `ink`)
- `.dark`: mode gelap (latar `#121A16`, teks `#EDE8DD`)
- `@theme inline`: menghubungkan variabel ke kelas Tailwind (`bg-forest`, `text-heading`, `border-line`, dst.)

Komponen memakai token semantik (`bg`, `surface`, `fg`, `muted`, `heading`, `primary`, `deep`)
supaya otomatis menyesuaikan mode gelap. Semua pasangan teks dan latar sudah diuji dengan axe-core
dan memenuhi WCAG AA di kedua mode.

---

## 6. Deploy ke Vercel

1. Push project ke repository GitHub.
2. Di [vercel.com](https://vercel.com), pilih **Add New → Project**, lalu import repository-nya.
   Vercel otomatis mengenali Next.js, jadi pengaturan build tidak perlu diubah.
3. Di **Settings → Environment Variables**, tambahkan:
   ```
   NEXT_PUBLIC_SITE_URL = https://domain-kamu.id
   ```
   Variabel ini dipakai sitemap, robots.txt, canonical URL, dan Open Graph. Tanpa variabel ini,
   semua URL akan menunjuk ke `http://localhost:3000`.
4. Klik **Deploy**.
5. Untuk domain sendiri: **Settings → Domains → Add**, masukkan domain, lalu ikuti instruksi DNS
   dari Vercel (record `A` atau `CNAME`) di panel penyedia domain.
6. Setelah domain aktif, jalankan **Redeploy** supaya sitemap memakai domain baru.

Contoh isi variabel ada di `.env.example`. Untuk lokal, variabel ini tidak perlu diisi.

Karena hasil build berupa file statis di `out/`, situs juga bisa di-host di Netlify, Cloudflare
Pages, GitHub Pages, atau hosting biasa.

---

## 7. Catatan teknis

- **Trailing slash.** `trailingSlash: true` membuat setiap halaman menjadi `folder/index.html`,
  misalnya `/produk/plakat/`. Ini menghindari bentrok file dan folder di hosting statis.
- **Error 404 prefetch saat build di Windows.** Next.js 16.4 menyimpan file prefetch segmen
  (`__next.*.txt`) dengan nama yang salah jika build dijalankan di Windows. Akibatnya browser
  menampilkan beberapa 404 untuk file `__next...__PAGE__.txt`. Navigasi tetap normal, dan build
  di Vercel (Linux) menghasilkan nama yang benar.
- **Animasi.** Reveal, hitung angka, dan benang filamen di section Proses otomatis nonaktif jika
  pengguna mengaktifkan `prefers-reduced-motion`, dan konten tetap tampil walau JavaScript mati.
- **Gambar Open Graph** dibuat oleh `src/app/og.png/route.tsx` saat build, memakai tagline dari
  `site.ts`. Font-nya ada di `src/assets/fonts/` (lisensi SIL OFL).

---

## 8. Menambah login dan dashboard

Struktur sudah disiapkan supaya penambahan ini tidak butuh refactor besar.

1. **Matikan static export.** Hapus `output: "export"` (dan boleh juga `images.unoptimized`) di
   `next.config.ts`. Login butuh server, dan Vercel menjalankannya otomatis.
2. **Pilih database dan auth**, misalnya Postgres (Vercel Postgres, Supabase, atau Neon) dengan
   Auth.js atau Supabase Auth. Buat tabel mengikuti tipe di `src/content/types.ts` (`Product`,
   `Stat`, `Partner`, `QrLetter`, dan seterusnya).
3. **Ganti sumber data** di `src/content/index.ts`. Semua fungsi di sana sudah `async`, jadi cukup
   ubah isinya menjadi query database:
   ```ts
   export async function getProducts() {
     return db.product.findMany({ orderBy: { order: "asc" } });
   }
   ```
   Komponen dan halaman tidak perlu diubah.
4. **Buat halaman dashboard** di `src/app/(app)/`, misalnya `(app)/dashboard/page.tsx` → `/dashboard`.
   Beri layout sendiri `(app)/layout.tsx` (sidebar, tanpa Navbar/Footer marketing). Lindungi route
   dengan pengecekan sesi di layout tersebut atau lewat `src/proxy.ts`.
5. **QR Letter asli.** Ubah `qr-letter/contoh` menjadi route dinamis `qr-letter/[id]/page.tsx` yang
   memanggil `getQrLetterById(id)`. Komponen `LetterView` sudah menerima data lewat props, jadi
   tinggal dipakai. Tambahkan `robots: { index: false }` supaya surat pribadi tidak terindeks.
6. **Form kontak** (opsional) bisa ditambahkan dengan Server Action setelah ada server.
7. **Revalidasi.** Jika halaman publik masih ingin statis/cepat, pakai `revalidatePath()` dari
   dashboard setiap kali konten diubah.

Lihat juga `src/app/(app)/README.md`.
