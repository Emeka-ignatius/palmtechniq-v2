"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  duration: number; // in seconds
  isCompleted: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export default function LessonSidebar({
  courseTitle,
  modules,
  currentLessonId,
  onChangeLesson,
}: {
  courseTitle: string;
  modules: Module[];
  currentLessonId: string;
  onChangeLesson: (lesson: Lesson) => void;
}) {
  const allLessons = modules.flatMap((m) => m.lessons);

  const completedLessons = allLessons.filter((l) => l.isCompleted).length;
  const totalLessons = allLessons.length;
  const progress =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="w-80 p-6 border-l border-white/10">
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white">{courseTitle}</CardTitle>
          <Progress value={progress} className="mt-2" />
          <p className="text-sm text-gray-400 mt-1">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {modules.map((module) => {
                const moduleCompleted = module.lessons.every(
                  (lesson) => lesson.isCompleted
                );

                return (
                  <div key={module.id}>
                    {/* Module header */}
                    <div className="flex items-center gap-2 mb-2">
                      {moduleCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                      <h4 className="font-medium text-white">{module.title}</h4>
                    </div>

                    {/* Lessons inside module */}
                    <div className="ml-7 space-y-2">
                      {module.lessons.map((lesson) => {
                        const isActive = lesson.id === currentLessonId;

                        return (
                          <Button
                            key={lesson.id}
                            variant="ghost"
                            className={`w-full text-left justify-start p-2 rounded-lg transition-colors ${
                              isActive
                                ? "bg-neon-blue/20 border border-neon-blue/30"
                                : "hover:bg-white/5"
                            }`}
                            onClick={() => onChangeLesson(lesson)}>
                            <div className="flex flex-col items-start w-full">
                              <div className="flex items-center gap-2 w-full">
                                {lesson.isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                ) : (
                                  <Circle className="w-4 h-4 text-gray-400" />
                                )}
                                <span
                                  className={`text-sm ${
                                    isActive ? "text-white" : "text-gray-300"
                                  }`}>
                                  {lesson.title}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 ml-6 mt-1">
                                {Math.floor(lesson.duration)} min
                              </p>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
