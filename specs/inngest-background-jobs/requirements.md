# Inngest Background Jobs - Requirements

## Overview
Transform the synchronous image generation flow into a background job system using Inngest to improve observability, reliability, and user experience.

## Current Problem
- Image generation currently runs synchronously in a Server Action, blocking HTTP requests for 10-30 seconds
- No observability into generation progress or failures
- No retry mechanism for transient AI API failures
- Risk of serverless function timeouts on longer generations
- Poor user experience waiting for synchronous response

## Goals
1. Move image generation to background processing with Inngest
2. Provide real-time observability of generation jobs
3. Implement automatic retries for failed generations
4. Add proper rate limiting and concurrency controls
5. Maintain credit reservation system to prevent abuse
6. Allow users to track generation status and retry failures

## User Stories

### US-1: Background Image Generation
**As a user**, when I upload an image and click generate, the process should start immediately and run in the background so I don't have to wait on a loading screen.

**Acceptance Criteria:**
- User clicks "Generate" button
- Server Action validates and creates generation record with status "processing"
- Inngest event is triggered immediately
- User receives immediate response with generation ID
- Generation continues in background via Inngest function

### US-2: Generation Status Tracking
**As a user**, I want to see the status of my generation in real-time so I know when it's complete.

**Acceptance Criteria:**
- Client polls server every 3 seconds for status updates
- UI shows "processing" state with loading indicator
- UI updates to "completed" when generation finishes
- UI shows "failed" state with retry button if generation fails
- Polling stops automatically on completion or failure

### US-3: Failed Generation Retry
**As a user**, if my generation fails, I want to retry it without re-uploading the image or spending another credit.

**Acceptance Criteria:**
- Failed generations display in gallery with "Failed" badge
- Retry button available on failed generations
- Clicking retry re-runs generation using original image
- No additional credit charged for retry
- Status updates from "failed" to "processing"

### US-4: Credit Reservation System
**As a user**, I want my credits to be reserved when I start a generation and only deducted when successful, so I'm not charged for failures.

**Acceptance Criteria:**
- Credits reserved when generation starts (status="processing")
- Available credits shown as: `total credits - processing count`
- Credits deducted only when generation completes successfully
- Credits automatically released if generation fails
- Users cannot start new generation if no available credits

### US-5: Concurrency Limits
**As a user**, I should be limited to 5 concurrent generations to prevent system abuse while still allowing multiple jobs.

**Acceptance Criteria:**
- Maximum 5 generations with status="processing" per user
- Attempting 6th generation shows error message
- Limit enforced both client-side (validation) and server-side (Inngest concurrency)
- Other users unaffected by one user's concurrent jobs

## Technical Requirements

### TR-1: Inngest Integration
- Install Inngest SDK (`inngest` package)
- Create Inngest client instance (`src/inngest/client.ts`)
- Set up API route handler (`src/app/api/inngest/route.ts`)
- Configure development environment with Inngest Dev Server

### TR-2: Background Function Implementation
- Create `generate-plushie` Inngest function
- Event trigger: `"plushie/generate.requested"`
- Implement step-based execution for retry granularity:
  1. Upload original image to Vercel Blob
  2. AI analysis with Gemini vision model
  3. AI generation with Gemini image model
  4. Upload generated image to Vercel Blob
  5. Deduct credit and update status to "completed"
- Configure retries: 3 attempts with exponential backoff
- Configure concurrency: 5 per user (keyed by `userId`)

### TR-3: Credit System Logic
- Reserve credits by checking: `WHERE (credits - processingCount) >= 1`
- Processing count derived from: `COUNT(*) WHERE status='processing'`
- Deduct credit only on successful completion
- Automatic release on failure (no manual refund needed)
- Atomic operations to prevent race conditions

### TR-4: Database Usage
- Use existing `plushie_generations` table (no schema changes)
- Status field already supports: "processing", "completed", "failed"
- Create record with status="processing" at start
- Update to "completed" with image URLs on success
- Update to "failed" on error
- No additional fields needed (Inngest handles error tracking)

