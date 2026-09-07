# JB FLOW — Plan

## Link-First Singapore ↔ Johor Mobility Decision Platform
### New-Malaysia Cross-Border + Johor Bahru Real-Time City Status Entry Point

**Document type:** Product & Engineering Plan
**Version:** 0.2 — Lean MVP (revised)
**Date:** September 2026
**Status:** Working draft. Trademark, SSM, MyIPO, domain, and App Store / Play Store name checks are outstanding before any public launch.

---

## 0. One-Line Summary

> Before you go, JB Flow tells you where to check.

**What v1 is not, stated first:** v1 is not the final JB Flow product. v1 is a single validation experiment: *can JB Flow become the thing a Singapore driver or JB local opens the moment they decide to leave the house?*

The habit we are testing:

- "去 Mid Valley？先開 JB Flow。"
- "過關？先開 JB Flow。"
- "去 KSL 之前 parking 去哪裡看？先開 JB Flow。"

If that loop forms, the subsequent API integrations, parking partnerships, RTS live layer, and Friction Score become justified investments. If it does not, no downstream build is worth starting.

**What v1 is, stated second:** a curated, fast, mobile-first entry point that routes Singapore ↔ Johor drivers and JB locals to the official live sources they already need but currently cannot find without five separate searches. It does not own data. It does not scrape. It does not run an AI model. It is a link layer.

The product answers one question:

> "Do I even need to go there right now, and where do I look?"

---

## 1. Problem

### 1.1 The real problem is not missing data

The data already exists. It is scattered.

A Singapore driver who wants to check Woodlands vs. Tuas traffic before entering JB, then check parking at a JB mall, then navigate, currently opens:

| Need | Where they look today |
|---|---|
| Woodlands / Tuas live traffic | LTA OneMotoring, or a random Telegram group |
| Checkpoint queue visual | A Facebook post, or a checkpoint camera app |
| Mall live parking | The mall's own website or app (if it exists) |
| Parking rates / entrance info | Google → mall website → "Getting Here" sub-page |
| Bus arrival | BAS.MY app or data.gov.my GTFS feed |
| RTS status | RTS official site or social media |
| Navigation | Waze / Google Maps |
| Rain / weather | A separate weather app |
| "Is it worth going?" | A WhatsApp group, or a gut feeling |

No single surface unifies this. The user is the integrator.

### 1.2 The existing apps solve part of this

- **Waze / Google Maps** — *how do I get there?*
- **Checkpoint camera apps** (e.g. JB SG Checkpoints & Traffics, 50 k+ Play downloads) — *what does the checkpoint look like?*
- **Mall official sites / apps** — *is there parking right now?*
- **BAS.MY / data.gov.my** — *when is the next bus?*
- **Parkaholic.sg** — parking aggregator, Singapore-centric.

None of them answer:

> "Should I go there now, and where do I check?"

### 1.3 The decision gap

The user does not need another data stream. The user needs a **decision entry point** that says:

- Woodlands is live-heavy right now; Tuas looks lighter.
- Mid Valley Southkey has live parking — check here.
- KSL has no live parking source — check here for info.
- Waze is the right tool for the actual drive.

That is the gap.

---

## 2. Strategy: Link-First

### 2.1 Core principle

> **Link what you cannot own. Source what you can verify. Partner after you have leverage.**

Phase 1 is a link aggregator, not a data platform.

For every information category (parking, checkpoint, RTS, bus), JB Flow identifies the best official source and routes the user to it. JB Flow does not proxy, cache, or re-display the data. The user clicks through to the origin.

This is a deliberate choice, not a limitation.

### 2.2 Why not build the data layer first

The original proposal considered pulling live parking numbers, MBJB CCTV feeds, crowd sensors, and LTA API data into a unified scoring engine. That path requires:

- MBJB CCTV redistribution rights (unconfirmed).
- Mall parking API access (unconfirmed; most malls do not expose a public API).
- LTA DataMall Account Key and rate-limit planning.
- A scoring model with uncertain inputs.
- Legal review of scraping terms.

Any one of these can stall the project for 2–6 months. The result is zero users and a technical proof-of-concept nobody has validated.

The Link-First path removes every dependency:

| Dependency | Required in v1? |
|---|---|
| MBJB camera permission | No |
| Mall parking API | No |
| Web scraping / emulator / OCR | No |
| LTA DataMall API key | No (link to OneMotoring instead) |
| Crowd / parking sensors | No |
| AI / ML model | No |
| User login / account | No |
| Native app build | No (PWA only) |
| B2B sales cycle | No |
| Paid API costs | ≈ RM 0 |

### 2.3 The upgrade path

