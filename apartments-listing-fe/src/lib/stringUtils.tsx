export function capitalize(string: string): string {
  return string.substring(0, 1).toUpperCase() + string.slice(1).toLowerCase();
}

export function toLabel(string: string): string {
  return capitalize(string).split(/-|_/).join(" ");
}
