"use client"

import Link from "next/link"
import { Github, Twitter, Sparkles, Command, HatGlasses, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SearchCommand } from "@/components/search-command"
import { ModeToggle } from "@/components/mode-toggle"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4 md:gap-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <SheetHeader>
                                <SheetTitle className="text-left flex items-center gap-2">
                                    <HatGlasses className="h-6 w-6 text-primary" />
                                    <span>Antigravity UI</span>
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4 mt-8">
                                <Link href="/docs" className="text-lg font-medium hover:text-primary transition-colors">Components</Link>
                                <Link href="/docs/installation" className="text-lg font-medium hover:text-primary transition-colors">Installation</Link>
                                <Link href="/showcase" className="text-lg font-medium hover:text-primary transition-colors">Showcase</Link>
                                <hr className="border-border/40" />
                                <div className="flex items-center gap-4 py-2">
                                    <Link href="https://github.com/kishore-sv" target="_blank" className="text-muted-foreground hover:text-foreground">
                                        <Github className="h-5 w-5" />
                                    </Link>
                                    <Link href="https://x.com/kishore_sv_7" target="_blank" className="text-muted-foreground hover:text-foreground">
                                        <Twitter className="h-5 w-5" />
                                    </Link>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <Link href="/" className="flex items-center space-x-2 p-2 rounded-xl bg-muted">
                        <HatGlasses className="h-6 w-6 text-primary" />
                    </Link>
                    <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
                        <Link href="/docs" className="transition-colors hover:text-primary text-muted-foreground">Components</Link>
                        <Link href="/docs/installation" className="transition-colors hover:text-primary text-muted-foreground">Installation</Link>
                        <Link href="/showcase" className="transition-colors hover:text-primary text-muted-foreground">Showcase</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="flex-1 md:w-auto md:flex-none">
                        <SearchCommand className="w-9 px-0 sm:w-40 sm:px-3 md:w-64" />
                    </div>
                    <nav className="flex items-center gap-1 md:gap-2">
                        <Link href="https://github.com/kishore-sv" target="_blank" rel="noreferrer" className="hidden sm:block">
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
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
