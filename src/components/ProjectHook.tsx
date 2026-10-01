/*
 * A project's one-line hook. Drafts in the data are prefixed "TODO" — those
 * never render in production, and render with a dashed outline in
 * development so they can still be reviewed in place.
 */
export default function ProjectHook({
  hook,
  className = "",
}: {
  hook?: string;
  className?: string;
}) {
  if (!hook) return null;
  if (hook.startsWith("TODO")) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <p className={`${className} outline-1 outline-dashed outline-offset-2 outline-accent`}>
        {hook}
      </p>
    );
  }
  return <p className={className}>{hook}</p>;
}
