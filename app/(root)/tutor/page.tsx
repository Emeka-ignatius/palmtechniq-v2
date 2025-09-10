"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  TrendingUp,
  Star,
  Award,
  Plus,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { UserRole } from "@/types/user";
import { generateRandomAvatar } from "@/lib/utils";
import { link } from "fs";
import Link from "next/link";

export default function TutorDashboard() {
  const [userRole] = useState<UserRole>("TUTOR");
  const [userName] = useState("Sarah Chen");
  const [userAvatar] = useState(generateRandomAvatar());

  // Mock data - this would come from your backend
  const dashboardData = {
    stats: {
      totalStudents: 12450,
      totalEarnings: 89750,
      monthlyEarnings: 12340,
      coursesSold: 3240,
      averageRating: 4.9,
      totalReviews: 1847,
      mentorshipSessions: 234,
      projectsGraded: 892,
    },
    recentActivity: [
      {
        type: "enrollment",
        message: "Mike Johnson enrolled in React Masterclass",
        time: "2 min ago",
      },
      {
        type: "review",
        message: "New 5-star review from Lisa Rodriguez",
        time: "15 min ago",
      },
      {
        type: "mentorship",
        message: "Mentorship session completed with Alex Kim",
        time: "1 hour ago",
      },
      {
        type: "project",
        message: "New project submission from Emma Wilson",
        time: "2 hours ago",
      },
    ],
    courses: [
      {
        id: 1,
        title: "React Crash Course - Build 5 Projects",
        students: 12450,
        rating: 4.9,
        earnings: 45600,
        status: "active",
        thumbnail: generateRandomAvatar(),
        lastUpdated: "2 days ago",
      },
      {
        id: 2,
        title: "Advanced React Patterns",
        students: 3240,
        rating: 4.8,
        earnings: 28900,
        status: "active",
        thumbnail: generateRandomAvatar(),
        lastUpdated: "1 week ago",
      },
    ],
    upcomingMentorships: [
      {
        id: 1,
        student: "John Doe",
        topic: "React Hooks Deep Dive",
        date: "Today",
        time: "2:00 PM",
        duration: 60,
        price: 89,
      },
      {
        id: 2,
        student: "Maria Garcia",
        topic: "Code Review Session",
        date: "Tomorrow",
        time: "10:00 AM",
        duration: 45,
        price: 69,
      },
    ],
    pendingProjects: [
      {
        id: 1,
        title: "Todo App with React Hooks",
        student: "Alex Kim",
        course: "React Crash Course",
        submitted: "2 hours ago",
        dueDate: "Tomorrow",
      },
      {
        id: 2,
        title: "E-commerce Product Page",
        student: "Emma Wilson",
        course: "Advanced React Patterns",
        submitted: "1 day ago",
        dueDate: "In 3 days",
      },
    ],
  };

  const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
    <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} className="group">
      <Card className="glass-card hover-glow border-white/10 overflow-hidden relative">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">{title}</p>
              <p className="text-3xl font-bold text-white mt-2">{value}</p>
              {change && (
                <div
                  className={`flex items-center mt-2 text-sm ₦{
                    change > 0 ? "text-green-400" : "text-red-400"
                  }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {change > 0 ? "+" : ""}
                  {change}% from last month
                </div>
              )}
            </div>
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ₦{color} p-4 group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-full h-full text-white" />
            </div>
          </div>
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ₦{color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
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
              <span className="text-white">Welcome back,</span>{" "}
              <span className="text-gradient">Sarah!</span>
            </h1>
            <p className="text-xl text-gray-300">
              Your teaching empire is thriving! Here's what's happening today.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              {
                icon: Plus,
                label: "Create Course",
                color: "from-neon-blue to-cyan-400",
                url: "/tutor/courses/create",
              },
              {
                icon: Calendar,
                label: "Schedule Mentorship",
                color: "from-neon-purple to-pink-400",
                url: "/tutor/mentorships/schedule",
              },
              {
                icon: Award,
                label: "Create Project",
                color: "from-neon-green to-emerald-400",
                url: "/tutor/projects/create",
              },
              {
                icon: BarChart3,
                label: "View Analytics",
                color: "from-neon-orange to-yellow-400",
                url: "/tutor/analytics",
              },
            ].map((action, index) => (
              <Link href={action.url!}>
                <motion.button
                  key={action.label}
                  className={`flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r ₦{action.color} text-white font-semibold hover-glow group`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <action.icon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  {action.label}
                </motion.button>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={Users}
              title="Total Students"
              value={dashboardData.stats.totalStudents.toLocaleString()}
              change={12}
              color="from-neon-blue to-cyan-400"
            />
            <StatCard
              icon={DollarSign}
              title="Total Earnings"
              value={`₦₦{dashboardData.stats.totalEarnings.toLocaleString()}`}
              change={8}
              color="from-neon-green to-emerald-400"
            />
            <StatCard
              icon={Star}
              title="Average Rating"
              value={dashboardData.stats.averageRating}
              change={2}
              color="from-neon-orange to-yellow-400"
            />
            <StatCard
              icon={BookOpen}
              title="Courses Sold"
              value={dashboardData.stats.coursesSold.toLocaleString()}
              change={15}
              color="from-neon-purple to-pink-400"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Earnings Chart */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}>
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">
                        Monthly Earnings
                      </h3>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        +₦{dashboardData.stats.monthlyEarnings.toLocaleString()}{" "}
                        this month
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 text-neon-blue mx-auto mb-4" />
                        <p className="text-gray-300">
                          Earnings chart would be rendered here
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* My Courses */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}>
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">
                        My Courses
                      </h3>
                      <Button className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Course
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {dashboardData.courses.map((course, index) => (
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
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {course.students.toLocaleString()}
                            </div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-400" />
                              {course.rating}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1 text-green-400" />
                              ₦{course.earnings.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={`₦{
                              course.status === "active"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                            }`}>
                            {course.status}
                          </Badge>
                          <p className="text-gray-400 text-xs mt-1">
                            Updated {course.lastUpdated}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Pending Projects */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}>
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">
                        Pending Projects
                      </h3>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        {dashboardData.pendingProjects.length} awaiting review
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {dashboardData.pendingProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold group-hover:text-gradient transition-colors">
                              {project.title}
                            </h4>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                              <span>by {project.student}</span>
                              <span>•</span>
                              <span>{project.course}</span>
                              <span>•</span>
                              <span>Submitted {project.submitted}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                            Review
                          </Button>
                          <p className="text-gray-400 text-xs mt-1">
                            Due {project.dueDate}
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
                transition={{ duration: 0.8, delay: 0.3 }}>
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <h3 className="text-xl font-bold text-white">
                      Upcoming Mentorships
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {dashboardData.upcomingMentorships.map((session, index) => (
                      <div
                        key={session.id}
                        className="p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-semibold">
                            {session.student}
                          </h4>
                          <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                            ₦{session.price}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">
                          {session.topic}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>
                            {session.date} at {session.time}
                          </span>
                          <span>{session.duration} min</span>
                        </div>
                      </div>
                    ))}
                    <Button className="w-full bg-gradient-to-r from-neon-purple to-pink-400 text-white">
                      <Calendar className="w-4 h-4 mr-2" />
                      Manage Schedule
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}>
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <h3 className="text-xl font-bold text-white">
                      Recent Activity
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {dashboardData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ₦{
                            activity.type === "enrollment"
                              ? "bg-green-400"
                              : activity.type === "review"
                              ? "bg-yellow-400"
                              : activity.type === "mentorship"
                              ? "bg-blue-400"
                              : "bg-purple-400"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-gray-300 text-sm">
                            {activity.message}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Performance Metrics */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}>
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <h3 className="text-xl font-bold text-white">
                      Performance
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">
                          Course Completion Rate
                        </span>
                        <span className="text-white font-semibold">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">
                          Student Satisfaction
                        </span>
                        <span className="text-white font-semibold">4.9/5</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">
                          Response Time
                        </span>
                        <span className="text-white font-semibold">
                          &lt; 2h
                        </span>
                      </div>
                      <Progress value={85} className="h-2" />
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
