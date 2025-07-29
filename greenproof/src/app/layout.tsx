import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GreenProof - Environmental Impact Tracking',
  description: 'Revolutionize environmental impact tracking with real-time, transparent, AI-powered Green Trust Score™',
  keywords: ['environment', 'sustainability', 'carbon credits', 'green trust score', 'eco-friendly'],
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
