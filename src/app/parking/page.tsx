import { getMalls } from "@/lib/getData";
import ParkingListClient from "@/components/ParkingListClient";
import PageShell from "@/components/PageShell";

// Server component. Only GREEN + RED rows reach the client — YELLOW is
// filtered by guardForProduction before this runs (Execution plan §P3-8).
export default async function ParkingPage() {
  const malls = await getMalls();
  return (
    <PageShell>
      <ParkingListClient malls={malls} />
    </PageShell>
  );
}
