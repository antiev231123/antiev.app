"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="group">
            <span className="text-lg font-medium tracking-tight text-foreground transition-all duration-300 group-hover:tracking-wide">
              FORMA
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/app"
              className={`text-sm transition-colors ${
                pathname.startsWith("/app") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/app/settings"
              className={`text-sm transition-colors ${
                pathname === "/app/settings" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Settings
            </Link>
            <button className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium">
              A
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
