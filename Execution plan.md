# JB FLOW — Execution Plan v0.1

## From "Plan Ready" to "Go-Live" to Phase 2
### Operational Phasing, Gates, and Task Breakdown

**Companion to:** plan.md v0.2 (Lean MVP)
**Date:** September 2026
**Status:** Active. Repo start condition: ≥ 4 GREEN malls confirmed.

---

## 0. Current State (as of this document)

| Layer | Status |
|---|---|
| Product plan (plan.md) | ✅ Ready. v0.2 accepted. No further revision. |
| Engineering architecture | ✅ Ready. Next.js PWA + Supabase + Vercel + PostHog. |
| Source audit — first pass | ✅ Complete. 10 malls triaged into badges. |
| Legal / mobile QA on YELLOW items | ⏳ Pending. **This is the current gate.** |
| Repo | ⛔ Not started. Blocked on ≥ 4 GREEN. |
| Domain / SSM / Trademark | ⏳ Outstanding. Not a v1 code gate; is a public-launch gate. |

### 0.1 Key decisions locked (do not re-litigate)

1. **Mid Valley Southkey is NOT the v1 primary hook.** It is the only true Official Live parking source, but its link clearance is currently **RED**. In v1 it appears in the directory as a name + source-status line only. No outbound hyperlink is rendered.
2. **v1 primary hook = "5 cleaned official parking entries + Border official links."** The hook is the *utility of a clean, verified, badge-labelled list*, not any single live-parking number.
3. **RED malls stay in the directory but do not render a hyperlink.** The user sees the mall name and "Source status: pending clearance" (or equivalent). They know the mall is covered; they just cannot click through yet.
4. **YELLOW never enters production.** YELLOW lives in staging / admin only. Only **GREEN** is promoted to the public build. This removes the "pending legal review but already live" ambiguity.
5. **Repo start condition: ≥ 4 malls with `link_clearance = GREEN`.** Do not start coding until this is met.
6. **v1 is a habit-validation experiment**, not the final JB Flow. KPI gates are behavioural (click-through, repeat, organic slope), not absolute visitor counts.

---

## 1. Link Clearance Schema (applies to all phases)

### 1.1 Database column

```sql
ALTER TABLE malls
  ADD COLUMN link_clearance TEXT NOT NULL DEFAULT 'YELLOW'
    CHECK (link_clearance IN ('GREEN', 'YELLOW', 'RED'));
```

| Value | Meaning |
|---|---|
| `GREEN` | Legal first-pass + mobile QA + ToS read all passed. URL is cleared for public outbound rendering. |
| `YELLOW` | Source found, badge assigned, but legal / mobile QA / ToS check is incomplete. **Admin & staging only. Never rendered in production.** |
| `RED` | Link is blocked (permission, ToS violation, trademark risk, dead source). Mall name remains in directory; **no hyperlink is rendered.** |

### 1.2 Front-end rendering rules (hard-coded, non-negotiable)

```text
if link_clearance == 'GREEN':
    render outbound <a href="{url}"> with badge + CTA
if link_clearance == 'YELLOW':
    render in admin / staging view only
    show: "{Mall Name} — pending clearance" (no link)
    NEVER ship to production build
if link_clearance == 'RED':
    render mall name + "Source status: not yet available"
    NO <a> tag. NO href. NO data-URL attribute.
    User still sees the mall is in the directory.
if parking_source_type == 'none':
    do NOT enter the v1 parking source roster at all.
```

### 1.3 Clearance pipeline (per URL, per mall)

```
source found
    │
    ▼
badge assigned (🟢 / 📱 / 🔵 / ⚪)
    │
    ▼
legal first pass
  (ToS check, deep-link terms, trademark display,
   no-logo reproduction, /about disclaimer coverage)
    │
    ├──► RED ──► mall name stays; no link rendered
    │
    ▼
YELLOW (provisional)
  (source looks valid; full check not yet done)
    │
    ▼
mobile QA + manual ToS read
  (open on 3 devices; confirm page loads;
   confirm no cookie wall blocks the parking view;
   confirm no "click through to our partner" interstitial
   that violates the "link, don't proxy" principle)
    │
    ├──► RED (if ToS forbids, interstitial too heavy, etc.)
    │
    ▼
GREEN
    │
    ▼
GREEN only ──► production build
```

