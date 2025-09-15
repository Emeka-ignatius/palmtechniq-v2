"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";

export function TutorDashboardEarnings({
  monthlyEarnings,
}: {
  monthlyEarnings: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}>
      <Card className="glass-card border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Monthly Earnings</h3>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              +₦{monthlyEarnings.toLocaleString()} this month
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-neon-blue mx-auto mb-4" />
              <p className="text-gray-300">
                Earnings chart would be rendered here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
