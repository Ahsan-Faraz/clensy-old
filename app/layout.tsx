import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Providers from "./providers"

export const metadata: Metadata = {
  title: "CLENSY - Professional Cleaning Services",
  description: "Professional cleaning services tailored to your needs",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="//fonts.googleapis.com/css?family=Montserrat:300,400,400i,500,700&display=swap"
          media="all"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          async
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}