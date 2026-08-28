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
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth max-md:scroll-auto max-md:overflow-x-clip">
      <body className={`${geist.variable} ${geistMono.variable} ${courierPrime.variable} ${ibmPlexSans.variable} font-sans bg-[#F5F4F0] text-[#111] antialiased selection:bg-[#111] selection:text-[#F5F4F0] max-md:max-w-full`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
