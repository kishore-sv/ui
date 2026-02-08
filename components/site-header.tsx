"use client"

import Link from "next/link"
import { Github, Twitter, Sparkles, Command } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SearchCommand } from "@/components/search-command"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <span className="hidden font-bold sm:inline-block text-xl tracking-tight">Antigravity UI 123</span>
                    </Link>
                    <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
                        <Link href="/docs" className="transition-colors hover:text-primary text-muted-foreground">Components</Link>
                        <Link href="/docs/installation" className="transition-colors hover:text-primary text-muted-foreground">Installation</Link>
                        <Link href="/showcase" className="transition-colors hover:text-primary text-muted-foreground">Showcase</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <SearchCommand />
                    </div>
                    <nav className="flex items-center gap-2">
                        <Link href="https://github.com" target="_blank" rel="noreferrer">
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Button>
                        </Link>
                        <Link href="https://twitter.com" target="_blank" rel="noreferrer">
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Button>
                        </Link>
                        <ModeToggle />
                        <Button className="hidden sm:flex" size="sm">Get Started</Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
