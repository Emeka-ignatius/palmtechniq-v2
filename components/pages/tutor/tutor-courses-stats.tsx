"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, DollarSign } from "lucide-react";

interface CourseWithStats {
  studentsCount: number;
  avgRating: number;
  earnings: number;
}

export default function TutorCoursesStats({
  courses,
}: {
  courses: CourseWithStats[];
}) {
  const totalStudents = courses.reduce((acc, c) => acc + c.studentsCount, 0);
  const avgRating =
    courses.length > 0
      ? (
          courses.reduce((acc, c) => acc + c.avgRating, 0) / courses.length
        ).toFixed(1)
      : "0.0";
  const totalEarnings = courses.reduce((acc, c) => acc + c.earnings, 0);

  const stats = [
    {
      label: "Total Students",
      value: totalStudents,
      icon: <Users className="w-5 h-5 text-blue-500" />,
    },
    {
      label: "Average Rating",
      value: avgRating,
      icon: <Star className="w-5 h-5 text-yellow-500" />,
    },
    {
      label: "Total Earnings",
      value: `₦${totalEarnings.toLocaleString()}`,
      icon: "₦",
    },
  ];

  return (
    <div className="grid text-center grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((s) => (
        <Card
          key={s.label}
          className="glass-card border-white/10 flex flex-col items-center">
          <CardHeader className="items-center mx-auto space-x-3 pb-2">
            {s.icon}
            <CardTitle className="text-white text-base">{s.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{s.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
