import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, IBM_Plex_Sans, Courier_Prime } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const courierPrime = Courier_Prime({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-pixel" });
const ibmPlexSans = IBM_Plex_Sans({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: 'Muhammed Faizal Chirakkal — Entrepreneur, CEO, Business Leader & Author',
  description: 'Official portfolio of Muhammed Faizal Chirakkal (known in writings as Faizal Muhammed), CEO & Managing Director across India, UK, and UAE. Author of "The Entrepreneur". Think Beyond Business. Build Beyond Boundaries.',
  keywords: [
    'Muhammed Faizal Chirakkal',
    'Faizal Muhammed',
    'The Entrepreneur book',
    'CEO Adam Finastra',
    'Guileless Resources',
    'Keatonx Media',
    'Thinkstra Entertainment',
    'House of Adam Events UK',
    'Adam Entertainment UAE',
    'Business Leader India UK UAE',
    'Entrepreneurship'
  ],
  authors: [{ name: 'Muhammed Faizal Chirakkal' }],
  openGraph: {
    title: 'Muhammed Faizal Chirakkal — Entrepreneur | CEO | Author',
    description: 'Think Beyond Business. Build Beyond Boundaries. Exploring technology, human capital, media, entertainment, and international business across India, the UK, and the UAE.',
    type: 'website',
    url: 'https://faizalchirakkal.com',
    siteName: 'Muhammed Faizal Chirakkal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammed Faizal Chirakkal — Entrepreneur, CEO & Author',
    description: 'Think Beyond Business. Build Beyond Boundaries. Author of The Entrepreneur.',
  },
  icons: {
    icon: [
      { url: '/images/h1.jpg', type: 'image/jpeg' },
      { url: '/images/h1.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/images/h1.jpg', sizes: '192x192', type: 'image/jpeg' },
    ],
    shortcut: '/images/h1.jpg',
    apple: '/images/h1.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth max-md:scroll-auto max-md:overflow-x-clip">
      <head>
        <link rel="icon" href="/images/h1.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/h1.jpg" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${courierPrime.variable} ${ibmPlexSans.variable} font-sans bg-[#F5F4F0] text-[#111] antialiased selection:bg-[#111] selection:text-[#F5F4F0] max-md:max-w-full`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