| Phase | JB Flow does | User sees |
|---|---|---|
| 1 — Link | Routes to official sources | "View Mid Valley parking →" (click-out) |
| 2 — Traffic API | Pulls LTA DataMall live data | Woodlands / Tuas status on-page |
| 3 — Mall partnership | Official read-only feeds | Live parking numbers in JB Flow |
| 4 — Checkpoint intelligence | Composite pressure score | "Woodlands 91 / 100 — try Tuas" |
| 5 — Area intelligence | Friction Score per zone | "Austin 84 — Difficult now" |
| 6 — Predictive layer | Time-based prediction | "Likely easier after 10:30 pm" |

Each phase is gated by the KPIs in §12. No phase starts before the previous one has demonstrated user habit.

---

## 3. MVP Scope (v0.1)

### 3.1 In scope

| Module | What it does in v1 |
|---|---|
| Mall Parking | Directory of 10 JB malls. For each: best official parking source (live web / app / info page / none). Click-through to origin. |
| SG → JB Checkpoint | Two links: Woodlands live camera (LTA OneMotoring), Tuas live camera (LTA OneMotoring). Plus "Open Waze" / "Open Google Maps". |
| RTS | Placeholder page with official RTS links, station info, and "coming soon" for live layer. All timing copy reads *subject to official operational announcement / 以官方最終運營公告為準.* |
| Public Transport | Link to BAS.MY / data.gov.my GTFS. Minimal. |

### 3.2 Out of scope (explicitly)

Do not build any of the following in v1:

- Social feed / chat / carpool / ride-share
- Restaurant or food discovery
- Coupon / merchant marketplace
- AI chatbot or "smart assistant"
- Turn-by-turn navigation (Waze / Google Maps owns this)
- Scraping, emulators, OCR, headless-browser harvesting
- Area Friction Score (insufficient input data in v1)
- Predictive / historical modelling
- User accounts, login, push notifications
- Native iOS / Android build
- B2B dashboard
- Multi-language UI (EN + BM only; add 中文 later if demand shows)

### 3.3 The one product sentence for v1

> JB Flow is a fast, mobile-first page that tells Singapore drivers and JB locals where to check before they leave: parking, border traffic, RTS, and navigation — all official sources, in one place, in two seconds.

### 3.4 The one sentence to tell a developer

> v1 is not the final JB Flow. It is a one-week experiment: does the user form the habit "I open JB Flow before I leave the house"? If yes, every downstream build is justified. If no, we stop and learn.

---

## 4. Module 1 — Mall Parking (Primary Hook)

### 4.1 Why parking is the strongest entry point

- It is the highest-friction, highest-frequency question a driver asks before entering a mall: "Is there a space?"
- Mid Valley Southkey already publishes live remaining parking on its official website, stated to refresh every 10 seconds with ~30 s tolerance. This proves the demand and the data existence.
- Other JB malls (KSL, Toppen, Paradigm, AEON Tebrau City, City Square) have at minimum official parking information pages (rates, entrances, maps).
- The pain is universal: weekends, public holidays, school holidays, rainy afternoons, Singapore visitors.
- No existing app aggregates all JB malls in one list with source clarity.

### 4.2 Source Badge System

Every mall entry carries a badge that tells the user exactly what kind of information they will find:

| Badge | Meaning | User action |
|---|---|---|
| 🟢 Official Live | Mall's own system shows real-time remaining spaces on a public web page. | "View Live Parking" → opens mall page. |
| 📱 Official App | Live data exists only inside the mall's own mobile app. | "Open App" → deep link to store, or link to store listing. |
| 🔵 Official Info | Parking rates, entrance/exit maps, hours. No live count. | "View Parking Info" → opens mall page. |
| ⚪ No Live Source | No public real-time parking data found. | "Mall Website" → opens homepage. |
| 🤝 Official Partner (post-v1) | Mall provides a read-only feed to JB Flow. Numbers shown on-page. | In-app display. |

**Critical rule:** Never fake a uniform format. Do not display a single number for a mall that does not have live data. Honesty of the badge is the product.

### 4.3 First 10 Malls

| # | Mall | Expected v1 Badge | Notes |
|---|---|---|---|
| 1 | Mid Valley Southkey | 🟢 Official Live | Live parking on official site; 10 s refresh. First entry to build. |
| 2 | KSL City | 🔵 Official Info | Parking areas (basement, L3–6), entrance info on site. |
| 3 | JB City Square | ⚪ / 🔵 TBD | Verify whether live parking is published. If not, ⚪. |
| 4 | Toppen | 🔵 Official Info | Full parking rates on site. |
| 5 | AEON Tebrau City | 🔵 Official Info | Confirm source. |
| 6 | Paradigm Mall JB | 🔵 Official Info | Has a dedicated "Carpark Ingress & Egress" page. |
| 7 | Sutera Mall | 🔵 / ⚪ TBD | Confirm. |
| 8 | AEON Bukit Indah | 🔵 / ⚪ TBD | Confirm. |
| 9 | KOMTAR / JBCC | 🔵 / ⚪ TBD | Confirm. |
| 10 | Sunway Big Box | 🔵 / ⚪ TBD | Confirm. |

