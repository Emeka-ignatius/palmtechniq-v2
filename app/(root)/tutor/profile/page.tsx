"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Camera,
  Globe,
  Clock,
  DollarSign,
  Award,
  BookOpen,
  Plus,
  X,
  Save,
  Eye,
  Shield,
  Bell,
  Languages,
  Briefcase,
  LinkIcon,
  Youtube,
  Linkedin,
  Twitter,
  Github,
  Instagram,
} from "lucide-react";
import type { UserRole } from "@/types/user";

export default function TutorProfilePage() {
  const [userRole] = useState<UserRole>("TUTOR");
  const [userName] = useState("Sarah Chen");
  const [userAvatar] = useState("/placeholder.svg?height=40&width=40");
  const [activeTab, setActiveTab] = useState("basic");
  const [profileImage, setProfileImage] = useState(
    "/placeholder.svg?height=120&width=120"
  );
  const [skills, setSkills] = useState([
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Machine Learning",
  ]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-12 relative overflow-hidden">
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
              className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Profile <span className="text-gradient">Management</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Customize your tutor profile and settings
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="gap-2 border-white/20 text-white hover:bg-white/10 bg-transparent">
                  <Eye className="w-4 h-4" />
                  Preview Profile
                </Button>
                <Button className="gap-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </motion.div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-8">
              <TabsList className="grid w-full grid-cols-6 bg-white/5 backdrop-blur-sm border border-white/10">
                <TabsTrigger
                  value="basic"
                  className="gap-2 text-white data-[state=active]:bg-white/10">
                  <User className="w-4 h-4" />
                  Basic Info
                </TabsTrigger>
                <TabsTrigger
                  value="professional"
                  className="gap-2 text-white data-[state=active]:bg-white/10">
                  <Briefcase className="w-4 h-4" />
                  Professional
                </TabsTrigger>
                <TabsTrigger
                  value="availability"
                  className="gap-2 text-white data-[state=active]:bg-white/10">
                  <Clock className="w-4 h-4" />
                  Availability
                </TabsTrigger>
                <TabsTrigger
                  value="pricing"
                  className="gap-2 text-white data-[state=active]:bg-white/10">
                  <DollarSign className="w-4 h-4" />
                  Pricing
                </TabsTrigger>
                <TabsTrigger
                  value="social"
                  className="gap-2 text-white data-[state=active]:bg-white/10">
                  <Globe className="w-4 h-4" />
                  Social
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="gap-2 text-white data-[state=active]:bg-white/10">
                  <Shield className="w-4 h-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}>
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <User className="w-5 h-5" />
                        Basic Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Profile Image */}
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <Avatar className="w-24 h-24">
                            <AvatarImage
                              src={profileImage || "/placeholder.svg"}
                            />
                            <AvatarFallback className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                              SC
                            </AvatarFallback>
                          </Avatar>
                          <Button
                            size="sm"
                            className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-gradient-to-r from-neon-blue to-neon-purple"
                            onClick={() =>
                              document.getElementById("profile-upload")?.click()
                            }>
                            <Camera className="w-4 h-4" />
                          </Button>
                          <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = URL.createObjectURL(file);
                                setProfileImage(url);
                              }
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            Profile Photo
                          </h3>
                          <p className="text-sm text-gray-300">
                            Upload a professional photo
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            JPG, PNG or GIF. Max size 5MB
                          </p>
                        </div>
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-white">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            defaultValue="Sarah"
                            className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-white">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            defaultValue="Chen"
                            className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue="sarah.chen@example.com"
                            className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-white">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            defaultValue="+1 (555) 123-4567"
                            className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>

                      {/* Bio */}
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-white">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell students about yourself, your experience, and teaching style..."
                          className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder-gray-400"
                          defaultValue="Passionate full-stack developer with 8+ years of experience in modern web technologies. I love teaching and helping students master JavaScript, React, and backend development through hands-on projects and real-world applications."
                        />
                        <p className="text-xs text-gray-400">
                          0/500 characters
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Professional Tab */}
              <TabsContent value="professional" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Skills & Expertise */}
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Award className="w-5 h-5" />
                        Skills & Expertise
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <Badge
                            key={skill}
                            className="gap-1 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-white border-neon-blue/30">
                            {skill}
                            <X
                              className="w-3 h-3 cursor-pointer hover:text-red-400 transition-colors"
                              onClick={() => removeSkill(skill)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill..."
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addSkill()}
                          className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                        />
                        <Button
                          onClick={addSkill}
                          size="sm"
                          className="bg-gradient-to-r from-neon-blue to-neon-purple">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Languages */}
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Languages className="w-5 h-5" />
                        Languages
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { language: "English", level: "Native" },
                        { language: "Spanish", level: "Fluent" },
                        { language: "French", level: "Intermediate" },
                      ].map((lang, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <p className="font-medium text-white">
                              {lang.language}
                            </p>
                            <p className="text-sm text-gray-300">
                              {lang.level}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/10">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full gap-2 border-white/20 text-white hover:bg-white/10 bg-transparent">
                        <Plus className="w-4 h-4" />
                        Add Language
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Availability Tab */}
              <TabsContent value="availability" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}>
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Clock className="w-5 h-5" />
                        Weekly Availability
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        "monday",
                        "tuesday",
                        "wednesday",
                        "thursday",
                        "friday",
                        "saturday",
                        "sunday",
                      ].map((day) => (
                        <div
                          key={day}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-4">
                            <Switch
                              defaultChecked={
                                day !== "saturday" && day !== "sunday"
                              }
                            />
                            <span className="font-medium capitalize text-white w-20">
                              {day}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="time"
                              defaultValue="09:00"
                              className="w-32 bg-white/5 border-white/10 text-white"
                            />
                            <span className="text-gray-400">to</span>
                            <Input
                              type="time"
                              defaultValue="17:00"
                              className="w-32 bg-white/5 border-white/10 text-white"
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Pricing Tab */}
              <TabsContent value="pricing" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <DollarSign className="w-5 h-5" />
                        Mentorship Rates
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        {
                          title: "1-on-1 Session (30 min)",
                          desc: "Individual mentorship",
                          price: 69,
                        },
                        {
                          title: "1-on-1 Session (60 min)",
                          desc: "Extended mentorship",
                          price: 129,
                        },
                        {
                          title: "Code Review",
                          desc: "Project feedback",
                          price: 49,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="font-medium text-white">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-300">{item.desc}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-white">
                              ${item.price}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white hover:bg-white/10">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <BookOpen className="w-5 h-5" />
                        Course Pricing
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-white">
                          Default Course Price
                        </Label>
                        <Input
                          type="number"
                          placeholder="99"
                          className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">
                          Discount Percentage
                        </Label>
                        <Input
                          type="number"
                          placeholder="20"
                          className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-white">
                          Enable Dynamic Pricing
                        </Label>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Social Tab */}
              <TabsContent value="social" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}>
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Globe className="w-5 h-5" />
                        Social Links
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            icon: LinkIcon,
                            label: "Website",
                            placeholder: "https://yourwebsite.com",
                          },
                          {
                            icon: Linkedin,
                            label: "LinkedIn",
                            placeholder: "https://linkedin.com/in/username",
                          },
                          {
                            icon: Twitter,
                            label: "Twitter",
                            placeholder: "https://twitter.com/username",
                          },
                          {
                            icon: Github,
                            label: "GitHub",
                            placeholder: "https://github.com/username",
                          },
                          {
                            icon: Youtube,
                            label: "YouTube",
                            placeholder: "https://youtube.com/@username",
                          },
                          {
                            icon: Instagram,
                            label: "Instagram",
                            placeholder: "https://instagram.com/username",
                          },
                        ].map((social, index) => (
                          <div key={index} className="space-y-2">
                            <Label className="flex items-center gap-2 text-white">
                              <social.icon className="w-4 h-4" />
                              {social.label}
                            </Label>
                            <Input
                              placeholder={social.placeholder}
                              className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Bell className="w-5 h-5" />
                        Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        {
                          title: "Email Notifications",
                          desc: "Receive updates via email",
                          checked: true,
                        },
                        {
                          title: "New Student Enrollments",
                          desc: "Get notified of new enrollments",
                          checked: true,
                        },
                        {
                          title: "Mentorship Bookings",
                          desc: "Session booking notifications",
                          checked: true,
                        },
                        {
                          title: "Weekly Reports",
                          desc: "Performance summaries",
                          checked: false,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-white">
                              {item.title}
                            </p>
                            <p className="text-sm text-gray-300">{item.desc}</p>
                          </div>
                          <Switch defaultChecked={item.checked} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Shield className="w-5 h-5" />
                        Privacy & Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">
                            Profile Visibility
                          </p>
                          <p className="text-sm text-gray-300">
                            Show profile to students
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">
                            Show Contact Info
                          </p>
                          <p className="text-sm text-gray-300">
                            Display email and phone
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">
                            Two-Factor Authentication
                          </p>
                          <p className="text-sm text-gray-300">
                            Extra security for your account
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                          Enable
                        </Button>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                        Change Password
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  );
}
