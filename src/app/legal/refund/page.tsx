import { TableOfContents } from "@/components/legal/table-of-contents";
import { LastUpdated } from "@/components/legal/last-updated";
import { BackToTop } from "@/components/legal/back-to-top";
import {
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <DollarSign className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold">Refund Policy</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          We want you to be satisfied with Plushify. This policy outlines our
          refund process for credit purchases and the circumstances under which
          refunds are available.
        </p>
        <div className="mt-6 flex justify-center">
          <LastUpdated date="January 15, 2025" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        {/* Main Content */}
        <main className="prose prose-gray dark:prose-invert max-w-none">
          <section>
            <h2 id="overview">Overview</h2>
            <p>
              At Plushify, we strive to provide high-quality AI-powered plushie
              generation services. We understand that sometimes things don&apos;t
              work out as expected, and we&apos;re here to help.
            </p>
            <p>
              This Refund Policy explains when and how you can request a refund
              for purchased credits. Please read this policy carefully before
              making a purchase.
            </p>
          </section>

          <section>
            <h2 id="refund-eligibility" className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              Refund Eligibility
            </h2>
            <p>You may be eligible for a refund in the following situations:</p>

            <h3 id="technical-issues">Technical Issues</h3>
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
              <ul className="mb-0">
                <li>
                  <strong>Service Outage:</strong> If our service is
                  unavailable for an extended period after your purchase.
                </li>
                <li>
                  <strong>Failed Generations:</strong> If multiple generation
                  attempts fail due to system errors (credits are automatically
                  refunded).
                </li>
                <li>
                  <strong>Payment Error:</strong> If you were charged
                  incorrectly or multiple times for a single purchase.
                </li>
                <li>
                  <strong>Feature Malfunction:</strong> If core features are not
                  working as advertised.
                </li>
              </ul>
            </div>

            <h3 id="dissatisfaction">Dissatisfaction with Service</h3>
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
              <ul className="mb-0">
                <li>
                  <strong>First Purchase:</strong> If you&apos;re not satisfied
                  with your first credit purchase, request a refund within 7
                  days.
                </li>
                <li>
                  <strong>Unused Credits:</strong> If you have not used any of
                  the purchased credits, you may request a refund within 14 days
                  of purchase.
                </li>
              </ul>
            </div>

            <h3 id="accidental-purchase">Accidental Purchase</h3>
            <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-lg">
              <ul className="mb-0">
                <li>
                  <strong>Wrong Package:</strong> If you accidentally purchased
                  the wrong credit package and have not used any credits.
                </li>
                <li>
                  <strong>Duplicate Purchase:</strong> If you accidentally made
                  duplicate purchases (we&apos;ll refund the duplicate).
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 id="non-refundable" className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              Non-Refundable Situations
            </h2>
            <p>
              We cannot provide refunds in the following circumstances:
            </p>
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg">
              <ul className="mb-0">
                <li>
                  <strong>Used Credits:</strong> Credits that have been used for
                  successful generations (except for technical issues on our
                  end).
                </li>
                <li>
                  <strong>Quality Dissatisfaction:</strong> If you&apos;re
                  unhappy with the quality of specific generated images (AI
                  results vary).
                </li>
                <li>
                  <strong>User Error:</strong> If you uploaded the wrong image
                  or used incorrect settings.
                </li>
                <li>
                  <strong>Violated Terms:</strong> If your account was
                  terminated for violating our Terms of Service.
                </li>
                <li>
                  <strong>Promotional Credits:</strong> Free or promotional
                  credits cannot be refunded.
                </li>
                <li>
                  <strong>After 30 Days:</strong> Refund requests made more than
                  30 days after purchase (except for ongoing technical issues).
                </li>
                <li>
                  <strong>Partial Usage:</strong> If you&apos;ve used some
                  credits from a package, we cannot refund the entire purchase
                  (except in cases of severe service issues).
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 id="refund-process" className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              How to Request a Refund
            </h2>
            <p>
              To request a refund, please follow these steps:
            </p>

            <h3 id="step-1">Step 1: Contact Support</h3>
            <p>
              Send an email to our support team with the following information:
            </p>
            <div className="bg-muted/50 p-4 rounded-lg border">
              <ul className="mb-0">
                <li>Your account email address</li>
                <li>Order/transaction ID</li>
                <li>Date of purchase</li>
                <li>Credit package purchased</li>
                <li>Reason for refund request</li>
                <li>Any relevant screenshots or details</li>
              </ul>
            </div>

            <h3 id="step-2">Step 2: Review Process</h3>
            <p>Our team will review your request and:</p>
            <ul>
              <li>
                Verify your purchase and account details
              </li>
              <li>
                Check credit usage and account activity
              </li>
              <li>
                Investigate any technical issues reported
              </li>
              <li>
                Determine eligibility based on this policy
              </li>
            </ul>
            <p>
              <strong>Review Time:</strong> Most refund requests are reviewed
              within 2-3 business days.
            </p>

            <h3 id="step-3">Step 3: Decision</h3>
            <p>
              We will notify you of our decision via email. If approved:
            </p>
            <ul>
              <li>
                Your refund will be processed to the original payment method
              </li>
              <li>
                Processing typically takes 5-10 business days
              </li>
              <li>
                You&apos;ll receive a confirmation email when processed
              </li>
            </ul>
            <p>
              If denied, we&apos;ll explain the reason and suggest alternatives
              when possible.
            </p>
          </section>

          <section>
            <h2 id="refund-amount">Refund Amount</h2>
            <p>The refund amount depends on your situation:</p>

            <h3 id="full-refund">Full Refund</h3>
            <ul>
              <li>Unused credits within 14 days of purchase</li>
              <li>Technical issues preventing service use</li>
              <li>Payment errors or unauthorized charges</li>
              <li>Accidental duplicate purchases</li>
            </ul>

            <h3 id="partial-refund">Partial Refund</h3>
            <ul>
              <li>
                <strong>Pro-rated refunds</strong> based on unused credits (at
                our discretion)
              </li>
              <li>
                If some credits were used before discovering an issue
              </li>
              <li>
                For ongoing service problems affecting usage
              </li>
            </ul>
            <p className="text-sm text-muted-foreground italic">
              Note: Partial refunds are calculated based on the number of unused
              credits at the time of the refund request.
            </p>

            <h3 id="credit-instead">Credit Alternative</h3>
            <p>
              In some cases, we may offer additional credits instead of a
              monetary refund:
            </p>
            <ul>
              <li>For minor technical issues or inconveniences</li>
              <li>If you prefer to continue using the service</li>
              <li>As goodwill compensation for service problems</li>
            </ul>
          </section>

          <section>
            <h2 id="processing-time" className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              Refund Processing Time
            </h2>
            <p>
              Once a refund is approved, processing times vary by payment
              method:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-3 text-left">Payment Method</th>
                    <th className="border p-3 text-left">Processing Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3">Credit Card</td>
                    <td className="border p-3">5-10 business days</td>
                  </tr>
                  <tr>
                    <td className="border p-3">Debit Card</td>
                    <td className="border p-3">5-10 business days</td>
                  </tr>
                  <tr>
                    <td className="border p-3">PayPal</td>
                    <td className="border p-3">3-5 business days</td>
                  </tr>
                  <tr>
                    <td className="border p-3">Bank Transfer</td>
                    <td className="border p-3">7-14 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground italic mt-4">
              Processing times are estimates and may vary depending on your
              financial institution. If you don&apos;t see the refund after the
              estimated time, please check with your bank or contact us.
            </p>
          </section>

          <section>
            <h2 id="special-circumstances">Special Circumstances</h2>

            <h3 id="account-closure">Account Closure</h3>
            <p>
              If you decide to close your account:
            </p>
            <ul>
              <li>
                Unused credits purchased within the last 30 days may be eligible
                for refund
              </li>
              <li>
                Older credits are non-refundable upon account closure
              </li>
              <li>
                All generated images will be deleted when your account is closed
              </li>
            </ul>

            <h3 id="chargebacks">Chargebacks</h3>
            <p>
              If you initiate a chargeback with your bank or credit card
              company:
            </p>
            <ul>
              <li>
                Your account will be suspended during the chargeback
                investigation
              </li>
              <li>
                We encourage you to contact us first before filing a chargeback
              </li>
              <li>
                Fraudulent chargebacks may result in permanent account
                termination
              </li>
            </ul>

            <h3 id="service-termination">Service Termination</h3>
            <p>
              If Plushify discontinues service:
            </p>
            <ul>
              <li>
                All unused credits purchased within the last 90 days will be
                automatically refunded
              </li>
              <li>
                You&apos;ll be notified in advance with instructions for
                downloading your content
              </li>
            </ul>
          </section>

          <section>
            <h2 id="exceptions">Exceptions and Fair Use</h2>
            <p>
              We reserve the right to deny refunds if we detect:
            </p>
            <ul>
              <li>
                <strong>Abuse:</strong> Patterns of purchasing, using, and
                requesting refunds repeatedly
              </li>
              <li>
                <strong>Fraud:</strong> Fraudulent purchase or refund activity
              </li>
              <li>
                <strong>Violation:</strong> Use of the service in violation of
                our Terms of Service
              </li>
              <li>
                <strong>Excessive Requests:</strong> Multiple refund requests
                that appear to abuse the policy
              </li>
            </ul>
            <p>
              We monitor refund requests for patterns of abuse to protect the
              sustainability of our service and fairness to all users.
            </p>
          </section>

          <section>
            <h2 id="alternatives">Alternatives to Refunds</h2>
            <p>
              Before requesting a refund, consider these alternatives:
            </p>

            <h3 id="technical-support">Technical Support</h3>
            <p>
              If you&apos;re experiencing issues, our support team can often
              help:
            </p>
            <ul>
              <li>Troubleshoot generation problems</li>
              <li>Optimize image uploads for better results</li>
              <li>Explain features and best practices</li>
              <li>Resolve account or payment issues</li>
            </ul>

            <h3 id="credit-bonus">Credit Bonus</h3>
            <p>
              For minor issues, we may offer bonus credits as compensation
              instead of a refund, allowing you to continue using the service.
            </p>

            <h3 id="package-upgrade">Package Upgrade</h3>
            <p>
              If you accidentally purchased a smaller package, we may be able to
              upgrade you to a larger package by paying the difference instead
              of processing a refund.
            </p>
          </section>

          <section>
            <h2 id="contact-refunds" className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" />
              Contact Us for Refunds
            </h2>
            <p>
              To request a refund or if you have questions about this policy,
              please contact our support team:
            </p>
            <div className="bg-muted/50 p-6 rounded-lg border">
              <p className="mb-4">
                <strong>Refund Requests:</strong>
              </p>
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:refunds@plushify.com"
                  className="text-primary hover:underline"
                >
                  refunds@plushify.com
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
                <strong>Response Time:</strong> Within 24-48 hours for refund
                inquiries
              </p>
              <p className="mb-4 text-sm text-muted-foreground">
                Please include your transaction ID and account email in all
                refund requests.
              </p>
              <div className="not-prose">
                <Button asChild>
                  <a href="mailto:refunds@plushify.com">
                    <Mail className="h-4 w-4 mr-2" />
                    Request a Refund
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <section>
            <h2 id="policy-changes">Changes to This Policy</h2>
            <p>
              We may update this Refund Policy from time to time. Changes will
              not affect refunds for purchases made before the policy update.
              Continued use of the service after changes are posted constitutes
              acceptance of the new policy.
            </p>
            <p>
              We will notify you of significant changes by:
            </p>
            <ul>
              <li>Updating the &quot;Last Updated&quot; date</li>
              <li>Posting the updated policy on this page</li>
              <li>Sending email notifications for major changes</li>
            </ul>
          </section>

          <section>
            <h2 id="legal-rights">Your Legal Rights</h2>
            <p>
              This Refund Policy does not affect your statutory rights as a
              consumer under applicable law. In some jurisdictions, you may have
              additional rights that cannot be waived by this policy.
            </p>
            <p>
              If you are a consumer in the European Union, you have the right to
              withdraw from your purchase within 14 days under the EU Consumer
              Rights Directive, provided you have not used the digital content
              (credits).
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
            href="/legal/terms"
            className="p-4 border rounded-lg hover:border-primary transition-colors"
          >
            <h4 className="font-medium mb-2">Terms of Service</h4>
            <p className="text-sm text-muted-foreground">
              Our terms and conditions for using Plushify
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
        </div>
      </div>
    </div>
  );
}
