# (app) — area dashboard (belum dipakai)

Route group ini sengaja dikosongkan untuk login dan dashboard Morvo nanti.
Nama folder dalam kurung tidak muncul di URL, jadi `src/app/(app)/dashboard/page.tsx`
akan menjadi `/dashboard`.

Rencana singkat saat mulai dipakai:

1. Hapus `output: "export"` di `next.config.ts` karena login butuh server.
2. Buat `src/app/(app)/layout.tsx` sendiri (sidebar dashboard, tanpa Navbar/Footer marketing).
3. Lindungi route di sini dengan pengecekan sesi di layout atau `src/proxy.ts`.
4. Ganti isi fungsi di `src/content/index.ts` dengan query database. Halaman publik
   di `(marketing)` akan ikut membaca data baru tanpa perubahan komponen.

Detail lengkap ada di README utama, bagian "Menambah login & dashboard".
