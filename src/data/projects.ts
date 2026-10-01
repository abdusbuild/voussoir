export type Category =
  | "Residential"
  | "Hospitality"
  | "Institutional"
  | "Commercial"
  | "Industrial"
  | "Interiors"
  | "Urban & Large-Scale"
  | "Green & Responsive";

export const categories: { key: Category; description: string; image: string }[] = [
  { key: "Residential", description: "Homes, villas, apartments, private residences", image: "/categories/residential.webp" },
  { key: "Hospitality", description: "Hotels, resorts, restaurants, guest experiences", image: "/categories/hospitality.webp" },
  { key: "Commercial", description: "Offices, retail, workplaces, mixed-use developments", image: "/categories/commercial.webp" },
  { key: "Institutional", description: "Educational, healthcare, cultural, public environments", image: "/categories/institutional.webp" },
  { key: "Industrial", description: "Factories, manufacturing facilities, breweries, distilleries", image: "/categories/industrial.webp" },
  { key: "Interiors", description: "Residential, hospitality, workplace, commercial interiors", image: "/categories/interiors.webp" },
  { key: "Urban & Large-Scale", description: "Townships, campuses, masterplanning, urban interventions", image: "/categories/urban-large-scale.webp" },
  { key: "Green & Responsive", description: "Climate-responsive architecture, sustainable strategies, green building integration", image: "/categories/green-responsive.webp" },
];

// URL form of a category, e.g. "Green & Responsive" → "green-responsive".
export function categorySlug(category: Category) {
  return category.toLowerCase().replace(/[^a-z]+/g, "-");
}

// Footprint of a project's tile in the homepage mosaic (see FeaturedMosaic).
export type TileSize = "large" | "tall" | "wide" | "square";

export type ProjectStatus = "Completed" | "Under construction" | "In design";

export type Project = {
  slug: string;
  title: string;
  client?: string;
  location: string;
  // Short place name for the /projects meta line; `location` stays the
  // full address shown on the detail page.
  city: string;
  completed: string;
  categories: Category[];
  // The one category shown on /projects cards. The full list is only on
  // the detail page.
  primaryCategory: Category;
  // Shown at the end of the /projects meta line unless "Completed".
  status?: ProjectStatus;
  // Position on /projects, ascending.
  order: number;
  summary: string;
  // Optional long-form write-up for the detail page, one string per
  // paragraph. Paragraphs are set between the photographs in order. Wrap a
  // phrase in *asterisks* to set it in the accent colour. Paragraphs
  // prefixed "TODO:" are drafts — shown in development only.
  narrative?: string[];
  // Optional detail-page facts — each row is left out when not set.
  area?: string;
  team?: string[];
  photographers?: string[];
  cover: string;
  gallery: string[];
  // One-sentence line shown under the tile in the homepage mosaic.
  hook?: string;
  tileSize?: TileSize;
};

// Images live in public/projects/<folder>/01.webp, 02.webp, … — the first is the cover.
function images(folder: string, count: number) {
  const gallery = Array.from(
    { length: count },
    (_, i) => `/projects/${folder}/${String(i + 1).padStart(2, "0")}.webp`,
  );
  return { cover: gallery[0], gallery };
}

