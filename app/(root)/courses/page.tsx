"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Star,
  Clock,
  Users,
  MapPin,
  Video,
  Zap,
  Trophy,
  BookOpen,
  Flame,
  Target,
  Crown,
  Play,
  TrendingUp,
  Award,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LiveActivityTicker,
  FlashSaleTimer,
  CoursePreviewModal,
  TrustSignals,
  SuccessStoryPopup,
  LiveChatWidget,
} from "@/components/conversion-features";
import {
  ReferralFloatingWidget,
  ReferralSuccessNotification,
} from "@/components/referral-system";
import {
  AIRecommendations,
  LearningPathRecommendations,
} from "@/components/ai-recommendations";
import {
  DynamicPriceDisplay,
  DemandSurgeNotification,
} from "@/components/dynamic-pricing";
import { GroupBuyingWidget } from "@/components/group-buying";
import type { UserRole } from "@/types/user";

const courseTypes = [
  {
    id: "all",
    name: "All Courses",
    icon: BookOpen,
    color: "from-gray-400 to-gray-600",
  },
  {
    id: "crash",
    name: "Crash Courses",
    icon: Zap,
    color: "from-red-500 to-orange-400",
  },
  {
    id: "beginner",
    name: "Beginner",
    icon: Target,
    color: "from-green-500 to-emerald-400",
  },
  {
    id: "intermediate",
    name: "Intermediate",
    icon: Trophy,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "advanced",
    name: "Advanced",
    icon: Crown,
    color: "from-purple-500 to-pink-400",
  },
  {
    id: "masterclass",
    name: "Masterclass",
    icon: Flame,
    color: "from-yellow-500 to-red-400",
  },
];

const courses = [
  {
    id: 1,
    title: "React Crash Course - Build 5 Projects",
    instructor: "Sarah Chen",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    thumbnail: "/placeholder.svg?height=200&width=300",
    basePrice: 99,
    currentPrice: 49,
    demandLevel: "high" as const,
    priceChangeIn: 45, // minutes
    rating: 4.9,
    students: 12450,
    duration: "8 hours",
    level: "crash",
    category: "Programming",
    isVirtual: true,
    isPhysical: false,
    location: null,
    tags: ["React", "JavaScript", "Frontend"],
    description: "Master React in record time with 5 real-world projects",
    isTrending: true,
    isFlashSale: true,
    flashSaleEnd: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    spotsLeft: 7,
    recentEnrollments: 23,
    salaryIncrease: "40%",
    completionRate: 94,
    hasPreview: true,
    hasGroupBuying: true,
  },
  {
    id: 2,
    title: "Complete Python Bootcamp: Zero to Hero",
    instructor: "Marcus Johnson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    thumbnail: "/placeholder.svg?height=200&width=300",
    basePrice: 149,
    currentPrice: 79,
    demandLevel: "medium" as const,
    priceChangeIn: 60, // minutes
    rating: 4.8,
    students: 8920,
    duration: "40 hours",
    level: "beginner",
    category: "Programming",
    isVirtual: true,
    isPhysical: true,
    location: "San Francisco, CA",
    tags: ["Python", "Backend", "Data Science"],
    description: "Complete Python course from basics to advanced concepts",
    isTrending: false,
    isFlashSale: false,
    spotsLeft: null,
    recentEnrollments: 15,
    salaryIncrease: "35%",
    completionRate: 89,
    hasPreview: true,
    hasGroupBuying: false,
  },
  {
    id: 3,
    title: "Advanced Machine Learning Masterclass",
    instructor: "Dr. Elena Rodriguez",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    thumbnail: "/placeholder.svg?height=200&width=300",
    basePrice: 299,
    currentPrice: 199,
    demandLevel: "high" as const,
    priceChangeIn: 30, // minutes
    rating: 4.9,
    students: 3240,
    duration: "60 hours",
    level: "masterclass",
    category: "AI & ML",
    isVirtual: true,
    isPhysical: true,
    location: "New York, NY",
    tags: ["Machine Learning", "AI", "Deep Learning"],
    description: "Master advanced ML techniques with industry experts",
    isTrending: true,
    isFlashSale: false,
    spotsLeft: 3,
    recentEnrollments: 8,
    salaryIncrease: "60%",
    completionRate: 96,
    hasPreview: true,
    hasGroupBuying: true,
  },
  // ... other courses with similar conversion data
];

