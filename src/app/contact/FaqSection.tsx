import { faqs } from "@/data/faq";

// Hidden entirely until at least 3 questions are answered — no placeholders,
// and no JSON-LD either.
export default function FaqSection() {
  const answered = faqs.flatMap((f) =>
    f.answer === null ? [] : [{ question: f.question, answer: f.answer }],
  );
  if (answered.length < 3) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answered.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className="mx-auto max-w-7xl px-5 sm:px-8 pb-24 grid gap-12 lg:grid-cols-12 lg:gap-16"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Questions first in the DOM, so on phones the illustration follows them. */}
      <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
        <h2 id="faq-heading" className="mb-10">
          Common questions
        </h2>
        <div className="border-t border-line">
          {answered.map((f) => (
            <details key={f.question} className="group border-b border-line">
              <summary className="faq-summary flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-4 font-sans text-[1.0625rem] font-medium text-ink outline-accent outline-offset-4 hover:text-accent focus-visible:text-accent focus-visible:outline-2">
                {f.question}
                <span aria-hidden="true" className="faq-marker" />
              </summary>
              <div className="max-w-[40rem] space-y-4 pb-6 text-ink-soft">
                {f.answer
                  .split("\n")
                  .map((p) => p.trim())
                  .filter(Boolean)
                  .map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* The column stretches to the section's height, so the sticky image
          stops at the section's end. */}
      <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
        {/* eslint-disable-next-line @next/next/no-img-element -- 5KB decorative SVG */}
        <img
          src="/illustrations/voussoir-faq.svg"
          alt=""
          width={400}
          height={540}
          className="mx-auto block h-auto w-full max-w-[240px] lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:mx-0 lg:max-w-[360px]"
        />
      </div>
    </section>
  );
}
