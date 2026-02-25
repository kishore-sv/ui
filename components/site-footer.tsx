"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Twitter, HatGlasses } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
    return (
        <footer className={cn("border-t border-border/40 bg-background", className)}>
            <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Link href="/" className="flex items-center space-x-2 p-2 rounded-xl bg-muted w-fit">
                                <HatGlasses className="h-6 w-6 text-primary" />
                            </Link>
                            <span className="font-bold text-xl tracking-tight">UI</span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Premium animation components for your next project. Built with React, Tailwind CSS, and Framer Motion.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-foreground">Product</h3>
                        <nav className="flex flex-col gap-2">
                            <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Components
                            </Link>
                            <Link href="/showcase" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Showcase
                            </Link>
                            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Pricing
                            </Link>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-foreground">Resources</h3>
                        <nav className="flex flex-col gap-2">
                            <Link href="/docs/installation" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Installation
                            </Link>
                            <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Blog
                            </Link>
                            <Link href="/community" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Community
                            </Link>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-foreground">Legal</h3>
                        <nav className="flex flex-col gap-2">
                            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Terms of Service
                            </Link>
                        </nav>
                    </div>
                </div>

                <div className="mt-12 border-t border-border/40 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Kishore UI. All rights reserved.
                    </p>
                    <p className="text-sm text-muted-foreground">Built by <Link href="https://kishore-sv.me" className="hover:text-primary underline" target="_blank" rel="noreferrer">kishore</Link> at Vercel. The source code is available on <Link href="https://github.com/kishore-sv/animations" className="hover:text-primary underline" target="_blank" rel="noreferrer">GitHub</Link>.</p>
                    <div className="flex items-center gap-4">
                        <Link href="https://github.com/kishore-sv" target="_blank" rel="noreferrer">
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </Button>
                        </Link>
                        <Link href="https://x.com/kishore_sv_7" target="_blank" rel="noreferrer">
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                                <Twitter className="h-4 w-4" />
                                <span className="sr-only">Twitter</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