Each entry requires manual verification of the source URL and badge type within 30 minutes. This is a one-time task per mall, re-checked every 2 weeks via the Link Health Monitor (§8.3). **This verification pass is where the real time goes — not the code.** Budget 1–2 person-days for the 10-mall source audit, separate from the 5–6 dev-days.

### 4.4 Mall Detail Page Layout

    [ Back ]                          JB FLOW

    ┌──────────────────────────────────────────┐
    │  Mid Valley Southkey                          │
    │      🟢 Official Live Parking                   │
    │                                               │
    │  Live remaining spaces are published on       │
    │  the mall's official website.                 │
    │      (Stated refresh: every 10 s.)             │
    │                                               │
    │      [ View Live Parking → ]                    │
    │                                               │
    │      ─────────────────────────────────────     │
    │  Also available:                               │
    │      📍 Waze                  [ Navigate ]        │
    │      🗺️  Google Maps           [ Navigate ]        │
    │      🅿️   Parking rates & entrance (if any)      │
    │      🚗  From Woodlands      ~18 min (live)       │
    │      🚗  From Tuas           ~22 min (live)       │
    │                                               │
    │  Last verified: 2026-09-06                    │
    └──────────────────────────────────────────┘

### 4.5 Parking List Page Layout

    JB FLOW — Mall Parking
    ──────────────────────────────────────
    🟢 Mid Valley Southkey    View Live →
    🔵 KSL City               View Info →
    🔵 Toppen                 View Info →
    🔵 Paradigm Mall JB       View Entrance →
    ⚪ City Square            Mall Site →
    🔵 AEON Tebrau City       View Info →
    ...

    Sort: [ Distance ] [ Name ] [ Source type ]
    Filter: [ Live only ] [ All ]

### 4.6 No-Login, No-Tracking-Consent-Heavy

v1 requires no login. No cookie wall. No "sign up for alerts". The user opens the page, scans the list, clicks through, leaves. That is the entire interaction.

---

## 5. Module 2 — SG → JB Checkpoint

### 5.1 What v1 does

Two links. One for each border.

    JB FLOW — SG → JB
    ──────────────────────────────────────
    🚘 Woodlands
    📹  LTA Official Live Traffic Camera
         [ View Woodlands Camera → ]    ← LTA OneMotoring

    🚘 Tuas
    📹  LTA Official Live Traffic Camera
         [ View Tuas Camera → ]         ← LTA OneMotoring

    🧭 Navigation
         [ Open Waze ]      [ Open Google Maps ]

    ℹ️  LTA cameras refresh every 1–5 min.

### 5.2 Why not build a composite "Pressure Score" in v1

The original proposal defined a Checkpoint Pressure Score (camera 25 %, approach speed 30 %, incident 15 %, historical 20 %, weather 10 %). That is the right model eventually, but in v1:

- LTA DataMall requires an Account Key and rate-limit planning.
- The user can see the camera themselves in 2 seconds.
- A score without a track record is less trusted than a link to the official camera.

The upgrade to an on-page score happens in Phase 3 (§11), after the link-based version has proven traffic.

### 5.3 LTA Data (confirmed available, for future phases)

LTA DataMall publicly provides:

- **Traffic Images** — real-time cameras, incl. Woodlands Causeway, Woodlands Checkpoint, Woodlands Flyover, Second Link at Tuas, Tuas Checkpoint. Stated refresh 1–5 min.
- **Traffic Incidents**
- **Traffic Speed Bands**
- **VMS / EMAS traffic advisories**

Access requires a registered Account Key. This is the Phase 2 data integration.

---

## 6. Module 3 — RTS (Placeholder)

### 6.1 v1 scope

A single informational page. All timing language is conditional and defers to the operator:

    JB FLOW — RTS
    ──────────────────────────────────────
    🚆 RTS Link
       Woodlands North ↔ Bukit Chagar
       Passenger service: target end-2026
         (Subject to official operational
          announcement / 以官方最終運營公告為準)
        Source: official RTS / JTC announcements

         [ Official RTS Page → ]
         [ Official Schedule → ]

       Status: Under construction
        (Exact opening date subject to
         official operational announcement)

    ℹ️  When RTS is operational, this page will show:
         • Live train status
         • Bukit Chagar ↔ City Square / JB Sentral connections
         • Covered walking routes
         • Bus connections (BAS.MY)
         • Pickup / drop-off guidance

    ℹ️  All timings on this page are indicative only
       and subject to official operational
       announcement. 以官方最終運營公告為準.

