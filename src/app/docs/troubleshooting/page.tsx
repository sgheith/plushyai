import Link from "next/link";
import { DocsNav } from "@/components/docs/docs-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertCircle, Upload, Image, CreditCard, Zap } from "lucide-react";

export default function TroubleshootingPage() {
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
            <Badge className="mb-4">Problem Solving</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              Troubleshooting
            </h1>
            <p className="text-lg text-muted-foreground">
              Solutions to common issues and technical problems. If you can&apos;t find a
              solution here, please contact our support team.
            </p>
          </div>

          <Separator className="my-8" />

          {/* Quick Help */}
          <section className="mb-12">
            <div className="rounded-lg border-2 border-yellow-500/50 bg-yellow-500/10 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 flex-shrink-0 text-yellow-500" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Before You Start Troubleshooting
                  </h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>
                      • Make sure you&apos;re using an up-to-date browser (Chrome,
                      Firefox, Safari, or Edge)
                    </li>
                    <li>• Check your internet connection is stable</li>
                    <li>• Try refreshing the page</li>
                    <li>• Clear your browser cache if issues persist</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Upload Issues */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">Upload Issues</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="upload-fails">
                <AccordionTrigger className="text-left">
                  My image won&apos;t upload
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>If your image upload is failing, try these solutions:</p>
                    <Card className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <p className="mb-2 font-medium text-foreground">
                          Check File Format
                        </p>
                        <p>
                          We only support JPG, PNG, and WEBP formats. If your file is
                          in a different format (like HEIC, BMP, or GIF), convert it
                          first using a free online converter or your device&apos;s photo
                          editor.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <p className="mb-2 font-medium text-foreground">
                          Check File Size
                        </p>
                        <p>
                          The maximum file size is 10MB. If your file is larger,
                          compress it or reduce its dimensions before uploading. Most
                          photo editing apps have a &quot;reduce file size&quot; or &quot;export for
                          web&quot; option.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <p className="mb-2 font-medium text-foreground">
                          Check Your Connection
                        </p>
                        <p>
                          Uploads require a stable internet connection. If you&apos;re on
                          mobile data or a weak WiFi signal, try moving closer to your
                          router or switching to a better network.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="upload-stuck">
                <AccordionTrigger className="text-left">
                  Upload is stuck at 0% or taking forever
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>If your upload appears to be stuck:</p>
                    <ul className="space-y-2">
                      <li>
                        <strong>1. Wait a moment:</strong> Large files can take 10-30
                        seconds to upload, especially on slower connections.
                      </li>
                      <li>
                        <strong>2. Check your internet speed:</strong> Run a speed
                        test to ensure you have at least 1 Mbps upload speed.
                      </li>
                      <li>
                        <strong>3. Refresh and try again:</strong> If it&apos;s been more
                        than a minute with no progress, refresh the page and retry.
                      </li>
                      <li>
                        <strong>4. Try a smaller file:</strong> Compress or resize
                        your image and try again.
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="file-rejected">
                <AccordionTrigger className="text-left">
                  I get a &quot;File rejected&quot; error
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">
                      This error appears when your file doesn&apos;t meet our requirements:
                    </p>
                    <ul className="space-y-2">
                      <li>
                        • <strong>Format:</strong> Must be JPG, PNG, or WEBP
                      </li>
                      <li>
                        • <strong>Size:</strong> Must be under 10MB
                      </li>
                      <li>
                        • <strong>Corruption:</strong> File must not be corrupted (try
                        opening it in another app first)
                      </li>
                    </ul>
                    <p className="mt-3">
                      If your file meets all these requirements and you still get this
                      error, try converting it to a different format or re-exporting
                      it from your photo editor.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <Separator className="my-8" />

          {/* Generation Problems */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-semibold">Generation Problems</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="generation-fails">
                <AccordionTrigger className="text-left">
                  My generation failed
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      If your plushie generation fails, don&apos;t worry – your credit is
                      automatically refunded. Here&apos;s what to try:
                    </p>
                    <Card className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <p className="mb-2 font-medium text-foreground">
                          Try a Different Image
                        </p>
                        <p>
                          Some images are more challenging for the AI. Try using a
                          clearer, better-lit photo with a more visible subject.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <p className="mb-2 font-medium text-foreground">
                          Check Image Quality
                        </p>
                        <p>
                          Review our <Link href="/docs/tips" className="text-primary hover:underline">Tips page</Link> to
                          ensure your photo meets quality standards. Blurry, dark, or
                          heavily filtered images may fail.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <p className="mb-2 font-medium text-foreground">
                          Wait and Retry
                        </p>
                        <p>
                          If the issue is on our end (server overload, etc.), wait a
                          few minutes and try again. Your credit was refunded, so you
                          can retry for free.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="generation-slow">
                <AccordionTrigger className="text-left">
                  Generation is taking too long
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">
                      Normal generation time is 15-30 seconds. If it&apos;s taking longer:
                    </p>
                    <ul className="space-y-2">
                      <li>
                        <strong>Up to 1 minute:</strong> This is normal during peak
                        times. The progress indicator will keep you updated.
                      </li>
                      <li>
                        <strong>Over 1 minute:</strong> Your generation may have
                        failed silently. Refresh the page and check your credits – if
                        they weren&apos;t deducted, try again.
                      </li>
                      <li>
                        <strong>Over 2 minutes:</strong> Something went wrong. Refresh
                        the page and retry. If it happens repeatedly, contact support.
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="poor-results">
                <AccordionTrigger className="text-left">
                  The result doesn&apos;t look good
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">
                      If you&apos;re unhappy with your plushie&apos;s appearance:
                    </p>
                    <p className="mb-3">
                      Remember that the AI interprets your photo artistically. Results
                      can vary based on input quality. Here&apos;s how to improve:
                    </p>
                    <ul className="space-y-2">
                      <li>
                        • Use a higher quality source image
                      </li>
                      <li>
                        • Ensure better lighting in your photo
                      </li>
                      <li>
                        • Try a different angle or expression
                      </li>
                      <li>
                        • Make sure the subject is clearly centered
                      </li>
                      <li>
                        • Review our <Link href="/docs/tips" className="text-primary hover:underline">Tips page</Link> for
                        detailed guidance
                      </li>
                    </ul>
                    <p className="mt-3">
                      Note: We cannot refund credits for subjective quality
                      preferences, only for technical failures.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="stuck-loading">
                <AccordionTrigger className="text-left">
                  Page is stuck on &quot;Generating...&quot;
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">If the generation screen is stuck:</p>
                    <ol className="space-y-2">
                      <li>
                        <strong>1. Don&apos;t close the tab yet:</strong> Wait at least 60
                        seconds – it may still be processing.
                      </li>
                      <li>
                        <strong>2. Check your internet:</strong> Make sure you haven&apos;t
                        lost connection.
                      </li>
                      <li>
                        <strong>3. After 2 minutes, refresh:</strong> If still stuck,
                        refresh the page.
                      </li>
                      <li>
                        <strong>4. Check your gallery:</strong> The generation may
                        have completed. Look in your gallery to see.
                      </li>
                      <li>
                        <strong>5. Check your credits:</strong> If credits were
                        deducted but you see no result, check your gallery. If nothing
                        is there, contact support for a refund.
                      </li>
                    </ol>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <Separator className="my-8" />

          {/* Account Issues */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">Account & Credits</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="credits-missing">
                <AccordionTrigger className="text-left">
                  My credits are missing or incorrect
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">
                      If your credit balance doesn&apos;t look right:
                    </p>
                    <ul className="space-y-2">
                      <li>
                        <strong>Refresh the page:</strong> Your balance updates in
                        real-time, but a refresh can help sync it.
                      </li>
                      <li>
                        <strong>Check your gallery:</strong> Count your generations to
                        verify usage matches the deductions.
                      </li>
                      <li>
                        <strong>Failed generations:</strong> These should refund
                        automatically within a few minutes.
                      </li>
                      <li>
                        <strong>Recent purchase:</strong> New credits can take up to 5
                        minutes to appear after purchase.
                      </li>
                    </ul>
                    <p className="mt-3">
                      If your credits still don&apos;t match up, contact support with your
                      account email and the expected vs. actual balance.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="payment-issues">
                <AccordionTrigger className="text-left">
                  Payment failed or I wasn&apos;t charged credits
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">
                      <strong>Payment Failed:</strong>
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li>• Verify your payment method details are correct</li>
                      <li>• Ensure you have sufficient funds</li>
                      <li>
                        • Check with your bank – some banks block online transactions
                      </li>
                      <li>• Try a different payment method</li>
                      <li>• Contact support if the issue persists</li>
                    </ul>
                    <p className="mb-3">
                      <strong>Charged but no credits received:</strong>
                    </p>
                    <p>
                      Wait 5-10 minutes for the transaction to process. If credits
                      still don&apos;t appear, contact support with your transaction ID or
                      receipt.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cant-sign-in">
                <AccordionTrigger className="text-left">
                  I can&apos;t sign in to my account
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">If you&apos;re having trouble signing in:</p>
                    <ul className="space-y-2">
                      <li>
                        <strong>Wrong password:</strong> Use the &quot;Forgot Password&quot;
                        link to reset it.
                      </li>
                      <li>
                        <strong>Email not recognized:</strong> Make sure you&apos;re using
                        the correct email address. Check for typos.
                      </li>
                      <li>
                        <strong>Google sign-in issues:</strong> Make sure you&apos;re using
                        the same Google account you signed up with.
                      </li>
                      <li>
                        <strong>Account locked:</strong> After too many failed
                        attempts, accounts are temporarily locked for security. Wait
                        15 minutes and try again.
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <Separator className="my-8" />

          {/* Technical Issues */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">Technical Issues</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="page-not-loading">
                <AccordionTrigger className="text-left">
                  Page won&apos;t load or keeps crashing
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">Try these steps in order:</p>
                    <ol className="space-y-2">
                      <li>
                        <strong>1. Refresh the page:</strong> Press F5 or Ctrl+R
                        (Cmd+R on Mac)
                      </li>
                      <li>
                        <strong>2. Clear browser cache:</strong> Go to browser
                        settings and clear cache and cookies
                      </li>
                      <li>
                        <strong>3. Try incognito/private mode:</strong> This helps
                        identify if extensions are causing issues
                      </li>
                      <li>
                        <strong>4. Update your browser:</strong> Make sure you&apos;re
                        using the latest version
                      </li>
                      <li>
                        <strong>5. Try a different browser:</strong> Test with Chrome,
                        Firefox, Safari, or Edge
                      </li>
                      <li>
                        <strong>6. Check for system updates:</strong> Update your
                        operating system
                      </li>
                      <li>
                        <strong>7. Disable browser extensions:</strong> Some
                        extensions can interfere with the site
                      </li>
                    </ol>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="slow-performance">
                <AccordionTrigger className="text-left">
                  Site is running slow
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">
                      If Plushify feels sluggish or unresponsive:
                    </p>
                    <ul className="space-y-2">
                      <li>
                        • <strong>Check your internet speed:</strong> Run a speed test
                        – you need at least 5 Mbps for optimal performance
                      </li>
                      <li>
                        • <strong>Close other tabs:</strong> Too many open tabs can
                        slow down your browser
                      </li>
                      <li>
                        • <strong>Restart your browser:</strong> This clears memory
                        and can improve performance
                      </li>
                      <li>
                        • <strong>Check system resources:</strong> Close other
                        applications that might be using CPU/RAM
                      </li>
                      <li>
                        • <strong>Try at a different time:</strong> During peak hours,
                        things may be slower
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="images-not-displaying">
                <AccordionTrigger className="text-left">
                  Images not displaying in gallery
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">
                      If your gallery images won&apos;t load:
                    </p>
                    <ul className="space-y-2">
                      <li>
                        • Refresh the page and wait a few seconds
                      </li>
                      <li>
                        • Check your internet connection
                      </li>
                      <li>
                        • Try accessing from a different device
                      </li>
                      <li>
                        • Clear browser cache
                      </li>
                      <li>
                        • Make sure your browser allows images (check settings)
                      </li>
                    </ul>
                    <p className="mt-3">
                      If images still won&apos;t display after trying these steps, contact
                      support.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="download-issues">
                <AccordionTrigger className="text-left">
                  Can&apos;t download my plushies
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">If downloads aren&apos;t working:</p>
                    <ul className="space-y-2">
                      <li>
                        • Check your browser&apos;s download settings and permissions
                      </li>
                      <li>
                        • Make sure you have enough storage space on your device
                      </li>
                      <li>
                        • Try right-clicking the image and &quot;Save image as...&quot;
                      </li>
                      <li>• Disable any download manager extensions temporarily</li>
                      <li>• Check your browser&apos;s download folder location</li>
                      <li>
                        • Try downloading in incognito/private mode
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Contact Support */}
          <div className="rounded-lg border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 p-8 text-center">
            <h3 className="mb-3 text-2xl font-bold">Still Need Help?</h3>
            <p className="mb-6 text-muted-foreground">
              If you can&apos;t find a solution to your problem, our support team is here
              to help. Please include as much detail as possible when contacting us.
            </p>
            <div className="mb-6 rounded-lg bg-background p-4 text-left">
              <p className="mb-2 text-sm font-medium">
                When contacting support, include:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Your account email address</li>
                <li>• A detailed description of the problem</li>
                <li>• What you were trying to do when the error occurred</li>
                <li>• Any error messages you received</li>
                <li>• Your browser and device type</li>
                <li>• Screenshots if applicable</li>
              </ul>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Contact Support Team
            </a>
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
