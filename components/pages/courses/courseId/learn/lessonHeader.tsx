"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function LessonHeader({
  course,
  currentLesson,
  onMarkComplete,
}: {
  course: CourseForHeader;
  currentLesson: Lesson;
  onMarkComplete?: (lessonId: string) => void;
}) {
  const router = useRouter();

  // Flatten lessons and keep order
  const allLessons: Lesson[] = course.modules?.flatMap((m) => m.lessons) ?? [];

  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const lessonNumber = currentIndex >= 0 ? currentIndex + 1 : 1;
  const totalLessons = allLessons.length;

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  const goToLesson = (lessonId: string) => {
    // Build path: /courses/[course.id]/learn?lesson=lessonId
    router.push(
      `/courses/${course.id}/learn?lesson=${encodeURIComponent(lessonId)}`
    );
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/courses/${course.id}`)}
          className="text-gray-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to course
        </Button>

        <div>
          <h2 className="text-2xl font-bold text-white">
            {currentLesson.title}
          </h2>
          <div className="text-sm text-gray-400">
            {course.title} • Lesson {lessonNumber} of {totalLessons}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => prevLesson && goToLesson(prevLesson.id)}
          disabled={!prevLesson}
          className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        {onMarkComplete ? (
          <Button
            className="bg-gradient-to-r from-neon-green to-emerald-400 text-white"
            size="sm"
            onClick={() => onMarkComplete(currentLesson.id)}>
            Mark as Complete
          </Button>
        ) : null}

        <Button
          variant="outline"
          size="sm"
          onClick={() => nextLesson && goToLesson(nextLesson.id)}
          disabled={!nextLesson}
          className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50">
          Next
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
