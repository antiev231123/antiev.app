"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { ProjectCard } from "@/components/dashboard/project-card"
import { mockProjects } from "@/lib/mock-data"
import type { Project } from "@/lib/types"

export default function DashboardPage() {
  const headingRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<Project[]>(mockProjects)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1, delay: 0.1 },
      )

      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1, delay: 0.2 },
      )

      const cards = projectsRef.current?.querySelectorAll(".project-card")
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1, delay: 0.3 },
        )
      }
    })

    return () => ctx.revert()
  }, [])

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId))
  }

  const totalGenerations = projects.reduce((acc, p) => acc + p.generationCount, 0)

  return (
    <div className="py-8 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headingRef} className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your projects and generate landing pages</p>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mb-12">
          <div className="bg-card p-6">
            <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase block mb-2">Total Projects</span>
            <span className="font-serif text-3xl text-foreground">{projects.length}</span>
          </div>
          <div className="bg-card p-6">
            <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase block mb-2">Pages Generated</span>
            <span className="font-serif text-3xl text-foreground">{totalGenerations}</span>
          </div>
          <div className="bg-card p-6">
            <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase block mb-2">Plan</span>
            <span className="font-serif text-3xl text-foreground">Free</span>
          </div>
        </div>

        {/* Section title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl text-foreground">
            Your <span className="italic">Projects</span>
          </h2>
          <Link
            href="/app/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium tracking-wide transition-all duration-300 hover:tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </Link>
        </div>

        {/* Projects grid */}
        {projects.length > 0 ? (
          <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} />
            ))}
          </div>
        ) : (
          <div ref={projectsRef} className="text-center py-24 border border-border">
            <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-foreground mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Create your first project to start generating landing pages
            </p>
            <Link
              href="/app/projects/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium tracking-wide transition-all duration-300 hover:tracking-wider"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Project
            </Link>
          </div>
        )}

        <div className="mt-12 p-8 border border-border bg-card">
          <h3 className="font-serif text-lg text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/app/projects/new"
              className="group flex items-center gap-4 p-4 border border-border hover:border-foreground transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-foreground group-hover:text-background">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-foreground block">New Project</span>
                <span className="text-sm text-muted-foreground">Start from scratch</span>
              </div>
            </Link>
            <Link
              href="/pricing"
              className="group flex items-center gap-4 p-4 border border-border hover:border-foreground transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-foreground group-hover:text-background">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-foreground block">Upgrade Plan</span>
                <span className="text-sm text-muted-foreground">Get more generations</span>
              </div>
            </Link>
            <Link
              href="/app/settings"
              className="group flex items-center gap-4 p-4 border border-border hover:border-foreground transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-foreground group-hover:text-background">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <span className="font-medium text-foreground block">Settings</span>
                <span className="text-sm text-muted-foreground">Manage your account</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
