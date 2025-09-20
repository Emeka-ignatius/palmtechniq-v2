"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  Clock,
  Star,
  Globe,
  Smartphone,
  Monitor,
  Infinity,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CheckoutCoursePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => ""}
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl font-bold text-gradient mb-2">
                  Checkout
                </h1>
                <p className="text-gray-400 mb-8">
                  Complete your purchase to start learning
                </p>
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="sticky top-24"
                  >
                    <Card className="glass-card border-white/10 hover-glow">
                      <CardHeader>
                        <h2 className="text-2xl font-bold text-white">
                          Order Summary
                        </h2>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Course Info */}
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-white text-sm leading-tight mb-1"></h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <Avatar className="w-5 h-5">
                                <AvatarImage src={"/placeholder.svg"} />
                                <AvatarFallback className="text-xs ">
                                  {/* {instructor.name.charAt(0)} */}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-400">
                                {/* {instructor.name} */}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-400">
                                  {/* {rating} */}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-400">
                                  {/* {duration} */}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator className="bg-white/10" />

                        {/* What's Included */}
                        <div>
                          <h4 className="text-white font-semibold mb-3">
                            What's included:
                          </h4>
                        </div>

                        <Separator className="bg-white/10" />

                        <div className="flex items-center justify-center space-x-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <Shield className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 text-sm font-semibold">
                            30-day money-back guarantee
                          </span>
                        </div>

                        {/* Course Access Features */}
                        <div className="space-y-3">
                          <h4 className="text-white font-semibold">
                            Course Access:
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center space-x-2 text-xs text-gray-300">
                              <Monitor className="w-4 h-4 text-neon-blue" />
                              <span>Desktop</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-300">
                              <Smartphone className="w-4 h-4 text-neon-blue" />
                              <span>Mobile</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-300">
                              <Globe className="w-4 h-4 text-neon-blue" />
                              <span>Online</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-300">
                              <Infinity className="w-4 h-4 text-neon-blue" />
                              <span>Lifetime</span>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white text-lg py-4 disabled:opacity-50"></Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
                {/* Complete Purchase Button */}
              </motion.div>
            </div>

            {/* Order Summary */}
          </div>
        </div>
      </div>
    </div>
  );
}
