import type { ReactNode } from "react";
import Link from "next/link";
import { Lockup } from "./Logo";
import { navLinks, legalLinks } from "@/data/nav";
import { projects } from "@/data/projects";
import { PinIcon, PhoneIcon, MailIcon, InstagramIcon } from "./ContactIcons";
import ArrowIcon from "./ArrowIcon";
import FooterAccordion from "./FooterAccordion";

const recentProjects = projects.slice(0, 4);

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans text-[0.8125rem] font-medium text-ink-faint mb-5">
      {children}
    </p>
  );
}

const linkClass =
  "link-sweep tap font-sans text-base sm:text-[0.9375rem] text-ink-soft hover:text-accent transition-colors";

export default function Footer() {
  return (
    <footer className="mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-8">
        <div className="grid gap-12 max-sm:gap-0 pb-14 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4 max-sm:mb-10">
            <Lockup className="h-auto w-56" />
            <p className="mt-6 max-w-xs text-ink-soft">
              A design practice creating considered spaces through form,
              material and detail.
            </p>
          </div>

          {/* Quick links */}
          <FooterAccordion as="nav" aria-label="Footer" heading="Quick Links" className="lg:col-span-2">
            <ul className="sm:space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>

          {/* Recent work */}
          <FooterAccordion heading="Recent Work" className="lg:col-span-3 max-sm:border-b">
            <ul className="sm:space-y-2.5">
              {recentProjects.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className={linkClass}>
                    {project.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/projects"
                  className="group link-sweep tap font-sans text-base sm:text-[0.9375rem] font-medium text-accent hover:text-accent-deep transition-colors"
                >
                  View all projects
                  <ArrowIcon />
                </Link>
              </li>
            </ul>
          </FooterAccordion>

          {/* Contact */}
          <div className="lg:col-span-3 max-sm:mt-10 font-sans text-ink-soft text-[0.9375rem]">
            <ColumnHeading>Get in Touch</ColumnHeading>
            <address className="not-italic space-y-3 max-sm:space-y-0">
              <div className="flex gap-2">
                <PinIcon />
                <p>
                  505–507, Tower C, Urbtech Trade Centre,
                  <br />
                  Sector 132, Noida, Uttar Pradesh, 201304
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon />
                <a href="tel:+919319688233" className="link-sweep tap text-base sm:text-[0.9375rem] hover:text-accent">
                  +91 93196 88233
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon />
                <a href="mailto:info@voussoir.in" className="link-sweep tap text-base sm:text-[0.9375rem] hover:text-accent">
                  info@voussoir.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <InstagramIcon />
                <a
                  href="https://www.instagram.com/voussoir.design"
                  className="link-sweep tap text-base sm:text-[0.9375rem] hover:text-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  @voussoir.design
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="rule mb-6" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans text-sm text-ink-faint">
          <p>© {new Date().getFullYear()} Voussoir. All Rights Reserved.</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-sweep tap text-base sm:text-sm hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
