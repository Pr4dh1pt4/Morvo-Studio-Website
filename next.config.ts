import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Situs statis: `next build` menghasilkan folder `out/` berisi HTML/CSS/JS.
  // Hapus baris ini saat menambah login/dashboard yang butuh server.
  output: "export",
  // /produk/plakat → /produk/plakat/index.html. Menghindari bentrok antara
  // file .html dan folder bernama sama di hosting statis mana pun.
  trailingSlash: true,
  images: {
    // Wajib untuk static export: tidak ada server untuk optimasi gambar.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
