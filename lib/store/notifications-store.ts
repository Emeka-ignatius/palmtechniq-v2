import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Notification {
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
    notification: Omit<Notification, "id" | "createdAt" | "isRead">
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

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      isOpen: false,

      addNotification: (notificationData) => {
        const notification: Notification = {
          ...notificationData,
          id: Date.now().toString(), // simple unique id
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

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          ),
          unreadCount: Math.max(
            0,
            state.unreadCount -
              (state.notifications.find((n) => n.id === id && !n.isRead)
                ? 1
                : 0)
          ),
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({
            ...n,
            isRead: true,
          })),
          unreadCount: 0,
        }));
      },

      removeNotification: (id) => {
        set((state) => {
          const wasUnread = state.notifications.find(
            (n) => n.id === id && !n.isRead
          );
          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: wasUnread
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount,
          };
        });
      },

      clearAll: () => {
        set({ notifications: [], unreadCount: 0 });
      },

      toggleDropdown: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openDropdown: () => set({ isOpen: true }),
      closeDropdown: () => set({ isOpen: false }),

      getUnreadNotifications: () =>
        get().notifications.filter((n) => !n.isRead),

      getNotificationsByType: (type: string) =>
        get().notifications.filter((n) => n.type === type),
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

// ✅ Optional helper functions for common notification events
export const notificationHelpers = {
  courseEnrollment: (courseTitle: string) => {
    useNotificationsStore.getState().addNotification({
      type: "success",
      title: "Course Enrollment Successful",
      message: `You've successfully enrolled in ${courseTitle}`,
      actionUrl: "/student/courses",
      actionLabel: "View Courses",
    });
  },

  paymentSuccess: (amount: number, courseTitle: string) => {
    useNotificationsStore.getState().addNotification({
      type: "success",
      title: "Payment Successful",
      message: `Payment of ₦${amount} for ${courseTitle} has been processed`,
      actionUrl: "/student/courses",
      actionLabel: "View Courses",
    });
  },

  assignmentDue: (assignmentTitle: string, dueDate: string) => {
    useNotificationsStore.getState().addNotification({
      type: "warning",
      title: "Assignment Due Soon",
      message: `${assignmentTitle} is due on ${dueDate}`,
      actionUrl: "/student/assignments",
      actionLabel: "View Assignment",
    });
  },

  newMessage: (senderName: string) => {
    useNotificationsStore.getState().addNotification({
      type: "info",
      title: "New Message",
      message: `You have a new message from ${senderName}`,
      actionUrl: "/messages",
      actionLabel: "View Messages",
    });
  },
};
