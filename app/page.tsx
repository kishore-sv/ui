"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Github, Sparkles, Zap, Shield, Layout, Palette } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative z-10 pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-primary/5"></div>
          </div>

          <div className="container px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 transition-all cursor-default">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                Newly released components
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
            >
              Build your next <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-400 bg-clip-text text-transparent">masterpiece</span> with motion
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
            >
              A collection of high-performance, accessible, and beautifully animated components built with Framer Motion and Tailwind CSS.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Link href="/docs">
                <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-lg shadow-primary/25">
                  Browse Components
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://github.com" target="_blank">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full border-border/40 bg-background/50 backdrop-blur-sm">
                  <Github className="mr-2 h-4 w-4" />
                  Star on GitHub
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Grids */}
        <section className="py-24 border-t border-border/40">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-yellow-500" />}
                title="Lightning Fast"
                description="Optimized for performance. Smooth 60fps animations that don't compromise on speed."
                delay={0.1}
              />
              <FeatureCard
                icon={<Shield className="h-6 w-6 text-blue-500" />}
                title="Accessible"
                description="Built on top of Radix UI, ensuring your animations remain inclusive and usable."
                delay={0.2}
              />
              <FeatureCard
                icon={<Layout className="h-6 w-6 text-purple-500" />}
                title="Copy & Paste"
                description="Just like shadcn/ui. Own your code. No complex dependencies or bloated packages."
                delay={0.3}
              />
              <FeatureCard
                icon={<Palette className="h-6 w-6 text-pink-500" />}
                title="Customizable"
                description="Tailwind-first approach. Change colors, sizing, and timing with utility classes."
                delay={0.4}
              />
              <FeatureCard
                icon={<Sparkles className="h-6 w-6 text-indigo-500" />}
                title="Modern Stack"
                description="Built with Next.js 15, React 19, and Tailwind CSS 4 for the ultimate developer experience."
                delay={0.5}
              />
              <FeatureCard
                icon={<ArrowRight className="h-6 w-6 text-green-500" />}
                title="Growing Library"
                description="New components added weekly. From simple transitions to complex interactive backgrounds."
                delay={0.6}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-12 bg-muted/50">
        <div className="container px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ by the Antigravity Team. The source code is available on <Link href="#" className="underline underline-offset-4 font-medium">GitHub</Link>.
          </p>
        </div>
      </footer>
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
