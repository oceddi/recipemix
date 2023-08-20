import { Footer, Navbar } from '@/components'
import './globals.css'
import type { Metadata } from 'next'
import Provider from '@/components/Provider'

export const metadata: Metadata = {
  title: 'Recipe Mix',
  description: 'Find, share and talk about great recipes.',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className="">
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
