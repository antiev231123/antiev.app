"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import Link from "next/link"

gsap.registerPlugin(SplitText)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const accentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, {
          type: "chars,words",
          charsClass: "char",
          wordsClass: "word",
        })

        gsap.fromTo(
          split.chars,
          {
            opacity: 0,
            y: 100,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.03,
            delay: 0.5,
          },
        )
      }

      gsap.fromTo(
        subheadRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1.2 },
      )

      gsap.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15, delay: 1.5 },
      )

      gsap.fromTo(accentRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power4.inOut", delay: 1.8 })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-8 pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, var(--foreground) 1px, transparent 1px),
                             linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl w-full relative">
        {/* Editorial label */}
        <div className="mb-8 flex items-center gap-4">
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">AI Landing Page Generator</span>
          <div className="h-px w-16 bg-border" />
          <span className="text-xs text-muted-foreground font-mono">2025</span>
        </div>

        {/* Main headline - oversized typography */}
        <h1
          ref={headlineRef}
          className="font-serif text-[clamp(3rem,12vw,12rem)] font-normal leading-[0.85] tracking-[-0.04em] text-foreground mb-8"
          style={{ perspective: "1000px" }}
        >
          Idea to
          <br />
          <span className="italic">Code</span>
        </h1>

        {/* Accent bar */}
        <div ref={accentRef} className="h-1 w-32 bg-accent mb-12 origin-left" />

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 font-light"
        >
          Describe your vision, select a style, and let AI generate beautiful, production-ready HTML landing pages in
          seconds. Preview instantly, export clean code.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/auth/sign-up"
            className="group inline-flex items-center justify-center px-8 py-4 bg-foreground text-background text-sm font-medium tracking-wide transition-all duration-300 hover:tracking-wider"
          >
            <span>Start Generating</span>
            <svg
              className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground text-sm font-medium tracking-wide transition-all duration-300 hover:bg-secondary"
          >
            See How It Works
          </Link>
        </div>

        {/* Bottom editorial element */}
        <div className="absolute bottom-8 right-0 hidden lg:block">
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase writing-vertical">Scroll to Explore</p>
        </div>
      </div>
    </section>
  )
}
