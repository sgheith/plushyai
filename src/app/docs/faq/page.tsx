import { DocsNav } from "@/components/docs/docs-nav";
import { DocsSearch } from "@/components/docs/docs-search";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
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
            <Badge className="mb-4">Help Center</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions about Plushify. Can&apos;t find what
              you&apos;re looking for? Contact our support team.
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <DocsSearch />
          </div>

          <Separator className="my-8" />

          {/* General Questions */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">General Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="what-is-plushify">
                <AccordionTrigger className="text-left">
                  What is Plushify?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Plushify is an AI-powered service that transforms your photos into
                  adorable plushie versions. Simply upload a photo of a person, pet,
                  or object, and our AI will create a cute, plushie-style version of
                  it in seconds. It&apos;s perfect for creating unique gifts, social media
                  content, or just having fun with your favorite photos.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="how-does-it-work">
                <AccordionTrigger className="text-left">
                  How does Plushify work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Plushify uses advanced AI image generation technology to analyze
                  your uploaded photo and create a plushie-style version. The AI
                  identifies key features like facial characteristics, colors, and
                  shapes, then reimagines them in a soft, cuddly plushie aesthetic.
                  The entire process takes just 15-30 seconds.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="who-can-use">
                <AccordionTrigger className="text-left">
                  Who can use Plushify?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Anyone! Plushify is designed for everyone – from parents wanting to
                  create cute versions of their kids, to pet owners making adorable
                  versions of their furry friends, to artists and creators looking
                  for unique content. No technical skills or design experience
                  required.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="what-can-i-upload">
                <AccordionTrigger className="text-left">
                  What types of images can I upload?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  You can upload photos of people, pets, or objects. We support JPG,
                  PNG, and WEBP formats up to 10MB. For best results, use
                  clear, well-lit photos where the subject is centered and easily
                  visible. Images with a single, clearly defined subject work best.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <Separator className="my-8" />

          {/* Credits & Pricing */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">Credits & Pricing</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="what-are-credits">
                <AccordionTrigger className="text-left">
                  What are credits and how do they work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Credits are the currency you use to generate plushies. Each
                  generation costs 1 credit. You purchase credits in packages (30,
                  100, or 200 credits), and they never expire. This means you can buy
                  them now and use them whenever you want, with no time pressure.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="credit-packages">
                <AccordionTrigger className="text-left">
                  What credit packages are available?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We offer three packages:
                  <ul className="mt-2 space-y-1">
                    <li>
                      <strong>Basic:</strong> $9 for 30 credits ($0.30 per
                      generation)
                    </li>
                    <li>
                      <strong>Pro:</strong> $19 for 100 credits ($0.19 per
                      generation)
                    </li>
                    <li>
                      <strong>Elite:</strong> $29 for 200 credits ($0.145 per
                      generation)
                    </li>
                  </ul>
                  <p className="mt-2">
                    Larger packages offer better value per generation.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="credits-expire">
                <AccordionTrigger className="text-left">
                  Do credits expire?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No! Your credits never expire. Buy them today and use them
                  whenever inspiration strikes, whether that&apos;s tomorrow or next year.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="failed-generation">
                <AccordionTrigger className="text-left">
                  What happens if my generation fails?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  If a generation fails due to a technical error, your credit is
                  automatically refunded to your account. You&apos;ll receive a
                  notification and can try again. We only charge for successful
                  generations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="refund-policy">
                <AccordionTrigger className="text-left">
                  What is your refund policy?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We offer refunds within 7 days of purchase if you haven&apos;t used any
                  credits from the package. Once you&apos;ve used credits, the package
                  becomes non-refundable. For more details, see our full refund
                  policy in the legal section.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <Separator className="my-8" />

          {/* Generation */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">
              Generation Process
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="how-long">
                <AccordionTrigger className="text-left">
                  How long does it take to generate a plushie?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Most generations complete in 15-30 seconds. During peak times, it
                  may take slightly longer, but you&apos;ll always see a progress
                  indicator so you know your generation is processing. Don&apos;t close
                  the tab or navigate away during this time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="bad-results">
                <AccordionTrigger className="text-left">
                  What if I don&apos;t like the results?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  While we can&apos;t refund credits for subjective preferences, we
                  recommend trying different photos or angles to get better results.
                  Check our Tips page for guidance on getting the best output. If you
                  believe there was a technical issue, contact support.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="multiple-subjects">
                <AccordionTrigger className="text-left">
                  Can I upload images with multiple people or pets?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Plushify works best with a single, clearly defined subject. Images
                  with multiple subjects may produce unpredictable results. For best
                  outcomes, crop your image to focus on one subject at a time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="image-quality">
                <AccordionTrigger className="text-left">
                  Why does image quality matter?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Higher quality input images give the AI more detail to work with,
                  resulting in better, more accurate plushie versions. Blurry, dark,
                  or heavily filtered photos may produce less satisfying results. We
                  recommend using clear, well-lit photos in high resolution.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <Separator className="my-8" />

          {/* Technical */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">
              Technical Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="file-size">
                <AccordionTrigger className="text-left">
                  What&apos;s the maximum file size I can upload?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The maximum file size is 10MB. If your image is larger, you can
                  compress it using free online tools or your device&apos;s photo editor
                  before uploading. Most smartphone photos are well under this limit.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="supported-formats">
                <AccordionTrigger className="text-left">
                  What image formats do you support?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We support JPG, PNG, and WEBP formats. These are the most common
                  image formats and work with photos from smartphones, digital
                  cameras, and most online sources.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="mobile-friendly">
                <AccordionTrigger className="text-left">
                  Can I use Plushify on my phone?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! Plushify is fully responsive and works great on smartphones
                  and tablets. You can upload photos directly from your phone&apos;s
                  camera or photo library, and download the results right to your
                  device.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="browser-support">
                <AccordionTrigger className="text-left">
                  Which browsers are supported?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Plushify works best on modern browsers including Chrome, Firefox,
                  Safari, and Edge. Make sure your browser is up to date for the best
                  experience. We also support mobile browsers on iOS and Android.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <Separator className="my-8" />

          {/* Account */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">Account & Privacy</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="need-account">
                <AccordionTrigger className="text-left">
                  Do I need an account to use Plushify?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, you need to create a free account to purchase credits and
                  generate plushies. This allows us to save your creations to your
                  gallery and track your credit balance. Sign up takes less than a
                  minute.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="data-privacy">
                <AccordionTrigger className="text-left">
                  What do you do with my uploaded images?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We take privacy seriously. Your uploaded images are used solely to
                  generate your plushies and are stored securely in your account. We
                  never share, sell, or use your images for any other purpose. You
                  can delete your images anytime. See our Privacy Policy for complete
                  details.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="delete-account">
                <AccordionTrigger className="text-left">
                  Can I delete my account?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, you can request account deletion by contacting support.
                  Account deletion will remove all your data, including your gallery
                  and unused credits. This action is permanent and cannot be undone.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="commercial-use">
                <AccordionTrigger className="text-left">
                  Can I use my plushies commercially?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! Once you generate a plushie, you own the rights to that image
                  and can use it however you like, including commercial purposes. You
                  can print them, sell them, use them in marketing, or share them on
                  social media.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Still Have Questions */}
          <div className="rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8 text-center">
            <h3 className="mb-3 text-2xl font-bold">Still Have Questions?</h3>
            <p className="mb-6 text-muted-foreground">
              Can&apos;t find what you&apos;re looking for? Check out our other resources or
              contact support
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Contact Support
              </a>
              <a
                href="/docs/troubleshooting"
                className="inline-flex items-center rounded-full border bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
              >
                Troubleshooting
              </a>
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
