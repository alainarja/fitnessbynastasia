import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Fitness by Nastasia collects, uses, and protects your personal information. A plain language overview of your data and your rights.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-4 text-4xl sm:text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-brown">Last updated: June 2026.</p>
        {/* TODO(nastasia): have a professional review these before launch. These are plain-language templates, not legal advice. */}

        <div className="mt-10 space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Introduction</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              This is the privacy policy for {site.brandName} ({site.domain}). We are a
              women&apos;s fitness coaching practice, and your trust matters to us. This page
              explains, in plain language, what information we collect, why we collect it, and the
              choices you have.
            </p>
            <p className="text-brown leading-relaxed">
              By using our website or sharing your details with us, you agree to the practices
              described here. If anything is unclear, please reach out and we will be glad to help.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">What we collect</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              We try to keep things minimal and only collect what we actually need. That can
              include:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-brown leading-relaxed">
              <li>Your name and email address when you opt in through one of our forms.</li>
              <li>Any message or details you send us through the contact form.</li>
              <li>
                Basic, aggregated analytics about how the site is used, such as pages visited and
                general location.
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">How we use it</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">We use your information to:</p>
            <ul className="list-disc pl-5 space-y-2 text-brown leading-relaxed">
              <li>Send you the free guide when you request it.</li>
              <li>Share coaching information, tips, and updates you have opted in to receive.</li>
              <li>Respond to your enquiries and questions.</li>
              <li>Understand what is helpful so we can improve the site.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Email marketing</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              We use a third party email tool to send the free guide and any coaching emails you
              sign up for. You are always in control. Every email includes an unsubscribe link, and
              you can opt out at any time. We will never add you to a list you did not ask to join.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Analytics</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              We may use privacy friendly analytics to see how the site performs in a general,
              aggregated way. This helps us learn which pages are useful. We are not interested in
              tracking you as an individual across the web.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Cookies</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              We keep cookies to a minimum. Most of what we use relates to basic analytics so we can
              understand site usage. You can control or clear cookies through your browser settings
              at any time.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Sharing your data</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              We do not sell your data, full stop. We do rely on a few trusted service providers to
              run the business, such as an email provider and our website hosting. These processors
              only handle your information to provide their service to us, and they are expected to
              keep it secure.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Your rights</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">You can ask us to:</p>
            <ul className="list-disc pl-5 space-y-2 text-brown leading-relaxed">
              <li>Access the personal information we hold about you.</li>
              <li>Correct anything that is wrong or out of date.</li>
              <li>Delete your information from our records.</li>
              <li>Unsubscribe from our emails whenever you wish.</li>
            </ul>
            <p className="text-brown leading-relaxed">
              To make any of these requests, just email us using the details below.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Data retention</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              We keep your information only for as long as we need it for the purposes described
              here, or for as long as you stay subscribed. When it is no longer needed, we remove it.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Children</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              Our services and content are intended for adults. We do not knowingly collect
              information from children. If you believe a child has shared information with us, please
              contact us so we can remove it.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Changes to this policy</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              We may update this policy from time to time as the business grows or as the law
              changes. When we do, we will update the date at the top of this page. Please check back
              now and then.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Contact</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              If you have any questions about this policy or your information, please email us at{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-red underline-offset-4 hover:underline"
              >
                {site.contact.email}
              </a>
              . We are happy to help.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
