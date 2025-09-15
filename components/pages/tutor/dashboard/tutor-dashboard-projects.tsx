"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

interface Project {
  id: string | number;
  title: string;
  student: string;
  course: string;
  submitted: string;
  dueDate: string;
}

export function TutorDashboardProjects({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}>
      <Card className="glass-card border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Pending Projects</h3>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              {projects.length} awaiting review
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold group-hover:text-gradient transition-colors">
                    {project.title}
                  </h4>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                    <span>by {project.student}</span>
                    <span>•</span>
                    <span>{project.course}</span>
                    <span>•</span>
                    <span>Submitted {project.submitted}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
                  Review
                </Button>
                <p className="text-gray-400 text-xs mt-1">
                  Due {project.dueDate}
                </p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
