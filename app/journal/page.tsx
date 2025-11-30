"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import Link from "next/link"
import { MarketingHeader } from "@/components/layout/marketing-header"
import { MarketingFooter } from "@/components/layout/marketing-footer"

gsap.registerPlugin(SplitText)

const articles = [
  {
    id: "1",
    title: "The Typography-First Approach to Landing Page Design",
    excerpt: "How thoughtful typography choices can elevate your landing pages and create lasting impressions.",
    date: "Nov 28, 2025",
    category: "Design",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "AI-Generated Code: Quality vs Speed",
    excerpt: "Exploring the balance between rapid generation and production-ready output in modern AI tools.",
    date: "Nov 25, 2025",
    category: "Technology",
    readTime: "8 min read",
  },
  {
    id: "3",
    title: "Style Systems: Building Consistent Design Languages",
    excerpt: "Why predefined style systems lead to more cohesive and effective landing page designs.",
    date: "Nov 20, 2025",
    category: "Design",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "The Future of No-Code Landing Pages",
    excerpt: "How AI is reshaping the landscape of web creation for non-technical creators.",
    date: "Nov 15, 2025",
    category: "Industry",
    readTime: "7 min read",
  },
]

export default function JournalPage() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const articlesRef = useRef<HTMLDivElement>(null)

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

      const articleItems = articlesRef.current?.querySelectorAll(".article-item")
      if (articleItems) {
        gsap.fromTo(
          articleItems,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15, delay: 0.6 },
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <MarketingHeader />

      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-20">
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-6">Journal</span>
            <h1
              ref={headlineRef}
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal tracking-[-0.02em] text-foreground leading-tight"
            >
              Thoughts on
              <br />
              <span className="italic text-muted-foreground">design & code</span>
            </h1>
          </div>

          {/* Articles */}
          <div ref={articlesRef} className="space-y-0">
            {articles.map((article, index) => (
              <article
                key={article.id}
                className="article-item group grid grid-cols-1 lg:grid-cols-12 gap-6 py-12 border-t border-border"
              >
                <div className="lg:col-span-2">
                  <span className="font-mono text-xs text-muted-foreground">{article.date}</span>
                </div>
                <div className="lg:col-span-7">
                  <Link href={`/journal/${article.id}`} className="block group-hover:opacity-80 transition-opacity">
                    <h2 className="font-serif text-2xl md:text-3xl font-normal text-foreground mb-3 transition-all duration-300 group-hover:tracking-wide">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">{article.excerpt}</p>
                  </Link>
                </div>
                <div className="lg:col-span-3 flex lg:flex-col lg:items-end gap-4 lg:gap-2">
                  <span className="px-3 py-1 text-xs border border-border text-muted-foreground">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}
