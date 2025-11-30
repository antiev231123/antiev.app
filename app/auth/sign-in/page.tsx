"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { SignInForm } from "@/components/forms/sign-in-form"

export default function SignInPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 0.2 },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div ref={contentRef} className="w-full max-w-md">
          <Link href="/" className="inline-block mb-12 group">
            <span className="text-lg font-medium tracking-tight text-foreground transition-all duration-300 group-hover:tracking-wide">
              FORMA
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-3">
              Welcome <span className="italic">back</span>
            </h1>
            <p className="text-muted-foreground">Sign in to continue to your dashboard</p>
          </div>

          <SignInForm />

          <p className="mt-8 text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <Link href="/auth/sign-up" className="text-foreground hover:text-accent transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-card items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, var(--foreground) 1px, transparent 1px),
                               linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-12">
          <span className="font-serif text-[clamp(6rem,15vw,14rem)] font-normal leading-none text-foreground/5">F</span>
          <p className="text-sm text-muted-foreground mt-8 max-w-xs mx-auto leading-relaxed">
            Transform your creative vision into precise, actionable design briefs.
          </p>
        </div>
      </div>
    </div>
  )
}
