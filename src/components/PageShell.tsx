"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { config as CONFIG } from "@/lib/data";

// Bottom tab bar shows only on small screens (the "app" feel). On >=sm the
// top nav takes over and the tab bar is hidden.
const TABS = [
       { href: "/", label: "Home", icon: "🏠" },
      { href: "/parking", label: "Parking", icon: "🚗" },
      { href: "/border", label: "Border", icon: "🚧" },
      { href: "/rts", label: "RTS", icon: "🚆" },
      { href: "/transport", label: "Bus", icon: "🚌" },
    ];

const NAV = [
   { href: "/", label: "Home" },
   { href: "/parking", label: "Parking" },
   { href: "/border", label: "Border" },
    { href: "/rts", label: "RTS" },
    { href: "/transport", label: "Transport" },
    { href: "/about", label: "About" },
];

// Active-tab helper for the top nav (matches /parking/x to the Parking tab).
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

// Inner page chrome. Root layout owns <html>/<body>; this owns the
// top bar, the mobile bottom tab bar, and the footer disclaimer.
export default function PageShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";

  return (
     <div className="flex min-h-screen flex-col">
       {/* Top bar */}
       <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
         <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-3">
          <Link
           href="/"
           className="flex items-center gap-2"
           aria-label="JB Flow home"
            >
            <span
             aria-hidden
             className="grid h-7 w-7 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-black text-white shadow-soft"
              >
             J
           </span>
           <span className="text-[15px] font-bold tracking-tight text-slate-900">
             JB Flow
             </span>
          </Link>

          {/* Desktop / tablet nav */}
          <nav className="hidden items-center gap-1 sm:flex">
            {NAV.map((n) => (
              <Link
              key={n.href}
              href={n.href}
              className={
                 "rounded-full px-3 py-1.5 text-sm font-medium transition " +
                 (isActive(pathname, n.href)
                   ? "bg-brand-600 text-white shadow-soft"
                  : "text-slate-600 hover:bg-slate-100")
                }
               >
                {n.label}
                </Link>
             ))}
          </nav>
         </div>
       </header>

       {/* Content */}
       <main
        className="mx-auto w-full max-w-3xl flex-1 px-4 pb-28 pt-6 sm:pb-10 animate-fade-up"
       >
        {children}
        </main>

       {/* Footer */}
       <footer className="mt-6 border-t border-slate-200 px-4 py-6 text-center text-xs text-slate-400 sm:pb-6">
        <p className="text-slate-500">
          {CONFIG.siteName} — {CONFIG.tagline}
           </p>
          <p className="mx-auto mt-2 max-w-md leading-relaxed">
            Links to official sources. JB Flow does not own, modify, or embed the
            data displayed there.
             <br />
            <a
             href={`mailto:${CONFIG.contactEmail}`}
             className="font-medium text-slate-500 hover:text-brand-600"
              >
              {CONFIG.contactEmail}
               </a>
            </p>
         </footer>

         {/* Mobile bottom tab bar */}
         <nav
          aria-label="Primary"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur-xl sm:hidden"
          >
          <div className="mx-auto flex max-w-3xl items-stretch justify-around">
            {TABS.map((t) => (
              <Link
              key={t.href}
              href={t.href}
              aria-label={t.label}
              className={
             "flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 py-1.5 text-[11px] font-medium transition "
              +
              (isActive(pathname, t.href) ? "text-brand-600" : "text-slate-400")
                }
               >
                <span className="text-lg leading-none" aria-hidden>
                 {t.icon}
                 </span>
                {t.label}
               </Link>
              ))}
           </div>
            {/* home indicator space on iOS */}
           <div className="h-[env(safe-area-inset-bottom)]" />
          </nav>
         </div>
       );
}
