"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Trophy,
  Clock,
  Star,
  BarChart3,
  Activity,
  Zap,
  FlameIcon as Fire,
  Brain,
  CheckCircle,
  PlayCircle,
  Users,
} from "lucide-react";
import type { UserRole } from "@/types/user";
import { generateRandomAvatar } from "@/lib/utils";

interface CourseProgress {
  id: string;
  title: string;
  instructor: string;
  image: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  timeSpent: number;
  lastAccessed: string;
  nextLesson: string;
  difficulty: string;
  rating: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  unlockedAt: string;
  rarity: string;
  progress?: number;
  maxProgress?: number;
}

interface LearningStreak {
  current: number;
  longest: number;
  thisWeek: number[];
}

export default function StudentProgress() {
  const [userRole] = useState<UserRole>("STUDENT");
  const [userName] = useState("Alex Johnson");
  const [userAvatar] = useState(generateRandomAvatar());

  const coursesProgress: CourseProgress[] = [
    {
      id: "1",
      title: "Advanced React Development",
      instructor: "Sarah Johnson",
      image: "/placeholder.svg?height=60&width=80",
      progress: 68,
      totalLessons: 45,
      completedLessons: 31,
      timeSpent: 24.5,
      lastAccessed: "2 hours ago",
      nextLesson: "React Performance Optimization",
      difficulty: "Advanced",
      rating: 4.8,
    },
    {
      id: "2",
      title: "Python for Data Science",
      instructor: "Dr. Michael Chen",
      image: "/placeholder.svg?height=60&width=80",
      progress: 34,
      totalLessons: 38,
      completedLessons: 13,
      timeSpent: 18.2,
      lastAccessed: "1 day ago",
      nextLesson: "Pandas Data Manipulation",
      difficulty: "Intermediate",
      rating: 4.9,
    },
    {
      id: "3",
      title: "UI/UX Design Fundamentals",
      instructor: "Emma Wilson",
      image: "/placeholder.svg?height=60&width=80",
      progress: 89,
      totalLessons: 28,
      completedLessons: 25,
      timeSpent: 32.1,
      lastAccessed: "3 days ago",
      nextLesson: "Design System Creation",
      difficulty: "Beginner",
      rating: 4.7,
    },
  ];

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Speed Learner",
      description: "Complete 3 lessons in one day",
      icon: Zap,
      color: "from-yellow-400 to-orange-500",
      unlockedAt: "2 days ago",
      rarity: "Common",
    },
    {
      id: "2",
      title: "Streak Master",
      description: "Maintain a 7-day learning streak",
      icon: Fire,
      color: "from-red-500 to-pink-500",
      unlockedAt: "Today",
      rarity: "Rare",
    },
    {
      id: "3",
      title: "Knowledge Seeker",
      description: "Enroll in 5+ courses",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      unlockedAt: "1 week ago",
      rarity: "Uncommon",
    },
    {
      id: "4",
      title: "Perfect Score",
      description: "Get 100% on 3 quizzes",
      icon: Star,
      color: "from-green-500 to-emerald-500",
      unlockedAt: "2 weeks ago",
      rarity: "Rare",
      progress: 2,
      maxProgress: 3,
    },
    {
      id: "5",
      title: "Brain Power",
      description: "Complete an advanced course",
      icon: Brain,
      color: "from-purple-500 to-indigo-500",
      unlockedAt: "",
      rarity: "Epic",
      progress: 68,
      maxProgress: 100,
    },
  ];

  const learningStreak: LearningStreak = {
    current: 7,
    longest: 12,
    thisWeek: [1, 1, 0, 1, 1, 1, 1], // 1 = active, 0 = inactive
  };

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const stats = {
    totalHours: 74.8,
    coursesCompleted: 3,
    coursesInProgress: 3,
    averageScore: 87,
    rank: "Advanced Learner",
    level: 12,
    xp: 2450,
    xpToNext: 3000,
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-400 border-green-400";
      case "Intermediate":
        return "text-yellow-400 border-yellow-400";
      case "Advanced":
        return "text-red-400 border-red-400";
      default:
        return "text-gray-400 border-gray-400";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "text-gray-400 border-gray-400";
      case "Uncommon":
        return "text-green-400 border-green-400";
      case "Rare":
        return "text-blue-400 border-blue-400";
      case "Epic":
        return "text-purple-400 border-purple-400";
      case "Legendary":
        return "text-orange-400 border-orange-400";
      default:
        return "text-gray-400 border-gray-400";
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color }: any) => (
    <motion.div whileHover={{ scale: 1.05 }} className="group">
      <Card className="glass-card hover-glow border-white/10 overflow-hidden relative">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">{title}</p>
              <p className="text-3xl font-bold text-white mt-2">{value}</p>
              {subtitle && (
                <p className="text-sm text-gray-300 mt-1">{subtitle}</p>
              )}
            </div>
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ₦{color} p-4 group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-full h-full text-white" />
            </div>
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
          className="absolute top-20 left-20 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"
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
              <span className="text-white">Learning</span>{" "}
              <span className="text-gradient">Progress</span>
            </h1>
            <p className="text-xl text-gray-300">
              Track your journey to mastery
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={Clock}
              title="Total Hours"
              value={`₦{stats.totalHours}h`}
              subtitle="This month: 24h"
              color="from-neon-blue to-cyan-400"
            />
            <StatCard
              icon={BookOpen}
              title="Courses"
              value={stats.coursesCompleted}
              subtitle={`₦{stats.coursesInProgress} in progress`}
              color="from-neon-green to-emerald-400"
            />
            <StatCard
              icon={Trophy}
              title="Average Score"
              value={`₦{stats.averageScore}%`}
              subtitle="Last 10 quizzes"
              color="from-neon-orange to-yellow-400"
            />
            <StatCard
              icon={Fire}
              title="Current Streak"
              value={`₦{learningStreak.current} days`}
              subtitle={`Best: ₦{learningStreak.longest} days`}
              color="from-neon-purple to-pink-400"
            />
          </div>

          {/* Learning Streak */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                  <Fire className="w-8 h-8 text-orange-400" />
                  Learning Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-center mb-6">
                      <div className="text-6xl font-bold text-gradient mb-2">
                        {learningStreak.current}
                      </div>
                      <p className="text-gray-300">Days in a row</p>
                    </div>
                    <div className="flex justify-center gap-2">
                      {weekDays.map((day, index) => (
                        <div key={day} className="text-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ₦{
                              learningStreak.thisWeek[index]
                                ? "bg-gradient-to-r from-neon-orange to-yellow-400 text-white"
                                : "bg-white/10 text-gray-400"
                            }`}>
                            {learningStreak.thisWeek[index] ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <div className="w-2 h-2 bg-current rounded-full" />
                            )}
                          </div>
                          <p className="text-xs text-gray-400">{day}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-orange-500/20 to-yellow-400/20 rounded-lg border border-orange-500/30">
                      <h4 className="text-orange-400 font-semibold mb-2">
                        Keep it up!
                      </h4>
                      <p className="text-gray-300 text-sm">
                        You're on a {learningStreak.current}-day streak!
                        Complete a lesson today to keep it going.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-2xl font-bold text-white">
                          {learningStreak.longest}
                        </p>
                        <p className="text-sm text-gray-400">Longest Streak</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-2xl font-bold text-white">
                          {learningStreak.thisWeek.reduce((a, b) => a + b, 0)}
                        </p>
                        <p className="text-sm text-gray-400">This Week</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Progress Tabs */}
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-3 text-foreground bg-white/10 border border-white/20 mb-8">
              <TabsTrigger
                value="courses"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-blue data-[state=active]:to-neon-purple data-[state=active]:text-white">
                Course Progress
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-green data-[state=active]:to-emerald-400 data-[state=active]:text-white">
                Achievements
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-orange data-[state=active]:to-yellow-400 data-[state=active]:text-white">
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {coursesProgress.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <Card className="glass-card border-white/10 hover-glow group">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <img
                            src={course.image || generateRandomAvatar()}
                            alt={course.title}
                            className="w-16 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white truncate">
                              {course.title}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {course.instructor}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant="outline"
                                className={`text-xs ₦{getDifficultyColor(
                                  course.difficulty
                                )}`}>
                                {course.difficulty}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-400">
                                  {course.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-400">Progress</span>
                              <span className="text-white">
                                {course.progress}%
                              </span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">Lessons</p>
                              <p className="text-white font-medium">
                                {course.completedLessons}/{course.totalLessons}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">Time Spent</p>
                              <p className="text-white font-medium">
                                {course.timeSpent}h
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-white/10">
                            <p className="text-sm text-gray-400 mb-2">
                              Next Lesson:
                            </p>
                            <p className="text-white font-medium text-sm truncate">
                              {course.nextLesson}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Last accessed {course.lastAccessed}
                            </p>
                          </div>

                          <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple group-hover:scale-105 transition-transform">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Continue Learning
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <Card
                      className={`glass-card border-white/10 hover-glow ₦{
                        achievement.unlockedAt ? "opacity-100" : "opacity-60"
                      }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className={`w-16 h-16 rounded-full bg-gradient-to-r ₦{achievement.color} flex items-center justify-center`}>
                            <achievement.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold">
                              {achievement.title}
                            </h4>
                            <Badge
                              variant="outline"
                              className={`text-xs mt-1 ₦{getRarityColor(
                                achievement.rarity
                              )}`}>
                              {achievement.rarity}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm mb-4">
                          {achievement.description}
                        </p>

                        {achievement.progress !== undefined &&
                          achievement.maxProgress && (
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Progress</span>
                                <span className="text-white">
                                  {achievement.progress}/
                                  {achievement.maxProgress}
                                </span>
                              </div>
                              <Progress
                                value={
                                  (achievement.progress /
                                    achievement.maxProgress) *
                                  100
                                }
                                className="h-2"
                              />
                            </div>
                          )}

                        <p className="text-gray-400 text-xs">
                          {achievement.unlockedAt
                            ? `Unlocked ₦{achievement.unlockedAt}`
                            : "Not unlocked yet"}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Learning Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold text-neon-blue mb-1">
                            {stats.level}
                          </div>
                          <div className="text-sm text-gray-400">
                            Current Level
                          </div>
                        </div>
                        <div className="text-center p-4 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold text-neon-green mb-1">
                            {stats.xp}
                          </div>
                          <div className="text-sm text-gray-400">Total XP</div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">
                            XP to Next Level
                          </span>
                          <span className="text-white">
                            {stats.xp}/{stats.xpToNext}
                          </span>
                        </div>
                        <Progress
                          value={(stats.xp / stats.xpToNext) * 100}
                          className="h-3"
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">
                            Study Time This Week
                          </span>
                          <span className="text-white font-semibold">
                            12.5h
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">
                            Lessons Completed
                          </span>
                          <span className="text-white font-semibold">69</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Quiz Average</span>
                          <span className="text-white font-semibold">
                            {stats.averageScore}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Current Rank</span>
                          <Badge className="bg-gradient-to-r from-neon-purple to-pink-400 text-white">
                            {stats.rank}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Weekly Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-7 gap-2">
                        {weekDays.map((day, index) => (
                          <div key={day} className="text-center">
                            <div className="text-xs text-gray-400 mb-2">
                              {day}
                            </div>
                            <div
                              className={`h-20 rounded-lg flex items-end justify-center p-2 ₦{
                                learningStreak.thisWeek[index]
                                  ? "bg-gradient-to-t from-neon-blue to-neon-purple"
                                  : "bg-white/10"
                              }`}>
                              <div className="text-xs text-white font-medium">
                                {learningStreak.thisWeek[index]
                                  ? Math.floor(Math.random() * 3) + 1 + "h"
                                  : "0h"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <h4 className="text-white font-semibold mb-3">
                          Recent Milestones
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-2 bg-white/5 rounded">
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-300">
                              Completed "React Hooks" module
                            </span>
                            <span className="text-xs text-gray-500 ml-auto">
                              2 days ago
                            </span>
                          </div>
                          <div className="flex items-center gap-3 p-2 bg-white/5 rounded">
                            <Star className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-gray-300">
                              Scored 95% on Python quiz
                            </span>
                            <span className="text-xs text-gray-500 ml-auto">
                              4 days ago
                            </span>
                          </div>
                          <div className="flex items-center gap-3 p-2 bg-white/5 rounded">
                            <Users className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-gray-300">
                              Joined study group
                            </span>
                            <span className="text-xs text-gray-500 ml-auto">
                              1 week ago
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
