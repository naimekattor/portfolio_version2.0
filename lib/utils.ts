export function cn(...classes: (string | undefined | null | false)[]) {
  return classes
    .filter((cls) => typeof cls === "string")
    .join(" ")
    .trim();
}
