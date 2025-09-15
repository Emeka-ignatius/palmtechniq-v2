"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function TutorCoursesEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-gray-400 mb-4">You haven’t created any courses yet.</p>
      <Link href="/tutor/courses/create">
        <Button className="bg-gradient-to-r from-neon-blue to-neon-purple">
          Create your first course
        </Button>
      </Link>
    </div>
  );
}
