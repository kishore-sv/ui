"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Search, Sparkles, User, CreditCard, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { docsConfig } from "@/config/docs"

export function SearchCommand({ className }: { className?: string }) {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false)
        command()
    }, [])

    // Flatten all items for the command list
    const allItems = React.useMemo(() => {
        const items: { title: string; href: string; section: string }[] = []
        docsConfig.forEach(section => {
            section.items.forEach(item => {
                if (item.href) {
                    items.push({ title: item.title, href: item.href, section: section.title })
                }
                if (item.items) {
                    item.items.forEach(subItem => {
                        if (subItem.href) {
                            items.push({ title: subItem.title, href: subItem.href, section: `${section.title} > ${item.title}` })
                        }
                    })
                }
            })
        })
        return items
    }, [])

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={cn(
                    "relative inline-flex h-9 w-full items-center justify-start rounded-md border bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground shadow-none transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    className
                )}
            >
                <Search className="mr-2 h-3.5 w-3.5" />
                <span>Search components...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Components">
                        {allItems.map((item) => (
                            <CommandItem
                                key={item.href}
                                onSelect={() => runCommand(() => router.push(item.href))}
                                className="flex items-center"
                            >
                                <Sparkles className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{item.title}</span>
                                <span className="ml-auto text-[10px] text-muted-foreground">{item.section}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem onSelect={() => runCommand(() => router.push("/settings/profile"))}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/settings/billing"))}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/settings/preferences"))}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
