import { NextResponse } from "next/server";

// Lightweight liveness probe. The link-health monitor (supabase/link-health.ts)
// and any host health check can hit this. The health-check UA is excluded from
// analytics upstream (see analytics/README), not here.
export function GET() {
  return NextResponse.json({ status: "ok", ts: new Date().toISOString() });
}

export const dynamic = "force-dynamic";
