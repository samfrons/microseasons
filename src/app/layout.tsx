import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
