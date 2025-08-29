"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  MessageSquare,
  ThumbsUp,
  Reply,
  Filter,
  Search,
  TrendingUp,
  Award,
  CheckCircle,
  Clock,
  Send,
  Heart,
  Flag,
  MoreHorizontal,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import type { UserRole } from "@/types/user";

const reviews = [
  {
    id: 1,
    student: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    course: "Advanced React Patterns",
    rating: 5,
    date: "2024-01-15",
    review:
      "Absolutely fantastic course! Sarah explains complex concepts in a very clear and understandable way. The hands-on projects really helped me grasp the advanced patterns. Highly recommend!",
    helpful: 12,
    response: null,
    verified: true,
  },
  {
    id: 2,
    student: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
    course: "JavaScript Fundamentals",
    rating: 4,
    date: "2024-01-12",
    review:
      "Great course overall. The content is well-structured and the examples are practical. Would love to see more advanced topics covered in future updates.",
    helpful: 8,
    response: {
      text: "Thank you for the feedback, Mike! I'm glad you found the course helpful. I'm actually working on an advanced JavaScript course that should be available next month.",
      date: "2024-01-13",
    },
    verified: true,
  },
  {
    id: 3,
    student: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ER",
    },
    course: "Node.js Backend Development",
    rating: 5,
    date: "2024-01-10",
    review:
      "This course exceeded my expectations! The project-based approach made learning so much more engaging. I built a complete REST API by the end.",
    helpful: 15,
    response: {
      text: "So happy to hear that, Emily! Building real projects is definitely the best way to learn. Keep up the great work!",
      date: "2024-01-11",
    },
    verified: true,
  },
];

const ratingTrends = [
  { month: "Aug", rating: 4.2 },
  { month: "Sep", rating: 4.3 },
  { month: "Oct", rating: 4.5 },
  { month: "Nov", rating: 4.4 },
  { month: "Dec", rating: 4.6 },
  { month: "Jan", rating: 4.7 },
];

const ratingDistribution = [
  { stars: 5, count: 156 },
  { stars: 4, count: 89 },
  { stars: 3, count: 23 },
  { stars: 2, count: 8 },
  { stars: 1, count: 3 },
];

