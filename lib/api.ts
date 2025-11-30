import type { Project, Generation } from "./types"
import { mockProjects, mockGenerations } from "./mock-data"

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getProjects(): Promise<Project[]> {
  await delay(500)
  return mockProjects
}

export async function getProject(id: string): Promise<Project | null> {
  await delay(300)
  return mockProjects.find((p) => p.id === id) || null
}

export async function createProject(data: {
  name: string
  description: string
  styles: string[]
}): Promise<Project> {
  await delay(800)
  const newProject: Project = {
    id: `proj-${Date.now()}`,
    name: data.name,
    description: data.description,
    styles: data.styles,
    generationCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return newProject
}

export async function getGenerations(projectId: string): Promise<Generation[]> {
  await delay(400)
  return mockGenerations.filter((g) => g.projectId === projectId)
}

export async function createGeneration(data: {
  projectId: string
  brief: string
  audience: string
  styles: string[]
}): Promise<Generation> {
  await delay(2000) // Simulate AI generation time
  const newGeneration: Generation = {
    id: `gen-${Date.now()}`,
    projectId: data.projectId,
    brief: data.brief,
    audience: data.audience,
    styles: data.styles,
    output: generateBriefOutput(data.brief, data.audience, data.styles),
    createdAt: new Date(),
  }
  return newGeneration
}

function generateBriefOutput(brief: string, audience: string, styles: string[]): string {
  return `# Design Brief

## Project Overview
${brief}

## Target Audience
${audience || "General audience"}

## Visual Direction

### Style Keywords
${styles.length > 0 ? styles.map((s) => `- ${s}`).join("\n") : "- Modern\n- Clean"}

### Color Palette
- Primary: Deep charcoal (#1a1a1a) for authority and sophistication
- Secondary: Warm cream (#f5f2eb) for approachability  
- Accent: Terracotta (#c45c3e) for warmth and energy
- Muted: Cool gray (#6b7280) for supporting elements

### Typography
- Headlines: Serif typeface with strong presence (Playfair Display, Fraunces)
- Body: Clean sans-serif for readability (Inter, DM Sans)
- Monospace: For code or technical details (JetBrains Mono)
- Scale: 1.25 modular scale for harmonious hierarchy

### Layout Principles
- Generous whitespace (minimum 24px between sections)
- Grid-based composition (12-column on desktop, 4-column mobile)
- Asymmetric balance for visual interest
- Content-first responsive breakpoints

### Imagery Style
- High contrast photography preferred
- Muted, desaturated color tones
- Focus on texture and authentic moments
- Consistent aspect ratios (16:9 hero, 1:1 thumbnails)

## Key Components

1. **Hero Section**
   - Bold headline with supporting copy
   - Primary CTA with high contrast
   - Optional background image/video

2. **Feature Grid**
   - 3-column layout on desktop
   - Icon + title + description pattern
   - Hover state with subtle lift

3. **Social Proof**
   - Testimonial carousel or grid
   - Star ratings where applicable
   - Client/partner logos

4. **Call to Action**
   - Clear value proposition
   - Form or button cluster
   - Trust indicators nearby

## Interaction Guidelines
- Transitions: 300ms ease-out for most interactions
- Hover states: Subtle lift (translateY -2px) and shadow increase
- Focus states: Visible ring for accessibility
- Loading states: Skeleton screens over spinners
- Error states: Inline validation with helpful messages

## Accessibility Requirements
- WCAG 2.1 AA compliance minimum
- Color contrast ratio 4.5:1 for text
- Keyboard navigation fully supported
- Screen reader optimized with ARIA labels
- Reduced motion alternative animations
- Focus management in modals and dialogs`
}
