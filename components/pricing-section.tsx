"use client"

import { motion } from "framer-motion"
import { Check, Zap, Crown, Rocket } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const plans = [
  {
    name: "Explorer",
    price: 0,
    period: "forever",
    description: "Perfect for getting started",
    icon: Zap,
    color: "from-gray-400 to-gray-600",
    features: [
      "Access to free courses",
      "Basic progress tracking",
      "Community forums",
      "Mobile app access",
      "Certificate of completion",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Student",
    price: 29,
    period: "month",
    description: "Unlock your potential",
    icon: Rocket,
    color: "from-neon-blue to-cyan-400",
    features: [
      "All Explorer features",
      "Access to premium courses",
      "AI interview practice",
      "Project submissions",
      "Basic mentorship (2 sessions/month)",
      "Progress analytics",
      "LinkedIn profile optimization",
    ],
    cta: "Become Student",
    popular: true,
  },
  {
    name: "Pro",
    price: 99,
    period: "month",
    description: "For serious learners",
    icon: Crown,
    color: "from-neon-purple to-pink-400",
    features: [
      "All Student features",
      "Unlimited mentorship sessions",
      "Physical workshop access",
      "1-on-1 career coaching",
      "Advanced AI features",
      "Priority support",
      "Custom learning paths",
      "Industry certifications",
    ],
    cta: "Go Pro",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-10 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Choose Your</span> <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Flexible pricing plans designed to grow with your learning ambitions
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className={`group relative ${plan.popular ? "md:-mt-8" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-neon-blue to-neon-purple text-white px-6 py-2 z-10">
                  Most Popular
                </Badge>
              )}

              <Card
                className={`glass-card hover-glow h-full border-white/10 overflow-hidden relative ${
                  plan.popular ? "border-neon-blue/50 shadow-2xl shadow-neon-blue/20" : ""
                }`}
              >
                <CardHeader className="text-center pb-8">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${plan.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <plan.icon className="w-full h-full text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400">{plan.description}</p>

                  {/* Price */}
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-gradient">${plan.price}</span>
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center text-gray-300"
                      >
                        <Check className="w-5 h-5 text-neon-green mr-3 flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className={`w-full py-6 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-blue/80 hover:to-neon-purple/80 text-white hover-glow"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>

                {/* Hover Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${plan.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
