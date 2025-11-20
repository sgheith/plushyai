# Polar Payment Integration - Plushify Implementation Guide

This document provides implementation details specific to Plushify's Polar payment integration.

## Quick Start

### Prerequisites

1. Polar account with Sandbox access
2. Three products created in Polar dashboard
3. Webhook endpoint configured
4. Environment variables set

### Environment Variables

```env
POLAR_ACCESS_TOKEN=polar_oat_...
POLAR_WEBHOOK_SECRET=polar_whs_...
POLAR_SERVER=sandbox  # or "production"
```

## Implementation Overview

### Files Created/Modified

**New Files (11):**
1. `src/lib/polar-config.ts` - Product configuration
2. `src/lib/polar-types.ts` - TypeScript types
3. `src/inngest/functions/process-purchase.ts` - Webhook processor
4. `src/app/checkout/success/page.tsx` - Success page
5. `src/app/actions/get-transactions.ts` - Fetch transactions
6. `src/app/actions/get-purchases.ts` - Fetch purchases
7. `src/components/credits/transaction-history.tsx` - Transaction UI
8. `drizzle/0008_elite_dagger.sql` - Database migration

**Modified Files (7):**
1. `src/lib/schema.ts` - Added purchases and creditTransactions tables
2. `src/lib/auth.ts` - Added Polar plugin configuration
3. `src/lib/auth-client.ts` - Added Polar client plugin
4. `src/components/pricing/pricing-card.tsx` - Added checkout functionality
5. `src/app/pricing/page.tsx` - Pass slug to pricing cards
6. `src/inngest/functions/generate-plushie.ts` - Track credit transactions
7. `src/app/api/inngest/route.ts` - Registered process-purchase function

## Database Schema

### Migration: 0008_elite_dagger.sql

```sql
-- Create purchases table
CREATE TABLE IF NOT EXISTS "purchases" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "userId" text NOT NULL,
  "polarOrderId" text NOT NULL,
  "polarCheckoutId" text,
  "productId" text NOT NULL,
  "productName" text NOT NULL,
  "amount" integer NOT NULL,
  "credits" integer NOT NULL,
  "status" text DEFAULT 'pending' NOT NULL,
  "createdAt" timestamp DEFAULT now() NOT NULL,
  "completedAt" timestamp,
  CONSTRAINT "purchases_polarOrderId_unique" UNIQUE("polarOrderId")
);

-- Create credit_transactions table
CREATE TABLE IF NOT EXISTS "credit_transactions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "userId" text NOT NULL,
  "type" text NOT NULL,
  "amount" integer NOT NULL,
  "balanceAfter" integer NOT NULL,
  "relatedId" text,
  "description" text,
  "metadata" jsonb,
  "createdAt" timestamp DEFAULT now() NOT NULL
);

-- Add indexes
CREATE INDEX IF NOT EXISTS "purchases_userId_idx" ON "purchases" ("userId");
CREATE INDEX IF NOT EXISTS "credit_transactions_userId_idx" ON "credit_transactions" ("userId");
CREATE INDEX IF NOT EXISTS "credit_transactions_type_idx" ON "credit_transactions" ("type");
CREATE INDEX IF NOT EXISTS "credit_transactions_relatedId_idx" ON "credit_transactions" ("relatedId");

-- Add foreign keys
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_userId_user_id_fk"
  FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_userId_user_id_fk"
  FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
```

## Product Configuration

### Current Sandbox Products

Located in `src/lib/polar-config.ts`:

```typescript
export const POLAR_PRODUCTS: PolarProduct[] = [
  {
    id: "94bc2529-7b95-4a04-a1a5-42ba88de67bc",
    slug: "basic",
    name: "Basic Package",
    credits: 30,
    price: 9,
  },
  {
    id: "085a268c-d0c7-4f11-9e84-a49ecee7eda5",
    slug: "pro",
    name: "Pro Package",
    credits: 100,
    price: 19,
  },
  {
    id: "04035724-fade-4b6c-b2cb-cf53b7ad4855",
    slug: "premium",
    name: "Premium Package",
    credits: 200,
    price: 29,
  },
];
```

**Note:** The pricing page uses "Elite" naming but maps to "premium" slug for Polar compatibility.

