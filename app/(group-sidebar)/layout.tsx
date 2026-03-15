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
                    {/* banner */}
                    {/* <div className="flex h-10 items-center justify-center border-b bg-background px-4 text-sm font-medium">
                        <Link href="https://github.com/kishore-sv/ui" className="flex items-center gap-2 hover:underline">
                            Stop Rebuilding UI From Scratch
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div> */}
                    <main className="flex-1 overflow-auto">
                        <div className="container mx-auto max-w-5xl p-6 lg:px-4 lg:pt-8">
                            {children}
                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider >
    )
}
