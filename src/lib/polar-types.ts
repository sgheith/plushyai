/**
 * Polar Webhook Type Definitions
 *
 * Type definitions for Polar webhook payloads.
 * Based on Polar webhook documentation.
 */

/**
 * Base webhook payload structure from Polar.
 */
export interface PolarWebhookPayload {
  type: string;
  data: unknown;
}

/**
 * Order.paid webhook payload.
 * Sent when an order is successfully paid.
 */
export interface PolarOrderPaidPayload {
  type: "order.paid";
  data: {
    id: string; // Polar order ID
    checkout_id: string | null;
    customer_id: string;
    user_id: string; // BetterAuth user ID
    product_id: string;
    product_price_id: string;
    amount: number; // Amount in cents
    currency: string;
    status: string;
    created_at: string;
    updated_at: string;
    metadata?: Record<string, unknown>;
  };
}

/**
 * Type guard to check if payload is an order.paid event.
 */
export function isOrderPaidPayload(
  payload: PolarWebhookPayload
): payload is PolarOrderPaidPayload {
  return payload.type === "order.paid";
}
