import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "JB Flow — Where to check before you go",
    template: "%s · JB Flow",
    },
  description:
    "Before you go, JB Flow tells you where to check: JB mall parking, Woodlands/Tuas border traffic, RTS and bus — official sources in one place.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
     apple: { url: "/icon.svg" },
      },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <html lang="en">
         <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
            {children}
            </body>
         </html>
        );
}
