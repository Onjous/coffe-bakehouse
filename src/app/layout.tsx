import type { Metadata, Viewport } from "next";
import { Young_Serif, Schibsted_Grotesk } from "next/font/google";
import { brand } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-young-serif",
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

const title = `${brand.name} — ${brand.descriptor}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s · ${brand.name}` },
  description: brand.summary,
  applicationName: brand.name,
  openGraph: {
    type: "website",
    locale: brand.locale,
    siteName: brand.name,
    title,
    description: brand.summary,
  },
  twitter: { card: "summary_large_image", title, description: brand.summary },
  robots: { index: brand.indexable, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4eee3",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${youngSerif.variable} ${schibsted.variable}`}>
      <body id="top" className="min-h-svh overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
