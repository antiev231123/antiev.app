"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { MarketingHeader } from "@/components/layout/marketing-header"
import { MarketingFooter } from "@/components/layout/marketing-footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(SplitText)

export default function ContactPage() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <MarketingHeader />

      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16">
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-6">Contact</span>
            <h1
              ref={headlineRef}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal tracking-[-0.02em] text-foreground leading-tight mb-8"
            >
              Let's start a
              <br />
              <span className="italic text-muted-foreground">conversation</span>
            </h1>
          </div>

          {/* Content */}
          <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="font-medium text-foreground mb-3">General Inquiries</h2>
                <a
                  href="mailto:hello@forma.design"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  hello@forma.design
                </a>
              </div>
              <div>
                <h2 className="font-medium text-foreground mb-3">Support</h2>
                <a
                  href="mailto:support@forma.design"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  support@forma.design
                </a>
              </div>
              <div>
                <h2 className="font-medium text-foreground mb-3">Press</h2>
                <a
                  href="mailto:press@forma.design"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  press@forma.design
                </a>
              </div>
              <div className="pt-8 border-t border-border">
                <h2 className="font-medium text-foreground mb-4">Follow Us</h2>
                <div className="flex gap-4">
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-12 border border-border text-center">
                  <div className="w-16 h-16 rounded-full border border-accent flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-2">Message Sent</h3>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                        className="h-12 bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-foreground transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="h-12 bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      required
                      className="h-12 bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-foreground transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-foreground transition-colors resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-medium tracking-wide transition-all duration-300 hover:tracking-wider"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}
