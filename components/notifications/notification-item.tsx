"use client";

import { ArrowUpRight, X } from "lucide-react";
import { useTimeAgo } from "@/hooks/useTimeAgo";
import { isExternal } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

type Notification = {
  id: string;
  title: string;
  message: string;
  isRead?: boolean;
  createdAt: string | number | Date;
  actionUrl?: string;
  actionLabel?: string;
};

isExternal;

export function NotificationItem({
  n,
  onMarkAsRead,
  onRemove,
}: {
  n: Notification;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const timeAgo = useTimeAgo(n.createdAt); // ✅ safe: top-level hook
  const router = useRouter();

  const handleRowClick = () => {
    onMarkAsRead(n.id);
    if (n.actionUrl) {
      if (isExternal(n.actionUrl)) {
        window.open(n.actionUrl, "_blank", "noopener,noreferrer");
      } else {
        router.push(n.actionUrl);
      }
    }
  };

  return (
    <div
      className={`group flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 ${
        !n.isRead ? "bg-gray-100 dark:bg-gray-800/50" : ""
      }`}
      onClick={handleRowClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && handleRowClick()
      }>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {n.title}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">{n.message}</p>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-gray-500 text-[11px]">{timeAgo}</p>

          {/* Inline CTA if present */}
          {n.actionUrl && (
            <>
              <span className="text-gray-400">•</span>
              {isExternal(n.actionUrl) ? (
                <a
                  href={n.actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[11px] font-medium underline hover:no-underline"
                  onClick={(e) => e.stopPropagation()}>
                  {n.actionLabel ?? "Open"}{" "}
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </a>
              ) : (
                <Link
                  href={n.actionUrl}
                  className="inline-flex items-center text-[11px] font-medium underline hover:no-underline"
                  onClick={(e) => e.stopPropagation()}>
                  {n.actionLabel ?? "Open"}{" "}
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(n.id);
        }}
        aria-label="Dismiss notification"
        className="text-gray-400 hover:text-red-500">
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
