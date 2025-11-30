"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
  onDelete?: (projectId: string) => void
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onDelete) {
      onDelete(project.id)
    }
    setShowDeleteConfirm(false)
  }

  return (
    <div className="project-card group relative bg-background p-8 transition-colors hover:bg-card">
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setShowDeleteConfirm(true)
        }}
        className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        title="Delete project"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>

      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-background/95 flex flex-col items-center justify-center p-6 z-10">
          <p className="text-sm text-foreground mb-4 text-center">Delete this project?</p>
          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowDeleteConfirm(false)
              }}
              className="px-4 py-2 text-xs border border-border text-foreground hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-xs bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <Link href={`/app/projects/${project.id}`} className="block">
        <div className="flex items-start justify-between mb-6">
          <span className="font-mono text-xs text-accent">
            {String(project.generationCount).padStart(2, "0")} pages
          </span>
          <svg
            className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        <h3 className="font-serif text-xl font-normal text-foreground mb-2 transition-all duration-300 group-hover:tracking-wide">
          {project.name}
        </h3>

        {project.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-6">{project.description}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {project.styles.slice(0, 3).map((style) => (
            <span key={style} className="px-2 py-1 text-xs border border-border text-muted-foreground">
              {style}
            </span>
          ))}
          {project.styles.length > 3 && (
            <span className="px-2 py-1 text-xs text-muted-foreground">+{project.styles.length - 3}</span>
          )}
        </div>

        <p className="text-xs text-muted-foreground">Updated {formatDate(project.updatedAt)}</p>
      </Link>
    </div>
  )
}

function formatDate(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return "today"
  if (days === 1) return "yesterday"
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}
