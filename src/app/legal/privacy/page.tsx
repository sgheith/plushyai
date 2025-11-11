import { TableOfContents } from "@/components/legal/table-of-contents";
import { LastUpdated } from "@/components/legal/last-updated";
import { BackToTop } from "@/components/legal/back-to-top";
import { Shield, Eye, Share2, Cookie, Lock, UserCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Your privacy is important to us. This policy explains how we collect,
          use, and protect your personal information.
        </p>
        <div className="mt-6 flex justify-center">
          <LastUpdated date="January 15, 2025" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        {/* Main Content */}
        <main className="prose prose-gray dark:prose-invert max-w-none">
          <section>
            <h2 id="information-collection" className="flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" />
              Information We Collect
            </h2>
            <p>
              At Plushify, we collect various types of information to provide
              and improve our services. This includes:
            </p>
            <h3 id="personal-information">Personal Information</h3>
            <ul>
              <li>
                <strong>Account Information:</strong> When you create an
                account, we collect your name, email address, and password.
              </li>
              <li>
                <strong>Payment Information:</strong> When purchasing credits,
                we collect payment information processed securely through our
                payment provider.
              </li>
              <li>
                <strong>Profile Information:</strong> Any additional information
                you choose to add to your profile.
              </li>
            </ul>

            <h3 id="usage-information">Usage Information</h3>
            <ul>
              <li>
                <strong>Images:</strong> Photos you upload for plushie
                generation are temporarily processed and stored.
              </li>
              <li>
                <strong>Generated Content:</strong> The plushie images we create
                for you are stored in your account.
              </li>
              <li>
                <strong>Analytics:</strong> We collect anonymous usage data to
                improve our service, including pages visited and features used.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type,
                device information, and operating system.
              </li>
            </ul>
          </section>

          <section>
            <h2 id="how-we-use-information" className="flex items-center gap-2">
              <UserCheck className="h-6 w-6 text-primary" />
              How We Use Your Information
            </h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>
                <strong>Service Delivery:</strong> To process your images and
                generate plushie transformations.
              </li>
              <li>
                <strong>Account Management:</strong> To create and maintain your
                account, manage your credits, and provide customer support.
              </li>
              <li>
                <strong>Communication:</strong> To send you service updates,
                security alerts, and respond to your inquiries.
              </li>
              <li>
                <strong>Improvement:</strong> To analyze usage patterns and
                improve our AI models and user experience.
              </li>
              <li>
                <strong>Security:</strong> To detect and prevent fraud, abuse,
                and security incidents.
              </li>
              <li>
                <strong>Legal Compliance:</strong> To comply with legal
                obligations and protect our rights.
              </li>
            </ul>
          </section>

          <section>
            <h2 id="information-sharing" className="flex items-center gap-2">
              <Share2 className="h-6 w-6 text-primary" />
              Information Sharing
            </h2>
            <p>
              We do not sell your personal information. We may share information
              in the following circumstances:
            </p>
            <ul>
              <li>
                <strong>Service Providers:</strong> We share data with trusted
                third-party service providers who help us operate our platform
                (hosting, payment processing, email services).
              </li>
              <li>
                <strong>AI Processing:</strong> Images are processed through our
                AI service providers under strict confidentiality agreements.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information
                if required by law or in response to valid legal requests.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or sale of assets, your information may be
                transferred to the new owner.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may share information for
                any other purpose with your explicit consent.
              </li>
            </ul>
          </section>

          <section>
            <h2 id="cookies-tracking" className="flex items-center gap-2">
              <Cookie className="h-6 w-6 text-primary" />
              Cookies and Tracking
            </h2>
            <p>
              We use cookies and similar tracking technologies to enhance your
              experience:
            </p>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> Required for the website to
                function properly (authentication, security).
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how users
                interact with our service.
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and
                preferences (theme, language).
              </li>
            </ul>
            <p>
              You can control cookies through your browser settings. For more
              details, see our{" "}
              <a href="/legal/cookies" className="text-primary hover:underline">
                Cookie Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 id="data-security" className="flex items-center gap-2">
              <Lock className="h-6 w-6 text-primary" />
              Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your
              information:
            </p>
            <ul>
              <li>
                <strong>Encryption:</strong> All data transmitted to and from
                our service is encrypted using SSL/TLS.
              </li>
              <li>
                <strong>Secure Storage:</strong> Your data is stored on secure
                servers with restricted access.
              </li>
              <li>
                <strong>Access Controls:</strong> We limit employee access to
                personal information on a need-to-know basis.
              </li>
              <li>
                <strong>Regular Audits:</strong> We conduct regular security
                assessments and updates.
              </li>
              <li>
                <strong>Image Deletion:</strong> Uploaded images used for
                generation are deleted from our servers within 30 days unless
                saved to your gallery.
              </li>
            </ul>
            <p>
              While we take reasonable measures to protect your information, no
              security system is impenetrable. We cannot guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 id="your-rights" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Your Rights and Choices
            </h2>
            <p>
              You have the following rights regarding your personal information:
            </p>
            <ul>
              <li>
                <strong>Access:</strong> Request a copy of the personal
                information we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> Update or correct inaccurate
                information in your account settings.
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your account and
                associated data (subject to legal retention requirements).
              </li>
              <li>
                <strong>Export:</strong> Download your generated plushies and
                account data.
              </li>
              <li>
                <strong>Opt-Out:</strong> Unsubscribe from marketing
                communications (service-related emails cannot be opted out).
              </li>
              <li>
                <strong>Object:</strong> Object to certain types of processing
                of your data.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:privacy@plushify.com"
                className="text-primary hover:underline"
              >
                privacy@plushify.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 id="data-retention">Data Retention</h2>
            <p>We retain your information for the following periods:</p>
            <ul>
              <li>
                <strong>Account Data:</strong> Retained while your account is
                active and for a reasonable period afterward.
              </li>
              <li>
                <strong>Uploaded Images:</strong> Original uploads are deleted
                within 30 days unless saved to your gallery.
              </li>
              <li>
                <strong>Generated Plushies:</strong> Stored in your account
                until you delete them or close your account.
              </li>
              <li>
                <strong>Transaction Records:</strong> Retained for 7 years for
                accounting and legal purposes.
              </li>
              <li>
                <strong>Analytics Data:</strong> Anonymized data may be retained
                indefinitely.
              </li>
            </ul>
          </section>

          <section>
            <h2 id="childrens-privacy">Children&apos;s Privacy</h2>
            <p>
              Plushify is not intended for children under 13 years of age. We do
              not knowingly collect personal information from children under 13.
              If we discover that we have collected information from a child
              under 13, we will delete it promptly.
            </p>
            <p>
              If you are a parent or guardian and believe your child has
              provided us with personal information, please contact us at{" "}
              <a
                href="mailto:privacy@plushify.com"
                className="text-primary hover:underline"
              >
                privacy@plushify.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 id="international-transfers">International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries
              other than your country of residence. These countries may have
              different data protection laws than your country.
            </p>
            <p>
              When we transfer your information internationally, we ensure
              appropriate safeguards are in place to protect your data in
              accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 id="policy-changes">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for legal reasons. We will notify you
              of any material changes by:
            </p>
            <ul>
              <li>Posting the updated policy on this page</li>
              <li>Updating the &quot;Last Updated&quot; date</li>
              <li>
                Sending you an email notification (for significant changes)
              </li>
            </ul>
            <p>
              Your continued use of Plushify after changes are posted
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 id="contact-us">Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us:
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
              <p className="mb-2">
                <strong>Response Time:</strong> We aim to respond to all privacy
                inquiries within 3 business days.
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
        <h3 className="text-lg font-semibold mb-4">Related Legal Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
