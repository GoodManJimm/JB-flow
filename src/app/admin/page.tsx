import { malls as ALL_MALLS, checkpoints as CHECKPOINTS } from "@/lib/data";
import type { Mall } from "@/lib/types";

// ============================================================================
//  /admin — STAGING / ADMIN VIEW (Execution plan §1.2 "YELLOW lives in staging
//  / admin only").
//
//  This page reads the raw data and shows EVERY mall row (GREEN + YELLOW + RED),
//  which the public /parking route is forbidden from rendering. It exists so a
//  human can perform Phase 1 link clearance (P1-1..P1-6) in one place.
//
//  It is deliberately NOT wired into the public nav or the sitemap.
// ============================================================================

export const dynamic = "force-dynamic";

// Staging-only: keep search engines away. This is not the public product.
export const metadata = {
  robots: { index: false, follow: false },
};

const CLEARANCE_CLASS: Record<string, string> = {
  GREEN: "bg-live-bg text-live-fg ring-live-ring",
  YELLOW: "bg-amber-100 text-amber-700 ring-amber-200",
  RED: "bg-rose-100 text-rose-700 ring-rose-200",
};

function clearancePill(c: string) {
  const cls = CLEARANCE_CLASS[c] || "bg-slate-100 text-slate-600 ring-slate-200";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold ring-1 ${cls}`}
    >
      {c}
    </span>
  );
}

// A single link the reviewer can actually open + verify from one screen.
function LinkRow({ label, href }: { label: string; href?: string }) {
  if (!href) {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span className="w-32 shrink-0 text-slate-400">{label}</span>
        <span className="italic">— none —</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-32 shrink-0 text-slate-500">{label}</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="truncate text-brand-600 hover:underline"
        title={href}
      >
        {href}
      </a>
    </div>
  );
}

function MallCard({ mall }: { mall: Mall }) {
  const url =
    mall.parking_source_url ||
    mall.parking_info_url ||
    mall.official_website ||
    "";
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            {mall.display_order}. {mall.name}
          </h2>
          <p className="mt-0.5 font-mono text-[11px] text-slate-400">
            /parking/{mall.slug} · badge={mall.badge}
          </p>
        </div>
        {clearancePill(mall.link_clearance)}
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <LinkRow label="Parking source" href={mall.parking_source_url} />
        <LinkRow label="Parking info" href={mall.parking_info_url} />
        <LinkRow label="Official site" href={mall.official_website} />
        <LinkRow label="Waze" href={mall.waze_url} />
        <LinkRow label="Google Maps" href={mall.gmaps_url} />
      </div>

      {mall.notes && (
        <p className="mt-3 rounded-xl bg-slate-50 p-2.5 text-xs leading-relaxed text-slate-500">
          {mall.notes}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-soft hover:bg-slate-50"
          >
            Open source ↗
          </a>
        )}
        {mall.lat !== undefined && mall.lng !== undefined && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mall.lat}%2C${mall.lng}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-soft hover:bg-slate-50"
          >
            Pin ({mall.lat}, {mall.lng}) ↗
          </a>
        )}
      </div>
    </section>
  );
}

export default function AdminPage() {
  const all = [...ALL_MALLS].sort((a, b) => a.display_order - b.display_order);
  const counts = {
    GREEN: all.filter((m) => m.link_clearance === "GREEN").length,
    YELLOW: all.filter((m) => m.link_clearance === "YELLOW").length,
    RED: all.filter((m) => m.link_clearance === "RED").length,
  };
  const greenTotal = counts.GREEN + CHECKPOINTS.filter((c) => c.link_clearance === "GREEN").length;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <p className="font-bold">⚠ Staging / admin view — not the public site.</p>
        <p className="mt-1 text-xs leading-relaxed">
          Shows every row including YELLOW (the public /parking route is forbidden
          from rendering YELLOW). Use this to run Phase 1 clearance. After a URL
          passes P1-1..P1-6, set it to <code>GREEN</code> in{" "}
          <code>src/lib/data.ts</code> and it ships to the public build.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-soft">
          <div className="text-3xl font-black text-emerald-600">{counts.GREEN}</div>
          <div className="text-xs font-semibold text-slate-500">GREEN malls</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-soft">
          <div className="text-3xl font-black text-amber-600">{counts.YELLOW}</div>
          <div className="text-xs font-semibold text-slate-500">YELLOW (staging)</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-soft">
          <div className="text-3xl font-black text-rose-600">{counts.RED}</div>
          <div className="text-xs font-semibold text-slate-500">RED (blocked)</div>
        </div>
      </div>

      <div
        className={`mt-3 rounded-2xl border p-4 text-center text-sm font-semibold shadow-soft ${
          greenTotal >= 4
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-rose-200 bg-rose-50 text-rose-700"
        }`}
      >
        Total GREEN entries: {greenTotal} / 4 gate
        {greenTotal >= 4
          ? " — Phase 1 gate PASSED, Phase 2 may start."
          : ` — need ${4 - greenTotal} more GREEN. Repo still blocked.`}
      </div>

      <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900">
        Mall clearance ({all.length})
      </h1>

      <div className="mt-3 flex flex-col gap-3">
        {all.map((m) => (
          <MallCard key={m.slug} mall={m} />
        ))}
      </div>

      <h1 className="mt-8 text-2xl font-extrabold tracking-tight text-slate-900">
        Border checkpoints ({CHECKPOINTS.length})
      </h1>
      <div className="mt-3 flex flex-col gap-3">
        {CHECKPOINTS.map((c) => (
          <section key={c.name} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{c.name}</h2>
              {clearancePill(c.link_clearance)}
            </div>
            <div className="mt-3 flex flex-col gap-1.5">
              <LinkRow label="Camera" href={c.camera_url} />
              <LinkRow label="Waze" href={c.waze_url} />
              <LinkRow label="Google Maps" href={c.gmaps_url} />
            </div>
            {c.note && <p className="mt-2 text-xs text-slate-400">{c.note}</p>}
          </section>
        ))}
      </div>
    </div>
  );
}
