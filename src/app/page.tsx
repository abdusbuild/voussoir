import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import Visual from "@/components/Visual";
import FeaturedMosaic from "@/components/FeaturedMosaic";
import ApproachIcon from "@/components/ApproachIcons";
import { approach } from "@/data/disciplines";
import { featuredSlugs, projects } from "@/data/projects";
import ArchFrame from "@/components/ArchFrame";
import FactsStrip from "@/components/FactsStrip";
import { values } from "@/data/values";
import ArrowIcon from "@/components/ArrowIcon";

const featured = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p) => p !== undefined)
  .slice(0, 9);

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1>
            Built on balance.
            <br />
            Defined by intent.
          </h1>
          <p className="mt-8 max-w-md text-ink-soft">
            A design practice creating considered spaces through form,
            material and detail.
          </p>
          <div className="mt-10 flex gap-6 items-center">
            <Link
              href="/projects"
              className="btn-morph text-base sm:text-[0.9375rem] font-medium bg-ink text-paper px-6 py-3 hover:bg-accent"
            >
              View projects
            </Link>
            <Link href="/contact" className="link-sweep tap font-sans text-base sm:text-[0.9375rem] font-medium text-ink-soft hover:text-accent transition-colors">
              Start a conversation
            </Link>
          </div>
        </div>
        <Visual
          src="/hero/arch.webp"
          alt="Voussoir — architectural detail"
          label="Signature arch study"
          className="aspect-[4/5] w-full edge-fade"
          priority
        />
      </section>

      {/* Selected work */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <SectionHeader
          title="Selected Work"
          action={
            <Link
              href="/projects"
              className="group link-sweep tap whitespace-nowrap font-sans text-base sm:text-[0.9375rem] font-medium text-ink-soft hover:text-accent transition-colors"
            >
              View all projects
              <ArrowIcon />
            </Link>
          }
        />
        <div className="mt-12">
          <FeaturedMosaic projects={featured} />
        </div>
      </section>

      {/* Idea */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="max-w-xl">
          <h2 className="text-[1.5rem] sm:text-[1.75rem] leading-[1.35] tracking-normal">
            A voussoir is a wedge-shaped stone in an arch — strong only
            through its relationship with the others.
          </h2>
          <p className="mt-4 font-serif italic text-ink-soft text-[1.5rem] sm:text-[1.75rem] leading-[1.35]">
            From parts, a whole.
          </p>
          <Link
            href="/studio#idea"
            // 44px tap target at every width, not just on phones like .tap.
            className="group link-sweep mt-6 [--tap-pad:max(0px,calc((2.75rem-1lh)/2))] py-(--tap-pad) font-sans text-base font-medium text-ink-soft hover:text-accent transition-colors"
          >
            Read our story
            <ArrowIcon />
          </Link>
        </div>
        <div data-reveal="" className="w-full max-w-sm mx-auto lg:mr-0">
          <ArchFrame
            src="/sketches/studies-2.webp"
            alt="Pencil studies of arches and volumes"
            sketch
          />
        </div>
      </section>

      {/* Approach */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <SectionHeader title="The Practice" />
        <ul className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-7 sm:gap-y-10">
          {approach.map((item) => (
            <li key={item.number} className="flex items-center gap-4 lg:flex-col lg:items-start">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper-soft text-accent lg:h-14 lg:w-14">
                <ApproachIcon name={item.title} className="h-6 w-6 lg:h-7 lg:w-7" />
              </span>
              <div>
                <h3 className="mb-0.5 lg:mb-1">{item.title}</h3>
                <p className="text-ink-soft">{item.tags}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Link
            href="/practice"
            className="group link-sweep tap whitespace-nowrap font-sans text-base sm:text-[0.9375rem] font-medium text-ink-soft hover:text-accent transition-colors"
          >
            More on our practice
            <ArrowIcon />
          </Link>
        </div>
      </section>

      <FactsStrip />

      {/* Values teaser */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <SectionHeader
          title="Values"
          action={
            <Link
              href="/studio#values"
              className="group link-sweep tap whitespace-nowrap font-sans text-base sm:text-[0.9375rem] font-medium text-ink-soft hover:text-accent transition-colors"
            >
              See all our values
              <ArrowIcon />
            </Link>
          }
        />
        <ul className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-12">
          {values.slice(0, 3).map((v) => (
            <li key={v.number}>
              <p className="font-sans text-sm font-medium text-accent tabular-nums mb-2">
                {v.number}
              </p>
              <h3 className="mb-2">{v.title}</h3>
              <p className="text-ink-soft">{v.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 text-center">
        <p className="font-serif text-3xl sm:text-4xl max-w-2xl mx-auto leading-tight">
          Great architecture is not about buildings, it&apos;s about
          purposeful spaces that elevate the way we live.
        </p>
        <Link
          href="/contact"
          className="btn-morph inline-block mt-10 text-base sm:text-[0.9375rem] font-medium bg-ink text-paper px-8 py-3 hover:bg-accent"
        >
          Contact us
        </Link>
      </section>
    </div>
  );
}
