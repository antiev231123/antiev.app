"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useParams, useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InputPanel } from "@/components/generator/input-panel"
import { OutputPanel } from "@/components/generator/output-panel"
import { HistoryList } from "@/components/generator/history-list"
import { PreviewFrame } from "@/components/generator/preview-frame"
import { mockProjects, mockGenerations } from "@/lib/mock-data"
import type { Generation } from "@/lib/types"

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const headingRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [generations, setGenerations] = useState<Generation[]>(mockGenerations)
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(mockGenerations[0] || null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Find project or use default
  const project = mockProjects.find((p) => p.id === params.id) || {
    id: params.id as string,
    name: "New Project",
    description: "",
    styles: [],
    generationCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1, delay: 0.1 },
      )

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.3 },
      )
    })

    return () => ctx.revert()
  }, [])

  const handleGenerate = async (brief: string, audience: string, styles: string[]) => {
    setIsGenerating(true)

    // Simulate generation
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const newGeneration: Generation = {
      id: Math.random().toString(36).substring(7),
      projectId: project.id,
      brief,
      audience,
      styles,
      output: generateMockOutput(brief, audience, styles),
      htmlCode: generateMockHtml(brief, audience, styles),
      createdAt: new Date(),
    }

    setGenerations((prev) => [newGeneration, ...prev])
    setSelectedGeneration(newGeneration)
    setIsGenerating(false)
  }

  return (
    <div className="py-8 px-6 lg:px-8 min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headingRef} className="mb-8">
          <button
            onClick={() => router.push("/app")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to projects
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-normal tracking-tight text-foreground mb-1">
                {project.name}
              </h1>
              {project.description && <p className="text-muted-foreground text-sm">{project.description}</p>}
            </div>
            <span className="font-mono text-xs text-accent">{generations.length} pages</span>
          </div>
        </div>

        {/* Main content */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left panel - Input */}
          <div className="lg:col-span-4">
            <InputPanel onGenerate={handleGenerate} isGenerating={isGenerating} defaultStyles={project.styles} />
          </div>

          {/* Right panel - Output */}
          <div className="lg:col-span-8">
            <div className="border border-border bg-card">
              <Tabs defaultValue="preview" className="w-full">
                <div className="border-b border-border px-6">
                  <TabsList className="h-14 bg-transparent p-0 gap-6">
                    <TabsTrigger
                      value="preview"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none h-full px-0 text-sm font-medium"
                    >
                      HTML Preview
                    </TabsTrigger>
                    <TabsTrigger
                      value="code"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none h-full px-0 text-sm font-medium"
                    >
                      Code
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none h-full px-0 text-sm font-medium"
                    >
                      History
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="preview" className="m-0">
                  {selectedGeneration ? <PreviewFrame generation={selectedGeneration} /> : <EmptyState />}
                </TabsContent>

                <TabsContent value="code" className="m-0">
                  {selectedGeneration ? <OutputPanel generation={selectedGeneration} /> : <EmptyState />}
                </TabsContent>

                <TabsContent value="history" className="m-0">
                  <HistoryList
                    generations={generations}
                    selectedId={selectedGeneration?.id}
                    onSelect={setSelectedGeneration}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="p-12 text-center">
      <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      </div>
      <h3 className="font-serif text-xl text-foreground mb-2">No page generated yet</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
        Describe your landing page on the left and click generate to create your first HTML page
      </p>
    </div>
  )
}

function generateMockOutput(brief: string, audience: string, styles: string[]): string {
  return `# Landing Page Generated

## Overview
${brief}

## Target Audience
${audience || "General audience"}

## Applied Styles
${styles.length > 0 ? styles.map((s) => `- ${s}`).join("\n") : "- Default modern style"}

## Sections Included
1. Hero with headline and CTA
2. Features/Benefits grid
3. Social proof section
4. Call-to-action footer

## Design Tokens
- Typography: System serif + sans-serif
- Colors: Based on selected style
- Spacing: 8px base unit`
}

