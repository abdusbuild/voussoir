"use client";

import Image from "next/image";
import Link from "next/link";
import ProjectHook from "@/components/ProjectHook";
import { useSearchParams } from "next/navigation";
import {
  projects,
  categories,
  categorySlug,
  type Category,
  type Project,
} from "@/data/projects";

const ordered = [...projects].sort((a, b) => a.order - b.order);

// Categories with no projects are left out. Most projects first; ties keep
// the order of `categories`.
const filters = categories
  .map((c) => ({
    category: c.key,
    count: projects.filter((p) => p.categories.includes(c.key)).length,
  }))
  .filter(({ count }) => count > 0)
  .sort((a, b) => b.count - a.count);

// Widths assume the 1216px max content width, the 40px column gap and the
// page's side padding (20px below sm, 32px from sm).
const imageSizes =
  "(min-width: 1280px) 588px, (min-width: 768px) calc(50vw - 52px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)";

function FilterLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={`tap text-base sm:text-[0.9375rem] transition-colors ${
        active
          ? "text-accent underline decoration-1 underline-offset-4"
          : "text-ink hover:text-accent"
      }`}
    >
      {label}
    </Link>
  );
}

function ProjectCard({ project, eager }: { project: Project; eager: boolean }) {
  const meta = [project.primaryCategory, project.city, project.completed];
  if (project.status && project.status !== "Completed") meta.push(project.status);

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-reveal=""
      className="group block outline-accent outline-offset-4 focus-visible:outline-2"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-paper">
        <Image
          src={project.cover}
          alt=""
          fill
          sizes={imageSizes}
          preload={eager}
          loading={eager ? "eager" : "lazy"}
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out lg:group-hover:motion-safe:scale-[1.03]"
        />
      </div>
      <h3 className="mt-5 text-[1.75rem]">{project.title}</h3>
      <ProjectHook hook={project.hook} className="mt-2 leading-[1.6] sm:leading-snug" />
      <p className="mt-2 font-sans text-sm text-ink-soft">{meta.join(" · ")}</p>
    </Link>
  );
}

export function ProjectsView({ active }: { active: Category | null }) {
  const shown = active
    ? ordered.filter((p) => p.categories.includes(active))
    : ordered;

  return (
    <>
      <nav
        aria-label="Filter projects by category"
        className="mt-10 flex flex-wrap items-baseline gap-x-5 sm:gap-x-3 sm:gap-y-2 font-sans text-[0.9375rem] font-medium tracking-normal"
      >
        <FilterLink
          href="/projects"
          label="All"
          active={active === null}
        />
        {filters.map(({ category }) => (
          <span key={category} className="contents">
            {/* Dots only on one-line widths; on phones a wrapped line would start with one. */}
            <span aria-hidden="true" className="hidden sm:inline text-ink-soft">
              ·
            </span>
            <FilterLink
              href={`/projects?category=${categorySlug(category)}`}
              label={category}
              active={active === category}
            />
          </span>
        ))}
      </nav>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
        {shown.map((project, i) => (
          <ProjectCard key={project.slug} project={project} eager={i < 2} />
        ))}
      </div>
    </>
  );
}

// Reads ?category= from the URL. Unknown values fall back to All.
export default function ProjectsIndex() {
  const param = useSearchParams().get("category");
  const active =
    filters.find(({ category }) => categorySlug(category) === param)?.category ??
    null;
  return <ProjectsView active={active} />;
}
