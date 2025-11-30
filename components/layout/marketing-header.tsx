"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"

export function MarketingHeader() {
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 },
      )
      gsap.fromTo(
        navRef.current?.children || [],
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1, delay: 0.4 },
      )
    })

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      ctx.revert()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <nav className="flex items-center justify-between py-6">
          <div ref={logoRef}>
            <Link href="/" className="group">
              <span className="text-xl font-medium tracking-tight text-foreground transition-all duration-300 group-hover:tracking-wide">
                FORMA
              </span>
            </Link>
          </div>

          <div ref={navRef} className="hidden md:flex items-center gap-8">
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Approach
            </Link>
            <Link
              href="#styles"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Styles
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Pricing
            </Link>
            <Link
              href="/auth/sign-in"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className="group relative text-sm font-medium text-accent-foreground bg-accent px-5 py-2.5 rounded-sm overflow-hidden transition-all duration-300 hover:tracking-wide"
            >
              <span className="relative z-10">Start Creating</span>
            </Link>
          </div>

          <button className="md:hidden text-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  )
}
