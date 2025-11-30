"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { MarketingHeader } from "@/components/layout/marketing-header"
import { MarketingFooter } from "@/components/layout/marketing-footer"

gsap.registerPlugin(SplitText)

export default function TermsPage() {
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
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 0.6 },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <MarketingHeader />

      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-16">
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-6">Legal</span>
            <h1
              ref={headlineRef}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal tracking-[-0.02em] text-foreground leading-tight mb-4"
            >
              Terms of Service
            </h1>
            <p className="text-muted-foreground">Last updated: November 30, 2025</p>
          </div>

          {/* Content */}
          <div ref={contentRef} className="prose prose-invert prose-lg max-w-none space-y-8">
            <div className="py-8 border-t border-border">
              <h2 className="font-serif text-xl font-normal text-foreground mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Forma, you accept and agree to be bound by these Terms of Service. If you do not
                agree to these terms, please do not use our services.
              </p>
            </div>

            <div className="py-8 border-t border-border">
              <h2 className="font-serif text-xl font-normal text-foreground mb-4">Use of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Forma provides AI-powered landing page generation tools. You may use our service to create, preview, and
                export landing pages for personal or commercial use. You retain full ownership of all content you
                generate through our platform.
              </p>
            </div>

            <div className="py-8 border-t border-border">
              <h2 className="font-serif text-xl font-normal text-foreground mb-4">User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials. You agree not to
                use our service to generate content that is illegal, harmful, or infringes on the rights of others.
              </p>
            </div>

            <div className="py-8 border-t border-border">
              <h2 className="font-serif text-xl font-normal text-foreground mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All landing pages and code you generate through Forma are yours to use, modify, and distribute as you
                see fit. The Forma platform, including our AI models and interface, remains our intellectual property.
              </p>
            </div>

            <div className="py-8 border-t border-border">
              <h2 className="font-serif text-xl font-normal text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Forma is provided "as is" without warranties of any kind. We are not liable for any damages arising from
                your use of our service, including but not limited to direct, indirect, incidental, or consequential
                damages.
              </p>
            </div>

            <div className="py-8 border-t border-border">
              <h2 className="font-serif text-xl font-normal text-foreground mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of significant changes via
                email or through our platform. Continued use of the service after changes constitutes acceptance of the
                new terms.
              </p>
            </div>

            <div className="py-8 border-t border-border">
              <h2 className="font-serif text-xl font-normal text-foreground mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:legal@forma.design" className="text-accent hover:underline">
                  legal@forma.design
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}
