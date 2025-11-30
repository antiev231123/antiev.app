export interface Project {
  id: string
  name: string
  description: string
  styles: string[]
  generationCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Generation {
  id: string
  projectId: string
  brief: string
  audience: string
  styles: string[]
  output: string
  htmlCode: string // Generated HTML code
  createdAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: "free" | "professional" | "enterprise"
  createdAt: Date
}

export interface StyleOption {
  name: string
  category: "Aesthetic" | "Industry" | "Tone"
}
