import { getCheckpoints } from "@/lib/getData";
import PageShell from "@/components/PageShell";
import CTA from "@/components/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Border — Woodlands & Tuas live cameras",
  description:
     "Official LTA OneMotoring live traffic cameras for Woodlands and Tuas checkpoints, plus one-tap Waze and Google Maps navigation.",
};

// §P3-4: two sections, each a LTA camera link (GREEN) + Waze + Maps.
// checkPoints are pre-filtered by the GREEN/RED guard, so RED shows name only.
export default async function BorderPage() {
  const rows = getCheckpoints();

  return (
          <PageShell>
           <div className="mb-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              SG → JB
                </h1>
             <p className="mt-1 text-sm text-slate-500">
              Official LTA cameras. Opens in a new tab.
                 </p>
            </div>

            <div className="grid gap-3">
              {rows.map((c) => (
                <section
                 key={c.name}
                 className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-soft"
                     >
                  <div className="flex items-center gap-3">
                   <span
                  aria-hidden
                  className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-2xl shadow-soft"
                      >
                    🚧
                       </span>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                       {c.name}
                        </h2>
                       <p className="text-xs text-slate-500">
                     📹 LTA Official Live Traffic Camera
                        </p>
                    </div>
                </div>

                {c.camera_url ? (
                   <div className="mt-4">
                     <CTA href={c.camera_url} external variant="primary">
                   View {c.name} Camera →
                        </CTA>
                    </div>
                   ) : (
                     <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-500">
                     Source not yet available
                        </p>
                    )}

                    <div className="mt-3 grid grid-cols-2 gap-2">
                     <CTA href={c.waze_url || "#"} external variant="soft">
                   📍 Waze
                        </CTA>
                     <CTA href={c.gmaps_url || "#"} external variant="soft">
                   🗺️ Google Maps
                        </CTA>
                    </div>

                    {c.note && (
                      <p className="mt-3 text-xs text-slate-400">{c.note}</p>
                    )}
                 </section>
              ))}
            </div>

            <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-700">
             ℹ️ LTA cameras refresh every 1–5 min. Times are indicative.
            </p>
          </PageShell>
        );
}
