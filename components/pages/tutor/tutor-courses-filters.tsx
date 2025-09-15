"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface Course {
  id: string;
  title: string;
  thumbnail: string | null;
  studentsCount: number;
  avgRating: number;
  earnings: number;
  status: "draft" | "published" | "archived";
  createdAt: string;
}

interface TutorCoursesFiltersProps {
  courses: Course[];
  onFilter: (filteredCourses: Course[]) => void; // callback to parent
}

export function TutorCoursesFilters({
  courses,
  onFilter,
}: TutorCoursesFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // compute filtered courses
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // search
    if (searchQuery) {
      result = result.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // filter by status
    if (statusFilter !== "all") {
      result = result.filter((course) => course.status === statusFilter);
    }

    // sorting
    switch (sortBy) {
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "popular":
        result.sort((a, b) => b.studentsCount - a.studentsCount);
        break;
      case "earnings":
        result.sort((a, b) => b.earnings - a.earnings);
        break;
      default: // newest
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return result;
  }, [courses, searchQuery, statusFilter, sortBy]);

  // update parent when filters change
  useEffect(() => {
    onFilter(filteredCourses);
  }, [filteredCourses, onFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <div className="relative flex-1 md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent className="bg-black/90 backdrop-blur-sm border-white/10">
            <SelectItem value="all" className="text-white hover:bg-white/10">
              All Status
            </SelectItem>
            <SelectItem
              value="published"
              className="text-white hover:bg-white/10">
              Published
            </SelectItem>
            <SelectItem value="draft" className="text-white hover:bg-white/10">
              Draft
            </SelectItem>
            <SelectItem
              value="archived"
              className="text-white hover:bg-white/10">
              Archived
            </SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-black/90 backdrop-blur-sm border-white/10">
            <SelectItem value="newest" className="text-white hover:bg-white/10">
              Newest First
            </SelectItem>
            <SelectItem value="oldest" className="text-white hover:bg-white/10">
              Oldest First
            </SelectItem>
            <SelectItem
              value="popular"
              className="text-white hover:bg-white/10">
              Most Popular
            </SelectItem>
            <SelectItem
              value="earnings"
              className="text-white hover:bg-white/10">
              Highest Earnings
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
}
