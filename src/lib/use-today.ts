"use client";

import { useSyncExternalStore } from "react";
import { hours, timeZone, type DayHours } from "@/content/site";

const weekdayIndex: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function londonNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { day: weekdayIndex[get("weekday")] ?? 0, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export type TodayStatus = { today: DayHours; open: boolean };

function computeStatus(): TodayStatus | null {
  const now = londonNow();
  const today = hours.find((h) => h.day === now.day);
  if (!today) return null;
  const open = !!today.open && !!today.close && now.minutes >= toMinutes(today.open) && now.minutes < toMinutes(today.close);
  return { today, open };
}

// Re-check once a minute; the snapshot is cached by a string key so React sees a stable value.
let cachedKey = "";
let cached: TodayStatus | null = null;
function getSnapshot() {
  const status = computeStatus();
  const key = status ? `${status.today.day}-${status.open}` : "none";
  if (key !== cachedKey) {
    cachedKey = key;
    cached = status;
  }
  return cached;
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

/** Today's hours in London, or null during server rendering. */
export function useTodayStatus() {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
