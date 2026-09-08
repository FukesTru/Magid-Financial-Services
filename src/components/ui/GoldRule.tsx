/**
 * The gold accent rule. Sits under the H1 in the hero and under section
 * headings elsewhere — it is the site's most repeated brand signature, so it
 * lives in exactly one place.
 */
export function GoldRule({
  className = "",
  align = "left",
  weight = "hairline",
}: {
  className?: string;
  align?: "left" | "center";
  /** `bold` is reserved for the hero underline. */
  weight?: "hairline" | "bold";
}) {
  const height = weight === "bold" ? "h-0.5" : "h-px";
  const gradient =
    align === "center"
      ? "bg-gradient-to-r from-gold-500/0 via-gold-500 to-gold-500/0"
      : "bg-gradient-to-r from-gold-500 to-gold-500/0";

  return (
    <span
      aria-hidden="true"
      className={`block w-24 ${height} ${gradient} ${
        align === "center" ? "mx-auto" : ""
      } ${className}`}
    />
  );
}
