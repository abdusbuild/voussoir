import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import type { Policy } from "@/data/policies";

export default function PolicyPage({
  policy,
  showToc = false,
}: {
  policy: Policy;
  showToc?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16">
      <SectionHeader title={policy.title} />

      <p className="mt-6 font-sans text-sm text-ink-soft">
        Last updated: {policy.lastUpdated}
      </p>

      <div className="mt-8 space-y-4 text-ink-soft">
        {policy.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {showToc && (
        <nav aria-label="Table of contents" className="mt-12">
          <p className="text-sm font-medium text-ink-faint mb-4">Contents</p>
          <ol className="sm:space-y-2 text-sm">
            {policy.sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="link-sweep tap text-base sm:text-sm text-ink-soft hover:text-accent transition-colors"
                >
                  {i + 1}. {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="mt-16 space-y-14">
        {policy.sections.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className="scroll-mt-header-tight"
          >
            <h3 className="mb-4">
              {i + 1}. {s.heading}
            </h3>
            <div className="space-y-4 text-ink-soft">
              {s.body.map((p, pi) => (
                <p key={pi}>{p}</p>
              ))}
              {s.list && (
                <ul className="list-disc pl-5 space-y-1.5">
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-20">
        <p className="text-ink-soft">
          Questions about this policy?{" "}
          <Link href="/contact" className="link-sweep tap text-accent">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
