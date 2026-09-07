import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
    // external links open a new tab; internal stay in-app.
  external?: boolean;
  variant?: "primary" | "ghost" | "soft";
  full?: boolean;
   className?: string;
    };

// CTA button. Used for parking source, camera, and navigation links.
// Never render this for a RED row — callers pass no href and render name-only
// text instead (see resolveMallLink / the page code).
export default function CTA({
   href,
   children,
   external,
   variant = "primary",
   full = true,
   className = "",
   }: Props) {
    const base =
     "btn inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold transition active:scale-[0.98]";
    const styles =
          variant === "primary"
           ? "bg-gradient-to-b from-brand-500 to-brand-600 text-white shadow-soft hover:from-brand-600 hover:to-brand-700"
            : variant === "soft"
            ? "bg-brand-50 text-brand-700 hover:bg-brand-100"
            : "border border-slate-200 bg-white text-slate-700 shadow-soft hover:border-slate-300 hover:bg-slate-50";

    const classNameFull = `${base} ${full ? "w-full" : ""} ${styles} ${className}`;

    if (external) {
      return (
            <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={classNameFull}
          aria-label={typeof children === "string" ? children : undefined}
            >
             {children}
          </a>
        );
      }

    return (
          <Link href={href} className={classNameFull}>
            {children}
           </Link>
         );
}
