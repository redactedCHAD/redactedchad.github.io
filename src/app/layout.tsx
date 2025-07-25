import './globals.css';
import type { Metadata } from 'next';
import { Inter } from "next/font/google";
import { Suspense } from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Skin Care Clinic in Littleton | The GLO Alchemist Skin & Laser Lab',
  description: '[The GLO Alchemist - Skin Care Clinic in Littleton, CO]',
  openGraph: {
    title: 'Skin Care Clinic in Littleton | The GLO Alchemist Skin & Laser Lab',
    description: '[The GLO Alchemist - Skin Care Clinic in Littleton, CO]',
    url: 'https://thegloalchemist.com',
    siteName: 'The GLO Alchemist',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://thegloalchemist.myaestheticrecord.com" />
        
        {/* SkinCareClinic Schema.org JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SkinCareClinic',
            name: 'The GLO Alchemist',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '709 W Littleton Blvd Ste 105',
              addressLocality: 'Littleton',
              addressRegion: 'CO',
              postalCode: '80120',
            },
            telephone: '+1-303-506-3582',
            url: 'https://thegloalchemist.com',
            openingHours: 'Tu-Sa 09:30-17:00',
            image: 'https://thegloalchemist.com/hero.webp',
            priceRange: '$$',
            sameAs: [
              'https://www.facebook.com/thegloalchemist',
              'https://www.instagram.com/thegloalchemist',
            ],
          }),
        }} />
        
        {/* Review Schema.org JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Review',
            itemReviewed: {
              '@type': 'SkinCareClinic',
              name: 'The GLO Alchemist',
            },
            author: {
              '@type': 'Person',
              name: '[Reviewer Name Placeholder]'
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            reviewBody: '[Review text placeholder]'
          }),
        }} />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 font-sans font-bold text-brown-900">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}