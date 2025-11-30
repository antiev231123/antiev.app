import { Hero } from "@/components/marketing/hero"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { ExampleStyles } from "@/components/marketing/example-styles"
import { WhySection } from "@/components/marketing/why-section"
import { MarketingHeader } from "@/components/layout/marketing-header"
import { MarketingFooter } from "@/components/layout/marketing-footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <MarketingHeader />
      <Hero />
      <HowItWorks />
      <ExampleStyles />
      <WhySection />
      <MarketingFooter />
    </main>
  )
}
