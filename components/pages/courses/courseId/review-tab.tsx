"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function ReviewsTab({ reviews }: { reviews: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 space-y-6">
      {reviews.length === 0 ? (
        <Card className="glass-card border-white/10">
          <CardContent className="p-8 text-center">
            <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Student Reviews
            </h3>
            <p className="text-gray-300">
              No reviews yet. Be the first to review!
            </p>
          </CardContent>
        </Card>
      ) : (
        reviews.map((review: any, index: number) => (
          <Card key={index} className="glass-card border-white/10">
            <CardContent className="p-6 flex items-start space-x-4">
              {/* Avatar */}
              <Avatar className="w-12 h-12">
                <AvatarImage src={review.user?.image || "/placeholder.svg"} />
                <AvatarFallback>
                  {review.user?.name?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>

              {/* Review Details */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">
                    {review.user?.name || "Anonymous"}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-300">{review.comment}</p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </motion.div>
  );
}
