<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# KARCHX landing page

## Tech Stack
- Next.js 16 (App Router, React 19, TypeScript strict)
- Tailwind CSS v4
- Deployment: Vercel

## Commands
- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — lint + typecheck + build

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utilities
- Tailwind utilities; avoid inline styles unless a value is dynamic
- 2-space indentation
- Mobile-first, responsive

## Project Structure
- `src/app/` — routes
- `src/components/sites/karchx/` — page sections
- `src/components/ui/` — shared UI primitives
- `public/sites/karchx/` — images, fonts and other assets
