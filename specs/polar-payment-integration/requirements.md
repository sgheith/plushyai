# Polar Payment Integration - Requirements

## Overview
Integrate Polar payments with BetterAuth to enable users to purchase credits through the existing pricing page. The system must track all financial transactions (purchases and credit usage) and process payments asynchronously for reliability.

## Business Requirements

### Credit Packages
The application offers three one-time purchase credit packages:

| Package | Price | Credits | Price per Credit |
|---------|-------|---------|------------------|
| Basic   | $9    | 30      | $0.30           |
| Pro     | $19   | 100     | $0.19           |
| Premium | $29   | 200     | $0.15           |

### User Journey
1. User browses pricing page (`/pricing`)
2. User clicks "Get Started" on desired package
3. User is redirected to Polar checkout (hosted by Polar)
4. User completes payment
5. User is redirected to success page (`/checkout/success`)
6. Credits are automatically added to user account (async)
7. User can view purchase history and transaction log

### Transaction Tracking Requirements
The system must maintain a complete audit trail of all credit movements:

**Purchase Transactions:**
- Track all credit purchases with Polar order details
- Record: user, Polar order ID, product, amount paid, credits received, timestamp
- Support idempotency (duplicate webhooks should not add credits twice)
- Status tracking: pending → completed (or refunded)

**Credit Usage Transactions:**
- Track every credit deduction (plushie generations)
- Record: user, generation ID, credits spent, remaining balance, timestamp
- Maintain running balance after each transaction

**Transaction Types:**
- `purchase` - Credits added from payment
- `generation` - Credits deducted for plushie creation
- `refund` - Credits removed due to refund
- `adjustment` - Manual admin adjustments (future)

## Technical Requirements

### Environment
- **Development/Testing:** Polar Sandbox environment
- **Production:** Polar Production environment (future phase)
- Environment configurable via `POLAR_SERVER` environment variable

### Authentication
- All checkout flows require authenticated users
- Polar customers automatically created on user signup
- User sessions managed by existing BetterAuth implementation

### Polar Features to Implement
1. **Checkout Plugin** (Required)
   - Enable hosted checkout flow
   - Redirect to success page after payment
   - Product slug mapping for easy reference

2. **Portal Plugin** (Required)
   - Customer portal for viewing purchase history
   - Access to orders and subscriptions via Polar UI

3. **Webhooks Plugin** (Required)
   - Handle `order.created` events
   - Handle `order.paid` events
   - Signature verification for security

4. **Usage Plugin** (Not Required)
   - Defer to future implementation if usage-based billing is needed

### Webhook Processing Strategy
- **Async Processing:** Use Inngest for background job processing
- **Reliability:** Automatic retries (3 attempts) with exponential backoff
- **Idempotency:** Prevent duplicate credit additions using unique Polar order IDs
- **Observability:** Leverage Inngest Dev UI locally and Inngest Cloud in production

### Database Requirements
Two new tables required:

**`purchases` table:**
- Unique ID (UUID)
- User ID (references BetterAuth user)
- Polar order ID (unique constraint for idempotency)
- Polar checkout ID
- Product details (ID, name)
- Amount paid (in cents)
- Credits purchased
- Status (pending/completed/refunded)
- Timestamps (created, completed)

**`credit_transactions` table:**
- Unique ID (UUID)
- User ID (references BetterAuth user)
- Transaction type (purchase/generation/refund/adjustment)
- Amount (positive for additions, negative for deductions)
- Balance after transaction
- Related ID (reference to purchase or generation)
- Description
- Metadata (JSON for additional context)
- Timestamp

### Integration Points

**Existing Systems to Update:**
1. **Pricing Page** - Add functional checkout buttons
2. **Credit System** - Integrate transaction tracking into existing credit deduction logic
3. **Auth Configuration** - Add Polar plugin to BetterAuth
4. **Inngest Setup** - Add new background job for purchase processing

**New Components:**
1. Success page after checkout
2. Transaction history component (optional but recommended)
3. Server actions for fetching purchases and transactions

## Security Requirements

### Webhook Security
- Verify webhook signatures using `POLAR_WEBHOOK_SECRET`
- Reject webhooks with invalid signatures
- Return proper HTTP status codes (200/400/500) for Polar retry logic

### Payment Security
- All payment processing handled by Polar (PCI compliant)
- No credit card data stored in application
- Secure HTTPS required for production

### Data Integrity
- Use database transactions for atomic credit additions
- Prevent race conditions with unique constraints
- Validate product IDs against configuration before processing

## Non-Functional Requirements

### Performance
- Webhook processing: < 30 seconds end-to-end
- Success page load: < 2 seconds
- Transaction history query: < 1 second

### Reliability
- Idempotent webhook processing (safe to retry)
- Failed webhooks automatically retried by Polar
- Failed Inngest jobs automatically retried (3 attempts)

### Observability
- Log all purchase events with `[Inngest]` prefix
- Track webhook processing in Inngest dashboard
- Monitor credit balance changes

### Scalability
- Support concurrent purchases from multiple users
- Handle webhook bursts during high traffic
- Efficient database queries with proper indexes

## Constraints

### Must Use
- Polar for payment processing
- BetterAuth Polar plugin for integration
- Inngest for async webhook processing
- UUID for custom table IDs (not BetterAuth tables)
- PostgreSQL with Drizzle ORM

### Must Not Do
- Store credit card information
- Process payments synchronously in webhook route
- Allow unauthenticated checkouts
- Skip webhook signature verification

## Success Criteria

### Minimum Viable Product (MVP)
- [ ] User can purchase credits via Polar checkout
- [ ] Credits automatically added after successful payment
- [ ] Purchase history tracked in database
- [ ] Transaction log records all credit movements
- [ ] Idempotent webhook processing (no duplicate credits)
- [ ] Success page displays after purchase
- [ ] Integration works in Polar Sandbox environment

### Future Enhancements (Out of Scope)
- Refund processing UI
- Admin dashboard for transaction management
- Email receipts after purchase
- Usage-based billing features
- Subscription-based credit packages
- Gift cards or promotional codes

## Dependencies

### External Services
- Polar account with Sandbox access
- Products created in Polar dashboard
- Webhook endpoint configured in Polar
- Environment variables configured

### Internal Systems
- Existing BetterAuth implementation
- Existing Inngest setup
- Existing credit system
- Database migration capability

## Risk Assessment

### High Risk
- **Webhook failures:** Mitigated by Inngest retries and idempotency
- **Duplicate credit additions:** Mitigated by unique constraints on Polar order ID
- **Race conditions:** Mitigated by database transactions

### Medium Risk
- **Configuration errors:** Mitigated by environment variable validation
- **Product ID mismatches:** Mitigated by centralized configuration file
- **Webhook signature issues:** Mitigated by clear error logging

### Low Risk
- **UI/UX issues:** Can be iteratively improved post-launch
- **Performance issues:** Current scale unlikely to cause problems
