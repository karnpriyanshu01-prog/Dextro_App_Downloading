import type { Metadata, Viewport } from 'next'
import { Manrope, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdsterraScripts from '@/components/AdsterraScripts'
import AdsterraBanner from '@/components/AdsterraBanner'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { siteConfig } from '@/lib/site.config'
import { organizationJsonLd, websiteJsonLd } from '@/lib/jsonld'
import { getWhatsAppChannelLink } from '@/lib/settings'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jbMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jbmono', display: 'swap' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Dextro Play – Official Sports Streaming App & Latest APK',
    template: '%s | Dextro Play',
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: 'Dextro Play – Official Sports Streaming App & Latest APK',
    description: siteConfig.description,
    url: siteConfig.url,
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary',
    title: 'Dextro Play – Official Sports Streaming App & Latest APK',
    description: siteConfig.description,
    images: ['/logo.png'],
  },
  icons: { icon: '/logo.png' },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const whatsappLink = await getWhatsAppChannelLink()

  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${jbMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <Header />
        <main className="flex-1 pb-14 sm:pb-0">{children}</main>
        <Footer />
        {/* Mobile-only sticky bottom banner — common Adsterra 320x50 placement.
            Reserved space via pb-14 on <main> above so it never overlaps content. */}
        <AdsterraBanner sticky className="sm:hidden" />
        <AdsterraScripts />
        <WhatsAppFloat link={whatsappLink} />
      </body>
    </html>
  )
}
