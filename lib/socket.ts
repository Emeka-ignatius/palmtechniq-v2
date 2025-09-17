// lib/socket.ts
import { Server as IOServer } from "socket.io";

let io: IOServer | null = null;

export function getIO() {
  if (!io) throw new Error("Socket.IO server not initialized");
  return io;
}

export function setIO(newIO: IOServer) {
  io = newIO;
}
