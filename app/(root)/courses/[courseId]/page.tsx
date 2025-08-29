"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Clock,
  Users,
  Star,
  Download,
  Calendar,
  MessageCircle,
  Share2,
  Heart,
  ChevronDown,
  CheckCircle,
  Lock,
  FileText,
  ExternalLink,
  User,
  Timer,
  Trophy,
  Target,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserRole } from "@/types/user";
import { LessonAIAssistant } from "@/components/ai/lesson-ai-assistant";
import { AILessonTrigger } from "@/components/ai/ai-lesson-trigger";

export default function CoursePage({ params }: { params: { slug: string } }) {
  const [userRole] = useState<UserRole>("STUDENT");
  const [userName] = useState("Alex Johnson");
  const [userAvatar] = useState("/placeholder.svg?height=40&width=40");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [aiAssistant, setAiAssistant] = useState({
    isOpen: false,
    isMinimized: false,
    currentLessonId: "",
    currentLessonTitle: "",
  });

  // Mock course data - this would come from your backend
  const course = {
    id: 1,
    title: "React Crash Course - Build 5 Projects",
    subtitle: "Master React.js by building real-world projects from scratch",
    instructor: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=60&width=60",
      title: "Senior React Developer",
      rating: 4.9,
      students: 45000,
      courses: 12,
    },
    thumbnail: "/placeholder.svg?height=400&width=600",
    videoUrl: "https://example.com/preview-video",
    price: 89,
    originalPrice: 149,
    discount: 40,
    rating: 4.8,
    reviews: 12450,
    students: 45230,
    duration: "12 hours",
    lessons: 85,
    level: "Beginner to Advanced",
    lastUpdated: "December 2024",
    language: "English",
    certificate: true,
    description:
      "Learn React.js from scratch by building 5 real-world projects. This comprehensive course covers everything from basic concepts to advanced patterns, state management, and deployment.",
    whatYouWillLearn: [
      "Build 5 complete React applications from scratch",
      "Master React Hooks and functional components",
      "Implement state management with Context API and Redux",
      "Work with APIs and handle asynchronous operations",
      "Deploy React applications to production",
      "Write clean, maintainable, and scalable code",
    ],
    curriculum: [
      {
        title: "Getting Started with React",
        lessons: 12,
        duration: "2h 30m",
        lessons_detail: [
          {
            title: "Introduction to React",
            duration: "15:30",
            isPreview: true,
          },
          {
            title: "Setting up Development Environment",
            duration: "20:45",
            isPreview: false,
          },
          {
            title: "Your First React Component",
            duration: "18:20",
            isPreview: true,
          },
        ],
      },
      {
        title: "React Hooks Deep Dive",
        lessons: 15,
        duration: "3h 15m",
        lessons_detail: [
          { title: "useState Hook", duration: "25:10", isPreview: false },
          { title: "useEffect Hook", duration: "30:45", isPreview: false },
          { title: "Custom Hooks", duration: "22:30", isPreview: false },
        ],
      },
    ],
    projects: [
      {
        id: 1,
        title: "Todo App with React Hooks",
        description:
          "Build a fully functional todo application using React Hooks, local storage, and modern CSS.",
        difficulty: "Beginner",
        points: 100,
        estimatedTime: "4-6 hours",
        requirements: [
          "Create, read, update, and delete todos",
          "Implement local storage persistence",
          "Add filtering and sorting functionality",
          "Responsive design implementation",
        ],
        resources: [
          { name: "Starter Code", type: "zip", url: "#" },
          { name: "Design Mockups", type: "figma", url: "#" },
          { name: "API Documentation", type: "pdf", url: "#" },
        ],
        submissions: 1247,
        averageScore: 87,
        dueDate: "No deadline",
      },
      {
        id: 2,
        title: "E-commerce Product Page",
        description:
          "Create a dynamic product page with shopping cart functionality, image gallery, and product reviews.",
        difficulty: "Intermediate",
        points: 150,
        estimatedTime: "8-10 hours",
        requirements: [
          "Product image gallery with zoom functionality",
          "Add to cart with quantity selection",
          "Product reviews and ratings system",
          "Related products recommendation",
        ],
        resources: [
          { name: "Product Data JSON", type: "json", url: "#" },
          { name: "UI Components Library", type: "npm", url: "#" },
          { name: "Testing Guidelines", type: "md", url: "#" },
        ],
        submissions: 892,
        averageScore: 82,
        dueDate: "No deadline",
      },
      {
        id: 3,
        title: "Real-time Chat Application",
        description:
          "Build a real-time chat app with Socket.io, user authentication, and message persistence.",
        difficulty: "Advanced",
        points: 200,
        estimatedTime: "12-15 hours",
        requirements: [
          "Real-time messaging with Socket.io",
          "User authentication and profiles",
          "Message history and persistence",
          "Online/offline status indicators",
        ],
        resources: [
          { name: "Backend API", type: "github", url: "#" },
          { name: "Socket.io Documentation", type: "link", url: "#" },
          { name: "Deployment Guide", type: "pdf", url: "#" },
        ],
        submissions: 456,
        averageScore: 91,
        dueDate: "No deadline",
      },
    ],
    mentorshipSessions: [
      {
        id: 1,
        tutor: {
          name: "Sarah Chen",
          avatar: "/placeholder.svg?height=50&width=50",
          title: "Senior React Developer",
          rating: 4.9,
          sessionsCount: 234,
          responseTime: "< 2 hours",
        },
        topic: "React Hooks Deep Dive",
        duration: 60,
        price: 89,
        availableSlots: [
          { date: "Today", time: "2:00 PM", available: true },
          { date: "Today", time: "4:00 PM", available: false },
          { date: "Tomorrow", time: "10:00 AM", available: true },
          { date: "Tomorrow", time: "2:00 PM", available: true },
        ],
        isPopular: true,
      },
      {
        id: 2,
        tutor: {
          name: "Mike Rodriguez",
          avatar: "/placeholder.svg?height=50&width=50",
          title: "Full Stack Developer",
          rating: 4.8,
          sessionsCount: 189,
          responseTime: "< 1 hour",
        },
        topic: "State Management & Redux",
        duration: 45,
        price: 69,
        availableSlots: [
          { date: "Today", time: "3:00 PM", available: true },
          { date: "Tomorrow", time: "11:00 AM", available: true },
          { date: "Tomorrow", time: "3:00 PM", available: true },
        ],
        isPopular: false,
      },
      {
        id: 3,
        tutor: {
          name: "Emily Johnson",
          avatar: "/placeholder.svg?height=50&width=50",
          title: "React Specialist",
          rating: 4.9,
          sessionsCount: 312,
          responseTime: "< 30 min",
        },
        topic: "Performance Optimization",
        duration: 90,
        price: 129,
        availableSlots: [
          { date: "Tomorrow", time: "1:00 PM", available: true },
          { date: "Dec 20", time: "10:00 AM", available: true },
          { date: "Dec 20", time: "2:00 PM", available: true },
        ],
        isPopular: true,
      },
    ],
  };

  const handleActivateAI = (lessonId: string, lessonTitle: string) => {
    setAiAssistant({
      isOpen: true,
      isMinimized: false,
      currentLessonId: lessonId,
      currentLessonTitle: lessonTitle,
    });
  };

  const handleCloseAI = () => {
    setAiAssistant((prev) => ({ ...prev, isOpen: false }));
  };

  const handleMinimizeAI = () => {
    setAiAssistant((prev) => ({ ...prev, isMinimized: !prev.isMinimized }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "zip":
        return Download;
      case "figma":
        return ExternalLink;
      case "pdf":
        return FileText;
      case "json":
        return FileText;
      case "npm":
        return ExternalLink;
      case "md":
        return FileText;
      case "github":
        return ExternalLink;
      case "link":
        return ExternalLink;
      default:
        return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 cyber-grid opacity-10" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {course.title}
                  </h1>
                  <p className="text-xl text-gray-300 mb-6">
                    {course.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(course.rating)
                                ? "fill-current"
                                : ""
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white font-semibold mr-2">
                        {course.rating}
                      </span>
                      <span className="text-gray-400">
                        ({course.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Users className="w-5 h-5 mr-2" />
                      {course.students.toLocaleString()} students
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-5 h-5 mr-2" />
                      {course.duration}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-8">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={course.instructor.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-semibold">
                        {course.instructor.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {course.instructor.title}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Video Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-12">
                  <div className="relative aspect-video bg-black rounded-2xl overflow-hidden group cursor-pointer">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                      <motion.div
                        className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Play className="w-8 h-8 text-white ml-1" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Tabs */}
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full">
                  <TabsList className="grid text-foreground font-bold w-full grid-cols-5 bg-white/5 backdrop-blur-sm">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}>
                      <Card className="glass-card border-white/10 mb-8">
                        <CardHeader>
                          <h3 className="text-2xl font-bold text-white">
                            About This Course
                          </h3>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 leading-relaxed">
                            {course.description}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="glass-card border-white/10">
                        <CardHeader>
                          <h3 className="text-2xl font-bold text-white">
                            What You'll Learn
                          </h3>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {course.whatYouWillLearn.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-300">{item}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="curriculum" className="mt-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-4">
                      {course.curriculum.map((section, index) => (
                        <Card
                          key={index}
                          className="glass-card border-white/10">
                          <CardHeader className="cursor-pointer">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-bold text-white">
                                {section.title}
                              </h3>
                              <div className="flex items-center space-x-4 text-gray-400">
                                <span>{section.lessons} lessons</span>
                                <span>{section.duration}</span>
                                <ChevronDown className="w-5 h-5" />
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {section.lessons_detail.map(
                                (lesson, lessonIndex) => (
                                  <div
                                    key={lessonIndex}
                                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
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
                                    <div className="flex items-center space-x-3">
                                      <span className="text-gray-400 text-sm">
                                        {lesson.duration}
                                      </span>
                                      {/* AI Trigger Button */}
                                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <AILessonTrigger
                                          lessonId={`${section.title}-${lessonIndex}`}
                                          lessonTitle={lesson.title}
                                          onActivate={() =>
                                            handleActivateAI(
                                              `${section.title}-${lessonIndex}`,
                                              lesson.title
                                            )
                                          }
                                          isActive={
                                            aiAssistant.isOpen &&
                                            aiAssistant.currentLessonId ===
                                              `${section.title}-${lessonIndex}`
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="projects" className="mt-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Hands-On Projects
                        </h3>
                        <p className="text-gray-300">
                          Apply your knowledge with real-world projects and earn
                          points!
                        </p>
                      </div>

                      {course.projects.map((project, index) => (
                        <Card
                          key={project.id}
                          className="glass-card border-white/10 hover-glow group">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="text-xl font-bold text-white group-hover:text-gradient transition-colors">
                                    {project.title}
                                  </h4>
                                  <Badge
                                    className={getDifficultyColor(
                                      project.difficulty
                                    )}>
                                    {project.difficulty}
                                  </Badge>
                                  <div className="flex items-center space-x-1 text-neon-orange">
                                    <Trophy className="w-4 h-4" />
                                    <span className="font-semibold">
                                      {project.points} pts
                                    </span>
                                  </div>
                                </div>
                                <p className="text-gray-300 mb-4">
                                  {project.description}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div>
                                <h5 className="text-white font-semibold mb-3 flex items-center">
                                  <Target className="w-4 h-4 mr-2 text-neon-blue" />
                                  Requirements
                                </h5>
                                <ul className="space-y-2">
                                  {project.requirements.map((req, reqIndex) => (
                                    <li
                                      key={reqIndex}
                                      className="flex items-start space-x-2 text-gray-300 text-sm">
                                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h5 className="text-white font-semibold mb-3 flex items-center">
                                  <Download className="w-4 h-4 mr-2 text-neon-green" />
                                  Resources
                                </h5>
                                <div className="space-y-2">
                                  {project.resources.map(
                                    (resource, resIndex) => {
                                      const IconComponent = getResourceIcon(
                                        resource.type
                                      );
                                      return (
                                        <a
                                          key={resIndex}
                                          href={resource.url}
                                          className="flex items-center space-x-2 text-neon-blue hover:text-neon-purple transition-colors text-sm group/link">
                                          <IconComponent className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                                          <span>{resource.name}</span>
                                        </a>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                              <div className="flex items-center space-x-6 text-sm text-gray-400">
                                <div className="flex items-center space-x-1">
                                  <Timer className="w-4 h-4" />
                                  <span>{project.estimatedTime}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>{project.submissions} submissions</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-400" />
                                  <span>Avg: {project.averageScore}%</span>
                                </div>
                              </div>
                              <Button className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                                Start Project
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="mentorship" className="mt-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          1-on-1 Mentorship Sessions
                        </h3>
                        <p className="text-gray-300">
                          Get personalized guidance from expert tutors on course
                          topics
                        </p>
                      </div>

                      {course.mentorshipSessions.map((session, index) => (
                        <Card
                          key={session.id}
                          className="glass-card border-white/10 hover-glow group">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-start space-x-4">
                                <Avatar className="w-16 h-16">
                                  <AvatarImage
                                    src={
                                      session.tutor.avatar || "/placeholder.svg"
                                    }
                                  />
                                  <AvatarFallback>
                                    {session.tutor.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-1">
                                    <h4 className="text-lg font-bold text-white">
                                      {session.tutor.name}
                                    </h4>
                                    {session.isPopular && (
                                      <Badge className="bg-neon-orange/20 text-neon-orange border-neon-orange/30 text-xs">
                                        🔥 Popular
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-gray-400 text-sm mb-2">
                                    {session.tutor.title}
                                  </p>
                                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-4 h-4 text-yellow-400" />
                                      <span>{session.tutor.rating}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Users className="w-4 h-4" />
                                      <span>
                                        {session.tutor.sessionsCount} sessions
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <MessageCircle className="w-4 h-4" />
                                      <span>
                                        Responds {session.tutor.responseTime}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-white mb-1">
                                  ${session.price}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {session.duration} minutes
                                </div>
                              </div>
                            </div>

                            <div className="mb-4">
                              <h5 className="text-white font-semibold mb-2">
                                Session Topic
                              </h5>
                              <p className="text-neon-blue font-medium">
                                {session.topic}
                              </p>
                            </div>

                            <div className="mb-6">
                              <h5 className="text-white font-semibold mb-3">
                                Available Time Slots
                              </h5>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {session.availableSlots.map(
                                  (slot, slotIndex) => (
                                    <button
                                      key={slotIndex}
                                      disabled={!slot.available}
                                      className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                                        slot.available
                                          ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/30 hover:bg-neon-blue/30"
                                          : "bg-gray-500/20 text-gray-500 border border-gray-500/30 cursor-not-allowed"
                                      }`}>
                                      <div>{slot.date}</div>
                                      <div className="text-xs opacity-80">
                                        {slot.time}
                                      </div>
                                    </button>
                                  )
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                              <div className="text-sm text-gray-400">
                                Perfect for getting unstuck and accelerating
                                your learning
                              </div>
                              <Button className="bg-gradient-to-r from-neon-purple to-pink-400 text-white">
                                <Calendar className="w-4 h-4 mr-2" />
                                Book Session
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <Card className="glass-card border-white/10 text-center">
                        <CardContent className="p-8">
                          <User className="w-12 h-12 text-neon-blue mx-auto mb-4" />
                          <h4 className="text-xl font-bold text-white mb-2">
                            Need a Different Expert?
                          </h4>
                          <p className="text-gray-300 mb-4">
                            Browse our full directory of mentors across all
                            technologies and specializations
                          </p>
                          <Button className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                            Browse All Mentors
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}>
                      <Card className="glass-card border-white/10">
                        <CardContent className="p-8 text-center">
                          <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-white mb-2">
                            Student Reviews
                          </h3>
                          <p className="text-gray-300">
                            Reviews component would be implemented here
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sticky Purchase Card */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="sticky top-24">
                  <Card className="glass-card border-white/10 hover-glow">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <span className="text-3xl font-bold text-white">
                            ${course.price}
                          </span>
                          <span className="text-lg text-gray-400 line-through">
                            ${course.originalPrice}
                          </span>
                        </div>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          {course.discount}% OFF
                        </Badge>
                      </div>

                      <div className="space-y-4 mb-6">
                        <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white text-lg py-3">
                          Enroll Now
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                          onClick={() => setIsWishlisted(!isWishlisted)}>
                          <Heart
                            className={`w-4 h-4 mr-2 ${
                              isWishlisted ? "fill-current text-red-400" : ""
                            }`}
                          />
                          {isWishlisted
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"}
                        </Button>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Duration</span>
                          <span className="text-white">{course.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Lessons</span>
                          <span className="text-white">{course.lessons}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Level</span>
                          <span className="text-white">{course.level}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Language</span>
                          <span className="text-white">{course.language}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Certificate</span>
                          <span className="text-white">
                            {course.certificate ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-white/10">
                        <Button
                          variant="outline"
                          className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Course
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        {/* AI Learning Assistant */}
        <LessonAIAssistant
          lessonId={aiAssistant.currentLessonId}
          lessonTitle={aiAssistant.currentLessonTitle}
          isOpen={aiAssistant.isOpen}
          onClose={handleCloseAI}
          onMinimize={handleMinimizeAI}
          isMinimized={aiAssistant.isMinimized}
        />
      </div>
    </div>
  );
}
