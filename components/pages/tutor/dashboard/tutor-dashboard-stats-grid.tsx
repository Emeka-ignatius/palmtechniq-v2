"use client";

import { NairaSign } from "@/components/shared/naira-sign-icon";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Star, TrendingUp, Users } from "lucide-react";

interface Stats {
  totalStudents: number;
  totalEarnings: number;
  averageRating: number;
  coursesSold: number;
}

export function TutorDashboardStatsGrid({ stats }: { stats: Stats }) {
  const StatCard = ({
    icon: Icon,
    title,
    value,
    change,
    color,
  }: {
    icon: any;
    title: string;
    value: string | number;
    change?: number;
    color: string;
  }) => (
    <motion.div whileHover={{ scale: 1.05 }} className="group">
      <Card className="glass-card hover-glow border-white/10 overflow-hidden relative">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">{title}</p>
              <p className="text-3xl font-bold text-white mt-2">{value}</p>
              {change && (
                <div
                  className={`flex items-center mt-2 text-sm ${
                    change > 0 ? "text-green-400" : "text-red-400"
                  }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {change > 0 ? "+" : ""}
                  {change}% from last month
                </div>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatCard
        icon={Users}
        title="Total Students"
        value={stats.totalStudents.toLocaleString()}
        change={12}
        color="from-neon-blue to-cyan-400"
      />
      <StatCard
        icon={NairaSign}
        title="Total Earnings"
        value={`₦${stats.totalEarnings.toLocaleString()}`}
        change={8}
        color="from-neon-green to-emerald-400"
      />
      <StatCard
        icon={Star}
        title="Average Rating"
        value={stats.averageRating}
        change={2}
        color="from-neon-orange to-yellow-400"
      />
      <StatCard
        icon={BookOpen}
        title="Courses Sold"
        value={stats.coursesSold.toLocaleString()}
        change={15}
        color="from-neon-purple to-pink-400"
      />
    </div>
  );
}
