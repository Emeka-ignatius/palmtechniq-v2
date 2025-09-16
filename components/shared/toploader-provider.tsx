"use client";

import type React from "react";
import { CyberToploader } from "../ui/top-loader";

interface ToploaderProviderProps {
  children: React.ReactNode;
  color?: string;
  height?: number;
  showSpinner?: boolean;
  crawlSpeed?: number;
  speed?: number;
}

export function ToploaderProvider({
  children,
  color = "linear-gradient(90deg, #00D4FF 0%, #8B5CF6 50%, #F472B6 100%)",
  height = 4,
  showSpinner = true,
  crawlSpeed = 200,
  speed = 300,
}: ToploaderProviderProps) {
  return (
    <>
      <CyberToploader
        color={color}
        height={height}
        showSpinner={showSpinner}
        crawlSpeed={crawlSpeed}
        speed={speed}
      />
      {children}
    </>
  );
}