### 6.2 RTS as an acquisition event

RTS launch is a press and traffic-spike event. The target window is end-2026, but **the page must not hard-code any specific date.** All copy reads "subject to official operational announcement / 以官方最終運營公告為準" so the page remains correct even if the official opening shifts by a quarter.

By the time RTS goes live, JB Flow should already have:

- A registered domain.
- 1–2 k monthly users from the parking + checkpoint entry points.
- A ready-to-publish "RTS is live" content push on TikTok / social.

The RTS page is the Phase 4 build (after checkpoint API integration). It should not be the first thing built.

---

## 7. Module 4 — Public Transport (Minimal)

    JB FLOW — Public Transport
    ──────────────────────────────────────
    🚌 BAS.MY Johor
         [ Open BAS.MY App → ]
         [ GTFS Realtime feed → ]     (data.gov.my)

    ℹ️  21 routes, ~988 stops.
       Feed has known validation / ID quality issues;
       treat as informational, not authoritative ETA.

No on-page rendering in v1. Link out only.

---

## 8. Technical Architecture (v1)

### 8.1 Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 14+ (App Router) | SSR for SEO, fast first paint, PWA-ready. |
| Language | TypeScript | Type safety, team familiarity. |
| Styling | Tailwind CSS | Fast to build, consistent, no CSS framework overhead. |
| App format | PWA (not native) | Scan QR → open. No 87 MB download. No store approval delay. |
| Database | Supabase (PostgreSQL) | Free tier sufficient for v1. No PostGIS needed yet. |
| Hosting | Vercel | Zero-config deploy for Next.js. CDN global. |
| Analytics | PostHog (or Plausible) | Self-hostable, privacy-friendly, enough for click tracking. |
| Link health | Cron + lightweight HTTP GET | Daily automated check of all outbound URLs. See §8.3. |
| CI/CD | GitHub Actions | Auto-deploy on merge. |
| Map | None in v1 | No map widget needed. Waze / Google Maps handle navigation. |

### 8.2 Why no database complexity in v1

The entire v1 database is static content (mall entries, link URLs, badges, verified timestamps). A flat JSON file or a single Supabase table with ~20 rows is sufficient. No ingestion pipeline. No real-time subscription. No Redis.

The architecture scales outward (more malls, more links), not inward (more data velocity).

### 8.3 Link Health Monitor

Use **lightweight GET**, not HEAD. Many production servers (CDNs, WAFs, some mall CMS backends) return anomalous status codes or empty bodies for HEAD requests while serving GET correctly. A HEAD-based health check produces false 404s that generate alert noise and erode trust in the monitor.

    Cron (daily, 03:00 SGT):
      For each source_url in DB:
        HTTP GET
          timeout: 10 s
          max body read: 1 024 bytes    ← do not download full HTML
          headers:
            Accept: text/html
            User-Agent: "JBFlowHealthCheck/1.0"
          follow redirects: true (max 3 hops)
          record: final status, final URL, response time, redirect chain

         200      → mark active, update last_checked_at
         301/302  → record redirect chain, flag for manual review
         404/5xx  → mark inactive, alert team (Slack / email)
        timeout    → mark "unknown", retry next cycle
         > 1 024 B → truncate; do not buffer full response

This is ~30 lines of Node.js. It prevents the "link rot" problem that kills directory products.

**Design notes:**

- Cap body read at 1 KB via `response.on('data', …)` with an early `destroy()` or an `AbortController` timeout. Do not pipe the full HTML into memory.
- Log the redirect chain (URL + status at each hop) so a 301 → 200 chain is auditable without a second request.
- Exclude the health-check UA (`JBFlowHealthCheck/1.0`) from the analytics layer so it does not pollute visitor counts.
- Alert threshold: any URL that fails 2 consecutive cycles (48 h) triggers a Slack / email alert. Single-cycle failures are logged but not alerted (transient CDN / network blips).

### 8.4 Estimated v1 build time

