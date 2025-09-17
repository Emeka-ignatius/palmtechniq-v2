"use client";
import { io, Socket } from "socket.io-client";
import { createContext, useContext, useEffect, useRef } from "react";
import { useNotificationsStore } from "@/lib/store/notifications-store";

const WebSocketContext = createContext<{ socket: Socket | null }>({
  socket: null,
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const socketRef = useRef<Socket | null>(null);
  const addNotification = useNotificationsStore((s) => s.addNotification);

  useEffect(() => {
    fetch("/api/socket");

    const socket = io({
      path: "/api/socket",
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Socket.IO connected:", socket.id);
    });

    socket.on("notification", (data) => {
      console.log("📩 Incoming notification:", data);
      addNotification({
        type: data.type,
        title: data.title,
        message: data.message,
        actionUrl: data.actionUrl,
        actionLabel: data.actionLabel,
        metadata: data.metadata,
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket.IO disconnected");
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [addNotification]);

  return (
    <WebSocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </WebSocketContext.Provider>
  );
};
