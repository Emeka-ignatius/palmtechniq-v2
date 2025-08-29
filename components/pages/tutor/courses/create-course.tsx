"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
  BookOpen,
  Upload,
  Plus,
  X,
  Save,
  Eye,
  Settings,
  DollarSign,
  PlayCircle,
  ImageIcon,
  Video,
} from "lucide-react";
import type { UserRole } from "@/types/user";

interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
  order: number;
}

interface CourseLesson {
  id: string;
  title: string;
  type: "video" | "text" | "quiz" | "assignment";
  duration: number;
  content?: string;
  videoUrl?: string;
  order: number;
}

export default function CreateCourse() {
  const [userRole] = useState<UserRole>("TUTOR");
  const [userName] = useState("Sarah Johnson");
  const [userAvatar] = useState("/placeholder.svg?height=40&width=40");
  const [currentStep, setCurrentStep] = useState(0);

  const [courseData, setCourseData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "",
    language: "English",
    price: 0,
    currency: "USD",
    thumbnail: "",
    previewVideo: "",
    tags: [] as string[],
    requirements: [] as string[],
    learningOutcomes: [] as string[],
    isPublished: false,
    allowDiscussions: true,
    certificateEnabled: true,
  });

  const [modules, setModules] = useState<CourseModule[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [currentOutcome, setCurrentOutcome] = useState("");

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "Digital Marketing",
    "Business",
    "Photography",
    "Music",
    "Language Learning",
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];

  const addTag = () => {
    if (currentTag.trim() && !courseData.tags.includes(currentTag.trim())) {
      setCourseData({
        ...courseData,
        tags: [...courseData.tags, currentTag.trim()],
      });
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCourseData({
      ...courseData,
      tags: courseData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setCourseData({
        ...courseData,
        requirements: [...courseData.requirements, currentRequirement.trim()],
      });
      setCurrentRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setCourseData({
      ...courseData,
      requirements: courseData.requirements.filter((_, i) => i !== index),
    });
  };

  const addLearningOutcome = () => {
    if (currentOutcome.trim()) {
      setCourseData({
        ...courseData,
        learningOutcomes: [
          ...courseData.learningOutcomes,
          currentOutcome.trim(),
        ],
      });
      setCurrentOutcome("");
    }
  };

  const removeLearningOutcome = (index: number) => {
    setCourseData({
      ...courseData,
      learningOutcomes: courseData.learningOutcomes.filter(
        (_, i) => i !== index
      ),
    });
  };

  const addModule = () => {
    const newModule: CourseModule = {
      id: Date.now().toString(),
      title: `Module ${modules.length + 1}`,
      description: "",
      lessons: [],
      order: modules.length,
    };
    setModules([...modules, newModule]);
  };

  const updateModule = (moduleId: string, updates: Partial<CourseModule>) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId ? { ...module, ...updates } : module
      )
    );
  };

  const removeModule = (moduleId: string) => {
    setModules(modules.filter((module) => module.id !== moduleId));
  };

  const addLesson = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return;

    const newLesson: CourseLesson = {
      id: Date.now().toString(),
      title: `Lesson ${module.lessons.length + 1}`,
      type: "video",
      duration: 0,
      order: module.lessons.length,
    };

    updateModule(moduleId, {
      lessons: [...module.lessons, newLesson],
    });
  };

  const updateLesson = (
    moduleId: string,
    lessonId: string,
    updates: Partial<CourseLesson>
  ) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return;

    const updatedLessons = module.lessons.map((lesson) =>
      lesson.id === lessonId ? { ...lesson, ...updates } : lesson
    );

    updateModule(moduleId, { lessons: updatedLessons });
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return;

    updateModule(moduleId, {
      lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
    });
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", { courseData, modules });
    // Here you would save to your backend
  };

  const handlePublish = () => {
    console.log("Publishing course:", { courseData, modules });
    // Here you would publish the course
  };

  const steps = [
    { id: 0, title: "Basic Info", icon: BookOpen },
    { id: 1, title: "Curriculum", icon: PlayCircle },
    { id: 2, title: "Pricing", icon: DollarSign },
    { id: 3, title: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-white">Create</span>{" "}
              <span className="text-gradient">Course</span>
            </h1>
            <p className="text-xl text-gray-300">
              Share your knowledge with the world
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                        : "bg-white/10 text-gray-400"
                    }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`ml-3 font-medium ${
                      currentStep >= step.id ? "text-white" : "text-gray-400"
                    }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                        currentStep > step.id
                          ? "bg-gradient-to-r from-neon-blue to-neon-purple"
                          : "bg-white/20"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Course Creation Form */}
          <div className="max-w-6xl mx-auto">
            <Card className="glass-card border-white/10">
              <CardContent className="p-8">
                {/* Step 0: Basic Info */}
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-white">
                            Course Title *
                          </Label>
                          <Input
                            id="title"
                            placeholder="e.g., Complete React Development Course"
                            value={courseData.title}
                            onChange={(e) =>
                              setCourseData({
                                ...courseData,
                                title: e.target.value,
                              })
                            }
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subtitle" className="text-white">
                            Course Subtitle
                          </Label>
                          <Input
                            id="subtitle"
                            placeholder="A brief, engaging description"
                            value={courseData.subtitle}
                            onChange={(e) =>
                              setCourseData({
                                ...courseData,
                                subtitle: e.target.value,
                              })
                            }
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-white">
                            Course Description *
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Detailed description of what students will learn..."
                            value={courseData.description}
                            onChange={(e) =>
                              setCourseData({
                                ...courseData,
                                description: e.target.value,
                              })
                            }
                            rows={6}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Category *</Label>
                            <Select
                              value={courseData.category}
                              onValueChange={(value) =>
                                setCourseData({
                                  ...courseData,
                                  category: value,
                                })
                              }>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select category" />
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

                          <div className="space-y-2">
                            <Label className="text-white">Level *</Label>
                            <Select
                              value={courseData.level}
                              onValueChange={(value) =>
                                setCourseData({ ...courseData, level: value })
                              }>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select level" />
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
                      </div>

                      <div className="space-y-6">
                        {/* Course Thumbnail */}
                        <div className="space-y-2">
                          <Label className="text-white">Course Thumbnail</Label>
                          <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-neon-blue/50 transition-colors cursor-pointer">
                            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-300 mb-2">
                              Upload course thumbnail
                            </p>
                            <p className="text-sm text-gray-500">
                              Recommended: 1280x720px, JPG/PNG
                            </p>
                            <Button className="mt-4 bg-gradient-to-r from-neon-blue to-neon-purple">
                              <Upload className="w-4 h-4 mr-2" />
                              Choose File
                            </Button>
                          </div>
                        </div>

                        {/* Preview Video */}
                        <div className="space-y-2">
                          <Label className="text-white">
                            Preview Video (Optional)
                          </Label>
                          <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-neon-purple/50 transition-colors cursor-pointer">
                            <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-300 mb-2">
                              Upload preview video
                            </p>
                            <p className="text-sm text-gray-500">
                              Max 2 minutes, MP4 format
                            </p>
                            <Button className="mt-4 bg-gradient-to-r from-neon-purple to-pink-400">
                              <Upload className="w-4 h-4 mr-2" />
                              Choose Video
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-4">
                      <Label className="text-white">Tags</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a tag..."
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addTag()}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                        <Button
                          onClick={addTag}
                          className="bg-gradient-to-r from-neon-green to-emerald-400">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {courseData.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-neon-blue text-neon-blue">
                            {tag}
                            <X
                              className="w-3 h-3 ml-1 cursor-pointer hover:text-red-400"
                              onClick={() => removeTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-4">
                      <Label className="text-white">Requirements</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a requirement..."
                          value={currentRequirement}
                          onChange={(e) =>
                            setCurrentRequirement(e.target.value)
                          }
                          onKeyPress={(e) =>
                            e.key === "Enter" && addRequirement()
                          }
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                        <Button
                          onClick={addRequirement}
                          className="bg-gradient-to-r from-neon-orange to-yellow-400">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {courseData.requirements.map((requirement, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 bg-white/5 rounded">
                            <span className="text-gray-300 flex-1">
                              {requirement}
                            </span>
                            <X
                              className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-400"
                              onClick={() => removeRequirement(index)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Learning Outcomes */}
                    <div className="space-y-4">
                      <Label className="text-white">
                        What will students learn?
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a learning outcome..."
                          value={currentOutcome}
                          onChange={(e) => setCurrentOutcome(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && addLearningOutcome()
                          }
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                        <Button
                          onClick={addLearningOutcome}
                          className="bg-gradient-to-r from-neon-purple to-pink-400">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {courseData.learningOutcomes.map((outcome, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 bg-white/5 rounded">
                            <span className="text-gray-300 flex-1">
                              {outcome}
                            </span>
                            <X
                              className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-400"
                              onClick={() => removeLearningOutcome(index)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 1: Curriculum */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">
                        Course Curriculum
                      </h3>
                      <Button
                        onClick={addModule}
                        className="bg-gradient-to-r from-neon-blue to-neon-purple">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Module
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {modules.map((module, moduleIndex) => (
                        <Card
                          key={module.id}
                          className="glass-card border-white/10">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex-1 space-y-2">
                                <Input
                                  value={module.title}
                                  onChange={(e) =>
                                    updateModule(module.id, {
                                      title: e.target.value,
                                    })
                                  }
                                  className="bg-white/10 border-white/20 text-white font-semibold"
                                  placeholder="Module title"
                                />
                                <Textarea
                                  value={module.description}
                                  onChange={(e) =>
                                    updateModule(module.id, {
                                      description: e.target.value,
                                    })
                                  }
                                  className="bg-white/10 border-white/20 text-white"
                                  placeholder="Module description"
                                  rows={2}
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeModule(module.id)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-semibold text-white">
                                  Lessons
                                </h4>
                                <Button
                                  size="sm"
                                  onClick={() => addLesson(module.id)}
                                  className="bg-gradient-to-r from-neon-green to-emerald-400">
                                  <Plus className="w-3 h-3 mr-1" />
                                  Add Lesson
                                </Button>
                              </div>

                              {module.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lesson.id}
                                  className="p-4 bg-white/5 rounded-lg">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input
                                      value={lesson.title}
                                      onChange={(e) =>
                                        updateLesson(module.id, lesson.id, {
                                          title: e.target.value,
                                        })
                                      }
                                      className="bg-white/10 border-white/20 text-white"
                                      placeholder="Lesson title"
                                    />
                                    <Select
                                      value={lesson.type}
                                      onValueChange={(value: any) =>
                                        updateLesson(module.id, lesson.id, {
                                          type: value,
                                        })
                                      }>
                                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="video">
                                          Video
                                        </SelectItem>
                                        <SelectItem value="text">
                                          Text/Article
                                        </SelectItem>
                                        <SelectItem value="quiz">
                                          Quiz
                                        </SelectItem>
                                        <SelectItem value="assignment">
                                          Assignment
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <div className="flex gap-2">
                                      <Input
                                        type="number"
                                        value={lesson.duration}
                                        onChange={(e) =>
                                          updateLesson(module.id, lesson.id, {
                                            duration:
                                              Number.parseInt(e.target.value) ||
                                              0,
                                          })
                                        }
                                        className="bg-white/10 border-white/20 text-white"
                                        placeholder="Duration (min)"
                                      />
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                          removeLesson(module.id, lesson.id)
                                        }
                                        className="text-red-400 hover:text-red-300">
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}

                              {module.lessons.length === 0 && (
                                <div className="text-center py-8 text-gray-400">
                                  <PlayCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                  <p>
                                    No lessons yet. Add your first lesson to get
                                    started.
                                  </p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {modules.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                          <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-50" />
                          <h3 className="text-xl font-semibold mb-2">
                            No modules yet
                          </h3>
                          <p className="mb-6">
                            Start building your course by adding your first
                            module.
                          </p>
                          <Button
                            onClick={addModule}
                            className="bg-gradient-to-r from-neon-blue to-neon-purple">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Your First Module
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Pricing */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8">
                    <h3 className="text-2xl font-bold text-white">
                      Course Pricing
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Card className="glass-card border-white/10">
                        <CardHeader>
                          <CardTitle className="text-white">
                            Pricing Options
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-2">
                            <Label className="text-white">Course Price</Label>
                            <div className="flex gap-2">
                              <Select
                                value={courseData.currency}
                                onValueChange={(value) =>
                                  setCourseData({
                                    ...courseData,
                                    currency: value,
                                  })
                                }>
                                <SelectTrigger className="w-24 bg-white/10 border-white/20 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="EUR">EUR</SelectItem>
                                  <SelectItem value="GBP">GBP</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input
                                type="number"
                                value={courseData.price}
                                onChange={(e) =>
                                  setCourseData({
                                    ...courseData,
                                    price:
                                      Number.parseFloat(e.target.value) || 0,
                                  })
                                }
                                className="bg-white/10 border-white/20 text-white"
                                placeholder="0.00"
                              />
                            </div>
                          </div>

                          <div className="p-4 bg-neon-blue/10 border border-neon-blue/20 rounded-lg">
                            <h4 className="text-neon-blue font-semibold mb-2">
                              Pricing Tips
                            </h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>
                                • Research similar courses in your category
                              </li>
                              <li>• Consider your course length and depth</li>
                              <li>• You can always adjust pricing later</li>
                              <li>
                                • Free courses can help build your reputation
                              </li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card border-white/10">
                        <CardHeader>
                          <CardTitle className="text-white">
                            Revenue Projection
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                              <span className="text-gray-300">
                                Course Price
                              </span>
                              <span className="text-white font-semibold">
                                ${courseData.price}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                              <span className="text-gray-300">
                                Platform Fee (10%)
                              </span>
                              <span className="text-red-400">
                                -${(courseData.price * 0.1).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-neon-green/20 to-emerald-400/20 rounded border border-neon-green/30">
                              <span className="text-neon-green font-semibold">
                                Your Earnings
                              </span>
                              <span className="text-neon-green font-bold">
                                ${(courseData.price * 0.9).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="mt-6 p-4 bg-neon-purple/10 border border-neon-purple/20 rounded-lg">
                            <h4 className="text-neon-purple font-semibold mb-2">
                              Estimated Monthly Revenue
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-400">10 students</p>
                                <p className="text-white font-semibold">
                                  ${(courseData.price * 0.9 * 10).toFixed(2)}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400">50 students</p>
                                <p className="text-white font-semibold">
                                  ${(courseData.price * 0.9 * 50).toFixed(2)}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400">100 students</p>
                                <p className="text-white font-semibold">
                                  ${(courseData.price * 0.9 * 100).toFixed(2)}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400">500 students</p>
                                <p className="text-white font-semibold">
                                  ${(courseData.price * 0.9 * 500).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Settings */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8">
                    <h3 className="text-2xl font-bold text-white">
                      Course Settings
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Card className="glass-card border-white/10">
                        <CardHeader>
                          <CardTitle className="text-white">
                            Course Features
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-white">
                                Allow Discussions
                              </Label>
                              <p className="text-sm text-gray-400">
                                Enable Q&A and discussions
                              </p>
                            </div>
                            <Switch
                              checked={courseData.allowDiscussions}
                              onCheckedChange={(checked) =>
                                setCourseData({
                                  ...courseData,
                                  allowDiscussions: checked,
                                })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-white">
                                Certificate of Completion
                              </Label>
                              <p className="text-sm text-gray-400">
                                Award certificates to students
                              </p>
                            </div>
                            <Switch
                              checked={courseData.certificateEnabled}
                              onCheckedChange={(checked) =>
                                setCourseData({
                                  ...courseData,
                                  certificateEnabled: checked,
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white">
                              Course Language
                            </Label>
                            <Select
                              value={courseData.language}
                              onValueChange={(value) =>
                                setCourseData({
                                  ...courseData,
                                  language: value,
                                })
                              }>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="English">English</SelectItem>
                                <SelectItem value="Spanish">Spanish</SelectItem>
                                <SelectItem value="French">French</SelectItem>
                                <SelectItem value="German">German</SelectItem>
                                <SelectItem value="Portuguese">
                                  Portuguese
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card border-white/10">
                        <CardHeader>
                          <CardTitle className="text-white">
                            Publishing Options
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <h4 className="text-yellow-400 font-semibold mb-2">
                              Before Publishing
                            </h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              <li>• Add at least 5 lessons</li>
                              <li>• Upload course thumbnail</li>
                              <li>• Set course price</li>
                              <li>• Review all content</li>
                            </ul>
                          </div>

                          <div className="space-y-4">
                            <Button
                              onClick={handleSaveDraft}
                              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600">
                              <Save className="w-4 h-4 mr-2" />
                              Save as Draft
                            </Button>

                            <Button
                              onClick={handlePublish}
                              className="w-full bg-gradient-to-r from-neon-green to-emerald-400"
                              disabled={
                                !courseData.title ||
                                !courseData.description ||
                                modules.length === 0
                              }>
                              <Eye className="w-4 h-4 mr-2" />
                              Publish Course
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t border-white/10">
                  <Button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10">
                    Previous
                  </Button>

                  <div className="flex gap-4">
                    <Button
                      onClick={handleSaveDraft}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                      <Save className="w-4 h-4 mr-2" />
                      Save Draft
                    </Button>

                    {currentStep < steps.length - 1 ? (
                      <Button
                        onClick={() =>
                          setCurrentStep(
                            Math.min(steps.length - 1, currentStep + 1)
                          )
                        }
                        className="bg-gradient-to-r from-neon-blue to-neon-purple">
                        Next
                      </Button>
                    ) : (
                      <Button
                        onClick={handlePublish}
                        className="bg-gradient-to-r from-neon-green to-emerald-400"
                        disabled={!courseData.title || !courseData.description}>
                        <Eye className="w-4 h-4 mr-2" />
                        Publish Course
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
