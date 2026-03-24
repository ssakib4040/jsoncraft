import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JSONCraft | JSON Template Generator",
    template: "%s | JSONCraft",
  },
  description:
    "Generate realistic JSON mock data from templates with built-in dynamic functions for testing and development.",
  keywords: [
    "json generator",
    "mock data",
    "faker json",
    "json template",
    "test data generator",
    "developer tools",
    "jsoncraft",
  ],
  applicationName: "JSONCraft",
  category: "developer tools",
  authors: [{ name: "JSONCraft" }],
  creator: "JSONCraft",
  publisher: "JSONCraft",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "JSONCraft | JSON Template Generator",
    description:
      "Generate realistic JSON mock data from templates with built-in dynamic functions for testing and development.",
    siteName: "JSONCraft",
    images: [
      {
        url: "/newlogo.png",
        width: 1200,
        height: 630,
        alt: "JSONCraft logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSONCraft | JSON Template Generator",
    description:
      "Generate realistic JSON mock data from templates with built-in dynamic functions for testing and development.",
    images: ["/newlogo.png"],
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
  icons: {
    icon: [
      { url: "/newlogo.png", type: "image/png" },
      { url: "/vite.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/newlogo.png"],
    apple: [{ url: "/newlogo.png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSONCraft",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: siteUrl,
  description:
    "Generate realistic JSON mock data from templates with built-in dynamic functions for testing and development.",
  image: `${siteUrl}/newlogo.png`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
