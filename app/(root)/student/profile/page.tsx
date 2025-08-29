"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { UserRole } from "@/types/user";
import { motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  Brain,
  Calendar,
  Camera,
  Clock,
  Edit,
  FlameIcon as Fire,
  MapPin,
  Shield,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function StudentProfile() {
  const [userRole] = useState<UserRole>("STUDENT");
  const [userName] = useState("Alex Johnson");
  const [userAvatar] = useState("/placeholder.svg?height=40&width=40");
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate full-stack developer with a love for learning new technologies. Currently focusing on React, Node.js, and cloud architecture.",
    dateOfBirth: "1995-06-15",
    timezone: "America/Los_Angeles",
    language: "English",
    occupation: "Software Developer",
    company: "Tech Innovations Inc.",
    website: "https://alexjohnson.dev",
    github: "alexjohnson",
    linkedin: "alex-johnson-dev",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    courseReminders: true,
    mentorshipAlerts: true,
    achievementNotifications: true,
    weeklyProgress: true,
    marketingEmails: false,
    publicProfile: true,
    showProgress: true,
    showAchievements: true,
  });

  const studentStats = {
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    streak: 7,
    coursesCompleted: 8,
    coursesInProgress: 3,
    totalHours: 124,
    achievements: 15,
    rank: "Advanced Learner",
    joinDate: "January 2024",
    averageRating: 4.8,
  };

  const achievements = [
    {
      id: 1,
      title: "Speed Learner",
      description: "Completed 3 lessons in one day",
      icon: Zap,
      color: "from-yellow-400 to-orange-500",
      earned: "2 days ago",
      rarity: "Common",
    },
    {
      id: 2,
      title: "Streak Master",
      description: "7-day learning streak",
      icon: Fire,
      color: "from-red-500 to-pink-500",
      earned: "Today",
      rarity: "Rare",
    },
    {
      id: 3,
      title: "Code Warrior",
      description: "Completed 50 coding challenges",
      icon: Trophy,
      color: "from-purple-500 to-indigo-500",
      earned: "1 week ago",
      rarity: "Epic",
    },
    {
      id: 4,
      title: "Knowledge Seeker",
      description: "Enrolled in 10+ courses",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      earned: "2 weeks ago",
      rarity: "Uncommon",
    },
    {
      id: 5,
      title: "Perfect Score",
      description: "Achieved 100% on 5 quizzes",
      icon: Star,
      color: "from-green-500 to-emerald-500",
      earned: "3 weeks ago",
      rarity: "Rare",
    },
    {
      id: 6,
      title: "Brain Power",
      description: "Completed advanced AI course",
      icon: Brain,
      color: "from-pink-500 to-rose-500",
      earned: "1 month ago",
      rarity: "Legendary",
    },
  ];

  const [learningGoals, setLearningGoals] = useState([
    {
      id: 1,
      title: "Master React Advanced Patterns",
      progress: 68,
      target: "Complete by March 2024",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Build Full-Stack Application",
      progress: 34,
      target: "Deploy by April 2024",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Learn Machine Learning Basics",
      progress: 12,
      target: "Finish by May 2024",
      status: "Started",
    },
    {
      id: 4,
      title: "Get AWS Certification",
      progress: 0,
      target: "Exam by June 2024",
      status: "Planned",
    },
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
    console.log("Saving profile data:", profileData);
  };

  const handlAddGoal = () => {
    const newGoal = {
      id: Date.now(),
      title: "New Learning Goal",
      progress: 0,
      target: "Set your target date",
      status: "Planned",
    };
    setLearningGoals([...learningGoals, newGoal]);
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
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} p-4 group-hover:scale-110 transition-transform duration-300`}>
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
          className="absolute top-20 left-20 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl"
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
              <span className="text-gradient">Profile</span>
            </h1>
            <p className="text-xl text-gray-300">
              Manage your account and learning preferences
            </p>
          </motion.div>

          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12">
            <Card className="glass-card border-white/10">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={userAvatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-neon-blue to-neon-purple text-white text-2xl">
                        {profileData.firstName[0]}
                        {profileData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple">
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {profileData.firstName} {profileData.lastName}
                    </h2>
                    <p className="text-gray-300 mb-4">{profileData.bio}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{profileData.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {studentStats.joinDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        <span>{studentStats.rank}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={BookOpen}
              title="Courses Completed"
              value={studentStats.coursesCompleted}
              subtitle={`${studentStats.coursesInProgress} in progress`}
              color="from-neon-blue to-cyan-400"
            />
            <StatCard
              icon={Clock}
              title="Learning Hours"
              value={`${studentStats.totalHours}h`}
              subtitle="This month: 24h"
              color="from-neon-green to-emerald-400"
            />
            <StatCard
              icon={Trophy}
              title="Achievements"
              value={studentStats.achievements}
              subtitle="3 this week"
              color="from-neon-orange to-yellow-400"
            />
            <StatCard
              icon={Fire}
              title="Current Streak"
              value={`${studentStats.streak} days`}
              subtitle="Personal best: 12"
              color="from-neon-purple to-pink-400"
            />
          </div>

          {/* Profile Tabs */}
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4 text-foreground bg-white/10 border border-white/20 mb-8">
              <TabsTrigger
                value="personal"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-blue data-[state=active]:to-neon-purple data-[state=active]:text-white">
                Personal Info
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-green data-[state=active]:to-emerald-400 data-[state=active]:text-white">
                Achievements
              </TabsTrigger>
              <TabsTrigger
                value="goals"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-orange data-[state=active]:to-yellow-400 data-[state=active]:text-white">
                Learning Goals
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple data-[state=active]:to-pink-400 data-[state=active]:text-white">
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-8">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            firstName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            lastName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-white">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            location: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="occupation" className="text-white">
                        Occupation
                      </Label>
                      <Input
                        id="occupation"
                        value={profileData.occupation}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            occupation: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-white">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                      disabled={!isEditing}
                      rows={4}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-50"
                    />
                  </div>
                  {isEditing && (
                    <div className="flex gap-4">
                      <Button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-neon-green to-emerald-400 text-white">
                        Save Changes
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-8">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">
                    Achievements & Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className={`w-16 h-16 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center`}>
                            <achievement.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold">
                              {achievement.title}
                            </h4>
                            <Badge
                              className={`text-xs mt-1 ${
                                achievement.rarity === "Legendary"
                                  ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                  : achievement.rarity === "Epic"
                                  ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                                  : achievement.rarity === "Rare"
                                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                  : achievement.rarity === "Uncommon"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                              }`}>
                              {achievement.rarity}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">
                          {achievement.description}
                        </p>
                        <p className="text-gray-400 text-xs">
                          Earned {achievement.earned}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-8">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-white">
                      Learning Goals
                    </CardTitle>
                    <Button
                      onClick={handlAddGoal}
                      className="bg-gradient-to-r from-neon-orange to-yellow-400 text-white">
                      <Target className="w-4 h-4 mr-2" />
                      Add Goal
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {learningGoals.map((goal, index) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white font-semibold text-lg">
                          {goal.title}
                        </h4>
                        <Badge
                          className={`${
                            goal.status === "In Progress"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : goal.status === "Started"
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                          }`}>
                          {goal.status}
                        </Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-neon-orange to-yellow-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{goal.target}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      {
                        key: "emailNotifications",
                        label: "Email Notifications",
                      },
                      { key: "pushNotifications", label: "Push Notifications" },
                      { key: "courseReminders", label: "Course Reminders" },
                      { key: "mentorshipAlerts", label: "Mentorship Alerts" },
                      {
                        key: "achievementNotifications",
                        label: "Achievement Notifications",
                      },
                      {
                        key: "weeklyProgress",
                        label: "Weekly Progress Reports",
                      },
                      { key: "marketingEmails", label: "Marketing Emails" },
                    ].map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between">
                        <Label htmlFor={setting.key} className="text-white">
                          {setting.label}
                        </Label>
                        <Switch
                          id={setting.key}
                          checked={
                            preferences[setting.key as keyof typeof preferences]
                          }
                          onCheckedChange={(checked) =>
                            setPreferences({
                              ...preferences,
                              [setting.key]: checked,
                            })
                          }
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Privacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { key: "publicProfile", label: "Public Profile" },
                      { key: "showProgress", label: "Show Learning Progress" },
                      { key: "showAchievements", label: "Show Achievements" },
                    ].map((setting) => (
                      <div
                        key={setting.key}
                        className="flex items-center justify-between">
                        <Label htmlFor={setting.key} className="text-white">
                          {setting.label}
                        </Label>
                        <Switch
                          id={setting.key}
                          checked={
                            preferences[setting.key as keyof typeof preferences]
                          }
                          onCheckedChange={(checked) =>
                            setPreferences({
                              ...preferences,
                              [setting.key]: checked,
                            })
                          }
                        />
                      </div>
                    ))}
                    <div className="space-y-2">
                      <Label htmlFor="timezone" className="text-white">
                        Timezone
                      </Label>
                      <Select value={profileData.timezone}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Los_Angeles">
                            Pacific Time
                          </SelectItem>
                          <SelectItem value="America/Denver">
                            Mountain Time
                          </SelectItem>
                          <SelectItem value="America/Chicago">
                            Central Time
                          </SelectItem>
                          <SelectItem value="America/New_York">
                            Eastern Time
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language" className="text-white">
                        Language
                      </Label>
                      <Select value={profileData.language}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="German">German</SelectItem>
                        </SelectContent>
                      </Select>
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
