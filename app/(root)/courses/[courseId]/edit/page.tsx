"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Save,
  Eye,
  Trash2,
  Plus,
  Edit,
  Upload,
  Play,
  FileText,
  Settings,
  DollarSign,
  BookOpen,
  Target,
} from "lucide-react";
import { toast } from "sonner";
import { Navigation } from "@/components/navigation";
import type { UserRole } from "@/types/user";

interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
  isPublished: boolean;
  order: number;
}

interface CourseLesson {
  id: string;
  title: string;
  type: "video" | "text" | "quiz" | "assignment";
  duration: number;
  content?: string;
  videoUrl?: string;
  isPublished: boolean;
  order: number;
}

interface CourseData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  language: string;
  price: number;
  originalPrice?: number;
  thumbnail?: string;
  previewVideo?: string;
  tags: string[];
  modules: CourseModule[];
  settings: {
    allowDiscussions: boolean;
    provideCertificate: boolean;
    allowDownloads: boolean;
    isPublic: boolean;
    maxStudents?: number;
  };
  stats: {
    enrolledStudents: number;
    completionRate: number;
    averageRating: number;
    totalReviews: number;
    totalRevenue: number;
  };
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;

  const [userRole] = useState<UserRole>("TUTOR");
  const [userName] = useState("Sarah Chen");
  const [userAvatar] = useState("/placeholder.svg?height=40&width=40");

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [newTag, setNewTag] = useState("");

  // Mock course data - in real app, this would be fetched from API
  const [courseData, setCourseData] = useState<CourseData>({
    id: courseId,
    title: "Complete React Development Course",
    subtitle: "Build modern web applications with React, Redux, and TypeScript",
    description:
      "Master React development from beginner to advanced level. Learn hooks, context, Redux, TypeScript, testing, and deployment. Build 5 real-world projects including an e-commerce app, social media dashboard, and more.",
    category: "Web Development",
    level: "Intermediate",
    language: "English",
    price: 89,
    originalPrice: 129,
    thumbnail: "/placeholder.svg?height=400&width=600",
    previewVideo: "/placeholder-video.mp4",
    tags: ["React", "JavaScript", "TypeScript", "Redux", "Hooks"],
    modules: [
      {
        id: "1",
        title: "Getting Started with React",
        description: "Introduction to React fundamentals and setup",
        isPublished: true,
        order: 1,
        lessons: [
          {
            id: "1-1",
            title: "What is React?",
            type: "video",
            duration: 15,
            videoUrl: "/placeholder-video.mp4",
            isPublished: true,
            order: 1,
          },
          {
            id: "1-2",
            title: "Setting up Development Environment",
            type: "video",
            duration: 20,
            videoUrl: "/placeholder-video.mp4",
            isPublished: true,
            order: 2,
          },
        ],
      },
      {
        id: "2",
        title: "React Components and JSX",
        description: "Learn about components, JSX, and props",
        isPublished: true,
        order: 2,
        lessons: [
          {
            id: "2-1",
            title: "Understanding Components",
            type: "video",
            duration: 25,
            isPublished: true,
            order: 1,
          },
          {
            id: "2-2",
            title: "JSX Syntax",
            type: "text",
            duration: 10,
            content: "JSX content here...",
            isPublished: false,
            order: 2,
          },
        ],
      },
    ],
    settings: {
      allowDiscussions: true,
      provideCertificate: true,
      allowDownloads: false,
      isPublic: true,
      maxStudents: 500,
    },
    stats: {
      enrolledStudents: 1247,
      completionRate: 87,
      averageRating: 4.9,
      totalReviews: 234,
      totalRevenue: 45600,
    },
    status: "published",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  });

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Design",
    "Business",
    "Marketing",
    "Photography",
    "Music",
    "Language",
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Portuguese",
    "Chinese",
  ];

  const addTag = () => {
    if (newTag.trim() && !courseData.tags.includes(newTag.trim())) {
      setCourseData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCourseData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addModule = () => {
    const newModule: CourseModule = {
      id: Date.now().toString(),
      title: "New Module",
      description: "Module description",
      lessons: [],
      isPublished: false,
      order: courseData.modules.length + 1,
    };

    setCourseData((prev) => ({
      ...prev,
      modules: [...prev.modules, newModule],
    }));
  };

  const addLesson = (moduleId: string) => {
    const newLesson: CourseLesson = {
      id: Date.now().toString(),
      title: "New Lesson",
      type: "video",
      duration: 0,
      isPublished: false,
      order: 1,
    };

    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: [...module.lessons, newLesson] }
          : module
      ),
    }));
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Course updated successfully!");
    } catch (error) {
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const publishCourse = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCourseData((prev) => ({ ...prev, status: "published" }));
      toast.success("Course published successfully!");
    } catch (error) {
      toast.error("Failed to publish course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        {/* Header */}
        <section className="py-8 border-b border-white/10">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.back()}
                  className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Courses
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {courseData.title}
                  </h1>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge
                      className={
                        courseData.status === "published"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : courseData.status === "draft"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }>
                      {courseData.status}
                    </Badge>
                    <span className="text-gray-400 text-sm">
                      Last updated:{" "}
                      {new Date(courseData.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button
                  onClick={saveChanges}
                  disabled={isSaving}
                  className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                {courseData.status === "draft" && (
                  <Button
                    onClick={publishCourse}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-neon-green to-emerald-400 text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    Publish
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Course Stats */}
        <section className="py-6 bg-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {courseData.stats.enrolledStudents}
                </div>
                <div className="text-gray-400 text-sm">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {courseData.stats.averageRating}
                </div>
                <div className="text-gray-400 text-sm">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {courseData.stats.completionRate}%
                </div>
                <div className="text-gray-400 text-sm">Completion</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {courseData.stats.totalReviews}
                </div>
                <div className="text-gray-400 text-sm">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  ${courseData.stats.totalRevenue.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">Revenue</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/20 mb-8">
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-blue data-[state=active]:to-neon-purple data-[state=active]:text-white">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-green data-[state=active]:to-emerald-400 data-[state=active]:text-white">
                  <FileText className="w-4 h-4 mr-2" />
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="pricing"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-orange data-[state=active]:to-yellow-400 data-[state=active]:text-white">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Pricing
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple data-[state=active]:to-pink-400 data-[state=active]:text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">
                    Course Curriculum
                  </h3>
                  <Button
                    onClick={addModule}
                    className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Module
                  </Button>
                </div>

                <div className="space-y-4">
                  {courseData.modules.map((module, moduleIndex) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: moduleIndex * 0.1 }}>
                      <Card className="glass-card border-white/10">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <CardTitle className="text-base text-white">
                                  Module {moduleIndex + 1}: {module.title}
                                </CardTitle>
                                <Badge
                                  className={
                                    module.isPublished
                                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                                      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  }>
                                  {module.isPublished ? "Published" : "Draft"}
                                </Badge>
                              </div>
                              <CardDescription className="text-gray-300">
                                {module.description}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-white hover:bg-white/10">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:bg-red-500/10">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-neon-blue/20 rounded-full flex items-center justify-center">
                                    {lesson.type === "video" && (
                                      <Play className="w-4 h-4 text-neon-blue" />
                                    )}
                                    {lesson.type === "text" && (
                                      <FileText className="w-4 h-4 text-neon-blue" />
                                    )}
                                    {lesson.type === "quiz" && (
                                      <Target className="w-4 h-4 text-neon-blue" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium text-white">
                                      {lesson.title}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                      <span>{lesson.duration} min</span>
                                      <Badge
                                        variant="outline"
                                        className="text-xs">
                                        {lesson.type}
                                      </Badge>
                                      <Badge
                                        className={
                                          lesson.isPublished
                                            ? "bg-green-500/20 text-green-400 border-green-500/30 text-xs"
                                            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs"
                                        }>
                                        {lesson.isPublished
                                          ? "Published"
                                          : "Draft"}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-white hover:bg-white/10">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-400 hover:bg-red-500/10">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addLesson(module.id)}
                              className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Lesson
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <Card className="glass-card border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white">
                          Basic Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="title" className="text-white">
                            Course Title
                          </Label>
                          <Input
                            id="title"
                            value={courseData.title}
                            onChange={(e) =>
                              setCourseData((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                            className="mt-1 bg-white/10 border-white/20 text-white"
                          />
                        </div>

                        <div>
                          <Label htmlFor="subtitle" className="text-white">
                            Subtitle
                          </Label>
                          <Input
                            id="subtitle"
                            value={courseData.subtitle}
                            onChange={(e) =>
                              setCourseData((prev) => ({
                                ...prev,
                                subtitle: e.target.value,
                              }))
                            }
                            className="mt-1 bg-white/10 border-white/20 text-white"
                          />
                        </div>

                        <div>
                          <Label htmlFor="description" className="text-white">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            value={courseData.description}
                            onChange={(e) =>
                              setCourseData((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                            className="mt-1 bg-white/10 border-white/20 text-white min-h-[120px]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-white">Category</Label>
                            <Select
                              value={courseData.category}
                              onValueChange={(value) =>
                                setCourseData((prev) => ({
                                  ...prev,
                                  category: value,
                                }))
                              }>
                              <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label className="text-white">Level</Label>
                            <Select
                              value={courseData.level}
                              onValueChange={(value) =>
                                setCourseData((prev) => ({
                                  ...prev,
                                  level: value,
                                }))
                              }>
                              <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {levels.map((level) => (
                                  <SelectItem key={level} value={level}>
                                    {level}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-white">Language</Label>
                          <Select
                            value={courseData.language}
                            onValueChange={(value) =>
                              setCourseData((prev) => ({
                                ...prev,
                                language: value,
                              }))
                            }>
                            <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {languages.map((language) => (
                                <SelectItem key={language} value={language}>
                                  {language}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-card border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white">Tags</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a tag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && addTag()}
                            className="bg-white/10 border-white/20 text-white"
                          />
                          <Button
                            onClick={addTag}
                            size="sm"
                            className="bg-neon-blue text-white">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {courseData.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="cursor-pointer bg-neon-blue/20 text-neon-blue border-neon-blue/30"
                              onClick={() => removeTag(tag)}>
                              {tag} ×
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card className="glass-card border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white">Media</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="text-white">Course Thumbnail</Label>
                          <div className="mt-2 border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors cursor-pointer">
                            {courseData.thumbnail ? (
                              <img
                                src={courseData.thumbnail || "/placeholder.svg"}
                                alt="Course thumbnail"
                                className="w-full h-32 object-cover rounded-lg mb-2"
                              />
                            ) : (
                              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            )}
                            <p className="text-sm text-gray-400">
                              Click to upload thumbnail (16:9 ratio recommended)
                            </p>
                          </div>
                        </div>

                        <div>
                          <Label className="text-white">Preview Video</Label>
                          <div className="mt-2 border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors cursor-pointer">
                            <Play className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-400">
                              Upload preview video (2-3 minutes recommended)
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-card border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white">
                          Course Analytics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">
                              Completion Rate
                            </span>
                            <span className="text-white font-semibold">
                              {courseData.stats.completionRate}%
                            </span>
                          </div>
                          <Progress
                            value={courseData.stats.completionRate}
                            className="h-2"
                          />

                          <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="text-center p-3 bg-white/5 rounded-lg">
                              <div className="text-lg font-bold text-white">
                                {courseData.stats.enrolledStudents}
                              </div>
                              <div className="text-xs text-gray-400">
                                Total Students
                              </div>
                            </div>
                            <div className="text-center p-3 bg-white/5 rounded-lg">
                              <div className="text-lg font-bold text-white">
                                {courseData.stats.averageRating}
                              </div>
                              <div className="text-xs text-gray-400">
                                Average Rating
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <DollarSign className="h-5 w-5" />
                        Pricing Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="price" className="text-white">
                          Course Price (USD)
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          value={courseData.price}
                          onChange={(e) =>
                            setCourseData((prev) => ({
                              ...prev,
                              price: Number.parseFloat(e.target.value) || 0,
                            }))
                          }
                          className="mt-1 bg-white/10 border-white/20 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="originalPrice" className="text-white">
                          Original Price (for discounts)
                        </Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          value={courseData.originalPrice || ""}
                          onChange={(e) =>
                            setCourseData((prev) => ({
                              ...prev,
                              originalPrice:
                                Number.parseFloat(e.target.value) || undefined,
                            }))
                          }
                          className="mt-1 bg-white/10 border-white/20 text-white"
                        />
                      </div>

                      {courseData.originalPrice &&
                        courseData.originalPrice > courseData.price && (
                          <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                            <p className="text-sm text-green-400">
                              Discount:{" "}
                              {Math.round(
                                ((courseData.originalPrice - courseData.price) /
                                  courseData.originalPrice) *
                                  100
                              )}
                              % off
                            </p>
                          </div>
                        )}
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Revenue Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="p-4 bg-neon-blue/20 rounded-lg border border-neon-blue/30">
                            <p className="text-2xl font-bold text-neon-blue">
                              ${courseData.price}
                            </p>
                            <p className="text-sm text-gray-300">Per Student</p>
                          </div>
                          <div className="p-4 bg-neon-green/20 rounded-lg border border-neon-green/30">
                            <p className="text-2xl font-bold text-neon-green">
                              ${(courseData.price * 0.7).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-300">
                              Your Share (70%)
                            </p>
                          </div>
                        </div>

                        <Separator className="bg-white/10" />

                        <div className="space-y-2">
                          <div className="flex justify-between text-white">
                            <span>Total Revenue:</span>
                            <span className="font-bold">
                              ${courseData.stats.totalRevenue.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-gray-300">
                            <span>Platform Fee (30%):</span>
                            <span>
                              -$
                              {(
                                courseData.stats.totalRevenue * 0.3
                              ).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-neon-green font-bold">
                            <span>Your Earnings:</span>
                            <span>
                              $
                              {(
                                courseData.stats.totalRevenue * 0.7
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Settings className="h-5 w-5" />
                        Course Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">
                            Allow Discussions
                          </Label>
                          <p className="text-sm text-gray-400">
                            Students can ask questions and discuss
                          </p>
                        </div>
                        <Switch
                          checked={courseData.settings.allowDiscussions}
                          onCheckedChange={(checked) =>
                            setCourseData((prev) => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                allowDiscussions: checked,
                              },
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">
                            Provide Certificate
                          </Label>
                          <p className="text-sm text-gray-400">
                            Students get a completion certificate
                          </p>
                        </div>
                        <Switch
                          checked={courseData.settings.provideCertificate}
                          onCheckedChange={(checked) =>
                            setCourseData((prev) => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                provideCertificate: checked,
                              },
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Allow Downloads</Label>
                          <p className="text-sm text-gray-400">
                            Students can download course materials
                          </p>
                        </div>
                        <Switch
                          checked={courseData.settings.allowDownloads}
                          onCheckedChange={(checked) =>
                            setCourseData((prev) => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                allowDownloads: checked,
                              },
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Public Course</Label>
                          <p className="text-sm text-gray-400">
                            Course appears in search results
                          </p>
                        </div>
                        <Switch
                          checked={courseData.settings.isPublic}
                          onCheckedChange={(checked) =>
                            setCourseData((prev) => ({
                              ...prev,
                              settings: { ...prev.settings, isPublic: checked },
                            }))
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="maxStudents" className="text-white">
                          Maximum Students
                        </Label>
                        <Input
                          id="maxStudents"
                          type="number"
                          placeholder="Leave empty for unlimited"
                          value={courseData.settings.maxStudents || ""}
                          onChange={(e) =>
                            setCourseData((prev) => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                maxStudents:
                                  Number.parseInt(e.target.value) || undefined,
                              },
                            }))
                          }
                          className="mt-1 bg-white/10 border-white/20 text-white"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/10">
                        <h4 className="text-red-400 font-semibold mb-2">
                          Archive Course
                        </h4>
                        <p className="text-sm text-gray-300 mb-4">
                          Archiving will hide the course from students and stop
                          new enrollments.
                        </p>
                        <Button
                          variant="outline"
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent">
                          Archive Course
                        </Button>
                      </div>

                      <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/10">
                        <h4 className="text-red-400 font-semibold mb-2">
                          Delete Course
                        </h4>
                        <p className="text-sm text-gray-300 mb-4">
                          Permanently delete this course. This action cannot be
                          undone.
                        </p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Course
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-red-500/30">
                            <DialogHeader>
                              <DialogTitle className="text-red-400">
                                Delete Course
                              </DialogTitle>
                              <DialogDescription className="text-gray-300">
                                Are you sure you want to delete "
                                {courseData.title}"? This action cannot be
                                undone and will remove all course content,
                                student progress, and analytics data.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end gap-3 mt-6">
                              <Button
                                variant="outline"
                                className="border-white/20 text-white bg-transparent">
                                Cancel
                              </Button>
                              <Button className="bg-red-600 hover:bg-red-700 text-white">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Forever
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  );
}
