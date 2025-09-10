"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, ThumbsUp } from "lucide-react";
import { useState } from "react";

interface Resource {
  id: string;
  title: string;
  type: "PDF" | "VIDEO" | "LINK" | "CODE";
  url: string;
  size?: string;
}

interface Review {
  id: string;
  user: { name: string; avatar?: string };
  comment: string;
  likes: number;
  timeAgo: string;
}

export default function LessonTabs({
  description,
  resources,
  reviews = [],
}: {
  description: string;
  resources: Resource[];
  initialNotes?: string;
  reviews?: Review[];
}) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Card className="glass-card border-white/10 mt-6">
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 text-white bg-white/5 border-b border-white/10">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Lesson Overview
            </h3>
            <p className="text-gray-300 leading-relaxed">{description}</p>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources" className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <div className="space-y-3">
              {resources.length > 0 ? (
                resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neon-blue/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-neon-blue" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">
                          {resource.title}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {resource.type}{" "}
                          {resource.size && `• ${resource.size}`}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No resources available.</p>
              )}
            </div>
          </TabsContent>

          {/* Notes */}
          {/* <TabsContent value="notes" className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">My Notes</h3>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Take notes about this lesson..."
              className="min-h-[200px] bg-white/5 border-white/20 text-white placeholder:text-gray-400"
            />
            <Button
              onClick={() => onSaveNotes(notes)}
              className="mt-4 bg-neon-blue text-white">
              Save Notes
            </Button>
          </TabsContent> */}

          {/* Discussion */}
          <TabsContent value="discussion" className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Discussion
            </h3>
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={review.user.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {review.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white font-medium">
                            {review.user.name}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {review.timeAgo}
                          </span>
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {review.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No discussion yet. Be first!</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
