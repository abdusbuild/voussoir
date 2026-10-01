import Image from "next/image";
import Link from "next/link";
import ProjectHook from "@/components/ProjectHook";
import type { Project, TileSize } from "@/data/projects";
import { design } from "@/config/design";

/*
 * Homepage "Selected Work" mosaic.
 *
 * Desktop (lg): 4 columns of square cells, dense flow. Tablet (sm): 2
 * columns — large/wide span the full row, tall collapses to square. Mobile:
 * one column, every image 4:3.
 *
 * The wrapper is a size container, so `100cqw` is the grid's own width and
 * a cell is (100cqw - gaps) / columns. Single-row tiles pin their image to
 * one cell; two-row tiles let the image fill whatever the rows give them.
 * The caption band below every image has the same min-height per
 * breakpoint so image edges line up across tiles.
 */

type Statement = { kind: "statement"; text: string };
type Tile = { kind: "project"; project: Project } | Statement;

// Class names must stay literal for Tailwind to pick them up. One lg cell
// is (100cqw-60px)/4; one sm cell is (100cqw-20px)/2.
const tileClass: Record<TileSize, string> = {
  square: "",
  tall: "lg:row-span-2",
  wide: "sm:col-span-2",
  large: "sm:col-span-2 lg:row-span-2",
};

const imageClass: Record<TileSize, string> = {
  square: "sm:aspect-square",
  tall: "sm:aspect-square lg:aspect-auto lg:flex-1 lg:min-h-[calc((100cqw-60px)/2+20px)]",
  wide: "sm:aspect-auto sm:h-[calc((100cqw-20px)/2)] lg:h-[calc((100cqw-60px)/4)]",
  large:
    "sm:aspect-auto sm:h-[calc((100cqw-20px)/2)] lg:h-auto lg:flex-1 lg:min-h-[calc((100cqw-60px)/2+20px)]",
};

/*
 * `sizes` is the width the image actually renders at, not the tile width:
 * covers are landscape (up to 3:2) and object-cover scales them to fill the
 * box, so a square box renders the photo ~1.5× wider than the box, and a
 * two-row box (2 cells + gap tall) renders it ~1.5× that height. Widths
 * below assume the 1216px max content width and 20px gaps.
 */
const imageSizes: Record<TileSize, string> = {
  square:
    "(min-width: 1280px) 434px, (min-width: 1024px) calc(37.5vw - 46px), (min-width: 640px) calc(75vw - 63px), 100vw",
  tall:
    "(min-width: 1280px) 900px, (min-width: 1024px) calc(75vw - 63px), (min-width: 640px) calc(75vw - 63px), 100vw",
  wide:
    "(min-width: 1280px) 598px, (min-width: 1024px) calc(50vw - 42px), (min-width: 640px) calc(100vw - 64px), 100vw",
  large:
    "(min-width: 1280px) 900px, (min-width: 1024px) calc(75vw - 63px), (min-width: 640px) calc(100vw - 64px), 100vw",
};

// Statements sit after these project positions (1-based).
const STATEMENTS: [number, string][] = [
  [2, "From parts, a whole. From space, an experience."],
  [
    6,
    "An arch does not derive its strength from a single stone, but from the precise relationship between many.",
  ],
];

function buildTiles(projects: Project[]): Tile[] {
  return projects.flatMap((project, i) => {
    const tiles: Tile[] = [{ kind: "project", project }];
    for (const [after, text] of STATEMENTS) {
      if (after === i + 1) tiles.push({ kind: "statement", text });
    }
    return tiles;
  });
}

/*
 * The brand arch (as in ArchFrame) for the tall tile: a semicircular top over
 * square bottom corners. Horizontal radius 50%; vertical radius half the
 * tile width, which as a share of the height is (width / 2) / height — so
 * the top stays an exact semicircle at 4:3 (mobile), square (sm) and
 * whatever height the two grid rows give it (lg).
 *
 * --arch-r is that half width, from the same cell sizes as imageClass: one
 * column is 100cqw on mobile, (100cqw-20px)/2 on sm, (100cqw-60px)/4 on lg.
 * (The tile can't be its own container: the lg min-height needs 100cqw to
 * stay the grid width.)
 */
const archClass =
  "[--arch-r:50cqw] sm:[--arch-r:calc((100cqw-20px)/4)] lg:[--arch-r:calc((100cqw-60px)/8)]";
const archRadius = "50% 50% 0 0 / var(--arch-r) var(--arch-r) 0 0";

function ProjectTile({ project, eager }: { project: Project; eager: boolean }) {
  const size = project.tileSize ?? "square";
  const arched = design.archTallTile && size === "tall";
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-reveal=""
      className={`group flex flex-col outline-accent outline-offset-4 focus-visible:outline-2 ${tileClass[size]}`}
    >
      {/* isolate keeps the hover zoom clipped to the rounded corners in Safari. */}
      <div
        className={`relative isolate aspect-[4/3] overflow-hidden bg-paper ${imageClass[size]} ${arched ? archClass : ""}`}
        style={arched ? { borderRadius: archRadius } : undefined}
      >
        <Image
          src={project.cover}
          alt=""
          fill
          sizes={imageSizes[size]}
          loading={eager ? "eager" : "lazy"}
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out lg:group-hover:motion-safe:scale-[1.03]"
        />
      </div>
      <div className="pt-4 lg:min-h-[12.5rem] xl:min-h-40">
        <h3>{project.title}</h3>
        <ProjectHook hook={project.hook} className="mt-1.5 leading-[1.6] sm:leading-snug" />
        <p className="mt-2 font-sans text-sm text-ink-soft">
          {project.primaryCategory} · {project.city} · {project.completed}
          {project.status && project.status !== "Completed" && ` · ${project.status}`}
        </p>
      </div>
    </Link>
  );
}

function StatementTile({ text }: { text: string }) {
  return (
    <div data-reveal="" className="self-start aspect-[4/3] sm:aspect-square flex items-center border border-line bg-paper p-6">
      <p className="font-serif font-light leading-tight text-[1.75rem] lg:text-[min(1.75rem,calc((100cqw-60px)/4*0.095))]">
        {text}
      </p>
    </div>
  );
}

export default function FeaturedMosaic({ projects }: { projects: Project[] }) {
  const tiles = buildTiles(projects);
  // Tiles in the first desktop row load eagerly; the rest are lazy. With
  // the current order that row is Vana, Panache and the first statement.
  const eagerCount = 3;

  return (
    <div className="@container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-flow-row-dense gap-5">
        {tiles.map((tile, i) =>
          tile.kind === "project" ? (
            <ProjectTile key={tile.project.slug} project={tile.project} eager={i < eagerCount} />
          ) : (
            <StatementTile key={tile.text} text={tile.text} />
          ),
        )}
      </div>
    </div>
  );
}
