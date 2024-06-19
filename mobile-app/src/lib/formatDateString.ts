export function todayString(): string {
  return formatDateString(new Date());
}

export function formatDateString(date: Date): string {
  return date.toLocaleDateString("en-CA");
}
