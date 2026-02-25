"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    ChevronDown,
    ChevronRight,
    Command,
    LayoutGrid,
    Search,
    Sparkles,
    CircleDashed,
    Code2,
    Database,
    Smartphone,
    MousePointer2,
    MessageSquare,
    Palette,
    Boxes
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { docsConfig } from "@/config/docs"
import { SearchCommand } from "@/components/search-command"
import { ModeToggle } from "@/components/mode-toggle"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    return (
        <Sidebar variant="sidebar" collapsible="icon" {...props} className="border-r border-border/40 bg-background">
            <SidebarHeader className="h-14 border-b px-2 flex flex-row items-center justify-between">
                <Link href="/" className="flex items-center gap-2 px-2">
                    <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Command className="size-4" />
                    </div>
                    <span className="font-bold text-sm tracking-tight group-data-[collapsible=icon]:hidden">antigravity.ui</span>
                </Link>
                <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
            </SidebarHeader>
            <SidebarHeader className="px-4 py-2 group-data-[collapsible=icon]:hidden">
                <SearchCommand />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="w-full justify-between h-10 border bg-muted/30">
                                    <div className="flex items-center gap-2">
                                        <LayoutGrid className="size-4" />
                                        <span className="font-medium text-xs">Components (15)</span>
                                    </div>
                                    <ChevronDown className="size-3 text-muted-foreground" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {docsConfig.map((section) => (
                    <SidebarGroup key={section.title} className="py-2">
                        <SidebarGroupLabel className="text-muted-foreground/60 font-medium px-2 py-4 h-auto text-[11px] uppercase tracking-wider">{section.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        {item.items ? (
                                            <CollapsibleNavItem
                                                item={item}
                                                pathname={pathname}
                                            />
                                        ) : (
                                            <SidebarMenuButton
                                                asChild
                                                isActive={pathname === item.href}
                                                tooltip={item.title}
                                                className="font-medium h-8 px-2"
                                            >
                                                <Link href={item.href || "#"}>
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        )}
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter className="border-t p-2">
                <div className="flex items-center justify-between px-2">
                    <ModeToggle />
                    <span className="text-[10px] text-muted-foreground font-mono group-data-[collapsible=icon]:hidden italic">v1.2.0</span>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

function CollapsibleNavItem({ item, pathname }: { item: any, pathname: string }) {
    const [isOpen, setIsOpen] = React.useState(true)
    const hasActiveChild = item.items.some((sub: any) => pathname === sub.href)

    return (
        <>
            <SidebarMenuButton
                onClick={() => setIsOpen(!isOpen)}
                tooltip={item.title}
                className="font-semibold text-foreground/80 h-9 justify-between"
            >
                <div className="flex items-center gap-2">
                    <span>{item.title}</span>
                    <span className="text-[10px] text-muted-foreground font-normal">({item.items.length})</span>
                </div>
                {isOpen ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
            </SidebarMenuButton>
            {isOpen && (
                <SidebarMenuSub>
                    {item.items.map((subItem: any) => (
                        <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.href}
                                className="hover:bg-accent/50 transition-colors h-8"
                            >
                                <Link href={subItem.href || "#"}>
                                    {subItem.title}
                                </Link>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
            )}
        </>
    )
}
