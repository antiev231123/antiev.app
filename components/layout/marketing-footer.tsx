"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

export function MarketingFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="group inline-block mb-6">
              <span className="text-xl font-medium tracking-tight text-foreground transition-all duration-300 group-hover:tracking-wide">
                FORMA
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI-powered landing page generator. Describe, generate, and export production-ready HTML in seconds.
            </p>
          </div>

          {/* Navigation - Product */}
          <div className="lg:col-span-2">
            <h4 className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-6">Product</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#how-it-works" className="text-sm text-foreground hover:text-accent transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#styles" className="text-sm text-foreground hover:text-accent transition-colors">
                  Styles
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-foreground hover:text-accent transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-sm text-foreground hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-sm text-foreground hover:text-accent transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-foreground hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-6">Stay Updated</h4>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-foreground text-background text-sm font-medium tracking-wide transition-all duration-300 hover:tracking-wider"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">&copy; 2025 Forma. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
