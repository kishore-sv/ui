"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Layout } from "lucide-react"
import { ContrastAi01Icon, ContrastLayoutGridStackDownIcon, ContrastXComIcon, StrokeChevronDownIcon } from "mmk-icons"
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "./ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

const MenuItems = [
    {
        title: "Follow Us",
        icon: <ContrastXComIcon />,
        items: [
            {
                title: "Twitter @kishore_sv",
                href: "https://x.com/kishore-sv",
                target: "_blank"
            },
            {
                title: "Github @kishore-sv",
                href: "https://github.com/kishore-sv",
                target: "_blank"
            },
        ],
    },
    {
        title: "Getting Started",
        icon: <BookOpen />,
        items: [
            {
                title: "Introduction",
                href: "/docs/introduction",
                target: "_self"
            },
            {
                title: "Installation",
                href: "/docs/installation",
                target: "_self"
            },
        ],
    },
    {
        title: "Layouts",
        icon: <ContrastLayoutGridStackDownIcon />,
        items: [
            {
                title: "Button",
                href: "/docs/components/button",
                target: "_self"
            },
            {
                title: "Dialog",
                href: "/docs/components/dialog",
                target: "_self"
            },
            {
                title: "Sidebar",
                href: "/docs/components/sidebar",
                target: "_self"
            },
        ],
    },
    {
        title: "Backgrounds & Effects",
        icon: <ContrastAi01Icon />,
        items: [
            {
                title: "Grid",
                href: "/docs/components/grid",
                target: "_self"
            },
            {
                title: "Bubbles",
                href: "/docs/components/bubbles",
                target: "_self"
            },
            {
                title: "Linear",
                href: "/docs/components/linear",
                target: "_self"
            },
        ],
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    return (
        <Sidebar className="h-[90vh] top-16 sticky border-none mr-6">
            <SidebarContent className="pl-8 pt-6">
                <Divider />
                <SidebarMenu>
                    {MenuItems.map((item) => (
                        <GroupMenu title={item.title} icon={item.icon} key={item.title}>
                            {item.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title} >
                                    <SidebarMenuSubButton asChild className={cn("", subItem.href === pathname && "border border-border dark:ring-offset-sidebar/80 bg-sidebar-accent/50 shadow-md transition-all ring ring-border ring-offset-1")}>
                                        <Link href={subItem.href} target={subItem.target}>
                                            <span>{subItem.title}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))}
                        </GroupMenu>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar >
    )
}


function GroupMenu({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
    return (
        <Collapsible asChild defaultOpen className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={title}>
                        {icon}
                        <span>{title}</span>
                        <StrokeChevronDownIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {children}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    )
}

function Divider() {
    return (
        < div className="absolute top-0 -right-6 h-full w-6" >
            <div className="block h-full w-full border-r border-l dark:hidden" style={{ borderColor: "rgba(0, 0, 0, 0.04)", backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(0, 0, 0, 0.04) 4px, rgba(0, 0, 0, 0.04) 5px)" }}>
            </div>
        </div >
    )
}