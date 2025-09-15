import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Notification {
  id: string;
  type:
    | "info"
    | "success"
    | "warning"
    | "error"
    | "course"
    | "payment"
    | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: Record<string, any>;
}

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  isOpen: boolean;

  // Actions
  addNotification: (
    notification: Omit<Notification, "id" | "createdAt">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  toggleDropdown: () => void;
  openDropdown: () => void;
  closeDropdown: () => void;

  // Computed
  getUnreadNotifications: () => Notification[];
  getNotificationsByType: (type: string) => Notification[];
}

// Mock notifications for demo
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "course",
    title: "New Course Available",
    message: "Advanced React Patterns is now available for enrollment",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    actionUrl: "/courses/advanced-react-patterns",
    actionLabel: "View Course",
  },
  {
    id: "2",
    type: "success",
    title: "Payment Successful",
    message: "Your payment for Python Masterclass has been processed",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    actionUrl: "/student/courses",
    actionLabel: "View Courses",
  },
  {
    id: "3",
    type: "info",
    title: "Assignment Due Soon",
    message: "Your React project assignment is due in 2 days",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    actionUrl: "/student/assignments",
    actionLabel: "View Assignment",
  },
  {
    id: "3",
    type: "system",
    title: "Maintenance scheduled",
    message: "System maintenance is scheduled for tonight at 2 AM EST",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: mockNotifications,
      unreadCount: mockNotifications.filter((n) => !n.isRead).length,
      isOpen: false,

      addNotification: (notificationData) => {
        const notification: Notification = {
          ...notificationData,
          id: Date.now().toString(),
          createdAt: new Date(),
          isRead: false,
        };

        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }));

        // Show browser notification if permission granted
        if (typeof window !== "undefined" && "Notification" in window) {
          if (Notification.permission === "granted") {
            new Notification(notification.title, {
              body: notification.message,
              icon: "/favicon.ico",
            });
          }
        }
      },

      markAsRead: (id: string) => {
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id
              ? { ...notification, isRead: true }
              : notification
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            isRead: true,
          })),
          unreadCount: 0,
        }));
      },

      removeNotification: (id: string) => {
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          const wasUnread = notification && !notification.isRead;

          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: wasUnread
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount,
          };
        });
      },

      clearAll: () => {
        set({
          notifications: [],
          unreadCount: 0,
        });
      },

      toggleDropdown: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openDropdown: () => {
        set({ isOpen: true });
      },

      closeDropdown: () => {
        set({ isOpen: false });
      },

      getUnreadNotifications: () => {
        return get().notifications.filter(
          (notification) => !notification.isRead
        );
      },

      getNotificationsByType: (type: string) => {
        return get().notifications.filter(
          (notification) => notification.type === type
        );
      },
    }),
    {
      name: "notifications-storage",
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount,
      }),
    }
  )
);

// Helper functions for common notification types
export const notificationHelpers = {
  courseEnrollment: (courseTitle: string) => {
    useNotificationsStore.getState().addNotification({
      type: "success",
      title: "Course Enrollment Successful",
      message: `You've successfully enrolled in ${courseTitle}`,
      actionUrl: "/student/courses",
      actionLabel: "View Courses",
      isRead: false, // REMOVE this line if present
    });
  },

  paymentSuccess: (amount: number, courseTitle: string) => {
    useNotificationsStore.getState().addNotification({
      type: "success",
      title: "Payment Successful",
      message: `Payment of ₦${amount} for ${courseTitle} has been processed`,
      actionUrl: "/student/courses",
      actionLabel: "View Courses",
      isRead: false, // REMOVE this line if present
    });
  },

  assignmentDue: (assignmentTitle: string, dueDate: string) => {
    useNotificationsStore.getState().addNotification({
      type: "warning",
      title: "Assignment Due Soon",
      message: `${assignmentTitle} is due on ${dueDate}`,
      actionUrl: "/student/assignments",
      actionLabel: "View Assignment",
      isRead: false, // REMOVE this line if present
    });
  },

  newMessage: (senderName: string) => {
    useNotificationsStore.getState().addNotification({
      type: "info",
      title: "New Message",
      message: `You have a new message from ${senderName}`,
      actionUrl: "/messages",
      actionLabel: "View Messages",
      isRead: false, // REMOVE this line if present
    });
  },
};
