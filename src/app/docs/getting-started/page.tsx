import Link from "next/link";
import { DocsNav } from "@/components/docs/docs-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  Sparkles,
  Download,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function GettingStartedPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="md:w-64 lg:w-72">
          <DocsNav />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-8">
            <Badge className="mb-4">Quick Start</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              Getting Started
            </h1>
            <p className="text-lg text-muted-foreground">
              Create your first adorable plushie in just a few minutes. This guide
              will walk you through everything you need to know.
            </p>
          </div>

          <Separator className="my-8" />

          {/* What You&apos;ll Need */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">What You&apos;ll Need</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">A Photo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Any photo of a person, pet, or object you want to transform.
                    Works best with clear, well-lit images.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Credits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Each generation uses 1 credit. Purchase credit packages on the
                    pricing page to get started.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 3-Step Process */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">
              Three Simple Steps
            </h2>

            {/* Step 1 */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Upload className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Step 1: Upload Your Photo</h3>
              </div>
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>
                        Navigate to the <Link href="/generate" className="font-medium text-primary hover:underline">Generate page</Link>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>
                        Drag and drop your image or click to browse your files
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>
                        Supported formats: JPG, PNG, WEBP (max 10MB)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>
                        Preview your image to make sure it looks good
                      </span>
                    </li>
                  </ol>
                  <div className="mt-4 rounded-lg bg-muted p-4">
                    <p className="text-sm font-medium">💡 Pro Tip</p>
                    <p className="text-sm text-muted-foreground">
                      For best results, use photos where the subject is clearly
                      visible and well-lit. See our <Link href="/docs/tips" className="text-primary hover:underline">Tips page</Link> for
                      more guidance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">
                  Step 2: AI Transforms It
                </h3>
              </div>
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>
                        Select your subject type (Person, Pet, or Other)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>
                        Click &quot;Generate Plushie&quot; button (costs 1 credit)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>
                        Wait 15-30 seconds while our AI works its magic
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>
                        Watch the progress indicator as your plushie is created
                      </span>
                    </li>
                  </ol>
                  <div className="mt-4 rounded-lg bg-muted p-4">
                    <p className="text-sm font-medium">⚠️ Important</p>
                    <p className="text-sm text-muted-foreground">
                      Generation typically takes 15-30 seconds. Don&apos;t refresh the
                      page or navigate away during this time.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 3 */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Download className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">
                  Step 3: Download Your Plushie
                </h3>
              </div>
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>
                        View your adorable plushie result
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>
                        Use the before/after slider to compare
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>
                        Click &quot;Download&quot; to save to your device
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>
                        Share on social media or generate another
                      </span>
                    </li>
                  </ol>
                  <div className="mt-4 rounded-lg bg-muted p-4">
                    <p className="text-sm font-medium">📁 Storage</p>
                    <p className="text-sm text-muted-foreground">
                      All your generations are automatically saved to your <Link href="/gallery" className="text-primary hover:underline">Gallery</Link> where
                      you can view and download them anytime.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Next Steps */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">Next Steps</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-2 transition-colors hover:border-primary">
                <CardHeader>
                  <CardTitle>Learn Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Discover tips and tricks for getting the best results from your
                    plushie generations.
                  </p>
                  <Link href="/docs/tips">
                    <Button variant="outline" className="w-full">
                      View Tips
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="border-2 transition-colors hover:border-primary">
                <CardHeader>
                  <CardTitle>Explore All Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Read the comprehensive guide to understand all of Plushify&apos;s
                    features and capabilities.
                  </p>
                  <Link href="/docs/how-to-use">
                    <Button variant="outline" className="w-full">
                      How to Use
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <div className="rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8 text-center">
            <h3 className="mb-3 text-2xl font-bold">Ready to Create?</h3>
            <p className="mb-6 text-muted-foreground">
              Start transforming your photos into adorable plushies today
            </p>
            <Link href="/generate">
              <Button size="lg" className="gap-2">
                Generate Your First Plushie
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Last Updated */}
          <div className="mt-8 text-sm text-muted-foreground">
            Last updated: January 2025
          </div>
        </main>
      </div>
    </div>
  );
}
