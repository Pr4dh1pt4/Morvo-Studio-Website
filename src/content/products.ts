import type { Product } from "./types";

/**
 * Katalog produk. Tambah produk baru dengan menambah objek ke array ini;
 * halaman /produk/[slug] akan dibuat otomatis saat build.
 *
 * Catatan: ukuran, minimal pesanan, dan waktu produksi masih perkiraan.
 * Sesuaikan dengan kapasitas produksi Morvo yang sebenarnya.
 */
export const products: Product[] = [
  {
    slug: "plakat",
    name: "Plakat",
    summary: "Plakat penghargaan berbadan rPET dengan alas kayu limbah.",
    description: [
      "Plakat Morvo dicetak dari filamen rPET hasil olahan botol bekas, lalu dipasang di atas alas kayu limbah yang diamplas dan diminyaki. Garis-garis lapisan cetak sengaja dibiarkan terlihat sebagai jejak bahan asalnya.",
      "Cocok untuk penghargaan karyawan, juara lomba, apresiasi pembicara, atau kenang-kenangan kepengurusan. Setiap plakat bisa membawa QR Letter berisi pesan pribadi dari pemberi penghargaan.",
    ],
    image: {
      src: "/images/Produk/plakat.webp",
      alt: "Plakat Morvo dari filamen rPET bening berbentuk roda gigi dan daun, berdiri di alas kayu limbah dengan pelat nama",
      width: 1200,
      height: 1200,
    },
    gallery: [
      {
        src: "/images/produk-plakat-detail-tekstur.svg",
        alt: "Detail tekstur lapisan cetak 3D pada permukaan plakat",
        width: 800,
        height: 800,
      },
      {
        src: "/images/produk-plakat-detail-qr.svg",
        alt: "QR Letter tercetak di sisi belakang plakat",
        width: 800,
        height: 800,
      },
    ],
    materials: [
      {
        kind: "pet",
        name: "Filamen rPET",
        detail: "Badan plakat dan teks timbul, dari botol PET bekas mitra bank sampah.",
      },
      {
        kind: "kayu",
        name: "Kayu limbah",
        detail: "Alas plakat dari sisa potongan kayu, diamplas dan diberi lapisan minyak.",
      },
    ],
    personalization: [
      { name: "Teks penghargaan", detail: "Judul, nama penerima, dan tanggal acara." },
      { name: "Logo", detail: "Logo institusi, komunitas, atau acara (file vektor lebih baik)." },
      { name: "Warna filamen", detail: "Pilihan warna rPET mengikuti stok botol yang terkumpul." },
      { name: "QR Letter", detail: "Pesan digital dari pemberi, dibuka penerima lewat pindai QR." },
    ],
    specs: [
      { label: "Ukuran", value: "± 15 × 20 cm (bisa disesuaikan)" },
      { label: "Minimal pesanan", value: "1 pcs" },
      { label: "Waktu produksi", value: "± 5–7 hari kerja" },
    ],
    idealFor: ["Penghargaan karyawan", "Juara lomba", "Apresiasi pembicara", "Purna tugas"],
    qrLetter: true,
    order: 1,
  },
  {
    slug: "gantungan-kunci",
    name: "Gantungan Kunci",
    summary: "Gantungan kunci personalisasi, ringan dan tahan dipakai harian.",
    description: [
      "Gantungan kunci Morvo dicetak utuh dari filamen rPET. Bentuk, nama, atau inisial bisa disesuaikan, jadi cocok sebagai suvenir acara, hadiah wisuda, atau merchandise komunitas.",
      "Untuk pesanan dalam jumlah banyak, setiap gantungan bisa membawa QR Letter yang sama (pesan untuk semua peserta) atau berbeda per penerima.",
    ],
    image: {
      src: "/images/Produk/gantungan-kunci.webp",
      alt: "Gantungan kunci Morvo dari filamen rPET: label bertuliskan MORVO, bintang, spiral hijau, dan mahkota pada cincin kawat",
      width: 429,
      height: 459,
    },
    gallery: [
      {
        src: "/images/produk-gantungan-kunci-detail-warna.svg",
        alt: "Beberapa gantungan kunci rPET dalam pilihan warna berbeda",
        width: 800,
        height: 800,
      },
      {
        src: "/images/produk-gantungan-kunci-detail-qr.svg",
        alt: "Gantungan kunci dengan QR Letter kecil di sisi belakang",
        width: 800,
        height: 800,
      },
    ],
    materials: [
      {
        kind: "pet",
        name: "Filamen rPET",
        detail: "Seluruh badan gantungan dari botol PET bekas.",
      },
      {
        kind: "kayu",
        name: "Tag kayu limbah",
        detail: "Aksen tag kayu kecil sebagai pemanis.",
        optional: true,
      },
    ],
    personalization: [
      { name: "Nama atau inisial", detail: "Teks timbul di sisi depan." },
      { name: "Bentuk", detail: "Bentuk standar atau mengikuti logo/maskot." },
      { name: "Warna filamen", detail: "Pilihan warna rPET mengikuti stok." },
      { name: "QR Letter", detail: "QR kecil di sisi belakang menuju pesan digital." },
    ],
    specs: [
      { label: "Ukuran", value: "± 5 × 3 cm" },
      { label: "Minimal pesanan", value: "10 pcs" },
      { label: "Waktu produksi", value: "± 3–7 hari kerja, tergantung jumlah" },
    ],
    idealFor: ["Suvenir wisuda", "Seminar kit", "Merchandise komunitas", "Hadiah teman"],
    qrLetter: true,
    order: 2,
  },
  {
    slug: "merch",
    name: "Merch",
    summary: "Merchandise custom untuk acara, komunitas, dan brand.",
    description: [
      "Merch Morvo mencakup benda kecil yang dipakai sehari-hari: tatakan gelas, pembatas buku, penyangga ponsel, pin, dan wadah meja. Semuanya dicetak dari filamen rPET dan bisa membawa logo atau identitas acaramu.",
      "Untuk institusi dan event organizer, Morvo membantu dari desain sampai produksi dalam jumlah besar, termasuk cerita asal bahan yang bisa dibagikan ke peserta.",
    ],
    image: {
      src: "/images/Produk/merch.webp",
      alt: "Tas kanvas Morvo dengan rangkaian gantungan kunci rPET terpasang di talinya",
      width: 1200,
      height: 1200,
    },
    gallery: [
      {
        src: "/images/produk-merch-detail-tatakan.svg",
        alt: "Tatakan gelas rPET dengan kombinasi kayu limbah",
        width: 800,
        height: 800,
      },
      {
        src: "/images/produk-merch-detail-kemasan.svg",
        alt: "Merch Morvo dalam kemasan siap dibagikan ke peserta acara",
        width: 800,
        height: 800,
      },
    ],
    materials: [
      {
        kind: "pet",
        name: "Filamen rPET",
        detail: "Bahan utama semua item merch.",
      },
      {
        kind: "kayu",
        name: "Kayu limbah",
        detail: "Untuk item tertentu seperti tatakan gelas dan wadah meja.",
        optional: true,
      },
    ],
    personalization: [
      { name: "Logo dan identitas", detail: "Logo, nama acara, atau slogan komunitas." },
      { name: "Jenis item", detail: "Pilih dari katalog atau ajukan bentuk baru." },
      { name: "Kemasan", detail: "Kemasan sederhana dengan kartu cerita asal bahan." },
      { name: "QR Letter", detail: "Satu pesan untuk semua peserta atau pesan per penerima." },
    ],
    specs: [
      { label: "Ukuran", value: "Mengikuti jenis item" },
      { label: "Minimal pesanan", value: "20 pcs" },
      { label: "Waktu produksi", value: "± 7–14 hari kerja, tergantung jumlah" },
    ],
    idealFor: ["Event organizer", "Kit acara kampus", "Merchandise brand", "Hadiah klien"],
    qrLetter: true,
    order: 3,
  },
];
