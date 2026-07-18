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
  title: "Mohd Azeem | Backend Architect",
  description: "Portfolio of Mohd Azeem, a Backend Architect specializing in distributed systems and machine learning pipelines.",
  metadataBase: new URL("https://saifiazeem.xyz"),
  openGraph: {
    title: "Mohd Azeem | Backend Architect",
    description: "Building distributed systems and ML-powered architecture.",
    url: "https://saifiazeem.xyz",
    siteName: "Mohd Azeem Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohd Azeem | Backend Architect",
    description: "Portfolio of Mohd Azeem, a Backend Architect specializing in distributed systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-black min-h-full flex flex-col">{children}</body>
    </html>
  );
}