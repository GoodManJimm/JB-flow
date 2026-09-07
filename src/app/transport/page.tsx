import { config as CONFIG } from "@/lib/data";
import PageShell from "@/components/PageShell";
import CTA from "@/components/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Transport — BAS.MY & GTFS",
    description:
        "Johor public transport links: BAS.MY app and the data.gov.my GTFS realtime feed. Feed is informational, not an authoritative ETA.",
};

// §P3-6: BAS.MY app + GTFS feed + one-line feed-quality note.
export default function TransportPage() {
  const { transport } = CONFIG;
  return (
      <PageShell>
        <div className="mb-4">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
      Public Transport
           </h1>
           <p className="mt-1 text-sm text-slate-500">
     BAS.MY · Johor
           </p>
          </div>

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
           <div
            aria-hidden
            className="mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 text-2xl shadow-soft"
                >
             🚌
                </div>
           <p className="text-sm font-semibold text-slate-800">
            BAS.MY Johor
               </p>
              <p className="mt-1 text-xs text-slate-500">
        Bus arrivals & routes
             </p>

            <div className="mt-4 grid gap-2">
              {transport.basmy_url && (
                  <CTA href={transport.basmy_url} external variant="primary">
                 Open BAS.MY App →
                    </CTA>
                 )}
              {transport.gtfs_url && (
                  <CTA href={transport.gtfs_url} external variant="soft">
                 GTFS Realtime feed →
                    </CTA>
                 )}
            </div>

            {transport.note && (
              <p className="mt-4 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
              {transport.note}
                 </p>
              )}
          </section>
       </PageShell>
      );
}
