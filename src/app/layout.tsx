import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AUTO PR - Write better in seconds",
  description:
    "Save your time with AUTO PR. Write professional pull request messages. Transform your GitHub workflow today.",
  keywords:
    "PR generator, pull request automation, GitHub automation, AI PR description, PR workflow, developer tools",
  openGraph: {
    title: "AUTO PR - Write better in seconds",
    description:
      "Save time with AI-powered PR descriptions. Our Chrome extension automatically generates professional pull request descriptions.",
    type: "website",
    url: "https://tanmay.xyz",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "babyo7_ AI PR Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AUTO PR - Write better in seconds",
    description:
      "Save time with AI-powered PR descriptions. Transform your GitHub workflow today.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  authors: [{ name: "babyo7_", url: "https://x.com/tanmay7_" }],
  creator: "babyo7_",
  publisher: "babyo7_",
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
        <Toaster richColors />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
