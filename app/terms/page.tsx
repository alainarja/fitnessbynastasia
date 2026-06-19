import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using the Fitness by Nastasia website, free guide, and coaching information. Written in plain language so you know where you stand.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <section className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-4 text-4xl sm:text-5xl">Terms of Service</h1>
        <p className="mt-3 text-sm text-brown">Last updated: June 2026.</p>
        {/* TODO(nastasia): have a professional review these before launch. These are plain-language templates, not legal advice. */}

        <div className="mt-10 space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Acceptance of terms</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              Welcome to {site.brandName} ({site.domain}). By using this website, downloading the
              free guide, or working with us, you agree to these terms. If you do not agree with
              them, please do not use the site or our services.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">About the service</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              We offer online and in person fitness coaching for women, along with a free guide and
              general fitness information. This website is primarily for marketing and information.
              It helps you learn about our approach and decide whether coaching is right for you.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Not medical advice</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              This is important. The content on this site, the free guide, and our coaching are for
              general fitness and education only. They are not medical advice, diagnosis, or
              treatment.
            </p>
            <p className="text-brown leading-relaxed">
              Always consult your doctor or a qualified health professional before starting any new
              exercise or nutrition program. This is especially important if you have any injuries,
              are pregnant or postpartum, or have any health conditions. If something hurts or feels
              wrong, stop and seek professional advice.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Coaching agreements</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              These terms cover your use of the website. The specific terms of any coaching, such as
              what is included, payment, and refunds, are set out in a separate client agreement that
              you receive when you sign up. Where that agreement and these terms differ, the client
              agreement applies to your coaching.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Intellectual property</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              The content on this site and the free guide belong to {site.brandName}. They are
              provided for your personal use. Please do not copy, resell, or redistribute them, or
              share your access with others, without our written permission.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">User responsibilities</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">When you use our services, you agree to:</p>
            <ul className="list-disc pl-5 space-y-2 text-brown leading-relaxed">
              <li>Provide accurate and honest information about yourself and your health.</li>
              <li>Train safely, listen to your body, and work within your own limits.</li>
              <li>Follow guidance responsibly and seek professional help when you need it.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">
            Disclaimer and limitation of liability
          </h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              Everyone is different, so results vary from person to person and are not guaranteed.
              The website, guide, and information are provided on an &quot;as is&quot; basis, without
              warranties of any kind.
            </p>
            <p className="text-brown leading-relaxed">
              To the fullest extent allowed by law, {site.brandName} is not liable for any injury,
              loss, or damage arising from your use of the site or from following general
              information. You take part in any exercise or nutrition program at your own risk.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Third party links</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              Our site may link to other websites and tools that we do not control. We share them
              for convenience and are not responsible for their content or practices. Please review
              their own terms and privacy policies.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Changes to terms</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              We may update these terms from time to time. When we do, we will change the date at the
              top of this page. By continuing to use the site after an update, you accept the revised
              terms.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Governing law</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              These terms are intended to be governed by the laws of Lebanon.
              {/* TODO(nastasia): confirm governing law and jurisdiction with a professional. */}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl mt-10 mb-3 text-espresso">Contact</h2>
          <div className="space-y-4">
            <p className="text-brown leading-relaxed">
              If you have any questions about these terms, please email us at{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-red underline-offset-4 hover:underline"
              >
                {site.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
