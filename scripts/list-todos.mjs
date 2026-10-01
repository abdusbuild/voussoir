// Lists the copy still needed from the client, in two parts:
//
//   Part A — needed before launch: "TODO:" draft hooks and process stage
//            sentences, plus every project without an explicit status.
//   Part B — after launch, optional: key numbers (src/data/facts.ts) and FAQ
//            answers (src/data/faq.ts) still null, and "TODO:" project
//            write-up paragraphs. Each of these stays hidden on the live site
//            until it's filled in.
//
//   node scripts/list-todos.mjs          print the list and write CONTENT-FOR-CLIENT.md
//   node scripts/list-todos.mjs --check  print the list, exit 1 if any Part A item remains
//
// A draft is a string literal whose value starts with "TODO:". The same text
// inside a // or /* */ comment is ignored.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const srcDir = join(root, "src");
const checkOnly = process.argv.includes("--check");

// Where each kind of draft appears on the site, and which part it belongs to.
// Keyed by "file" or "file#field"; drafts matching neither land in "Other",
// which counts as Part A so an unexpected draft can't slip through to launch.
const GROUPS = {
  "src/data/projects.ts#hook": {
    part: "A",
    name: "Project one-liners",
    where: "Home › Selected Work, Projects index, and each project's page",
    intro: "The one-line hook shown under each project's name.",
  },
  "src/data/process.ts": {
    part: "A",
    name: "Process stages",
    where: "Practice › Process",
    intro: "A short description of what happens at each stage of working with us.",
  },
  "src/data/projects.ts#narrative": {
    part: "B",
    name: "Project write-ups",
    where: "Each project's page",
    intro: "Short paragraphs set between the photographs on each project's page. Until a paragraph is rewritten it is left off the live site.",
  },
};

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walk(path);
    return /\.(ts|tsx|js|jsx|mjs)$/.test(entry.name) ? [path] : [];
  });
}

// Blanks out // and /* */ comments with spaces (newlines kept), so offsets and
// line numbers still line up with the original text. Quotes are tracked so a
// "//" inside a string, such as a URL, isn't mistaken for a comment.
function stripComments(text) {
  let out = "";
  let quote = null;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quote) {
      out += ch;
      if (ch === "\\") out += text[++i] ?? "";
      else if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      out += ch;
    } else if (ch === "/" && text[i + 1] === "/") {
      while (i < text.length && text[i] !== "\n") out += text[i++] === "\r" ? "\r" : " ";
      if (i < text.length) out += "\n";
    } else if (ch === "/" && text[i + 1] === "*") {
      const end = text.indexOf("*/", i + 2);
      const stop = end === -1 ? text.length : end + 2;
      for (; i < stop; i++) out += /[\r\n]/.test(text[i]) ? text[i] : " ";
      i--;
    } else {
      out += ch;
    }
  }
  return out;
}

const readCode = (rel) => stripComments(readFileSync(join(root, rel), "utf8"));
const unescape = (s) => s.replace(/\\(.)/g, "$1");
const STRING = String.raw`(["'\x60])((?:\\.|(?!\1)[^\\])*)\1`;

