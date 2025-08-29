"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function MentorshipLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32 bg-white/10" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-24 bg-white/10" />
              <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Skeleton className="h-16 w-96 mx-auto mb-4 bg-white/10" />
            <Skeleton className="h-6 w-64 mx-auto bg-white/10" />
          </div>
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-12 flex-1 bg-white/10" />
              <Skeleton className="h-12 w-48 bg-white/10" />
              <Skeleton className="h-12 w-32 bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Skeleton */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="flex mb-8">
            <Skeleton className="h-12 w-full bg-white/10 rounded-lg" />
          </div>

          {/* Mentor Cards Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="glass-card border-white/10 overflow-hidden h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <Skeleton className="w-16 h-16 rounded-full bg-white/10" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-6 w-48 bg-white/10" />
                        <Skeleton className="h-4 w-32 bg-white/10" />
                        <Skeleton className="h-3 w-24 bg-white/10" />
                      </div>
                      <div className="text-right space-y-2">
                        <Skeleton className="h-4 w-16 bg-white/10" />
                        <Skeleton className="h-6 w-20 bg-white/10" />
                      </div>
                    </div>
                    <Skeleton className="h-12 w-full bg-white/10" />
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {[...Array(4)].map((_, j) => (
                          <Skeleton key={j} className="h-6 w-16 bg-white/10" />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-8 w-full bg-white/10" />
                        <Skeleton className="h-8 w-full bg-white/10" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-10 flex-1 bg-white/10" />
                      <Skeleton className="h-10 w-24 bg-white/10" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
