"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  LogOut,
  Crown,
  BookOpen,
  Trophy,
  Wallet,
  Star,
  Users,
  Calendar,
  MessageSquare,
  Shield,
  ChevronDown,
  Bell,
  Moon,
  Sun,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import type { UserRole } from "@/types/user";

interface UserProfileDropdownProps {
  userRole: UserRole;
  userName: string;
  userEmail: string;
  userAvatar?: string;
}

const roleMenuItems = {
  USER: [
    { icon: User, label: "Profile", href: "/profile" },
    { icon: BookOpen, label: "My Courses", href: "/courses" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ],
  STUDENT: [
    { icon: User, label: "Profile", href: "/student/profile" },
    { icon: BookOpen, label: "My Courses", href: "/student/courses" },
    { icon: Trophy, label: "Progress", href: "/student/progress" },
    { icon: Calendar, label: "Mentorship", href: "/student/mentorship" },
    { icon: MessageSquare, label: "Projects", href: "/student/projects" },
    { icon: Settings, label: "Settings", href: "/student/settings" },
  ],
  TUTOR: [
    { icon: User, label: "Profile", href: "/tutor/profile" },
    { icon: BookOpen, label: "My Courses", href: "/tutor/courses" },
    { icon: Users, label: "Students", href: "/tutor/students" },
    { icon: Wallet, label: "Earnings", href: "/tutor/wallet" },
    { icon: Star, label: "Reviews", href: "/tutor/reviews" },
    { icon: Calendar, label: "Schedule", href: "/tutor/schedule" },
    { icon: Settings, label: "Settings", href: "/tutor/settings" },
  ],
  ADMIN: [
    { icon: Shield, label: "Admin Panel", href: "/admin" },
    { icon: Users, label: "User Management", href: "/admin/users" },
    { icon: BookOpen, label: "Course Management", href: "/admin/courses" },
    { icon: Wallet, label: "Financial Reports", href: "/admin/finance" },
    { icon: Settings, label: "System Settings", href: "/admin/settings" },
  ],
};

const roleStats = {
  STUDENT: [
    { label: "Courses Enrolled", value: "12", icon: BookOpen },
    { label: "Completed", value: "8", icon: Trophy },
    { label: "Certificates", value: "5", icon: Star },
  ],
  TUTOR: [
    { label: "Total Students", value: "247", icon: Users },
    { label: "Courses Created", value: "15", icon: BookOpen },
    { label: "Rating", value: "4.9", icon: Star },
  ],
  ADMIN: [
    { label: "Total Users", value: "12.5K", icon: Users },
    { label: "Active Courses", value: "450", icon: BookOpen },
    { label: "Revenue", value: "$125K", icon: Wallet },
  ],
};

export function UserProfileDropdown({
  userRole,
  userName,
  userEmail,
  userAvatar,
}: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const menuItems = roleMenuItems[userRole];
  const stats = roleStats[userRole as keyof typeof roleStats];

  const getRoleColor = () => {
    switch (userRole) {
      case "ADMIN":
        return "from-red-500 to-red-600";
      case "TUTOR":
        return "from-neon-purple to-purple-600";
      case "STUDENT":
        return "from-neon-blue to-blue-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getRoleBadgeColor = () => {
    switch (userRole) {
      case "ADMIN":
        return "border-red-500 text-red-400 bg-red-500/10";
      case "TUTOR":
        return "border-neon-purple text-neon-purple bg-neon-purple/10";
      case "STUDENT":
        return "border-neon-blue text-neon-blue bg-neon-blue/10";
      default:
        return "border-gray-400 text-gray-400 bg-gray-400/10";
    }
  };

  return (
    <div className="relative">
      {/* Profile Trigger */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:bg-white/10 p-2"
          onClick={() => setIsOpen(!isOpen)}>
          <Avatar className="w-8 h-8 ring-2 ring-neon-blue/50 hover:ring-neon-blue transition-all duration-300">
            <AvatarImage
              src={userAvatar || "/placeholder.svg"}
              alt={userName}
            />
            <AvatarFallback
              className={`bg-gradient-to-r ${getRoleColor()} text-white text-sm`}>
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-white">{userName}</p>
            <p className="text-xs text-gray-400">{userRole}</p>
          </div>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </motion.div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Content */}
            <motion.div
              className="absolute right-0 top-full mt-2 w-80 glass-card border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}>
              {/* Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 ring-2 ring-neon-blue/50">
                    <AvatarImage
                      src={userAvatar || "/placeholder.svg"}
                      alt={userName}
                    />
                    <AvatarFallback
                      className={`bg-gradient-to-r ${getRoleColor()} text-white`}>
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{userName}</h3>
                    <p className="text-sm text-gray-400">{userEmail}</p>
                    <Badge className={`mt-1 text-xs ${getRoleBadgeColor()}`}>
                      {userRole === "ADMIN" && (
                        <Crown className="w-3 h-3 mr-1" />
                      )}
                      {userRole}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Stats (for Student, Tutor, Admin) */}
              {stats && (
                <div className="p-4 border-b border-white/10">
                  <div className="grid grid-cols-3 gap-3">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <stat.icon className="w-4 h-4 text-neon-blue" />
                        </div>
                        <p className="text-lg font-bold text-white">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Menu Items */}
              <div className="p-2">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200 text-gray-300 hover:text-white"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}>
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </motion.a>
                ))}
              </div>

              <Separator className="bg-white/10" />

              {/* Settings */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Notifications</span>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                    className="data-[state=checked]:bg-neon-blue"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {darkMode ? (
                      <Moon className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Sun className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-300">Dark Mode</span>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    className="data-[state=checked]:bg-neon-blue"
                  />
                </div>
              </div>

              <Separator className="bg-white/10" />

              {/* Footer Actions */}
              <div className="p-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10">
                  <HelpCircle className="w-4 h-4 mr-3" />
                  Help & Support
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10">
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
