"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { SignUpForm } from "@/components/forms/sign-up-form"

export default function SignUpPage() {
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
      {/* Left side - Decorative */}
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
            Join thousands of creators building better design briefs.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div ref={contentRef} className="w-full max-w-md">
          <Link href="/" className="inline-block mb-12 group">
            <span className="text-lg font-medium tracking-tight text-foreground transition-all duration-300 group-hover:tracking-wide">
              FORMA
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-3">
              Create your <span className="italic">account</span>
            </h1>
            <p className="text-muted-foreground">Start generating exceptional design briefs</p>
          </div>

          <SignUpForm />

          <p className="mt-8 text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-foreground hover:text-accent transition-colors">
              Sign in
            </Link>
          </p>

          <p className="mt-6 text-xs text-muted-foreground text-center leading-relaxed">
            By creating an account, you agree to our{" "}
            <Link href="#" className="underline hover:text-foreground transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
