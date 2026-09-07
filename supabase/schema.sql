-- JB FLOW — v1 schema (Execution plan §3.1 P2-4)
-- Run against a Supabase Postgres project. This mirrors src/lib/types.ts.

-- 1. malls
CREATE TABLE IF NOT EXISTS malls (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT NOT NULL,
  slug                TEXT UNIQUE NOT NULL,
  lat                 DECIMAL(9, 6),
  lng                 DECIMAL(9, 6),
  official_website    TEXT,

  -- parking source
  parking_source_type TEXT NOT NULL
                        CHECK (parking_source_type IN
                               ('official_live_web','official_app',
                                'official_info','none')),
  parking_source_url  TEXT,
  parking_app_ios     TEXT,
  parking_app_android TEXT,
  parking_info_url    TEXT,

  -- navigation shortcuts
  waze_url            TEXT,
  gmaps_url           TEXT,

  -- the hard gate. Default YELLOW so nothing accidental ships to production.
  link_clearance      TEXT NOT NULL DEFAULT 'YELLOW'
                        CHECK (link_clearance IN ('GREEN','YELLOW','RED')),

  -- meta
  display_order       INT DEFAULT 999,
  last_verified_at    TIMESTAMPTZ,
  verified_by         TEXT,
  notes               TEXT,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_malls_clearance ON malls (link_clearance);
CREATE INDEX IF NOT EXISTS idx_malls_order ON malls (display_order);

-- 2. link_health
CREATE TABLE IF NOT EXISTS link_health (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url      TEXT NOT NULL,
  last_status     SMALLINT,
  last_checked_at TIMESTAMPTZ,
  is_active       BOOLEAN DEFAULT true,
  redirect_chain  TEXT,
  response_ms     INT,
  notes           TEXT
);

CREATE INDEX IF NOT EXISTS idx_link_health_url ON link_health (source_url);

-- 3. clearance_log (audit trail; not queried by the app)
CREATE TABLE IF NOT EXISTS clearance_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mall_slug   TEXT NOT NULL REFERENCES malls(slug) ON DELETE CASCADE,
  source_url  TEXT NOT NULL,
  badge       TEXT NOT NULL,
  clearance   TEXT NOT NULL CHECK (clearance IN ('GREEN','YELLOW','RED')),
  reviewer    TEXT,
  reviewed_at TIMESTAMPTZ DEFAULT now(),
  notes       TEXT
);

-- updated_at trigger
CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS malls_touch ON malls;
CREATE TRIGGER malls_touch BEFORE UPDATE ON malls
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
