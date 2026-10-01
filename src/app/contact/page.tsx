import type { Metadata } from "next";
import Visual from "@/components/Visual";
import ContactForm from "./ContactForm";
import FaqSection from "./FaqSection";
import {
  PinIcon,
  PhoneIcon,
  MailIcon,
  GlobeIcon,
  InstagramIcon,
} from "@/components/ContactIcons";
import { site, addressLines } from "@/config/site";

const { contact } = site;

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h1 className="mb-8">
            Contact Us
          </h1>
          <p className="max-w-sm text-ink-soft">
            Great architecture is not about buildings, it&apos;s about
            purposeful spaces that elevate the way we live.
          </p>

          <dl className="mt-8 space-y-6">
            <div>
              <dt className="text-sm font-medium text-ink-faint mb-1">
                Studio
              </dt>
              <dd className="flex gap-2 text-ink-soft">
                <PinIcon />
                <span>
                  {addressLines[0]}
                  <br />
                  {addressLines[1]}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-ink-faint mb-1">Phone</dt>
              <dd className="flex items-center gap-2">
                <PhoneIcon />
                <a href={`tel:${contact.phone.e164}`} className="link-sweep tap hover:text-accent">
                  {contact.phone.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-ink-faint mb-1">Email</dt>
              <dd className="flex items-center gap-2">
                <MailIcon />
                <a href={`mailto:${contact.email}`} className="link-sweep tap hover:text-accent">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-ink-faint mb-1">
                Website
              </dt>
              <dd className="flex items-center gap-2">
                <GlobeIcon />
                <a
                  href="https://www.voussoir.in"
                  className="link-sweep tap hover:text-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.voussoir.in
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-ink-faint mb-1">
                Instagram
              </dt>
              <dd className="flex items-center gap-2">
                <InstagramIcon />
                <a
                  href={contact.instagram.url}
                  className="link-sweep tap hover:text-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  {contact.instagram.handle}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-ink-faint mb-1">
                Practice Profile
              </dt>
              <dd>
                <a
                  href="/voussoir-profile.pdf"
                  download
                  className="link-sweep tap hover:text-accent"
                >
                  Download brochure (PDF, 8.7 MB)
                </a>
              </dd>
            </div>
          </dl>

          <ContactForm />
        </div>

        <Visual
          src="/hero/contact.webp"
          alt="Voussoir — entrance study"
          label="Entrance study sketch"
          className="aspect-[4/5] w-full"
          sketch
        />
      </div>

      <FaqSection />
    </>
  );
}
