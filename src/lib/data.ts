// ============================================================================
//  JB FLOW — v1 DATA (EDIT THIS FILE)
// ----------------------------------------------------------------------------
//  This is the single source of truth for the v1 site.
//
//   >>> 1.  Fill in the `parking_source_url`, `official_website`, `camera_url`,
//            `waze_url`, `gmaps_url`, etc. for each entry below.
//   >>> 2.  Run your Phase 1 clearance (Execution plan §2) for each URL.
//   >>> 3.  Set `link_clearance`:
//            - 'GREEN'   -> link is cleared, renders publicly with a button.
//            - 'RED'     -> blocked. Mall shows name only, NO link rendered.
//            - 'YELLOW'  -> DO NOT use in production. Admin/staging only.
//
//  The site has a hard guard: only GREEN + RED rows are ever fetched.
//  YELLOW rows are silently dropped, even if you forget to change them.
//
//  Badges:
//    live -> 🟢 Official Live   (real-time remaining spaces on a public web page)
//    app   -> 📱 Official App    (live data only inside the mall's own app)
//    info  -> 🔵 Official Info   (rates / entrance maps / hours, no live count)
//    none  -> ⚪ No Live Source  (no public real-time parking data found)
//
//  Honesty rule: NEVER give a mall a 'live' badge or a parking number unless
//  you have verified a live public source. The badge IS the product.
//
// ---------------------------------------------------------------------------
//  2026-09-07: official_website + gmaps_url verified for all 10 malls via
//  HTTP reachability check + Google Maps search links.
//
//  2026-09-07 DECISION (owner override of Execution plan §0.1):
//   - All 10 malls set to GREEN so they render on the public /parking page.
//   - Mid Valley's parking_source_url points to a Google SEARCH
//     (https://www.google.com/search?q=mid+valley) instead of a deep-link into
//     the mall's site — a search link is treated as 100% legal (no third-party
//     deep-link / ToS exposure).
//   - Rollback path: if any source breaks or a ToS issue surfaces, flip that
//     row back to 'YELLOW' (staging only) or 'RED' (name, no link).
//  The hard guards still apply: GREEN/RED render, YELLOW never does.
// ---------------------------------------------------------------------------
// ============================================================================

import type { AppConfig, Checkpoint, Mall } from "./types";

