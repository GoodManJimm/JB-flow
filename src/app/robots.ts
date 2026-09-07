import type { MetadataRoute } from "next";

// §P4-3: allow all; point to sitemap.
export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://jbflow.my";
  const rules = {
    userAgent: "*",
    allow: "/",
    disallow: ["/api/health"],
  };
  const sitemap = `${base}/sitemap.xml`;
  const host = base;
  return { rules, sitemap, host };
}
