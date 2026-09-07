# JB Flow — v1

A fast, mobile-first, no-login link directory for Singapore ↔ Johor.
It routes you to official sources (parking, border traffic, RTS, bus, navigation).
It does **not** own, modify, embed, or re-render any data.

See `plan.md` and `Execution plan.md` for the full product + phase plan.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
```

## Where to fill in URLs

**Everything you need to edit is in one file: `src/lib/data.ts`.**

For each mall / checkpoint / config entry:
1. Fill the URL fields (`parking_source_url`, `official_website`, `camera_url`,
  `waze_url`, `gmaps_url`, …).
2. Run your Phase 1 clearance (Execution plan §2: open on desktop + 3 phones,
  read the ToS, run mobile QA).
3. Set `link_clearance`:
   - `GREEN` — cleared, renders publicly with a button.
   - `RED` — blocked. Mall shows name only, **no link rendered**.
   - `YELLOW` — admin/staging only, **never shipped to production**.

The site has a hard guard (`src/lib/getData.ts` → `guardForProduction`):
only `GREEN` + `RED` rows are ever fetched. A `YELLOW` row is silently dropped
even if you forget to change it.

Current state (safe to run as-is):
- Malls default to `YELLOW` → not rendered, until you clear them.
- Mid Valley Southkey is `RED` (its live link is blocked pending ToS review) → shows name only.
- Woodlands + Tuas checkpoints are `GREEN` → render.

To preview the parking list with a working entry, set one mall to `GREEN`
and fill its URL.

## Env vars

Copy `.env.example` → `.env.local` and fill in. All optional for local dev:
- `NEXT_PUBLIC_SITE_URL` — public URL (sitemap/robots/QR/JSON-LD).
- `SUPABASE_URL` / `SUPABASE_ANON_KEY` — Phase 2, when the DB goes live.
- `NEXT_PUBLIC_POSTHOG_KEY` — Phase 4 analytics.

## Phase map

| Phase | Where |
|---|---|
| Data + guards | `src/lib/data.ts`, `src/lib/getData.ts`, `src/lib/render.ts` |
| Pages | `src/app/**` |
| Components | `src/components/**` |
| SQL schema | `supabase/schema.sql` |
| Link health monitor | `supabase/link-health.ts` |
| Analytics | `src/lib/analytics.ts` |

Next gate (Execution plan §2 / §14): get ≥ 4 `GREEN` entries, then wire Supabase
in `src/lib/getData.ts` (look for the `getMalls` switch to the DB when
`SUPABASE_URL` is set).
