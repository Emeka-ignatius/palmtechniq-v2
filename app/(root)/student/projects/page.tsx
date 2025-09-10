"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FolderOpen,
  Calendar,
  Clock,
  Star,
  ExternalLink,
  Upload,
  MessageSquare,
  CheckCircle,
  Code,
  Globe,
  Github,
} from "lucide-react";
import type { UserRole } from "@/types/user";

export default function StudentProjectsPage() {
  const [userRole] = useState<UserRole>("STUDENT");
  const [userName] = useState("Alex Johnson");
  const [userAvatar] = useState("/placeholder.svg?height=40&width=40");
  const [activeTab, setActiveTab] = useState("active");

  const activeProjects = [
    {
      id: 1,
      title: "E-Commerce React App",
      description:
        "Build a full-stack e-commerce application with React, Node.js, and MongoDB",
      course: "Full-Stack Web Development",
      instructor: "Sarah Chen",
      dueDate: "2024-02-15",
      progress: 65,
      status: "in-progress",
      difficulty: "Advanced",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      submissions: 3,
      maxSubmissions: 5,
      feedback:
        "Great progress! Focus on implementing the payment system next.",
      lastUpdated: "2 days ago",
    },
    {
      id: 2,
      title: "Machine Learning Model",
      description:
        "Create a predictive model for stock price analysis using Python and TensorFlow",
      course: "Python Machine Learning",
      instructor: "Dr. Emily Watson",
      dueDate: "2024-02-20",
      progress: 30,
      status: "in-progress",
      difficulty: "Expert",
      technologies: ["Python", "TensorFlow", "Pandas", "NumPy"],
      submissions: 1,
      maxSubmissions: 3,
      feedback:
        "Good start on data preprocessing. Need to work on model architecture.",
      lastUpdated: "1 day ago",
    },
  ];

  const completedProjects = [
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "Personal portfolio website showcasing web development skills",
      course: "Frontend Development Fundamentals",
      instructor: "Mike Rodriguez",
      completedDate: "2024-01-28",
      grade: "A+",
      status: "completed",
      difficulty: "Intermediate",
      technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
      liveUrl: "https://alexjohnson-portfolio.vercel.app",
      githubUrl: "https://github.com/alexjohnson/portfolio",
      feedback:
        "Excellent work! Clean design and smooth animations. Well done!",
    },
    {
      id: 4,
      title: "Task Management App",
      description:
        "React-based task management application with drag-and-drop functionality",
      course: "Advanced React Patterns",
      instructor: "Sarah Chen",
      completedDate: "2024-01-15",
      grade: "A",
      status: "completed",
      difficulty: "Advanced",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://taskmaster-app.vercel.app",
      githubUrl: "https://github.com/alexjohnson/taskmaster",
      feedback:
        "Great implementation of drag-and-drop. Code quality is excellent.",
    },
  ];

  const upcomingProjects = [
    {
      id: 5,
      title: "Mobile App with React Native",
      description: "Cross-platform mobile application for fitness tracking",
      course: "React Native Development",
      instructor: "James Wilson",
      startDate: "2024-02-25",
      difficulty: "Advanced",
      technologies: ["React Native", "Expo", "Firebase", "Redux"],
      estimatedDuration: "4 weeks",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "overdue":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Expert":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">My</span>{" "}
              <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Build real-world projects and showcase your skills to potential
              employers
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}>
              <Card className="glass-card border-white/10 hover-glow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FolderOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">6</h3>
                  <p className="text-gray-400 text-sm">Total Projects</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="glass-card border-white/10 hover-glow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-green to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">2</h3>
                  <p className="text-gray-400 text-sm">Completed</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              <Card className="glass-card border-white/10 hover-glow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-orange to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">2</h3>
                  <p className="text-gray-400 text-sm">In Progress</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}>
              <Card className="glass-card border-white/10 hover-glow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">4.8</h3>
                  <p className="text-gray-400 text-sm">Avg Grade</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Projects Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}>
            <Card className="glass-card border-white/10">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 bg-white/5 border-b border-white/10">
                    <TabsTrigger value="active">
                      Active Projects ({activeProjects.length})
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                      Completed ({completedProjects.length})
                    </TabsTrigger>
                    <TabsTrigger value="upcoming">
                      Upcoming ({upcomingProjects.length})
                    </TabsTrigger>
                  </TabsList>

                  {/* Active Projects */}
                  <TabsContent value="active" className="p-6">
                    <div className="space-y-6">
                      {activeProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-white">
                                  {project.title}
                                </h3>
                                <Badge
                                  className={getStatusColor(project.status)}>
                                  {project.status.replace("-", " ")}
                                </Badge>
                                <Badge
                                  className={getDifficultyColor(
                                    project.difficulty
                                  )}>
                                  {project.difficulty}
                                </Badge>
                              </div>
                              <p className="text-gray-300 mb-3">
                                {project.description}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                <span>Course: {project.course}</span>
                                <span>•</span>
                                <span>Instructor: {project.instructor}</span>
                                <span>•</span>
                                <span>
                                  Due:{" "}
                                  {new Date(
                                    project.dueDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                              <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                  <span className="text-gray-400">
                                    Progress
                                  </span>
                                  <span className="text-white">
                                    {project.progress}%
                                  </span>
                                </div>
                                <Progress
                                  value={project.progress}
                                  className="h-2"
                                />
                              </div>

                              <div className="mb-4">
                                <p className="text-sm text-gray-400 mb-2">
                                  Technologies
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.map((tech) => (
                                    <Badge
                                      key={tech}
                                      className="bg-neon-blue/20 text-neon-blue border-neon-blue/30 text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="mb-4">
                                <p className="text-sm text-gray-400 mb-2">
                                  Submissions
                                </p>
                                <div className="flex items-center gap-2">
                                  <span className="text-white">
                                    {project.submissions} /{" "}
                                    {project.maxSubmissions}
                                  </span>
                                  <Progress
                                    value={
                                      (project.submissions /
                                        project.maxSubmissions) *
                                      100
                                    }
                                    className="h-2 flex-1"
                                  />
                                </div>
                              </div>

                              <div className="mb-4">
                                <p className="text-sm text-gray-400 mb-2">
                                  Latest Feedback
                                </p>
                                <p className="text-sm text-gray-300 bg-white/5 p-3 rounded-lg">
                                  {project.feedback}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <span className="text-sm text-gray-400">
                              Last updated: {project.lastUpdated}
                            </span>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Ask Question
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                                <Upload className="w-4 h-4 mr-2" />
                                Submit Work
                              </Button>
                              <Button className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                                <Code className="w-4 h-4 mr-2" />
                                Continue Working
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Completed Projects */}
                  <TabsContent value="completed" className="p-6">
                    <div className="space-y-6">
                      {completedProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="p-6 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-white">
                                  {project.title}
                                </h3>
                                <Badge
                                  className={getStatusColor(project.status)}>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Completed
                                </Badge>
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                  Grade: {project.grade}
                                </Badge>
                              </div>
                              <p className="text-gray-300 mb-3">
                                {project.description}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                <span>Course: {project.course}</span>
                                <span>•</span>
                                <span>Instructor: {project.instructor}</span>
                                <span>•</span>
                                <span>
                                  Completed:{" "}
                                  {new Date(
                                    project.completedDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                              <div className="mb-4">
                                <p className="text-sm text-gray-400 mb-2">
                                  Technologies Used
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.map((tech) => (
                                    <Badge
                                      key={tech}
                                      className="bg-neon-green/20 text-neon-green border-neon-green/30 text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="mb-4">
                                <p className="text-sm text-gray-400 mb-2">
                                  Instructor Feedback
                                </p>
                                <p className="text-sm text-gray-300 bg-white/5 p-3 rounded-lg">
                                  {project.feedback}
                                </p>
                              </div>
                            </div>

                            <div>
                              <div className="mb-4">
                                <p className="text-sm text-gray-400 mb-2">
                                  Project Links
                                </p>
                                <div className="space-y-2">
                                  {project.liveUrl && (
                                    <a
                                      href={project.liveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-neon-blue hover:text-neon-blue/80 transition-colors">
                                      <Globe className="w-4 h-4" />
                                      <span className="text-sm">Live Demo</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                  {project.githubUrl && (
                                    <a
                                      href={project.githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                                      <Github className="w-4 h-4" />
                                      <span className="text-sm">
                                        Source Code
                                      </span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Upcoming Projects */}
                  <TabsContent value="upcoming" className="p-6">
                    <div className="space-y-6">
                      {upcomingProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="p-6 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-white">
                                  {project.title}
                                </h3>
                                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Upcoming
                                </Badge>
                                <Badge
                                  className={getDifficultyColor(
                                    project.difficulty
                                  )}>
                                  {project.difficulty}
                                </Badge>
                              </div>
                              <p className="text-gray-300 mb-3">
                                {project.description}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                <span>Course: {project.course}</span>
                                <span>•</span>
                                <span>Instructor: {project.instructor}</span>
                                <span>•</span>
                                <span>
                                  Starts:{" "}
                                  {new Date(
                                    project.startDate
                                  ).toLocaleDateString()}
                                </span>
                                <span>•</span>
                                <span>
                                  Duration: {project.estimatedDuration}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm text-gray-400 mb-2">
                              Technologies You'll Use
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <Badge
                                  key={tech}
                                  className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <span className="text-sm text-gray-400">
                              Available in{" "}
                              {Math.ceil(
                                (new Date(project.startDate).getTime() -
                                  Date.now()) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              days
                            </span>
                            <Button
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                              <Calendar className="w-4 h-4 mr-2" />
                              Set Reminder
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
