"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Github, Zap, Shield, Layout, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ContrastSparkleAi01Icon } from "mmk-icons"

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col">

      <main>
        somthing main will come here....
      </main>


    </div>
  )
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative rounded-2xl border border-border/50 bg-card p-8 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20"
    >
      <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-muted group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  )
}

