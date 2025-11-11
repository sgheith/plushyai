import Link from "next/link";
import { DocsNav } from "@/components/docs/docs-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  CreditCard,
  Image,
  Download,
  Settings,
  AlertCircle,
} from "lucide-react";

export default function HowToUsePage() {
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
            <Badge className="mb-4">Complete Guide</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              How to Use Plushify
            </h1>
            <p className="text-lg text-muted-foreground">
              A comprehensive guide to all features and capabilities of Plushify.
              Master the art of creating adorable AI-generated plushies.
            </p>
          </div>

          <Separator className="my-8" />

          {/* Table of Contents */}
          <section className="mb-12">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>On This Page</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2 text-sm">
                  <a
                    href="#account-dashboard"
                    className="block text-muted-foreground hover:text-primary"
                  >
                    Account & Dashboard
                  </a>
                  <a
                    href="#credits"
                    className="block text-muted-foreground hover:text-primary"
                  >
                    Understanding Credits
                  </a>
                  <a
                    href="#uploading"
                    className="block text-muted-foreground hover:text-primary"
                  >
                    Uploading Images
                  </a>
                  <a
                    href="#generation"
                    className="block text-muted-foreground hover:text-primary"
                  >
                    Generating Plushies
                  </a>
                  <a
                    href="#gallery"
                    className="block text-muted-foreground hover:text-primary"
                  >
                    Managing Your Gallery
                  </a>
                  <a
                    href="#best-practices"
                    className="block text-muted-foreground hover:text-primary"
                  >
                    Best Practices
                  </a>
                </nav>
              </CardContent>
            </Card>
          </section>

          {/* Account & Dashboard */}
          <section id="account-dashboard" className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">Account & Dashboard</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                Your dashboard is the central hub for all your Plushify activities.
                Here&apos;s what you can do:
              </p>
              <Card className="my-6">
                <CardContent className="pt-6">
                  <h4 className="mb-3 font-semibold">Dashboard Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      <strong>Credit Balance:</strong> See your remaining credits at
                      a glance
                    </li>
                    <li>
                      <strong>Recent Creations:</strong> Quick access to your latest
                      plushies
                    </li>
                    <li>
                      <strong>Quick Actions:</strong> Fast navigation to generate or
                      view gallery
                    </li>
                    <li>
                      <strong>Statistics:</strong> Track your total generations and
                      credit usage
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <p className="text-muted-foreground">
                Access your dashboard anytime by clicking &quot;Dashboard&quot; in the top
                navigation menu.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Understanding Credits */}
          <section id="credits" className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">Understanding Credits</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                Credits are the currency of Plushify. Here&apos;s everything you need to
                know:
              </p>
              <Card className="my-6 border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <h4 className="mb-3 font-semibold">Credit Basics</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className="text-foreground">1 Credit = 1 Generation</strong>
                      <p className="text-muted-foreground">
                        Each plushie you create uses exactly one credit
                      </p>
                    </div>
                    <div>
                      <strong className="text-foreground">Credits Never Expire</strong>
                      <p className="text-muted-foreground">
                        Use them whenever you want, no time pressure
                      </p>
                    </div>
                    <div>
                      <strong className="text-foreground">Failed Generations</strong>
                      <p className="text-muted-foreground">
                        If a generation fails, your credit is automatically refunded
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <h3 className="mb-3 text-xl font-semibold">Purchasing Credits</h3>
              <p className="text-muted-foreground">
                Visit the <Link href="/pricing" className="text-primary hover:underline">Pricing page</Link> to
                purchase credit packages. We offer three tiers:
              </p>
              <ul className="my-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong>Basic:</strong> $9 for 30 credits ($0.30 per generation)
                </li>
                <li>
                  <strong>Pro:</strong> $19 for 100 credits ($0.19 per generation) -
                  Most Popular
                </li>
                <li>
                  <strong>Elite:</strong> $29 for 200 credits ($0.145 per generation)
                  - Best Value
                </li>
              </ul>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Uploading Images */}
          <section id="uploading" className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">Uploading Images</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                Getting your image into Plushify is simple. Follow these guidelines
                for best results:
              </p>
              <Card className="my-6">
                <CardContent className="pt-6">
                  <h4 className="mb-3 font-semibold">File Requirements</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      <strong>Formats:</strong> JPG, PNG, WEBP
                    </li>
                    <li>
                      <strong>Max Size:</strong> 10MB
                    </li>
                    <li>
                      <strong>Recommended:</strong> 1000x1000px or larger
                    </li>
                    <li>
                      <strong>Aspect Ratio:</strong> Any (square works best)
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <h3 className="mb-3 text-xl font-semibold">Upload Methods</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Drag & Drop</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Drag your image file directly onto the upload zone. The area
                      will highlight when you&apos;re in the right spot.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Click to Browse</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Click anywhere in the upload zone to open your file browser and
                      select an image from your device.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-yellow-500" />
                  <div>
                    <p className="font-medium text-yellow-700 dark:text-yellow-400">
                      Image Quality Matters
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Higher quality input images produce better plushie results.
                      Avoid blurry, dark, or heavily filtered photos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Generating Plushies */}
          <section id="generation" className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Image className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-semibold">Generating Plushies</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                Once you&apos;ve uploaded an image, it&apos;s time to create your plushie:
              </p>
              <div className="my-6 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      1. Select Subject Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Choose what kind of subject is in your photo:
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        <strong>Person:</strong> For human portraits and selfies
                      </li>
                      <li>
                        <strong>Pet:</strong> For dogs, cats, and other animals
                      </li>
                      <li>
                        <strong>Other:</strong> For objects, characters, or anything
                        else
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      2. Review and Confirm
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Double-check your image preview and subject type selection.
                      Remember: this will use 1 credit.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">3. Generate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Click &quot;Generate Plushie&quot; and wait 15-30 seconds. Don&apos;t close the
                      tab or navigate away during generation.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <h3 className="mb-3 text-xl font-semibold">After Generation</h3>
              <p className="text-muted-foreground">
                Once complete, you&apos;ll see your adorable plushie alongside the original
                image. Use the interactive slider to compare before and after.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Gallery Management */}
          <section id="gallery" className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">Managing Your Gallery</h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                All your creations are automatically saved to your gallery. Here&apos;s
                what you can do:
              </p>
              <Card className="my-6">
                <CardContent className="pt-6">
                  <h4 className="mb-3 font-semibold">Gallery Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      <strong>View All:</strong> See all your plushies in a responsive
                      grid
                    </li>
                    <li>
                      <strong>Full Preview:</strong> Click any plushie to see it
                      full-size
                    </li>
                    <li>
                      <strong>Download:</strong> Save individual plushies to your
                      device
                    </li>
                    <li>
                      <strong>Compare:</strong> Use the before/after slider in full
                      view
                    </li>
                    <li>
                      <strong>Details:</strong> See generation date and subject type
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <h3 className="mb-3 text-xl font-semibold">Downloading</h3>
              <p className="text-muted-foreground">
                You can download your plushies in two ways:
              </p>
              <ul className="my-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  Click the download button on any card in the gallery grid
                </li>
                <li>
                  Open the full-size view and click the download button there
                </li>
              </ul>
              <p className="text-muted-foreground">
                Downloaded images are high-resolution and perfect for sharing on
                social media or printing.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Best Practices */}
          <section id="best-practices" className="mb-12">
            <h2 className="mb-6 text-3xl font-semibold">Best Practices</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-green-600 dark:text-green-400">
                    ✓ Do
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Use clear, well-lit photos</li>
                    <li>Keep the subject centered and visible</li>
                    <li>Upload high-resolution images</li>
                    <li>Try different angles and expressions</li>
                    <li>Check your credit balance first</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-red-600 dark:text-red-400">
                    ✗ Don&apos;t
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Use blurry or low-quality images</li>
                    <li>Upload photos with multiple subjects</li>
                    <li>Navigate away during generation</li>
                    <li>Use heavily edited or filtered photos</li>
                    <li>Expect instant results (15-30s is normal)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <div className="rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8 text-center">
            <h3 className="mb-3 text-2xl font-bold">Ready to Master Plushify?</h3>
            <p className="mb-6 text-muted-foreground">
              Explore our tips and troubleshooting guides for even more help
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/docs/tips"
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                View Tips
              </Link>
              <Link
                href="/docs/troubleshooting"
                className="inline-flex items-center rounded-full border bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
              >
                Troubleshooting
              </Link>
            </div>
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
