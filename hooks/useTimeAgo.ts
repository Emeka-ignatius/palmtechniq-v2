"use client";

import { useEffect, useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";

/**
 * A hook that returns a "time ago" string like "2m ago" or "3h ago".
 * It auto-updates immediately so the value stays fresh.
 */
export function useTimeAgo(date: Date | string | number) {
  const parsed = useMemo(() => new Date(date), [date]);

  const safeFormat = (d: Date) =>
    isNaN(d.getTime()) ? "" : formatDistanceToNow(d, { addSuffix: true });

  const [timeAgo, setTimeAgo] = useState(() => safeFormat(parsed));
  useEffect(() => {
    setTimeAgo(safeFormat(parsed)); // update immediately on prop change
    const id = setInterval(() => setTimeAgo(safeFormat(parsed)), 60_000);
    return () => clearInterval(id);
  }, [parsed]);

  return timeAgo;
}