function generateMockHtml(brief: string, audience: string, styles: string[]): string {
  const primaryColor = styles.includes("Luxury") ? "#c9a961" : styles.includes("Tech-Forward") ? "#3b82f6" : "#c45c3e"
  const bgColor = styles.includes("Minimal") ? "#ffffff" : "#0a0a0a"
  const textColor = bgColor === "#ffffff" ? "#0a0a0a" : "#f5f2eb"

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --primary: ${primaryColor};
      --bg: ${bgColor};
      --text: ${textColor};
    }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    /* Header */
    header {
      padding: 1.5rem 0;
      border-bottom: 1px solid rgba(128,128,128,0.2);
    }
    header nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-weight: 600;
      font-size: 1.25rem;
      letter-spacing: -0.02em;
    }
    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }
    .nav-links a {
      color: var(--text);
      text-decoration: none;
      font-size: 0.875rem;
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    .nav-links a:hover { opacity: 1; }
    /* Hero */
    .hero {
      padding: 8rem 0;
      text-align: center;
    }
    .hero h1 {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 400;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      letter-spacing: -0.03em;
    }
    .hero h1 em {
      font-style: italic;
      color: var(--primary);
    }
    .hero p {
      font-size: 1.125rem;
      max-width: 600px;
      margin: 0 auto 2rem;
      opacity: 0.8;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      background: var(--primary);
      color: ${bgColor === "#ffffff" ? "#ffffff" : "#0a0a0a"};
      border: none;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    /* Features */
    .features {
      padding: 6rem 0;
      border-top: 1px solid rgba(128,128,128,0.2);
    }
    .features h2 {
      text-align: center;
      font-size: 2rem;
      font-weight: 400;
      margin-bottom: 4rem;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    .feature {
      padding: 2rem;
      border: 1px solid rgba(128,128,128,0.2);
    }
    .feature h3 {
      font-size: 1.25rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
    }
    .feature p {
      font-size: 0.9rem;
      opacity: 0.7;
    }
    /* CTA */
    .cta {
      padding: 6rem 0;
      text-align: center;
      background: var(--primary);
      color: ${bgColor === "#ffffff" ? "#ffffff" : "#0a0a0a"};
    }
    .cta h2 {
      font-size: 2.5rem;
      font-weight: 400;
      margin-bottom: 1rem;
    }
    .cta p {
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    .btn-outline {
      background: transparent;
      border: 1px solid currentColor;
      color: inherit;
    }
    /* Footer */
    footer {
      padding: 3rem 0;
      text-align: center;
      font-size: 0.875rem;
      opacity: 0.6;
    }
  </style>
</head>
<body>
  <header>
    <nav class="container">
      <div class="logo">Brand</div>
      <ul class="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <section class="hero">
    <div class="container">
      <h1>Build something<br><em>extraordinary</em></h1>
      <p>${brief || "Create beautiful experiences that captivate your audience and drive meaningful results."}</p>
      <button class="btn">
        Get Started
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </section>

  <section class="features" id="features">
    <div class="container">
      <h2>Why choose us</h2>
      <div class="features-grid">
        <div class="feature">
          <h3>Lightning Fast</h3>
          <p>Optimized performance ensures your site loads in milliseconds, keeping visitors engaged.</p>
        </div>
        <div class="feature">
          <h3>Beautiful Design</h3>
          <p>Carefully crafted interfaces that balance aesthetics with usability.</p>
        </div>
        <div class="feature">
          <h3>Fully Responsive</h3>
          <p>Perfect experience across all devices, from mobile to desktop.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="cta">
    <div class="container">
      <h2>Ready to get started?</h2>
      <p>Join thousands of satisfied customers building amazing products.</p>
      <button class="btn btn-outline">Start Free Trial</button>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; 2025 Brand. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`
}
