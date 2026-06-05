import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Student Dashboard | Academic Hub',
  description: 'A futuristic student dashboard for managing courses, tracking progress, and staying on top of deadlines',
  generator: 'Next.js',
  icons: {
    icon: [
      {
        url: '/next.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/next.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/next.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/vercel.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-[#0a0a0a] text-white">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
