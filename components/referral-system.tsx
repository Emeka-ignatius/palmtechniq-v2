"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Copy, Trophy, Crown, Star, Flame, X, Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Referral Floating Widget
export function ReferralFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [referralStats] = useState({
    totalReferred: 12,
    totalEarned: 340,
    pendingRewards: 80,
    referralCode: "ALEX2024",
    nextRewardAt: 15,
    currentTier: "Gold",
  });

  return (
    <>
      {/* Floating Referral Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl hover-glow z-50 group"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(245, 158, 11, 0.5)",
            "0 0 40px rgba(245, 158, 11, 0.8)",
            "0 0 20px rgba(245, 158, 11, 0.5)",
          ],
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
        }}>
        <Gift className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      </motion.button>

      {/* Referral Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}>
              <div className="relative p-8">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>

                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-gradient mb-2">
                    Refer & Earn
                  </h2>
                  <p className="text-xl text-gray-300">
                    Earn <span className="text-yellow-400 font-bold">₦25</span>{" "}
                    for every friend you refer!
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Side - Stats & Progress */}
                  <div className="space-y-6">
                    {/* Current Stats */}
                    <Card className="glass-card border-yellow-500/30 bg-yellow-500/10">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-400">
                              {referralStats.totalReferred}
                            </div>
                            <div className="text-gray-400 text-sm">
                              Friends Referred
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-400">
                              ₦{referralStats.totalEarned}
                            </div>
                            <div className="text-gray-400 text-sm">
                              Total Earned
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Progress to Next Reward */}
                    <Card className="glass-card border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-white font-semibold">
                            Progress to Next Reward
                          </span>
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            {referralStats.currentTier}
                          </Badge>
                        </div>
                        <Progress
                          value={
                            (referralStats.totalReferred /
                              referralStats.nextRewardAt) *
                            100
                          }
                          className="h-3 mb-3"
                        />
                        <p className="text-gray-400 text-sm">
                          {referralStats.nextRewardAt -
                            referralStats.totalReferred}{" "}
                          more referrals to unlock{" "}
                          <span className="text-yellow-400 font-semibold">
                            Platinum Tier
                          </span>{" "}
                          (₦50 per referral!)
                        </p>
                      </CardContent>
                    </Card>

                    {/* Reward Tiers */}
                    <Card className="glass-card border-white/10">
                      <CardHeader>
                        <h3 className="text-xl font-bold text-white">
                          Reward Tiers
                        </h3>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {[
                          {
                            tier: "Bronze",
                            referrals: "1-4",
                            reward: "₦25",
                            icon: Trophy,
                            color: "text-orange-400",
                          },
                          {
                            tier: "Silver",
                            referrals: "5-9",
                            reward: "₦30",
                            icon: Star,
                            color: "text-gray-400",
                          },
                          {
                            tier: "Gold",
                            referrals: "10-14",
                            reward: "₦35",
                            icon: Crown,
                            color: "text-yellow-400",
                            current: true,
                          },
                          {
                            tier: "Platinum",
                            referrals: "15+",
                            reward: "₦50",
                            icon: Flame,
                            color: "text-purple-400",
                          },
                        ].map((tier) => (
                          <div
                            key={tier.tier}
                            className={`flex items-center justify-between p-3 rounded-lg ₦{
                              tier.current ? "bg-yellow-500/20 border border-yellow-500/30" : "bg-white/5"
                            }`}>
                            <div className="flex items-center">
                              <tier.icon
                                className={`w-5 h-5 mr-3 ₦{tier.color}`}
                              />
                              <div>
                                <span className="text-white font-semibold">
                                  {tier.tier}
                                </span>
                                <span className="text-gray-400 text-sm ml-2">
                                  ({tier.referrals} referrals)
                                </span>
                              </div>
                            </div>
                            <span className={`font-bold ₦{tier.color}`}>
                              {tier.reward}
                            </span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Side - Referral Tools */}
                  <div className="space-y-6">
                    {/* Referral Code */}
                    <Card className="glass-card border-white/10">
                      <CardHeader>
                        <h3 className="text-xl font-bold text-white">
                          Your Referral Code
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-3 mb-4">
                          <Input
                            value={referralStats.referralCode}
                            readOnly
                            className="glass-card border-white/20 text-center text-2xl font-bold text-yellow-400"
                          />
                          <Button
                            onClick={() =>
                              navigator.clipboard.writeText(
                                referralStats.referralCode
                              )
                            }
                            className="bg-yellow-500 hover:bg-yellow-600 text-black">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-gray-400 text-sm text-center">
                          Share this code and earn ₦25 when someone enrolls!
                        </p>
                      </CardContent>
                    </Card>

                    {/* Social Sharing */}
                    <Card className="glass-card border-white/10">
                      <CardHeader>
                        <h3 className="text-xl font-bold text-white">
                          Share & Earn
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            {
                              name: "Twitter",
                              color: "bg-blue-500",
                              icon: "🐦",
                            },
                            {
                              name: "Facebook",
                              color: "bg-blue-600",
                              icon: "📘",
                            },
                            {
                              name: "LinkedIn",
                              color: "bg-blue-700",
                              icon: "💼",
                            },
                            {
                              name: "WhatsApp",
                              color: "bg-green-500",
                              icon: "💬",
                            },
                          ].map((platform) => (
                            <Button
                              key={platform.name}
                              className={`₦{platform.color} hover:opacity-80 text-white`}>
                              <span className="mr-2">{platform.icon}</span>
                              {platform.name}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recent Referrals */}
                    <Card className="glass-card border-white/10">
                      <CardHeader>
                        <h3 className="text-xl font-bold text-white">
                          Recent Referrals
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            {
                              name: "Sarah M.",
                              status: "Enrolled",
                              reward: "₦25",
                              date: "2 days ago",
                            },
                            {
                              name: "Mike K.",
                              status: "Pending",
                              reward: "₦25",
                              date: "1 week ago",
                            },
                            {
                              name: "Lisa R.",
                              status: "Enrolled",
                              reward: "₦25",
                              date: "2 weeks ago",
                            },
                          ].map((referral, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                              <div className="flex items-center">
                                <Avatar className="w-8 h-8 mr-3">
                                  <AvatarFallback className="text-xs">
                                    {referral.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-white font-medium">
                                    {referral.name}
                                  </div>
                                  <div className="text-gray-400 text-xs">
                                    {referral.date}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div
                                  className={`text-sm font-semibold ₦{
                                    referral.status === "Enrolled" ? "text-green-400" : "text-yellow-400"
                                  }`}>
                                  {referral.status}
                                </div>
                                <div className="text-gray-400 text-xs">
                                  {referral.reward}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Referral Success Notification
export function ReferralSuccessNotification() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate a referral success
    const timer = setTimeout(() => setIsVisible(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      className="fixed top-24 right-6 z-50 max-w-sm">
      <Card className="glass-card border-green-500/30 bg-green-500/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold">Referral Success! 🎉</h4>
                <p className="text-green-400 text-sm">You earned ₦25!</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6"
              onClick={() => setIsVisible(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-gray-300 text-sm">
            <span className="text-green-400 font-semibold">Mike Johnson</span>{" "}
            just enrolled using your referral code!
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
