// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: {
    default: 'InternVibes – Best Internships & Jobs for Students in India',
    template: '%s | InternVibes',
  },
  description: 'InternVibes helps students find the best internships and entry-level jobs in India. Curated from trusted sources like company career pages, Internshala, LinkedIn, Unstop, and more. Updated daily.',
  keywords: [
    'internships', 'internshala', 'remote internships', 'India internships',
    'Cuvette', 'engineering internship', 'marketing internship',
    'internship in bangalore', 'jobs', 'InternVibes', 'Internvibes',
    'internVibes', 'internvibes', 'remote jobs' , 'founder of Internvibes kunwar awadhiya' , 'Internvibes telegram' , 'Internvibes insta', 'internvibes Linkdln page' , 'Internvibes.live' , 'Intervibes live',
    'founder of internvibes is kunwar awadhiya' , 'kunwar awadhiya is the founder of InternVibes' , 'InternVibes.live',
  ],
  creator: 'Kunwar Awadhiya (Founder of InternVibes)',
  authors: [
    { name: 'Kunwar Awadhiya', url: 'https://in.linkedin.com/in/kunwar-awadhiya' },
    { name: 'InternVibes Team', url: 'https://internvibes.live' }
  ],
  metadataBase: new URL('https://internvibes.live'),

  openGraph: {
    title: 'InternVibes – Curated Internships and Jobs in India',
    description: 'Explore top internship opportunities from trusted platforms. Verified, filtered, and updated regularly.',
    url: 'https://internvibes.live',
    siteName: 'InternVibes',
    images: [
      {
        url: 'https://internvibes.live/favicon.ico',
        width: 1200,
        height: 630,
        alt: 'InternVibes Internship Banner',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'InternVibes – Explore Internships and Jobs in India',
    description: 'Verified and curated internships and jobs updated weekly. Join InternVibes and land your dream role!',
    creator: '@internvibes',
    images: ['https://internvibes.live/favicon.ico'],
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
    'publisher': 'InternVibes',
    'canonical': 'https://internvibes.live/',
    'alternate': 'https://internvibes.live/',
    'schema': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "InternVibes",
      "url": "https://internvibes.live",
      "logo": "https://internvibes.live/images/logo.png",
      "sameAs": [
        "https://www.linkedin.com/company/internvibes",
        "https://t.me/internvibes"
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
