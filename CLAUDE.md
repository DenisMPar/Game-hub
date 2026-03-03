# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run lint     # Run ESLint
```

No test suite is configured.

## Environment Variables

The app requires a `.env.local` file with IGDB (Twitch) API credentials:

```
API_CLIENT_ID=...
API_CLIENT_SECRET=...
NEXT_PUBLIC_BASE_API_URL=...   # Required in production (not development)
NEXT_PUBLIC_APP_URL=...        # Allowed CORS origin (defaults to http://localhost:3000)
```

## Architecture

**Next.js 14 App Router** project. The root redirects to `/home`.

### Route Structure
- `/home` — saved games collection page
- `/game/[slug]` — game detail page (server component, fetches via `lib/api.ts`)
- `/api/game?query=...` — search endpoint (proxies to IGDB)
- `/api/game/[slug]` — game detail endpoint (proxies to IGDB)

### Middleware (`middleware.ts`)
Intercepts all `/api/game*` requests. Manages a Twitch OAuth token in module-level memory (`lib/igdb-token.ts`) — fetches a new token when missing or expired, then injects it as `Authorization: Bearer ...` into the request headers before passing to the API routes. Also enforces same-origin requests by checking the `Origin` header against `NEXT_PUBLIC_APP_URL`.

### State Management
`lib/state.ts` — Zustand store with `persist` middleware (localStorage key: `"gameCollection"`). Tracks a `hydrated` flag (set via `onRehydrateStorage`) to avoid hydration mismatches. The `CollectButton` and collection components gate rendering on `hydrated`.

### Data Flow
1. Client calls `lib/api.ts` → `fetchApiGet()` → internal Next.js API route
2. Middleware injects IGDB Bearer token
3. API route proxies POST request to `https://api.igdb.com/v4/games`

### 3D Keycaps (`components/keycaps/`)
Interactive Three.js scene using `@react-three/fiber`, `@react-three/drei`, and `@react-three/rapier` (physics). Rendered inside a `<Canvas>` and mounted in the game detail layout. The `useResizeDetection` hook (`hooks/index.tsx`) remounts the canvas on window resize to avoid layout issues.

### Styling
Mixed approach: CSS Modules (`.module.css` co-located with components) for layout/page styles, Tailwind CSS for utility classes, and MUI (`@mui/material`) for the search autocomplete and skeleton loaders. Shadcn/ui-style components live in `components/ui/` (Button, Toast, Carousel, etc.) using `class-variance-authority` and CSS variables defined in `globals.css`.

### Component Conventions
- Each component lives in its own directory with an `index.tsx` entry
- Page-level components are named `*PageComponent` and imported by thin Next.js page files
- Client components are explicitly marked `"use client"`; server components fetch data and pass it as props
