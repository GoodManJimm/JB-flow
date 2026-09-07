import Link from "next/link";
import PageShell from "@/components/PageShell";

export default function NotFound() {
   return (
            <PageShell>
             <section className="py-16 text-center">
             <div
              aria-hidden
              className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 text-3xl text-white shadow-soft"
                   >
              ↺
               </div>
             <p className="text-2xl font-extrabold tracking-tight text-slate-900">
          404
            </p>
            <p className="mt-1 text-sm text-slate-500">
         This page doesn’t exist.
            </p>
         <Link
         href="/"
         className="mt-5 inline-flex min-h-[44px] items-center rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
            >
          Back to home
              </Link>
          </section>
        </PageShell>
      );
}
