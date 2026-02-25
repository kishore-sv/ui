"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Check, Copy, Terminal } from "lucide-react"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    code?: string
    children: React.ReactNode
}

export function ComponentPreview({
    name,
    children,
    code,
    className,
    ...props
}: ComponentPreviewProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    const onCopy = React.useCallback(() => {
        if (code) {
            navigator.clipboard.writeText(code)
            setHasCopied(true)
            setTimeout(() => setHasCopied(false), 2000)
        }
    }, [code])

    return (
        <div
            className={cn("group relative my-4 flex flex-col space-y-2", className)}
            {...props}
        >
            <Tabs defaultValue="preview" className="relative mr-auto w-full">
                <div className="flex items-center justify-between pb-3">
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                        <TabsTrigger
                            value="preview"
                            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                        >
                            Preview
                        </TabsTrigger>
                        <TabsTrigger
                            value="code"
                            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                        >
                            Code
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="preview" className="relative rounded-md border p-10 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <div className="flex items-center justify-center min-h-[350px]">
                        {children}
                    </div>
                </TabsContent>
                <TabsContent value="code">
                    <div className="flex flex-col space-y-4">
                        <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
                            <CodeBlock code={code || ""} />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}


import { createHighlighter, type Highlighter } from "shiki"

export function CodeBlock({ code, language = "tsx", title }: { code: string, language?: string, title?: string }) {
    console.log(`[CodeBlock] Rendering "${title || "unnamed"}":`, {
        hasCode: !!code,
        codeType: typeof code,
        codeLength: code?.length,
        language
    })
    const [hasCopied, setHasCopied] = React.useState(false)
    const [highlighter, setHighlighter] = React.useState<Highlighter | null>(null)
    const [highlightedCode, setHighlightedCode] = React.useState<string>("")

    React.useEffect(() => {
        let mounted = true
        async function initHighlighter() {
            try {
                const hl = await createHighlighter({
                    themes: ["github-dark"],
                    langs: ["tsx", "typescript", "javascript", "bash", "json", "markdown"],
                })
                if (mounted) {
                    setHighlighter(hl)
                }
            } catch (error) {
                console.error("Failed to initialize highlighter", error)
            }
        }
        initHighlighter()
        return () => { mounted = false }
    }, [])

    React.useEffect(() => {
        if (highlighter && code && typeof code === "string") {
            try {
                const html = highlighter.codeToHtml(code, {
                    lang: language,
                    theme: "github-dark"
                })
                setHighlightedCode(html)
            } catch (error) {
                console.error("Failed to highlight code", error)
                setHighlightedCode(`<pre><code>${(code || "")
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")}</code></pre>`)
            }
        }
    }, [code, language, highlighter])


    const onCopy = React.useCallback(() => {
        navigator.clipboard.writeText(code)
        setHasCopied(true)
        setTimeout(() => setHasCopied(false), 2000)
    }, [code])

    return (
        <div className="dark relative my-6 rounded-xl border border-border/50 bg-card overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/50 bg-muted/50 px-4 py-2.5">
                <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">{title || "Component Code"}</span>
                </div>
                <button
                    onClick={onCopy}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                    {hasCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
            </div>
            <div
                className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono [&>pre]:bg-transparent! [&>pre]:m-0!"
                dangerouslySetInnerHTML={{
                    __html: highlightedCode || `<pre class="text-foreground"><code>${(code || "")
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&#039;")}</code></pre>`
                }}
            />
        </div>
    )
}

export * from "./props-table"
