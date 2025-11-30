"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { MarketingHeader } from "@/components/layout/marketing-header"
import { MarketingFooter } from "@/components/layout/marketing-footer"

gsap.registerPlugin(SplitText)

export default function AboutPage() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power4.out", stagger: 0.02, delay: 0.3 },
        )
      }

      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15, delay: 0.8 },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <MarketingHeader />

      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16">
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-6">About Us</span>
            <h1
              ref={headlineRef}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal tracking-[-0.02em] text-foreground leading-tight mb-8"
            >
              Crafting the future of
              <br />
              <span className="italic text-muted-foreground">web creation</span>
            </h1>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 border-t border-border">
              <div className="lg:col-span-4">
                <span className="font-mono text-sm text-accent">01</span>
                <h2 className="font-serif text-2xl font-normal text-foreground mt-2">Our Mission</h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe everyone should have access to beautiful, professional web design. Forma empowers creators,
                  entrepreneurs, and teams to bring their ideas to life without the traditional barriers of coding
                  expertise or design resources.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 border-t border-border">
              <div className="lg:col-span-4">
                <span className="font-mono text-sm text-accent">02</span>
                <h2 className="font-serif text-2xl font-normal text-foreground mt-2">Our Approach</h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We combine cutting-edge AI with meticulous attention to design principles. Every generated landing
                  page reflects our commitment to typography, spacing, and visual hierarchy—the foundational elements
                  that distinguish exceptional design.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 border-t border-border">
              <div className="lg:col-span-4">
                <span className="font-mono text-sm text-accent">03</span>
                <h2 className="font-serif text-2xl font-normal text-foreground mt-2">Our Promise</h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Clean, semantic code. Production-ready output. No vendor lock-in. Every landing page you generate is
                  yours to use, modify, and deploy anywhere. We provide the tools; you own the results.
                </p>
              </div>
            </div>

            {/* Team values */}
            <div className="py-16 border-t border-border">
              <h3 className="font-serif text-3xl font-normal text-foreground mb-12">Our Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 border border-border">
                  <h4 className="font-medium text-foreground mb-3">Quality First</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every pixel, every line of code matters. We never compromise on craftsmanship.
                  </p>
                </div>
                <div className="p-6 border border-border">
                  <h4 className="font-medium text-foreground mb-3">Accessibility</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Great design should be available to everyone, regardless of technical skill.
                  </p>
                </div>
                <div className="p-6 border border-border">
                  <h4 className="font-medium text-foreground mb-3">Transparency</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Clean code, clear pricing, honest communication. No hidden complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}
