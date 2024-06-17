export function todayString(): string {
  const date = new Date();
  return date.toLocaleDateString("en-CA");
}