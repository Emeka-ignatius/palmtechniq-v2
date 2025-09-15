"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export function TutorCoursesHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white">My Courses</h1>
        <p className="text-gray-400">
          Manage your courses, track performance, and create new ones.
        </p>
      </div>
      <Link href="/tutor/courses/create">
        <Button className="bg-gradient-to-r from-neon-blue to-neon-purple">
          <PlusCircle className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </Link>
    </div>
  );
}
