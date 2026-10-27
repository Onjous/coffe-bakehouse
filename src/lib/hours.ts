import type { DayHours } from "@/content/site";

/** "07:30" → "7.30am", "17:00" → "5pm" (British style). */
export function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour}${suffix}` : `${hour}.${String(m).padStart(2, "0")}${suffix}`;
}

export function formatRange(day: DayHours) {
  if (!day.open || !day.close) return "Closed";
  return `${formatTime(day.open)}–${formatTime(day.close)}`;
}