## Authentication Configuration

### Server Side (`src/lib/auth.ts`)

```typescript
import { polar, checkout, portal, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { POLAR_PRODUCTS } from "./polar-config";
import { inngest } from "@/inngest/client";

// Initialize Polar SDK
const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: process.env.POLAR_SERVER as "sandbox" | "production",
});

// Better Auth configuration
export const auth = betterAuth({
  // ... other config
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: POLAR_PRODUCTS.map((p) => ({
            productId: p.id,
            slug: p.slug,
          })),
          successUrl: "/checkout/success?checkout_id={CHECKOUT_ID}",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!,
          onOrderPaid: async (data) => {
            // Send to Inngest for async processing
            await inngest.send({
              name: "polar/order.paid",
              data: {
                orderId: data.order.id,
                checkoutId: data.checkout?.id || "",
                userId: data.customer.externalId || "",
                productId: data.order.productId,
                amount: data.order.amount,
                createdAt: data.order.createdAt,
              },
            });
          },
        }),
      ],
    }),
  ],
});
```

### Client Side (`src/lib/auth-client.ts`)

```typescript
import { createAuthClient } from "better-auth/react";
import { polarClient } from "@polar-sh/better-auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
  plugins: [polarClient()],
});

// Export useful methods
export const { signIn, signOut, useSession } = authClient;
```

## Webhook Processing Flow

### 1. Polar Sends Webhook

Webhook endpoint: `POST /api/auth/polar/webhooks`

Better Auth automatically:
- Verifies webhook signature
- Parses payload
- Calls `onOrderPaid` handler

### 2. Inngest Event Triggered

Handler sends event to Inngest:

```typescript
await inngest.send({
  name: "polar/order.paid",
  data: {
    orderId: "order_123",
    checkoutId: "checkout_456",
    userId: "user_789",
    productId: "product_abc",
    amount: 900, // cents
    createdAt: "2025-01-01T00:00:00Z",
  },
});
```

### 3. Process Purchase Function

Located in `src/inngest/functions/process-purchase.ts`:

```typescript
export const processPurchase = inngest.createFunction(
  {
    id: "process-purchase",
    retries: 3,
  },
  { event: "polar/order.paid" },
  async ({ event, step }) => {
    // Step 1: Check for duplicate
    const existingPurchase = await step.run("check-duplicate", async () => {
      const result = await db
        .select()
        .from(purchases)
        .where(eq(purchases.polarOrderId, orderId))
        .limit(1);
      return result[0];
    });

    if (existingPurchase) {
      return { success: true, message: "Already processed" };
    }

    // Step 2: Get product config
    const product = await step.run("get-product-config", async () => {
      const prod = getProductById(productId);
      if (!prod) throw new Error("Product not found");
      return prod;
    });

    // Step 3: Create purchase record
    const purchase = await step.run("create-purchase-record", async () => {
      const [newPurchase] = await db
        .insert(purchases)
        .values({
          userId,
          polarOrderId: orderId,
          polarCheckoutId: checkoutId,
          productId,
          productName: product.name,
          amount,
          credits: product.credits,
          status: "completed",
          createdAt: new Date(createdAt),
          completedAt: new Date(),
        })
        .returning();
      return newPurchase;
    });

    // Step 4: Add credits atomically
    await step.run("add-credits", async () => {
      await db.transaction(async (tx) => {
        // Update user credits
        const [updatedUser] = await tx
          .update(user)
          .set({
            credits: sql`${user.credits} + ${product.credits}`,
          })
          .where(eq(user.id, userId))
          .returning();

        // Record transaction
        await tx.insert(creditTransactions).values({
          userId,
          type: "purchase",
          amount: product.credits,
          balanceAfter: updatedUser.credits,
          relatedId: purchase.id,
          description: `Purchased ${product.name}`,
          metadata: { orderId, productId, productName: product.name },
        });
      });
    });

    return { success: true, purchaseId: purchase.id };
  }
);
```

## User Interface

### Pricing Card Component

Located in `src/components/pricing/pricing-card.tsx`:

```typescript
const handleCheckout = async () => {
  try {
    setIsLoading(true);
    await authClient.checkout({ slug });
    // User redirected to Polar
  } catch (error) {
    toast.error("Failed to start checkout");
  } finally {
    setIsLoading(false);
  }
};
```

