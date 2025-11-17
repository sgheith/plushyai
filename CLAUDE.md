# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Plushify** - An AI-powered web application that transforms uploaded images into adorable plushified versions. Users upload images (people, pets, objects), and the app generates cute plush toy versions using Google's Gemini AI. Features a credit-based system, user galleries, and secure authentication.

**Tech Stack:**
- Next.js 15 (App Router) with React 19 and TypeScript
- Better Auth for authentication (Google OAuth)
- Drizzle ORM with PostgreSQL
- Vercel AI SDK with OpenRouter (Gemini models)
- Vercel Blob Storage for image hosting
- shadcn/ui components with Tailwind CSS 4

## Development Commands

```bash
# Development
pnpm dev                # Start dev server with Turbopack
pnpm build              # Run migrations then build for production
pnpm start              # Start production server

# Code Quality (IMPORTANT: Always run after changes)
pnpm lint               # Run ESLint
pnpm typecheck          # TypeScript type checking

# Database Management
pnpm db:generate        # Generate migration files from schema changes
pnpm db:migrate         # Run pending migrations (used in build)
pnpm db:push            # Push schema directly to DB (development only)
pnpm db:dev             # Alias for db:push (quick dev iterations)
pnpm db:studio          # Open Drizzle Studio GUI
pnpm db:reset           # DROP all tables and re-push (destructive)
```

**Critical Development Rule:** Always run `pnpm lint` and `pnpm typecheck` after completing changes. This is enforced by project rules.

## Architecture

### Authentication Flow (Better Auth)

**Server Configuration** (`src/lib/auth.ts`):
- Better Auth instance configured with Google OAuth
- Security features: CSRF protection, rate limiting (10 req/min), secure cookies
- Session: 7-day expiry, cookie caching (5 min) for performance
- Custom user fields: `credits` (number), `platformRole` (string)
- Environment validation at startup ensures required vars exist

**Client Utilities** (`src/lib/auth-client.ts`):
- Export: `signIn`, `signOut`, `useSession`, `getSession`
- Use `useSession()` hook in client components for auth state
- Use `auth.api.getSession()` in server actions/components

**API Route** (`src/app/api/auth/[...all]/route.ts`):
- Single catch-all handler for all auth endpoints
- Handles: `/api/auth/sign-in/google`, `/api/auth/callback/google`, etc.

**Protected Routes Pattern:**
```tsx
// Server Component
const session = await auth.api.getSession({ headers: await headers() });
if (!session?.user) redirect('/sign-in');

// Server Action
const session = await auth.api.getSession({ headers: await headers() });
if (!session?.user) return { success: false, error: "Unauthorized" };
```

### Database Architecture

**Schema Location:** `src/lib/schema.ts` (single source of truth)

**Core Tables:**
- `user`: Better Auth users + custom fields (credits, platformRole)
- `session`: Better Auth sessions (indexed on userId, expiresAt, token)
- `account`: OAuth accounts (Google)
- `verification`: Email verification tokens
- `plushie_generations`: User-generated plushies with URLs and metadata

**Connection:** `src/lib/db.ts` exports singleton `db` instance using postgres.js driver

**Migration Workflow:**
1. Modify `src/lib/schema.ts`
2. Run `pnpm db:generate` to create migration file in `drizzle/`
3. Run `pnpm db:migrate` to apply (or `pnpm db:push` for dev)
4. Commit both schema and migration files

**Indexes:** All foreign keys and frequently queried columns have indexes for performance

### Image Generation Pipeline

**Core Flow** (`src/app/actions/generate-plushie.ts`):
```
1. Auth check ’ session validation
2. Credit check ’ ensure user has e1 credit
3. Upload original ’ Vercel Blob Storage
4. AI Analysis ’ Gemini vision model identifies subject
5. AI Generation ’ Gemini image model creates plushified version
6. Upload generated ’ Vercel Blob Storage
7. Atomic deduction ’ SQL UPDATE with WHERE credits >= 1
8. Database record ’ Insert into plushie_generations
```

**Two-Step AI Process:**
- **Step 1:** `google/gemini-2.5-flash-image` analyzes uploaded image
  - Returns: subject type (person/pet/other), description, key features
- **Step 2:** `google/gemini-2.5-flash-image-preview` generates plushie
  - Input: original image + analysis-based prompt
  - Output: PNG image in `result.files[0].uint8Array`