const STRING_TODO = new RegExp(String.raw`(["'\x60])TODO:\s*((?:\\.|(?!\1)[^\\])*)\1`, "g");
const TITLE = new RegExp(String.raw`\btitle:\s*${STRING}`, "g");
// The key a value belongs to: for an array element, the array's key.
const KEY = /\b(\w+):\s*(?=["'`[])/g;

const todos = [];
for (const file of walk(srcDir)) {
  const rel = relative(root, file).split(sep).join("/");
  const code = readCode(rel);
  for (const match of code.matchAll(STRING_TODO)) {
    const before = code.slice(0, match.index);
    const line = before.split("\n").length;
    // The item is the nearest `title:` above the string (the project or stage it belongs to).
    const titles = [...before.matchAll(TITLE)];
    const item = titles.length ? unescape(titles[titles.length - 1][2]) : `line ${line}`;
    // Include the opening quote so a key directly before this string is seen.
    const keys = [...code.slice(0, match.index + 1).matchAll(KEY)];
    const field = keys.length ? keys[keys.length - 1][1] : undefined;
    todos.push({ file: rel, line, item, field, draft: unescape(match[2]) });
  }
}

// Projects with no explicit status. The site shows only the year for these,
// so each needs confirming.
const projectsCode = readCode("src/data/projects.ts");
const projectsList = projectsCode.slice(projectsCode.indexOf("export const projects"));
const missingStatus = projectsList
  .split(/\bslug:/)
  .slice(1)
  .map((entry) => ({
    title: unescape(entry.match(new RegExp(String.raw`\btitle:\s*${STRING}`))?.[2] ?? "Untitled project"),
    completed: unescape(entry.match(new RegExp(String.raw`\bcompleted:\s*${STRING}`))?.[2] ?? ""),
    hasStatus: /\bstatus:\s*["'`]/.test(entry),
  }))
  .filter((p) => !p.hasStatus);

// Key numbers still missing (value: null) in src/data/facts.ts.
const NULL_FACT = new RegExp(String.raw`\{\s*value:\s*null\s*,\s*label:\s*${STRING}\s*,?\s*\}`, "g");
const missingFacts = [...readCode("src/data/facts.ts").matchAll(NULL_FACT)].map((m) => unescape(m[2]));

// FAQ questions still unanswered (answer: null) in src/data/faq.ts.
const NULL_FAQ = new RegExp(String.raw`\{\s*question:\s*${STRING}\s*,\s*answer:\s*null\s*,?\s*\}`, "g");
const unansweredFaqs = [...readCode("src/data/faq.ts").matchAll(NULL_FAQ)].map((m) => unescape(m[2]));

// Known groups first, in the order declared above.
const groups = new Map(Object.values(GROUPS).map((meta) => [meta.name, { meta, items: [] }]));
for (const todo of todos) {
  const meta =
    GROUPS[`${todo.file}#${todo.field}`] ??
    GROUPS[todo.file] ?? { part: "A", name: "Other", where: todo.file, intro: "" };
  if (!groups.has(meta.name)) groups.set(meta.name, { meta, items: [] });
  groups.get(meta.name).items.push(todo);
}
for (const [name, group] of groups) if (group.items.length === 0) groups.delete(name);
const groupsIn = (part) => [...groups.values()].filter((g) => g.meta.part === part);
const countIn = (part) => groupsIn(part).reduce((n, g) => n + g.items.length, 0);

const partA = countIn("A") + missingStatus.length;
const partB = countIn("B") + missingFacts.length + unansweredFaqs.length;

// Console report
function printGroups(part) {
  for (const { meta, items } of groupsIn(part)) {
    console.log(`\n${meta.name}  (${meta.where})`);
    for (const t of items) {
      console.log(`  • ${t.item}${t.field ? ` [${t.field}]` : ""}  — ${t.file}:${t.line}`);
      console.log(`      ${t.draft}`);
    }
  }
}

console.log(`PART A — Needed before launch: ${partA} item${partA === 1 ? "" : "s"}`);
printGroups("A");
if (missingStatus.length > 0) {
  console.log("\nProject status  (Projects index and each project's page)");
  for (const p of missingStatus) console.log(`  • ${p.title}  — no status set in src/data/projects.ts`);
}

console.log(`\nPART B — After launch, optional: ${partB} item${partB === 1 ? "" : "s"}`);
printGroups("B");
if (missingFacts.length > 0) {
  console.log("\nKey numbers  (Home, shown once at least 3 are filled in)");
  for (const label of missingFacts) console.log(`  • ${label}  — src/data/facts.ts`);
}
if (unansweredFaqs.length > 0) {
  console.log("\nFrequently asked questions  (Contact, shown once at least 3 are answered)");
  for (const question of unansweredFaqs) console.log(`  • ${question}  — src/data/faq.ts`);
}

if (checkOnly) {
  if (partA > 0) {
    console.error(`\nLaunch check failed: ${partA} Part A item${partA === 1 ? "" : "s"} still needed before deploying.`);
    process.exit(1);
  }
  console.log("\nLaunch check passed.");
  process.exit(0);
}

// Client-facing file: plain language, no code or paths.
function pushDrafts(md, part) {
  for (const { meta, items } of groupsIn(part)) {
    md.push(`## ${meta.name}`, "");
    if (meta.intro) md.push(meta.intro, "");
    for (const t of items) {
      md.push(
        `### ${t.item}`,
        "",
        `**Draft (please rewrite in your own words):** ${t.draft}`,
        "",
        "**Your version:** ",
        "",
      );
    }
  }
}

const md = [
  "# Website copy — your input needed",
  "",
  `- **Part A — Needed before launch:** ${partA} item${partA === 1 ? "" : "s"}`,
  `- **Part B — After launch (optional):** ${partB} item${partB === 1 ? "" : "s"}`,
  "",
  "---",
  "",
  "# Part A — Needed before launch",
  "",
];
if (partA === 0) {
  md.push("Nothing outstanding — everything needed for launch is done.", "");
} else {
  md.push(
    "The website can't go live until these are done.",
    "Where there is a draft written by us, please rewrite it in your own words on the \"Your version:\" line.",
    "Keep them short — one sentence for a one-liner, two or three for a stage.",
    "",
  );
  pushDrafts(md, "A");
  if (missingStatus.length > 0) {
    md.push(
      "## Project status",
      "",
      "Shown on the projects list and each project's page.",
      "For each project, please write one of: Completed, Under construction, or In design.",
      "",
    );
    for (const p of missingStatus) {
      md.push(
        `### ${p.title}`,
        "",
        `Currently shown as: ${p.completed ? `the year only (${p.completed})` : "no status"}`,
        "",
        "**Your answer:** ",
        "",
      );
    }
  }
}

md.push(
  "---",
  "",
  "# Part B — After launch (optional, sections stay hidden until filled)",
  "",
);
if (partB === 0) {
  md.push("Nothing outstanding.", "");
} else {
  md.push(
    "None of these are needed to launch. Each section stays hidden on the website until it's filled in, so you can send them whenever you're ready.",
    "",
  );
  pushDrafts(md, "B");
  if (missingFacts.length > 0) {
    md.push(
      "## Key numbers",
      "",
      "A short row of figures on the home page. It stays hidden until at least three are filled in.",
      "Please give a figure for each (for example \"25+\" or \"12\").",
      "",
    );
    for (const label of missingFacts) md.push(`### ${label}`, "", "**Your number:** ", "");
  }
  if (unansweredFaqs.length > 0) {
    md.push(
      "## Frequently asked questions",
      "",
      "A short list of common questions on the Contact page.",
      "Please answer at least 3 so this section appears on the website. Answers can be 1–3 short sentences. For fees, you can describe how you charge without giving figures.",
      "",
    );
    for (const question of unansweredFaqs) md.push(`### ${question}`, "", "**Your answer:** ", "");
  }
}

writeFileSync(join(root, "CONTENT-FOR-CLIENT.md"), md.join("\n"));
console.log("\nWrote CONTENT-FOR-CLIENT.md");
