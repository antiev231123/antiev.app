import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">&copy; 2025 Forma. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Help
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
