import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        {/* User Welcome Section Skeleton */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>

        {/* Credit Balance and Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <Skeleton className="h-32 w-full" />
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="p-4">
              <Skeleton className="h-20 w-full" />
            </Card>
            <Card className="p-4">
              <Skeleton className="h-20 w-full" />
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-8">
            <Skeleton className="h-32 w-full" />
          </Card>
          <Card className="p-8">
            <Skeleton className="h-32 w-full" />
          </Card>
        </div>

        {/* Recent Generations */}
        <div className="mb-8">
          <div className="mb-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <div className="p-3">
                  <Skeleton className="h-3 w-20" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
