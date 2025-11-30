"use client"

import { useState } from "react"
import type { Generation } from "@/lib/types"

interface PreviewFrameProps {
  generation: Generation
}

export function PreviewFrame({ generation }: PreviewFrameProps) {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const viewportWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewport("desktop")}
            className={`p-2 rounded transition-colors ${viewport === "desktop" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            title="Desktop view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button
            onClick={() => setViewport("tablet")}
            className={`p-2 rounded transition-colors ${viewport === "tablet" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            title="Tablet view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button
            onClick={() => setViewport("mobile")}
            className={`p-2 rounded transition-colors ${viewport === "mobile" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            title="Mobile view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
        <span className="text-xs text-muted-foreground font-mono">{viewport}</span>
      </div>

      <div className="flex-1 p-4 bg-secondary/50 overflow-auto">
        <div
          className="mx-auto bg-white transition-all duration-300 shadow-lg"
          style={{
            width: viewportWidths[viewport],
            maxWidth: "100%",
            height: viewport === "desktop" ? "600px" : viewport === "tablet" ? "800px" : "667px",
          }}
        >
          <iframe
            srcDoc={generation.htmlCode}
            className="w-full h-full border-0"
            title="Preview"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  )
}
