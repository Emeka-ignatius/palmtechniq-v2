"use client"

import { useState, useEffect } from "react"
import { Users, Clock, Gift, Share2, Copy, Crown } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

// Group Buying Widget
export function GroupBuyingWidget({
  courseId,
  courseTitle,
  originalPrice,
}: {
  courseId: number
  courseTitle: string
  originalPrice: number
}) {
  const [groupData] = useState({
    currentMembers: 7,
    targetMembers: 10,
    discountTiers: [
      { members: 5, discount: 20, price: Math.round(originalPrice * 0.8) },
      { members: 10, discount: 35, price: Math.round(originalPrice * 0.65) },
      { members: 15, discount: 50, price: Math.round(originalPrice * 0.5) },
    ],
    timeLeft: 2 * 24 * 60 * 60, // 2 days in seconds
    groupCode: "REACT2024",
    members: [
      { name: "Sarah M.", avatar: "/placeholder.svg?height=32&width=32", joined: "2 hours ago" },
      { name: "Mike K.", avatar: "/placeholder.svg?height=32&width=32", joined: "4 hours ago" },
      { name: "Lisa R.", avatar: "/placeholder.svg?height=32&width=32", joined: "6 hours ago" },
      { name: "John D.", avatar: "/placeholder.svg?height=32&width=32", joined: "8 hours ago" },
      { name: "Emma W.", avatar: "/placeholder.svg?height=32&width=32", joined: "12 hours ago" },
    ],
  })

  const [timeLeft, setTimeLeft] = useState(groupData.timeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60))
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
    const mins = Math.floor((seconds % (60 * 60)) / 60)
    return `${days}d ${hours}h ${mins}m`
  }

  const getCurrentDiscount = () => {
    const tier = groupData.discountTiers
      .slice()
      .reverse()
      .find((tier) => groupData.currentMembers >= tier.members)
    return tier || { discount: 0, price: originalPrice }
  }

  const getNextTier = () => {
    return groupData.discountTiers.find((tier) => groupData.currentMembers < tier.members)
  }

  const currentTier = getCurrentDiscount()
  const nextTier = getNextTier()
  const progress = (groupData.currentMembers / groupData.targetMembers) * 100

  return (
    <Card className="glass-card border-yellow-500/30 bg-yellow-500/5 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Group Buying</h3>
              <p className="text-gray-400 text-sm">Get bigger discounts with friends!</p>
            </div>
          </div>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Clock className="w-3 h-3 mr-1" />
            {formatTime(timeLeft)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Progress */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-semibold">
              {groupData.currentMembers} / {groupData.targetMembers} members
            </span>
            <span className="text-yellow-400 font-bold">{currentTier.discount}% OFF</span>
          </div>
          <Progress value={progress} className="h-3 mb-2" />
          <p className="text-gray-400 text-sm">
            {nextTier
              ? `${nextTier.members - groupData.currentMembers} more members needed for ${nextTier.discount}% discount!`
              : "Maximum discount achieved! 🎉"}
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold">Discount Tiers</h4>
          {groupData.discountTiers.map((tier, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                groupData.currentMembers >= tier.members
                  ? "bg-green-500/20 border-green-500/30"
                  : groupData.currentMembers >= tier.members - 2
                    ? "bg-yellow-500/20 border-yellow-500/30"
                    : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Crown
                  className={`w-4 h-4 ${groupData.currentMembers >= tier.members ? "text-green-400" : "text-gray-400"}`}
                />
                <span className="text-white">{tier.members} members</span>
              </div>
              <div className="text-right">
                <div
                  className={`font-bold ${
                    groupData.currentMembers >= tier.members ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  {tier.discount}% OFF
                </div>
                <div className="text-gray-400 text-sm">${tier.price}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Members */}
        <div>
          <h4 className="text-white font-semibold mb-3">Group Members</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {groupData.members.slice(0, groupData.currentMembers).map((member, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">{member.name}</div>
                  <div className="text-gray-400 text-xs">{member.joined}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share Group */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold">Invite Friends</h4>
          <div className="flex items-center space-x-2">
            <Input
              value={`Join my group: ${groupData.groupCode}`}
              readOnly
              className="glass-card border-white/20 text-sm"
            />
            <Button
              size="sm"
              onClick={() => navigator.clipboard.writeText(groupData.groupCode)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
              <Gift className="w-4 h-4 mr-2" />
              Invite
            </Button>
          </div>
        </div>

        {/* Join Group Button */}
        <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3">
          Join Group - ${currentTier.price} ({currentTier.discount}% OFF)
        </Button>
      </CardContent>
    </Card>
  )
}
