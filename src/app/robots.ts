import type { MetadataRoute } from "next";
import { getSite } from "@/content";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const { url } = getSite();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", url).toString(),
  };
}
