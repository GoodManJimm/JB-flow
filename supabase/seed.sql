-- JB FLOW — v1 seed data (Execution plan §3.1 P2-5)
-- ---------------------------------------------------------------------------
-- 2026-09-07: official_website + gmaps_url verified for all 10 malls via HTTP
-- reachability check + Google Maps search links. parking sub-page URLs are still
-- TODO (P1 browser QA). link_clearance kept YELLOW (staging) / MID VALLEY RED per
-- Execution plan §0.1 decision #1. NOTHING here is GREEN yet — P1-1..P1-6 pending.
--
-- NOTE: YELLOW rows are STAGING ONLY. The app's production query (§P3-8)
-- filters to IN ('GREEN','RED'), so these will not render publicly until you
-- promote each one to GREEN after manual browser + ToS QA.
-- ---------------------------------------------------------------------------

INSERT INTO malls
  (slug, name, lat, lng, official_website, parking_source_type,
   parking_source_url, parking_info_url, waze_url, gmaps_url,
   link_clearance, display_order, notes)
VALUES

  ('mid-valley-southkey', 'Mid Valley Southkey', 1.5055, 103.7754,
   NULL, 'official_live_web',
   'https://www.midvalleysouthkey.com/', NULL,
   'https://waze.com/ul?q=Mid%20Valley%20Southkey&navigate=yes',
   'https://www.google.com/maps/search/?api=1&query=The+Mall+At+Mid+Valley+Southkey+Johor+Bahru',
   'RED', 1,
   'Only true official live parking source. Link clearance pending (ToS deep-link check). Homepage verified 2026-09-07. Name shown, no link until GREEN.');

INSERT INTO malls
  (slug, name, lat, lng, official_website, parking_source_type,
   parking_source_url, parking_info_url, waze_url, gmaps_url,
   link_clearance, display_order, notes)
VALUES
  ('ksl-city', 'KSL City', 1.4995, 103.7046,
   'https://kslcity.com.my', 'official_info',
   NULL, 'https://kslcity.com.my',
   'https://waze.com/ul?q=KSL%20City&navigate=yes',
   'https://www.google.com/maps/search/?api=1&query=KSL+City+Mall+Johor+Bahru',
   'YELLOW', 2,
   'Parking areas (basement, L3-6) + entrance info. Homepage verified 2026-09-07; sub-page + ToS pending P1.'),

  ('jb-city-square', 'JB City Square', 1.4702, 103.7635,
   'https://citysqjb.com', 'official_info',
   NULL, 'https://citysqjb.com',
   'https://waze.com/ul?q=City%20Square%20JB&navigate=yes',
   'https://www.google.com/maps/search/?api=1&query=Johor+Bahru+City+Square',
   'YELLOW', 3,
   'Confirm whether live parking is published. If not, set badge none. Homepage verified 2026-09-07.'),

  ('toppen', 'Toppen Shopping Centre', 1.5493, 103.7398,
   'https://www.toppen.my', 'official_info',
   NULL, 'https://www.toppen.my',
   'https://waze.com/ul?q=Toppen%20Shopping%20Centre&navigate=yes',
   'https://www.google.com/maps/search/?api=1&query=Toppen+Shopping+Centre+Johor+Bahru',
   'YELLOW', 4,
   'Full parking rates on site. Homepage (toppen.my) verified 2026-09-07; sub-page + ToS pending P1.'),

  ('aeon-tebrau-city', 'AEON Tebrau City', 1.5216, 103.7483,
   'https://aeonmallmy.com/mall/aeon-mall-tebrau-city', 'official_info',
   NULL, 'https://aeonmallmy.com/mall/aeon-mall-tebrau-city',
   'https://waze.com/ul?q=AEON%20Tebrau%20City&navigate=yes',
   'https://www.google.com/maps/search/?api=1&query=AEON+Mall+Tebrau+City+Johor+Bahru',
   'YELLOW', 5,
   'AEON network page verified 2026-09-07. Same operator as AEON Bukit Indah (P9 target). Sub-page + ToS pending P1.'),

  ('paradigm-mall-jb', 'Paradigm Mall JB', 1.5271, 103.7356,
   'https://www.paradigmmall.com.my/jb/', 'official_info',
   NULL, 'https://www.paradigmmall.com.my/jb/',
   'https://waze.com/ul?q=Paradigm%20Mall%20JB&navigate=yes',
   'https://www.google.com/maps/search/?api=1&query=Paradigm+Mall+Johor+Bahru',
   'YELLOW', 6,
   "Has a dedicated 'Carpark Ingress & Egress' page. JB landing verified 2026-09-07; sub-page + ToS pending P1."),

  ('sutera-mall', 'Sutera Mall', 1.5192, 103.6682,
   'https://www.suteramall.com/', 'none',
   NULL, NULL,
   'https://waze.com/ul?q=Sutera%20Mall&navigate=yes',
   'https://www.google.com/maps/search/?api=1&query=Sutera+Mall+Johor+Bahru',
   'YELLOW', 7,
   'Confirm live source. Default none until verified. Homepage verified 2026-09-07.'),

  ('aeon-bukit-indah', 'AEON Bukit Indah', 1.5588, 103.6091,
   'https://aeonretail.com.my/aeonbukitindah/', 'none',
   NULL, NULL,
   'https://waze.com/ul?q=AEON%20Bukit%20Indah&navigate=yes',
   'https://www.google.com/maps/search/?api=1&query=AEON+Bukit+Indah+Johor+Bahru',
   'YELLOW', 8,
   'AEON group - partner conversation with Tebrau City. aeonretail.com.my path verified 2026-09-07; bare .com had TLS 525.'),

  ('komtar-jbcc', 'KOMTAR / JBCC', 1.4613, 103.7631,
   'https://www.komtarjbcc.com.my/', 'none',
   NULL, NULL,
   'https://waze.com/ul?q=KOMTAR&navigate=yes',
   'https://www.google.com/maps/search/?api=1&query=KOMTAR+JBCC+Johor+Bahru',
   'YELLOW', 9,
   'Adjacent to JB Sentral (RTS target). Homepage verified 2026-09-07.'),

  ('sunway-big-box', 'Sunway Big Box', 1.5371, 103.7934,
   'https://www.sunwaybigbox.com/', 'none',
   NULL, NULL,
   'https://waze.com/ul?q=Sunway%20Big%20Box&navigate=yes',
   'https://www.google.com/maps/search/?api=1&query=Sunway+Big+Box+Johor+Bahru',
   'YELLOW', 10,
   'Sunway group (same as KSL). Dedicated site verified 2026-09-07.');

