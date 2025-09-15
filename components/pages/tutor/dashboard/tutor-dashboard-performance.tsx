"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function TutorDashboardPerformance() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}>
      <Card className="glass-card border-white/10">
        <CardHeader>
          <h3 className="text-xl font-bold text-white">Performance</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">
                Course Completion Rate
              </span>
              <span className="text-white font-semibold">94%</span>
            </div>
            <Progress value={94} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">
                Student Satisfaction
              </span>
              <span className="text-white font-semibold">4.9/5</span>
            </div>
            <Progress value={98} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Response Time</span>
              <span className="text-white font-semibold">&lt; 2h</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
