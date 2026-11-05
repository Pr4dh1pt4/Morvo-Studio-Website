import type { Metadata } from "next";
import { getSite } from "@/content";

/** Gambar Open Graph bersama, dibuat oleh src/app/og.png/route.tsx saat build. */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Morvo: produk penghargaan dari botol plastik PET bekas",
};

/**
 * Metadata per halaman. Next.js menimpa objek `openGraph` milik layout
 * (bukan menggabungkan), jadi field dasar dan gambar diulang di sini.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  /** true = judul dipakai apa adanya, tanpa template "| Morvo". */
  absoluteTitle?: boolean;
}): Metadata {
  const site = getSite();
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
