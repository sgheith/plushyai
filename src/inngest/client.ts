import { Inngest, EventSchemas } from "inngest";

// Type-safe event definitions for Plushify
export type Events = {
  "plushie/generate.requested": {
    data: {
      generationId: string;
      userId: string;
      imageData: string; // base64 encoded image
      imageType: string; // MIME type (e.g., "image/png")
    };
  };
  "polar/order.paid": {
    data: {
      orderId: string;
      checkoutId: string | null;
      userId: string;
      productId: string | null;
      amount: number;
      createdAt: string;
    };
  };
};

// Create singleton Inngest client instance
// Event key and signing key are auto-loaded from environment variables:
// - INNGEST_EVENT_KEY (optional for local dev, required for production)
// - INNGEST_SIGNING_KEY (optional for local dev, required for production)
export const inngest = new Inngest({
  id: "plushify",
  schemas: new EventSchemas().fromRecord<Events>(),
});
