"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

/**
 * Live footer status strip.
 *
 * Two facts that are genuinely time-dependent, so they are worth computing
 * rather than hard-coding:
 *   - whether the Goregaon office is open right now, in Asia/Kolkata (the
 *     office runs Mon to Sat, 9:30 to 18:30 IST), and how long until it next
 *     opens or closes;
 *   - how many years of practice the firm is carrying, which ticks over on
 *     1 January.
 *
 * The server renders a stable, always-true snapshot ("Mon to Sat, 9:30 to 18:30
 * IST" and the current year count) so nothing shifts on hydration: the clock
 * only appears once the component is mounted and has read the real time.
 */

const IST = 5.5 * 60; // minutes, Mumbai has no daylight saving

/** Office hours in minutes from midnight IST. */
const OPEN = 9 * 60 + 30;
const CLOSE = 18 * 60 + 30;
/** Sunday is closed; the office runs Monday (1) to Saturday (6). */
const FOUNDED = 2000;

type Status = {
  open: boolean;
  /** "Closes in 2h 14m" / "Opens in 9h 05m" / "Closed until Monday 9:30" */
  detail: string;
  /** Wall clock in Mumbai, e.g. "14:32" */
  clock: string;
  /** Weekday in Mumbai, e.g. "Thu" */
  day: string;
};

/** Minutes since midnight in Mumbai for a given instant. */
function istMinutes(now: Date) {
  const utc = now.getUTCHours() * 60 + now.getUTCMinutes();
  return (utc + IST + 24 * 60) % (24 * 60);
}

/** 0 = Sunday. */
function istWeekday(now: Date) {
  // Shift the instant by +5:30, then read the UTC weekday of the shifted time.
  const shifted = new Date(now.getTime() + IST * 60 * 1000);
  return shifted.getUTCDay();
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function fmtClock(mins: number) {
  const h = Math.floor(mins / 60) % 24;
  const m = Math.round(mins % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function fmtGap(mins: number) {
  const h = Math.floor(mins / 60);
  const m = Math.round(mins % 60);
  if (h <= 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

function readStatus(now: Date): Status {
  const mins = Math.floor(istMinutes(now));
  const weekday = istWeekday(now);
  const isWorkday = weekday >= 1 && weekday <= 6;
  const open = isWorkday && mins >= OPEN && mins < CLOSE;

  let detail: string;
  if (open) {
    detail = `Closes in ${fmtGap(CLOSE - mins)}`;
  } else if (isWorkday && mins < OPEN) {
    detail = `Opens in ${fmtGap(OPEN - mins)}`;
  } else {
    // Walk forward to the next Monday-to-Saturday.
    let addDays = 1;
    while ((weekday + addDays) % 7 === 0) addDays += 1; // skip Sunday
    const next = (weekday + addDays) % 7;
    detail =
      addDays === 1
        ? `Opens tomorrow at ${fmtClock(OPEN)}`
        : `Opens ${DAY_NAMES[next]} at ${fmtClock(OPEN)}`;
  }

  return {
    open,
    detail,
    clock: fmtClock(mins),
    day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][weekday],
  };
}

export function FooterStatus() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const tick = () => setStatus(readStatus(new Date()));
    tick();
    // 20s keeps the minute hand honest without waking the tab more than needed.
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  // The calendar year is the same on the server and the client, so this is
  // safe to compute during render and never differs across hydration.
  const years = new Date().getFullYear() - FOUNDED;

  return (
    <div className="grid gap-px overflow-hidden border-b border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {/* office status */}
      <div className="flex items-start gap-3 bg-ink-900 px-4 py-4">
        <span className="relative mt-1 flex h-2 w-2 shrink-0">
          <span
            className={`hf-pulse absolute inline-flex h-full w-full rounded-full ${
              status?.open ? "bg-brand-300" : "bg-mist-500"
            }`}
            aria-hidden="true"
          />
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${
              status?.open ? "bg-brand-300" : "bg-mist-500"
            }`}
            aria-hidden="true"
          />
        </span>
        <div className="min-w-0">
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-mist-500">
            Office
          </p>
          <p className="mt-1 font-display text-[0.86rem] font-normal text-mist-100" aria-live="polite">
            {status ? (status.open ? "Open now" : "Closed") : "Mon to Sat"}
          </p>
          <p className="mt-0.5 truncate text-[0.72rem] font-light text-mist-400">
            {status ? status.detail : "9:30 to 18:30 IST"}
          </p>
        </div>
      </div>

      {/* Mumbai clock */}
      <div className="flex items-start gap-3 bg-ink-900 px-4 py-4">
        <Icon name="clock" size={13} className="mt-1 shrink-0 text-brand-300" />
        <div className="min-w-0">
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-mist-500">
            Mumbai
          </p>
          <p className="mt-1 font-display text-[0.86rem] font-normal tabular-nums text-mist-100">
            {status ? `${status.clock} IST` : "IST"}
          </p>
          <p className="mt-0.5 text-[0.72rem] font-light text-mist-400">
            {status ? status.day : "Asia/Kolkata"}
          </p>
        </div>
      </div>

      {/* years of practice */}
      <div className="flex items-start gap-3 bg-ink-900 px-4 py-4">
        <Icon name="spark" size={13} className="mt-1 shrink-0 text-brand-300" />
        <div className="min-w-0">
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-mist-500">
            Since {FOUNDED}
          </p>
          <p className="mt-1 font-display text-[0.86rem] font-normal tabular-nums text-mist-100">
            {years} years
          </p>
          <p className="mt-0.5 text-[0.72rem] font-light text-mist-400">
            One accountable team
          </p>
        </div>
      </div>

      {/* response promise */}
      <div className="flex items-start gap-3 bg-ink-900 px-4 py-4">
        <Icon name="shield-check" size={13} className="mt-1 shrink-0 text-brand-300" />
        <div className="min-w-0">
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-mist-500">
            Reply time
          </p>
          <p className="mt-1 font-display text-[0.86rem] font-normal text-mist-100">
            One business day
          </p>
          <p className="mt-0.5 text-[0.72rem] font-light text-mist-400">
            A real engineer answers
          </p>
        </div>
      </div>
    </div>
  );
}
