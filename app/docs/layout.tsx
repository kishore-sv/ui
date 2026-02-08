import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <SidebarProvider>
                <div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)] px-4">
                    <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 md:sticky md:block">
                        <AppSidebar className="border-none bg-transparent" />
                    </aside>
                    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
                        <div className="mx-auto w-full min-w-0">
                            {children}
                        </div>
                        <aside className="hidden text-sm xl:block">
                            <div className="sticky top-20">
                                {/* Table of Contents could go here */}
                            </div>
                        </aside>
                    </main>
                </div>
            </SidebarProvider>
        </div>
    )
}
