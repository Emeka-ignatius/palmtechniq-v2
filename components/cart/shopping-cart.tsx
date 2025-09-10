"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  Star,
  Clock,
  Tag,
  CreditCard,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateRandomAvatar } from "@/lib/utils";

interface CartItem {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  price: number;
  originalPrice: number;
  rating: number;
  duration: number;
  thumbnail: string;
  quantity: number;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    title: "Advanced React & Next.js Development",
    instructor: "Sarah Johnson",
    instructorAvatar: generateRandomAvatar(),
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    duration: 24,
    thumbnail: generateRandomAvatar(),
    quantity: 1,
    level: "ADVANCED",
  },
  {
    id: "2",
    title: "Python for Data Science Masterclass",
    instructor: "Dr. Michael Chen",
    instructorAvatar: generateRandomAvatar(),
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.9,
    duration: 32,
    thumbnail: generateRandomAvatar(),
    quantity: 1,
    level: "INTERMEDIATE",
  },
];

export function ShoppingCartComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save20") {
      setDiscount(0.2);
    } else if (promoCode.toLowerCase() === "student10") {
      setDiscount(0.1);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  const getLevelColor = (level: string) => {
    switch (level) {
      case "BEGINNER":
        return "text-green-400 border-green-400";
      case "INTERMEDIATE":
        return "text-yellow-400 border-yellow-400";
      case "ADVANCED":
        return "text-red-400 border-red-400";
      default:
        return "text-gray-400 border-gray-400";
    }
  };

  return (
    <>
      {/* Cart Trigger */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="icon"
          className="hover-glow relative"
          onClick={() => setIsOpen(true)}>
          <ShoppingCart className="w-5 h-5" />
          {cartItems.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-neon-pink text-white text-xs px-1.5 py-0.5 rounded-full animate-pulse">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </Badge>
          )}
        </Button>
      </motion.div>

      {/* Cart Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-900/95 backdrop-blur-2xl border-l border-white/10 z-50 overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}>
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gradient">
                      Shopping Cart
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-white/10">
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-gray-400 mt-1">
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "course" : "courses"} in your cart
                  </p>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">
                        Your cart is empty
                      </p>
                      <p className="text-gray-500 text-sm">
                        Add some courses to get started!
                      </p>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className="glass-card p-4 rounded-xl border border-white/10"
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}>
                        <div className="flex gap-4">
                          <img
                            src={item.thumbnail || generateRandomAvatar()}
                            alt={item.title}
                            className="w-20 h-14 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white text-sm leading-tight mb-1">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar className="w-5 h-5">
                                <AvatarImage
                                  src={
                                    item.instructorAvatar ||
                                    generateRandomAvatar()
                                  }
                                />
                                <AvatarFallback className="text-xs">
                                  {item.instructor.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-400">
                                {item.instructor}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-400">
                                  {item.rating}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-400">
                                  {item.duration}h
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-xs px-1 py-0 ₦{getLevelColor(
                                  item.level
                                )}`}>
                                {item.level}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-neon-blue font-bold">
                                  ₦{item.price}
                                </span>
                                {item.originalPrice > item.price && (
                                  <span className="text-xs text-gray-500 line-through">
                                    ₦{item.originalPrice}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-6 h-6 hover:bg-white/10"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }>
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center text-sm">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-6 h-6 hover:bg-white/10"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }>
                                  <Plus className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-6 h-6 hover:bg-red-500/20 text-red-400 ml-2"
                                  onClick={() => removeItem(item.id)}>
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Promo Code & Checkout */}
                {cartItems.length > 0 && (
                  <div className="p-6 border-t border-white/10 space-y-4">
                    {/* Promo Code */}
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="glass-card border-white/20"
                        />
                        <Button
                          variant="outline"
                          onClick={applyPromoCode}
                          className="border-neon-blue/50 hover:bg-neon-blue/10 bg-transparent">
                          <Tag className="w-4 h-4" />
                        </Button>
                      </div>
                      {discount > 0 && (
                        <p className="text-green-400 text-sm">
                          ✅ {discount * 100}% discount applied!
                        </p>
                      )}
                    </div>

                    <Separator className="bg-white/10" />

                    {/* Order Summary */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Subtotal</span>
                        <span className="text-white">
                          ₦{subtotal.toFixed(2)}
                        </span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Discount</span>
                          <span className="text-green-400">
                            -₦{discountAmount.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-neon-blue">
                          ₦{total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-blue/80 hover:to-neon-purple/80 text-white font-semibold py-3">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Checkout with Paystack
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    {/* Money Back Guarantee */}
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                      <Shield className="w-4 h-4 text-green-400" />
                      30-day money-back guarantee
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
