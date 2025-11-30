import type { Project, Generation, User, StyleOption } from "./types"

export const mockUser: User = {
  id: "user-1",
  name: "Alex Designer",
  email: "alex@example.com",
  plan: "free",
  createdAt: new Date("2025-01-01"),
}

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "E-commerce Redesign",
    description: "Modern landing page for luxury fashion brand with focus on visual storytelling",
    styles: ["Luxury", "Minimal", "Editorial"],
    generationCount: 5,
    createdAt: new Date("2025-10-15"),
    updatedAt: new Date("2025-11-28"),
  },
  {
    id: "proj-2",
    name: "SaaS Dashboard",
    description: "Landing page for B2B marketing analytics platform",
    styles: ["Tech-Forward", "Corporate", "Minimal"],
    generationCount: 3,
    createdAt: new Date("2025-11-01"),
    updatedAt: new Date("2025-11-25"),
  },
  {
    id: "proj-3",
    name: "Restaurant Branding",
    description: "Landing page for farm-to-table restaurant in Brooklyn",
    styles: ["Organic", "Artisanal", "Editorial"],
    generationCount: 8,
    createdAt: new Date("2025-09-20"),
    updatedAt: new Date("2025-11-20"),
  },
]

export const mockGenerations: Generation[] = [
  {
    id: "gen-1",
    projectId: "proj-1",
    brief:
      "Create a premium landing page for a luxury watch brand. The page should convey sophistication, heritage, and craftsmanship while maintaining modern usability.",
    audience: "Affluent professionals aged 35-55 with appreciation for fine craftsmanship",
    styles: ["Luxury", "Minimal", "Editorial"],
    output: `# Landing Page Overview

## Hero Section
A full-viewport hero with oversized serif typography and a subtle video background showcasing watch craftsmanship.

## Features
- Elegant product showcase grid
- Heritage timeline section  
- Craftsmanship details with macro imagery
- Newsletter signup with minimal form

## Design Tokens
- Primary: #0a0a0a (Rich black)
- Secondary: #f8f6f0 (Warm ivory)
- Accent: #c9a961 (Aged gold)
- Font: Playfair Display + Helvetica Neue`,
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Luxe Timepieces</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --primary: #0a0a0a;
      --secondary: #f8f6f0;
      --accent: #c9a961;
    }
    body {
      font-family: 'Helvetica Neue', sans-serif;
      background: var(--primary);
      color: var(--secondary);
      line-height: 1.6;
    }
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .hero h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(3rem, 10vw, 8rem);
      font-weight: 400;
      line-height: 0.9;
      margin-bottom: 2rem;
    }
    .hero h1 em { font-style: italic; color: var(--accent); }
    .hero p {
      max-width: 500px;
      font-size: 1.125rem;
      opacity: 0.8;
      margin-bottom: 2rem;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      background: var(--secondary);
      color: var(--primary);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      transition: all 0.3s ease;
    }
    .btn:hover { letter-spacing: 0.1em; }
    .features {
      padding: 6rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    .feature {
      padding: 2rem;
      border: 1px solid rgba(248, 246, 240, 0.1);
    }
    .feature h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.5rem;
      font-weight: 400;
      margin-bottom: 1rem;
    }
    .feature p { opacity: 0.7; font-size: 0.9rem; }
  </style>
</head>
<body>
  <section class="hero">
    <h1>Timeless<br><em>Craftsmanship</em></h1>
    <p>Each timepiece represents generations of expertise, precision engineering, and an unwavering commitment to excellence.</p>
    <a href="#collection" class="btn">
      Explore Collection
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  </section>
  <section class="features" id="collection">
    <div class="feature">
      <h3>Heritage</h3>
      <p>Over a century of watchmaking tradition, passed down through generations of master craftsmen.</p>
    </div>
    <div class="feature">
      <h3>Precision</h3>
      <p>Swiss-made movements with accuracy certified to the highest industry standards.</p>
    </div>
    <div class="feature">
      <h3>Materials</h3>
      <p>Only the finest materials—surgical-grade steel, sapphire crystal, and genuine leather.</p>
    </div>
  </section>
</body>
</html>`,
    createdAt: new Date("2025-11-28T10:30:00"),
  },
  {
    id: "gen-2",
    projectId: "proj-1",
    brief: "Design a mobile-first product listing section that showcases watches with elegant card layouts.",
    audience: "Mobile-savvy luxury shoppers",
    styles: ["Luxury", "Minimal"],
    output: `# Product Section

## Layout
- Responsive grid: 1 column mobile, 2 tablet, 3 desktop
- Product cards with image, name, price
- Hover effects with subtle scale

## Typography
- Product names: 16px medium serif
- Prices: 14px light sans, letterspaced
- Labels: 12px uppercase`,
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Collection</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, sans-serif;
      background: #0a0a0a;
      color: #f8f6f0;
      padding: 2rem;
    }
    .products {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1px;
      background: rgba(255,255,255,0.1);
    }
    .product {
      background: #0a0a0a;
      padding: 2rem;
      transition: background 0.3s ease;
    }
    .product:hover { background: #111; }
    .product-image {
      aspect-ratio: 3/4;
      background: #1a1a1a;
      margin-bottom: 1.5rem;
    }
    .product h3 {
      font-family: Georgia, serif;
      font-size: 1.25rem;
      font-weight: 400;
      margin-bottom: 0.5rem;
    }
    .product .price {
      font-size: 0.875rem;
      letter-spacing: 0.1em;
      opacity: 0.7;
    }
  </style>
</head>
<body>
  <div class="products">
    <div class="product">
      <div class="product-image"></div>
      <h3>Classic Chronograph</h3>
      <p class="price">$12,500</p>
    </div>
    <div class="product">
      <div class="product-image"></div>
      <h3>Midnight Automatic</h3>
      <p class="price">$8,900</p>
    </div>
    <div class="product">
      <div class="product-image"></div>
      <h3>Heritage Diver</h3>
      <p class="price">$15,200</p>
    </div>
  </div>
</body>
</html>`,
    createdAt: new Date("2025-11-27T14:15:00"),
  },
]

export const styleOptions: StyleOption[] = [
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
