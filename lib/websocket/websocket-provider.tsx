"use client";

import type React from "react";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/auth-store";
import { useNotificationsStore } from "../store/notifications-store";

interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: string;
  userId?: string;
}

interface WebSocketContextType {
  socket: WebSocket | null;
  isConnected: boolean;
  sendMessage: (message: WebSocketMessage) => void;
  subscribe: (type: string, callback: (payload: any) => void) => () => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
}

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>(null);
  const subscribersRef = useRef<Map<string, Set<(payload: any) => void>>>(
    new Map()
  );

  const { user, isAuthenticated } = useAuthStore();
  const { addNotification } = useNotificationsStore();

  // Initialize WebSocket connection
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const connect = () => {
      try {
        // In production, this would be your WebSocket server URL
        const wsUrl =
          process.env.NODE_ENV === "production"
            ? "wss://your-websocket-server.com"
            : "ws://localhost:8080";

        const ws = new WebSocket(`${wsUrl}?userId=${user.id}&token=${user.id}`);

        ws.onopen = () => {
          console.log("WebSocket connected");
          setIsConnected(true);
          setSocket(ws);

          // Send authentication message
          ws.send(
            JSON.stringify({
              type: "auth",
              payload: { userId: user.id },
              timestamp: new Date().toISOString(),
            })
          );
        };

        ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            handleMessage(message);
          } catch (error) {
            console.error("Failed to parse WebSocket message:", error);
          }
        };

        ws.onclose = (event) => {
          console.log("WebSocket disconnected:", event.code, event.reason);
          setIsConnected(false);
          setSocket(null);

          // Attempt to reconnect after 3 seconds
          if (event.code !== 1000) {
            // Not a normal closure
            reconnectTimeoutRef.current = setTimeout(() => {
              console.log("Attempting to reconnect...");
              connect();
            }, 3000);
          }
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
      } catch (error) {
        console.error("Failed to create WebSocket connection:", error);
        // Retry connection after 5 seconds
        reconnectTimeoutRef.current = setTimeout(connect, 5000);
      }
    };

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socket) {
        socket.close(1000, "Component unmounting");
      }
    };
  }, [isAuthenticated, user]);

  // Handle incoming messages
  const handleMessage = (message: WebSocketMessage) => {
    const { type, payload } = message;

    // Notify subscribers
    const subscribers = subscribersRef.current.get(type);
    if (subscribers) {
      subscribers.forEach((callback) => callback(payload));
    }

    // Handle specific message types
    switch (type) {
      case "notification":
        addNotification({
          type: payload.type || "info",
          title: payload.title,
          message: payload.message,
          isRead: false,
          actionUrl: payload.actionUrl,
        });
        break;

      case "course_update":
        // Handle course updates
        console.log("Course updated:", payload);
        break;

      case "enrollment_update":
        // Handle enrollment updates
        console.log("Enrollment updated:", payload);
        break;

      case "message":
        // Handle chat messages
        console.log("New message:", payload);
        break;

      case "live_session_update":
        // Handle live session updates
        console.log("Live session update:", payload);
        break;

      case "assignment_graded":
        addNotification({
          type: "success",
          title: "Assignment Graded",
          message: `Your assignment "${payload.assignmentTitle}" has been graded!`,
          isRead: false,
          actionUrl: `/student/assignments/${payload.assignmentId}`,
        });
        break;

      case "new_course_available":
        addNotification({
          type: "info",
          title: "New Course Available",
          message: `Check out the new course: ${payload.courseTitle}`,
          isRead: false,
          actionUrl: `/courses/${payload.courseSlug}`,
        });
        break;

      case "mentorship_session_reminder":
        addNotification({
          type: "warning",
          title: "Session Reminder",
          message: `Your mentorship session starts in ${payload.minutesUntil} minutes`,
          isRead: false,
          actionUrl: `/student/mentorship`,
        });
        break;

      default:
        console.log("Unhandled message type:", type, payload);
    }
  };

  // Send message through WebSocket
  const sendMessage = (message: WebSocketMessage) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket not connected, message not sent:", message);
    }
  };

  // Subscribe to specific message types
  const subscribe = (type: string, callback: (payload: any) => void) => {
    if (!subscribersRef.current.has(type)) {
      subscribersRef.current.set(type, new Set());
    }
    subscribersRef.current.get(type)!.add(callback);

    // Return unsubscribe function
    return () => {
      const subscribers = subscribersRef.current.get(type);
      if (subscribers) {
        subscribers.delete(callback);
        if (subscribers.size === 0) {
          subscribersRef.current.delete(type);
        }
      }
    };
  };

  const value: WebSocketContextType = {
    socket,
    isConnected,
    sendMessage,
    subscribe,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}

      {/* Connection Status Indicator */}
      {isAuthenticated && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              isConnected
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}>
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-400" : "bg-red-400"
              } ${isConnected ? "animate-pulse" : ""}`}
            />
            {isConnected ? "Connected" : "Disconnected"}
          </div>
        </div>
      )}
    </WebSocketContext.Provider>
  );
}

// Custom hooks for specific real-time features
export function useRealTimeNotifications() {
  const { subscribe } = useWebSocket();
  const { addNotification } = useNotificationsStore();

  useEffect(() => {
    const unsubscribe = subscribe("notification", (payload) => {
      addNotification({
        type: payload.type || "info",
        title: payload.title,
        message: payload.message,
        isRead: false,
        actionUrl: payload.actionUrl,
      });
    });

    return unsubscribe;
  }, [subscribe, addNotification]);
}

export function useRealTimeCourseUpdates(
  courseId: string,
  onUpdate: (update: any) => void
) {
  const { subscribe } = useWebSocket();

  useEffect(() => {
    const unsubscribe = subscribe("course_update", (payload) => {
      if (payload.courseId === courseId) {
        onUpdate(payload);
      }
    });

    return unsubscribe;
  }, [subscribe, courseId, onUpdate]);
}

export function useRealTimeChat(
  roomId: string,
  onMessage: (message: any) => void
) {
  const { subscribe, sendMessage } = useWebSocket();

  useEffect(() => {
    const unsubscribe = subscribe("message", (payload) => {
      if (payload.roomId === roomId) {
        onMessage(payload);
      }
    });

    return unsubscribe;
  }, [subscribe, roomId, onMessage]);

  const sendChatMessage = (message: string) => {
    sendMessage({
      type: "message",
      payload: {
        roomId,
        message,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
  };

  return { sendChatMessage };
}