export const projects: Project[] = [
  {
    slug: "meatzza-factory-processing-unit",
    title: "Meatzza Factory & Processing Unit",
    client: "Darshan Food Pvt Ltd",
    location: "Bawal, Haryana",
    city: "Bawal",
    completed: "2026",
    categories: ["Industrial"],
    primaryCategory: "Industrial",
    order: 3,
    summary:
      "A processing facility that pairs solid masonry volumes with a perforated jaali panel and recessed glazing — greenery threaded through every level.",
    narrative: [
      "TODO: A food processing facility for Darshan Food in Bawal, Haryana. The frontage is composed of solid masonry volumes framed in terracotta-red fins, with *a perforated jaali panel* screening the stair tower and recessed glazing set deep into the walls.",
      "TODO: Planting is threaded through every level — balcony planters, a landscaped forecourt and trees along the service yard — softening an industrial building and giving the people who work there a greener place to arrive.",
    ],
    hook: "TODO: A processing facility of solid masonry volumes, a perforated jaali and greenery on every level.",
    tileSize: "wide",
    ...images("meatzza", 4),
  },
  {
    slug: "vana-residence",
    title: "Vana Residence",
    location: "GAIL Society, Noida, UP",
    city: "Noida",
    completed: "2026",
    categories: ["Residential", "Interiors", "Green & Responsive"],
    primaryCategory: "Residential",
    order: 1,
    summary:
      "A contemporary residence designed around warm minimalism, natural textures, and seamless indoor–outdoor living, finished in warm neutrals, natural wood and stone.",
    narrative: [
      "TODO: Vana is a multi-storey family home in Noida. Its street face is built from stone-clad volumes, timber louvres and deep balconies, with *a green wall of climbers* running the full height of the house and a pergola garden on the roof.",
      "TODO: Inside, living, dining and kitchen run into one another under layered ceilings with concealed lighting. A marble feature wall anchors the living room, and full-height glazing brings the garden and balcony planting right up to the dining table.",
      "TODO: The bedrooms keep the same palette of warm neutrals, wood and stone — fluted panels, a glass-fronted wardrobe, a window seat set into a deep reveal and a playful child's room. The bathrooms are wrapped in *veined marble and soft cove light*.",
    ],
    hook: "TODO: A warm, minimal home of natural wood and stone, open to the outdoors.",
    tileSize: "large",
    ...images("vana", 18),
  },
  {
    slug: "farmhouse-greater-noida",
    title: "Farmhouse",
    location: "Greater Noida, UP",
    city: "Greater Noida",
    completed: "2025",
    categories: ["Residential"],
    primaryCategory: "Residential",
    order: 5,
    summary:
      "A U-shaped farmhouse organised around a central courtyard and pool, creating seamless indoor–outdoor living and privacy — open, connect, gather, belong.",
    narrative: [
      "TODO: A farmhouse in Greater Noida, laid out as a U around a central courtyard and pool. Every main room opens onto the courtyard, so the house is *open to its garden yet private* from the outside.",
      "TODO: Deep verandas, planted edges and warm evening light make the courtyard the heart of the house — somewhere to gather, swim and sit out. The ground- and first-floor plans show how the wings wrap around the pool.",
      "TODO: The site photographs record the walls and roof framing going up around the pool.",
    ],
    hook: "TODO: A U-shaped farmhouse organised around a central courtyard and pool, open yet private.",
    tileSize: "square",
    ...images("farmhouse", 10),
  },
  {
    slug: "escon-office",
    title: "Escon Office",
    location: "Noida, UP",
    city: "Noida",
    completed: "2024",
    categories: ["Commercial", "Interiors"],
    primaryCategory: "Commercial",
    order: 4,
    summary:
      "A workplace built around a sculptural reception ceiling and a terrazzo-clad reception desk — building values, made tangible in material.",
    narrative: [
      "TODO: An office for Escon in Noida, organised around a reception that sets the tone for the whole workplace. *A sculptural ribbon ceiling* sweeps across the entrance, and the reception desk is clad in terracotta-toned terrazzo.",
      "TODO: Curved lounge seating, planters and soft cove lighting make the waiting area feel like a lobby rather than a corridor, and the boardroom looks out over the city through full-height glass.",
      "TODO: The plan groups workstations, meeting rooms, private offices and a pantry around the reception.",
    ],
    hook: "TODO: A workplace built around a sculptural ceiling and terrazzo-clad desk at reception.",
    tileSize: "square",
    ...images("escon", 5),
  },
  {
    slug: "panache-villa",
    title: "Panache Villa",
    location: "Escon Villas, Greater Noida, UP",
    city: "Greater Noida",
    completed: "2026",
    categories: ["Residential", "Interiors"],
    primaryCategory: "Residential",
    order: 2,
    summary:
      "A private villa layered in stone, microtexture, wood, brass and fabric — arched niches, sculpted wall panels and a garden court carried from render through to execution on site.",
    narrative: [
      "TODO: Panache Villa is a private home in Escon Villas, Greater Noida. Behind a façade of stone fins and warm lighting, the interiors are built around *arches, curves and sculpted relief* — arched niches, rounded wall panels and flowing ceiling coves.",
      "TODO: The living and dining spaces pair a large marble feature wall with brass inlays and microtexture finishes. Each bedroom takes a different headboard wall — sculpted leaf panels, fluted upholstery, stone — against the same calm, light palette.",
      "TODO: Outdoors, a meditation garden, a bar pavilion under a timber pergola and a terrace spa carry the house into the open air. The photographs that close the set show the villa *as built on site*, carried through from the renders.",
    ],
    hook: "TODO: A private villa layered in stone, wood and brass, carried from render to site.",
    tileSize: "tall",
    ...images("panache", 19),
  },
  {
    slug: "serene-residence",
    title: "Serene Residence",
    location: "Private Residence, Greater Noida",
    city: "Greater Noida",
    completed: "2024",
    categories: ["Interiors", "Residential"],
    primaryCategory: "Interiors",
    order: 6,
    summary:
      "Calm, warm, layered living — soft natural light, a layered ceiling and a textured screen that divides without closing off.",
    narrative: [
      "TODO: A private apartment in Greater Noida, designed for calm, everyday living. Soft natural light, pale wall panelling and a layered ceiling with ring pendants give the living room its quiet character.",
      "TODO: *A textured glass-and-brass screen* separates the living room from the dining area without closing it off, and the bedroom settles into warmer tones of timber slats and wood flooring.",
    ],
    hook: "TODO: Calm, layered living shaped by soft natural light and a textured dividing screen.",
    tileSize: "square",
    ...images("serene", 4),
  },
  {
    slug: "aria-vista",
    title: "Aria Vista",
    location: "Private Residence, Noida",
    city: "Noida",
    completed: "2024",
    categories: ["Residential", "Interiors"],
    primaryCategory: "Residential",
    order: 7,
    summary:
      "A soft neutral palette, layered ceilings and arched details, planned around circulation, natural light and ventilation.",
    narrative: [
      "TODO: A family apartment in Noida in a soft neutral palette, planned around circulation, natural light and ventilation. The living room pairs light panelling and brass trims with an arched botanical mural.",
      "TODO: Each bedroom has its own character — a blush-pink room built around *a circular textured headboard wall* and an arched reading nook, and a child's room with a climbing wall and playful arched storage.",
      "TODO: A warm timber kitchen and the furnished plan complete the set.",
    ],
    hook: "TODO: A soft neutral home of layered ceilings and arches, planned around light and air.",
    tileSize: "square",
    ...images("aria-vista", 6),
  },
  {
    slug: "the-alcove",
    title: "The Alcove",
    location: "Private Residence, Greater Noida",
    city: "Greater Noida",
    completed: "2025",
    categories: ["Residential", "Interiors"],
    primaryCategory: "Residential",
    order: 8,
    summary:
      "Layered spaces for everyday living — a harmonious blend of texture, light and space, detailed down to the arcuate niche and fluted paneling.",
    narrative: [
      "TODO: A private residence in Greater Noida built around one generous living and dining space. Layered ceilings, a crystal chandelier and marble-clad walls set a light, refined backdrop for everyday family life.",
      "TODO: The detail is in the edges — *arcuate niches*, fluted panelling and brass-trimmed recesses break the walls into softer, layered surfaces.",
      "TODO: The bedrooms are quieter: an arched headboard alcove with a botanical mural, and a floating bed against panelled walls.",
    ],
    hook: "TODO: Layered spaces for everyday living, detailed down to the arcuate niche and fluted paneling.",
    tileSize: "square",
    ...images("the-alcove", 6),
  },
  {
    slug: "vijayvargiya-residence",
    title: "Vijayvargiya Residence",
    location: "Byvara, Madhya Pradesh",
    city: "Byvara",
    completed: "2001",
    categories: ["Residential"],
    primaryCategory: "Residential",
    order: 9,
    summary:
      "An early work from the practice's founding experience — a courtyard residence organised around public, semi-private and private zones.",
    narrative: [
      "TODO: An early residence from the practice's founding experience, in Byvara, Madhya Pradesh. The house is organised into *public, semi-private and private zones* around a central courtyard.",
      "TODO: Deep red bands, a timber pergola and a cylindrical tower give the house its profile, with a patterned boundary wall along the street.",
    ],
    hook: "TODO: An early courtyard residence organised into public, semi-private and private zones.",
    tileSize: "square",
    ...images("vijayvargiya", 2),
  },
];

// Homepage "Selected Work" order (max 9). Arranged so the mosaic packs
// without holes at desktop widths — change sizes in the data above, then
// re-check the grid if you reorder.
export const featuredSlugs = [
  "vana-residence",
  "panache-villa",
  "farmhouse-greater-noida",
  "meatzza-factory-processing-unit",
  "escon-office",
  "serene-residence",
  "aria-vista",
  "the-alcove",
  "vijayvargiya-residence",
];
