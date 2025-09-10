"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  BookOpen,
  Users,
  Trophy,
  Wallet,
  Calendar,
  Star,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: "success" | "info" | "warning" | "error";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Course Completed!",
    message: "Congratulations! You've completed 'Advanced React Development'",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isRead: false,
    actionUrl: "/student/courses",
    icon: Trophy,
  },
  {
    id: "2",
    type: "info",
    title: "New Assignment Available",
    message:
      "Your instructor has posted a new assignment for 'Python Data Science'",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isRead: false,
    actionUrl: "/student/assignments",
    icon: BookOpen,
  },
  {
    id: "3",
    type: "success",
    title: "Payment Received",
    message: "You've received ₦89.99 for your course 'Web Development Basics'",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: true,
    actionUrl: "/tutor/wallet",
    icon: Wallet,
  },
  {
    id: "4",
    type: "info",
    title: "Mentorship Session Reminder",
    message: "Your session with Sarah Johnson starts in 1 hour",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    isRead: false,
    actionUrl: "/student/mentorship",
    icon: Calendar,
  },
  {
    id: "5",
    type: "warning",
    title: "Course Review Needed",
    message: "Please review your completed course to help other students",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    isRead: true,
    actionUrl: "/student/courses",
    icon: Star,
  },
  {
    id: "6",
    type: "success",
    title: "New Student Enrolled",
    message: "John Doe has enrolled in your 'JavaScript Fundamentals' course",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    isRead: true,
    actionUrl: "/tutor/students",
    icon: Users,
  },
  {
    id: "7",
    type: "info",
    title: "Special Offer Available",
    message: "Get 20% off on all premium courses this week!",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    actionUrl: "/courses",
    icon: Gift,
  },
];

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const getNotificationIcon = (notification: Notification) => {
    if (notification.icon) {
      return <notification.icon className="w-4 h-4" />;
    }

    switch (notification.type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-400" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-400";
      case "error":
        return "border-l-red-400";
      case "warning":
        return "border-l-yellow-400";
      default:
        return "border-l-blue-400";
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - timestamp.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `₦{diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `₦{Math.floor(diffInMinutes / 60)}h ago`;
    return `₦{Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="relative">
      {/* Notification Trigger */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="icon"
          className="hover-glow relative"
          onClick={() => setIsOpen(!isOpen)}>
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-neon-pink text-white text-xs px-1.5 py-0.5 rounded-full animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </motion.div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Content */}
            <motion.div
              className="absolute right-0 top-full mt-2 w-96 glass-card border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}>
              {/* Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Notifications
                  </h3>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs text-neon-blue hover:text-neon-blue/80">
                        Mark all read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="w-6 h-6 hover:bg-white/10">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-400 mt-1">
                    You have {unreadCount} unread notification
                    {unreadCount !== 1 ? "s" : ""}
                  </p>
                )}
              </div>

              {/* Notifications List */}
              <ScrollArea className="h-96">
                <div className="p-2">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8">
                      <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400">No notifications yet</p>
                      <p className="text-gray-500 text-sm">
                        We'll notify you when something happens
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {notifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          className={`
                            p-3 rounded-lg border-l-4 cursor-pointer transition-all duration-200
                            ₦{getNotificationColor(notification.type)}
                            ₦{notification.isRead ? "bg-white/5 hover:bg-white/10" : "bg-white/10 hover:bg-white/15"}
                          `}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            if (!notification.isRead)
                              markAsRead(notification.id);
                            if (notification.actionUrl) {
                              window.location.href = notification.actionUrl;
                            }
                          }}>
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {getNotificationIcon(notification)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4
                                  className={`text-sm font-medium ₦{notification.isRead ? "text-gray-300" : "text-white"}`}>
                                  {notification.title}
                                </h4>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <span className="text-xs text-gray-500">
                                    {formatTimeAgo(notification.timestamp)}
                                  </span>
                                  {!notification.isRead && (
                                    <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                                  )}
                                </div>
                              </div>
                              <p
                                className={`text-sm mt-1 ₦{notification.isRead ? "text-gray-400" : "text-gray-300"}`}>
                                {notification.message}
                              </p>
                              {notification.actionUrl && (
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-neon-blue hover:text-neon-blue/80">
                                    View details →
                                  </span>
                                </div>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-6 h-6 opacity-0 group-hover:opacity-100 hover:bg-white/10 flex-shrink-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}>
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-white/10">
                  <Button
                    variant="ghost"
                    className="w-full text-sm text-gray-400 hover:text-white hover:bg-white/10">
                    View all notifications
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
