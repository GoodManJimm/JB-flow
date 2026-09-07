import Link from "next/link";
import { getMallBySlug, getMallSlugs } from "@/lib/getData";
import { BADGES, resolveMallLink } from "@/lib/render";
import { shoppingCenter, jsonLd } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import SourceBadge from "@/components/SourceBadge";
import CTA from "@/components/CTA";
import type { Metadata } from "next";

// Only GREEN + RED malls get a public route. YELLOW has no page at all.
export async function generateStaticParams() {
  const slugs = await getMallSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const mall = await getMallBySlug(params.slug);
  if (!mall) return { title: "Mall not found" };
  const spec = BADGES[mall.badge];
  return {
    title: `${mall.name} — ${spec.label} parking`,
    description: `${mall.name}: ${spec.label.toLowerCase()} parking source. Click through to the official source.`,
     };
}

// §P3-3: GREEN renders the CTA with href; RED shows the "not yet available"
// message and never a parking <a href>. Official website only when GREEN.
export default async function MallDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const mall = await getMallBySlug(params.slug);
  if (!mall) {
    return (
            <PageShell>
             <p className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center text-slate-500">
              Mall not found.
              </p>
            </PageShell>
          );
        }

  const link = resolveMallLink(mall);
  const spec = BADGES[mall.badge];
  const isRed = mall.link_clearance === "RED";

   // Official website is only clickable when the row itself is GREEN.
   const websiteHref =
     mall.official_website && mall.link_clearance === "GREEN"
       ? mall.official_website
       : undefined;

   const verified = mall.last_verified_at
      ? new Date(mall.last_verified_at).toLocaleDateString()
      : "—";

    const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://jbflow.my"}/parking/${mall.slug}`;

    return (
             <PageShell>
              <script
             type="application/ld+json"
             dangerouslySetInnerHTML={{__html: jsonLd(shoppingCenter(mall, url))}}
               />

               <Link
              href="/parking"
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-600"
                  >
                ← Back to parking
                 </Link>

              {/* Header card */}
              <section
             className={
             "mt-3 overflow-hidden rounded-3xl border bg-white p-6 shadow-card "
             +
             (isRed ? "border-slate-200/70" : "border-slate-200")
               }
                 >
                <div
              aria-hidden
              className={
               "mb-3 h-1.5 w-12 rounded-full "
              +
             (isRed ? "bg-slate-200" : "bg-brand-500")
               }
                 />
                <h1
             className={
             "text-2xl font-extrabold tracking-tight "
             +
             (isRed ? "text-slate-500" : "text-slate-900")
             }
                 >
              {mall.name}
               </h1>
              <div className="mt-3">
               <SourceBadge badge={mall.badge} dimmed={isRed} />
                </div>

                {isRed ? (
                  <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
                 Live parking source for {mall.name} is not yet available. Check
                 back later, or use the mall website.
                    </p>
                 ) : (
                   <p className="mt-4 text-sm leading-relaxed text-slate-600">
                 {spec.label} parking is published on the mall's official source.
                  Open it in a new tab to see the live info.
                    </p>
                  )}
               </section>

                {/* Primary action */}
                {!isRed && link.href && (
                   <div className="mt-3">
                     <CTA href={link.href} external variant="primary">
                    {spec.cta}
                         </CTA>
                       </div>
                      )}

                      {isRed && websiteHref && (
                         <div className="mt-3">
                          <CTA href={websiteHref} external variant="ghost">
                         Mall website →
                            </CTA>
                          </div>
                        )}

                        {/* Also available */}
                        <section className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
                          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                           Also available
                            </h2>
                          <div className="mt-3 grid grid-cols-2 gap-2">
                         {mall.waze_url && (
                             <CTA href={mall.waze_url} external variant="soft">
                              📍 Waze
                               </CTA>
                              )}
                             {mall.gmaps_url && (
                                 <CTA href={mall.gmaps_url} external variant="soft">
                                  🗺️ Google Maps
                                   </CTA>
                                   )}
                                   {mall.parking_info_url &&
                                    mall.link_clearance === "GREEN" && (
                                       <CTA
                                        href={mall.parking_info_url}
                                        external
                                        variant="soft"
                                        className="col-span-2"
                                          >
                                        🅿️ Parking rates & entrance →
                                          </CTA>
                                          )}
                                        <p
                                     className={
                                       "col-span-2 mt-1 text-xs text-slate-400"
                                       }
                                    >
                                     {mall.lat !== undefined && mall.lng !== undefined
                                     ? `${mall.lat}, ${mall.lng}`
                                      : ""}
                                        </p>
                                      </div>
                       </section>

                        <p className="mt-4 text-center text-xs text-slate-400">
                        Last verified: {verified}
                          {mall.verified_by ? ` · ${mall.verified_by}` : ""}
                          </p>
                        </PageShell>
                        );
                    }
