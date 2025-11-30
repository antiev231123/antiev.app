"use client"

const allStyles = [
  { name: "Minimal", category: "Aesthetic" },
  { name: "Bold", category: "Aesthetic" },
  { name: "Editorial", category: "Aesthetic" },
  { name: "Brutalist", category: "Aesthetic" },
  { name: "Organic", category: "Aesthetic" },
  { name: "Tech-Forward", category: "Industry" },
  { name: "Luxury", category: "Industry" },
  { name: "Playful", category: "Tone" },
  { name: "Corporate", category: "Tone" },
  { name: "Artisanal", category: "Tone" },
]

interface StyleTagSelectProps {
  selectedStyles: string[]
  onStylesChange: (styles: string[]) => void
  compact?: boolean
}

export function StyleTagSelect({ selectedStyles, onStylesChange, compact = false }: StyleTagSelectProps) {
  const toggleStyle = (styleName: string) => {
    if (selectedStyles.includes(styleName)) {
      onStylesChange(selectedStyles.filter((s) => s !== styleName))
    } else {
      onStylesChange([...selectedStyles, styleName])
    }
  }

  return (
    <div className={`flex flex-wrap ${compact ? "gap-2" : "gap-3"}`}>
      {allStyles.map((style) => {
        const isSelected = selectedStyles.includes(style.name)
        return (
          <button
            key={style.name}
            type="button"
            onClick={() => toggleStyle(style.name)}
            className={`${compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"} border transition-all duration-200 ${
              isSelected
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-foreground hover:border-foreground"
            }`}
          >
            {style.name}
          </button>
        )
      })}
    </div>
  )
}