### Success Page

Located in `src/app/checkout/success/page.tsx`:

Shows success message and explains that credits will appear shortly (async processing).

### Transaction History Component

Located in `src/components/credits/transaction-history.tsx`:

Displays complete transaction history with:
- Purchase transactions (green, positive amount)
- Generation transactions (red, -1 credit)
- Running balance after each transaction
- Formatted dates and descriptions

## Testing Workflow

### Local Development Setup

1. **Start Services:**
   ```bash
   # Terminal 1
   pnpm dev

   # Terminal 2
   pnpm dev:inngest
   ```

2. **Setup ngrok Tunnel:**
   ```bash
   ngrok http 3000
   ```

3. **Configure Polar Webhook:**
   - URL: `https://YOUR_NGROK_URL/api/auth/polar/webhooks`
   - Events: `order.created`, `order.paid`
   - Copy webhook secret to `.env`

### Test Checkout Flow

1. Navigate to `http://localhost:3000/pricing`
2. Click "Get Started" on any package
3. Use test card: `4242 4242 4242 4242`
4. Complete checkout
5. Verify redirect to `/checkout/success`
6. Monitor Inngest Dev UI at `http://localhost:8288`
7. Check database:
   ```sql
   SELECT * FROM purchases WHERE "userId" = 'user_id';
   SELECT * FROM credit_transactions WHERE "userId" = 'user_id';
   ```

### Verify Idempotency

1. In Polar Dashboard, find the webhook delivery
2. Click "Resend" to trigger duplicate webhook
3. Verify in Inngest Dev UI that function returns early
4. Verify no duplicate credits added in database

## Production Deployment

### Checklist

- [ ] Create products in Polar Production environment
- [ ] Update `POLAR_PRODUCTS` with production product IDs
- [ ] Set `POLAR_ACCESS_TOKEN` to production token
- [ ] Set `POLAR_WEBHOOK_SECRET` to production secret
- [ ] Set `POLAR_SERVER=production`
- [ ] Update Polar webhook URL to production domain
- [ ] Set `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY`
- [ ] Test checkout in staging environment
- [ ] Monitor Inngest Cloud dashboard
- [ ] Set up error alerts

### Environment Variables

```env
# Production
POLAR_ACCESS_TOKEN=polar_oat_PRODUCTION_TOKEN
POLAR_WEBHOOK_SECRET=polar_whs_PRODUCTION_SECRET
POLAR_SERVER=production
INNGEST_EVENT_KEY=inngest_prod_key
INNGEST_SIGNING_KEY=inngest_prod_signing_key
```

## Troubleshooting

### Credits Not Appearing

1. Check Inngest Dev UI for function execution
2. Look for errors in Inngest logs
3. Verify webhook received by Better Auth
4. Check database for purchase record
5. Verify product ID matches configuration

### Duplicate Credits

Should not happen due to:
- Unique constraint on `polarOrderId`
- Idempotency check in first step
- Early return if duplicate detected

If it happens:
- Check database migration applied correctly
- Verify unique constraint exists
- Check Inngest function code

### Webhook Not Received

1. Verify ngrok tunnel is running (local dev)
2. Check Polar webhook URL matches current ngrok URL
3. Verify webhook secret matches `.env`
4. Check Polar dashboard for webhook delivery logs
5. Test webhook endpoint manually: `GET /api/auth/polar/webhooks`

## Monitoring

### Metrics to Track

- Purchase success rate
- Webhook processing time
- Failed purchases (retry count)
- Credit addition latency
- Transaction log completeness

### Alerts to Configure

- Purchase processing failures
- High webhook retry rates
- Unexpected transaction types
- Missing credit transactions
- Database constraint violations

## References

- [Polar Documentation](https://docs.polar.sh/)
- [Better Auth Polar Plugin](https://www.better-auth.com/docs/plugins/polar)
- [Inngest Documentation](https://www.inngest.com/docs)
- [Implementation Plan](../../../specs/polar-payment-integration/implementation-plan.md)
- [CLAUDE.md Payment Integration Section](../../../CLAUDE.md#payment-integration-with-polar)
