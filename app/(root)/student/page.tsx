"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { generateRandomAvatar } from "@/lib/utils";
import type { UserRole } from "@/types/user";
import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Calendar,
  CheckCircle,
  Clock,
  FlameIcon as Fire,
  Play,
  Plus,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function StudentDashboard() {
  const [userRole] = useState<UserRole>("STUDENT");
  const [userName] = useState("Alex Johnson");
  const [userAvatar] = useState(generateRandomAvatar());

  // Mock student data
  const studentData = {
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    streak: 7,
    coursesCompleted: 8,
    coursesInProgress: 3,
    totalHours: 124,
    achievements: 15,
    rank: "Advanced Learner",
  };

  const currentCourses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "Sarah Chen",
      progress: 68,
      nextLesson: "Custom Hooks Deep Dive",
      timeLeft: "2h 30m",
      thumbnail: generateRandomAvatar(),
      difficulty: "Advanced",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      instructor: "Mike Rodriguez",
      progress: 34,
      nextLesson: "Express.js Fundamentals",
      timeLeft: "4h 15m",
      thumbnail: generateRandomAvatar(),
      difficulty: "Intermediate",
      rating: 4.8,
    },
    {
      id: 3,
      title: "Python Machine Learning",
      instructor: "Dr. Emily Watson",
      progress: 12,
      nextLesson: "Data Preprocessing",
      timeLeft: "8h 45m",
      thumbnail: generateRandomAvatar(),
      difficulty: "Advanced",
      rating: 4.9,
    },
  ];

  const upcomingMentorships = [
    {
      id: 1,
      mentor: "Sarah Chen",
      topic: "React Performance Optimization",
      date: "Today",
      time: "3:00 PM",
      duration: 60,
      avatar: generateRandomAvatar(),
    },
    {
      id: 2,
      mentor: "Mike Rodriguez",
      topic: "API Design Best Practices",
      date: "Tomorrow",
      time: "10:00 AM",
      duration: 45,
      avatar: generateRandomAvatar(),
    },
  ];

  const recentAchievements = [
    {
      id: 1,
      title: "Speed Learner",
      description: "Completed 3 lessons in one day",
      icon: Zap,
      color: "from-yellow-400 to-orange-500",
      earned: "2 days ago",
    },
    {
      id: 2,
      title: "Streak Master",
      description: "7-day learning streak",
      icon: Fire,
      color: "from-red-500 to-pink-500",
      earned: "Today",
    },
    {
      id: 3,
      title: "Code Warrior",
      description: "Completed 50 coding challenges",
      icon: Trophy,
      color: "from-purple-500 to-indigo-500",
      earned: "1 week ago",
    },
  ];

  const StatCard = ({ icon: Icon, title, value, subtitle, color }: any) => (
    <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} className="group">
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
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} p-4 group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-full h-full text-white" />
            </div>
          </div>
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
          />
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
          className="absolute top-20 right-20 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"
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
              <span className="text-white">Welcome back,</span>{" "}
              <span className="text-gradient">Alex!</span>
            </h1>
            <p className="text-xl text-gray-300">
              Ready to continue your learning journey?
            </p>
          </motion.div>

          {/* Level Progress */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12">
            <Card className="glass-card border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {studentData.level}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {studentData.rank}
                      </h3>
                      <p className="text-gray-400">Level {studentData.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Fire className="w-5 h-5 text-orange-400" />
                      <span className="text-white font-semibold">
                        {studentData.streak} day streak
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">Keep it up!</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      Progress to Level {studentData.level + 1}
                    </span>
                    <span className="text-white">
                      {studentData.xp} / {studentData.xpToNext} XP
                    </span>
                  </div>
                  <Progress
                    value={(studentData.xp / studentData.xpToNext) * 100}
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              {
                icon: BookOpen,
                label: "Browse Courses",
                color: "from-neon-blue to-cyan-400",
              },
              {
                icon: Calendar,
                label: "Book Mentorship",
                color: "from-neon-purple to-pink-400",
              },
              {
                icon: Trophy,
                label: "View Achievements",
                color: "from-neon-green to-emerald-400",
              },
              {
                icon: Brain,
                label: "Practice Challenges",
                color: "from-neon-orange to-yellow-400",
              },
            ].map((action, index) => (
              <motion.button
                key={action.label}
                className={`flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r ${action.color} text-white font-semibold hover-glow group`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <action.icon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {action.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={BookOpen}
              title="Courses Completed"
              value={studentData.coursesCompleted}
              subtitle="3 in progress"
              color="from-neon-blue to-cyan-400"
            />
            <StatCard
              icon={Clock}
              title="Learning Hours"
              value={`${studentData.totalHours}h`}
              subtitle="This month: 24h"
              color="from-neon-green to-emerald-400"
            />
            <StatCard
              icon={Trophy}
              title="Achievements"
              value={studentData.achievements}
              subtitle="3 this week"
              color="from-neon-orange to-yellow-400"
            />
            <StatCard
              icon={Target}
              title="Completion Rate"
              value="94%"
              subtitle="Above average"
              color="from-neon-purple to-pink-400"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Continue Learning */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}>
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-bold text-white">
                        Continue Learning
                      </CardTitle>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                        View All Courses
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {currentCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer">
                        <img
                          src={course.thumbnail || generateRandomAvatar()}
                          alt={course.title}
                          className="w-20 h-14 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-semibold group-hover:text-gradient transition-colors">
                            {course.title}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            by {course.instructor}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex-1">
                              <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Progress</span>
                                <span>{course.progress}%</span>
                              </div>
                              <Progress
                                value={course.progress}
                                className="h-2"
                              />
                            </div>
                            <Badge
                              className={`text-xs ${
                                course.difficulty === "Advanced"
                                  ? "bg-red-500/20 text-red-400 border-red-500/30"
                                  : course.difficulty === "Intermediate"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : "bg-green-500/20 text-green-400 border-green-500/30"
                              }`}>
                              {course.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <Button className="bg-gradient-to-r from-neon-blue to-neon-purple text-white mb-2">
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </Button>
                          <p className="text-gray-400 text-xs">
                            {course.timeLeft} left
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}>
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-bold text-white">
                        Recent Achievements
                      </CardTitle>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentAchievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center`}>
                          <achievement.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">
                            {achievement.title}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {achievement.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            New!
                          </Badge>
                          <p className="text-gray-400 text-xs mt-1">
                            {achievement.earned}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Upcoming Mentorships */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}>
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-white">
                      Upcoming Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingMentorships.map((session, index) => (
                      <div
                        key={session.id}
                        className="p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={session.avatar || generateRandomAvatar()}
                            />
                            <AvatarFallback className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                              {session.mentor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm">
                              {session.mentor}
                            </h4>
                            <p className="text-gray-300 text-xs">
                              {session.topic}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>
                            {session.date} at {session.time}
                          </span>
                          <span>{session.duration} min</span>
                        </div>
                        <Button className="w-full mt-3 bg-gradient-to-r from-neon-purple to-pink-400 text-white text-sm">
                          Join Session
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Book New Session
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Learning Goals */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}>
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-white">
                      Learning Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">
                          Complete React Course
                        </span>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">
                          Master Node.js
                        </span>
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-full" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">
                          Build Portfolio Project
                        </span>
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-full" />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent">
                      <Target className="w-4 h-4 mr-2" />
                      Set New Goal
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}>
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-white">
                      This Week
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">
                        Lessons Completed
                      </span>
                      <span className="text-white font-semibold">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Study Time</span>
                      <span className="text-white font-semibold">8h 30m</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">XP Earned</span>
                      <span className="text-white font-semibold">450 XP</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Streak</span>
                      <div className="flex items-center gap-1">
                        <Fire className="w-4 h-4 text-orange-400" />
                        <span className="text-white font-semibold">7 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
