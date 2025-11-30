"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: "01",
    title: "Describe",
    description:
      "Enter your project idea, target audience, and select visual styles. Our intuitive input panel guides your creative vision.",
  },
  {
    number: "02",
    title: "Generate",
    description:
      "AI processes your inputs and crafts a complete landing page with semantic HTML, responsive CSS, and modern design patterns.",
  },
  {
    number: "03",
    title: "Preview & Export",
    description:
      "Instantly preview your generated page in real-time. Export production-ready HTML code or continue iterating until perfect.",
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current?.children || [],
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        },
      )

      // Steps animation
      const stepElements = stepsRef.current?.querySelectorAll(".step-item")
      if (stepElements) {
        stepElements.forEach((step, index) => {
          gsap.fromTo(
            step,
            { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
              },
            },
          )
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="py-32 px-6 lg:px-8 border-t border-border">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div ref={headingRef} className="mb-24">
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-6">How It Works</span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal tracking-[-0.02em] text-foreground leading-tight">
            From idea to
            <br />
            <span className="italic text-muted-foreground">live preview</span>
          </h2>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="space-y-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="step-item group grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 border-t border-border"
            >
              {/* Number */}
              <div className="lg:col-span-2">
                <span className="font-mono text-sm text-accent">{step.number}</span>
              </div>

              {/* Title */}
              <div className="lg:col-span-3">
                <h3 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-foreground transition-all duration-500 group-hover:tracking-wide">
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <div className="lg:col-span-7">
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
