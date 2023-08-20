
import type { ReactNode } from "react"
import Provider from '@/components/Provider'
import { Footer, Navbar } from '@/components'

export default function Layout({ children }: { children: ReactNode }) {
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