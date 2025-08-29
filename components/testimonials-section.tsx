"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The AI interview coach completely transformed my preparation. I landed my dream job at a tech company after just 3 months of practice!",
    course: "Full Stack Development",
    gradient: "from-neon-blue to-cyan-400",
  },
  {
    name: "Marcus Johnson",
    role: "UX Designer",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The mentorship program is incredible. Having 1-on-1 sessions with industry experts gave me insights I couldn't get anywhere else.",
    course: "UI/UX Design Mastery",
    gradient: "from-neon-purple to-pink-400",
  },
  {
    name: "Elena Rodriguez",
    role: "Data Scientist",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The project-based learning approach helped me build a portfolio that impressed every interviewer. The AI LinkedIn builder was a game-changer!",
    course: "AI & Machine Learning",
    gradient: "from-neon-green to-emerald-400",
  },
  {
    name: "David Kim",
    role: "Marketing Director",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "I loved the hybrid learning model. Being able to attend physical workshops while taking online courses gave me the best of both worlds.",
    course: "Digital Marketing Pro",
    gradient: "from-neon-orange to-yellow-400",
  },
  {
    name: "Priya Patel",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The progress tracking and personalized recommendations kept me motivated throughout my learning journey. Absolutely revolutionary!",
    course: "Product Management",
    gradient: "from-red-400 to-pink-400",
  },
  {
    name: "Alex Thompson",
    role: "Blockchain Developer",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The quality of instruction and the cutting-edge curriculum helped me transition into blockchain development seamlessly.",
    course: "Blockchain Development",
    gradient: "from-indigo-400 to-purple-400",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <motion.div
        className="absolute bottom-0 left-1/3 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Success</span>{" "}
            <span className="text-white">Stories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real people, real results. See how our platform transformed careers
            and lives
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="group">
              <Card className="glass-card hover-glow h-full border-white/10 overflow-hidden relative">
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-neon-blue mb-4 opacity-50" />

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-300 mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>

                  {/* Course Badge */}
                  <Badge
                    className={`bg-gradient-to-r ${testimonial.gradient} text-white border-none mb-6`}>
                    {testimonial.course}
                  </Badge>

                  {/* Author */}
                  <div className="flex items-center">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                      />
                      <AvatarFallback
                        className={`bg-gradient-to-r ${testimonial.gradient} text-white`}>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-white font-semibold">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Hover Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