| Task | Effort |
|---|---|
| Next.js scaffold + Tailwind + PWA config | 0.5 day |
| DB schema (malls, source registry) + 10 entries | 0.5 day |
| Home / Parking / Mall Detail / Checkpoint / RTS pages | 2 days |
| Link Health Monitor cron (lightweight GET) | 0.5 day |
| Analytics (PostHog, outbound click events) | 0.5 day |
| SEO: meta tags, structured data, per-mall landing page | 1 day |
| **10-mall source verification pass (manual, not code)** | **1–2 days** |
| Mobile responsiveness + PWA manifest + QR code | 0.5 day |
| QA, deploy, go live | 0.5 day |
| **Total** | **≈ 7–8 person-days** |

One developer can ship v1 in one to one-and-a-half weeks. The source-verification pass is the step most likely to slip — budget it explicitly rather than folding it into "populate 10 rows."

---

## 9. Database Schema (v1)

### 9.1 malls

    CREATE TABLE malls (
      id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name                TEXT NOT NULL,
      slug                TEXT UNIQUE NOT NULL,
      lat                 DECIMAL(9, 6),
      lng                 DECIMAL(9, 6),
      official_website    TEXT,

       -- Parking source
      parking_source_type  TEXT NOT NULL
                           CHECK (parking_source_type IN
                                 ('official_live_web',
                                  'official_app',
                                  'official_info',
                                  'none')),
      parking_source_url   TEXT,
      parking_app_ios      TEXT,
      parking_app_android  TEXT,
      parking_info_url     TEXT,

       -- Navigation shortcuts
      waze_url            TEXT,
      gmaps_url           TEXT,

       -- Meta
      display_order       INT DEFAULT 999,
      last_verified_at    TIMESTAMPTZ,
      verified_by         TEXT,

      created_at          TIMESTAMPTZ DEFAULT now(),
      updated_at          TIMESTAMPTZ DEFAULT now()
    );

### 9.2 link_health

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

### 9.3 Click Events (analytics, in PostHog, not in Supabase)

Tracked events:

| Event | Properties |
|---|---|
| parking_click | mall_slug, source_type, from_page |
| checkpoint_click | checkpoint_name (woodlands / tuas) |
| navigation_click | tool (waze / gmaps), origin_page |
| rt_click | page_name |
| page_view | page_path, referrer |

These are the only metrics that matter in v1 (see §12).

---

## 10. Page Inventory (v1)

| Route | Purpose |
|---|---|
| / | Home: three tiles — Parking / Border / RTS. One sentence: "Before you go." |
| /parking | Mall parking list, filterable, sortable. |
| /parking/[slug] | Individual mall detail page (SEO landing page). |
| /border | Woodlands + Tuas camera links + navigation links. |
| /rts | RTS placeholder + official links. All timing copy: *subject to official operational announcement / 以官方最終運營公告為準.* |
| /transport | BAS.MY / GTFS links. |
| /about | What JB Flow is, data-source disclaimer, contact. |

Total: 6 static pages + 10 dynamic `/parking/[slug]` pages = 16 URLs. That is the entire v1 product.

---

## 11. Phased Roadmap

### Phase 1 — Official Link Aggregator (0 → 4 weeks)

- Build: 6 pages + 10 malls + link health monitor (lightweight GET).
- KPIs: see §12. **No absolute visitor count is a go / no-go gate.** Behavioural signals (click-through rate, repeat rate, organic growth) determine progression.
- Cost: ≈ RM 0 (Vercel free tier + Supabase free tier).
- Team: 1 dev, part-time content / verification.

### Phase 2 — Traffic API (4 → 12 weeks, gated by Phase 1 KPIs)

- Build: LTA DataMall ingestion (Traffic Images, Speed, Incidents). On-page checkpoint status.
- KPI: 10 000 MAU **or** 5 000 monthly parking clicks (whichever first).
- Cost: Vercel Pro + Supabase Pro + LTA key (free registration).

### Phase 3 — Mall Partnerships (12 → 24 weeks)

- Build: 2–3 official read-only parking feeds. "Official Partner" badge. B2B contact form.
- Action: Pitch to malls with click data from Phase 1–2.
- KPI: ≥ 2 official feeds live.

### Phase 4 — RTS Live Layer (around RTS launch; timing subject to official operational announcement)

- Build: RTS status, Bukit Chagar connections, covered-walking graph, bus connections, pickup / drop-off guidance.
- Trigger: official RTS operational announcement. **Do not hard-code a calendar date in the plan or the UI.**

### Phase 5 — Area Friction Intelligence (6–12 months post-launch)

- Build: Area-level Friction Score (traffic, parking, crowd, incident, weather) for 6–10 zones.
- Parking / crowd inputs now partially official.
- KPI: Friction Score accuracy validated by user 👍 / 👎 feedback loop.

### Phase 6 — Predictive Layer (12+ months)

- Build: Time-based prediction. "Likely easier after 10:30 pm."
- Historical pattern per zone / checkpoint.
- B2B API: `GET /api/johor/areas/[slug]/status`

