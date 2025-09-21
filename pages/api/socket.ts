// pages/api/socket.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { initIO } from "@/lib/socket";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // In Next.js, the Node server lives at res.socket.server
  // @ts-ignore - Next extends this at runtime
  const server = res.socket?.server;

  if (!server) {
    res.status(500).send("Server not ready");
    return;
  }

  // Only initialize once
  // @ts-ignore - attach a flag so we don't re-init on HMR
  if (!server.ioInited) {
    // @ts-ignore
    initIO(server);
    // @ts-ignore
    server.ioInited = true;
    console.log("🔌 Socket.IO server mounted on Next HTTP server");
  }

  res.end();
}
