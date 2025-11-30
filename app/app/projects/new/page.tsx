"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { StyleTagSelect } from "@/components/generator/style-tag-select"

export default function NewProjectPage() {
  const router = useRouter()
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1, delay: 0.1 },
      )

      gsap.fromTo(
        formRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1, delay: 0.3 },
      )
    })

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock project creation
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Generate a mock ID and redirect
    const mockId = Math.random().toString(36).substring(7)
    router.push(`/app/projects/${mockId}`)
  }

  return (
    <div className="py-8 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div ref={headingRef} className="mb-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to projects
          </button>
          <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-2">
            Create <span className="italic">Project</span>
          </h1>
          <p className="text-muted-foreground">Set up your project to start generating landing pages</p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          <div className="border border-border p-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="project-name" className="text-sm font-medium text-foreground">
                Project name
              </label>
              <Input
                id="project-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., SaaS Landing Page"
                required
                className="h-12 bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-foreground transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="project-description" className="text-sm font-medium text-foreground">
                Description
              </label>
              <Textarea
                id="project-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What kind of landing page are you creating? Who is your target audience?"
                rows={4}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-foreground transition-colors resize-none"
              />
            </div>
          </div>

          <div className="border border-border p-8">
            <h2 className="text-lg font-medium text-foreground mb-2">Style Direction</h2>
            <p className="text-sm text-muted-foreground mb-6">Select styles to guide the AI generation (optional)</p>
            <StyleTagSelect selectedStyles={selectedStyles} onStylesChange={setSelectedStyles} />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-border text-foreground hover:bg-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !name}
              className="bg-foreground text-background hover:bg-foreground/90 font-medium tracking-wide transition-all duration-300 hover:tracking-wider"
            >
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
