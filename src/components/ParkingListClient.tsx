"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SourceBadge from "@/components/SourceBadge";
import { BADGES, resolveMallLink } from "@/lib/render";
import type { Mall } from "@/lib/types";

type SortKey = "order" | "name" | "source";
type FilterKey = "all" | "live";

// Parking list with sort + filter. Rendered from server-queried data (GREEN +
// RED only — YELLOW is filtered upstream). The §1.2 link rules are applied per
// row via resolveMallLink, so a RED row never produces an <a href>.
export default function ParkingListClient({ malls }: { malls: Mall[] }) {
  const [sort, setSort] = useState<SortKey>("order");
  const [filter, setFilter] = useState<FilterKey>("all");

  const rows = useMemo(() => {
      let list = [...malls];
      if (filter === "live") {
         list = list.filter((m) => m.badge === "live");
        }
      switch (sort) {
        case "name":
          list.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "source":
          list.sort((a, b) =>
             BADGES[a.badge].label.localeCompare(BADGES[b.badge].label)
             );
          break;
         default:
          list.sort((a, b) => a.display_order - b.display_order);
        }
      return list;
      }, [malls, sort, filter]);

  const counts = useMemo(() => ({
    total: malls.length,
    live: malls.filter((m) => m.badge === "live").length,
     }), [malls]);

  return (
     <section>
       <div className="mb-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Mall Parking
          </h1>
          <p className="mt-1 text-sm text-slate-500">
          Live availability where it exists, honest info where it does not.
           </p>
        </div>

         {/* Filter segmented control */}
          <div
          role="tablist"
          aria-label="Filter malls"
          className="mb-3 inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-soft"
            >
           {(["all", "live"] as FilterKey[]).map((f) => (
                <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
             className={
               "rounded-full px-4 py-1.5 text-sm font-semibold transition "
              +
               (filter === f
                 ? "bg-brand-600 text-white shadow-soft"
                 : "text-slate-500 hover:text-slate-700")
                }
               >
              {f === "live" ? "Live only" : "All"}
              <span
            aria-hidden
            className="ml-1.5 text-xs opacity-70"
              >
               {f === "live" ? counts.live : counts.total}
                </span>
             </button>
             ))}
           </div>

             {/* Sort */}
            <label className="mb-3 flex items-center gap-2 text-sm text-slate-500">
           Sort
            <select
           value={sort}
           onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-soft focus:border-brand-400 focus:outline-none"
       >
             <option value="order">Distance</option>
             <option value="name">Name</option>
             <option value="source">Source type</option>
           </select>
         </label>

        <ul className="grid gap-3">
       {rows.map((m) => (
          <Row key={m.slug} mall={m} />
             ))}
       {rows.length === 0 && (
           <li className="rounded-2xl border border-dashed border-slate-300 bg-white py-10 text-center text-sm text-slate-400">
             No malls match this filter yet.
             </li>
            )}
          </ul>

          <p className="mt-5 text-xs leading-relaxed text-slate-400">
          Distance sort is approximate (fixed JB-centre pin). “Live only” shows
          malls with an official live parking source.
         </p>
     </section>
     );
}

function Row({ mall }: { mall: Mall }) {
   const link = resolveMallLink(mall);
   const isRed = mall.link_clearance === "RED";

 // Render as a card. RED rows are muted and show "no link yet".
 return (
     <li
        className={
        "overflow-hidden rounded-2xl border bg-white shadow-soft transition hover:shadow-card "
       +
        (isRed ? "border-slate-200/70" : "border-slate-200 hover:border-slate-300")
      }
      >
       <Link
        href={`/parking/${mall.slug}`}
        className="flex items-center gap-3 p-4"
          >
         <div className="min-w-0 flex-1">
          <div className="mb-1.5">
            <SourceBadge badge={mall.badge} dimmed={isRed} />
           </div>
            <div
             className={
             "truncate text-[15px] font-bold "
            +
             (isRed ? "text-slate-500" : "text-slate-900")
           }
              >
             {mall.name}
              </div>
             {isRed && link.statusText && (
              <div className="mt-0.5 text-xs text-slate-400">
           {link.statusText}
                 </div>
                )}
            </div>

            <span
            aria-hidden
             className={
             "text-lg "
            +
             (isRed ? "text-slate-300" : "text-brand-500")
           }
               >
              →
              </span>
          </Link>
        </li>
       );
      }
