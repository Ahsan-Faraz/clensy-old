# Clensy Project Context

This workspace contains three interconnected projects for a professional cleaning services company (CLENSY).

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                STRAPI1 CMS (Strapi v5.31.2)             │
│         PostgreSQL (Supabase) + Page Builder            │
└─────────────────────────────┬───────────────────────────┘
                              │ REST API
               ┌──────────────┴──────────────┐
               │                             │
    ┌──────────▼────────────┐     ┌──────────▼───────────┐
    │  clensy2.0 (Next.js   │     │ Clensy-3-data        │
    │  16.1 + Strapi CMS)   │     │ (Next.js 15 + Mongo) │
    │  • CMSAdapter cache   │     │ • Self-contained DB   │
    │  • Page Builder UI    │     │ • 33 Mongoose models  │
    │  • Dynamic [slug]     │     │ • Admin dashboard     │
    └───────────┬───────────┘     └──────────┬───────────┘
                │                             │
                └──────────┬──────────────────┘
                           │
                ┌──────────▼───────────┐
                │   MaidCentral API    │
                │  (Booking/Pricing)   │
                └──────────────────────┘
```

---

## Project 1: Clensy-3-data (THIS PROJECT)

**Tech Stack:**
- Next.js 15.2.4, React 19, TypeScript
- Tailwind CSS + Radix UI + Framer Motion
- MongoDB + Mongoose 8.14.3
- NextAuth 4.24.11
- MaidCentral API for booking

**Architecture Pattern:**
- Self-contained MongoDB-backed Next.js app
- 33 Mongoose models serve as CMS content + application data
- Admin dashboard at `/admin` with role-based access (admin, editor, viewer)
- CMS API routes at `/api/cms/*` (hero, about, services, locations, etc.)
- Server-side rendering with fallback default data

**Key Directories:**
- `app/` — Pages and API routes (Next.js App Router)
- `app/admin/` — Admin dashboard for content editing
- `app/api/cms/` — RESTful CMS endpoints (GET/POST)
- `app/api/booking/` — Booking submission endpoint
- `components/` — Shared UI components (Navbar, Footer, Hero, Booking, etc.)
- `models/` — 33 Mongoose models (page content, services, locations, booking)
- `services/` — MaidCentral API integration (`api.ts`)
- `lib/` — Database connection, utilities
- `hooks/` — Custom React hooks
- `types/` — TypeScript type definitions

**Models (33 total):**
- Page content: About, Careers, Checklist, Contact, CTA, FAQ, HeroSection, HowItWorks, PrivacyPolicy, Reviews, TermsOfService
- Services (12): RoutineCleaning, DeepCleaning, AirbnbCleaning, GymCleaning, MedicalCleaning, MovingCleaning, OfficeCleaning, OtherCommercialCleaning, PostConstructionCleaning, PropertyCleaning, RetailCleaning, SchoolCleaning
- Locations (6): BergenLocation, EssexLocation, HudsonLocation, MorrisLocation, PassaicLocation, UnionLocation
- Business: Booking, ExtrasService, Comparison, User

**Data Flow:**
1. Admin edits content via `/admin` dashboard
2. Content saved to MongoDB via `/api/cms/*` POST routes
3. Pages fetch content from `/api/cms/*` GET routes server-side
4. Booking flow: StepOne → StepTwo → StepThree → MaidCentral API
5. MaidCentral provides availability, pricing, scope groups

**Authentication:**
- NextAuth with credentials provider
- Roles: admin, editor, viewer
- Protected routes via middleware

---

## Project 2: clensy2.0 (Evolution)

**Tech Stack:** Next.js 16.1.0, React 19.1, Strapi v5 CMS backend

**Key Differences from Clensy-3-data:**
- CMS content managed in Strapi instead of MongoDB models
- CMSAdapter class with 5-min prod cache / 5-sec dev cache
- Dynamic `[slug]` page routing from CMS
- Page Builder visual editor at `/editor`
- Global settings from CMS (robots.txt, sitemap, scripts, redirects)
- Middleware handles redirects with 5-min cache TTL

**API Routes (19 CMS + page-builder):**
- CMS: hero, about, careers, checklist, comparison, contact, cta, faq, global-settings, how-it-works, landing-page, location, locations, pages, privacy-policy, redirects, reviews, service, terms-of-service
- Page Builder: content, save, sync, templates
- Revalidation and preview endpoints

---

## Project 3: strapi1 (Headless CMS)

**Stack:** Strapi v5.31.2, PostgreSQL (Supabase), Node.js

**Content Types (16):**
About, Blog-post, Careers-page, Checklist-page, Contact, Dashboard, Extras-service, FAQ-page, Global-setting, Landing-page, Location, Page, Privacy-policy, Redirect, Service, Terms-of-service

**Components:** Reusable content/ and shared/ schemas for flexible composition

**Plugins:** SEO, Page Builder (wecre8websites), Users & Permissions

**Database:**
- Dev: SQLite
- Prod: PostgreSQL (Supabase) with connection pooling (10 pool, 180s timeout)

**Seed Scripts:** 9 scripts to bootstrap content (landing page, careers, FAQ, locations, legal pages)

**Admin Customization:**
- Custom logo, color theming
- Sidebar grouping for services
- Dashboard widgets

---

## Cross-Project Conventions

**Naming:**
- Components: PascalCase (HeroSection, BookingModal)
- Utilities: camelCase (getImageUrl, fetchFromStrapi)
- Routes: kebab-case (/api/cms/hero, /services/deep-cleaning)
- Models: PascalCase domain prefixes (RoutineCleaning, BergenLocation)

**Patterns:**
- Functional components + hooks
- Server components for data fetching, "use client" for interactivity
- RESTful API with `{ success: boolean, data, error }` response format
- Fallback/default data for all CMS content
- Promise.all for parallel data fetching
- Role-based access control

**Styling:**
- Tailwind CSS with CSS variables (HSL theming)
- Radix UI primitives for accessible components
- Framer Motion for animations
- Responsive grid layouts with Tailwind breakpoints

**SEO:**
- Metadata from CMS with fallback defaults
- Structured data (schema.org)
- Dynamic sitemap with ISR
- Open Graph and Twitter Card support

**Environment Variables:**
- `NEXT_PUBLIC_` prefix for client-side vars
- `MONGODB_URI` — MongoDB connection
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL` — Auth config
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — Google Maps
- `NEXT_PUBLIC_STRAPI_URL` — Strapi API URL (clensy2.0)
- MaidCentral API credentials for booking service