**Gating rule:** Do not start Phase N+1 until Phase N behavioural KPIs are met or the team has an explicit decision to proceed despite missing KPIs.

---

## 12. KPIs (v1 — Phase 1)

### 12.1 The go / no-go question

The v1 experiment asks one thing: *does the user form a habit?*

> "Next time I go to a JB mall, will I open JB Flow again?"

A new product without a distribution channel will have low absolute traffic in weeks 1–4. That is a marketing problem, not a product-validity problem. **Absolute visitor counts are therefore not used as a hard kill-switch.** Instead, the go / no-go gate is built from three behavioural signals:

| Signal | How to read it | Threshold to proceed to Phase 2 |
|---|---|---|
| **Parking click-through rate** | parking_outbound_clicks / total_sessions on /parking and /parking/[slug] pages | ≥ 30 % of sessions produce at least one outbound click |
| **Repeat rate** | Users with ≥ 2 sessions within a 30-day window, as a share of total users | ≥ 15 % of users return within 4 weeks of first visit |
| **Organic search growth** | Week-over-week new sessions from Google organic (referral = google / bing / etc.) | Positive slope for 3 consecutive weeks; not a one-off spike |

**Go condition (all three):** click-through ≥ 30 %, repeat ≥ 15 %, organic slope positive × 3 weeks → proceed to Phase 2.

**No-go condition:** If click-through < 15 % **and** repeat < 5 % after 6 weeks, the link layer is not solving the decision problem. Pivot the entry point (e.g. checkpoint-first, RTS-first) or stop.

**Caution condition:** If click-through is healthy but repeat is flat, the problem is distribution / habit-formation, not product value. Fix acquisition (TikTok cadence, community seeding, RTS event timing) before killing the project.

### 12.2 Supporting metrics (tracked, not gating)

| Metric | Month 1 expectation | Why we watch it |
|---|---|---|
| Total visitors | 1 000 – 5 000 (range, not target) | Context for click-through denominator. Low volume is expected with no paid channel. |
| Navigation outbound clicks | Track as % of sessions, not absolute | Proves users use JB Flow inside the decision chain, not just for parking. |
| Checkpoint outbound clicks | Track as % of /border sessions | Proves border use case. |
| Bounce rate | < 60 % | Users engage with at least one link. |
| Mobile traffic | ≥ 85 % | Validates PWA-first design; no desktop optimisation needed. |
| 7-day retention | ≥ 15 % | Complements the 4-week repeat rate. |

### 12.3 The one question that matters

> "Next time I go to a JB mall, will I open JB Flow again?"

If 15–25 % of Week-1 users return by Week 4, the hypothesis holds. If fewer than 5 %, it does not. This single ratio is the primary gate; everything else is context.

---

## 13. Growth & Distribution

### 13.1 SEO (primary channel, low cost)

Every mall gets a dedicated landing page with structured data. **Schema types are page-specific; do not apply a single schema to all pages.**

| Page type | Recommended JSON-LD type(s) | Rationale |
|---|---|---|
| Home (/) | `WebPage` | Generic entry point; no single entity to describe. |
| Mall detail (/parking/[slug]) | `ShoppingCenter` (or `LocalBusiness` as fallback) + `Place` | Describes a physical commercial venue. `ShoppingCenter` is the correct schema.org type for a mall. `Product` is **not** used — a parking info page is not a product for sale. |
| Border (/border) | `WebPage` + `Place` (per checkpoint location) | Checkpoints are locations, not products. |
| RTS (/rts) | `WebPage` + `Place` (per station) | Station locations. No `Product` or `Service` schema until an operational timetable is public. |
| /about | `WebPage` + `Organization` | Describes JB Flow itself. |

Target search queries:

- "Mid Valley Southkey parking"
- "KSL parking live"
- "JB mall parking availability"
- "Southkey car park how many spaces"
- "Tuas checkpoint traffic now"
- "Woodlands to Johor traffic"

These are long-tail, high-intent, low-competition queries. A well-structured PWA with SSR will rank within 4–8 weeks.

### 13.2 TikTok / Reels / Shorts (secondary channel)

Content format: 15-second vertical video.

- "去 Mid Valley 之前，parking 去哪裡看？→ JB Flow"
- "KSL 有沒有 live parking？→ JB Flow"
- "Woodlands / Tuas 官方 camera 在哪裡？→ JB Flow"
- "去 JB 之前 3 秒看一睇 → JB Flow"

Each video ends with a QR code pointing to the relevant JB Flow page. No download. No login.

### 13.3 Community seeding

