// components/notifications/notification-dropdown.tsx
"use client";

import { useTimeAgo } from "@/hooks/useTimeAgo"; // (you won’t use it directly here anymore)
import { useNotificationsStore } from "@/lib/store/notifications-store";
import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NotificationItem } from "./notification-item";
import { Button } from "../ui/button";

export function NotificationsDropdown() {
  const {
    notifications,
    isOpen,
    toggleDropdown,
    markAsRead,
    removeNotification,
    clearAll,
  } = useNotificationsStore();

  const unreadCount = useNotificationsStore((s) => s.unreadCount());
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) toggleDropdown();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleDropdown]);

  useEffect(() => setMounted(true), []);
  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
        <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        {mounted && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
          <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Notifications
            </h3>
            <Button
              onClick={clearAll}
              className="text-xs text-red-500 hover:underline">
              Clear All
            </Button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  n={n}
                  onMarkAsRead={markAsRead}
                  onRemove={removeNotification}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
