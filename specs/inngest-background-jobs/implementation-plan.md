# Inngest Background Jobs - Implementation Plan

## Phase 1: Setup & Dependencies

### 1.1 Install Inngest Package
- [x] Run `pnpm add inngest`
- [x] Run `pnpm add -D inngest-cli` for local development tools
- [x] Verify installation in `package.json`

### 1.2 Environment Variables Setup
- [x] Add `INNGEST_EVENT_KEY` to `.env.local` (optional for dev, leave empty)
- [x] Add `INNGEST_SIGNING_KEY` to `.env.local` (optional for dev, leave empty)
- [x] Add both variables to `.env.example` with comments
- [x] Document production requirement in CLAUDE.md

### 1.3 Create Inngest Client
- [x] Create `src/inngest/client.ts`
- [x] Export singleton Inngest instance with app ID "plushify"
- [x] Add TypeScript types for event payloads

**Files to create:**
- `src/inngest/client.ts`

**Example structure:**
```typescript
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "plushify",
  // Event key and signing key auto-loaded from env vars
});

// Type-safe event definitions
export type Events = {
  "plushie/generate.requested": {
    data: {
      generationId: string;
      userId: string;
      imageData: string;
      imageType: string;
    };
  };
};
```

---

## Phase 2: Core Inngest Function

### 2.1 Create Generation Function File
- [x] Create `src/inngest/functions/generate-plushie.ts`
- [x] Import Inngest client and necessary utilities
- [x] Import database client, auth, Blob storage, AI SDK

### 2.2 Implement Function Configuration
- [x] Set function ID as "generate-plushie"
- [x] Configure event trigger: `"plushie/generate.requested"`
- [x] Configure concurrency limit: 5 per user
- [x] Configure retry strategy: 3 attempts with exponential backoff

### 2.3 Implement Step 1: Upload Original Image
- [x] Use `step.run("upload-original")` wrapper
- [x] Convert base64 image data to Buffer/Blob
- [x] Upload to Vercel Blob: `plushify/originals/{userId}/{generationId}.{ext}`
- [x] Update database record with `originalImageUrl`
- [x] Handle upload errors with proper error messages

### 2.4 Implement Step 2: AI Analysis
- [x] Use `step.run("analyze-image")` wrapper
- [x] Call Gemini vision model (`google/gemini-2.5-flash-image`)
- [x] Pass original image as base64 in multimodal message
- [x] Extract subject type (person/pet/other) from analysis
- [x] Extract description and key features
- [x] Handle AI API errors with retries

### 2.5 Implement Step 3: AI Generation
- [x] Use `step.run("generate-plushie")` wrapper
- [x] Call Gemini image model (`google/gemini-2.5-flash-image-preview`)
- [x] Build prompt from analysis results
- [x] Pass original image as reference
- [x] Extract PNG from `result.files[0].uint8Array`
- [x] Handle generation errors with retries

### 2.6 Implement Step 4: Upload Generated Image
- [x] Use `step.run("upload-generated")` wrapper
- [x] Convert uint8Array to Blob
- [x] Upload to Vercel Blob: `plushify/generated/{userId}/{generationId}.png`
- [x] Update database record with `plushieImageUrl`
- [x] Handle upload errors

### 2.7 Implement Step 5: Finalize & Credit Deduction
- [x] Use `step.run("finalize")` wrapper
- [x] Deduct credit with atomic SQL: `UPDATE user SET credits = credits - 1 WHERE id = ?`
- [x] Update generation status to "completed"
- [x] Set `subjectType` and `updatedAt` timestamp
- [x] Log success

### 2.8 Implement Failure Handler
- [x] Add `onFailure` lifecycle hook
- [x] Update generation status to "failed"
- [x] Clean up Blob URLs if they exist (delete from Vercel Blob)
- [x] No credit refund needed (never deducted on failure)
- [x] Log error details for debugging

**Files to create:**
- `src/inngest/functions/generate-plushie.ts`

---

## Phase 3: API Route Setup

### 3.1 Create Inngest API Route
- [x] Create `src/app/api/inngest/route.ts`
- [x] Import `serve` from "inngest/next"
- [x] Import Inngest client from `src/inngest/client.ts`
- [x] Import generation function from `src/inngest/functions/generate-plushie.ts`

### 3.2 Configure Route Handlers
- [x] Export `GET`, `POST`, `PUT` handlers using `serve()`
- [x] Register `generatePlushieFunction` in functions array
- [x] Verify route is accessible at `/api/inngest`

**Files to create:**
- `src/app/api/inngest/route.ts`

