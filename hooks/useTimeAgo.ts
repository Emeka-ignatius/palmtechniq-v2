"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

/**
 * A hook that returns a "time ago" string like "2m ago" or "3h ago".
 * It auto-updates every minute so the value stays fresh.
 */
export function useTimeAgo(date: Date | string | number) {
  const [timeAgo, setTimeAgo] = useState(() =>
    formatDistanceToNow(new Date(date), { addSuffix: true })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(formatDistanceToNow(new Date(date), { addSuffix: true }));
    }, 60 * 1000); // update every 1 minute

    return () => clearInterval(interval);
  }, [date]);

  return timeAgo;
}
