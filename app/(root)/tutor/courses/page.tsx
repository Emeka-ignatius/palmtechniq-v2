"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateRandomAvatar } from "@/lib/utils";
import type { UserRole } from "@/types/user";
import { motion } from "framer-motion";
import {
  Archive,
  BarChart3,
  BookOpen,
  Calendar,
  Copy,
  DollarSign,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share2,
  Star,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TutorCoursesPage() {
  const [userRole] = useState<UserRole>("TUTOR");
  const [userName] = useState("Sarah Chen");
  const [userAvatar] = useState(generateRandomAvatar());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Mock courses data
  const courses = [
    {
      id: 1,
      title: "React Crash Course - Build 5 Projects",
      thumbnail: generateRandomAvatar(),
      status: "published",
      students: 12450,
      rating: 4.9,
      reviews: 1847,
      earnings: 45600,
      monthlyEarnings: 3200,
      enrollmentTrend: 12,
      lastUpdated: "2 days ago",
      createdAt: "2024-01-15",
      duration: "12 hours",
      lessons: 85,
      completionRate: 87,
      category: "Web Development",
      price: 89,
      isPopular: true,
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      thumbnail: generateRandomAvatar(),
      status: "published",
      students: 3240,
      rating: 4.8,
      reviews: 456,
      earnings: 28900,
      monthlyEarnings: 1800,
      enrollmentTrend: 8,
      lastUpdated: "1 week ago",
      createdAt: "2024-02-20",
      duration: "8 hours",
      lessons: 42,
      completionRate: 92,
      category: "Web Development",
      price: 129,
      isPopular: false,
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      thumbnail: generateRandomAvatar(),
      status: "draft",
      students: 0,
      rating: 0,
      reviews: 0,
      earnings: 0,
      monthlyEarnings: 0,
      enrollmentTrend: 0,
      lastUpdated: "3 days ago",
      createdAt: "2024-03-10",
      duration: "6 hours",
      lessons: 28,
      completionRate: 0,
      category: "Programming",
      price: 69,
      isPopular: false,
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      thumbnail: generateRandomAvatar(),
      status: "archived",
      students: 1890,
      rating: 4.6,
      reviews: 234,
      earnings: 15600,
      monthlyEarnings: 0,
      enrollmentTrend: -5,
      lastUpdated: "2 months ago",
      createdAt: "2023-11-05",
      duration: "10 hours",
      lessons: 56,
      completionRate: 78,
      category: "Backend",
      price: 99,
      isPopular: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "draft":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "archived":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const CourseCard = ({ course }: { course: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group">
      <Card className="glass-card border-white/10 hover-glow overflow-hidden">
        <div className="relative">
          <img
            src={course.thumbnail || generateRandomAvatar()}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <Badge className={getStatusColor(course.status)}>
              {course.status}
            </Badge>
            {course.isPopular && (
              <Badge className="bg-neon-orange/20 text-neon-orange border-neon-orange/30">
                🔥 Popular
              </Badge>
            )}
          </div>
          <div className="absolute top-4 right-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-black/20 backdrop-blur-sm text-white hover:bg-black/40">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-black/90 backdrop-blur-sm border-white/10">
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-gradient transition-colors">
              {course.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>{course.lessons} lessons</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-neon-blue mb-1">
                <Users className="w-4 h-4" />
                <span className="font-bold">
                  {course.students.toLocaleString()}
                </span>
              </div>
              <p className="text-gray-400 text-xs">Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-1">
                <Star className="w-4 h-4" />
                <span className="font-bold">{course.rating || "N/A"}</span>
              </div>
              <p className="text-gray-400 text-xs">Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-green-400 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="font-bold">
                  ₦{course.earnings.toLocaleString()}
                </span>
              </div>
              <p className="text-gray-400 text-xs">Total Earnings</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-neon-purple mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="font-bold">
                  {course.enrollmentTrend > 0 ? "+" : ""}
                  {course.enrollmentTrend}%
                </span>
              </div>
              <p className="text-gray-400 text-xs">Growth</p>
            </div>
          </div>

          {course.status === "published" && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Completion Rate</span>
                <span className="text-white font-semibold">
                  {course.completionRate}%
                </span>
              </div>
              <Progress value={course.completionRate} className="h-2" />
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="text-sm text-gray-400">
              Updated {course.lastUpdated}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                Manage
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
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
                  My Courses
                </h1>
                <p className="text-xl text-gray-300">
                  Manage your course library and track performance
                </p>
              </div>
              <Button
                asChild
                className="bg-gradient-to-r from-neon-blue to-neon-purple text-white text-lg px-8 py-3">
                <Link href="/tutor/courses/create">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Course
                </Link>
              </Button>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="glass-card border-white/10">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-8 h-8 text-neon-blue mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {courses.length}
                  </div>
                  <div className="text-gray-400 text-sm">Total Courses</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-white/10">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-neon-green mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {courses
                      .reduce((sum, course) => sum + course.students, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">Total Students</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-white/10">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-neon-orange mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    ₦
                    {courses
                      .reduce((sum, course) => sum + course.earnings, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">Total Earnings</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-white/10">
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {(
                      courses.reduce(
                        (sum, course) => sum + (course.rating || 0),
                        0
                      ) / courses.filter((c) => c.rating > 0).length
                    ).toFixed(1)}
                  </div>
                  <div className="text-gray-400 text-sm">Avg Rating</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Filters and Search */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 backdrop-blur-sm border-white/10">
                    <SelectItem
                      value="all"
                      className="text-white hover:bg-white/10">
                      All Status
                    </SelectItem>
                    <SelectItem
                      value="published"
                      className="text-white hover:bg-white/10">
                      Published
                    </SelectItem>
                    <SelectItem
                      value="draft"
                      className="text-white hover:bg-white/10">
                      Draft
                    </SelectItem>
                    <SelectItem
                      value="archived"
                      className="text-white hover:bg-white/10">
                      Archived
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 backdrop-blur-sm border-white/10">
                    <SelectItem
                      value="newest"
                      className="text-white hover:bg-white/10">
                      Newest First
                    </SelectItem>
                    <SelectItem
                      value="oldest"
                      className="text-white hover:bg-white/10">
                      Oldest First
                    </SelectItem>
                    <SelectItem
                      value="popular"
                      className="text-white hover:bg-white/10">
                      Most Popular
                    </SelectItem>
                    <SelectItem
                      value="earnings"
                      className="text-white hover:bg-white/10">
                      Highest Earnings
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center py-16">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  No courses found
                </h3>
                <p className="text-gray-400 mb-6">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Create your first course to get started"}
                </p>
                <Button className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Course
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
