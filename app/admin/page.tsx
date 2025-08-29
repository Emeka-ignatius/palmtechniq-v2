"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Activity,
  UserCheck,
  AlertTriangle,
  Star,
  BarChart3,
  Settings,
  Shield,
  Bell,
  Download,
  Filter,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Plus,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const statsCards = [
  {
    title: "Total Users",
    value: "12,547",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Active Courses",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: BookOpen,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Monthly Revenue",
    value: "$125,430",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "Completion Rate",
    value: "87.3%",
    change: "+2.1%",
    trend: "up",
    icon: TrendingUp,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
]

const recentUsers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "STUDENT",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-15",
    status: "active",
    courses: 5,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    email: "michael@example.com",
    role: "TUTOR",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-14",
    status: "active",
    courses: 12,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@example.com",
    role: "STUDENT",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-13",
    status: "pending",
    courses: 2,
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@example.com",
    role: "TUTOR",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-12",
    status: "active",
    courses: 8,
  },
]

const topCourses = [
  {
    id: "1",
    title: "Advanced React Development",
    instructor: "Sarah Johnson",
    students: 1247,
    revenue: "$24,940",
    rating: 4.8,
    completion: 89,
  },
  {
    id: "2",
    title: "Python for Data Science",
    instructor: "Dr. Michael Chen",
    students: 987,
    revenue: "$19,740",
    rating: 4.9,
    completion: 92,
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass",
    instructor: "Emily Rodriguez",
    students: 756,
    revenue: "$15,120",
    rating: 4.7,
    completion: 85,
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    instructor: "James Wilson",
    students: 654,
    revenue: "$13,080",
    rating: 4.6,
    completion: 78,
  },
]

const systemAlerts = [
  {
    id: "1",
    type: "warning",
    title: "High Server Load",
    message: "Server CPU usage is at 85%. Consider scaling resources.",
    timestamp: "5 minutes ago",
  },
  {
    id: "2",
    type: "info",
    title: "Scheduled Maintenance",
    message: "System maintenance scheduled for tonight at 2 AM UTC.",
    timestamp: "1 hour ago",
  },
  {
    id: "3",
    type: "success",
    title: "Backup Completed",
    message: "Daily database backup completed successfully.",
    timestamp: "3 hours ago",
  },
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("overview")

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "border-red-500 text-red-400 bg-red-500/10"
      case "TUTOR":
        return "border-purple-500 text-purple-400 bg-purple-500/10"
      case "STUDENT":
        return "border-blue-500 text-blue-400 bg-blue-500/10"
      default:
        return "border-gray-500 text-gray-400 bg-gray-500/10"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-green-500 text-green-400 bg-green-500/10"
      case "pending":
        return "border-yellow-500 text-yellow-400 bg-yellow-500/10"
      case "suspended":
        return "border-red-500 text-red-400 bg-red-500/10"
      default:
        return "border-gray-500 text-gray-400 bg-gray-500/10"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "success":
        return <UserCheck className="w-4 h-4 text-green-400" />
      default:
        return <Bell className="w-4 h-4 text-blue-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 pt-24">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your platform, users, and analytics from one central location</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button variant="outline" className="border-neon-blue/50 hover:bg-neon-blue/10 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button className="bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-blue/80 hover:to-neon-purple/80">
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-white/10 hover-glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                        <span className="text-green-400 text-xs font-medium">{stat.change}</span>
                        <span className="text-gray-500 text-xs ml-1">vs last month</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="glass-card border-white/10 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-neon-blue/20">
                <Activity className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-neon-blue/20">
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:bg-neon-blue/20">
                <BookOpen className="w-4 h-4 mr-2" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-neon-blue/20">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-neon-blue/20">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Users */}
                <div className="lg:col-span-2">
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">Recent Users</CardTitle>
                        <Button variant="ghost" size="sm" className="text-neon-blue hover:text-neon-blue/80">
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentUsers.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-white">{user.name}</p>
                                <p className="text-sm text-gray-400">{user.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                              <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="w-8 h-8">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="glass-card border-white/10">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-400">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* System Alerts */}
                <div>
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Shield className="w-5 h-5 text-neon-blue" />
                        System Alerts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {systemAlerts.map((alert) => (
                          <div
                            key={alert.id}
                            className="p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              {getAlertIcon(alert.type)}
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-white text-sm">{alert.title}</p>
                                <p className="text-gray-400 text-xs mt-1">{alert.message}</p>
                                <p className="text-gray-500 text-xs mt-2">{alert.timestamp}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Top Courses */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10">
                          <TableHead className="text-gray-400">Course</TableHead>
                          <TableHead className="text-gray-400">Instructor</TableHead>
                          <TableHead className="text-gray-400">Students</TableHead>
                          <TableHead className="text-gray-400">Revenue</TableHead>
                          <TableHead className="text-gray-400">Rating</TableHead>
                          <TableHead className="text-gray-400">Completion</TableHead>
                          <TableHead className="text-gray-400">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topCourses.map((course) => (
                          <TableRow key={course.id} className="border-white/10 hover:bg-white/5">
                            <TableCell className="font-medium text-white">{course.title}</TableCell>
                            <TableCell className="text-gray-300">{course.instructor}</TableCell>
                            <TableCell className="text-gray-300">{course.students.toLocaleString()}</TableCell>
                            <TableCell className="text-green-400 font-medium">{course.revenue}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-gray-300">{course.rating}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={course.completion} className="w-16 h-2" />
                                <span className="text-gray-300 text-sm">{course.completion}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="w-8 h-8">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="glass-card border-white/10">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Course
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-400">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Archive Course
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <CardTitle className="text-white">User Management</CardTitle>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 glass-card border-white/20 w-64"
                        />
                      </div>
                      <Button variant="outline" className="border-neon-blue/50 bg-transparent">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">User Management Interface</p>
                    <p className="text-gray-500 text-sm">Advanced user management features coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Course Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Course Management Interface</p>
                    <p className="text-gray-500 text-sm">Comprehensive course management tools coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Advanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Analytics Dashboard</p>
                    <p className="text-gray-500 text-sm">Detailed analytics and reporting features coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">System Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Settings className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">System Configuration</p>
                    <p className="text-gray-500 text-sm">
                      Advanced system settings and configuration options coming soon!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
