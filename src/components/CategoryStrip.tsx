const strip = [
  "Residential",
  "Hospitality",
  "Institutional",
  "Commercial",
  "Industrial",
  "Interiors",
  "Urban & Large Scale",
  "Green Responsive",
];

export default function CategoryStrip({ active }: { active?: string }) {
  return (
    <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
      {strip.map((item) => (
        <span
          key={item}
          className={`font-sans text-[0.9375rem] font-medium ${
            active && item.toLowerCase().includes(active.toLowerCase().split(" ")[0])
              ? "text-accent underline underline-offset-4"
              : "text-ink/70"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
