"use client";
import { useEffect } from "react";

export function SocketInitializer() {
  useEffect(() => {
    fetch("/api/socket")
      .then(() => console.log("✅ Socket.IO prewarmed"))
      .catch((err) => console.error("❌ Failed to init Socket.IO:", err));
  }, []);
  return null;
}
