"use client";

import { useTimeAgo } from "@/hooks/useTimeAgo";
import { useNotificationsStore } from "@/lib/store/notifications-store";
import { Bell, X } from "lucide-react";
import { useEffect, useRef } from "react";

export function NotificationsDropdown() {
  const {
    notifications,
    unreadCount,
    isOpen,
    toggleDropdown,
    markAsRead,
    removeNotification,
    clearAll,
  } = useNotificationsStore();

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
        <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
          <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Notifications
            </h3>
            <button
              onClick={clearAll}
              className="text-xs text-red-500 hover:underline">
              Clear All
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((n: any) => {
                const timeAgo = useTimeAgo(n.createdAt);

                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      !n.isRead ? "bg-gray-100 dark:bg-gray-800/50" : ""
                    }`}
                    onClick={() => markAsRead(n.id)}>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {n.message}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">{timeAgo}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(n.id);
                      }}
                      className="text-gray-400 hover:text-red-500">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
