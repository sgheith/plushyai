import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditDisplay } from "@/components/credits/credit-display";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  User,
  Lock,
  Mail,
  Trash2,
  FileText,
  Sparkles,
  LayoutGrid,
  DollarSign,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { getUserFromDatabase } from "@/lib/auth-types";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  // Fetch the full user data from the database to get current credits
  const dbUser = await getUserFromDatabase(session.user.id);
  if (!dbUser) redirect("/sign-in");

  const user = { ...session.user, ...dbUser };

  // Temporary placeholders for fields not yet in schema
  const totalGenerations = 0; // Will be calculated from generations table later
  const totalCreditsPurchased = 0; // Will be tracked in future
  const totalCreditsUsed = 0; // Will be tracked in future
  const memberSince = user.createdAt ? new Date(user.createdAt).toISOString() : new Date().toISOString();

  // Format member since date
  const memberSinceFormatted = new Date(memberSince).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Your Profile</h1>
        <p className="text-muted-foreground">
          Manage your account, view your stats, and track your plushie journey
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Credits Section - Top Priority */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Credit Balance</h2>
            <CreditDisplay
              creditCount={user.credits}
              showPurchaseButton={true}
            />
          </div>

          {/* Generation Statistics Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Statistics</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard
                label="Total Plushies"
                value={totalGenerations}
                icon="Image"
                trend="up"
              />
              <StatCard
                label="Credits Purchased"
                value={totalCreditsPurchased}
                icon="Coins"
              />
              <StatCard
                label="Credits Used"
                value={totalCreditsUsed}
                icon="TrendingUp"
              />
            </div>
          </div>

          {/* Account Actions Section */}
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  disabled
                >
                  <User className="h-5 w-5 mr-3 shrink-0" />
                  <div className="text-left">
                    <div className="font-medium flex items-center gap-2">
                      Edit Profile
                      <Badge variant="secondary" className="text-xs">
                        Coming Soon
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Update your information
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  disabled
                >
                  <Lock className="h-5 w-5 mr-3 shrink-0" />
                  <div className="text-left">
                    <div className="font-medium flex items-center gap-2">
                      Change Password
                      <Badge variant="secondary" className="text-xs">
                        Coming Soon
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Update your password
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  disabled
                >
                  <Mail className="h-5 w-5 mr-3 shrink-0" />
                  <div className="text-left">
                    <div className="font-medium flex items-center gap-2">
                      Email Preferences
                      <Badge variant="secondary" className="text-xs">
                        Coming Soon
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Configure notifications
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto p-4 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                  disabled
                >
                  <Trash2 className="h-5 w-5 mr-3 shrink-0" />
                  <div className="text-left">
                    <div className="font-medium flex items-center gap-2">
                      Delete Account
                      <Badge variant="secondary" className="text-xs">
                        Coming Soon
                      </Badge>
                    </div>
                    <div className="text-xs opacity-75">
                      Permanently delete account
                    </div>
                  </div>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Additional account management features will be available soon.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Account Information Section */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage
                    src={user.image ?? undefined}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback className="text-2xl">
                    {user.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <Separator />

              {/* Member Details */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-medium">{memberSinceFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account ID</span>
                  <span className="font-mono font-medium text-xs">
                    {user.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Account Status</span>
                  <Badge variant="default" className="bg-green-600">
                    Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links Section */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Navigate to key sections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href="/gallery">
                    <LayoutGrid className="mr-3 h-4 w-4" />
                    View Gallery
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href="/generate">
                    <Sparkles className="mr-3 h-4 w-4" />
                    Generate Plushie
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href="/pricing">
                    <DollarSign className="mr-3 h-4 w-4" />
                    View Pricing
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href="/docs">
                    <FileText className="mr-3 h-4 w-4" />
                    Documentation
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
