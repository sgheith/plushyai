import { TableOfContents } from "@/components/legal/table-of-contents";
import { LastUpdated } from "@/components/legal/last-updated";
import { BackToTop } from "@/components/legal/back-to-top";
import {
  FileText,
  UserCheck,
  Zap,
  CreditCard,
  Ban,
  ShieldAlert,
} from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FileText className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold">Terms of Service</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Please read these terms carefully before using Plushify. By accessing
          or using our service, you agree to be bound by these terms.
        </p>
        <div className="mt-6 flex justify-center">
          <LastUpdated date="January 15, 2025" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        {/* Main Content */}
        <main className="prose prose-gray dark:prose-invert max-w-none">
          <section>
            <h2 id="acceptance" className="flex items-center gap-2">
              <UserCheck className="h-6 w-6 text-primary" />
              Acceptance of Terms
            </h2>
            <p>
              By accessing or using Plushify (&quot;Service&quot;,
              &quot;Platform&quot;, &quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot;), you agree to be bound by these Terms of Service
              (&quot;Terms&quot;). If you disagree with any part of these terms,
              you may not access the Service.
            </p>
            <p>
              These Terms apply to all visitors, users, and others who access or
              use the Service. We reserve the right to update these Terms at any
              time. Your continued use of the Service after changes are posted
              constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 id="description" className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Service Description
            </h2>
            <p>
              Plushify is an AI-powered service that transforms photos into
              plushie-style images. Our service includes:
            </p>
            <ul>
              <li>
                <strong>Image Generation:</strong> Upload photos and receive
                AI-generated plushie transformations.
              </li>
              <li>
                <strong>Gallery Storage:</strong> Save and manage your generated
                plushies in your personal gallery.
              </li>
              <li>
                <strong>Credit System:</strong> Purchase and use credits to
                generate plushie images.
              </li>
              <li>
                <strong>Download Capability:</strong> Download your generated
                images for personal use.
              </li>
            </ul>
            <p>
              We reserve the right to modify, suspend, or discontinue any aspect
              of the Service at any time, with or without notice.
            </p>
          </section>

          <section>
            <h2 id="accounts" className="flex items-center gap-2">
              <UserCheck className="h-6 w-6 text-primary" />
              User Accounts
            </h2>
            <h3 id="account-creation">Account Creation</h3>
            <p>To use Plushify, you must create an account by providing:</p>
            <ul>
              <li>A valid email address</li>
              <li>A secure password</li>
              <li>Accurate account information</li>
            </ul>

            <h3 id="account-responsibilities">Your Responsibilities</h3>
            <p>You are responsible for:</p>
            <ul>
              <li>
                <strong>Security:</strong> Maintaining the confidentiality of
                your account credentials.
              </li>
              <li>
                <strong>Accuracy:</strong> Providing accurate and up-to-date
                information.
              </li>
              <li>
                <strong>Activity:</strong> All activities that occur under your
                account.
              </li>
              <li>
                <strong>Notification:</strong> Immediately notifying us of any
                unauthorized use of your account.
              </li>
            </ul>

            <h3 id="account-termination">Account Termination</h3>
            <p>
              We may suspend or terminate your account if you violate these
              Terms, engage in fraudulent activity, or for any other reason at
              our sole discretion. You may also close your account at any time
              through your account settings.
            </p>
          </section>

          <section>
            <h2 id="credits-system" className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              Credits and Payments
            </h2>
            <h3 id="credit-packages">Credit Packages</h3>
            <p>
              Plushify uses a credit-based system. Credits can be purchased in
              packages:
            </p>
            <ul>
              <li>
                <strong>1 Credit = 1 Generation:</strong> Each plushie
                generation costs 1 credit.
              </li>
              <li>
                <strong>Non-Refundable:</strong> Credits are generally
                non-refundable except as required by law or stated in our Refund
                Policy.
              </li>
              <li>
                <strong>No Expiration:</strong> Credits do not expire as long as
                your account remains active.
              </li>
              <li>
                <strong>Non-Transferable:</strong> Credits cannot be transferred
                to other users or exchanged for cash.
              </li>
            </ul>

            <h3 id="payment-processing">Payment Processing</h3>
            <ul>
              <li>
                All payments are processed securely through our third-party
                payment provider.
              </li>
              <li>
                You agree to provide accurate payment information and authorize
                us to charge your payment method.
              </li>
              <li>
                Prices are subject to change with notice. Changes will not
                affect credits already purchased.
              </li>
              <li>
                You are responsible for any taxes, fees, or charges imposed by
                your bank or payment provider.
              </li>
            </ul>

            <h3 id="failed-generations">Failed Generations</h3>
            <p>
              If a generation fails due to a system error on our end, the credit
              will be automatically refunded to your account. Credits will not
              be refunded for:
            </p>
            <ul>
              <li>User errors (wrong image, incorrect format)</li>
              <li>
                Images that violate our content policy (discovered after
                processing)
              </li>
              <li>Dissatisfaction with generation results</li>
            </ul>
          </section>

          <section>
            <h2 id="prohibited-uses" className="flex items-center gap-2">
              <Ban className="h-6 w-6 text-primary" />
              Prohibited Uses
            </h2>
            <p>You agree NOT to use Plushify for any of the following:</p>

            <h3 id="content-restrictions">Content Restrictions</h3>
            <ul>
              <li>
                <strong>Illegal Content:</strong> Upload images that are
                illegal, violate any laws, or infringe on others&apos; rights.
              </li>
              <li>
                <strong>Inappropriate Content:</strong> Upload explicit, violent,
                hateful, or otherwise offensive content.
              </li>
              <li>
                <strong>Minors:</strong> Upload images of minors without proper
                consent from parents/guardians.
              </li>
              <li>
                <strong>Privacy Violations:</strong> Upload images of
                individuals without their consent.
              </li>
              <li>
                <strong>Impersonation:</strong> Upload images intending to
                impersonate or misrepresent others.
              </li>
            </ul>

            <h3 id="system-abuse">System Abuse</h3>
            <ul>
              <li>
                <strong>Automation:</strong> Use bots, scripts, or automated
                tools to access the Service.
              </li>
              <li>
                <strong>Exploitation:</strong> Attempt to exploit bugs,
                vulnerabilities, or security features.
              </li>
              <li>
                <strong>Interference:</strong> Interfere with or disrupt the
                Service or servers.
              </li>
              <li>
                <strong>Reverse Engineering:</strong> Reverse engineer,
                decompile, or attempt to extract source code.
              </li>
              <li>
                <strong>Resale:</strong> Resell or commercialize the Service
                without authorization.
              </li>
            </ul>

            <h3 id="consequences">Consequences of Violation</h3>
            <p>
              Violation of these prohibited uses may result in immediate account
              suspension or termination, forfeiture of credits, and potential
              legal action.
            </p>
          </section>

          <section>
            <h2 id="intellectual-property">Intellectual Property</h2>

            <h3 id="your-content">Your Content</h3>
            <p>You retain all rights to images you upload. By uploading:</p>
            <ul>
              <li>
                You grant us a limited license to process your images for the
                purpose of providing the Service.
              </li>
              <li>
                You warrant that you have the necessary rights to upload and
                process the images.
              </li>
              <li>
                You are responsible for any copyright infringement or other
                violations.
              </li>
            </ul>

            <h3 id="generated-content">Generated Content</h3>
            <p>For AI-generated plushie images:</p>
            <ul>
              <li>
                <strong>Ownership:</strong> You own the generated images and may
                use them for personal or commercial purposes.
              </li>
              <li>
                <strong>Attribution:</strong> Attribution to Plushify is
                appreciated but not required.
              </li>
              <li>
                <strong>Quality:</strong> We make no guarantees about the
                quality or accuracy of generated images.
              </li>
            </ul>

            <h3 id="our-property">Our Property</h3>
            <p>
              The Service, including all software, designs, text, graphics,
              logos, and other content (excluding user-generated content), is
              owned by Plushify and protected by intellectual property laws. You
              may not copy, modify, distribute, or create derivative works
              without our express written permission.
            </p>
          </section>

          <section>
            <h2 id="limitation-liability" className="flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-primary" />
              Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Plushify and its
              affiliates, officers, employees, and agents shall not be liable
              for:
            </p>
            <ul>
              <li>
                <strong>Indirect Damages:</strong> Any indirect, incidental,
                special, consequential, or punitive damages.
              </li>
              <li>
                <strong>Service Interruption:</strong> Loss of use, data, or
                profits arising from service interruptions.
              </li>
              <li>
                <strong>Third Parties:</strong> Actions or omissions of third
                parties, including payment processors.
              </li>
              <li>
                <strong>Content:</strong> Quality, accuracy, or suitability of
                generated images.
              </li>
              <li>
                <strong>Security:</strong> Unauthorized access to your account
                or transmitted data.
              </li>
            </ul>
            <p>
              Our total liability to you for all claims arising from your use of
              the Service shall not exceed the amount you paid to Plushify in
              the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 id="warranties">Disclaimers and Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
              AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul>
              <li>
                <strong>Availability:</strong> We do not guarantee uninterrupted
                or error-free service.
              </li>
              <li>
                <strong>Accuracy:</strong> We do not guarantee the accuracy or
                quality of generated images.
              </li>
              <li>
                <strong>Results:</strong> We do not guarantee specific results
                from using the Service.
              </li>
              <li>
                <strong>Security:</strong> We do not guarantee absolute security
                of your data.
              </li>
            </ul>
            <p>
              Some jurisdictions do not allow the exclusion of certain
              warranties, so some of these limitations may not apply to you.
            </p>
          </section>

          <section>
            <h2 id="indemnification">Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Plushify and its
              affiliates, officers, employees, and agents from any claims,
              liabilities, damages, losses, and expenses (including legal fees)
              arising from:
            </p>
            <ul>
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Content you upload or generate</li>
              <li>Your violation of any applicable laws</li>
            </ul>
          </section>

          <section>
            <h2 id="dispute-resolution">Dispute Resolution</h2>
            <h3 id="governing-law">Governing Law</h3>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of [Jurisdiction], without regard to its conflict of law
              provisions.
            </p>

            <h3 id="arbitration">Arbitration</h3>
            <p>
              Any disputes arising from these Terms or your use of the Service
              shall be resolved through binding arbitration, except that either
              party may seek injunctive relief in court for intellectual
              property infringement.
            </p>

            <h3 id="class-action-waiver">Class Action Waiver</h3>
            <p>
              You agree that any arbitration or proceeding shall be limited to
              the dispute between you and Plushify individually. You waive any
              right to participate in a class action or representative action.
            </p>
          </section>

          <section>
            <h2 id="general-provisions">General Provisions</h2>
            <h3 id="entire-agreement">Entire Agreement</h3>
            <p>
              These Terms, together with our Privacy Policy and any other legal
              notices published by us, constitute the entire agreement between
              you and Plushify.
            </p>

            <h3 id="severability">Severability</h3>
            <p>
              If any provision of these Terms is found to be unenforceable, the
              remaining provisions will continue in full force and effect.
            </p>

            <h3 id="waiver">Waiver</h3>
            <p>
              Our failure to enforce any right or provision of these Terms will
              not be considered a waiver of those rights.
            </p>

            <h3 id="assignment">Assignment</h3>
            <p>
              We may assign our rights and obligations under these Terms without
              notice. You may not assign these Terms without our prior written
              consent.
            </p>

            <h3 id="force-majeure">Force Majeure</h3>
            <p>
              We shall not be liable for any failure to perform due to
              circumstances beyond our reasonable control, including natural
              disasters, war, terrorism, riots, or failure of third-party
              services.
            </p>
          </section>

          <section>
            <h2 id="contact-information">Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <div className="bg-muted/50 p-6 rounded-lg border">
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:legal@plushify.com"
                  className="text-primary hover:underline"
                >
                  legal@plushify.com
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
              <p className="mb-2">
                <strong>Response Time:</strong> We aim to respond to all legal
                inquiries within 5 business days.
              </p>
            </div>
          </section>

          <section>
            <h2 id="acknowledgment">Acknowledgment</h2>
            <p>
              By using Plushify, you acknowledge that you have read, understood,
              and agree to be bound by these Terms of Service. If you do not
              agree to these Terms, you must not use the Service.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Last updated: January 15, 2025
            </p>
          </section>

          {/* Back to top */}
          <BackToTop />
        </main>

        {/* Table of Contents */}
        <TableOfContents />
      </div>

      {/* Related Legal Pages */}
      <div className="mt-16 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">Related Legal Documents</h3>
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
            href="/legal/cookies"
            className="p-4 border rounded-lg hover:border-primary transition-colors"
          >
            <h4 className="font-medium mb-2">Cookie Policy</h4>
            <p className="text-sm text-muted-foreground">
              How we use cookies and tracking technologies
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
  );
}
