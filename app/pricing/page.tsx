"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { MarketingHeader } from "@/components/layout/marketing-header"
import { MarketingFooter } from "@/components/layout/marketing-footer"

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for exploring the platform",
    features: ["5 briefs per month", "Basic style library", "Standard export formats", "Community support"],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    description: "For serious creators and teams",
    features: [
      "Unlimited briefs",
      "Full style library",
      "Advanced customization",
      "Priority support",
      "Team collaboration",
      "API access",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations at scale",
    features: [
      "Everything in Professional",
      "Custom integrations",
      "Dedicated account manager",
      "SSO & advanced security",
      "Custom training",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    featured: false,
  },
]

export default function PricingPage() {
  const headingRef = useRef<HTMLDivElement>(null)
  const plansRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children || [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15, delay: 0.3 },
      )

      const planCards = plansRef.current?.querySelectorAll(".plan-card")
      if (planCards) {
        gsap.fromTo(
          planCards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            delay: 0.6,
          },
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <MarketingHeader />

      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div ref={headingRef} className="text-center mb-20">
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-6">Pricing</span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal tracking-[-0.02em] text-foreground mb-6">
              Simple, <span className="italic">transparent</span>
              <br />
              pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          {/* Plans */}
          <div ref={plansRef} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`plan-card group relative bg-background p-8 lg:p-12 transition-colors duration-500 ${
                  plan.featured ? "bg-card" : "hover:bg-card"
                }`}
              >
                {plan.featured && <div className="absolute top-0 left-0 right-0 h-px bg-accent" />}

                <div className="mb-8">
                  <h3 className="text-sm font-medium tracking-wide text-muted-foreground mb-4 uppercase">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="font-serif text-5xl font-normal text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 text-accent mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.featured ? "/auth/sign-up" : "#"}
                  className={`block w-full text-center py-4 text-sm font-medium tracking-wide transition-all duration-300 hover:tracking-wider ${
                    plan.featured
                      ? "bg-foreground text-background"
                      : "border border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}
