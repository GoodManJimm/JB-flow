// ============================================================================
//  JB FLOW — v1 DATA (EDIT THIS FILE)
// ----------------------------------------------------------------------------
//  This is the single source of truth for the v1 site.
//
//  >>> 1.  Fill in the `parking_source_url`, `official_website`, `camera_url`,
//           `waze_url`, `gmaps_url`, etc. for each entry below.
//  >>> 2.  Run your Phase 1 clearance (Execution plan §2) for each URL.
//  >>> 3.  Set `link_clearance`:
//           - 'GREEN'  -> link is cleared, renders publicly with a button.
//           - 'RED'    -> blocked. Mall shows name only, NO link rendered.
//           - 'YELLOW' -> DO NOT use in production. Admin/staging only.
//
//  The site has a hard guard: only GREEN + RED rows are ever fetched.
//  YELLOW rows are silently dropped, even if you forget to change them.
//
//  Badges:
//    live -> 🟢 Official Live  (real-time remaining spaces on a public web page)
//    app  -> 📱 Official App   (live data only inside the mall's own app)
//    info -> 🔵 Official Info  (rates / entrance maps / hours, no live count)
//    none -> ⚪ No Live Source (no public real-time parking data found)
//
//  Honesty rule: NEVER give a mall a 'live' badge or a parking number unless
//  you have verified a live public source. The badge IS the product.
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
     // TODO: fill the exact live-parking page. Per plan.md §4.3 it refreshes ~10s.
     parking_source_url: "https://www.midvalleysouthkey.com/", // TODO verify
     waze_url: "https://waze.com/ul?q=Mid%20Valley%20Southkey&navigate=yes",
     gmaps_url: "https://www.google.com/maps/search/?api=1&query=Mid+Valley+Southkey",
     // Per Execution plan §0.1 decision #1: Mid Valley is NOT the v1 hook;
     // its live link is currently RED. Change to "GREEN" only after P1-5.
     link_clearance: "RED",
     badge: "live",
     display_order: 1,
     notes:
        "Only true official live parking source. Link clearance pending (ToS deep-link check). Name shown, no link until GREEN.",
  },
  {
     name: "KSL City",
     slug: "ksl-city",
     lat: 1.4995,
     lng: 103.7046,
     parking_source_type: "official_info",
     parking_info_url: "https://www.kslcity.com/", // TODO verify parking page
     waze_url: "https://waze.com/ul?q=KSL%20City&navigate=yes",
     gmaps_url: "https://www.google.com/maps/search/?api=1&query=KSL+City",
     link_clearance: "YELLOW",
     badge: "info",
     display_order: 2,
     notes: "Parking areas (basement, L3–6) + entrance info. Verify URL + ToS.",
  },
  {
     name: "JB City Square",
     slug: "jb-city-square",
     lat: 1.4702,
     lng: 103.7635,
     parking_source_type: "official_info",
     parking_info_url: "https://www.citysquare.com.my/", // TODO verify
     waze_url: "https://waze.com/ul?q=City%20Square%20JB&navigate=yes",
     gmaps_url: "https://www.google.com/maps/search/?api=1&query=City+Square+JB",
     link_clearance: "YELLOW",
     badge: "info",
     display_order: 3,
     notes: "Confirm whether live parking is published. If not, set badge 'none'.",
  },
  {
     name: "Toppen Shopping Centre",
     slug: "toppen",
     lat: 1.5493,
     lng: 103.7398,
     parking_source_type: "official_info",
     parking_info_url: "https://www.toppen.com.my/", // TODO verify
     waze_url: "https://waze.com/ul?q=Toppen%20Shopping%20Centre&navigate=yes",
     gmaps_url: "https://www.google.com/maps/search/?api=1&query=Toppen+Shopping+Centre",
     link_clearance: "YELLOW",
     badge: "info",
     display_order: 4,
     notes: "Full parking rates on site.",
  },
  {
     name: "AEON Tebrau City",
     slug: "aeon-tebrau-city",
     lat: 1.5216,
     lng: 103.7483,
     parking_source_type: "official_info",
     parking_info_url: "https://www.aeonmalaysia.com.my/tebrau-city/", // TODO verify
     waze_url: "https://waze.com/ul?q=AEON%20Tebrau%20City&navigate=yes",
     gmaps_url: "https://www.google.com/maps/search/?api=1&query=AEON+Tebrau+City",
     link_clearance: "YELLOW",
     badge: "info",
     display_order: 5,
     notes: "Confirm source. Same operator as AEON Bukit Indah (P9 target).",
  },
  {
     name: "Paradigm Mall JB",
     slug: "paradigm-mall-jb",
     lat: 1.5271,
     lng: 103.7356,
     parking_source_type: "official_info",
     parking_info_url: "https://www.paradigm.com.my/", // TODO verify
     waze_url: "https://waze.com/ul?q=Paradigm%20Mall%20JB&navigate=yes",
     gmaps_url: "https://www.google.com/maps/search/?api=1&query=Paradigm+Mall+JB",
     link_clearance: "YELLOW",
     badge: "info",
     display_order: 6,
     notes: "Has a dedicated 'Carpark Ingress & Egress' page.",
  },
  {
     name: "Sutera Mall",
     slug: "sutera-mall",
     lat: 1.5192,
     lng: 103.6682,
     parking_source_type: "none",
     official_website: "https://www.suteramall.com.my/", // TODO verify
     waze_url: "https://waze.com/ul?q=Sutera%20Mall&navigate=yes",
     gmaps_url: "https://www.google.com/maps/search/?api=1&query=Sutera+Mall+JB",
     link_clearance: "YELLOW",
     badge: "none",
     display_order: 7,
     notes: "Confirm live source. Default 'none' until verified.",
  },
  {
     name: "AEON Bukit Indah",
     slug: "aeon-bukit-indah",
     lat: 1.5588,
     lng: 103.6091,
     parking_source_type: "none",
     official_website: "https://www.aeonmalaysia.com.my/bukit-indah/", // TODO verify
     waze_url: "https://waze.com/ul?q=AEON%20Bukit%20Indah&navigate=yes",
     gmaps_url: "https://www.google.com/maps/search/?api=1&query=AEON+Bukit+Indah",
     link_clearance: "YELLOW",
     badge: "none",
     display_order: 8,
     notes: "Confirm. AEON group — partner conversation with Tebrau City.",
  },
  {
     name: "KOMTAR / JBCC",
     slug: "komtar-jbcc",
     lat: 1.4613,
     lng: 103.7631,
     parking_source_type: "none",
     official_website: "https://www.jbcc.com.my/", // TODO verify
     waze_url: "https://waze.com/ul?q=KOMTAR&navigate=yes",
     gmaps_url: "https://www.google.com/maps/search/?api=1&query=KOMTAR+JB",
     link_clearance: "YELLOW",
     badge: "none",
     display_order: 9,
     notes: "Confirm. Adjacent to JB Sentral (RTS target).",
  },
  {
     name: "Sunway Big Box",
     slug: "sunway-big-box",
     lat: 1.5371,
     lng: 103.7934,
     parking_source_type: "none",
     official_website: "https://www.sunway.com.my/", // TODO verify
     waze_url: "https://waze.com/ul?q=Sunway%20Big%20Box&navigate=yes",
     gmaps_url: "https://www.google.com/maps/search/?api=1&query=Sunway+Big+Box+JB",
     link_clearance: "YELLOW",
     badge: "none",
     display_order: 10,
     notes: "Confirm. Sunway group (same as KSL).",
  },
];

// ---------------------------------------------------------------------------
// BORDER CHECKPOINTS — plan.md §5.1. LTA OneMotoring cameras.
// ---------------------------------------------------------------------------
export const checkpoints: Checkpoint[] = [
  {
     name: "Woodlands",
     // TODO: replace with the exact LTA OneMotoring camera page.
     camera_url: "https://www.onemotoring.lta.gov.sg/pages/traffic-cameras/default.aspx", // TODO verify
     link_clearance: "GREEN", // P1-6: expected GREEN; verify no referer-blocking.
     waze_url: "https://waze.com/ul?q=Woodlands%20Checkpoint%20Johor&navigate=yes",
     gmaps_url: "https://www.google.com/maps/search/?api=1&query=Woodlands+Checkpoint+Johor",
     note: "LTA camera refreshes every 1–5 min.",
  },
  {
     name: "Tuas",
     camera_url: "https://www.onemotoring.lta.gov.sg/pages/traffic-cameras/default.aspx", // TODO verify
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