**Example structure:**
```typescript
import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { generatePlushieFunction } from "@/inngest/functions/generate-plushie";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [generatePlushieFunction],
});
```

---

## Phase 4: Server Actions

### 4.1 Refactor Main Generate Action
**File:** `src/app/actions/generate-plushie.ts`

- [x] Keep existing auth validation
- [x] Keep existing file validation (type, size)
- [x] Add credit availability check: `SELECT credits - (SELECT COUNT(*) FROM plushie_generations WHERE userId = ? AND status = 'processing') as available`
- [x] Return error if available credits < 1
- [x] Generate unique `generationId` (UUID)
- [x] Create database record with status "processing"
- [x] Convert file to base64 string
- [x] Send Inngest event with `inngest.send()`
- [x] Return immediately: `{ success: true, generationId }`
- [x] Remove all AI generation logic (moved to Inngest)
- [x] Remove synchronous Blob uploads (moved to Inngest)

### 4.2 Create Status Check Action
**File:** `src/app/actions/get-generation-status.ts`

- [x] Create new server action file
- [x] Accept `generationId` parameter
- [x] Validate user session
- [x] Query generation record: `SELECT * FROM plushie_generations WHERE id = ?`
- [x] Verify `userId` matches session user (ownership check)
- [x] Return: `{ status, originalImageUrl?, plushieImageUrl?, subjectType? }`
- [x] Handle not found errors

### 4.3 Create Retry Action
**File:** `src/app/actions/retry-generation.ts`

- [x] Create new server action file
- [x] Accept `generationId` parameter
- [x] Validate user session
- [x] Query generation record and verify ownership
- [x] Verify status is "failed"
- [x] Load original image from Blob storage
- [x] Convert image to base64
- [x] Send new Inngest event (same structure as initial generation)
- [x] Update database status to "processing"
- [x] Return: `{ success: true, generationId }`

**Files to modify:**
- `src/app/actions/generate-plushie.ts`

**Files to create:**
- `src/app/actions/get-generation-status.ts`
- `src/app/actions/retry-generation.ts`

---

## Phase 5: Client-Side Polling

### 5.1 Update Generate Page Component
**File:** `src/components/generate/generate-page-client.tsx`

- [x] Import `getGenerationStatus` action
- [x] Add state for polling: `pollingGenerationId`, `pollingStatus`
- [x] On form submit, receive `generationId` from server action
- [x] Start polling immediately with `setInterval` (3 second interval)
- [x] Call `getGenerationStatus(generationId)` on each poll
- [x] Update UI based on status response
- [x] Stop polling when status is "completed" or "failed"
- [x] Add 5-minute timeout with error message
- [x] Clear interval on unmount

### 5.2 Implement Status UI States
- [x] **Processing**: Show spinner + "Generating your plushie..." message
- [x] **Processing**: Disable form submission
- [x] **Processing**: Show progress indicator (optional)
- [x] **Completed**: Show success toast notification
- [x] **Completed**: Redirect to gallery or show result inline
- [x] **Completed**: Re-enable form for new generation
- [x] **Failed**: Show error toast with retry button
- [x] **Failed**: Re-enable form
- [x] **Timeout**: Show timeout error after 5 minutes

### 5.3 Add Polling Cleanup
- [x] Clear interval on component unmount
- [x] Clear interval when user navigates away
- [x] Clear interval on completion/failure
- [x] Handle race conditions (multiple rapid submissions)

**Files to modify:**
- `src/components/generate/generate-page-client.tsx`

---

## Phase 6: Gallery & UI Updates

### 6.1 Update Gallery Component
**File:** `src/components/gallery/gallery-client.tsx`