**Error Handling:**
- Failed generations trigger cleanup: delete uploaded Blobs
- Credit deduction is atomic (UPDATE with WHERE clause prevents race conditions)
- All errors return user-friendly messages

**Storage Structure:**
```
Vercel Blob:
  plushify/originals/{userId}/{timestamp}.{ext}
  plushify/generated/{userId}/{timestamp}.png
```

### Server Actions Pattern

Located in `src/app/actions/`:
- `generate-plushie.ts`: Main generation logic
- `get-generations.ts`: Fetch user's gallery with pagination
- `delete-generation.ts`: Remove generation + cleanup Blobs

**Common Pattern:**
```typescript
"use server";
export async function actionName(...): Promise<{ success: boolean; data?: T; error?: string }> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return { success: false, error: "Unauthorized" };
  // ... action logic
}
```

### Component Architecture

**Page Structure:**
- `/` - Landing page (public)
- `/sign-in` - Google OAuth sign-in (public)
- `/dashboard` - User overview with credits (protected)
- `/generate` - Image upload + generation UI (protected)
- `/gallery` - User's plushie gallery with pagination (protected)
- `/profile` - User profile management (protected)
- `/pricing` - Credit packages (public)
- `/admin` - Admin dashboard for platformRole="admin" (protected)

**Key Components:**
- `src/components/generate/generate-page-client.tsx`: Main generation form
- `src/components/gallery/gallery-client.tsx`: Gallery grid with pagination
- `src/components/plushie/plushie-card.tsx`: Before/after slider card
- `src/components/auth/user-button.tsx`: User menu with credits display

**UI Library:** shadcn/ui components in `src/components/ui/`

### Environment Variables

**Required:**
```env
POSTGRES_URL                # PostgreSQL connection string
BETTER_AUTH_SECRET         # Min 32 chars (generate: openssl rand -base64 32)
GOOGLE_CLIENT_ID           # Google OAuth credentials
GOOGLE_CLIENT_SECRET       # Google OAuth credentials
OPENROUTER_API_KEY         # For AI generation (OpenRouter account)
BLOB_READ_WRITE_TOKEN      # Vercel Blob Storage (required for uploads)
NEXT_PUBLIC_APP_URL        # App URL (http://localhost:3000 in dev)
```

**Optional:**
```env
BETTER_AUTH_URL            # Overrides baseURL if needed
OPENROUTER_MODEL           # Default: "openai/gpt-5-mini"
POLAR_WEBHOOK_SECRET       # For payment webhooks (if implementing)
POLAR_ACCESS_TOKEN         # For Polar API (if implementing)
```

## Important Patterns

### Credit System
- Credits stored in `user.credits` (integer, default: 0)
- Deduction uses SQL: `UPDATE user SET credits = credits - 1 WHERE id = ? AND credits >= 1`
- This prevents negative credits even with concurrent requests
- Always check `creditResult.length === 0` to detect failed deduction

### Image Handling
- Max upload size: 10MB (validated in server action)
- Supported: any `image/*` MIME type
- Images converted to base64 for AI SDK multimodal messages
- Generated images extracted from `result.files[0].uint8Array`
- Next.js Image component configured for `*.public.blob.vercel-storage.com`

### Error Handling
- Server actions return structured `{ success, data?, error? }` responses
- Use `toast()` from `sonner` for user notifications
- Always cleanup resources (Blob storage) on failure
- Log errors with `console.error` for debugging

## Common Gotchas

1. **Better Auth Session:** Must use `await headers()` in server actions (Next.js requirement)
2. **Database Migrations:** Always commit migration files with schema changes
3. **Image Generation:** The `-preview` model is required for image generation; regular model only analyzes
4. **Credits Race Condition:** Use atomic SQL updates, not read-then-write
5. **Vercel Blob Cleanup:** Remember to delete Blobs when deleting database records
6. **Dev Server:** Never start dev server automatically; ask user if needed (project rule)

## Testing Workflow

Before any commit or deployment:
1. Run `pnpm lint` - must pass with no errors
2. Run `pnpm typecheck` - must pass with no errors
3. Test affected functionality manually
4. Verify database migrations apply cleanly

## Specifications

Project specifications are documented in `specs/`:
- Feature requirements and implementation plans
- Reference these when adding or modifying features
- Each feature has `requirements.md` and `implementation-plan.md`

## Documentation

Technical documentation in `docs/technical/`:
- Better Auth integration guides
- AI SDK patterns (streaming, structured data, image generation)
- React Markdown usage
