import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectHook from "@/components/ProjectHook";
import ShareButton from "@/components/ShareButton";
import { projects, type Project } from "@/data/projects";
import { gallerySlides } from "@/lib/gallery";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project ? `${project.title} — Voussoir` : "Voussoir" };
}

// *phrase* → the phrase in the accent colour.
function Emphasis({ text }: { text: string }) {
  return text.split(/\*([^*]+)\*/).map((part, i) =>
    i % 2 ? (
      <span key={i} className="text-accent">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function facts(project: Project) {
  // "Completed" only when the status says so; with no status, just the year.
  const status: [string, string] = !project.status
    ? ["Year", project.completed]
    : project.status === "Completed"
      ? ["Status", `Completed ${project.completed}`]
      : ["Status", project.status];
  return [
    ["Client", project.client],
    ["Location", project.location],
    ["Area", project.area],
    status,
    ["Team", project.team?.join(", ")],
    ["Photography", project.photographers?.join(", ")],
  ].filter((row): row is [string, string] => !!row[1]);
}

// Projects sharing the most categories first, then site order.
function related(project: Project, count = 3) {
  const shared = (p: Project) =>
    p.categories.filter((c) => project.categories.includes(c)).length;
  return projects
    .filter((p) => p.slug !== project.slug)
    .sort((a, b) => shared(b) - shared(a) || a.order - b.order)
    .slice(0, count);
}

const labelClass = "font-sans text-xs font-medium uppercase tracking-[0.16em]";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const tags = [...project.categories, project.city];

  // Keyed: Next dev flags JSX props handed to a client component as unkeyed
  // list children otherwise.
  const heroOverlay = (
    <div key="overlay">
      <p className={`${labelClass} text-paper/85`}>{tags.join("  |  ")}</p>
      <h1 className="mt-3 max-w-4xl text-paper">{project.title}</h1>
    </div>
  );

  const intro = (
    <div key="intro" className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft py-5">
        <Link
          href="/projects"
          className="link-sweep tap group inline-flex! items-center gap-2 font-sans text-sm font-medium uppercase tracking-[0.14em] text-ink-soft hover:text-accent transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          >
            <path
              d="M19 12H5M11 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          All Projects
        </Link>
        <ShareButton title={`${project.title} — Voussoir`} />
      </div>

      <dl className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-6 border-b border-line-soft py-8">
        {facts(project).map(([label, value]) => (
          <div key={label}>
            <dt className={`${labelClass} text-ink-faint`}>{label}</dt>
            <dd className="mt-1.5 font-sans text-[0.9375rem] font-medium uppercase tracking-[0.06em] text-ink">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mx-auto max-w-3xl py-12 sm:py-16 text-[1.5rem] leading-[1.45] sm:text-[1.75rem] sm:leading-[1.4]">
        <Emphasis text={project.summary} />
      </p>
    </div>
  );

  // Drafts prefixed "TODO" never render in production, and render with a
  // dashed outline in development (as ProjectHook does).
  const isDev = process.env.NODE_ENV === "development";
  const interludes = (project.narrative ?? [])
    .filter((paragraph) => isDev || !paragraph.startsWith("TODO"))
    .map((paragraph, i) => {
      const draft = paragraph.startsWith("TODO");
      return (
        <div key={i} data-reveal="" className="mx-auto max-w-3xl py-10 sm:py-14">
          <p
            className={`text-ink-soft sm:text-[1.3125rem] sm:leading-[1.65] ${
              draft ? "outline-1 outline-dashed outline-offset-4 outline-accent" : ""
            }`}
          >
            <Emphasis text={draft ? paragraph.replace(/^TODO:\s*/, "") : paragraph} />
          </p>
        </div>
      );
    });

  const more = related(project);

  return (
    <>
      <ProjectGallery
        slides={gallerySlides(
          project.gallery.map((src, i) => ({
            src,
            alt: `${project.title} — view ${i + 1}`,
          })),
        )}
        heroOverlay={heroOverlay}
        intro={intro}
        interludes={interludes}
      />

      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-20 sm:pt-28 pb-16">
        <div className="flex items-baseline justify-between gap-4 border-t border-line-soft pt-8">
          <h2>More</h2>
          <Link
            href="/projects"
            className="link-sweep tap font-sans text-sm font-medium uppercase tracking-[0.14em] text-ink-soft hover:text-accent transition-colors"
          >
            View all
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
          {more.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              data-reveal=""
              className="group block outline-accent outline-offset-4 focus-visible:outline-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-paper-soft">
                <Image
                  src={p.cover}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 384px, (min-width: 768px) calc(33vw - 32px), calc(100vw - 40px)"
                  className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out lg:group-hover:motion-safe:scale-[1.03]"
                />
              </div>
              <p className={`${labelClass} mt-5 text-ink-faint`}>
                {p.primaryCategory} · {p.city}
              </p>
              <h3 className="mt-2 text-[1.625rem] group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              <ProjectHook hook={p.hook} className="mt-2 text-ink-soft leading-snug" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
