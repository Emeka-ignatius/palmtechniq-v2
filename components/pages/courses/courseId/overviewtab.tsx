"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, ListChecks } from "lucide-react";

export default function OverviewTab({
  description,
  outcomes = [],
  requirements = [],
}: {
  description: string;
  outcomes?: string[];
  requirements?: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8">
      {/* About Section */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <h3 className="text-2xl font-bold text-white">About This Course</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </CardContent>
      </Card>

      {/* Learning Outcomes Section */}
      {outcomes.length > 0 && (
        <Card className="glass-card border-white/10">
          <CardHeader>
            <h3 className="text-2xl font-bold text-white">
              What You&apos;ll Learn
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {outcomes.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Requirements Section */}
      {requirements.length > 0 && (
        <Card className="glass-card border-white/10">
          <CardHeader>
            <h3 className="text-2xl font-bold text-white">Requirements</h3>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
