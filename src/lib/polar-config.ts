/**
 * Polar Product Configuration
 *
 * Centralized configuration for credit packages offered via Polar.
 * Product IDs correspond to products created in Polar Sandbox environment.
 */

export interface PolarProduct {
  id: string;
  slug: string;
  name: string;
  credits: number;
  price: number; // Price in dollars
}

/**
 * Available credit packages for purchase.
 * Product IDs are from Polar Sandbox environment.
 */
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

/**
 * Get product configuration by slug.
 * @param slug - Product slug (e.g., "basic", "pro", "premium")
 * @returns Product configuration or undefined if not found
 */
export function getProductBySlug(slug: string): PolarProduct | undefined {
  return POLAR_PRODUCTS.find((product) => product.slug === slug);
}

/**
 * Get product configuration by Polar product ID.
 * @param id - Polar product ID (UUID)
 * @returns Product configuration or undefined if not found
 */
export function getProductById(id: string): PolarProduct | undefined {
  return POLAR_PRODUCTS.find((product) => product.id === id);
}
