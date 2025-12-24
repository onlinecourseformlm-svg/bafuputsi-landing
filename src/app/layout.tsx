import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import Analytics from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bafuputsi Trading - Labour Law & HR Consultants | Centurion, South Africa",
  description: "Expert labour law and HR consulting services in Centurion. 10+ years experience in Labour Relations, HR Compliance, Dispute Resolution, and Training. Free consultation available.",
  keywords: ["labour law", "HR consultants", "Centurion", "South Africa", "dispute resolution", "CCMA", "employment law", "HR compliance"],
  authors: [{ name: "Bafuputsi Trading" }],
  openGraph: {
    title: "Bafuputsi Trading - Labour Law & HR Consultants",
    description: "Reliable and effective labour law solutions in Centurion, South Africa",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
        <Analytics />
      </body>
    </html>
  );
}
