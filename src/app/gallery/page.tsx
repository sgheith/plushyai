import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getGenerations } from "@/app/actions/get-generations";
import { GalleryClient } from "@/components/gallery/gallery-client";

interface GalleryPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  // 1. Check authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  // 2. Get page from search params
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);

  // 3. Fetch generations data
  const data = await getGenerations(page);

  // 4. Render client component with data
  return <GalleryClient {...data} />;
}
