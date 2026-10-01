import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import ArchFrame from "@/components/ArchFrame";
import { team } from "@/data/team";
import { values } from "@/data/values";

export const metadata: Metadata = { title: "Studio" };

export default function StudioPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
      <section id="idea" className="scroll-mt-header">
        <h2 className="mb-10">
          The Idea Behind <em>Voussoir</em>
        </h2>
        <p className="max-w-2xl text-ink-soft">
          A voussoir is a wedge-shaped stone forming part of an arch. Each
          piece is shaped by its place within the whole — gaining strength,
          meaning and purpose through its relationship with the others. For
          us, Voussoir is more than a name. It is a way of thinking about
          architecture.
        </p>
        <p className="mt-10 font-medium text-ink">
          From parts, a whole. From space, an experience. From architecture,
          life.
        </p>
      </section>

      <section id="team" className="mt-24 scroll-mt-header">
        <SectionHeader title="The People Behind Voussoir" />

        <div className="mt-16 space-y-24">
          {team.map((person, i) => (
            <div
              key={person.slug}
              id={person.slug}
              // Alternate rows mirror exactly: same photo width, same gap, and the
              // text track is capped so the free space always sits on the outer
              // edge (right for photo-left rows, left for photo-right rows).
              className={`grid gap-10 scroll-mt-header ${
                i % 2 === 1
                  ? "lg:grid-cols-[minmax(0,42rem)_320px] lg:justify-end lg:[&>*:first-child]:order-2"
                  : "lg:grid-cols-[320px_minmax(0,42rem)] lg:justify-start"
              }`}
            >
              <div className="w-full max-w-xs mx-auto lg:mx-0 lg:sticky lg:top-28 lg:self-start">
                <ArchFrame
                  src={`/team/${person.slug}.webp`}
                  alt={`${person.name}, ${person.role}`}
                  outline
                />
              </div>
              <div className="text-center lg:text-left">
                <h2 className="mb-1">{person.name}</h2>
                <p className="font-sans text-sm text-ink-soft mb-6">
                  {person.role}
                </p>
                <div className="space-y-4 text-ink-soft">
                  {person.bio.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
                <div className="mt-6 space-y-0.5 text-ink-faint">
                  {person.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                {person.experience && (
                  <details className="group mt-10 border-t border-line pt-6 text-left">
                    <summary className="font-sans cursor-pointer list-none flex items-baseline justify-between gap-4">
                      <span>
                        <span className="block text-base sm:text-[0.9375rem] font-medium text-accent mb-1">
                          Experience Behind the Practice
                        </span>
                        <span className="block text-sm text-ink-soft">
                          Selected works · prior professional experience ·{" "}
                          {person.experience.length} projects
                        </span>
                      </span>
                      <span className="text-base sm:text-[0.9375rem] font-medium text-ink-soft group-open:hidden">
                        View +
                      </span>
                      <span className="text-base sm:text-[0.9375rem] font-medium text-ink-soft hidden group-open:inline">
                        Close −
                      </span>
                    </summary>
                    <p className="mt-4 font-sans text-sm text-ink-faint">
                      A selection of projects undertaken prior to the establishment of Voussoir.
                    </p>
                    <ol className="mt-4 sm:columns-2 gap-8 font-sans text-sm text-ink-soft">
                      {person.experience.map((project, idx) => (
                        <li key={project} className="break-inside-avoid py-1 flex gap-3">
                          <span className="text-accent tabular-nums">
                            {String(idx + 1).padStart(2, "0")}.
                          </span>
                          <span>{project}</span>
                        </li>
                      ))}
                    </ol>
                  </details>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="values" className="mt-24 scroll-mt-header">
        <SectionHeader title="Values" />
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {values.map((v) => (
            <li key={v.number}>
              <p className="font-sans text-sm font-medium text-accent tabular-nums mb-2">
                {v.number}
              </p>
              <h3 className="mb-1">{v.title}</h3>
              <p className="font-sans text-sm text-accent mb-3">{v.tags}</p>
              <p className="text-ink-soft">{v.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
