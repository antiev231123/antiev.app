"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

const personas = [
  {
    title: "Founders",
    description:
      "Launch MVPs faster. Generate landing pages for your startup ideas and validate them in hours, not weeks.",
  },
  {
    title: "Designers",
    description: "Accelerate your workflow. Get production-ready HTML that matches your creative vision instantly.",
  },
  {
    title: "Developers",
    description: "Skip the boilerplate. Export clean, semantic code that integrates seamlessly into your projects.",
  },
  {
    title: "Marketers",
    description: "Test campaigns rapidly. Create multiple landing page variants for A/B testing in minutes.",
  },
]

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        },
      )

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll(".persona-card")
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          },
        )
      }

      // CTA animation
      gsap.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-6 lg:px-8 border-t border-border">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div ref={headingRef} className="mb-20 max-w-4xl">
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-6">Who It's For</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal tracking-[-0.02em] text-foreground leading-tight">
            Built for those who
            <br />
            <span className="italic text-muted-foreground">ship fast</span>
          </h2>
        </div>

        {/* Persona cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border mb-24">
          {personas.map((persona, index) => (
            <div
              key={persona.title}
              className="persona-card group bg-background p-8 lg:p-10 transition-colors duration-500 hover:bg-card"
            >
              <span className="font-mono text-xs text-accent mb-6 block">0{index + 1}</span>
              <h3 className="font-serif text-2xl font-normal text-foreground mb-4 transition-all duration-300 group-hover:tracking-wide">
                {persona.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{persona.description}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div ref={ctaRef} className="text-center">
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.02em] text-foreground mb-8">
            Ready to <span className="italic">generate</span>?
          </h3>
          <Link
            href="/auth/sign-up"
            className="group inline-flex items-center justify-center px-10 py-5 bg-foreground text-background text-sm font-medium tracking-wide transition-all duration-300 hover:tracking-wider"
          >
            <span>Start Free</span>
            <svg
              className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
