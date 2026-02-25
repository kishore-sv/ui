import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <SidebarInset className="flex flex-col">
                    {/* Announcement Bar */}
                    <div className="flex h-10 items-center justify-center border-b bg-background px-4 text-sm font-medium">
                        <Link href="https://github.com/kishore-sv/ui" className="flex items-center gap-2 hover:underline">
                            Stop Rebuilding UI From Scratch
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Main Content Actions (Optional Header for content area) */}
                    <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 md:px-6">
                        <SidebarTrigger className="md:hidden" />
                        <div className="flex flex-1 items-center gap-2 text-sm font-medium text-muted-foreground md:gap-4">
                            <span className="hidden md:inline">UI</span>
                            <span className="hidden md:inline">/</span>
                            <span className="text-foreground">Docs</span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4">
                            <Link
                                href="https://discord.com"
                                target="_blank"
                                className="hidden h-8 items-center justify-center rounded-md bg-[#5865F2] px-4 text-xs font-semibold text-white hover:bg-[#4752C4] sm:inline-flex"
                            >
                                Discord
                            </Link>
                            <Link
                                href="https://github.com/kishore-sv"
                                target="_blank"
                                className="hidden h-8 items-center justify-center rounded-md bg-secondary px-4 text-xs font-semibold text-secondary-foreground hover:bg-secondary/80 sm:inline-flex"
                            >
                                GitHub
                            </Link>
                        </div>
                    </header>

                    <main className="flex-1 overflow-auto">
                        <div className="container mx-auto max-w-5xl p-6 lg:p-10">
                            {children}
                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
