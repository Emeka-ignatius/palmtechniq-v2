import { cn } from "@/lib/utils";

export function NairaSign({ className }: { className?: string }) {
  return <span className={cn("inline-block font-bold", className)}>₦</span>;
}
