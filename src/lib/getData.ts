// Data-fetching layer. In v1 this reads the local data.ts file.
// When Supabase is wired up, each function below has a `if (process.env.SUPABASE_URL)`
// branch that replaces the local read with a Supabase query. The rendering
// guard (GREEN + RED only) is enforced HERE so a stray YELLOW row can never
// reach the public pages. See Execution plan §1.2 and §P3-8.

import { malls as MALLS, checkpoints as CHECKPOINTS, config as CONFIG } from "./data";
import type { Checkpoint, LinkClearance, Mall } from "./types";

const PROD_CLEARANCE: LinkClearance[] = ["GREEN", "RED"];

// Defence-in-depth: never return a YELLOW row in production, even by mistake.
export function guardForProduction(malls: Mall[]): Mall[] {
  return malls.filter((m) => PROD_CLEARANCE.includes(m.link_clearance));
}

export async function getMalls(): Promise<Mall[]> {
   // Phase 2: when Supabase is live, replace the local read with a query that
   // already filters to GREEN/RED server-side:
   //   const { data } = await supabase.from('malls').select('*')
   //     .in('link_clearance', ['GREEN','RED'])
   //     .order('display_order', { ascending: true });
   //   return data as Mall[];
   if (process.env.SUPABASE_URL) {
     // TODO(Phase 2): wire Supabase here. Fall through to local data until then.
   }
  const all = [...MALLS].sort((a, b) => a.display_order - b.display_order);
  return guardForProduction(all);
}

export async function getMallBySlug(slug: string): Promise<Mall | null> {
  const found = MALLS.find((m) => m.slug === slug);
  if (!found) return null;
  // A YELLOW mall has no public page at all.
  if (found.link_clearance === "YELLOW") return null;
  return found;
}

export async function getMallSlugs(): Promise<string[]> {
  return getMalls().then((m) => m.map((m) => m.slug));
}

export function getCheckpoints(): Checkpoint[] {
  // Border links are also gated: RED shows name only, YELLOW is dropped.
  return CHECKPOINTS.filter((c) => PROD_CLEARANCE.includes(c.link_clearance));
}

export function getConfig() {
  return CONFIG;
}
