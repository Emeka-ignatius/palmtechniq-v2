"use client";

import { UserProfileDropdown } from "@/components/auth/user-profile-dropdown";
import { ShoppingCartComponent } from "@/components/cart/shopping-cart";
import { NotificationsDropdown } from "@/components/notifications/notifications-dropdown";
import { Button } from "@/components/ui/button";
import type { UserRole } from "@/types/user";
import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Calendar,
  Home,
  MessageSquare,
  Settings,
  ShoppingCart,
  Trophy,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavigationProps {
  userRole: UserRole;
  userName: string;
  userEmail: string;
  userAvatar?: string;
}

const roleNavItems = {
  USER: [
    { icon: Home, label: "Home", href: "/" },
    { icon: BookOpen, label: "Courses", href: "/courses" },
    { icon: ShoppingCart, label: "Cart", href: "/cart" },
    { icon: User, label: "Profile", href: "/profile" },
  ],
  STUDENT: [
    { icon: Home, label: "Dashboard", href: "/student" },
    { icon: BookOpen, label: "My Courses", href: "/student/courses" },
    { icon: Trophy, label: "Progress", href: "/student/progress" },
    { icon: Calendar, label: "Mentorship", href: "/student/mentorship" },
    { icon: Brain, label: "AI Interview", href: "/student/ai-interview" },
    { icon: MessageSquare, label: "Projects", href: "/student/assignments" },
  ],
  TUTOR: [
    { icon: Home, label: "Dashboard", href: "/tutor" },
    { icon: BookOpen, label: "My Courses", href: "/tutor/courses" },
    { icon: Users, label: "Students", href: "/tutor/students" },
    { icon: Calendar, label: "Schedule", href: "/tutor/mentorship" },
    { icon: MessageSquare, label: "Projects", href: "/tutor/projects" },
    { icon: MessageSquare, label: "Messages", href: "/tutor/messages" },
  ],
  ADMIN: [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: BookOpen, label: "Courses", href: "/admin/courses" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ],
};

export function Navigation({
  userRole,
  userName,
  userEmail,
  userAvatar,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = roleNavItems[userRole];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all w-full duration-300 ${
        isScrolled
          ? "glass-card border-b border-white/10 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className=" mx-auto md:px-0  px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex justify-center mx-auto items-center space-x-1"
            whileHover={{ scale: 1.05 }}>
            <Image
              src="/assets/standalone.png"
              alt=""
              width={100}
              height={100}
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold text-gradient">
              PalmTechnIQ
            </span>
          </motion.div>

          {/* Search Bar */}
          {/* <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search courses, tutors, or topics..."
                className="pl-10 glass-card border-white/20 focus:border-neon-blue/50 transition-all duration-300"
              />
            </div>
          </div> */}

          {/* Navigation Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}>
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className="hover-glow hover:bg-white/10 hover:text-neon-blue transition-all duration-300">
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Shopping Cart */}
            <ShoppingCartComponent />

            {/* Notifications */}
            <NotificationsDropdown />

            {/* Role Badge */}
            {/* <Badge
              variant="outline"
              className={`
                border-2 px-3 py-1 font-semibold hidden sm:flex
                ${userRole === "ADMIN" ? "border-red-500 text-red-400" : ""}
                ${
                  userRole === "TUTOR"
                    ? "border-neon-purple text-neon-purple"
                    : ""
                }
                ${
                  userRole === "STUDENT"
                    ? "border-neon-blue text-neon-blue"
                    : ""
                }
                ${userRole === "USER" ? "border-gray-400 text-gray-400" : ""}
              `}>
              {userRole}
            </Badge> */}

            {/* User Profile Dropdown */}
            <UserProfileDropdown
              userRole={userRole}
              userName={userName}
              userEmail={userEmail}
              userAvatar={userAvatar}
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
