"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  Star,
  Search,
  Filter,
  Video,
  MessageCircle,
  CheckCircle,
  Plus,
  MapPin,
  Globe,
} from "lucide-react";
import type { UserRole } from "@/types/user";

export default function StudentMentorship() {
  const [userRole] = useState<UserRole>("STUDENT");
  const [userName] = useState("Alex Johnson");
  const [userAvatar] = useState("/placeholder.svg?height=40&width=40");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const upcomingSessions = [
    {
      id: 1,
      mentor: "Sarah Chen",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      topic: "React Performance Optimization",
      date: "2024-01-15",
      time: "3:00 PM",
      duration: 60,
      type: "Video Call",
      status: "Confirmed",
      meetingLink: "https://meet.example.com/abc123",
    },
    {
      id: 2,
      mentor: "Mike Rodriguez",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      topic: "API Design Best Practices",
      date: "2024-01-17",
      time: "10:00 AM",
      duration: 45,
      type: "Video Call",
      status: "Pending",
      meetingLink: null,
    },
    {
      id: 3,
      mentor: "Dr. Emily Watson",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      topic: "Machine Learning Career Path",
      date: "2024-01-20",
      time: "2:00 PM",
      duration: 90,
      type: "In-Person",
      status: "Confirmed",
      location: "Tech Hub, San Francisco",
    },
  ];

  const availableMentors = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=80&width=80",
      title: "Senior React Developer",
      company: "Meta",
      location: "San Francisco, CA",
      rating: 4.9,
      reviews: 127,
      hourlyRate: 150,
      specialties: ["React", "TypeScript", "Performance", "Architecture"],
      experience: "8+ years",
      languages: ["English", "Mandarin"],
      timezone: "PST",
      availability: "Weekdays 9AM-6PM",
      bio: "Passionate about helping developers master React and build scalable applications. Former tech lead at several startups.",
      verified: true,
      responseTime: "< 2 hours",
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=80&width=80",
      title: "Full-Stack Engineer",
      company: "Google",
      location: "Austin, TX",
      rating: 4.8,
      reviews: 89,
      hourlyRate: 120,
      specialties: ["Node.js", "Python", "AWS", "System Design"],
      experience: "6+ years",
      languages: ["English", "Spanish"],
      timezone: "CST",
      availability: "Evenings & Weekends",
      bio: "Backend specialist with expertise in scalable systems and cloud architecture. Love mentoring junior developers.",
      verified: true,
      responseTime: "< 4 hours",
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      avatar: "/placeholder.svg?height=80&width=80",
      title: "ML Research Scientist",
      company: "OpenAI",
      location: "Seattle, WA",
      rating: 5.0,
      reviews: 45,
      hourlyRate: 200,
      specialties: ["Machine Learning", "Python", "TensorFlow", "Research"],
      experience: "10+ years",
      languages: ["English"],
      timezone: "PST",
      availability: "Flexible",
      bio: "PhD in Computer Science with focus on ML. Published researcher and experienced mentor in AI/ML field.",
      verified: true,
      responseTime: "< 1 hour",
    },
    {
      id: 4,
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=80&width=80",
      title: "Frontend Architect",
      company: "Shopify",
      location: "Toronto, CA",
      rating: 4.7,
      reviews: 156,
      hourlyRate: 130,
      specialties: ["Vue.js", "JavaScript", "CSS", "UI/UX"],
      experience: "7+ years",
      languages: ["English", "French"],
      timezone: "EST",
      availability: "Weekdays 10AM-7PM",
      bio: "Frontend expert specializing in Vue.js and modern web technologies. Passionate about clean code and user experience.",
      verified: true,
      responseTime: "< 3 hours",
    },
  ];

  const pastSessions = [
    {
      id: 1,
      mentor: "John Smith",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      topic: "JavaScript Fundamentals Review",
      date: "2024-01-10",
      duration: 60,
      rating: 5,
      feedback:
        "Excellent session! John explained complex concepts very clearly.",
      mentorFeedback:
        "Alex is a dedicated learner with great questions. Keep up the good work!",
    },
    {
      id: 2,
      mentor: "Lisa Johnson",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      topic: "CSS Grid and Flexbox",
      date: "2024-01-05",
      duration: 45,
      rating: 4,
      feedback: "Very helpful session. Lisa provided great practical examples.",
      mentorFeedback:
        "Good progress on layout concepts. Practice more with real projects.",
    },
  ];

  const MentorCard = ({ mentor }: { mentor: any }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <Card className="glass-card hover-glow border-white/10 overflow-hidden h-full">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  {mentor.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {mentor.verified && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">
                {mentor.name}
              </h3>
              <p className="text-gray-300 text-sm mb-1">{mentor.title}</p>
              <p className="text-gray-400 text-xs mb-2">{mentor.company}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{mentor.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <span>{mentor.timezone}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white font-medium">{mentor.rating}</span>
                <span className="text-gray-400 text-sm">
                  ({mentor.reviews})
                </span>
              </div>
              <p className="text-2xl font-bold text-white">
                ${mentor.hourlyRate}/hr
              </p>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {mentor.bio}
          </p>

          <div className="space-y-3 mb-4">
            <div>
              <p className="text-gray-400 text-xs mb-1">Specialties</p>
              <div className="flex flex-wrap gap-1">
                {mentor.specialties.slice(0, 4).map((specialty: string) => (
                  <Badge
                    key={specialty}
                    className="bg-neon-blue/20 text-neon-blue border-neon-blue/30 text-xs">
                    {specialty}
                  </Badge>
                ))}
                {mentor.specialties.length > 4 && (
                  <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">
                    +{mentor.specialties.length - 4}
                  </Badge>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-gray-400">Experience</p>
                <p className="text-white">{mentor.experience}</p>
              </div>
              <div>
                <p className="text-gray-400">Response Time</p>
                <p className="text-white">{mentor.responseTime}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Availability</p>
              <p className="text-white text-sm">{mentor.availability}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Session
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-white/20 text-white">
                <DialogHeader>
                  <DialogTitle>Book Session with {mentor.name}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Schedule a mentorship session to accelerate your learning.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      Session Topic
                    </label>
                    <Input
                      placeholder="What would you like to discuss?"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">
                        Date
                      </label>
                      <Input
                        type="date"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">
                        Time
                      </label>
                      <Select>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      Duration
                    </label>
                    <Select>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes - $75</SelectItem>
                        <SelectItem value="60">60 minutes - $150</SelectItem>
                        <SelectItem value="90">90 minutes - $225</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-neon-green to-emerald-400 text-white">
                    Confirm Booking
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-8 relative overflow-hidden">
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
            className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-white">Find Your</span>{" "}
              <span className="text-gradient">Mentor</span>
            </h1>
            <p className="text-xl text-gray-300">
              Connect with industry experts and accelerate your learning
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search mentors by name, skill, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-neon-blue"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="fullstack">Full Stack</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mentorship Tabs */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="find" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20 mb-8">
              <TabsTrigger
                value="find"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-blue data-[state=active]:to-neon-purple data-[state=active]:text-white">
                Find Mentors
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-green data-[state=active]:to-emerald-400 data-[state=active]:text-white">
                Upcoming Sessions ({upcomingSessions.length})
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-orange data-[state=active]:to-yellow-400 data-[state=active]:text-white">
                Session History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="find" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {availableMentors.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {upcomingSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <Card className="glass-card border-white/10 hover-glow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={session.mentorAvatar || "/placeholder.svg"}
                            />
                            <AvatarFallback className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                              {session.mentor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold">
                              {session.mentor}
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {session.topic}
                            </p>
                          </div>
                          <Badge
                            className={`${
                              session.status === "Confirmed"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            }`}>
                            {session.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(session.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>
                              {session.time} ({session.duration} min)
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            {session.type === "Video Call" ? (
                              <Video className="w-4 h-4" />
                            ) : (
                              <MapPin className="w-4 h-4" />
                            )}
                            <span>
                              {session.type === "Video Call"
                                ? "Video Call"
                                : session.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {session.status === "Confirmed" &&
                            session.meetingLink && (
                              <Button className="flex-1 bg-gradient-to-r from-neon-green to-emerald-400 text-white">
                                <Video className="w-4 h-4 mr-2" />
                                Join Call
                              </Button>
                            )}
                          <Button
                            variant="outline"
                            className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              {upcomingSessions.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No Upcoming Sessions
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Book a session with a mentor to get started!
                  </p>
                  <Button className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Find a Mentor
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-8">
              <div className="space-y-6">
                {pastSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <Card className="glass-card border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={session.mentorAvatar || "/placeholder.svg"}
                            />
                            <AvatarFallback className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                              {session.mentor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-white font-semibold">
                                {session.mentor}
                              </h4>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < session.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-400"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm mb-2">
                              {session.topic}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                              <span>
                                {new Date(session.date).toLocaleDateString()}
                              </span>
                              <span>{session.duration} minutes</span>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-white text-sm font-medium mb-1">
                                  Your Feedback:
                                </p>
                                <p className="text-gray-300 text-sm">
                                  {session.feedback}
                                </p>
                              </div>
                              <div>
                                <p className="text-white text-sm font-medium mb-1">
                                  Mentor's Notes:
                                </p>
                                <p className="text-gray-300 text-sm">
                                  {session.mentorFeedback}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