- JB / Singapore cross-border Facebook groups.
- WhatsApp groups (e.g. "JB Munchers", "SG-JB commuters").
- One sentence: "I made a page that tells you which JB malls have live parking. Check before you drive there."
- No pitch. No link spam. Just the link.

### 13.4 RTS launch (event channel, timing subject to official operational announcement)

When and only when RTS is officially announced as operational:

- Pre-publish "RTS is live — here's how to get from Bukit Chagar to City Square / JB Sentral / bus / car."
- Push via all channels simultaneously.
- This is a media event, not a product launch. JB Flow rides the existing news cycle.
- **All copy on the RTS page and in the launch asset reads "subject to official operational announcement / 以官方最終運營公告為準" until the day of the official announcement.**

---

## 14. Partnership Strategy

### 14.1 Timing

Do not approach malls in Phase 1. Approach them after Phase 1 has generated measurable click data. The pitch changes fundamentally:

| Before (empty-handed) | After (with data) |
|---|---|
| "Can you give us your parking API?" | "We sent 48 000 drivers to your parking page last month." |
| Mall response: "Why?" | Mall response: "What can we get?" |

### 14.2 Pitch structure (Phase 3)

**Subject:** *Bring your live parking directly to JB drivers.*

**Body (short):**

> Your official parking information is already being discovered through JB Flow.
>
> Last month: **X** drivers clicked through to your parking page from JB Flow.
>
> We would like to display your availability directly in JB Flow using a read-only official feed.
>
> You get:
> - Free, high-intent driver discovery
> - "Official Partner" attribution on every display
> - Monthly analytics: traffic, peak periods, source-of-travel (SG vs. JB local)
>
> We get:
> - A read-only parking count feed (HTTP, 10–30 s cadence)
>
> No scraping. No data ownership transfer. Your data, your system, your attribution.

### 14.3 Priority targets for Phase 3

1. Malls that already have live parking (Mid Valley Southkey first — they proved the model).
2. Malls managed by a single operator (Aeon group, KSL / Sunway group) — one conversation covers multiple properties.
3. Malls adjacent to RTS / transit nodes (City Square, JB Sentral area).

Start with 2–3. Not 10.

---

## 15. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Link rot: a mall changes its parking URL / page structure. | High | Low | Daily lightweight GET health check (§8.3). Manual review within 48 h. |
| Mall blocks referer / hotlinking on parking page. | Medium | Low | User opens in new tab; browser handles it. No embedding in v1. |
| Waze / Google Maps adds a "JB mall parking" widget. | Medium | High | Not a threat in v1 (link directory). Threat in Phase 5+. Monitor. |
| LTA DataMall API key revoked / rate-limited. | Low | Medium (Phase 2+) | Cache strategy. Fallback to OneMotoring link. |
| Low absolute traffic in weeks 1–4. | High | **Not fatal** | Expected for a new product with no paid channel. Do **not** kill on visitor count alone. Judge on click-through rate, repeat rate, and organic growth slope (§12.1). |
| Legal / IP exposure from outbound links. | Low–Medium | Medium | v1 does not scrape, embed, cache, or re-render any third-party data. Legal exposure is **materially reduced but not zero**: outbound links may still implicate trademark display (mall names, logos if any), brand-presentation expectations, and deep-link / referral terms of the target site. Mitigations: (a) link to canonical official URLs only; (b) no logo or trademarked asset reproduced on JB Flow pages; (c) /about page states "JB Flow links to official sources; it does not own, modify, or embed the data displayed there"; (d) review deep-link terms for any mall that exposes an app URL; (e) legal counsel review before Phase 3 partnership conversations. |
| RTS delayed or timing shifts. | Medium | Low (timing only) | Phase 4 slides. Phase 1–3 unaffected. **All RTS timing copy reads "subject to official operational announcement / 以官方最終運營公告為準" so no page update is required.** |
| Competitor adds JB mall directory. | Medium | Medium | Speed. Be first. SEO moat. Click-history data. |

---

## 16. What v1 Is Not

This list is as important as the feature list.

- v1 is not a data platform. It is a link directory.
- v1 is not a smart-city product.
- v1 is not an AI product.
- v1 is not a navigation app.
- v1 is not a parking aggregator (in the Parkaholic sense of displaying numbers on its own domain).
- v1 does not scrape, embed, proxy, cache, or re-render any third-party data.
- v1 does not require user registration.
- v1 does not generate revenue.
- v1 does not have a Friction Score, a Pressure Score, or any computed metric.
- v1 is not a native app.
- v1 is not the final JB Flow product. It is a habit-validation experiment.

The moment any of the above becomes true, the project has moved into Phase 2 or later, and that transition must be a deliberate, KPI-gated decision — not a scope creep.

