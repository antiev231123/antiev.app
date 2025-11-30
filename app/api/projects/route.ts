import { NextResponse } from "next/server"
import { mockProjects } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({ projects: mockProjects })
}

export async function POST(request: Request) {
  const body = await request.json()

  const newProject = {
    id: `proj-${Date.now()}`,
    name: body.name,
    description: body.description || "",
    styles: body.styles || [],
    generationCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json({ project: newProject }, { status: 201 })
}
