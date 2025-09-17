// server/socket.ts
import { Server as IOServer } from "socket.io";
import { Server } from "http";

let io: IOServer | null = null;

export function initSocket(server: Server) {
  if (io) return io; // already initialized

  io = new IOServer(server, {
    path: "/api/socket",
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    socket.emit("notification", {
      type: "info",
      title: "Connected",
      message: "You are now connected to the notification service",
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}