**Rule:** A URL cannot be in the production `malls` table with `link_clearance != 'GREEN'` unless it is explicitly a RED entry (name-only, no link). YELLOW rows exist only in a `staging` database or an admin-only table.

---

## 2. Phase 1 — Source Audit & Legal Clearance

**Objective:** Convert the 5 YELLOW items to GREEN or RED. Reach the ≥ 4 GREEN gate.

**Entry criteria:** plan.md v0.2 accepted. First-pass source audit complete (done).

**Time estimate:** 1–2 person-days. This is the current blocker. Everything else is waiting on this phase.

### 2.1 Task list

- [ ] **P1-1.** Open the 5 YELLOW mall URLs on a desktop browser. Confirm the page loads, the parking info / live data is visible, and the URL is canonical (no `?utm_`, no session token, no `/en/` variant that breaks on mobile).
- [ ] **P1-2.** Open the same 5 URLs on 3 devices (Android, iOS, one older Android). Confirm:
  - Page renders without a cookie / consent wall that blocks the parking view.
  - No "Open in our app" interstitial that is the *only* path to the parking info.
  - Page loads < 3 s on 4G.
- [ ] **P1-3.** Read the ToS / Terms of Use page for each of the 5 sources. Flag any clause that:
  - Prohibits inbound links or deep-links to specific pages.
  - Requires attribution or a "Powered by" notice.
  - Prohibits framing, embedding, or caching (we do none of these in v1, but confirm).
  - Restricts use of the mall name or logo in a third-party context.
- [ ] **P1-4.** For each YELLOW item, assign final clearance:
  - Passed all checks → **GREEN**.
  - ToS violation, dead source, or interstitial too heavy → **RED**.
  - Genuinely ambiguous, needs a second opinion → keep **YELLOW**, schedule a 30-min legal call. Do NOT block the phase on one ambiguous item if ≥ 4 GREENs are already confirmed.
- [ ] **P1-5.** Confirm Mid Valley Southkey status. If it remains RED after ToS read, record the specific reason (e.g., "ToS §4.2 prohibits deep-links to the live-parking widget without written permission") in the `link_health.notes` field. The mall name stays in the directory with no link.
- [ ] **P1-6.** Confirm the 2 Border links (LTA OneMotoring Woodlands + Tuas camera URLs) are GREEN. These are government / LTA pages; clearance should be straightforward but verify no referer-blocking.
- [ ] **P1-7.** Populate a `clearance_log` table (or a sheet) with:

```
mall_slug | source_url | badge | clearance | reviewer | date | notes
```

- [ ] **P1-8.** **Gate check:** Count GREEN malls. If ≥ 4 (including the 2 Border links counted as "entries"), proceed to Phase 2. If < 4, spend the remaining budget resolving YELLOWs or accept a smaller v1 (e.g., 3 GREEN parking + 2 Border = 5 entries is acceptable for a habit experiment).

### 2.2 Exit criteria

| Criterion | Pass condition |
|---|---|
| GREEN count | ≥ 4 total entries (parking + border) |
| Mid Valley | Documented as RED or GREEN; either way, a written note exists |
| YELLOW in production | **Zero.** No YELLOW row is in the production database. |
| ToS review | Each GREEN URL has a one-line "ToS check: passed / N/A" note |
| Mobile QA | Each GREEN URL opened on ≥ 3 devices, screenshot or note saved |
| clearance_log | All 10 malls have a row; GREEN / YELLOW / RED is set for every one |

### 2.3 What does NOT happen in Phase 1

- No code is written. No repo is initialised.
- No `malls` table is created.
- No domain is registered (can be parallel, but not a Phase 1 task).
- No legal opinion letter is written. The "first pass" is a practitioner check, not a formal opinion. A formal opinion is a Phase 3 (partnership) prerequisite.

---

## 3. Phase 2 — Repo Init & Schema

**Objective:** Get a running skeleton on `main` that deploys to Vercel and shows "Hello, JB Flow" on the home page.

**Entry criteria:** Phase 1 gate passed. ≥ 4 GREEN entries in `clearance_log`.

**Time estimate:** 0.5 day.

### 3.1 Task list

- [ ] **P2-1.** `git init` → `git remote add origin` → push to GitHub. Repo: `jb-flow` (private until public launch).
- [ ] **P2-2.** Scaffold Next.js 14+ (App Router), TypeScript, Tailwind CSS. `npx create-next-app@latest jb-flow --ts --tailwind --app --src-dir --no-eslint`.
- [ ] **P2-3.** Supabase project: create project, enable Postgres, set `DATABASE_URL` in Vercel env (via `vercel env add`).
- [ ] **P2-4.** Create tables:

