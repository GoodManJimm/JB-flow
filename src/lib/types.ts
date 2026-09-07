// v1 data model. Mirrors the SQL schema in /supabase/schema.sql.
// This local file is the single source of truth for now.
// When Supabase is wired up, replace the importers in src/lib/getData.ts.

export type Badge = "live" | "app" | "info" | "none";

// link_clearance is the hard gate from the Execution Plan.
//  - GREEN: cleared for public outbound rendering (ToS + mobile QA passed)
//  - YELLOW: admin / staging only — NEVER rendered in production
//  - RED: blocked. Mall name shows, but NO link is rendered.
export type LinkClearance = "GREEN" | "YELLOW" | "RED";

export type ParkingSourceType =
   | "official_live_web"
   | "official_app"
   | "official_info"
   | "none";

export interface Mall {
  name: string;
  slug: string;
  lat?: number;
  lng?: number;
  official_website?: string;

  parking_source_type: ParkingSourceType;
  parking_source_url?: string; // only used when clearance === GREEN
  parking_app_ios?: string;
  parking_app_android?: string;
  parking_info_url?: string;

  waze_url?: string;
  gmaps_url?: string;

  // The hard gate. Default YELLOW so nothing accidental ships.
  link_clearance: LinkClearance;

  badge: Badge;
  display_order: number;
  last_verified_at?: string; // ISO date
  verified_by?: string;
  notes?: string;
}

export interface Checkpoint {
  name: string; // "Woodlands" | "Tuas"
  camera_url?: string; // LTA OneMotoring — GREEN only when rendered
  link_clearance: LinkClearance;
  waze_url?: string;
  gmaps_url?: string;
  note?: string;
}

export interface AppConfig {
  siteName: string;
  tagline: string; // "Before you go, JB Flow tells you where to check."
  contactEmail: string;
  url: string; // production URL used for QR + sitemap
  rts: {
      official_url?: string;
      schedule_url?: string;
      note: string; // "Subject to official operational announcement ..."
   };
  transport: {
      basmy_url?: string;
      gtfs_url?: string;
      note: string;
   };
}
