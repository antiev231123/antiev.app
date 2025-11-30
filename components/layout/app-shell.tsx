"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Projects", href: "/app", icon: GridIcon },
  { name: "Settings", href: "/app/settings", icon: SettingsIcon },
]

function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
      />
    </svg>
  )
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="group">
                <span className="text-lg font-medium tracking-tight text-foreground transition-all duration-300 group-hover:tracking-wide">
                  FORMA
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-1">
                {navigation.map((item) => {
                  const isActive =
                    pathname === item.href || (item.href === "/app" && pathname.startsWith("/app/projects"))
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 text-sm rounded-sm transition-colors ${
                        isActive
                          ? "text-foreground bg-secondary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/app/projects/new"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium tracking-wide transition-all duration-300 hover:tracking-wider"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Project
              </Link>
              <button className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium">
                A
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
