"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface PropDef {
    name: string
    type: string
    default?: string
    description?: string
    required?: boolean
}

export function PropsTable({ data }: { data: PropDef[] }) {
    return (
        <div className="my-6 w-full overflow-y-auto rounded-lg border border-border/50">
            <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-muted-foreground">
                    <tr className="border-b border-border/50">
                        <th className="h-10 px-4 font-medium">Prop</th>
                        <th className="h-10 px-4 font-medium">Type</th>
                        <th className="h-10 px-4 font-medium">Default</th>
                        <th className="h-10 px-4 font-medium">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((prop) => (
                        <tr key={prop.name} className="border-b border-border/50 last:border-0 hover:bg-muted/20">
                            <td className="p-4 font-mono text-xs text-primary font-semibold">
                                {prop.name}
                                {prop.required && <span className="ml-1 text-destructive">*</span>}
                            </td>
                            <td className="p-4 font-mono text-xs text-muted-foreground">{prop.type}</td>
                            <td className="p-4 font-mono text-xs text-muted-foreground">
                                {prop.default ? (
                                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                        {prop.default}
                                    </code>
                                ) : (
                                    "-"
                                )}
                            </td>
                            <td className="p-4 text-muted-foreground">{prop.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