### TR-5: Server Action Refactoring
- Refactor `src/app/actions/generate-plushie.ts`:
  - Validate session and file (existing logic)
  - Check available credits
  - Create DB record with status="processing"
  - Send Inngest event with image data
  - Return immediately with `generationId`
- Create `src/app/actions/get-generation-status.ts`:
  - Input: `generationId`
  - Validate ownership (userId must match)
  - Return: `{ status, originalImageUrl?, plushieImageUrl? }`
- Create `src/app/actions/retry-generation.ts`:
  - Input: `generationId`
  - Validate ownership and status="failed"
  - Load original image from Blob
  - Send new Inngest event
  - Reset status to "processing"

### TR-6: Client-Side Polling
- Update `src/components/generate/generate-page-client.tsx`:
  - On submit, receive `generationId` immediately
  - Start polling `getGenerationStatus()` every 3 seconds
  - Stop polling when status is "completed" or "failed"
  - Timeout after 5 minutes with error message
  - Show appropriate UI for each status

### TR-7: Gallery Updates
- Update `src/components/gallery/gallery-client.tsx`:
  - Show all generations (processing, completed, failed)
  - Add status badges with color coding
  - Show loading skeleton for "processing" generations
  - Show error icon + retry button for "failed" generations
- Update `src/components/plushie/plushie-card.tsx`:
  - Accept and render status prop
  - Conditional rendering based on status

### TR-8: Observability
- Inngest Dev Server UI (http://localhost:8288) for local development
- View all runs, steps, retries, and event payloads
- Structured logging in function steps
- Production monitoring via Inngest Cloud dashboard

## Non-Functional Requirements

### NFR-1: Performance
- Generation should not block HTTP requests
- Polling should be efficient (3-second intervals)
- Database queries should use existing indexes
- No additional database schema complexity

### NFR-2: Reliability
- Automatic retries for transient failures (AI API timeouts, network issues)
- Graceful degradation if Inngest is unavailable
- Proper cleanup of Blob storage on failures
- Idempotent operations where possible

### NFR-3: Security
- Event signing in production (via `INNGEST_SIGNING_KEY`)
- Ownership validation on all status checks and retries
- No exposure of internal error details to users
- Rate limiting via existing Better Auth (10 req/min)

### NFR-4: Developer Experience
- Clear structured logging for debugging
- Inngest Dev UI for local testing
- No breaking changes to existing API
- Comprehensive documentation in CLAUDE.md

## Out of Scope
- Email notifications (polling only for MVP)
- Webhook-based status updates (polling only for MVP)
- Advanced queue management UI (Inngest handles this)
- Unit and E2E testing (excluded per project convention)
- Migration from synchronous to async (direct implementation)

## Success Metrics
- Generation timeout issues eliminated
- Retry success rate for transient failures
- Average time to completion tracked in Inngest
- Zero credit deduction bugs
- User satisfaction with status visibility

## Environment Variables
```env
# Development (optional)
INNGEST_EVENT_KEY=          # Event authentication (optional for local dev)
INNGEST_SIGNING_KEY=        # Function invocation security (optional for local dev)

# Production (required)
INNGEST_EVENT_KEY=          # Required for production event authentication
INNGEST_SIGNING_KEY=        # Required for production function security
```

## Dependencies
- `inngest` - Background job SDK
- Existing: `@vercel/blob`, `ai`, `@openrouter/ai-sdk-provider`, `drizzle-orm`

## Migration Strategy
1. Implement all phases in feature branch
2. Test thoroughly with Inngest Dev Server
3. Deploy to production with all features active
4. Monitor first 100 generations for issues
5. Remove old synchronous code comments after validation

## Timeline Estimate
- **Setup & Dependencies**: 30 minutes
- **Core Inngest Function**: 2 hours
- **Server Actions Refactoring**: 1.5 hours
- **Client Polling & UI**: 2 hours
- **Testing & Documentation**: 1 hour
- **Total**: ~6-7 hours
