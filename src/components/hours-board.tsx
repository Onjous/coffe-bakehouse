"use client";

import { hours, hoursNote } from "@/content/site";
import { formatRange } from "@/lib/hours";
import { useTodayStatus } from "@/lib/use-today";

/** Opening hours, set like an enamel sign. Today's row is marked once we know the London date. */
export function HoursBoard() {
  const status = useTodayStatus();
  const todayDay = status?.today.day;

  return (
    <div className="bg-glaze px-5 pb-7 pt-6 text-paper sm:px-8 sm:pb-9 sm:pt-8">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[1.7rem] leading-none sm:text-[2rem]">Opening hours</h3>
        <p className="label text-butter">Example hours</p>
      </div>
      <div className="milled-rule mt-5 text-paper" />
      <table className="lining mt-2 w-full text-[1.02rem] sm:text-[1.1rem]">
        <caption className="sr-only">Opening hours by day</caption>
        <tbody>
          {hours.map((d) => {
            const isToday = d.day === todayDay;
            return (
              <tr key={d.day} className="border-b border-paper/20 last:border-b-0" aria-current={isToday ? "date" : undefined}>
                <th scope="row" className="py-3 text-left font-normal">
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`size-2 rounded-full transition-colors ${isToday ? "bg-butter" : "bg-transparent"}`}
                    />
                    <span className={isToday ? "font-semibold" : ""}>{d.label}</span>
                    {isToday && <span className="label text-[0.68rem] text-butter">Today</span>}
                  </span>
                </th>
                <td className={`py-3 text-right ${isToday ? "font-semibold" : ""}`}>{formatRange(d)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-5 text-sm leading-relaxed text-paper">{hoursNote}</p>
    </div>
  );
}
