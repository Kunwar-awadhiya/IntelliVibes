// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: {
    default: 'intellivibes – Best Internships & Jobs for Students in India',
    template: '%s | intellivibes',
  },
  description: 'intellivibes helps students find the best internships and entry-level jobs in India. Curated from trusted sources like company career pages, Internshala, LinkedIn, Unstop, and more. Updated daily.',
  keywords: [
    'internships', 'internshala', 'remote internships', 'India internships',
    'Cuvette', 'engineering internship', 'marketing internship',
    'internship in bangalore', 'jobs', 'intellivibes', 'intellivibes',
    'intellivibes', 'intellivibes', 'remote jobs' , 'founder of intellivibes kunwar awadhiya' , 'intellivibes telegram' , 'intellivibes insta', 'intellivibes Linkdln page' , 'intellivibes.live' , 'Intervibes live',
    'founder of intellivibes is kunwar awadhiya' , 'kunwar awadhiya is the founder of intellivibes' , 'intellivibes.live',
  ],
  creator: 'Kunwar Awadhiya (Founder of intellivibes)',
  authors: [
    { name: 'Kunwar Awadhiya', url: 'https://in.linkedin.com/in/kunwar-awadhiya' },
    { name: 'intellivibes Team', url: 'https://intellivibes.live' }
  ],
  metadataBase: new URL('https://intellivibes.live'),

  openGraph: {
    title: 'intellivibes – Curated Internships and Jobs in India',
    description: 'Explore top internship opportunities from trusted platforms. Verified, filtered, and updated regularly.',
    url: 'https://intellivibes.live',
    siteName: 'intellivibes',
    images: [
      {
        url: 'https://intellivibes.live/favicon.ico',
        width: 1200,
        height: 630,
        alt: 'intellivibes Internship Banner',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'intellivibes – Explore Internships and Jobs in India',
    description: 'Verified and curated internships and jobs updated weekly. Join intellivibes and land your dream role!',
    creator: '@intellivibes',
    images: ['https://intellivibes.live/favicon.ico'],
  },

  icons: {
    icon: '/favicon.ico',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  other: {
    'google-site-verification': 'J3N-NWqggCWN9bGr61oq-zoKQuaIYygYk8QNQ5iLCOg',
    'author': 'Kunwar Awadhiya',
    'publisher': 'intellivibes',
    'canonical': 'https://intellivibes.live/',
    'alternate': 'https://intellivibes.live/',
    'schema': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "intellivibes",
      "url": "https://intellivibes.live",
      "logo": "https://intellivibes.live/images/logo.png",
      "sameAs": [
        "https://www.linkedin.com/company/intellivibes",
        "https://t.me/intellivibes"
      ],
      "founder": {
        "@type": "Person",
        "name": "Kunwar Awadhiya"
      }
    })
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-slate-900 text-white">
        {/* <Navbar /> */}
        <main>
          {children}
          <Analytics />
        </main>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
