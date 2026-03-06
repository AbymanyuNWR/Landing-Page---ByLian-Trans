import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1d4ed8" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: "PT Bylian Trans Tegal — Pesan Tiket Bus Online",
  description: "Pesan tiket bus Bylian Trans dari Tegal ke seluruh Indonesia. Armada lengkap AC, tepat waktu, aman. Beli tiket online mudah via website atau WA.",
  manifest: "/pwa/manifest.json",
  icons: {
    icon: "/images/logo/favicon.ico",
    apple: "/pwa/icon-192.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bylientrans.co.id",
    title: "PT Bylian Trans Tegal — Pesan Tiket Bus Online",
    description: "Pesan tiket bus Bylian Trans dari Tegal ke seluruh Indonesia.",
    siteName: "Bylian Trans",
    images: [{ url: "/images/og-image.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate LocalBusiness JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TravelAgency"],
    "name": "PT Bylian Trans",
    "url": "https://bylientrans.co.id",
    "telephone": "081234567890",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Raya Tegal - Pemalang No. 123",
      "addressLocality": "Kota Tegal",
      "addressRegion": "Jawa Tengah",
      "postalCode": "52111",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-6.8694",
      "longitude": "109.1402"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250"
    },
    "priceRange": "$$"
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics 4 (only loads tracking ID from env if available) */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans antialiased text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-950">
        {children}
      </body>
    </html>
  );
}
