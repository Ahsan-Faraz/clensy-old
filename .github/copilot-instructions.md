# Copilot Instructions for Clensy-3-data

## Project Overview

Clensy-3-data is a professional cleaning services website built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, and MongoDB. It features an admin CMS dashboard, booking integration with MaidCentral API, and server-side rendering.

---

## Tech Stack

- **Framework:** Next.js 15.2.4 with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + Radix UI + Framer Motion
- **Database:** MongoDB with Mongoose 8.14.3
- **Auth:** NextAuth 4.24.11 (credentials provider)
- **Forms:** React Hook Form + Zod validation
- **External API:** MaidCentral (booking/pricing)

---

## Next.js Best Practices

### Server vs Client Components

- **Default to Server Components.** Only add `"use client"` when the component needs browser APIs, event handlers, hooks (useState, useEffect, etc.), or third-party client-only libraries.
- Never import server-only modules (e.g., `mongoose`, `fs`) in client components.
- Pass data from server to client components via props, not by fetching in client components when possible.
- Use `async` server components for data fetching at the page level.

### Data Fetching

- Fetch data in Server Components or Route Handlers, not in `useEffect`.
- Use `fetch()` with Next.js caching/revalidation when calling external APIs:
  ```ts
  fetch(url, { next: { revalidate: 3600 } }) // ISR
  fetch(url, { cache: 'no-store' })           // Dynamic
  ```
- For MongoDB data, use direct Mongoose queries in Server Components or API routes.
- Always handle errors gracefully with try/catch and provide fallback data.

### Routing

- Use the App Router (`app/` directory) exclusively.
- Route Handlers go in `app/api/*/route.ts` and must export named HTTP methods: `GET`, `POST`, `PUT`, `DELETE`.
- Use `layout.tsx` for shared UI across route segments.
- Use `loading.tsx` for Suspense boundaries.
- Use `error.tsx` for error boundaries.
- Use `not-found.tsx` for 404 handling.

### Metadata & SEO

- Export `metadata` or `generateMetadata()` from page/layout files for SEO.
- Never put `<title>` or `<meta>` tags directly in components — use the Metadata API.
- Include Open Graph and Twitter Card metadata for social sharing.
- Use descriptive, unique titles and descriptions per page.

### Performance

- Use `next/image` for all images (automatic optimization, lazy loading, WebP).
- Use `next/link` for client-side navigation (prefetching).
- Use dynamic imports (`next/dynamic`) for heavy components not needed on initial load.
- Minimize `"use client"` boundaries — keep them as deep in the tree as possible.
- Avoid large client-side bundles; split code with dynamic imports.

### Hydration

- Always add `suppressHydrationWarning` to `<html>` and `<body>` tags in the root layout to prevent browser extension interference.
- Never use `typeof window !== 'undefined'` branching for rendering — use `useEffect` for client-only logic.
- Avoid `Date.now()`, `Math.random()`, or locale-dependent formatting in SSR output.
- Ensure server and client render identical HTML on first paint.

---

## Project Conventions

### File Naming

- Components: PascalCase (`HeroSection.tsx`, `BookingModal.tsx`)
- Utilities/services: camelCase (`api.ts`, `dbConnect.ts`)
- Routes: kebab-case directories (`/api/cms/how-it-works/`)
- Models: PascalCase (`RoutineCleaning.ts`, `BergenLocation.ts`)
- Types: PascalCase with `.ts` extension

### Component Structure

```tsx
// Client component template
"use client"

import { useState } from "react"

interface MyComponentProps {
  title: string
  children?: React.ReactNode
}

export default function MyComponent({ title, children }: MyComponentProps) {
  const [state, setState] = useState(false)
  return <div>{title}</div>
}
```

```tsx
// Server component template (default)
import { connectToDb } from "@/lib/db"
import MyModel from "@/models/MyModel"

export default async function MyPage() {
  await connectToDb()
  const data = await MyModel.find().lean()
  return <div>{/* render data */}</div>
}
```

### API Route Pattern

```ts
import { NextRequest, NextResponse } from "next/server"
import { connectToDb } from "@/lib/db"
import MyModel from "@/models/MyModel"

export async function GET() {
  try {
    await connectToDb()
    const data = await MyModel.findOne().lean()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDb()
    const body = await request.json()
    // Validate body with Zod before processing
    const result = await MyModel.findOneAndUpdate({}, body, { upsert: true, new: true })
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 })
  }
}
```

### Mongoose Model Pattern

```ts
import mongoose, { Schema } from "mongoose"

const MySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  items: [{ name: String, value: String }],
}, { timestamps: true })

export default mongoose.models.MyModel || mongoose.model("MyModel", MySchema)
```

---

## Styling Rules

- Use Tailwind CSS utility classes. Avoid writing custom CSS unless absolutely necessary.
- Use Radix UI primitives for accessible interactive components (Dialog, Accordion, Tabs, etc.).
- Use Framer Motion for animations with `motion.div` variants.
- Follow the existing color scheme via CSS variables (HSL format in `globals.css`).
- Use responsive classes (`sm:`, `md:`, `lg:`, `xl:`) for mobile-first design.
- Use `cn()` utility (clsx + tailwind-merge) for conditional class names.

---

## Authentication & Authorization

- Use NextAuth `getServerSession()` in API routes and server components.
- Protect admin routes with session checks.
- Roles: `admin` (full access), `editor` (content editing), `viewer` (read-only).
- Never expose sensitive credentials client-side.

---

## Error Handling

- Wrap database operations in try/catch blocks.
- Return consistent JSON responses: `{ success: boolean, data?, error? }`.
- Log errors server-side with `console.error`.
- Provide meaningful fallback data for CMS content when fetches fail.
- Use Zod schemas for input validation at API boundaries.

---

## Security

- Validate and sanitize all user inputs at API boundaries.
- Use parameterized Mongoose queries (no raw string interpolation).
- Never expose MongoDB connection strings or API keys client-side.
- Use `NEXT_PUBLIC_` prefix only for intentionally public environment variables.
- Implement rate limiting for public API endpoints.
- Use HTTPS for all external API calls.

---

## Testing Checklist

Before committing changes:
1. Verify no TypeScript errors (`next build` succeeds).
2. Test on mobile viewport — all pages must be responsive.
3. Check for hydration warnings in the browser console.
4. Verify API routes return proper error responses for edge cases.
5. Ensure protected routes redirect unauthenticated users.

---

## Environment Variables

Required in `.env.local`:
```
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

Optional (booking integration):
```
MAIDCENTRAL_API_URL=
MAIDCENTRAL_CLIENT_ID=
MAIDCENTRAL_CLIENT_SECRET=
```
