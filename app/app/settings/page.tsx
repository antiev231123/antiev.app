"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  const headingRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [name, setName] = useState("Alex Designer")
  const [email, setEmail] = useState("alex@example.com")

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1, delay: 0.1 },
      )

      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.15, delay: 0.3 },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="py-8 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div ref={headingRef} className="mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-foreground mb-2">
            Account <span className="italic">Settings</span>
          </h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>

        {/* Settings sections */}
        <div ref={contentRef} className="space-y-12">
          {/* Profile section */}
          <section className="border border-border p-8">
            <h2 className="text-lg font-medium text-foreground mb-6">Profile</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-medium">
                  {name.charAt(0)}
                </div>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Change avatar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Full name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 bg-input border-border text-foreground focus:border-foreground transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="settings-email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    id="settings-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-input border-border text-foreground focus:border-foreground transition-colors"
                  />
                </div>
              </div>

              <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium tracking-wide">
                Save Changes
              </Button>
            </div>
          </section>

          {/* Subscription section */}
          <section className="border border-border p-8">
            <h2 className="text-lg font-medium text-foreground mb-6">Subscription</h2>
            <div className="flex items-center justify-between p-6 bg-card border border-border">
              <div>
                <p className="font-medium text-foreground mb-1">Free Plan</p>
                <p className="text-sm text-muted-foreground">5 briefs per month</p>
              </div>
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                Upgrade
              </Button>
            </div>
          </section>

          {/* Danger zone */}
          <section className="border border-destructive/20 p-8">
            <h2 className="text-lg font-medium text-destructive mb-6">Danger Zone</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground mb-1">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button
                variant="outline"
                className="border-destructive/50 text-destructive hover:bg-destructive/10 bg-transparent"
              >
                Delete
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