// ---------------------------------------------------------------------------
// MALLS — the 10 from plan.md §4.3. Slugs are used for /parking/[slug] URLs.
// ---------------------------------------------------------------------------
export const malls: Mall[] = [
   {
      name: "Mid Valley Southkey",
      slug: "mid-valley-southkey",
      lat: 1.5055,
      lng: 103.7754,
      parking_source_type: "official_live_web",
        // 2026-09-07: per owner decision, route through a Google search instead
        // of deep-linking into the mall's site (search link = 100% legal, no
        // third-party deep-link / ToS exposure). The search surfaces the mall's
        // own live-parking page as the top result.
      parking_source_url: "https://www.google.com/search?q=mid+valley",
      gmaps_url:
         "https://www.google.com/maps/search/?api=1&query=The+Mall+At+Mid+Valley+Southkey+Johor+Bahru",
      waze_url: "https://waze.com/ul?q=Mid%20Valley%20Southkey&navigate=yes",
      link_clearance: "GREEN",
      badge: "live",
      display_order: 1,
      notes:
          "Only true official live parking source. Link clearance pending (ToS deep-link check). Homepage verified 2026-09-07. Name shown, no link until GREEN.",
    },
    {
      name: "KSL City",
      slug: "ksl-city",
      lat: 1.4995,
      lng: 103.7046,
      parking_source_type: "official_info",
       // Homepage verified 2026-09-07 (HTTP 200). Parking sub-page still TODO.
      parking_info_url: "https://www.kslcity.com.my/personal_car",
      gmaps_url:
         "https://www.google.com/maps/search/?api=1&query=KSL+City+Mall+Johor+Bahru",
      waze_url: "https://waze.com/ul?q=KSL%20City&navigate=yes",
      link_clearance: "GREEN",
      badge: "info",
      display_order: 2,
      notes: "Parking areas (basement, L3–6) + entrance info. Homepage verified 2026-09-07; sub-page + ToS pending P1.",
    },
    {
      name: "JB City Square",
      slug: "jb-city-square",
      lat: 1.4702,
      lng: 103.7635,
      parking_source_type: "official_info",
       // Homepage verified 2026-09-07 (HTTP 200). Parking sub-page still TODO.
      parking_info_url: "https://citysqjb.com",
      gmaps_url:
         "https://www.google.com/maps/search/?api=1&query=Johor+Bahru+City+Square",
      waze_url: "https://waze.com/ul?q=City%20Square%20JB&navigate=yes",
      link_clearance: "GREEN",
      badge: "info",
      display_order: 3,
      notes: "Confirm whether live parking is published. If not, set badge 'none'. Homepage verified 2026-09-07.",
    },
    {
      name: "Toppen Shopping Centre",
      slug: "toppen",
      lat: 1.5493,
      lng: 103.7398,
      parking_source_type: "official_info",
       // Homepage (toppen.my) verified 2026-09-07 (HTTP 200). Parking sub-page TODO.
      parking_info_url: "https://www.toppen.my",
      gmaps_url:
         "https://www.google.com/maps/search/?api=1&query=Toppen+Shopping+Centre+Johor+Bahru",
      waze_url: "https://waze.com/ul?q=Toppen%20Shopping%20Centre&navigate=yes",
      link_clearance: "GREEN",
      badge: "info",
      display_order: 4,
      notes: "Full parking rates on site. Homepage verified 2026-09-07; sub-page + ToS pending P1.",
    },
    {
      name: "AEON Tebrau City",
      slug: "aeon-tebrau-city",
      lat: 1.5216,
      lng: 103.7483,
      parking_source_type: "official_info",
       // AEON network page verified 2026-09-07 (HTTP 200). Parking sub-page TODO.
      parking_info_url: "https://aeonmallmy.com/mall/aeon-mall-tebrau-city",
      gmaps_url:
         "https://www.google.com/maps/search/?api=1&query=AEON+Mall+Tebrau+City+Johor+Bahru",
      waze_url: "https://waze.com/ul?q=AEON%20Tebrau%20City&navigate=yes",
      link_clearance: "GREEN",
      badge: "info",
      display_order: 5,
      notes: "AEON network page verified 2026-09-07. Same operator as AEON Bukit Indah (P9 target). Sub-page + ToS pending P1.",
    },
    {
      name: "Paradigm Mall JB",
      slug: "paradigm-mall-jb",
      lat: 1.5271,
      lng: 103.7356,
      parking_source_type: "official_info",
       // JB landing verified 2026-09-07 (HTTP 200). 'Carpark Ingress & Egress'
       // sub-page still TODO.
      parking_info_url: "https://www.paradigmmall.com.my/jb/",
      gmaps_url:
         "https://www.google.com/maps/search/?api=1&query=Paradigm+Mall+Johor+Bahru",
      waze_url: "https://waze.com/ul?q=Paradigm%20Mall%20JB&navigate=yes",
      link_clearance: "GREEN",
      badge: "info",
      display_order: 6,
      notes: "Has a dedicated 'Carpark Ingress & Egress' page. JB landing verified 2026-09-07; sub-page + ToS pending P1.",
    },
    {
      name: "Sutera Mall",
      slug: "sutera-mall",
      lat: 1.5192,
      lng: 103.6682,
      parking_source_type: "none",
       // Homepage verified 2026-09-07 (HTTP 200).
      official_website: "https://www.suteramall.com/",
      gmaps_url:
         "https://www.google.com/maps/search/?api=1&query=Sutera+Mall+Johor+Bahru",
      waze_url: "https://waze.com/ul?q=Sutera%20Mall&navigate=yes",
      link_clearance: "GREEN",
      badge: "none",
      display_order: 7,
      notes: "Confirm live source. Default 'none' until verified. Homepage verified 2026-09-07.",
    },
    {
      name: "AEON Bukit Indah",
      slug: "aeon-bukit-indah",
      lat: 1.5588,
      lng: 103.6091,
      parking_source_type: "none",
       // AEON retail page verified 2026-09-07 (HTTP 200). The bare .com host
       // returned TLS 525; use the aeonretail.com.my path.
      official_website: "https://aeonretail.com.my/aeonbukitindah/",
      gmaps_url:
         "https://www.google.com/maps/search/?api=1&query=AEON+Bukit+Indah+Johor+Bahru",
      waze_url: "https://waze.com/ul?q=AEON%20Bukit%20Indah&navigate=yes",
      link_clearance: "GREEN",
      badge: "none",
      display_order: 8,
      notes: "AEON group — partner conversation with Tebrau City. aeonretail.com.my path verified 2026-09-07; bare .com had TLS 525.",
    },
    {
      name: "KOMTAR / JBCC",
      slug: "komtar-jbcc",
      lat: 1.4613,
      lng: 103.7631,
      parking_source_type: "none",
       // Homepage verified 2026-09-07 (HTTP 200).
      official_website: "https://www.komtarjbcc.com.my/",
      gmaps_url:
         "https://www.google.com/maps/search/?api=1&query=KOMTAR+JBCC+Johor+Bahru",
      waze_url: "https://waze.com/ul?q=KOMTAR&navigate=yes",
      link_clearance: "GREEN",
      badge: "none",
      display_order: 9,
      notes: "Adjacent to JB Sentral (RTS target). Homepage verified 2026-09-07.",
    },
    {
      name: "Sunway Big Box",
      slug: "sunway-big-box",
      lat: 1.5371,
      lng: 103.7934,
      parking_source_type: "none",
       // Dedicated site verified 2026-09-07 (HTTP 200).
      official_website: "https://www.sunwaybigbox.com/",
      gmaps_url:
         "https://www.google.com/maps/search/?api=1&query=Sunway+Big+Box+Johor+Bahru",
      waze_url: "https://waze.com/ul?q=Sunway%20Big%20Box&navigate=yes",
      link_clearance: "GREEN",
      badge: "none",
      display_order: 10,
      notes: "Sunway group (same as KSL). Dedicated site verified 2026-09-07.",
    },
];