```sql
-- malls
CREATE TABLE malls (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT NOT NULL,
  slug                TEXT UNIQUE NOT NULL,
  lat                 DECIMAL(9, 6),
  lng                 DECIMAL(9, 6),
  official_website    TEXT,
  parking_source_type TEXT NOT NULL
                       CHECK (parking_source_type IN
                             ('official_live_web','official_app',
                              'official_info','none')),
  parking_source_url  TEXT,
  parking_app_ios     TEXT,
  parking_app_android TEXT,
  parking_info_url    TEXT,
  waze_url            TEXT,
  gmaps_url           TEXT,
  link_clearance      TEXT NOT NULL DEFAULT 'YELLOW'
                       CHECK (link_clearance IN ('GREEN','YELLOW','RED')),
  display_order       INT DEFAULT 999,
  last_verified_at    TIMESTAMPTZ,
  verified_by         TEXT,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

-- link_health
CREATE TABLE link_health (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url      TEXT NOT NULL,
  last_status     SMALLINT,
  last_checked_at TIMESTAMPTZ,
  is_active       BOOLEAN DEFAULT true,
  redirect_chain  TEXT,
  response_ms     INT,
  notes           TEXT
);

-- clearance_log  (audit trail; not queried by the app)
CREATE TABLE clearance_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mall_slug   TEXT NOT NULL REFERENCES malls(slug),
  source_url  TEXT NOT NULL,
  badge       TEXT NOT NULL,
  clearance   TEXT NOT NULL CHECK (clearance IN ('GREEN','YELLOW','RED')),
  reviewer    TEXT,
  reviewed_at TIMESTAMPTZ DEFAULT now(),
  notes       TEXT
);
```

- [ ] **P2-5.** Seed the `malls` table with the GREEN + RED entries from `clearance_log`. RED entries: `link_clearance = 'RED'`, `parking_source_url = NULL` (no link stored, or stored but front-end ignores it).
- [ ] **P2-6.** Vercel project: connect repo, set env vars (`DATABASE_URL`, `POSTHOG_KEY`), enable auto-deploy on `main`.
- [ ] **P2-7.** Smoke test: `vercel deploy --prod` → open the URL → confirm "Hello, JB Flow" renders. PWA manifest + icon in place (can be placeholder).

### 3.2 Exit criteria

- `git log` shows ≥ 1 commit on `main`.
- Vercel production URL returns 200.
- Supabase has `malls`, `link_health`, `clearance_log` tables.
- GREEN entries are queryable; RED entries exist with NULL `parking_source_url`.

---

## 4. Phase 3 — Core Build (Pages, Components, Logic)

**Objective:** All 6 static pages + dynamic `/parking/[slug]` pages are functional. Rendering rules for `link_clearance` are enforced.

**Entry criteria:** Phase 2 complete. Skeleton deploys.

**Time estimate:** 2 days.

### 4.1 Task list

- [ ] **P3-1.** **Home page (`/`):** Three tiles — Parking / Border / RTS. One sentence: *"Before you go, JB Flow tells you where to check."* QR code (points to `https://jbflow.my` or `.com`). No login. No cookie banner.
- [ ] **P3-2.** **Parking list (`/parking`):**
  - Render only malls where `link_clearance = 'GREEN'` OR `link_clearance = 'RED'` (RED shows name + status, no link).
  - YELLOW is **not** in the production query. If a new mall is added in YELLOW, it must not appear.
  - Each GREEN row: badge + mall name + CTA button (`View Live →` / `View Info →`).
  - Each RED row: badge (⚪ or 🔵 dimmed) + mall name + *"Source not yet available"* (no `<a>` tag).
  - Sort: Distance (default, requires lat/lng of user or a fixed JB-centre pin), Name, Source type.
  - Filter: `Live only` (shows only 🟢 badge malls that are GREEN), `All`.
- [ ] **P3-3.** **Mall detail (`/parking/[slug]`):**
  - If `link_clearance = 'GREEN'`: render the CTA button with `href = parking_source_url`.
  - If `link_clearance = 'RED'`: render *"Live parking source for {name} is not yet available. Check back or use the mall website."* Show `official_website` link only if that URL is also GREEN.
  - Always show: Waze link, Google Maps link, parking rates link (if 🔵 and GREEN).
  - Show `last_verified_at` as "Last verified: {date}".
  - Do NOT show a parking number. Do NOT show a badge that implies live data if the mall is RED or ⚪.
