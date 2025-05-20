import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ReactQueryProvider } from "@/components/providers/query-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "GoNetwork AI",
  description: "Plataforma de gerenciamento de produção audiovisual",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
