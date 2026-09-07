import type { MetadataRoute } from "next";
import { getMallSlugs } from "@/lib/getData";

// §P4-3: generate sitemap.xml with all static routes + every public mall.
// YELLOW malls are excluded because getMallSlugs only returns GREEN + RED.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
     process.env.NEXT_PUBLIC_SITE_URL || "https://jbflow.my";

  const staticRoutes: MetadataRoute.Sitemap = [
     { url: "/", changeFrequency: "weekly", priority: 1 },
     { url: "/parking", changeFrequency: "daily", priority: 0.8 },
     { url: "/border", changeFrequency: "daily", priority: 0.8 },
     { url: "/rts", changeFrequency: "monthly", priority: 0.6 },
     { url: "/transport", changeFrequency: "monthly", priority: 0.6 },
     { url: "/about", changeFrequency: "monthly", priority: 0.5 },
   ];

  const slugs = await getMallSlugs();
  const mallRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
     url: `/parking/${slug}`,
     changeFrequency: "daily",
     priority: 0.7,
   }));

   return [...staticRoutes, ...mallRoutes].map((item) => ({
      ...item,
      url: `${base}${item.url}`,
    }));
}
