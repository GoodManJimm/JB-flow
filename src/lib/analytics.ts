// §P4-2 — Analytics wiring (PostHog or Plausible).
//
// To use, set NEXT_PUBLIC_POSTHOG_KEY (or NEXT_PUBLIC_PLAUSIBLE_DOMAIN) in your
// host env and uncomment the provider in src/app/layout.tsx.
//
// Tracked events (plan.md §9.3):
//   parking_click      mall_slug, source_type, from_page
//   checkpoint_click   checkpoint_name (woodlands / tuas)
//   navigation_click   tool (waze / gmaps), origin_page
//   rt_click           page_name
//   page_view          page_path, referrer
//
// EXCLUDE the health-check UA "JBFlowHealthCheck/1.0" from analytics. With
// PostHog, add a filter on `user_agent` in the dashboard/settings. With
// Plausible, set the Ignore IPs/UA option. Do NOT fire events for that UA.
//
// Wire per-click on each CTA component by adding data attributes and capturing
// in a client-side init, e.g.:
//
//   window.ph?.capture('parking_click', { mall_slug: slug, source_type });

export const EVENT_NAMES = [
   "parking_click",
   "checkpoint_click",
    "navigation_click",
    "rt_click",
    "page_view",
];
