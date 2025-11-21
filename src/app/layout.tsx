import type { Metadata } from 'next'
import { Inter, EB_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Microseasons Calendar | 七十二候',
  description: 'A beautiful, customizable calendar showcasing the Japanese 72 microseasons overlaid with the Western calendar system.',
  keywords: ['calendar', 'microseasons', '七十二候', 'Japanese calendar', '3D calendar'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${ebGaramond.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
