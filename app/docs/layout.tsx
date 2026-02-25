import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
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
                    <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-backdrop-filter:bg-background/60">
                        <div className="flex flex-1 items-center gap-4 text-sm font-medium text-muted-foreground">
                            <span>UI</span>
                            <span>/</span>
                            <span className="text-foreground">Docs</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="https://discord.com"
                                target="_blank"
                                className="inline-flex h-8 items-center justify-center rounded-md bg-[#5865F2] px-4 text-xs font-semibold text-white hover:bg-[#4752C4]"
                            >
                                Discord
                            </Link>
                            <Link
                                href="https://github.com/kishore-sv"
                                target="_blank"
                                className="inline-flex h-8 items-center justify-center rounded-md bg-secondary px-4 text-xs font-semibold text-secondary-foreground hover:bg-secondary/80"
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
