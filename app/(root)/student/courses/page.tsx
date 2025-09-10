"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Play,
  Award,
  TrendingUp,
  Heart,
  Share2,
} from "lucide-react";
import type { UserRole } from "@/types/user";
import { generateRandomAvatar } from "@/lib/utils";

export default function StudentCourses() {
  const [userRole] = useState<UserRole>("STUDENT");
  const [userName] = useState("Alex Johnson");
  const [userAvatar] = useState(generateRandomAvatar());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("enrolled");

  const enrolledCourses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "Sarah Chen",
      instructorAvatar: generateRandomAvatar(),
      progress: 68,
      totalLessons: 24,
      completedLessons: 16,
      nextLesson: "Custom Hooks Deep Dive",
      timeLeft: "2h 30m",
      thumbnail: generateRandomAvatar(),
      difficulty: "Advanced",
      rating: 4.9,
      students: 1234,
      category: "Frontend Development",
      lastAccessed: "2 hours ago",
      certificate: true,
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      instructor: "Mike Rodriguez",
      instructorAvatar: generateRandomAvatar(),
      progress: 34,
      totalLessons: 32,
      completedLessons: 11,
      nextLesson: "Express.js Fundamentals",
      timeLeft: "4h 15m",
      thumbnail: generateRandomAvatar(),
      difficulty: "Intermediate",
      rating: 4.8,
      students: 892,
      category: "Backend Development",
      lastAccessed: "1 day ago",
      certificate: true,
    },
    {
      id: 3,
      title: "Python Machine Learning",
      instructor: "Dr. Emily Watson",
      instructorAvatar: generateRandomAvatar(),
      progress: 12,
      totalLessons: 28,
      completedLessons: 3,
      nextLesson: "Data Preprocessing",
      timeLeft: "8h 45m",
      thumbnail: generateRandomAvatar(),
      difficulty: "Advanced",
      rating: 4.9,
      students: 567,
      category: "Data Science",
      lastAccessed: "3 days ago",
      certificate: true,
    },
  ];

  const availableCourses = [
    {
      id: 4,
      title: "Vue.js Complete Guide",
      instructor: "Alex Thompson",
      instructorAvatar: generateRandomAvatar(),
      price: 89,
      originalPrice: 129,
      thumbnail: generateRandomAvatar(),
      difficulty: "Intermediate",
      rating: 4.7,
      students: 2341,
      duration: "12 hours",
      lessons: 45,
      category: "Frontend Development",
      bestseller: true,
      certificate: true,
    },
    {
      id: 5,
      title: "AWS Cloud Architecture",
      instructor: "David Kim",
      instructorAvatar: generateRandomAvatar(),
      price: 149,
      originalPrice: 199,
      thumbnail: generateRandomAvatar(),
      difficulty: "Advanced",
      rating: 4.8,
      students: 1876,
      duration: "18 hours",
      lessons: 52,
      category: "Cloud Computing",
      trending: true,
      certificate: true,
    },
    {
      id: 6,
      title: "UI/UX Design Masterclass",
      instructor: "Jessica Park",
      instructorAvatar: generateRandomAvatar(),
      price: 79,
      originalPrice: 119,
      thumbnail: generateRandomAvatar(),
      difficulty: "Beginner",
      rating: 4.9,
      students: 3421,
      duration: "15 hours",
      lessons: 38,
      category: "Design",
      newCourse: true,
      certificate: true,
    },
  ];

  const completedCourses = [
    {
      id: 7,
      title: "JavaScript Fundamentals",
      instructor: "John Smith",
      instructorAvatar: generateRandomAvatar(),
      completedDate: "2 weeks ago",
      thumbnail: generateRandomAvatar(),
      difficulty: "Beginner",
      rating: 4.6,
      finalGrade: "A+",
      certificate: true,
      certificateId: "JS-2024-001",
    },
    {
      id: 8,
      title: "HTML & CSS Mastery",
      instructor: "Lisa Johnson",
      instructorAvatar: generateRandomAvatar(),
      completedDate: "1 month ago",
      thumbnail: generateRandomAvatar(),
      difficulty: "Beginner",
      rating: 4.5,
      finalGrade: "A",
      certificate: true,
      certificateId: "CSS-2024-002",
    },
  ];

  const CourseCard = ({
    course,
    type,
  }: {
    course: any;
    type: "enrolled" | "available" | "completed";
  }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <Card className="glass-card hover-glow border-white/10 overflow-hidden h-full">
        <div className="relative">
          <img
            src={course.thumbnail || generateRandomAvatar()}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {course.bestseller && (
              <Badge className="bg-orange-500/90 text-white border-orange-500">
                <Award className="w-3 h-3 mr-1" />
                Bestseller
              </Badge>
            )}
            {course.trending && (
              <Badge className="bg-green-500/90 text-white border-green-500">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
            {course.newCourse && (
              <Badge className="bg-blue-500/90 text-white border-blue-500">
                New
              </Badge>
            )}
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="bg-black/50 text-white hover:bg-black/70">
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="bg-black/50 text-white hover:bg-black/70">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
          {type === "enrolled" && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/70 rounded-lg p-3">
                <div className="flex justify-between text-xs text-white mb-2">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <Badge
              className={`text-xs ₦{
                course.difficulty === "Advanced"
                  ? "bg-red-500/20 text-red-400 border-red-500/30"
                  : course.difficulty === "Intermediate"
                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  : "bg-green-500/20 text-green-400 border-green-500/30"
              }`}>
              {course.difficulty}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white text-sm font-medium">
                {course.rating}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-colors">
            {course.title}
          </h3>

          <div className="flex items-center gap-2 mb-4">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={course.instructorAvatar || generateRandomAvatar()}
              />
              <AvatarFallback className="bg-gradient-to-r from-neon-blue to-neon-purple text-white text-xs">
                {course.instructor
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-gray-300 text-sm">{course.instructor}</span>
          </div>

          {type === "enrolled" && (
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Next Lesson:</span>
                <span className="text-white">{course.nextLesson}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Time Left:</span>
                <span className="text-white">{course.timeLeft}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Last Accessed:</span>
                <span className="text-white">{course.lastAccessed}</span>
              </div>
            </div>
          )}

          {type === "available" && (
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">
                    ₦{course.price}
                  </span>
                  <span className="text-gray-400 line-through">
                    ₦{course.originalPrice}
                  </span>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {Math.round(
                    ((course.originalPrice - course.price) /
                      course.originalPrice) *
                      100
                  )}
                  % OFF
                </Badge>
              </div>
            </div>
          )}

          {type === "completed" && (
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Completed:</span>
                <span className="text-white">{course.completedDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Final Grade:</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {course.finalGrade}
                </Badge>
              </div>
              {course.certificate && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Certificate:</span>
                  <span className="text-white">{course.certificateId}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            {type === "enrolled" && (
              <>
                <Button className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Continue
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Details
                </Button>
              </>
            )}
            {type === "available" && (
              <>
                <Button className="flex-1 bg-gradient-to-r from-neon-green to-emerald-400 text-white">
                  Enroll Now
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Preview
                </Button>
              </>
            )}
            {type === "completed" && (
              <>
                <Button className="flex-1 bg-gradient-to-r from-neon-purple to-pink-400 text-white">
                  <Award className="w-4 h-4 mr-2" />
                  Certificate
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Review
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
              <span className="text-white">My</span>{" "}
              <span className="text-gradient">Courses</span>
            </h1>
            <p className="text-xl text-gray-300">
              Manage your learning journey and discover new skills
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-neon-blue"
                />
              </div>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Tabs */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20 mb-8">
              <TabsTrigger
                value="enrolled"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-blue data-[state=active]:to-neon-purple data-[state=active]:text-white">
                Enrolled ({enrolledCourses.length})
              </TabsTrigger>
              <TabsTrigger
                value="available"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-green data-[state=active]:to-emerald-400 data-[state=active]:text-white">
                Available ({availableCourses.length})
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple data-[state=active]:to-pink-400 data-[state=active]:text-white">
                Completed ({completedCourses.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="enrolled" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enrolledCourses.map((course) => (
                  <CourseCard key={course.id} course={course} type="enrolled" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="available" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {availableCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    type="available"
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
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
