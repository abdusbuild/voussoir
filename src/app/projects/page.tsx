import type { Metadata } from "next";
import { Suspense } from "react";
import ProjectsIndex, { ProjectsView } from "./ProjectsIndex";

export const metadata: Metadata = { title: "Projects — Voussoir" };

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
      <h1>Projects</h1>
      <p className="mt-4 text-[1.1875rem] leading-[1.6] sm:text-lg sm:leading-[1.75rem] text-ink-soft">
        Homes, interiors and workplaces across Delhi NCR, Haryana and Madhya
        Pradesh.
      </p>

      {/* The filter is read from ?category= on the client. The fallback is
          the unfiltered list, so the prerendered HTML is the full page. */}
      <Suspense fallback={<ProjectsView active={null} />}>
        <ProjectsIndex />
      </Suspense>
    </div>
  );
}
