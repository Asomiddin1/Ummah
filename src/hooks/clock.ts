import { useCallback, useEffect, useRef, useState } from "react";

// ─── Yordamchi ────────────────────────────────────────────────────────────────
const timeToMinutes = (t: string): number => {
  if (!t) return 0;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

// ─── useClock: har soniyada yangilanadigan vaqt ───────────────────────────────
export const useClock = () => {
  const [now, setNow] = useState(new Date());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setNow(new Date()), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return now;
};

// ─── useNextPrayer: keyingi namozni hisoblash ─────────────────────────────────
type Timings = {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  [key: string]: string;
};

type NextPrayer = {
  name: string;
  key: string;
  time: string;
  diff: number;
};

export const useNextPrayer = (
  timings: Timings | null,
  now: Date
): NextPrayer | null => {
  return useCallback(() => {
    if (!timings) return null;

    const prayerList = [
      { name: "Bomdod", key: "fajr",    time: timings.fajr },
      { name: "Peshin", key: "dhuhr",   time: timings.dhuhr },
      { name: "Asr",    key: "asr",     time: timings.asr },
      { name: "Shom",   key: "maghrib", time: timings.maghrib },
      { name: "Xufton", key: "isha",    time: timings.isha },
    ];

    const nowMin = now.getHours() * 60 + now.getMinutes();

    for (const p of prayerList) {
      const diff = timeToMinutes(p.time) - nowMin;
      if (diff > 0) return { ...p, diff };
    }

    const tomorrowDiff =
      24 * 60 - nowMin + timeToMinutes(timings.fajr);
    return {
      name: "Bomdod (ertaga)",
      key: "fajr",
      time: timings.fajr,
      diff: tomorrowDiff,
    };
  }, [timings, now])();
};