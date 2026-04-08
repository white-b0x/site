import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://whiteb0x.com"),
  title: "whiteb0x — A Development Studio",
  description:
    "Full-stack engineering from web applications to blockchain protocols. We build software that matters.",
  keywords: [
    "development studio",
    "web development",
    "blockchain",
    "software engineering",
    "full-stack",
    "web3",
  ],
  authors: [{ name: "white b0x inc." }],
  creator: "white b0x inc.",
  openGraph: {
    title: "whiteb0x — A Development Studio",
    description:
      "Full-stack engineering from web applications to blockchain protocols. We build software that matters.",
    url: "https://whiteb0x.com",
    siteName: "whiteb0x",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "whiteb0x — A Development Studio",
    description:
      "Full-stack engineering from web applications to blockchain protocols.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://whiteb0x.com",
  },
  other: {
    "color-scheme": "dark",
  },
  formatDetection: {
    telephone: false,
    email: false,
  },
  appleWebApp: {
    capable: true,
    title: "whiteb0x",
    statusBarStyle: "black-translucent",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "white b0x inc.",
  url: "https://whiteb0x.com",
  logo: "https://whiteb0x.com/icon.svg",
  description:
    "Full-stack engineering from web applications to blockchain protocols.",
  email: "contact@whiteb0x.com",
  sameAs: ["https://github.com/white-b0x"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#030508" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "891df56a5e6340d2affc122e5d088415"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
