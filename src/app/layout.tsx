import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Dashboard COVID-19 Brasil',
  description: 'Dashboard interativo com dados da COVID-19 no Brasil',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} dark`}>
      <body className="bg-gray-900 text-gray-100 min-h-screen">
        <header className="bg-gray-800 py-4">
          <div className="container mx-auto px-4">
            <Link href="/" className="text-xl font-bold">
              Dashboard COVID-19
            </Link>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
