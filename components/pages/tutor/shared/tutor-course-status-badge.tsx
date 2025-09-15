"use client";

import { Badge } from "@/components/ui/badge";

export function TutorCourseStatusBadge({
  status,
  isPopular,
}: {
  status: "draft" | "published";
  isPopular?: boolean;
}) {
  return (
    <div className="flex gap-2">
      <Badge
        variant={status === "published" ? "success" : "secondary"}
        className="capitalize">
        {status}
      </Badge>
      {isPopular && (
        <Badge variant="destructive" className="bg-orange-500 text-white">
          🔥 Popular
        </Badge>
      )}
    </div>
  );
}
