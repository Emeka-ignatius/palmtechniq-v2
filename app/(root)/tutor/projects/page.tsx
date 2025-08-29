"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Code,
  Target,
  Trophy,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import type { UserRole } from "@/types/user";

export default function TutorProjectsPage() {
  const [userRole] = useState<UserRole>("TUTOR");
  const [userName] = useState("Sarah Chen");
  const [userAvatar] = useState("/placeholder.svg?height=40&width=40");
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock projects data
  const projectStats = {
    totalProjects: 15,
    activeProjects: 8,
    pendingSubmissions: 23,
    gradedSubmissions: 156,
    averageScore: 87,
    completionRate: 78,
  };

  const pendingSubmissions = [
    {
      id: 1,
      title: "Todo App with React Hooks",
      student: {
        name: "Alex Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "alex@example.com",
      },
      course: "React Crash Course",
      submittedAt: "2 hours ago",
      dueDate: "Tomorrow",
      difficulty: "Beginner",
      points: 100,
      submissionUrl: "https://github.com/alexkim/todo-app",
      description:
        "A fully functional todo application with CRUD operations and local storage.",
      requirements: [
        "Create, read, update, and delete todos",
        "Implement local storage persistence",
        "Add filtering and sorting functionality",
        "Responsive design implementation",
      ],
      isOverdue: false,
    },
    {
      id: 2,
      title: "E-commerce Product Page",
      student: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "emma@example.com",
      },
      course: "Advanced React Patterns",
      submittedAt: "1 day ago",
      dueDate: "In 3 days",
      difficulty: "Intermediate",
      points: 150,
      submissionUrl: "https://github.com/emmawilson/ecommerce-page",
      description:
        "Dynamic product page with shopping cart functionality and image gallery.",
      requirements: [
        "Product image gallery with zoom functionality",
        "Add to cart with quantity selection",
        "Product reviews and ratings system",
        "Related products recommendation",
      ],
      isOverdue: false,
    },
    {
      id: 3,
      title: "Real-time Chat Application",
      student: {
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "mike@example.com",
      },
      course: "Full Stack Development",
      submittedAt: "3 days ago",
      dueDate: "Yesterday",
      difficulty: "Advanced",
      points: 200,
      submissionUrl: "https://github.com/mikejohnson/chat-app",
      description:
        "Real-time chat application with Socket.io and user authentication.",
      requirements: [
        "Real-time messaging with Socket.io",
        "User authentication and profiles",
        "Message history and persistence",
        "Online/offline status indicators",
      ],
      isOverdue: true,
    },
  ];

  const gradedSubmissions = [
    {
      id: 4,
      title: "Portfolio Website",
      student: {
        name: "Lisa Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "lisa@example.com",
      },
      course: "Web Development Fundamentals",
      submittedAt: "1 week ago",
      gradedAt: "5 days ago",
      difficulty: "Beginner",
      points: 100,
      score: 92,
      grade: "A",
      feedback:
        "Excellent work! Great attention to detail and clean code structure. The responsive design is well implemented.",
      submissionUrl: "https://github.com/lisarodriguez/portfolio",
    },
    {
      id: 5,
      title: "API Integration Project",
      student: {
        name: "David Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "david@example.com",
      },
      course: "JavaScript Advanced",
      submittedAt: "2 weeks ago",
      gradedAt: "1 week ago",
      difficulty: "Intermediate",
      points: 150,
      score: 85,
      grade: "B+",
      feedback:
        "Good implementation of API calls and error handling. Consider adding loading states for better UX.",
      submissionUrl: "https://github.com/davidbrown/api-project",
    },
  ];

  const myProjects = [
    {
      id: 1,
      title: "Todo App with React Hooks",
      description:
        "Build a fully functional todo application using React Hooks, local storage, and modern CSS.",
      course: "React Crash Course",
      difficulty: "Beginner",
      points: 100,
      estimatedTime: "4-6 hours",
      submissions: 45,
      averageScore: 87,
      completionRate: 78,
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "E-commerce Product Page",
      description:
        "Create a dynamic product page with shopping cart functionality, image gallery, and product reviews.",
      course: "Advanced React Patterns",
      difficulty: "Intermediate",
      points: 150,
      estimatedTime: "8-10 hours",
      submissions: 32,
      averageScore: 82,
      completionRate: 65,
      isActive: true,
      createdAt: "2024-02-01",
    },
    {
      id: 3,
      title: "Real-time Chat Application",
      description:
        "Build a real-time chat app with Socket.io, user authentication, and message persistence.",
      course: "Full Stack Development",
      difficulty: "Advanced",
      points: 200,
      estimatedTime: "12-15 hours",
      submissions: 18,
      averageScore: 91,
      completionRate: 89,
      isActive: true,
      createdAt: "2024-02-15",
    },
  ];

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

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-400";
    if (grade.startsWith("B")) return "text-blue-400";
    if (grade.startsWith("C")) return "text-yellow-400";
    if (grade.startsWith("D")) return "text-orange-400";
    return "text-red-400";
  };

  const SubmissionCard = ({
    submission,
    type,
  }: {
    submission: any;
    type: "pending" | "graded";
  }) => (
    <Card
      className={`glass-card border-white/10 hover-glow group ${
        submission.isOverdue ? "border-red-500/30" : ""
      }`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4 flex-1">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={submission.student.avatar || "/placeholder.svg"}
              />
              <AvatarFallback>
                {submission.student.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-1 group-hover:text-gradient transition-colors">
                {submission.title}
              </h4>
              <p className="text-gray-400 text-sm mb-2">
                by {submission.student.name}
              </p>
              <div className="flex items-center space-x-3 mb-2">
                <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30 text-xs">
                  {submission.course}
                </Badge>
                <Badge className={getDifficultyColor(submission.difficulty)}>
                  {submission.difficulty}
                </Badge>
                <div className="flex items-center space-x-1 text-neon-orange">
                  <Trophy className="w-3 h-3" />
                  <span className="text-xs font-semibold">
                    {submission.points} pts
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                {submission.description}
              </p>
            </div>
          </div>
          <div className="text-right">
            {type === "graded" && (
              <div className="mb-2">
                <div
                  className={`text-2xl font-bold ${getGradeColor(
                    submission.grade
                  )}`}>
                  {submission.grade}
                </div>
                <div className="text-gray-400 text-sm">{submission.score}%</div>
              </div>
            )}
            {submission.isOverdue && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mb-2">
                Overdue
              </Badge>
            )}
          </div>
        </div>

        {type === "pending" && submission.requirements && (
          <div className="mb-4">
            <h5 className="text-white font-semibold mb-2 text-sm">
              Requirements:
            </h5>
            <ul className="space-y-1">
              {submission.requirements
                .slice(0, 2)
                .map((req: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start space-x-2 text-gray-300 text-xs">
                    <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              {submission.requirements.length > 2 && (
                <li className="text-gray-400 text-xs">
                  +{submission.requirements.length - 2} more requirements
                </li>
              )}
            </ul>
          </div>
        )}

        {type === "graded" && submission.feedback && (
          <div className="mb-4 p-3 bg-white/5 rounded-lg">
            <h5 className="text-white font-semibold mb-2 text-sm">
              Your Feedback:
            </h5>
            <p className="text-gray-300 text-sm">{submission.feedback}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>
                {type === "pending"
                  ? `Submitted ${submission.submittedAt}`
                  : `Graded ${submission.gradedAt}`}
              </span>
            </div>
            {type === "pending" && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Due {submission.dueDate}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              <Eye className="w-4 h-4 mr-2" />
              View Code
            </Button>
            {type === "pending" ? (
              <Button
                size="sm"
                className="bg-gradient-to-r from-neon-green to-emerald-400 text-white">
                <Award className="w-4 h-4 mr-2" />
                Grade
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/10">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-black/90 backdrop-blur-sm border-white/10">
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Grade
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ProjectCard = ({ project }: { project: any }) => (
    <Card className="glass-card border-white/10 hover-glow group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h4 className="text-white font-semibold mb-2 group-hover:text-gradient transition-colors">
              {project.title}
            </h4>
            <p className="text-gray-300 text-sm mb-3">{project.description}</p>
            <div className="flex items-center space-x-3 mb-3">
              <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30 text-xs">
                {project.course}
              </Badge>
              <Badge className={getDifficultyColor(project.difficulty)}>
                {project.difficulty}
              </Badge>
              <div className="flex items-center space-x-1 text-neon-orange">
                <Trophy className="w-3 h-3" />
                <span className="text-xs font-semibold">
                  {project.points} pts
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge
              className={
                project.isActive
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "bg-gray-500/20 text-gray-400 border-gray-500/30"
              }>
              {project.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              {project.submissions}
            </div>
            <div className="text-gray-400 text-xs">Submissions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-400">
              {project.averageScore}%
            </div>
            <div className="text-gray-400 text-xs">Avg Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">
              {project.completionRate}%
            </div>
            <div className="text-gray-400 text-xs">Completion</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-neon-blue">
              {project.estimatedTime}
            </div>
            <div className="text-gray-400 text-xs">Est. Time</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Completion Rate</span>
            <span className="text-white font-semibold">
              {project.completionRate}%
            </span>
          </div>
          <Progress value={project.completionRate} className="h-2" />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="text-sm text-gray-400">
            Created {new Date(project.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/10">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-black/90 backdrop-blur-sm border-white/10">
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Project
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <Eye className="w-4 h-4 mr-2" />
                  View Submissions
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <Code className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  {project.isActive ? (
                    <>
                      <XCircle className="w-4 h-4 mr-2" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Activate
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        {/* Header */}
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 cyber-grid opacity-10" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Projects & Assignments
                </h1>
                <p className="text-xl text-gray-300">
                  Create, manage, and grade student projects
                </p>
              </div>
              <Button className="bg-gradient-to-r from-neon-green to-emerald-400 text-white text-lg px-8 py-3">
                <Plus className="w-5 h-5 mr-2" />
                Create Project
              </Button>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
              <Card className="glass-card border-white/10">
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-neon-green mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {projectStats.totalProjects}
                  </div>
                  <div className="text-gray-400 text-sm">Total Projects</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-white/10">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-neon-blue mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {projectStats.activeProjects}
                  </div>
                  <div className="text-gray-400 text-sm">Active</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-white/10">
                <CardContent className="p-6 text-center">
                  <AlertCircle className="w-8 h-8 text-neon-orange mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {projectStats.pendingSubmissions}
                  </div>
                  <div className="text-gray-400 text-sm">Pending</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-white/10">
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {projectStats.gradedSubmissions}
                  </div>
                  <div className="text-gray-400 text-sm">Graded</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-white/10">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-neon-purple mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {projectStats.averageScore}%
                  </div>
                  <div className="text-gray-400 text-sm">Avg Score</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-white/10">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {projectStats.completionRate}%
                  </div>
                  <div className="text-gray-400 text-sm">Completion</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-sm mb-8">
                <TabsTrigger value="pending">
                  Pending Review ({pendingSubmissions.length})
                </TabsTrigger>
                <TabsTrigger value="graded">Graded Submissions</TabsTrigger>
                <TabsTrigger value="projects">My Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="pending">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      Submissions Awaiting Review
                    </h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search submissions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-80 bg-white/5 border-white/10 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {pendingSubmissions.map((submission) => (
                      <SubmissionCard
                        key={submission.id}
                        submission={submission}
                        type="pending"
                      />
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="graded">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      Graded Submissions
                    </h3>
                    <div className="flex items-center space-x-4">
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
                          <Filter className="w-4 h-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 backdrop-blur-sm border-white/10">
                          <SelectItem
                            value="all"
                            className="text-white hover:bg-white/10">
                            All Grades
                          </SelectItem>
                          <SelectItem
                            value="A"
                            className="text-white hover:bg-white/10">
                            A Grade
                          </SelectItem>
                          <SelectItem
                            value="B"
                            className="text-white hover:bg-white/10">
                            B Grade
                          </SelectItem>
                          <SelectItem
                            value="C"
                            className="text-white hover:bg-white/10">
                            C Grade
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search submissions..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-80 bg-white/5 border-white/10 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {gradedSubmissions.map((submission) => (
                      <SubmissionCard
                        key={submission.id}
                        submission={submission}
                        type="graded"
                      />
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="projects">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      My Projects ({myProjects.length})
                    </h3>
                    <Button className="bg-gradient-to-r from-neon-green to-emerald-400 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Project
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  );
}