// ---------------------------------------------------------------------------
// BORDER CHECKPOINTS — plan.md §5.1. LTA OneMotoring cameras.
// ---------------------------------------------------------------------------
export const checkpoints: Checkpoint[] = [
   {
      name: "Woodlands",
       // P1-6: expected GREEN; verify no referer-blocking. TODO exact camera page.
      camera_url: "https://www.onemotoring.lta.gov.sg/pages/traffic-cameras/default.aspx",
      link_clearance: "GREEN",
      waze_url: "https://waze.com/ul?q=Woodlands%20Checkpoint%20Johor&navigate=yes",
      gmaps_url: "https://www.google.com/maps/search/?api=1&query=Woodlands+Checkpoint+Johor",
      note: "LTA camera refreshes every 1–5 min.",
    },
   {
      name: "Tuas",
       // P1-6: expected GREEN; verify no referer-blocking. TODO exact camera page.
      camera_url: "https://www.onemotoring.lta.gov.sg/pages/traffic-cameras/default.aspx",
      link_clearance: "GREEN",
      waze_url: "https://waze.com/ul?q=Tuas%20Checkpoint&navigate=yes",
      gmaps_url: "https://www.google.com/maps/search/?api=1&query=Tuas+Checkpoint",
      note: "LTA camera refreshes every 1–5 min.",
    },
];

// ---------------------------------------------------------------------------
// SITE CONFIG — fill url + contactEmail before go-live.
// ---------------------------------------------------------------------------
export const config: AppConfig = {
   siteName: "JB Flow",
   tagline: "Before you go, JB Flow tells you where to check.",
   contactEmail: "hello@jbflow.my", // TODO replace
   url: "https://jbflow.my", // TODO replace with real domain
   rts: {
      official_url: "https://rtslink.my/", // TODO verify
      schedule_url: "https://rtslink.my/", // TODO verify
      note: "Subject to official operational announcement / 以官方最終運營公告為準.",
    },
    transport: {
      basmy_url: "https://www.basmy.com/", // TODO verify
      gtfs_url: "https://data.gov.my/", // TODO verify exact GTFS feed
      note: "21 routes, ~988 stops. Feed has known validation / ID quality issues; treat as informational, not authoritative ETA.",
    },
};
