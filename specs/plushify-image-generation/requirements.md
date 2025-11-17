# Plushify Image Generation - Requirements

## Feature Overview
Enable users to upload images and generate "plushified" versions using AI, with a credit-based system and persistent storage.

## User Stories

### As a user, I want to:
1. Upload an image on the generate page
2. Generate a plushified version of the subject in my image using AI
3. Have the generation cost deducted from my credits (1 credit per generation)
4. Be notified when I have insufficient credits
5. View all my generated plushies in a gallery
6. Compare before/after images with a slider
7. Delete generations I no longer want
8. Navigate through my generations with pagination

## Functional Requirements

### Image Generation
- **Upload**: Accept image files (validated by existing ImageUploadZone component)
- **AI Processing**: Two-step AI process:
  1. Analyze uploaded image to identify and describe the subject
  2. Generate plushified version based on the analysis
- **Credit System**:
  - Deduct 1 credit per successful generation
  - Prevent generation if user has insufficient credits
  - Show error message: "Insufficient credits. Purchase more to continue generating plushies."
- **Storage**: Persist both original and generated images in Vercel Blob storage
- **Database**: Store generation metadata (URLs, status, timestamps, subject type)

### Gallery Display
- **List View**: Display all user generations in a responsive grid
- **Pagination**: Show 12 generations per page
- **Before/After Slider**: Interactive comparison of original vs plushified image
- **Delete Functionality**:
  - Confirmation dialog before deletion
  - Dialog message: "Are you sure you want to delete this generation? This action cannot be undone."
  - Remove from both storage and database

### User Experience
- **Success State**: After generation, stay on generate page with:
  - Display of generated result
  - "Generate Another" button
  - "View Gallery" button
- **Error Handling**: Show appropriate toast messages for:
  - Insufficient credits
  - Generation failures
  - Deletion confirmations
  - General errors

## Technical Requirements

### Tech Stack
- **AI Provider**: OpenRouter
- **AI Model**: `google/gemini-2.5-flash-image`
- **AI SDK**: Vercel AI SDK with `@openrouter/ai-sdk-provider`
- **Storage**: Vercel Blob Storage (`@vercel/blob`)
- **Database**: PostgreSQL with Drizzle ORM (existing)
- **Authentication**: Better Auth (existing)

### Security Requirements
- **Authentication**: All generation and gallery actions must be protected
- **Authorization**: Users can only:
  - View their own generations
  - Delete their own generations
  - Use their own credits
- **Server Actions**: All data mutations via protected Next.js server actions

### Data Requirements

#### Database Schema
New table: `plushie_generations`
- `id` (UUID, primary key)
- `userId` (text, foreign key → user.id)
- `originalImageUrl` (text) - Vercel Blob URL
- `plushieImageUrl` (text) - Vercel Blob URL
- `subjectType` ("person" | "pet" | "other")
- `status` ("processing" | "completed" | "failed")
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

#### Blob Storage Structure
```
plushify/
├── originals/
│   └── {userId}/
│       └── {timestamp}.{ext}
└── generated/
    └── {userId}/
        └── {timestamp}.png
```

### Environment Variables
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token
- `OPENROUTER_API_KEY` - Already configured

## Non-Functional Requirements

### Performance
- Image upload should provide immediate feedback
- Generation process should show loading states
- Gallery should load efficiently with pagination

### User Feedback
- Clear loading indicators during AI generation
- Toast notifications for all significant actions
- Optimistic UI updates where appropriate

### Error Handling
- Graceful failure recovery
- Rollback credit deduction if generation fails
- Clean up blob storage on failed generations
- User-friendly error messages

## Out of Scope
- Image editing capabilities
- Bulk generation
- Export/download of generated images (already exists in gallery)
- Credit purchase functionality (separate feature)
- Social sharing features
- Unit and E2E testing

## Success Criteria
1. Users can successfully upload and generate plushified images
2. Credits are correctly deducted only on successful generations
3. All generations are viewable in the gallery
4. Users can delete generations with confirmation
5. Before/after slider works smoothly
6. Pagination functions correctly
7. All error states are handled gracefully
8. No TypeScript or lint errors
