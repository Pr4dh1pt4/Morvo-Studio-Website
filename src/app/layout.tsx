import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { getSite } from "@/content";
import { OG_IMAGE } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Morvo",
    "daur ulang botol PET",
    "filamen rPET",
    "plakat ramah lingkungan",
    "gantungan kunci custom",
    "merchandise daur ulang",
    "QR Letter",
    "3D printing",
  ],
  // Bawaan untuk halaman yang tidak mengatur metadata sendiri.
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F1E7" },
    { media: "(prefers-color-scheme: dark)", color: "#121A16" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      // Class `dark`/`js` dipasang ThemeScript sebelum hidrasi.
      suppressHydrationWarning
      className={`${fraunces.variable} ${jakarta.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