- [ ] **P3-4.** **Border page (`/border`):** Two sections (Woodlands, Tuas). Each: LTA OneMotoring camera link (GREEN, confirmed in P1). Waze + Google Maps buttons. *"LTA cameras refresh every 1–5 min."*
- [ ] **P3-5.** **RTS page (`/rts`):** Placeholder. All timing copy: *"Subject to official operational announcement / 以官方最終運營公告為準."* No date. Links to official RTS / JTC pages. "Coming soon" for live layer.
- [ ] **P3-6.** **Transport page (`/transport`):** BAS.MY app link + GTFS feed link. One-line note about feed quality.
- [ ] **P3-7.** **About page (`/about`):**
  - What JB Flow is (1 paragraph).
  - Data-source disclaimer: *"JB Flow links to official sources. It does not own, modify, embed, cache, or re-render the data displayed there."*
  - Contact email.
  - "v1 is a link directory. It is not a parking aggregator, navigation app, or data platform."
- [ ] **P3-8.** **Rendering guard (server-side):** In the data-fetching layer (Supabase query), add:
  ```ts
  // Only return malls that are safe for production.
  const { data } = await supabase
    .from('malls')
    .select('*')
    .in('link_clearance', ['GREEN', 'RED']);  // YELLOW never fetched in prod
  ```
  This is a defence-in-depth measure. Even if a row is accidentally set to YELLOW, the query excludes it.
- [ ] **P3-9.** **Badge component:** A single `<SourceBadge badge={type} clearance={clearance} />` component that renders the correct icon + label + link behaviour based on the rules in §1.2.
- [ ] **P3-10.** Mobile responsiveness: test every page at 320 px, 375 px, 414 px. No horizontal scroll. Tap targets ≥ 44 px.

### 4.2 Exit criteria

- All 6 static routes return 200.
- All GREEN `/parking/[slug]` routes return 200 with a rendered CTA.
- At least one RED `/parking/[slug]` route returns 200 with the "not yet available" message and **no `<a href>` to the parking source**.
- `grep -r "YELLOW" src/` returns zero hits in production code paths (YELLOW handling exists only in admin / staging config).
- 3-device mobile test passes on all 6 static pages + 3 `/parking/[slug]` pages.

---

## 5. Phase 4 — Link Health, Analytics, SEO

**Objective:** The product is observable. Dead links are caught. Clicks are measured. Search engines can index.

**Entry criteria:** Phase 3 complete. All pages functional.

**Time estimate:** 1 day.

### 5.1 Task list

- [ ] **P4-1.** **Link Health Monitor cron:**
  - Daily at 03:00 SGT.
  - For each `source_url` in `malls` WHERE `link_clearance = 'GREEN'`: HTTP GET, timeout 10 s, max body 1 024 B, follow ≤ 3 redirects, UA `JBFlowHealthCheck/1.0`.
  - Record: final status, final URL, response time, redirect chain.
  - 200 → `is_active = true`, update `last_checked_at`.
  - 301/302 → log redirect chain, flag for manual review.
  - 404 / 5xx / timeout → `is_active = false`; if 2 consecutive cycles fail, send Slack / email alert.
  - ~30 lines of Node. Deploy as Vercel Cron or a tiny GitHub Actions cron.
- [ ] **P4-2.** **PostHog (or Plausible) install:**
  - Init on client.
  - Wire events: `parking_click`, `checkpoint_click`, `navigation_click`, `rt_click`, `page_view`.
  - Properties per §9.3 of plan.md.
  - Exclude `JBFlowHealthCheck/1.0` UA from analytics (server-side middleware or a PostHog filter).
- [ ] **P4-3.** **SEO per page:**
  - Unique `<title>` + `<meta description>` for every route.
  - JSON-LD:
    - `/` → `WebPage`
    - `/parking/[slug]` → `ShoppingCenter` + `Place` (NOT `Product`)
    - `/border` → `WebPage` + `Place` per checkpoint
    - `/rts` → `WebPage` + `Place` per station
    - `/about` → `WebPage` + `Organization`
  - `sitemap.xml` generated (Next.js `generateStaticParams` or `next-sitemap`).
  - `robots.txt` allows all, points to sitemap.
