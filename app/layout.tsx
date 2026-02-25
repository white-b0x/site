import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
