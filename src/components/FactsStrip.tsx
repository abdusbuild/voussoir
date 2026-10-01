import { facts } from "@/data/facts";

// Hidden entirely until at least 3 facts are confirmed — no placeholders.
export default function FactsStrip() {
  const known = facts.filter((f) => f.value !== null);
  if (known.length < 3) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 border-y border-line py-10">
        {known.map((f) => (
          <div key={f.label} className="flex flex-col-reverse">
            <dt className="mt-2 font-sans text-sm text-ink-soft">{f.label}</dt>
            <dd className="font-serif font-light text-5xl leading-none">
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