- [ ] **P4-4.** **PWA manifest + service worker:**
  - `manifest.json`: name, short_name, theme_color, icons (192, 512).
  - Service worker: offline shell (cache home + list pages). No data caching of third-party content.
  - QR code on home page (generated from production URL).
- [ ] **P4-5.** **Analytics dashboard:**
  - PostHog dashboard: daily sessions, outbound clicks by type, top-5 clicked malls, repeat-user count, organic referral share.
  - Set up a weekly digest email (or a Monday-morning check-in).

### 5.2 Exit criteria

- Cron runs successfully at least once; `link_health` table has rows.
- PostHog shows `page_view` events after a manual test.
- `curl -I https://{domain}` returns 200 with correct `Content-Type`.
- `sitemap.xml` is reachable and lists all 16 URLs.
- JSON-LD validates on [validator.schema.org](https://validator.schema.org).

---

## 6. Phase 5 — QA, Deploy, Go-Live

**Objective:** The product is public. The QR code is printed / shared. The experiment starts.

**Entry criteria:** Phase 4 complete. All GREEN links pass health check.

**Time estimate:** 0.5 day.

### 6.1 Task list

- [ ] **P5-1.** **Broken-link sweep:** manually click every outbound link on every page. Confirm no 404, no interstitial, no "page not found" on the target.
- [ ] **P5-2.** **3-device mobile test:** Android (Chrome / Samsung Internet), iOS (Safari), one older device (Android 11 or older). Confirm PWA install prompt appears, offline shell works, all CTAs are tap-accurate.
- [ ] **P5-3.** **Load test:** 100 concurrent users (k6 or Lighthouse CI). Expect no issue (static + Supabase free tier). Document result.
- [ ] **P5-4.** **Go-live checklist (final):**
  - [ ] HTTPS valid, domain pointed, no mixed-content warnings.
  - [ ] No console errors on any page.
  - [ ] PostHog receiving events.
  - [ ] Link health cron has run ≥ 1 cycle.
  - [ ] `/about` disclaimer is live and correct.
  - [ ] RTS page has no hard-coded date.
  - [ ] No YELLOW row is visible in production (query Supabase directly to confirm).
  - [ ] RED malls show name + "not yet available" with no `<a href>` to the blocked source.
  - [ ] QR code on home page scans to production URL.
- [ ] **P5-5.** **Domain & registration (parallel track, not a code gate):**
  - If not yet done: register `.my` or `.com` domain.
  - SSM registration (if not done): file a sole-proprietor or SDN BHD. Not a code gate; is a public-launch gate.
  - Trademark / MyIPO: check "JB FLOW" for class 38 (telecom / data) + class 9 (software). File if clear. Not a code gate.
  - App Store / Play Store name reservation: do NOT register yet. v1 is a PWA. Revisit in Phase 2+.
- [ ] **P5-6.** **Distribution day 1:**
  - Post the QR code + one-sentence pitch in 2–3 community groups (WhatsApp / Facebook / Telegram).
  - First TikTok / Reels: 15 s, *"去 JB mall 之前，parking 去哪裡看？→ 掃 QR."*
  - No paid ads. No link spam. One link, one sentence.

### 6.2 Exit criteria

- Production URL is live, stable, and indexed.
- PostHog shows ≥ 10 `page_view` events on Day 1.
- Link health cron ran without alert.
- No YELLOW in production. Confirmed.

---

## 7. Phase 6 — KPI Gate (Weeks 1–4 Post-Launch)

**Objective:** Answer the one question: *"Does the user form the habit?"*

**Entry criteria:** Phase 5 complete. Product is live.

**Time estimate:** 4 weeks of observation + 1 day of analysis. No new code (unless a critical bug is found).

### 7.1 Task list

- [ ] **P6-1.** **Weekly check (every Monday):**
  - Open PostHog dashboard.
  - Record: total sessions, outbound click count, click-through rate, repeat-user count, organic referral sessions.
  - Note any link-health alerts and resolve.
- [ ] **P6-2.** **Week 3 checkpoint:**
  - Is organic search traffic showing a positive slope? (Not a one-off spike. Look at the 3-week trend.)
  - Is click-through rate ≥ 30 %?
  - Are any malls getting > 50 % of all parking clicks? (Concentration risk.)
- [ ] **P6-3.** **Week 4 decision gate:**

| Signal | Threshold | Status |
|---|---|---|
| Parking click-through rate | ≥ 30 % of `/parking` sessions produce ≥ 1 outbound click | ☐ |
| Repeat rate (4-week window) | ≥ 15 % of users return | ☐ |
| Organic slope | Positive for 3 consecutive weeks | ☐ |

- **All three pass →** proceed to Phase 7 (start Phase 2 product: Traffic API).
- **Click-through < 15 % AND repeat < 5 % →** the link layer is not solving the decision problem. Pivot entry point or stop. Document what was learned.
- **Click-through healthy, repeat flat →** product value is confirmed; distribution is the problem. Fix acquisition (TikTok cadence, community seeding, RTS event timing). Do NOT kill.
- [ ] **P6-4.** **If GREEN is confirmed, add 1–2 more malls** to the directory (Sutera Mall, AEON Bukit Indah, KOMTAR — whichever were YELLOW and are now clearable). Do not exceed 12 total in the first 8 weeks.

### 7.2 Exit criteria

- A written 1-page memo: *"KPI gate result: PASS / FAIL / PIVOT / FIX-DISTRIBUTION."*
- If PASS: Phase 7 entry is authorised.
- If FAIL: project is paused; 1-page post-mortem filed.

---

## 8. Phase 7 — Traffic API (Product Phase 2)

**Objective:** Pull LTA DataMall live data. Show Woodlands / Tuas status on-page.

**Entry criteria:** Phase 6 KPI gate passed.

**Time estimate:** 4–6 weeks (gated by Phase 6).

### 8.1 Task list

- [ ] **P7-1.** Register LTA DataMall account. Obtain Account Key.
- [ ] **P7-2.** Ingest Traffic Images (Woodlands Causeway, Woodlands Checkpoint, Tuas Second Link, Tuas Checkpoint). Cache with 5-min TTL.
- [ ] **P7-3.** Ingest Traffic Speed Bands + Incidents for the Woodlands / Tuas corridors.
- [ ] **P7-4.** On-page checkpoint status: simple visual (green / amber / red dot + "Light" / "Moderate" / "Heavy"). No composite score yet.
- [ ] **P7-5.** Fallback: if API is down, show the OneMotoring link (the v1 behaviour).
- [ ] **P7-6.** Rate-limit: cache responses server-side. Do not call LTA API from the client.

### 8.2 KPI for Phase 7

- 10 000 MAU **or** 5 000 monthly parking clicks (whichever first).
- Checkpoint on-page views > outbound camera clicks (users are staying on JB Flow longer).

---

## 9. Phase 8 — Mall Partnerships (Product Phase 3)

**Objective:** 2–3 official read-only parking feeds. "Official Partner" badge.

**Entry criteria:** Phase 7 KPI met. ≥ 1 000 monthly outbound clicks to mall parking pages.

**Time estimate:** 12–24 weeks (sales cycle).

### 9.1 Task list

- [ ] **P9-1.** Compile per-mall click data from PostHog: *"X drivers clicked through to {Mall} parking last month."*
- [ ] **P9-2.** Draft the partnership pitch (use template in §14.2 of plan.md).
- [ ] **P9-3.** Target list (priority):
  1. Malls with existing live parking (if Mid Valley clearance is resolved, or any other 🟢).
  2. Single-operator groups (AEON, KSL / Sunway) — one conversation, multiple properties.
  3. Malls adjacent to RTS / transit nodes.
- [ ] **P9-4.** Legal review of any partnership agreement before signing. Formal opinion (not the P1 first-pass).
- [ ] **P9-5.** Build the "Official Partner" badge + on-page live number display.
- [ ] **P9-6.** B2B contact form on `/about`.

### 9.2 KPI for Phase 8

- ≥ 2 official feeds live.

---

## 10. Phase 9 — RTS Live Layer (Product Phase 4)

**Objective:** When RTS is officially operational, JB Flow shows live train status, connections, covered-walking routes, bus links.

**Entry criteria:** Official RTS operational announcement. (No hard-coded date.)

**Time estimate:** 4–6 weeks around the launch window.

### 10.1 Task list

- [ ] **P10-1.** Monitor official RTS / JTC channels for the operational announcement.
- [ ] **P10-2.** Pre-build the RTS live page (status, connections, walking routes) so it is ready to switch on.
- [ ] **P10-3.** Remove all "subject to official operational announcement / 以官方最終運營公告為準" copy **only on the day of the official announcement.** Before that day, the copy stays.
- [ ] **P10-4.** Social push: "RTS is live — here's how to get from Bukit Chagar to City Square / JB Sentral / bus / car."
- [ ] **P10-5.** Integrate BAS.MY bus connections to Bukit Chagar / JB Sentral.

### 10.2 KPI for Phase 9

- RTS page session share > 20 % of total traffic in the first 2 weeks post-launch.

---

## 11. Phase 10 — Area Friction Intelligence (Product Phase 5)

**Objective:** Area-level Friction Score for 6–10 JB zones.

**Entry criteria:** Phase 9 complete. ≥ 2 official parking feeds. LTA data in production for ≥ 6 months (historical base).

**Time estimate:** 6–12 months post-launch.

### 11.1 Task list

- [ ] **P11-1.** Define 6–10 zones (e.g., Austin, Mountbatten, City Square, Skudai, Tanjung Puteri, Senai corridor, etc.).
- [ ] **P11-2.** Composite score: traffic (LTA) + parking (partner feeds) + crowd (if available) + incidents (LTA) + weather (open API).
- [ ] **P11-3.** 👍 / 👎 feedback loop on each zone page.
- [ ] **P11-4.** Validate: do user feedbacks correlate with actual observed conditions?

### 11.2 KPI for Phase 10

- Friction Score accuracy validated by ≥ 1 000 👍 / 👎 signals.

---

## 12. Phase 11 — Predictive Layer (Product Phase 6)

**Objective:** Time-based prediction. B2B API.

**Entry criteria:** Phase 10 validated. ≥ 6 months of historical data.

**Time estimate:** 12+ months.

### 12.1 Task list

- [ ] **P12-1.** Time-series model per zone / checkpoint.
- [ ] **P12-2.** "Likely easier after 10:30 pm" — simple, honest, labelled as prediction.
- [ ] **P12-3.** B2B API: `GET /api/johor/areas/[slug]/status` with API key + rate limit.
- [ ] **P12-4.** Native app build (iOS / Android) if MAU > 50 000 and distribution data justifies it.

---

## 13. Phase Summary (one-glance view)

| Phase | What | Gate to enter | Gate to exit | Effort |
|---|---|---|---|---|
| **1** | Source audit + legal clearance | plan.md v0.2 accepted | ≥ 4 GREEN entries | 1–2 days |
| **2** | Repo init + schema | Phase 1 pass | Skeleton deploys | 0.5 day |
| **3** | Core build (pages, components) | Phase 2 complete | All 16 routes functional | 2 days |
| **4** | Link health + analytics + SEO | Phase 3 complete | Cron runs, events fire, sitemap valid | 1 day |
| **5** | QA + deploy + go-live | Phase 4 complete | Live, 10 sessions on Day 1 | 0.5 day |
| **6** | KPI gate (4 weeks) | Phase 5 complete | PASS / FAIL / PIVOT decision | 4 weeks |
| **7** | Traffic API | Phase 6 PASS | 10 k MAU or 5 k clicks | 4–6 weeks |
| **8** | Mall partnerships | Phase 7 KPI | ≥ 2 official feeds | 12–24 weeks |
| **9** | RTS live layer | Official RTS announcement | RTS page > 20 % traffic share | 4–6 weeks |
| **10** | Friction Score | Phase 9 + 6 mo data | 1 k feedback signals | 6–12 months |
| **11** | Predictive + B2B API | Phase 10 validated | B2B API live | 12+ months |

---

## 14. Immediate Next 48 Hours

This is the only thing that matters right now:

```
TODAY + TOMORROW
──────────────────────────────────────────────────
 1. Open 5 YELLOW URLs on desktop + 3 phones.
 2. Read ToS for each. Assign GREEN or RED.
 3. Confirm 2 Border links (LTA OneMotoring) = GREEN.
 4. Count.
    ≥ 4 GREEN total  →  Phase 2 starts tomorrow.
    < 4 GREEN        →  spend day 3 on remaining YELLOWs,
                        or accept 3 parking + 2 border = 5.
 5. If ≥ 4: `git init`, scaffold, seed Supabase,
    deploy "Hello, JB Flow". Phase 2 → Phase 3.
──────────────────────────────────────────────────
```

No new product decisions. No new features. No scope changes.
The plan is locked. The only open question is **which 4 URLs are GREEN.**

---

*End of Execution Plan v0.1 — JB FLOW*
