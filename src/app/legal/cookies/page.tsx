"use client";

import { TableOfContents } from "@/components/legal/table-of-contents";
import { LastUpdated } from "@/components/legal/last-updated";
import { BackToTop } from "@/components/legal/back-to-top";
import { Cookie, Info, Settings, FileText } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CookiePolicyPage() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cookie className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold">Cookie Policy</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            This policy explains how Plushify uses cookies and similar tracking
            technologies to enhance your experience and improve our service.
          </p>
          <div className="mt-6 flex justify-center">
            <LastUpdated date="January 15, 2025" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
          {/* Main Content */}
          <main className="prose prose-gray dark:prose-invert max-w-none">
            <section>
              <h2 id="what-are-cookies" className="flex items-center gap-2">
                <Info className="h-6 w-6 text-primary" />
                What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that are placed on your device
                (computer, smartphone, or tablet) when you visit a website.
                Cookies help websites remember your preferences, improve your
                experience, and provide analytics about how the site is used.
              </p>
              <p>
                Similar technologies include web beacons, pixels, and local
                storage, which serve similar purposes. In this policy, we refer
                to all of these technologies collectively as &quot;cookies.&quot;
              </p>
            </section>

            <section>
              <h2 id="how-we-use-cookies" className="flex items-center gap-2">
                <Cookie className="h-6 w-6 text-primary" />
                How We Use Cookies
              </h2>
              <p>
                We use cookies to improve your experience on Plushify and to
                help us understand how our service is being used. Specifically,
                we use cookies to:
              </p>
              <ul>
                <li>
                  <strong>Keep You Signed In:</strong> Remember your
                  authentication status so you don&apos;t have to sign in every
                  time.
                </li>
                <li>
                  <strong>Remember Preferences:</strong> Store your settings
                  like theme (dark/light mode) and language.
                </li>
                <li>
                  <strong>Improve Performance:</strong> Optimize loading times
                  and functionality.
                </li>
                <li>
                  <strong>Analyze Usage:</strong> Understand how visitors use
                  our service to make improvements.
                </li>
                <li>
                  <strong>Provide Security:</strong> Detect and prevent
                  fraudulent activity and security issues.
                </li>
              </ul>
            </section>

            <section>
              <h2 id="types-of-cookies" className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary" />
                Types of Cookies We Use
              </h2>

              <h3 id="essential-cookies">Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly
                and cannot be disabled. They include:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg border">
                <ul className="mb-0">
                  <li>
                    <strong>Authentication:</strong> Keep you logged in to your
                    account
                  </li>
                  <li>
                    <strong>Security:</strong> Protect against cross-site
                    request forgery (CSRF) attacks
                  </li>
                  <li>
                    <strong>Session Management:</strong> Maintain your session
                    state across pages
                  </li>
                  <li>
                    <strong>Load Balancing:</strong> Route your requests to the
                    correct server
                  </li>
                </ul>
              </div>

              <h3 id="functional-cookies">Functional Cookies</h3>
              <p>
                These cookies enable enhanced functionality and personalization:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg border">
                <ul className="mb-0">
                  <li>
                    <strong>Theme Preference:</strong> Remember if you prefer
                    dark or light mode
                  </li>
                  <li>
                    <strong>Language:</strong> Store your language preference
                  </li>
                  <li>
                    <strong>UI Settings:</strong> Remember your customized
                    interface settings
                  </li>
                  <li>
                    <strong>Cookie Consent:</strong> Remember your cookie
                    consent choices
                  </li>
                </ul>
              </div>

              <h3 id="analytics-cookies">Analytics Cookies</h3>
              <p>
                These cookies help us understand how visitors interact with our
                website:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg border">
                <ul className="mb-0">
                  <li>
                    <strong>Page Views:</strong> Track which pages are visited
                    and how often
                  </li>
                  <li>
                    <strong>User Flow:</strong> Understand how users navigate
                    through the site
                  </li>
                  <li>
                    <strong>Feature Usage:</strong> See which features are most
                    popular
                  </li>
                  <li>
                    <strong>Performance:</strong> Monitor page load times and
                    errors
                  </li>
                </ul>
              </div>
              <p>
                We use anonymized analytics data and do not use this information
                to identify individual users.
              </p>

              <h3 id="advertising-cookies">Advertising Cookies</h3>
              <p>
                <strong>We currently do not use advertising cookies.</strong> If
                this changes in the future, we will update this policy and
                obtain your consent where required.
              </p>
            </section>

            <section>
              <h2 id="third-party-cookies">Third-Party Cookies</h2>
              <p>
                Some cookies are placed by third-party services that appear on
                our pages. We do not control these cookies. The third parties we
                work with include:
              </p>
              <ul>
                <li>
                  <strong>Authentication Providers:</strong> Google OAuth for
                  sign-in functionality
                </li>
                <li>
                  <strong>Payment Processors:</strong> To securely process
                  credit purchases
                </li>
                <li>
                  <strong>Analytics Services:</strong> To understand service
                  usage (anonymized data only)
                </li>
                <li>
                  <strong>CDN Providers:</strong> To deliver content quickly and
                  reliably
                </li>
              </ul>
              <p>
                These third parties have their own privacy policies. We
                encourage you to review their policies to understand how they
                use cookies.
              </p>
            </section>

            <section>
              <h2 id="cookie-duration">Cookie Duration</h2>
              <p>Cookies may be temporary or persistent:</p>

              <h3 id="session-cookies">Session Cookies</h3>
              <p>
                These cookies are temporary and are deleted when you close your
                browser. They are used for essential functions like keeping you
                logged in during your visit.
              </p>

              <h3 id="persistent-cookies">Persistent Cookies</h3>
              <p>
                These cookies remain on your device for a set period or until
                you delete them. They remember your preferences across multiple
                visits. Our persistent cookies typically last:
              </p>
              <ul>
                <li>
                  <strong>Authentication:</strong> Up to 30 days
                </li>
                <li>
                  <strong>Preferences:</strong> Up to 1 year
                </li>
                <li>
                  <strong>Analytics:</strong> Up to 2 years (anonymized)
                </li>
              </ul>
            </section>

            <section>
              <h2 id="managing-cookies" className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary" />
                Managing Your Cookie Preferences
              </h2>

              <h3 id="browser-settings">Browser Settings</h3>
              <p>
                Most web browsers allow you to control cookies through their
                settings. You can:
              </p>
              <ul>
                <li>View which cookies are stored</li>
                <li>Delete cookies individually or all at once</li>
                <li>Block cookies from specific sites</li>
                <li>Block all third-party cookies</li>
                <li>Block all cookies entirely</li>
              </ul>
              <p>
                Learn how to manage cookies in popular browsers:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Chrome</h4>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Chrome Cookie Settings →
                  </a>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Firefox</h4>
                  <a
                    href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Firefox Cookie Settings →
                  </a>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Safari</h4>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Safari Cookie Settings →
                  </a>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Edge</h4>
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Edge Cookie Settings →
                  </a>
                </div>
              </div>

              <h3 id="cookie-consent-preferences">Cookie Consent Preferences</h3>
              <p>
                You can manage your cookie preferences for Plushify by clicking
                the button below:
              </p>
              <div className="not-prose my-6">
                <Button
                  onClick={() => setShowBanner(true)}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Manage Cookie Preferences
                </Button>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg">
                <p className="mb-0 text-sm">
                  <strong>⚠️ Important:</strong> If you block essential cookies,
                  some features of Plushify may not work properly. You may not
                  be able to sign in, save preferences, or use certain
                  functionality.
                </p>
              </div>
            </section>

            <section>
              <h2 id="do-not-track">Do Not Track Signals</h2>
              <p>
                Some browsers include a &quot;Do Not Track&quot; (DNT) feature
                that signals to websites that you do not want your online
                activities tracked. There is currently no industry standard for
                how to respond to DNT signals.
              </p>
              <p>
                At this time, Plushify does not respond to DNT signals, but you
                can control cookies through your browser settings and our cookie
                consent tool.
              </p>
            </section>

            <section>
              <h2 id="changes-to-policy">Changes to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect
                changes in our practices or for legal reasons. When we make
                changes, we will:
              </p>
              <ul>
                <li>Update the &quot;Last Updated&quot; date at the top</li>
                <li>Post the updated policy on this page</li>
                <li>
                  Notify you through our service or email for significant
                  changes
                </li>
              </ul>
              <p>
                We encourage you to review this Cookie Policy periodically to
                stay informed about how we use cookies.
              </p>
            </section>

            <section>
              <h2 id="more-information" className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                More Information
              </h2>
              <p>
                For more information about how we handle your data, please see
                our{" "}
                <a
                  href="/legal/privacy"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
              <p>
                If you have questions about cookies or how we use them, please
                contact us:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg border">
                <p className="mb-2">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:privacy@plushify.com"
                    className="text-primary hover:underline"
                  >
                    privacy@plushify.com
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Support:</strong>{" "}
                  <a
                    href="mailto:support@plushify.com"
                    className="text-primary hover:underline"
                  >
                    support@plushify.com
                  </a>
                </p>
              </div>
            </section>

            {/* Back to top */}
            <BackToTop />
          </main>

          {/* Table of Contents */}
          <TableOfContents />
        </div>

        {/* Related Legal Pages */}
        <div className="mt-16 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">
            Related Legal Documents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/legal/privacy"
              className="p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h4 className="font-medium mb-2">Privacy Policy</h4>
              <p className="text-sm text-muted-foreground">
                How we collect, use, and protect your information
              </p>
            </a>
            <a
              href="/legal/terms"
              className="p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h4 className="font-medium mb-2">Terms of Service</h4>
              <p className="text-sm text-muted-foreground">
                Our terms and conditions for using Plushify
              </p>
            </a>
            <a
              href="/legal/refund"
              className="p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <h4 className="font-medium mb-2">Refund Policy</h4>
              <p className="text-sm text-muted-foreground">
                Our policy for credit refunds and cancellations
              </p>
            </a>
          </div>
        </div>
      </div>

      {/* Cookie Consent Banner (UI Only) */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg p-4 z-50 animate-in slide-in-from-bottom">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    We use cookies to enhance your experience
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We use essential cookies to make our site work. With your
                    consent, we may also use non-essential cookies to improve
                    user experience and analyze website traffic. By clicking
                    &quot;Accept All&quot;, you agree to our use of cookies.{" "}
                    <a
                      href="/legal/cookies"
                      className="text-primary hover:underline"
                    >
                      Learn more
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  onClick={() => setShowBanner(false)}
                  size="sm"
                >
                  Essential Only
                </Button>
                <Button onClick={() => setShowBanner(false)} size="sm">
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
