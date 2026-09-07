import { config as CONFIG } from "@/lib/data";
import PageShell from "@/components/PageShell";
import CTA from "@/components/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RTS — Woodlands North ↔ Bukit Chagar",
  description:
     "RTS Link official pages. Live layer (train status, connections, bus links) coming when RTS is operational. Timings subject to official operational announcement / 以官方最終運營公告為準.",
};

// §P3-5: placeholder. All timing copy defers to the operator. No hard-coded date.
export default function RtsPage() {
  const { rts } = CONFIG;
  return (
          <PageShell>
            <div className="mb-4">
             <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              RTS Link
                 </h1>
              <p className="mt-1 text-sm text-slate-500">
              Woodlands North ↔ Bukit Chagar
                </p>
             </div>

             <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
              <div
                aria-hidden
                className="mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-2xl shadow-soft"
                    >
                 🚆
                  </div>
              <p className="text-sm font-semibold text-slate-800">
              Passenger service: target end-2026
               </p>
              <p className="mt-1 text-sm text-slate-500">{rts.note}</p>

              <div className="mt-4 grid gap-2">
               {rts.official_url && (
                  <CTA href={rts.official_url} external variant="primary">
                  Official RTS Page →
                     </CTA>
                )}
               {rts.schedule_url && (
                  <CTA href={rts.schedule_url} external variant="soft">
                  Official Schedule →
                     </CTA>
                )}
              </div>
            </section>

            <section className="mt-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
             <h2 className="text-sm font-bold text-slate-900">
            When RTS is operational, this page will show:
               </h2>
             <ul className="mt-3 grid gap-2">
               {[
                 "Live train status",
                 "Bukit Chagar ↔ City Square / JB Sentral connections",
                 "Covered walking routes",
                 "Bus connections (BAS.MY)",
                 "Pickup / drop-off guidance",
               ].map((item) => (
                 <li
                 key={item}
                 className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-700"
                      >
                <span aria-hidden className="text-brand-500">
                  •
                   </span>
                {item}
                 </li>
                ))}
             </ul>
            </section>

            <p className="mt-3 rounded-xl bg-sky-50 p-3 text-xs text-sky-700">
            {rts.note} No hard-coded date — the page stays correct if the
            official opening shifts.
              </p>
           </PageShell>
         );
}
