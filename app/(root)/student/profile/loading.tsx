"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileLoading() {
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
            <Skeleton className="h-16 w-80 mx-auto mb-4 bg-white/10" />
            <Skeleton className="h-6 w-64 mx-auto bg-white/10" />
          </div>

          {/* Profile Header Skeleton */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="glass-card border-white/10">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <Skeleton className="w-32 h-32 rounded-full bg-white/10" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-8 w-64 bg-white/10" />
                    <Skeleton className="h-4 w-full bg-white/10" />
                    <div className="flex gap-4">
                      <Skeleton className="h-4 w-32 bg-white/10" />
                      <Skeleton className="h-4 w-32 bg-white/10" />
                      <Skeleton className="h-4 w-32 bg-white/10" />
                    </div>
                  </div>
                  <Skeleton className="h-10 w-32 bg-white/10" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Grid Skeleton */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="glass-card border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24 bg-white/10" />
                        <Skeleton className="h-8 w-16 bg-white/10" />
                        <Skeleton className="h-3 w-20 bg-white/10" />
                      </div>
                      <Skeleton className="w-16 h-16 rounded-2xl bg-white/10" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Tabs Skeleton */}
          <div className="flex mb-8">
            <Skeleton className="h-12 w-full bg-white/10 rounded-lg" />
          </div>

          {/* Content Skeleton */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <Skeleton className="h-8 w-48 bg-white/10" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-white/10" />
                    <Skeleton className="h-10 w-full bg-white/10" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16 bg-white/10" />
                <Skeleton className="h-24 w-full bg-white/10" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
