import type { ReactNode } from "react";

export default function SectionHeader({
  title,
  align = "left",
  action,
  className = "",
}: {
  title: string;
  align?: "left" | "right";
  // Optional link or control set on the same line, pushed to the right.
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className={`flex items-end gap-6 ${
          align === "right" ? "text-right" : ""
        } ${action ? "justify-between" : ""}`}
      >
        <h2 className="whitespace-nowrap">{title}</h2>
        {action && <div className="shrink-0 pb-1.5">{action}</div>}
      </div>
    </div>
  );
}
