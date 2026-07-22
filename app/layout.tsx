import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import { StructuredData } from "@/components/structured-data";
import {
  OG_IMAGE,
  PERSON,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_TITLE_TEMPLATE,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: SITE_TITLE_TEMPLATE,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  verification: {
    google: "bmxu-n0yX-KstrSI5_P3euTsnu1QEqIyOzZmvn6OZj0",
  },
  publisher: PERSON.name,
  generator: "Next.js",
  keywords: [...SITE_KEYWORDS],
  category: "technology",
  classification: "Personal portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    firstName: PERSON.givenName,
    lastName: PERSON.familyName,
    username: "haritrudani",
    gender: "male",
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE.url,
        alt: OG_IMAGE.alt,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
      },
    ],
  },
  appleWebApp: {
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
    capable: true,
  },
  other: {
    "msapplication-TileColor": "#080808",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
    { media: "(prefers-color-scheme: light)", color: "#080808" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
    >
      <body
        className="grain min-h-screen bg-[#080808] text-[#f0ece4]"
        suppressHydrationWarning
        data-author="Harit Rudani"
        data-site="haritrudani.com"
      >
        {/* authored: haritrudani.com — Harit Rudani */}
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-sm focus:bg-[#c8a96e] focus:px-4 focus:py-2 focus:font-mono focus:text-[12px] focus:uppercase focus:tracking-[0.2em] focus:text-[#080808]"
        >
          Skip to content
        </a>
        <StructuredData />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
