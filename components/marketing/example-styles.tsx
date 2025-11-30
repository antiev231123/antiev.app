"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const styles = [
  { name: "Minimal", category: "Aesthetic", preview: "Clean layouts, ample whitespace, focused content hierarchy" },
  { name: "Bold", category: "Aesthetic", preview: "Strong typography, high contrast, impactful visuals" },
  {
    name: "Editorial",
    category: "Aesthetic",
    preview: "Magazine-inspired layouts, elegant typography, refined spacing",
  },
  { name: "Brutalist", category: "Aesthetic", preview: "Raw aesthetics, unconventional layouts, expressive forms" },
  { name: "Organic", category: "Aesthetic", preview: "Natural shapes, soft colors, flowing compositions" },
  { name: "Tech-Forward", category: "Industry", preview: "Modern interfaces, sleek components, innovation-focused" },
  { name: "Luxury", category: "Industry", preview: "Premium feel, sophisticated palettes, refined details" },
  { name: "Playful", category: "Tone", preview: "Vibrant colors, dynamic animations, engaging interactions" },
  { name: "Corporate", category: "Tone", preview: "Professional layouts, trust-building design, clear structure" },
  { name: "Artisanal", category: "Tone", preview: "Handcrafted feel, unique textures, authentic character" },
]

export function ExampleStyles() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const [activeTag, setActiveTag] = useState<(typeof styles)[0] | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children || [],
        { opacity: 0, y: 40 },
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

      const tags = tagsRef.current?.querySelectorAll(".style-tag")
      if (tags) {
        gsap.fromTo(
          tags,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.08,
            scrollTrigger: {
              trigger: tagsRef.current,
              start: "top 80%",
            },
          },
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="styles" className="py-32 px-6 lg:px-8 bg-card">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div ref={headingRef} className="mb-16 max-w-3xl">
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-6">Style Library</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal tracking-[-0.02em] text-foreground leading-tight mb-6">
            Choose your <span className="italic">style</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Select one or more styles to guide the AI. Each style influences layout, typography, color palette, and
            overall design direction of your generated landing page.
          </p>
        </div>

        {/* Style tags */}
        <div ref={tagsRef} className="flex flex-wrap gap-4">
          {styles.map((style) => (
            <button
              key={style.name}
              className={`style-tag group relative px-6 py-3 border transition-all duration-300 ${
                activeTag?.name === style.name
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-foreground hover:border-foreground"
              }`}
              onClick={() => setActiveTag(activeTag?.name === style.name ? null : style)}
            >
              <span className="text-sm font-medium tracking-wide transition-all duration-300 group-hover:tracking-wider">
                {style.name}
              </span>
              <span className="ml-3 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {style.category}
              </span>
            </button>
          ))}
        </div>

        {/* Preview area */}
        <div className="mt-16 p-12 border border-border bg-background/50">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4 tracking-wide uppercase">
              {activeTag ? `Style: ${activeTag.name}` : "Select a style to preview"}
            </p>
            <p className="font-serif text-2xl md:text-3xl text-foreground/60 italic mb-6">
              {activeTag ? activeTag.preview : "Click any style tag to see what it brings to your landing page"}
            </p>
            {activeTag && (
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <span className="px-3 py-1 text-xs bg-secondary text-foreground rounded-full">Layout patterns</span>
                <span className="px-3 py-1 text-xs bg-secondary text-foreground rounded-full">Color system</span>
                <span className="px-3 py-1 text-xs bg-secondary text-foreground rounded-full">Typography scale</span>
                <span className="px-3 py-1 text-xs bg-secondary text-foreground rounded-full">Component styling</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
