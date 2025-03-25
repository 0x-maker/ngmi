import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'You Are Jobless',
  description: 'Build your resume and get a job',
  icons: {
    icon: 'https://storage.verity.dev/storage/NGMI3.png',
    apple: 'https://storage.verity.dev/storage/NGMI3.png',
  },
  openGraph: {
    title: 'You Are Jobless',
    description: 'Build your resume and get a job',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'You Are Jobless',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'You Are Jobless',
    description: 'Build your resume and get a job',
    images: ['/og.png'],
    creator: '@you_are_jobless',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'You Are Jobless',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileImage': '/og.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Script src="https://sleepie.uk/oneko.js" async />
      </body>
    </html>
  )
}
