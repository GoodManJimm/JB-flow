"use client";

import { BADGES } from "@/lib/render";
import type { Badge } from "@/lib/types";

// Tone -> Tailwind classes. Each maps to the color families in tailwind.config.
// live  -> emerald ; info -> blue ; app -> violet ; none -> slate
const TONE_CLASS: Record<string, string> = {
  live: "bg-live-bg text-live-fg ring-live-ring",
  info: "bg-info-bg text-info-fg ring-info-ring",
  app: "bg-app-bg text-app-fg ring-app-ring",
  none: "bg-none-bg text-none-fg ring-none-ring",
};

interface Props {
   badge: Badge;
    // Dim the pill for RED / name-only rows.
  dimmed?: boolean;
    // Compact rendering for tight list rows.
  compact?: boolean;
}

// A single <SourceBadge>: a colored pill with icon + label (per §1.2 / §4.2).
export default function SourceBadge({ badge, dimmed, compact }: Props) {
  const spec = BADGES[badge];
  const toneClass = TONE_CLASS[spec.tone] || TONE_CLASS.none;

  return (
       <span
         className={
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 "
  +
    toneClass
  +
   (dimmed ? " opacity-45 saturate-50" : "")
       }
       title={spec.label}
       aria-label={spec.label}
        >
       <span aria-hidden className={compact ? "text-[9px]" : "text-[10px]"}>
        {spec.icon}
        </span>
       <span>{compact ? spec.short : spec.label}</span>
      </span>
     );
}
