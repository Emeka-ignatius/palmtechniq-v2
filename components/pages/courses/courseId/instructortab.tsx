"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function InstructorTab({
  tutor,
}: {
  tutor: {
    user: {
      name: string;
      image?: string | null;
    };
    rating?: number;
    students?: number;
    courses?: number;
    bio?: string;
    title?: string;
  };
}) {
  const { user, rating, students, courses, bio, title } = tutor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <Card className="glass-card border-white/10">
        <CardContent className="p-8">
          <div className="flex items-start space-x-6">
            {/* Avatar */}
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.image || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">
                {user.name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>

            {/* Instructor Info */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">
                {user.name}
              </h3>
              {title && (
                <p className="text-neon-blue font-medium mb-4">{title}</p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {rating?.toFixed(1) ?? "N/A"}
                  </div>
                  <div className="text-gray-400 text-sm">Instructor Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {students?.toLocaleString() ?? 0}
                  </div>
                  <div className="text-gray-400 text-sm">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {courses ?? 0}
                  </div>
                  <div className="text-gray-400 text-sm">Courses</div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-300 leading-relaxed">
                {bio ||
                  `${user.name} is an experienced instructor dedicated to helping students grow.`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
