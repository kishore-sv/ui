"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
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
} from "@/components/ui/sidebar"
import { docsConfig } from "@/config/docs"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    return (
        <Sidebar variant="floating" collapsible="icon" {...props} className="border-r border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <SidebarHeader>
                <Link href="/" className="flex items-center space-x-2 px-2 py-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg tracking-tight group-data-[collapsible=icon]:hidden">Antigravity UI</span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                {docsConfig.map((section) => (
                    <SidebarGroup key={section.title}>
                        <SidebarGroupLabel className="text-foreground/80 font-bold">{section.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        {item.items ? (
                                            <>
                                                <SidebarMenuButton tooltip={item.title} className="font-semibold text-foreground/70">
                                                    <span>{item.title}</span>
                                                </SidebarMenuButton>
                                                <SidebarMenuSub>
                                                    {item.items.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                isActive={pathname === subItem.href}
                                                                className="hover:bg-accent/50 transition-colors"
                                                            >
                                                                <Link href={subItem.href || "#"}>
                                                                    {subItem.title}
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </>
                                        ) : (
                                            <SidebarMenuButton
                                                asChild
                                                isActive={pathname === item.href}
                                                tooltip={item.title}
                                                className="font-medium"
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
            <SidebarRail />
        </Sidebar>
    )
}