export default function TutorReviewsPage() {
  const [userRole] = useState<UserRole>("TUTOR");
  const [userName] = useState("Sarah Chen");
  const [userAvatar] = useState("/placeholder.svg?height=40&width=40");
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const averageRating = 4.7;
  const totalReviews = 279;
  const responseRate = 89;
  const recentGrowth = 12.5;

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      selectedRating === "all" || review.rating.toString() === selectedRating;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && !review.response) ||
      (activeTab === "responded" && review.response);

    return matchesSearch && matchesRating && matchesTab;
  });

  const handleReply = (reviewId: number) => {
    console.log(`Replying to review ${reviewId} with: ${replyText}`);
    setReplyingTo(null);
    setReplyText("");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
        }`}
      />
    ));
  };

  const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
    <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} className="group">
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
                  {change}% this month
                </div>
              )}
            </div>
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} p-4 group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-full h-full text-white" />
            </div>
          </div>
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
          />
        </CardContent>
      </Card>
    </motion.div>
  );

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
                  Reviews & <span className="text-gradient">Feedback</span>
                </h1>
                <p className="text-xl text-gray-300">
                  Manage student reviews and build your reputation
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="gap-2 border-white/20 text-white hover:bg-white/10 bg-transparent">
                  <Filter className="w-4 h-4" />
                  Advanced Filters
                </Button>
                <Button className="gap-2 bg-gradient-to-r from-neon-purple to-pink-400 text-white">
                  <Award className="w-4 h-4" />
                  Review Insights
                </Button>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={Star}
                title="Average Rating"
                value={averageRating}
                change={null}
                color="from-yellow-500 to-orange-500"
              />
              <StatCard
                icon={MessageSquare}
                title="Total Reviews"
                value={totalReviews}
                change={recentGrowth}
                color="from-neon-blue to-neon-purple"
              />
              <StatCard
                icon={Reply}
                title="Response Rate"
                value={`${responseRate}%`}
                change={null}
                color="from-neon-green to-emerald-400"
              />
              <StatCard
                icon={Clock}
                title="Pending Replies"
                value="12"
                change={null}
                color="from-neon-orange to-yellow-400"
              />
            </motion.div>

            {/* Analytics Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Rating Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={ratingTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis domain={[3.5, 5]} stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="rating"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">
                    Rating Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ratingDistribution} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis type="number" stroke="#9CA3AF" />
                      <YAxis dataKey="stars" type="category" stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews Section */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Student Reviews</CardTitle>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search reviews..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 bg-white/5 border-white/10 text-white placeholder-gray-400"
                      />
                    </div>
                    <Select
                      value={selectedRating}
                      onValueChange={setSelectedRating}>
                      <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 backdrop-blur-sm border-white/10">
                        <SelectItem
                          value="all"
                          className="text-white hover:bg-white/10">
                          All Ratings
                        </SelectItem>
                        <SelectItem
                          value="5"
                          className="text-white hover:bg-white/10">
                          5 Stars
                        </SelectItem>
                        <SelectItem
                          value="4"
                          className="text-white hover:bg-white/10">
                          4 Stars
                        </SelectItem>
                        <SelectItem
                          value="3"
                          className="text-white hover:bg-white/10">
                          3 Stars
                        </SelectItem>
                        <SelectItem
                          value="2"
                          className="text-white hover:bg-white/10">
                          2 Stars
                        </SelectItem>
                        <SelectItem
                          value="1"
                          className="text-white hover:bg-white/10">
                          1 Star
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-sm border border-white/10">
                    <TabsTrigger
                      value="all"
                      className="gap-2 text-white data-[state=active]:bg-white/10">
                      <MessageSquare className="w-4 h-4" />
                      All Reviews ({reviews.length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="pending"
                      className="gap-2 text-white data-[state=active]:bg-white/10">
                      <Clock className="w-4 h-4" />
                      Pending ({reviews.filter((r) => !r.response).length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="responded"
                      className="gap-2 text-white data-[state=active]:bg-white/10">
                      <CheckCircle className="w-4 h-4" />
                      Responded ({reviews.filter((r) => r.response).length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6">
                      {filteredReviews.map((review) => (
                        <div
                          key={review.id}
                          className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                          {/* Review Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarImage
                                  src={
                                    review.student.avatar || "/placeholder.svg"
                                  }
                                />
                                <AvatarFallback className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                                  {review.student.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-white">
                                    {review.student.name}
                                  </h4>
                                  {review.verified && (
                                    <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-400">
                                  {review.course}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex">
                                    {renderStars(review.rating)}
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    {review.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white hover:bg-white/10">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Review Content */}
                          <div className="mb-4">
                            <p className="text-gray-300 leading-relaxed">
                              {review.review}
                            </p>
                          </div>

                          {/* Review Actions */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 text-white hover:bg-white/10">
                                <ThumbsUp className="w-4 h-4" />
                                Helpful ({review.helpful})
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 text-white hover:bg-white/10">
                                <Heart className="w-4 h-4" />
                                Like
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 text-white hover:bg-white/10">
                                <Flag className="w-4 h-4" />
                                Report
                              </Button>
                            </div>
                            {!review.response && (
                              <Button
                                onClick={() => setReplyingTo(review.id)}
                                className="gap-2 bg-gradient-to-r from-neon-blue to-neon-purple"
                                size="sm">
                                <Reply className="w-4 h-4" />
                                Reply
                              </Button>
                            )}
                          </div>

                          {/* Existing Response */}
                          {review.response && (
                            <div className="bg-blue-500/10 border-l-4 border-blue-400 p-4 rounded-r-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-xs bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                                    SC
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm text-white">
                                  Your Response
                                </span>
                                <span className="text-xs text-gray-400">
                                  {review.response.date}
                                </span>
                              </div>
                              <p className="text-sm text-gray-300">
                                {review.response.text}
                              </p>
                            </div>
                          )}

                          {/* Reply Form */}
                          {replyingTo === review.id && (
                            <div className="mt-4 p-4 bg-white/5 rounded-lg">
                              <Textarea
                                placeholder="Write your response..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="mb-3 bg-white/5 border-white/10 text-white placeholder-gray-400"
                              />
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleReply(review.id)}
                                  className="gap-2 bg-gradient-to-r from-neon-blue to-neon-purple"
                                  size="sm">
                                  <Send className="w-4 h-4" />
                                  Send Reply
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => setReplyingTo(null)}
                                  size="sm"
                                  className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>

                    {filteredReviews.length === 0 && (
                      <div className="text-center py-12">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-400 mb-2">
                          No reviews found
                        </h3>
                        <p className="text-gray-500">
                          Try adjusting your filters or search terms.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
