"use client"

import type { Generation } from "@/lib/types"

interface HistoryListProps {
  generations: Generation[]
  selectedId?: string
  onSelect: (generation: Generation) => void
}

export function HistoryList({ generations, selectedId, onSelect }: HistoryListProps) {
  if (generations.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-sm text-muted-foreground">No generations yet</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-border">
      {generations.map((generation) => (
        <button
          key={generation.id}
          onClick={() => onSelect(generation)}
          className={`w-full p-6 text-left transition-colors hover:bg-secondary/50 ${
            selectedId === generation.id ? "bg-secondary" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <p className="text-sm text-foreground line-clamp-2 flex-1">{generation.brief}</p>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{formatTime(generation.createdAt)}</span>
          </div>

          {generation.styles.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {generation.styles.slice(0, 3).map((style) => (
                <span key={style} className="px-2 py-0.5 text-xs border border-border text-muted-foreground">
                  {style}
                </span>
              ))}
              {generation.styles.length > 3 && (
                <span className="text-xs text-muted-foreground">+{generation.styles.length - 3}</span>
              )}
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

function formatTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))

  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}
