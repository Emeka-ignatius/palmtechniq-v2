"use client";

import { forgotPassword } from "@/actions/auth";
import FormError from "@/components/shared/form-error";
import FormSuccess from "@/components/shared/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface ForgotPasswordProps {
  email?: string;
}

export function ForgotPasswordForm({ email }: ForgotPasswordProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const getMaskedEmail = (email: string) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    if (localPart.length <= 2) return email;
    return `₦{localPart.substring(0, 2)}₦{"*".repeat(
      localPart.length - 2
    )}@₦{domain}`;
  };

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      forgotPassword(data).then((data) => {
        if (data?.error) {
          setError(data?.error);
        }
        if (data.success) {
          setSuccess(data.success);
          form.reset();
        }
      });
    });
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6">
        <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-white" />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Check your email
          </h3>
          <p className="text-white/70">
            We've sent a password reset link to{" "}
            {email && (
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span>{getMaskedEmail(email)}</span>
              </div>
            )}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-white/60 text-sm">
            Didn't receive the email? Check your spam folder or try again.
          </p>

          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="w-full glass-card border-white/20 hover:border-neon-blue/50">
            Try again
          </Button>
        </div>

        <Link
          href="/login"
          className="inline-flex items-center text-neon-blue hover:text-neon-blue/80 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute z-50 left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />

                      <Input
                        {...field}
                        type="email"
                        disabled={isPending}
                        placeholder="Enter your email address"
                        className={`pl-12 h-12 glass-card border-white/20 focus:border-neon-blue/50 transition-all duration-300`}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-blue/80 hover:to-neon-purple/80 transition-all duration-300 hover-glow"
              disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Sending Reset Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center text-neon-blue hover:text-neon-blue/80 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </Link>
      </motion.div>
    </div>
  );
}
