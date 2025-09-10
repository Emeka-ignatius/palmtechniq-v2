"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  BookOpen,
  Clock,
  Upload,
  CheckCircle,
  AlertCircle,
  Star,
  Code,
  Github,
  ExternalLink,
  Play,
  Eye,
} from "lucide-react";
import type { UserRole } from "@/types/user";
import { generateRandomAvatar } from "@/lib/utils";

export default function StudentAssignments() {
  const [userRole] = useState<UserRole>("STUDENT");
  const [userName] = useState("Alex Johnson");

  const activeAssignments = [
    {
      id: 1,
      title: "Build a React Todo App",
      course: "Advanced React Patterns",
      instructor: "Sarah Chen",
      instructorAvatar: generateRandomAvatar(),
      dueDate: "2024-01-20",
      difficulty: "Intermediate",
      points: 100,
      description:
        "Create a fully functional todo application using React hooks, context API, and local storage.",
      requirements: [
        "Use functional components with hooks",
        "Implement CRUD operations",
        "Add local storage persistence",
        "Include responsive design",
        "Write unit tests",
      ],
      resources: [
        { name: "React Hooks Documentation", url: "#" },
        { name: "Starter Template", url: "#" },
        { name: "Design Mockups", url: "#" },
      ],
      status: "In Progress",
      progress: 60,
      timeSpent: "4h 30m",
      estimatedTime: "8h",
      submissionType: "GitHub Repository",
    },
    {
      id: 2,
      title: "API Design & Implementation",
      course: "Node.js Backend Development",
      instructor: "Mike Rodriguez",
      instructorAvatar: generateRandomAvatar(),
      dueDate: "2024-01-25",
      difficulty: "Advanced",
      points: 150,
      description:
        "Design and implement a RESTful API for a blog application with authentication and CRUD operations.",
      requirements: [
        "Use Express.js framework",
        "Implement JWT authentication",
        "Create CRUD endpoints",
        "Add input validation",
        "Write API documentation",
      ],
      resources: [
        { name: "Express.js Guide", url: "#" },
        { name: "JWT Tutorial", url: "#" },
        { name: "API Documentation Template", url: "#" },
      ],
      status: "Not Started",
      progress: 0,
      timeSpent: "0h",
      estimatedTime: "12h",
      submissionType: "GitHub Repository + Live Demo",
    },
    {
      id: 3,
      title: "Data Analysis Project",
      course: "Python Machine Learning",
      instructor: "Dr. Emily Watson",
      instructorAvatar: generateRandomAvatar(),
      dueDate: "2024-01-30",
      difficulty: "Advanced",
      points: 200,
      description:
        "Analyze a real-world dataset using Python and machine learning techniques to derive insights.",
      requirements: [
        "Use pandas for data manipulation",
        "Create visualizations with matplotlib",
        "Apply ML algorithms",
        "Write detailed analysis report",
        "Present findings",
      ],
      resources: [
        { name: "Dataset Download", url: "#" },
        { name: "Jupyter Notebook Template", url: "#" },
        { name: "Analysis Examples", url: "#" },
      ],
      status: "In Progress",
      progress: 25,
      timeSpent: "2h 15m",
      estimatedTime: "15h",
      submissionType: "Jupyter Notebook + Report",
    },
  ];

  const completedAssignments = [
    {
      id: 4,
      title: "JavaScript Calculator",
      course: "JavaScript Fundamentals",
      instructor: "John Smith",
      instructorAvatar: generateRandomAvatar(),
      submittedDate: "2024-01-10",
      grade: "A+",
      score: 95,
      points: 80,
      feedback:
        "Excellent work! Clean code structure and great user interface. Minor suggestion: add keyboard support.",
      githubUrl: "https://github.com/alexjohnson/js-calculator",
      liveUrl: "https://alexjohnson.github.io/js-calculator",
    },
    {
      id: 5,
      title: "Responsive Landing Page",
      course: "HTML & CSS Mastery",
      instructor: "Lisa Johnson",
      instructorAvatar: generateRandomAvatar(),
      submittedDate: "2024-01-05",
      grade: "A",
      score: 88,
      points: 60,
      feedback:
        "Great responsive design! The layout works well across devices. Consider optimizing images for better performance.",
      githubUrl: "https://github.com/alexjohnson/landing-page",
      liveUrl: "https://alexjohnson.github.io/landing-page",
    },
  ];

  const AssignmentCard = ({
    assignment,
    type,
  }: {
    assignment: any;
    type: "active" | "completed";
  }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <Card className="glass-card hover-glow border-white/10 overflow-hidden h-full">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-colors">
                {assignment.title}
              </CardTitle>
              <p className="text-gray-300 text-sm mb-2">{assignment.course}</p>
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage
                    src={assignment.instructorAvatar || generateRandomAvatar()}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs">
                    {assignment.instructor
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-gray-400 text-sm">
                  {assignment.instructor}
                </span>
              </div>
            </div>
            <div className="text-right">
              {type === "active" && (
                <>
                  <Badge
                    className={`mb-2 ₦{
                      assignment.difficulty === "Advanced"
                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                        : assignment.difficulty === "Intermediate"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : "bg-green-500/20 text-green-400 border-green-500/30"
                    }`}>
                    {assignment.difficulty}
                  </Badge>
                  <p className="text-white font-bold">
                    {assignment.points} pts
                  </p>
                </>
              )}
              {type === "completed" && (
                <>
                  <Badge className="mb-2 bg-green-500/20 text-green-400 border-green-500/30">
                    {assignment.grade}
                  </Badge>
                  <p className="text-white font-bold">{assignment.score}/100</p>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-300 text-sm">{assignment.description}</p>

          {type === "active" && (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{assignment.progress}%</span>
                </div>
                <Progress value={assignment.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Due Date</p>
                  <p className="text-white">
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Time Spent</p>
                  <p className="text-white">
                    {assignment.timeSpent} / {assignment.estimatedTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  className={`₦{
                    assignment.status === "In Progress"
                      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                      : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                  }`}>
                  {assignment.status}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>
                    {Math.ceil(
                      (new Date(assignment.dueDate).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days left
                  </span>
                </div>
              </div>
            </>
          )}

          {type === "completed" && (
            <>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">Instructor Feedback:</p>
                <p className="text-gray-300 text-sm bg-white/5 p-3 rounded-lg">
                  {assignment.feedback}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Submitted</p>
                  <p className="text-white">
                    {new Date(assignment.submittedDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Points Earned</p>
                  <p className="text-white">{assignment.points} pts</p>
                </div>
              </div>
            </>
          )}

          <div className="flex gap-2">
            {type === "active" && (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-white/20 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        {assignment.title}
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        {assignment.course} • Due{" "}
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Description
                        </h4>
                        <p className="text-gray-300">
                          {assignment.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Requirements
                        </h4>
                        <ul className="space-y-1">
                          {assignment.requirements.map(
                            (req: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-center gap-2 text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                {req}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Resources
                        </h4>
                        <div className="space-y-2">
                          {assignment.resources.map(
                            (resource: any, index: number) => (
                              <a
                                key={index}
                                href={resource.url}
                                className="flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-colors">
                                <ExternalLink className="w-4 h-4" />
                                {resource.name}
                              </a>
                            )
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Submit Assignment
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-white mb-2 block">
                              GitHub Repository URL
                            </label>
                            <Input
                              placeholder="https://github.com/username/repository"
                              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-white mb-2 block">
                              Live Demo URL (Optional)
                            </label>
                            <Input
                              placeholder="https://your-demo.netlify.app"
                              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-white mb-2 block">
                              Additional Notes
                            </label>
                            <Textarea
                              placeholder="Any additional information about your submission..."
                              rows={3}
                              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            />
                          </div>
                          <Button className="w-full bg-gradient-to-r from-neon-green to-emerald-400 text-white">
                            <Upload className="w-4 h-4 mr-2" />
                            Submit Assignment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  <Code className="w-4 h-4 mr-2" />
                  Start
                </Button>
              </>
            )}
            {type === "completed" && (
              <>
                <Button
                  className="flex-1 bg-gradient-to-r from-neon-purple to-pink-400 text-white"
                  onClick={() => window.open(assignment.liveUrl, "_blank")}>
                  <Play className="w-4 h-4 mr-2" />
                  View Live
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  onClick={() => window.open(assignment.githubUrl, "_blank")}>
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-neon-orange/10 rounded-full blur-3xl"
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
              <span className="text-white">My</span>{" "}
              <span className="text-gradient">Assignments</span>
            </h1>
            <p className="text-xl text-gray-300">
              Track your progress and submit your work
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="glass-card border-white/10">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {activeAssignments.length}
                </p>
                <p className="text-gray-400 text-sm">Active</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/10">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-neon-green to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {completedAssignments.length}
                </p>
                <p className="text-gray-400 text-sm">Completed</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/10">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-neon-orange to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">91.5</p>
                <p className="text-gray-400 text-sm">Avg Score</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-white/10">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">2</p>
                <p className="text-gray-400 text-sm">Due Soon</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Assignment Tabs */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20 mb-8">
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-blue data-[state=active]:to-neon-purple data-[state=active]:text-white">
                Active Assignments ({activeAssignments.length})
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-green data-[state=active]:to-emerald-400 data-[state=active]:text-white">
                Completed ({completedAssignments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {activeAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    type="active"
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {completedAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    type="completed"
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
