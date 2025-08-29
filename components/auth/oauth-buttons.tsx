"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Chrome, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OAuthButtonsProps {
  mode: "login" | "signup"
}

export function OAuthButtons({ mode }: OAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const handleOAuth = async (provider: "google" | "github") => {
    setLoadingProvider(provider)

    try {
      // Simulate OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log(`${mode} with ${provider}`)
    } catch (error) {
      console.error(`${provider} ${mode} failed:`, error)
    } finally {
      setLoadingProvider(null)
    }
  }

  return (
    <div className="space-y-3">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 glass-card border-white/20 hover:border-neon-blue/50 hover:bg-white/5 transition-all duration-300 group bg-transparent"
          onClick={() => handleOAuth("google")}
          disabled={loadingProvider !== null}
        >
          {loadingProvider === "google" ? (
            <Loader2 className="w-5 h-5 animate-spin mr-3" />
          ) : (
            <Chrome className="w-5 h-5 mr-3 text-red-400 group-hover:text-red-300 transition-colors" />
          )}
          <span className="text-white/90 group-hover:text-white transition-colors">Continue with Google</span>
        </Button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 glass-card border-white/20 hover:border-neon-purple/50 hover:bg-white/5 transition-all duration-300 group bg-transparent"
          onClick={() => handleOAuth("github")}
          disabled={loadingProvider !== null}
        >
          {loadingProvider === "github" ? (
            <Loader2 className="w-5 h-5 animate-spin mr-3" />
          ) : (
            <Github className="w-5 h-5 mr-3 text-gray-300 group-hover:text-white transition-colors" />
          )}
          <span className="text-white/90 group-hover:text-white transition-colors">Continue with GitHub</span>
        </Button>
      </motion.div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-white/60">or continue with email</span>
        </div>
      </div>
    </div>
  )
}