-- ---------------------------------------------------------------------------
-- clearance_log: audit trail (Execution plan §2 P1-7). One row per mall.
-- badge column stores the badge key (live/app/info/none) for traceability.
-- ---------------------------------------------------------------------------
INSERT INTO clearance_log
  (mall_slug, source_url, badge, clearance, reviewer, notes)
VALUES
  ('mid-valley-southkey', 'https://www.midvalleysouthkey.com/', 'live', 'RED', 'jb-flow-p1', 'Homepage HTTP 200 @ 2026-09-07. Live parking ToS / deep-link check pending; RED per §0.1 decision #1.'),
  ('ksl-city', 'https://kslcity.com.my', 'info', 'YELLOW', 'jb-flow-p1', 'Homepage HTTP 200 @ 2026-09-07. Parking sub-page + ToS pending.'),
  ('jb-city-square', 'https://citysqjb.com', 'info', 'YELLOW', 'jb-flow-p1', 'Homepage HTTP 200 @ 2026-09-07. Live-parking presence + ToS pending.'),
  ('toppen', 'https://www.toppen.my', 'info', 'YELLOW', 'jb-flow-p1', 'Homepage (toppen.my) HTTP 200 @ 2026-09-07. Parking rates sub-page + ToS pending.'),
  ('aeon-tebrau-city', 'https://aeonmallmy.com/mall/aeon-mall-tebrau-city', 'info', 'YELLOW', 'jb-flow-p1', 'AEON network page HTTP 200 @ 2026-09-07. Sub-page + ToS pending.'),
  ('paradigm-mall-jb', 'https://www.paradigmmall.com.my/jb/', 'info', 'YELLOW', 'jb-flow-p1', 'JB landing HTTP 200 @ 2026-09-07. Carpark sub-page + ToS pending.'),
  ('sutera-mall', 'https://www.suteramall.com/', 'none', 'YELLOW', 'jb-flow-p1', 'Homepage HTTP 200 @ 2026-09-07. Live source presence pending.'),
  ('aeon-bukit-indah', 'https://aeonretail.com.my/aeonbukitindah/', 'none', 'YELLOW', 'jb-flow-p1', 'aeonretail.com.my path HTTP 200 @ 2026-09-07; bare .com returned TLS 525, avoid.'),
  ('komtar-jbcc', 'https://www.komtarjbcc.com.my/', 'none', 'YELLOW', 'jb-flow-p1', 'Homepage HTTP 200 @ 2026-09-07. Live source presence pending.'),
  ('sunway-big-box', 'https://www.sunwaybigbox.com/', 'none', 'YELLOW', 'jb-flow-p1', 'Dedicated site HTTP 200 @ 2026-09-07. Live source presence pending.');