- [x] Modify query to include all statuses (don't filter by status)
- [x] Add status badge component with color coding:
  - Processing: Blue/purple badge + spinner
  - Completed: Green badge (or no badge)
  - Failed: Red badge + error icon
- [x] Show loading skeleton for processing generations
- [x] Import retry action
- [x] Add retry button handler for failed generations
- [x] Show retry loading state

### 6.2 Update PlushieCard Component
**File:** `src/components/plushie/plushie-card.tsx`

- [x] Add `status` prop to component interface
- [x] Conditional rendering based on status:
  - **Processing**: Show loading skeleton instead of images
  - **Completed**: Show normal before/after slider
  - **Failed**: Show placeholder with error icon
- [x] Add retry button for failed status
- [x] Accept `onRetry` callback prop

### 6.3 Update User Button (Credits Display)
**File:** `src/components/auth/user-button.tsx`

- [x] Update credits query to calculate available credits
- [x] Query: `SELECT credits, (SELECT COUNT(*) FROM plushie_generations WHERE userId = user.id AND status = 'processing') as processingCount`
- [x] Display: `credits - processingCount` as available
- [x] Add tooltip showing "X available (Y in use)" on hover
- [x] Show warning icon if all credits are reserved

**Files to modify:**
- `src/components/gallery/gallery-client.tsx`
- `src/components/plushie/plushie-card.tsx`
- `src/components/auth/user-button.tsx`

---

## Phase 7: Concurrency & Rate Limiting

### 7.1 Inngest-Level Concurrency (Already in Phase 2)
- [x] Verify concurrency configuration in function definition
- [x] Ensure key is set to `event.data.userId`
- [x] Test with 6+ concurrent generations from same user

### 7.2 Client-Side Validation
**File:** `src/components/generate/generate-page-client.tsx`

- [x] Before form submit, check processing count
- [x] Query via server action: `SELECT COUNT(*) FROM plushie_generations WHERE userId = ? AND status = 'processing'`
- [x] If count >= 5, show error toast
- [x] Error message: "You have 5 generations in progress. Please wait for one to complete."
- [x] Disable submit button if limit reached

### 7.3 Server-Side Validation
**File:** `src/app/actions/generate-plushie.ts`

- [x] Add processing count check before sending event
- [x] Return error if processing count >= 5
- [x] Consistent error message with client-side

**Files to modify:**
- `src/components/generate/generate-page-client.tsx`
- `src/app/actions/generate-plushie.ts`

**Files created:**
- `src/app/actions/get-processing-count.ts`

---

## Phase 8: Development & Testing Setup

### 8.1 Update Package.json Scripts
- [x] Add `"dev:inngest": "inngest-cli dev"` script
- [ ] Add `"dev:all": "concurrently \"pnpm dev\" \"pnpm dev:inngest\""` (if concurrently installed) - Optional
- [x] Document scripts in CLAUDE.md

### 8.2 Local Development Workflow
- [x] Start Inngest dev server: `pnpm dev:inngest`
- [x] Start Next.js dev server: `pnpm dev` (in separate terminal)
- [x] Verify Inngest UI accessible at http://localhost:8288
- [x] Verify `/api/inngest` route is registered

### 8.3 Manual Testing Checklist
- [x] Test single generation from start to completion
- [x] Verify status polling updates UI correctly
- [x] Test generation failure (invalid image or mock AI error)
- [x] Verify failed generation shows in gallery with retry button
- [x] Test retry functionality
- [x] Test credit reservation/deduction flow
- [x] Test concurrent generations (3-5 at once)
- [x] Test concurrency limit enforcement (try 6 concurrent)
- [x] Verify Inngest UI shows all runs with step details
- [x] Test polling timeout after 5 minutes
- [x] Verify Blob storage cleanup on failures

### 8.4 Code Quality Checks
- [x] Run `pnpm lint` and fix all errors
- [x] Run `pnpm typecheck` and fix all type errors
- [x] Verify no console errors in browser
- [x] Verify no unhandled promise rejections

**Files to modify:**
- `package.json`

---

## Phase 9: Observability & Monitoring

### 9.1 Inngest Dev UI Setup (Local)
- [x] Access http://localhost:8288 in browser
- [x] Explore "Functions" tab to see registered function
- [x] Explore "Events" tab to see sent events
- [x] Explore "Runs" tab to see function executions
- [x] Test triggering function manually from UI

### 9.2 Add Structured Logging
**File:** `src/inngest/functions/generate-plushie.ts`

- [x] Add log at start: `console.log("[Inngest] Generation started", { generationId, userId })`
- [x] Add log after each step: `console.log("[Inngest] Step completed: upload-original", { generationId })`
- [x] Add error logs: `console.error("[Inngest] Step failed", { step, error, generationId })`
- [x] Add log on success: `console.log("[Inngest] Generation completed", { generationId, duration })`

### 9.3 Production Monitoring Setup (Optional)
- [ ] Sign up for Inngest Cloud (free tier) - Optional for production
- [ ] Generate `INNGEST_EVENT_KEY` from Inngest dashboard
- [ ] Generate `INNGEST_SIGNING_KEY` from Inngest dashboard
- [ ] Add both to production environment variables
- [ ] Deploy and verify runs appear in Inngest Cloud dashboard
- [ ] Set up alerts for high failure rates (optional)

**Files to modify:**
- `src/inngest/functions/generate-plushie.ts`

---

## Phase 10: Documentation & Cleanup

### 10.1 Update CLAUDE.md
- [x] Add new section: "Background Jobs with Inngest"
- [x] Document event-driven architecture
- [x] Document credit reservation system (derived from processing count)
- [x] Document retry/failure handling
- [x] Add Inngest Dev Server instructions
- [x] Document environment variables
- [x] Add troubleshooting section

### 10.2 Update README (if exists)
- [ ] Add Inngest to tech stack section - Not needed (README is boilerplate-focused)
- [ ] Document new development workflow (running Inngest dev server) - Not needed (README is boilerplate-focused)
- [ ] Add environment variables to setup section - Not needed (README is boilerplate-focused)
- [ ] Add link to Inngest documentation - Not needed (README is boilerplate-focused)

### 10.3 Add Code Comments
- [x] Add comments explaining credit reservation logic
- [x] Add comments explaining polling mechanism
- [x] Add JSDoc comments to new server actions
- [x] Add comments explaining Inngest step pattern

### 10.4 Cleanup Old Code
- [x] Add comment to old `generate-plushie.ts` logic: "// Refactored to use Inngest background jobs"
- [x] Remove any unused imports
- [x] Remove any dead code from refactoring
- [x] Verify no commented-out code remains

**Files to modify:**
- `CLAUDE.md`
- `README.md` (if exists) - Skipped (boilerplate-focused)
- Various files for comments

---

## Success Criteria Checklist

### Functional Requirements
- [x] User can submit image and receive immediate response
- [x] Generation runs in background without blocking
- [x] User sees real-time status updates via polling
- [x] Failed generations are retryable without re-upload
- [x] Credits reserved during processing, deducted on success
- [x] Maximum 5 concurrent generations per user enforced
- [x] Gallery shows all generation statuses correctly

### Technical Requirements
- [x] Inngest function properly configured with retries
- [x] API route responds to Inngest webhooks
- [x] Server actions refactored to event-driven pattern
- [x] Client polling implemented with proper cleanup
- [x] No database schema changes required
- [x] All existing functionality preserved

### Quality Requirements
- [x] `pnpm lint` passes with no errors
- [x] `pnpm typecheck` passes with no errors
- [x] No console errors in browser
- [x] All manual tests pass
- [x] Inngest Dev UI shows all runs with details
- [x] Documentation updated

### Non-Functional Requirements
- [x] No request timeouts on generation
- [x] Proper error handling at all steps
- [x] Blob storage cleanup on failures
- [x] Ownership validation on all actions
- [x] Structured logging for debugging

---

## Rollback Plan

If issues arise during or after deployment:

1. **Immediate Rollback:**
   - [ ] Revert `generate-plushie.ts` to synchronous implementation
   - [ ] Keep Inngest infrastructure but don't send events
   - [ ] Remove polling from client components

2. **Data Integrity:**
   - [ ] No schema changes means no database migration rollback needed
   - [ ] Processing status generations can be manually marked as failed
   - [ ] Credits will auto-release when status changed from processing

3. **Debugging Steps:**
   - [ ] Check Inngest Dev UI / Cloud dashboard for error details
   - [ ] Review server logs for step failures
   - [ ] Verify environment variables are set correctly
   - [ ] Test API route accessibility: `curl http://localhost:3000/api/inngest`

---

## Estimated Timeline

| Phase | Estimated Time |
|-------|----------------|
| Phase 1: Setup & Dependencies | 30 minutes |
| Phase 2: Core Inngest Function | 2 hours |
| Phase 3: API Route Setup | 15 minutes |
| Phase 4: Server Actions | 1 hour |
| Phase 5: Client-Side Polling | 1.5 hours |
| Phase 6: Gallery & UI Updates | 1 hour |
| Phase 7: Concurrency & Rate Limiting | 30 minutes |
| Phase 8: Development & Testing | 1.5 hours |
| Phase 9: Observability & Monitoring | 30 minutes |
| Phase 10: Documentation & Cleanup | 30 minutes |
| **Total** | **~9 hours** |

---

## Dependencies Between Phases

- **Phase 1** must complete before all others (setup required)
- **Phase 2** can proceed in parallel with Phase 3
- **Phase 4** depends on Phase 2 and 3 (function must exist to send events)
- **Phase 5** depends on Phase 4 (actions must exist to poll)
- **Phase 6** depends on Phase 4 (needs retry action)
- **Phase 7** can be done anytime after Phase 2
- **Phase 8-10** should be done after all functional phases complete

## Next Steps

After completing this implementation plan:

1. Review and approve the plan
2. Begin Phase 1 implementation
3. Work through phases sequentially, checking off tasks
4. Test thoroughly at each phase before proceeding
5. Update this document with any deviations or learnings
