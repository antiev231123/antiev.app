"use client"

import { useState } from "react"
import type { Generation } from "@/lib/types"

interface OutputPanelProps {
  generation: Generation
}

export function OutputPanel({ generation }: OutputPanelProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generation.htmlCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadHtml = () => {
    const blob = new Blob([generation.htmlCode], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "landing-page.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground bg-background border border-border transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </>
          )}
        </button>
        <button
          onClick={downloadHtml}
          className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground bg-background border border-border transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download
        </button>
      </div>

      <pre className="p-6 pt-16 text-sm font-mono whitespace-pre-wrap overflow-auto max-h-[600px] bg-[#1e1e1e]">
        <code className="text-[#d4d4d4]">
          {generation.htmlCode.split("\n").map((line, i) => (
            <div key={i} className="leading-relaxed">
              <span className="text-muted-foreground/50 select-none mr-4 inline-block w-8 text-right">{i + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }} />
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}

function highlightSyntax(line: string): string {
  return line
    .replace(/(&lt;|<)(\/?)([\w-]+)/g, '<span class="text-[#569cd6]">&lt;$2$3</span>')
    .replace(/([\w-]+)=/g, '<span class="text-[#9cdcfe]">$1</span>=')
    .replace(/"([^"]*)"/g, '<span class="text-[#ce9178]">"$1"</span>')
    .replace(/\/\*[\s\S]*?\*\//g, '<span class="text-[#6a9955]">$&</span>')
    .replace(/\/\/.*/g, '<span class="text-[#6a9955]">$&</span>')
}
