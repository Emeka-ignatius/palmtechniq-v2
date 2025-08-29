"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CoursesLoading() {
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
          <div className="max-w-2xl mx-auto mb-12">
            <Skeleton className="h-12 w-full bg-white/10" />
          </div>
        </div>
      </section>

      {/* Tabs Skeleton */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="flex mb-8">
            <Skeleton className="h-12 w-full bg-white/10 rounded-lg" />
          </div>

          {/* Course Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="glass-card border-white/10 overflow-hidden h-full">
                  <Skeleton className="h-48 w-full bg-white/10" />
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-20 bg-white/10" />
                      <Skeleton className="h-4 w-16 bg-white/10" />
                    </div>
                    <Skeleton className="h-6 w-full bg-white/10" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full bg-white/10" />
                      <Skeleton className="h-4 w-24 bg-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full bg-white/10" />
                      <Skeleton className="h-2 w-full bg-white/10" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-10 flex-1 bg-white/10" />
                      <Skeleton className="h-10 w-20 bg-white/10" />
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
