"use client";

import { Progress } from "@/components/ui/progress";

export function TutorCourseProgress({
  completionRate,
  updatedAt,
}: {
  completionRate: number;
  updatedAt: string;
}) {
  return (
    <div className="mt-4">
      <p className="text-sm text-gray-400 mb-1">
        Completion Rate: {completionRate}%
      </p>
      <Progress value={completionRate} className="h-2" />
      <p className="text-xs text-gray-500 mt-2">
        Updated {new Date(updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
}
