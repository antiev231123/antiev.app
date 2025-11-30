"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { StyleTagSelect } from "./style-tag-select"

interface InputPanelProps {
  onGenerate: (brief: string, audience: string, styles: string[]) => void
  isGenerating: boolean
  defaultStyles?: string[]
}

export function InputPanel({ onGenerate, isGenerating, defaultStyles = [] }: InputPanelProps) {
  const [brief, setBrief] = useState("")
  const [audience, setAudience] = useState("")
  const [selectedStyles, setSelectedStyles] = useState<string[]>(defaultStyles)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!brief.trim()) return
    onGenerate(brief, audience, selectedStyles)
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-card">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-medium text-foreground">Generate Landing Page</h2>
        <p className="text-sm text-muted-foreground mt-1">Describe your page to generate HTML code</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <label htmlFor="brief" className="text-sm font-medium text-foreground">
            Page Description <span className="text-accent">*</span>
          </label>
          <Textarea
            id="brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Describe your landing page: What is it for? What sections do you need? What message should it convey?"
            rows={5}
            required
            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-foreground transition-colors resize-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="audience" className="text-sm font-medium text-foreground">
            Target Audience
          </label>
          <Input
            id="audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g., Startup founders, enterprise clients, young professionals"
            className="h-12 bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-foreground transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Style Direction</label>
          <StyleTagSelect selectedStyles={selectedStyles} onStylesChange={setSelectedStyles} compact />
        </div>
      </div>

      <div className="p-6 border-t border-border">
        <Button
          type="submit"
          disabled={isGenerating || !brief.trim()}
          className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-medium tracking-wide transition-all duration-300 hover:tracking-wider disabled:opacity-50"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating HTML...
            </span>
          ) : (
            "Generate Page"
          )}
        </Button>
      </div>
    </form>
  )
}
