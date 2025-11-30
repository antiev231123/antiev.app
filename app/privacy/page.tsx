"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { MarketingHeader } from "@/components/layout/marketing-header"
import { MarketingFooter } from "@/components/layout/marketing-footer"

gsap.registerPlugin(SplitText)

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">Last updated: November 30, 2025</p>
          </div>

          {/* Content */}
          <div ref={contentRef} className="prose prose-invert prose-lg max-w-none space-y-8">
            <div className="py-8 border-t border-border">
              <h2 className="font-serif text-xl font-normal text-foreground mb-4">Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information you provide directly, including your name, email address, and payment information
                when you create an account. We also collect usage data to improve our services, such as the types of
                landing pages you generate and how you interact with our platform.
              </p>
            </div>

            <div className="py-8 border-t border-border">
              <h2 className="font-serif text-xl font-normal text-foreground mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information helps us provide, maintain, and improve our services. We use it to process your
                transactions, send you technical notices and support messages, and respond to your inquiries. We never
                sell your personal information to third parties.
              </p>
            </div>

            <div className="py-8 border-t border-border">
              <h2 className="font-serif text-xl font-normal text-foreground mb-4">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your data. All data transmission is
                encrypted using SSL/TLS protocols. Your generated content is stored securely and accessible only to you
                unless you choose to share it.
              </p>
            </div>

            <div className="py-8 border-t border-border">
              <h2 className="font-serif text-xl font-normal text-foreground mb-4">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to access, update, or delete your personal information at any time. You can export
                your data or request account deletion through your account settings or by contacting our support team.
              </p>
            </div>

            <div className="py-8 border-t border-border">
              <h2 className="font-serif text-xl font-normal text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@forma.design" className="text-accent hover:underline">
                  privacy@forma.design
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
