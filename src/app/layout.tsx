import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

// TODO: After the owner approves a production origin, configure SITE_URL at build time
// and use it for metadataBase, canonical URLs, and the sitemap.
export const metadata: Metadata = {
  title: "Yudi Runat Masneno | Backend Engineer",
  description:
    "Building reliable backend systems with a focus on clean architecture and data integrity.",
  applicationName: "Yudi Runat Masneno | Backend Engineer",
  openGraph: {
    type: "website",
    siteName: "Yudi Runat Masneno",
    title: "Yudi Runat Masneno | Backend Engineer",
    description:
      "Building reliable backend systems with a focus on clean architecture and data integrity.",
  },
  twitter: {
    card: "summary",
    title: "Yudi Runat Masneno | Backend Engineer",
    description:
      "Building reliable backend systems with a focus on clean architecture and data integrity.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
