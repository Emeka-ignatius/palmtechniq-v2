"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface Activity {
  type: "enrollment" | "review" | "mentorship" | "project";
  message: string;
  time: string;
}

export function TutorDashboardActivity({
  activities,
}: {
  activities: Activity[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}>
      <Card className="glass-card border-white/10">
        <CardHeader>
          <h3 className="text-xl font-bold text-white">Recent Activity</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div
                className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === "enrollment"
                    ? "bg-green-400"
                    : activity.type === "review"
                    ? "bg-yellow-400"
                    : activity.type === "mentorship"
                    ? "bg-blue-400"
                    : "bg-purple-400"
                }`}
              />
              <div className="flex-1">
                <p className="text-gray-300 text-sm">{activity.message}</p>
                <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
