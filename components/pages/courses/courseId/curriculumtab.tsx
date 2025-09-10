"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown, Play, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CurriculumTab({
  modules,
}: {
  modules: {
    id: string;
    title: string;
    duration?: number | null;
    lessons: {
      id: string;
      title: string;
      duration?: number | null;
      isPreview?: boolean;
    }[];
  }[];
}) {
  const [openModule, setOpenModule] = useState<string | null>(null);

  const toggleModule = (id: string) => {
    setOpenModule(openModule === id ? null : id);
  };

  const handlePreviewLesson = (title: string) => {
    console.log("Preview lesson:", title);
    // Later: connect this to CoursePreviewModal
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4">
      {modules.length === 0 ? (
        <p className="text-gray-400">No curriculum available yet.</p>
      ) : (
        modules.map((module) => {
          const isOpen = openModule === module.id;
          return (
            <Card key={module.id} className="glass-card border-white/10">
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleModule(module.id)}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">
                    {module.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <span>{module.lessons.length} lessons</span>
                    <span>{module.duration || 0} mins</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </CardHeader>

              {isOpen && (
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                        {/* Lesson Info */}
                        <div className="flex items-center space-x-3 flex-1">
                          {lesson.isPreview ? (
                            <Play className="w-4 h-4 text-neon-blue" />
                          ) : (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                          <span className="text-gray-300 flex-1">
                            {lesson.title}
                          </span>
                          {lesson.isPreview && (
                            <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30 text-xs">
                              Preview
                            </Badge>
                          )}
                        </div>

                        {/* Duration + Preview Btn */}
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-400 text-sm">
                            {lesson.duration || 0} mins
                          </span>
                          {lesson.isPreview && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handlePreviewLesson(lesson.title)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-neon-blue hover:bg-neon-blue/20">
                              Preview
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </CardContent>
              )}
            </Card>
          );
        })
      )}
    </motion.div>
  );
}
