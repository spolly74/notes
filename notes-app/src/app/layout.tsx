import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Header } from "./components/header"
import { Sidebar } from "./components/sidebar"
import { ActionSidebar } from "./components/action-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IntelliNotes",
  description: "AI-Enhanced Note-Taking Application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="flex h-full flex-col">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
            <ActionSidebar />
          </div>
        </div>
      </body>
    </html>
  )
}

