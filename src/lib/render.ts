import type { Badge, LinkClearance } from "./types";

// tone maps each badge to a Tailwind color family (src/tailwind colors).
export type Tone = "live" | "info" | "app" | "none";

export interface BadgeSpec {
  label: string; // user-facing label
  cta: string; // button text when a link IS allowed
  tone: Tone; // color family for the pill
  short: string; // compact label for tight UIs
   icon: string; // single-codepoint glyph for the pill
   }

export const BADGES: Record<Badge, BadgeSpec> = {
   live: {
      label: "Official Live",
      cta: "View Live Parking →",
      tone: "live",
      short: "Live",
       icon: "●",
       },
    app: {
      label: "Official App",
      cta: "Open App →",
      tone: "app",
      short: "App",
       icon: "●",
       },
    info: {
      label: "Official Info",
      cta: "View Parking Info →",
      tone: "info",
      short: "Info",
       icon: "●",
       },
    none: {
      label: "No Live Source",
      cta: "Mall Website →",
      tone: "none",
      short: "No live data",
       icon: "○",
       },
   };

// Where does a mall's parking link point, given its source type?
// Returns undefined when there is no usable URL (callers render name-only).
export function parkingHref(mall: {
  parking_source_type: string;
  parking_source_url?: string;
  parking_app_ios?: string;
  parking_app_android?: string;
  parking_info_url?: string;
  official_website?: string;
}): string | undefined {
  switch (mall.parking_source_type) {
    case "official_live_web":
      return mall.parking_source_url || mall.parking_info_url || mall.official_website;
    case "official_app":
      return mall.parking_app_ios || mall.parking_app_android || mall.official_website;
    case "official_info":
      return mall.parking_info_url || mall.official_website;
    case "none":
      return mall.official_website;
    default:
      return undefined;
  }
}

// §1.2 rendering rules, encoded. A link is only emitted when clearance is
// GREEN and a URL exists. RED = name only, no <a>. YELLOW is filtered out
// upstream and should never reach here.
export interface LinkView {
  clearance: LinkClearance;
  href?: string; // present only when GREEN and a URL exists
  statusText?: string; // shown when no link is rendered
}

export function resolveMallLink(
  mall: { link_clearance: LinkClearance; parking_source_url?: string; parking_info_url?: string; official_website?: string; parking_source_type: string; parking_app_ios?: string; parking_app_android?: string }
): LinkView {
  if (mall.link_clearance === "RED") {
    return { clearance: "RED", href: undefined, statusText: "Source not yet available" };
  }
  if (mall.link_clearance === "YELLOW") {
   // Should never happen in production. Fail closed: no link.
    return { clearance: "YELLOW", href: undefined, statusText: "Pending clearance" };
  }
  const href = parkingHref(mall);
  if (!href) {
   // GREEN but missing a URL — fail closed rather than render a dead href.
    return {
      clearance: "GREEN",
      href: undefined,
      statusText: "Source not yet available",
     };
  }
  return { clearance: "GREEN", href };
}