---

## 17. Engineering Checklist (v1 Ship List)

- [ ] Next.js 14+ project, App Router, TypeScript, Tailwind.
- [ ] PWA manifest, service worker (offline shell), QR code on home page.
- [ ] Supabase project, `malls` table, 10 rows populated with verified URLs and badges.
- [ ] `link_health` table + daily cron using **lightweight HTTP GET** (timeout 10 s, max body 1 024 B, follow redirects ≤ 3, alert on 2-consecutive-cycle failure).
- [ ] PostHog (or Plausible) installed; outbound click events wired on every link; health-check UA (`JBFlowHealthCheck/1.0`) excluded from analytics.
- [ ] 6 static pages + 10 dynamic `/parking/[slug]` pages.
- [ ] SEO per page:
   - Unique `<title>` and `<meta description>` for every URL.
   - JSON-LD structured data, **page-type-specific**:
     - Home → `WebPage`
     - Mall detail → `ShoppingCenter` (+ `Place`); **not** `Product`
     - Border → `WebPage` + `Place` per checkpoint
     - RTS → `WebPage` + `Place` per station
     - /about → `WebPage` + `Organization`
- [ ] Mobile-first layout. Test on 320 px viewport.
- [ ] Vercel deploy. Domain pointed. HTTPS.
- [ ] `sitemap.xml` + `robots.txt` generated.
- [ ] `/about` page: what JB Flow is, data-source disclaimer ("JB Flow links to official sources; it does not own, modify, or embed the data displayed there"), contact email.
- [ ] RTS page: all timing copy reads *"subject to official operational announcement / 以官方最終運營公告為準"*. No hard-coded date.
- [ ] Analytics dashboard: daily sessions, outbound clicks by type, top 5 clicked malls, repeat-user count, organic referral share.
- [ ] Go-live checklist: load test (100 concurrent users, expect no issue), broken-link sweep, mobile test on 3 devices.

Estimated total: 7–8 person-days including the 10-mall source-verification pass. One to one-and-a-half weeks to ship.

---

## 18. Cost Estimate (v1, Monthly)

| Item | Cost |
|---|---|
| Vercel (Hobby / Free) | RM 0 |
| Supabase (Free tier, < 500 MB DB, < 2 M queries) | RM 0 |
| PostHog (free tier) or Plausible (self-host) | RM 0 |
| Domain (.com or .my) | ≈ RM 50 / year |
| **Total** | **≈ RM 0 – 10 / month** |

No API costs. No scraping infrastructure. No emulator. No AI inference. No paid hosting.

---

## 19. Final Principles

Three sentences that govern every product decision in v1:

> **1. Link what you cannot own.**
> If you do not have a data licence, point the user to the official source. Do not scrape. Do not emulate. Do not OCR.

> **2. Source what you can verify.**
> Every data point on the page must have a verifiable, official origin. If you cannot verify it, do not display it. If it is an estimate, label it as an estimate.

> **3. Partner after you have leverage.**
> Do not ask for an API with zero users. Ask for an API when you can say "48 000 drivers / month."

---

## 20. One-Page Summary (for stakeholders)

**Product:** JB Flow

**What it is (v1):** A fast, mobile-first, no-login page that routes Singapore ↔ Johor drivers and JB locals to the official live sources they need (parking, border traffic, RTS, bus, navigation) in under 5 seconds.

**What it is not:** A data platform. A scraper. A navigation app. An AI product. A social network. The final JB Flow product.

**The v1 experiment:** Does the user form the habit "I open JB Flow before I leave the house"? Go / no-go is judged on click-through rate (≥ 30 %), repeat rate (≥ 15 % within 4 weeks), and positive organic search growth (3 consecutive weeks). Absolute visitor count is context, not a gate.

**Core user value:** Replaces 5 Google searches with 1 page.

**Tech:** Next.js PWA on Vercel. Supabase. Lightweight GET link health. No API costs.

**Build time:** 1–1.5 weeks (7–8 person-days incl. source verification).

**Monthly cost:** ≈ RM 0.

**RTS timing:** All copy reads *subject to official operational announcement / 以官方最終運營公告為準*. No hard-coded date.

**Legal posture:** v1 does not scrape, embed, or re-render third-party data. Legal exposure is materially reduced but not zero (trademark display, deep-link terms, brand presentation). /about disclaimer + legal review before Phase 3.

**North Star (long-term):** Johor Real-Time Decision Layer — "Should I go? Which way? Is it worth it?" — powered by official feeds, partnership data, and historical models. But that is Phase 5. Not today.

---

*End of plan.md v0.2*
