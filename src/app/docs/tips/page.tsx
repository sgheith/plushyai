import { DocsNav } from "@/components/docs/docs-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Lightbulb,
  Camera,
  Sun,
  Crop,
  Palette,
  Users,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function TipsPage() {
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
            <Badge className="mb-4">Pro Tips</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              Tips & Best Practices
            </h1>
            <p className="text-lg text-muted-foreground">
              Master the art of creating perfect plushies with these expert tips and
              recommendations for getting the best results.
            </p>
          </div>

          <Separator className="my-8" />

          {/* Quick Tips Overview */}
          <section className="mb-12">
            <div className="rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Golden Rule for Great Results
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    The quality of your input directly affects your output. Clear,
                    well-lit photos with a single, centered subject produce the best
                    plushies. Spend a moment preparing your image for amazing
                    results!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Photo Quality */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">Photo Quality Tips</h2>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Use High Resolution Images
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Higher resolution gives the AI more detail to work with.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Aim for at least 1000x1000 pixels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Modern smartphone photos work great</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Avoid screenshots or heavily compressed images</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    Avoid Blurry or Low-Quality Photos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Blurry images lead to blurry plushies. The AI can&apos;t add detail
                    that isn&apos;t there.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <span>Out-of-focus or motion-blurred photos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <span>Heavily zoomed or cropped images</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <span>Low-resolution webcam screenshots</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Lighting */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Sun className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">Lighting Matters</h2>
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-lg text-green-600 dark:text-green-400">
                    Good Lighting Examples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>
                        Natural daylight (near a window)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>
                        Outdoor photos on overcast days
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>
                        Well-lit indoor spaces with multiple light sources
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>
                        Even lighting on the subject&apos;s face/body
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="text-lg text-red-600 dark:text-red-400">
                    Poor Lighting Examples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                      <span>
                        Harsh direct sunlight creating strong shadows
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                      <span>
                        Dark, underexposed photos
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                      <span>
                        Backlit subjects (light source behind them)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                      <span>
                        Photos with mixed color temperature lighting
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="rounded-lg border border-blue-500/50 bg-blue-500/10 p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-blue-500" />
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-400">
                    Pro Tip: The Window Trick
                  </p>
                  <p className="text-sm text-muted-foreground">
                    For indoor photos, position your subject facing a large window
                    (but not directly in sunlight). This creates soft, flattering
                    light perfect for plushie generation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Composition & Framing */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Crop className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">
                Composition & Framing
              </h2>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Center Your Subject</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Place your subject in the center of the frame for best results.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Subject takes up 50-80% of the frame</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Face or main features clearly visible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Minimal distracting background elements</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cropping Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Before uploading, crop your image to focus on your subject:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>
                        <strong>For people:</strong> Include full head and shoulders,
                        or full body
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>
                        <strong>For pets:</strong> Get the whole animal in frame if
                        possible
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>
                        <strong>For objects:</strong> Isolate the object with minimal
                        background
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>One Subject Per Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Plushify works best with a single, clearly defined subject.
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-lg bg-green-500/10 p-3">
                      <p className="mb-1 text-sm font-medium text-green-600 dark:text-green-400">
                        ✓ Works Great
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Single person headshot, solo pet portrait, one object on plain
                        background
                      </p>
                    </div>
                    <div className="rounded-lg bg-red-500/10 p-3">
                      <p className="mb-1 text-sm font-medium text-red-600 dark:text-red-400">
                        ✗ May Not Work Well
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Group photos, multiple pets, cluttered scenes with many
                        objects
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Colors & Style */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Palette className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">Colors & Style</h2>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Avoid Heavy Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm text-muted-foreground">
                    While Instagram filters look cool, they can confuse the AI.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Natural, unfiltered photos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Light color correction is fine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <span>Heavy vintage or artistic filters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <span>Black and white (color photos work better)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Color Vibrancy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Photos with good color saturation produce more vibrant plushies.
                    Natural lighting helps colors appear true and vivid.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Subject-Specific Tips */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold">Subject-Specific Tips</h2>
            </div>

            <div className="space-y-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-blue-600 dark:text-blue-400">
                    📸 For People
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Front-facing photos work best</li>
                    <li>Smiling expressions create friendly plushies</li>
                    <li>Avoid photos with hands covering face</li>
                    <li>Both headshots and full-body shots work great</li>
                    <li>Remove sunglasses and hats if possible</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="text-purple-600 dark:text-purple-400">
                    🐾 For Pets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Get down to your pet&apos;s eye level</li>
                    <li>Make sure both eyes are visible</li>
                    <li>Sitting or standing poses work better than lying down</li>
                    <li>Avoid action shots or blurry movement</li>
                    <li>Natural fur color shows best (avoid costumes)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-green-600 dark:text-green-400">
                    🎯 For Objects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Use a clean, simple background</li>
                    <li>Photograph from straight-on or slight angle</li>
                    <li>Make sure the object is in focus</li>
                    <li>Include the complete object in frame</li>
                    <li>Avoid shadows falling on the object</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Advanced Tips */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">Advanced Tips</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Experiment with Angles</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Try the same subject from different angles. A 3/4 view often
                    produces interesting results compared to straight-on shots.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Test Different Expressions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Different facial expressions lead to different plushie
                    personalities. Try both smiling and neutral expressions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Background Simplicity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    While not required, simpler backgrounds help the AI focus on your
                    subject and produce cleaner results.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Time of Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    For outdoor photos, the &quot;golden hour&quot; (early morning or late
                    afternoon) provides beautiful, soft lighting.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Quick Reference */}
          <div className="rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6">
            <h3 className="mb-4 text-xl font-semibold">
              Quick Reference: Perfect Photo Checklist
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium">Before Uploading:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ High resolution (1000x1000px+)</li>
                  <li>✓ Good lighting, no harsh shadows</li>
                  <li>✓ Subject centered and in focus</li>
                  <li>✓ Single subject only</li>
                </ul>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Avoid:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✗ Blurry or low-quality images</li>
                  <li>✗ Heavy filters or editing</li>
                  <li>✗ Dark or backlit photos</li>
                  <li>✗ Multiple subjects in frame</li>
                </ul>
              </div>
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
