import { config as CONFIG } from "@/lib/data";
import { organization, jsonLd } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About — what JB Flow is",
    description:
        "JB Flow is a fast, mobile-first link directory for Singapore and Johor. It links to official sources; it does not own, modify, or embed the data.",
};

// §P3-7: what it is, data-source disclaimer, contact, "not a ..." line.
export default function AboutPage() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || CONFIG.url;
  return (
          <PageShell>
            <script
             type="application/ld+json"
             dangerouslySetInnerHTML={{__html: jsonLd(organization(CONFIG.siteName, url, CONFIG.contactEmail))}}
                />
                <div className="mb-4">
                 <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
           About {CONFIG.siteName}
               </h1>
              </div>

           <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft text-sm leading-relaxed text-slate-700">
            <p>
            {CONFIG.siteName} is a fast, mobile-first page that tells Singapore
            drivers and JB locals where to check before they leave: mall parking,
            Woodlands / Tuas border traffic, RTS, bus and navigation — all
            official sources, in one place, in two seconds.
                </p>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">
             Data-source disclaimer
                </p>
              <p className="mt-1 text-slate-700">
               {CONFIG.siteName} links to official sources. It does not own,
             modify, embed, cache, or re-render the data displayed there. Every
             number you see on a linked page comes from that source, not from{" "}
             {CONFIG.siteName}.
                 </p>
             </div>

            <p className="font-medium text-slate-900">
            v1 is a link directory. It is not a parking aggregator, navigation
            app, or data platform.
                </p>
            <p className="text-slate-600">
     No login. No account. No cookie banner. Open, look, click through, leave.
               </p>
           </section>

           <p className="mt-4 text-center text-xs text-slate-400">
      Contact:{" "}
       <a
        href={`mailto:${CONFIG.contactEmail}`}
        className="font-medium text-brand-600 hover:text-brand-700"
            >
         {CONFIG.contactEmail}
          </a>
         </p>
       </PageShell>
      );
}