export default function CoursesPage() {
  const [userRole] = useState<UserRole>("USER");
  const [userName] = useState("Alex Chen");
  const [userAvatar] = useState("/placeholder.svg?height=40&width=40");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    course: any;
  }>({ isOpen: false, course: null });
  const [showGroupBuying, setShowGroupBuying] = useState<number | null>(null);

  const filteredCourses = useMemo(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((course) => course.level === selectedType);
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.students - a.students);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        filtered.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedType, selectedCategory, sortBy]);

  const categories = [
    "all",
    ...Array.from(new Set(courses.map((course) => course.category))),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ALL THE CONVERSION FEATURES */}
      <LiveActivityTicker />
      <SuccessStoryPopup />
      <LiveChatWidget />
      <ReferralFloatingWidget />
      <ReferralSuccessNotification />
      <DemandSurgeNotification />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden cyber-grid">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl"
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Discover</span>{" "}
              <span className="text-white">Courses</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              From crash courses to masterclasses - find the perfect learning
              path for your goals
            </p>

            <TrustSignals />
          </motion.div>

          {/* Course Type Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12">
            {courseTypes.map((type, index) => (
              <motion.button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center px-6 py-3 rounded-2xl border transition-all duration-300 ${
                  selectedType === type.id
                    ? "border-neon-blue bg-neon-blue/20 text-neon-blue"
                    : "border-white/20 bg-white/5 text-white hover:border-neon-blue/50 hover:bg-neon-blue/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <type.icon className="w-5 h-5 mr-2" />
                {type.name}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Recommendations */}
      <AIRecommendations />

      {/* Learning Paths */}
      <LearningPathRecommendations />

      {/* Filters and Search */}
      <section className="py-8 border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search courses, instructors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-card border-white/20 focus:border-neon-blue/50"
              />
            </div>

            <div className="flex gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 glass-card border-white/20">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 glass-card border-white/20">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group cursor-pointer">
                <Card className="glass-card hover-glow h-full border-white/10 overflow-hidden relative">
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />

                    {/* Preview Button */}
                    {course.hasPreview && (
                      <motion.button
                        onClick={() =>
                          setPreviewModal({ isOpen: true, course })
                        }
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}>
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </motion.button>
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge
                        className={`bg-gradient-to-r ${
                          courseTypes.find((t) => t.id === course.level)?.color
                        } text-white border-none`}>
                        {courseTypes.find((t) => t.id === course.level)?.name}
                      </Badge>

                      {course.isTrending && (
                        <Badge className="bg-gradient-to-r from-red-500 to-orange-400 text-white border-none">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>

                    {/* Top Right Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                      {course.isFlashSale && (
                        <FlashSaleTimer endTime={course.flashSaleEnd!} />
                      )}

                      <div className="flex gap-2">
                        {course.isVirtual && (
                          <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                            <Video className="w-3 h-3 mr-1" />
                            Virtual
                          </Badge>
                        )}
                        {course.isPhysical && (
                          <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                            <MapPin className="w-3 h-3 mr-1" />
                            Physical
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Scarcity Indicator */}
                    {course.spotsLeft && course.spotsLeft <= 10 && (
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                          Only {course.spotsLeft} spots left!
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                      {course.title}
                    </h3>

                    <div className="flex items-center mb-4">
                      <Avatar className="w-8 h-8 mr-3">
                        <AvatarImage
                          src={course.instructorAvatar || "/placeholder.svg"}
                          alt={course.instructor}
                        />
                        <AvatarFallback>
                          {course.instructor.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-300 text-sm">
                        {course.instructor}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm mb-4">
                      {course.description}
                    </p>

                    {/* Social Proof */}
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        {course.rating}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students.toLocaleString()}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="text-xs text-gray-400 mb-4">
                      <span className="text-neon-green">
                        {course.recentEnrollments} people
                      </span>{" "}
                      enrolled this week
                    </div>

                    {/* Success Metrics */}
                    <div className="flex justify-between text-xs text-gray-400 mb-4">
                      <span>
                        <Award className="w-3 h-3 inline mr-1" />
                        {course.completionRate}% completion rate
                      </span>
                      <span className="text-neon-green">
                        Avg. {course.salaryIncrease} salary increase
                      </span>
                    </div>

                    {course.location && (
                      <div className="flex items-center text-sm text-gray-400 mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        {course.location}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs border-white/20 text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Dynamic Pricing */}
                    <div className="mb-4">
                      <DynamicPriceDisplay
                        basePrice={course.basePrice}
                        currentPrice={course.currentPrice}
                        demandLevel={course.demandLevel}
                        priceChangeIn={course.priceChangeIn}
                      />
                    </div>

                    {/* Group Buying Option */}
                    {course.hasGroupBuying && (
                      <div className="mb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                          onClick={() =>
                            setShowGroupBuying(
                              showGroupBuying === course.id ? null : course.id
                            )
                          }>
                          <Users className="w-4 h-4 mr-2" />
                          Group Buying Available - Save up to 50%!
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Button className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-blue/80 hover:to-neon-purple/80 text-white mr-2">
                        Enroll Now
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                        <Users className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Group Buying Expansion */}
                {showGroupBuying === course.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4">
                    <GroupBuyingWidget
                      courseId={course.id}
                      courseTitle={course.title}
                      originalPrice={course.basePrice}
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Preview Modal */}
      <CoursePreviewModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal({ isOpen: false, course: null })}
        courseTitle={previewModal.course?.title || ""}
        previewUrl=""
      />
    </div>
  );
}
