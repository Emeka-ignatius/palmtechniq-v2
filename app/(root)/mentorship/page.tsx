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
  Award,
  Users,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Target,
  Zap,
} from "lucide-react";
import type { UserRole } from "@/types/user";

export default function MentorshipPage() {
  const [userRole] = useState<UserRole>("STUDENT");
  const [userName] = useState("Alex Johnson");
  const [userAvatar] = useState("/placeholder.svg?height=40&width=40");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const mentorCategories = [
    { id: "all", name: "All Categories", icon: Globe },
    { id: "tech", name: "Technology", icon: Zap },
    { id: "business", name: "Business", icon: Briefcase },
    { id: "design", name: "Design", icon: Target },
    { id: "marketing", name: "Marketing", icon: TrendingUp },
    { id: "career", name: "Career Development", icon: GraduationCap },
    { id: "leadership", name: "Leadership", icon: Users },
  ];

  const featuredMentors = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Engineering Manager",
      company: "Meta",
      location: "San Francisco, CA",
      avatar: "/placeholder.svg?height=120&width=120",
      rating: 4.9,
      reviews: 127,
      sessions: 450,
      hourlyRate: 200,
      responseTime: "< 2 hours",
      categories: ["Technology", "Leadership", "Career Development"],
      specialties: [
        "React",
        "System Design",
        "Team Management",
        "Career Growth",
      ],
      experience: "12+ years",
      languages: ["English", "Mandarin"],
      timezone: "PST",
      availability: "Weekdays 9AM-6PM",
      bio: "Former startup founder turned engineering leader. I help developers advance their careers and build scalable systems. Mentored 100+ engineers to senior roles.",
      achievements: ["Ex-Founder", "Published Author", "Conference Speaker"],
      verified: true,
      topMentor: true,
      nextAvailable: "Today 3:00 PM",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      title: "VP of Product",
      company: "Stripe",
      location: "New York, NY",
      avatar: "/placeholder.svg?height=120&width=120",
      rating: 4.8,
      reviews: 89,
      sessions: 320,
      hourlyRate: 250,
      responseTime: "< 1 hour",
      categories: ["Business", "Product Management", "Strategy"],
      specialties: [
        "Product Strategy",
        "Go-to-Market",
        "User Research",
        "Analytics",
      ],
      experience: "10+ years",
      languages: ["English"],
      timezone: "EST",
      availability: "Evenings & Weekends",
      bio: "Product leader with experience scaling products from 0 to millions of users. Expert in fintech, marketplace, and B2B SaaS products.",
      achievements: [
        "Y Combinator Alum",
        "Product Leader of the Year",
        "TEDx Speaker",
      ],
      verified: true,
      topMentor: true,
      nextAvailable: "Tomorrow 10:00 AM",
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      title: "ML Research Scientist",
      company: "OpenAI",
      location: "Seattle, WA",
      avatar: "/placeholder.svg?height=120&width=120",
      rating: 5.0,
      reviews: 45,
      sessions: 180,
      hourlyRate: 300,
      responseTime: "< 30 minutes",
      categories: ["Technology", "Research", "AI/ML"],
      specialties: ["Machine Learning", "Deep Learning", "Research", "Python"],
      experience: "8+ years",
      languages: ["English"],
      timezone: "PST",
      availability: "Flexible",
      bio: "PhD in Computer Science with focus on ML. Published 20+ papers in top-tier conferences. Passionate about making AI accessible to everyone.",
      achievements: ["PhD Stanford", "20+ Publications", "AI Pioneer Award"],
      verified: true,
      topMentor: true,
      nextAvailable: "Today 5:00 PM",
    },
    {
      id: 4,
      name: "Alex Thompson",
      title: "Creative Director",
      company: "IDEO",
      location: "London, UK",
      avatar: "/placeholder.svg?height=120&width=120",
      rating: 4.7,
      reviews: 156,
      sessions: 280,
      hourlyRate: 180,
      responseTime: "< 3 hours",
      categories: ["Design", "Creative", "Innovation"],
      specialties: ["Design Thinking", "UX/UI", "Brand Strategy", "Innovation"],
      experience: "9+ years",
      languages: ["English", "French"],
      timezone: "GMT",
      availability: "Weekdays 10AM-7PM",
      bio: "Award-winning designer helping companies innovate through human-centered design. Led design for Fortune 500 companies and startups.",
      achievements: [
        "Design Award Winner",
        "Innovation Expert",
        "Design Thinking Coach",
      ],
      verified: true,
      topMentor: false,
      nextAvailable: "Monday 2:00 PM",
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      mentor: "Sarah Chen",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      topic: "System Design Interview Prep",
      date: "2024-01-15",
      time: "3:00 PM",
      duration: 60,
      type: "Video Call",
      status: "Confirmed",
    },
    {
      id: 2,
      mentor: "Marcus Johnson",
      mentorAvatar: "/placeholder.svg?height=40&width=40",
      topic: "Product Strategy Deep Dive",
      date: "2024-01-17",
      time: "10:00 AM",
      duration: 90,
      type: "Video Call",
      status: "Confirmed",
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
              <Avatar className="w-20 h-20">
                <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-r from-neon-blue to-neon-purple text-white text-lg">
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
              {mentor.topMentor && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
                {mentor.topMentor && (
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                    Top Mentor
                  </Badge>
                )}
              </div>
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
              <p className="text-xs text-gray-400">{mentor.responseTime}</p>
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

            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-gray-400">Experience</p>
                <p className="text-white">{mentor.experience}</p>
              </div>
              <div>
                <p className="text-gray-400">Sessions</p>
                <p className="text-white">{mentor.sessions}</p>
              </div>
              <div>
                <p className="text-gray-400">Next Available</p>
                <p className="text-white">{mentor.nextAvailable}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-xs mb-1">Achievements</p>
              <div className="flex flex-wrap gap-1">
                {mentor.achievements.map((achievement: string) => (
                  <Badge
                    key={achievement}
                    className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 text-xs">
                    {achievement}
                  </Badge>
                ))}
              </div>
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
              <DialogContent className="bg-gray-900 border-white/20 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Book Session with {mentor.name}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Schedule a 1-on-1 mentorship session to accelerate your
                    growth.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">
                        Session Type
                      </label>
                      <Select>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select session type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="career">
                            Career Guidance - 60 min
                          </SelectItem>
                          <SelectItem value="technical">
                            Technical Review - 45 min
                          </SelectItem>
                          <SelectItem value="interview">
                            Interview Prep - 90 min
                          </SelectItem>
                          <SelectItem value="strategy">
                            Strategy Session - 60 min
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">
                        Preferred Date
                      </label>
                      <Input
                        type="date"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      What would you like to discuss?
                    </label>
                    <Input
                      placeholder="e.g., Career transition to senior role, system design interview prep..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">
                        Time Preference
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
                    <div>
                      <label className="text-sm font-medium text-white mb-2 block">
                        Duration
                      </label>
                      <Select>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="45">
                            45 minutes - $
                            {(mentor.hourlyRate * 0.75).toFixed(0)}
                          </SelectItem>
                          <SelectItem value="60">
                            60 minutes - ${mentor.hourlyRate}
                          </SelectItem>
                          <SelectItem value="90">
                            90 minutes - ${(mentor.hourlyRate * 1.5).toFixed(0)}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">
                      Session Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Mentor:</span>
                        <span className="text-white">{mentor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rate:</span>
                        <span className="text-white">
                          ${mentor.hourlyRate}/hour
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Platform Fee:</span>
                        <span className="text-white">$5</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span className="text-white">Total:</span>
                        <span className="text-white">
                          ${mentor.hourlyRate + 5}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-neon-green to-emerald-400 text-white">
                    Confirm Booking - ${mentor.hourlyRate + 5}
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
              <span className="text-white">Connect with</span>{" "}
              <span className="text-gradient">Industry Experts</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Get personalized guidance from top professionals at leading
              companies
            </p>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {mentorCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={
                      selectedCategory === category.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                        : "border-white/20 text-white hover:bg-white/10 bg-transparent"
                    }>
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </motion.div>

          {/* Search and Filters */}
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
                value={selectedExperience}
                onValueChange={setSelectedExperience}>
                <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Experience</SelectItem>
                  <SelectItem value="5+">5+ Years</SelectItem>
                  <SelectItem value="10+">10+ Years</SelectItem>
                  <SelectItem value="15+">15+ Years</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-100">$0 - $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="200+">$200+</SelectItem>
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
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20 mb-8">
              <TabsTrigger
                value="browse"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-blue data-[state=active]:to-neon-purple data-[state=active]:text-white">
                Browse Mentors
              </TabsTrigger>
              <TabsTrigger
                value="sessions"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-green data-[state=active]:to-emerald-400 data-[state=active]:text-white">
                My Sessions ({upcomingSessions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredMentors.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sessions" className="space-y-8">
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
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
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
                            <Video className="w-4 h-4" />
                            <span>{session.type}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1 bg-gradient-to-r from-neon-green to-emerald-400 text-white">
                            <Video className="w-4 h-4 mr-2" />
                            Join Call
                          </Button>
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
          </Tabs>
        </div>
      </section>
    </div>
  );
}
