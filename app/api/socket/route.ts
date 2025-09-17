import { NextRequest } from "next/server";
import { Server as IOServer } from "socket.io";
import { getIO, setIO } from "@/lib/socket";

let io: IOServer | null = null;

export async function GET(req: NextRequest) {
  // If already initialized, just return 200
  if (io) {
    return new Response("Socket.IO already running", { status: 200 });
  }

  console.log("🔌 Initializing Socket.IO server...");

  // Attach to the same HTTP server Next.js uses
  // @ts-ignore – we’ll use the global to persist across hot reloads
  if (!(global as any).io) {
    // Create new instance
    const ioServer = new IOServer({
      path: "/api/socket",
      cors: {
        origin: "*",
      },
    });

    // Handle connections
    ioServer.on("connection", (socket) => {
      console.log("✅ Client connected:", socket.id);

      // Example notification
      socket.emit("notification", {
        type: "info",
        title: "Connected",
        message: "You are now connected to the notification service",
      });

      socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
      });
    });

    // Save globally so it survives hot reloads
    (global as any).io = ioServer;
    setIO(ioServer);
    io = ioServer;
  }

  return new Response("Socket.IO server started", { status: 200 });
}
