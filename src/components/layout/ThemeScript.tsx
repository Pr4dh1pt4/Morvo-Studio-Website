export const THEME_STORAGE_KEY = "morvo-theme";

/**
 * Dijalankan sebelum halaman tampil supaya tidak ada kedipan tema:
 * memasang class `.dark` (sesuai pilihan tersimpan atau pengaturan sistem)
 * dan class `.js` (penanda JavaScript aktif untuk animasi Reveal).
 */
const script = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var dark=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(dark)d.classList.add('dark');}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
