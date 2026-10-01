import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import Visual from "@/components/Visual";
import ProcessExplorer from "@/components/ProcessExplorer";
import { approach, concept, disciplines } from "@/data/disciplines";
import { webpSize } from "@/lib/gallery";

export const metadata: Metadata = { title: "Practice" };

export default function PracticePage() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
      <SectionHeader title="Design Begins With Listening" />

      <div className="mt-10">
        <p className="max-w-2xl text-ink-soft text-[1.1875rem] leading-[1.6] sm:text-lg sm:leading-[1.65]">
          At Voussoir, we believe great architecture begins with
          understanding place, people and purpose. We approach every project
          as a dialogue between context and intent, balancing creativity with
          responsibility. From concept to completion, we bring together
          thoughtful design, careful planning and technical precision to
          create spaces that are purposeful, refined and enduring.
        </p>
      </div>

      <Visual
        src="/sketches/studies-1.webp"
        alt="Concept sketches — ideas of voids and volumes"
        label="Concept sketches"
        className="mt-16 w-full"
        {...webpSize("/sketches/studies-1.webp")}
        natural
        sketch
      />

      <div className="mt-20">
        <h2 className="mb-8">Our Design Approach</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {approach.map((item) => (
            <div key={item.title} data-reveal="">
              <Visual
                src={item.image}
                alt=""
                label={item.title}
                className="aspect-[4/3] w-full mb-5"
                sketch
              />
              <h3 className="mb-2">{item.title}</h3>
              <p className="font-sans text-sm text-accent mb-3">
                {item.tags}
              </p>
              <p className="text-ink-soft mb-3">
                {item.body}
              </p>
              <p className="font-sans text-sm text-ink-soft">
                {item.keywords}
              </p>
            </div>
          ))}
        </div>
      </div>

      <section id="process" className="mt-24 scroll-mt-header">
        <h2 className="mb-6">Process</h2>
        <p className="max-w-2xl text-ink-soft">
          We listen, interpret, compose, resolve and make — allowing an idea to
          evolve without losing its original intent. From the scale of the site
          to the smallest detail, every decision contributes to the whole.
        </p>

        <ProcessExplorer />
      </section>

      <div className="mt-24">
        <h2 className="mb-6">The Disciplines</h2>
        <p className="max-w-3xl text-ink-soft">
          We work across scales and disciplines, bringing together planning,
          architecture, interiors, engineering and project delivery as one
          integrated process. From the larger forces of site and strategy to
          the finer language of material and detail, our approach is
          coordinated from concept to completion — balancing design intent,
          technical precision, cost, time and quality.
        </p>

        {/* Discipline images are low-resolution crops from the profile PDF:
            keep them small (six across on desktop) and unzoomed so the
            upscaling doesn't show. Loosen this once full-size originals land. */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-12">
          {disciplines.map((d) => (
            <div key={d.title} data-reveal="">
              <Visual
                src={d.image}
                alt=""
                label={d.title}
                className="aspect-[2/3] w-full mb-6"
                zoom={false}
              />
              <h3 className="mb-1">{d.title}</h3>
              <p className="font-sans text-sm text-accent mb-5">
                {d.tags}
              </p>
              <ul className="space-y-1.5 text-ink-soft">
                {d.capabilities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <h2 className="mb-8">From Concept To Completion</h2>
        <div className="grid sm:grid-cols-3 gap-10">
          {concept.map((item) => (
            <div key={item.title}>
              <h3 className="mb-1">{item.title}</h3>
              <p className="font-sans text-sm text-accent mb-3">
                {item.tags}
              </p>
              <p className="text-ink-soft">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-20 text-right font-sans text-sm font-medium text-ink-faint">
        Spaces that respond, spaces that endure.
      </p>
    </div>
  );
}
