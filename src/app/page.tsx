import { config as CONFIG } from "@/lib/data";
import { webPage, jsonLd } from "@/lib/seo";
import PageShell from "@/components/PageShell";
import Link from "next/link";

const TILES = [
      {
        href: "/parking",
         icon: "🚗",
        title: "Parking",
        blurb: "Which JB malls have live parking — and where to look.",
        cta: "Open parking list",
        tone: "from-emerald-400 to-emerald-600",
         },
      {
        href: "/border",
         icon: "🚧",
        title: "Border",
        blurb: "Woodlands & Tuas live cameras, plus Waze / Maps.",
        cta: "Check the border",
        tone: "from-amber-400 to-orange-500",
         },
      {
        href: "/rts",
         icon: "🚆",
        title: "RTS",
        blurb: "Woodlands North ↔ Bukit Chagar. Links now, live layer to come.",
        cta: "See RTS",
        tone: "from-sky-400 to-blue-600",
         },
       ];

export default function Home() {
  const cfg = CONFIG;
  const url = process.env.NEXT_PUBLIC_SITE_URL || cfg.url;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(
            url
        )}`;

   return (
           <PageShell>
            <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: jsonLd(webPage(cfg.siteName, url, cfg.tagline))}}
              />

              {/* Hero */}
            <section
             className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 p-6 text-white shadow-card"
              >
             <div
             aria-hidden
             className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"
               />
             <div
             aria-hidden
             className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
               />
             <p className="relative text-[13px] font-medium uppercase tracking-[0.18em] text-white/70">
             {cfg.siteName}
                </p>
             <h1 className="relative mt-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-[28px]">
             {cfg.tagline}
                </h1>
             <p className="relative mt-3 max-w-md text-sm leading-relaxed text-white/80">
             A fast, mobile-first page that routes Singapore ↔ Johor drivers and
             JB locals to the official sources they already need — parking, border
             traffic, RTS and bus — in one place.
                  </p>
             <div className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
             No login · No account · Open, look, click through, leave
           </div>
         </section>

        {/* Category tiles */}
         <section className="mt-4 grid gap-3">
          {TILES.map((t) => (
              <Link
              key={t.href}
              href={t.href}
              className={
             "group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
            }
               >
             <span
             aria-hidden
             className={
            `grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${t.tone} text-2xl shadow-soft`
              }
                >
                 {t.icon}
               </span>
             <span className="min-w-0 flex-1">
               <span className="block text-base font-bold text-slate-900">
                 {t.title}
                 </span>
                 <span className="block text-sm text-slate-500">{t.blurb}</span>
                </span>
             <span
             aria-hidden
             className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-400"
              >
             →
              </span>
           </Link>
            ))}
         </section>

        {/* QR + transport quick links */}
         <section className="mt-4 grid gap-3 sm:grid-cols-2">
           <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center shadow-soft">
            <span className="text-sm font-semibold text-slate-700">
            Scan to open on your phone
                </span>
               <img
             src={qrSrc}
             alt={`QR code for ${url}`}
             width={180}
             height={180}
             className="mt-3 rounded-xl bg-white p-1 shadow-soft ring-1 ring-slate-100"
                />
             <span className="mt-2 text-xs text-slate-400">{url}</span>
           </div>

            <div className="flex flex-col justify-center gap-2">
              <Link
             href="/transport"
             className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition hover:shadow-card"
                 >
               <span aria-hidden className="text-2xl">🚌</span>
               <span className="flex-1">
            <span className="block text-sm font-bold text-slate-900">
            Bus & train
                      </span>
                 <span className="block text-xs text-slate-500">
                       BAS.MY · GTFS feed
                    </span>
               </span>
              <span aria-hidden className="text-slate-300">→</span>
              </Link>
              <Link
             href="/about"
             className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition hover:shadow-card"
                 >
               <span aria-hidden className="text-2xl">💬</span>
               <span className="flex-1">
            <span className="block text-sm font-bold text-slate-900">
            About JB Flow
                      </span>
                 <span className="block text-xs text-slate-500">
                       What it is · data disclaimer
                    </span>
               </span>
              <span aria-hidden className="text-slate-300">→</span>
              </Link>
            </div>
          </section>
        </PageShell>
      );
}
