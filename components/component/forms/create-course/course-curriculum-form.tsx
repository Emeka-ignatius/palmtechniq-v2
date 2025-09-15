"use client";

import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LessonUploadFile from "@/components/shared/lesson-uploader";
import { Dispatch, SetStateAction } from "react";

interface CourseLesson {
  id: string;
  title: string;
  lessonType: "VIDEO";
  duration: number;
  content?: string;
  description?: string;
  videoUrl?: string;
  sortOrder: number;
  isPreview: boolean;
}

interface CourseModule {
  id: string;
  title: string;
  description?: string;
  content?: string;
  duration: number;
  lessons: CourseLesson[];
  sortOrder: number;
  isPublished: boolean;
}

interface CourseCurriculumFormProps {
  modules: CourseModule[];
  addModule: () => void;
  removeModule: (e: React.MouseEvent, moduleId: string) => void;
  updateModule: (moduleId: string, updates: Partial<CourseModule>) => void;
  addLesson: (moduleId: string, courseId?: string) => void;
  removeLesson: (
    e: React.MouseEvent,
    moduleId: string,
    lessonId: string
  ) => void;
  updateLesson: (
    moduleId: string,
    lessonId: string,
    updates: Partial<CourseLesson>
  ) => void;
  lessonUploading: boolean;
  setLessonUploading: Dispatch<SetStateAction<boolean>>;
}

export function CourseCurriculumForm({
  modules,
  addModule,
  removeModule,
  updateModule,
  addLesson,
  removeLesson,
  updateLesson,
  lessonUploading,
  setLessonUploading,
}: CourseCurriculumFormProps) {
  return (
    <Card className="glass-card border-white/10">
      <div className="flex justify-between mx-3 my-4 items-center">
        <h3 className="text-xl font-semibold text-white">Course Curriculum</h3>
        <Button
          type="button"
          onClick={addModule}
          className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Module
        </Button>
      </div>
      {/* <CardHeader>
        <CardTitle className="text-white">Course Curriculum</CardTitle>
      </CardHeader>*/}
      <CardContent className="space-y-6">
        {/* <Button
          type="button"
          onClick={() => addModule()}
          className="w-full bg-gradient-to-r from-neon-blue to-neon-purple">
          <Plus className="w-4 h-4 mr-2" />
          Add Module
        </Button>  */}

        {modules.map((module) => (
          <Card key={module.id} className="glass-card border-white/20 mt-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Input
                  value={module.title}
                  onChange={(e) =>
                    updateModule(module.id, { title: e.target.value })
                  }
                  className="bg-transparent border-0 text-white text-lg font-semibold"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => removeModule(e, module.id)}
                  className="text-red-400">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Textarea
                value={module.description}
                onChange={(e) =>
                  updateModule(module.id, { description: e.target.value })
                }
                placeholder="Module description"
                className="mt-2 bg-white/10 border-white/20 text-white"
              />
              <Textarea
                value={module.content}
                onChange={(e) =>
                  updateModule(module.id, { content: e.target.value })
                }
                placeholder="Module content"
                className="mt-2 bg-white/10 border-white/20 text-white"
              />
              <Input
                type="number"
                value={module.duration}
                onChange={(e) =>
                  updateModule(module.id, { duration: Number(e.target.value) })
                }
                placeholder="Module duration (minutes)"
                className="mt-2 bg-white/10 border-white/20 text-white"
              />
            </CardHeader>

            <CardContent>
              <Button
                type="button"
                onClick={() => addLesson(module.id)}
                className="w-full bg-gradient-to-r from-neon-green to-emerald-400">
                <Plus className="w-4 h-4 mr-2" />
                Add Lesson
              </Button>

              {module.lessons.map((lesson) => (
                <div key={lesson.id} className="mt-4 p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <Input
                      value={lesson.title}
                      onChange={(e) =>
                        updateLesson(module.id, lesson.id, {
                          title: e.target.value,
                        })
                      }
                      className="bg-white/10 border-white/20 border-0 text-white"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => removeLesson(e, module.id, lesson.id)}
                      className="text-red-400">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <Textarea
                    value={lesson.description || ""}
                    onChange={(e) =>
                      updateLesson(module.id, lesson.id, {
                        description: e.target.value,
                      })
                    }
                    placeholder="Lesson description"
                    className="mt-2 bg-white/10 border-white/20 text-white"
                  />

                  <Select
                    value={lesson.lessonType}
                    onValueChange={(value) =>
                      updateLesson(module.id, lesson.id, {
                        lessonType: value as any,
                      })
                    }>
                    <SelectTrigger className="mt-2 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VIDEO">Video</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    placeholder="Duration (minutes)"
                    value={lesson.duration}
                    onChange={(e) =>
                      updateLesson(module.id, lesson.id, {
                        duration: Number(e.target.value),
                      })
                    }
                    className="mt-2 bg-white/10 border-white/20 text-white"
                  />

                  {lesson.lessonType === "VIDEO" && (
                    <LessonUploadFile
                      uploading={lessonUploading}
                      setUploading={setLessonUploading}
                      onUploadSuccess={(url) =>
                        updateLesson(module.id, lesson.id, { videoUrl: url })
                      }
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
