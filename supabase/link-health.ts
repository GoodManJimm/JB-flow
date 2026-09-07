// §8.3 / §P4-1 — Link Health Monitor.
//
// Deploy as a Vercel cron or tiny GitHub Actions job. Daily 03:00 SGT.
// Uses lightweight GET (NOT HEAD) — HEAD returns false 404s on many CDNs/WAFs.
//
// This is a reference stub. Wire it to Supabase when the DB is live.
// It only checks rows where link_clearance = 'GREEN'.

const HEALTH_UA = "JBFlowHealthCheck/1.0";
const TIMEOUT_MS = 10_000;
const MAX_BODY_BYTES = 1024;
const MAX_REDIRECTS = 3;

interface CheckInput {
  source_url: string;
}

async function checkOne(url: string): Promise<{
  status: number;
  finalUrl: string;
  responseMs: number;
  isActive: boolean;
  redirectChain: Array<{ url: string; status: number }>;
}> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const chain: Array<{ url: string; status: number }> = [];

  let current = url;
  let status = 0;

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
     const res = await fetch(current, {
          method: "GET",
          headers: {
              Accept: "text/html",
             "User-Agent": HEALTH_UA,
            },
          redirect: "manual",
          signal: controller.signal,
        });
       status = res.status;
       chain.push({ url: current, status });

       if ([301, 302, 303, 307, 308].includes(status)) {
         const loc = res.headers.get("location");
         if (!loc) break;
         current = new URL(loc, current).toString();
         continue;
         }
       // 2xx: read up to 1 KB then discard.
         if (status >= 200 && status < 300) {
            const reader = res.body?.getReader();
            if (reader) {
             let read = 0;
            let done = false;
            while (!done) {
              const { value, done: d } = await reader.read();
              if (d) break;
              read += value?.length || 0;
             if (read >= MAX_BODY_BYTES) reader.cancel();
              }
           }
          }
         break;
        }
    clearTimeout(timer);

    const isActive = status >= 200 && status < 400;
   return {
         status,
        finalUrl: current,
        responseMs: Date.now(),
        isActive: isActive && status !== 301 && status !== 302,
       redirectChain: chain,
      };
}

// Exported for a host that provides its own scheduler.
export async function runHealthCheck(rows: CheckInput[]) {
  const results = await Promise.all(rows.map((r) => checkOne(r.source_url)));
  // 2 consecutive failures per URL -> alert (Slack/email). Track counts
  // outside this function (in the host's state / DB).
  return results;
}
