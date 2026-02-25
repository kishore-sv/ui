"use client"

import * as React from "react"
import { Copy, RotateCcw, Plus, X, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface GridItem {
    id: number
    colStart: number
    rowStart: number
    colSpan: number
    rowSpan: number
    color: string
}

const COLORS = [
    "bg-blue-200 text-blue-900",
    "bg-emerald-200 text-emerald-900",
    "bg-purple-200 text-purple-900",
    "bg-pink-200 text-pink-900",
    "bg-amber-200 text-amber-900",
]

export function GridGenerator() {
    const [cols, setCols] = React.useState(5)
    const [rows, setRows] = React.useState(5)
    const [gap, setGap] = React.useState(4)
    const [items, setItems] = React.useState<GridItem[]>([])
    const [format, setFormat] = React.useState<"html" | "jsx">("jsx")
    const [draggingItem, setDraggingItem] = React.useState<{ id: number; offsetCol: number; offsetRow: number } | null>(null)
    const [resizingItem, setResizingItem] = React.useState<number | null>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)

    const addItem = (col: number, row: number) => {
        // Check if cell is occupied
        const isOccupied = items.some(item =>
            col >= item.colStart && col < item.colStart + item.colSpan &&
            row >= item.rowStart && row < item.rowStart + item.rowSpan
        )
        if (isOccupied) return

        const newItem: GridItem = {
            id: Date.now(),
            colStart: col,
            rowStart: row,
            colSpan: 1,
            rowSpan: 1,
            color: COLORS[items.length % COLORS.length]
        }
        setItems([...items, newItem])
    }

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id))
    }

    const reset = () => {
        setItems([])
        setCols(5)
        setRows(5)
        setGap(4)
    }

    const getGeneratedCode = () => {
        const gapValue = `gap-${gap}`
        const gridCols = `grid-cols-${cols}`
        const gridRows = `grid-rows-${rows}`

        let code = ""
        if (format === "jsx") {
            code = `<div className="grid ${gridCols} ${gridRows} ${gapValue}">\n`
            items.forEach((item, index) => {
                const colSpan = item.colSpan > 1 ? ` col-span-${item.colSpan}` : ""
                const rowSpan = item.rowSpan > 1 ? ` row-span-${item.rowSpan}` : ""
                const colStart = item.colStart > 1 ? ` col-start-${item.colStart}` : ""
                const rowStart = item.rowStart > 1 ? ` row-start-${item.rowStart}` : ""
                code += `  <div className="border rounded-lg p-4${colSpan}${rowSpan}${colStart}${rowStart}">${index + 1}</div>\n`
            })
            code += `</div>`
        } else {
            code = `<div class="grid ${gridCols} ${gridRows} ${gapValue}">\n`
            items.forEach((item, index) => {
                const colSpan = item.colSpan > 1 ? ` col-span-${item.colSpan}` : ""
                const rowSpan = item.rowSpan > 1 ? ` row-span-${item.rowSpan}` : ""
                const colStart = item.colStart > 1 ? ` col-start-${item.colStart}` : ""
                const rowStart = item.rowStart > 1 ? ` row-start-${item.rowStart}` : ""
                code += `  <div class="border rounded-lg p-4${colSpan}${rowSpan}${colStart}${rowStart}">${index + 1}</div>\n`
            })
            code += `</div>`
        }
        return code
    }

    const copyCode = () => {
        navigator.clipboard.writeText(getGeneratedCode())
    }

    const handleMouseDown = (e: React.MouseEvent, id: number, type: "move" | "resize") => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const cellWidth = rect.width / cols
        const cellHeight = rect.height / rows

        if (type === "move") {
            const item = items.find(i => i.id === id)!
            const mouseX = e.clientX - rect.left
            const mouseY = e.clientY - rect.top
            const currentCol = Math.floor(mouseX / cellWidth) + 1
            const currentRow = Math.floor(mouseY / cellHeight) + 1

            setDraggingItem({
                id,
                offsetCol: currentCol - item.colStart,
                offsetRow: currentRow - item.rowStart
            })
        } else {
            setResizingItem(id)
        }

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const moveRect = containerRef.current!.getBoundingClientRect()
            const moveMouseX = moveEvent.clientX - moveRect.left
            const moveMouseY = moveEvent.clientY - moveRect.top
            const moveCol = Math.max(1, Math.min(cols, Math.floor(moveMouseX / cellWidth) + 1))
            const moveRow = Math.max(1, Math.min(rows, Math.floor(moveMouseY / cellHeight) + 1))

            setItems(prev => prev.map(item => {
                if (item.id === id) {
                    if (type === "move") {
                        // Dragging logic needs a bit more care to feel good, but this works
                        const newColStart = Math.max(1, Math.min(cols - item.colSpan + 1, moveCol))
                        const newRowStart = Math.max(1, Math.min(rows - item.rowSpan + 1, moveRow))
                        return { ...item, colStart: newColStart, rowStart: newRowStart }
                    } else {
                        // Resizing logic
                        const newColSpan = Math.max(1, moveCol - item.colStart + 1)
                        const newRowSpan = Math.max(1, moveRow - item.rowStart + 1)
                        return { ...item, colSpan: newColSpan, rowSpan: newRowSpan }
                    }
                }
                return item
            }))
        }

        const handleMouseUp = () => {
            setDraggingItem(null)
            setResizingItem(null)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)
    }

    return (
        <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto p-4 md:p-8 bg-[#020817] rounded-3xl border border-border/40 shadow-2xl">
            {/* Header Controls */}
            <div className="flex flex-wrap justify-center gap-8">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Columns</span>
                    <Input
                        type="number"
                        value={cols}
                        onChange={(e) => setCols(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 h-12 text-center bg-muted/20 border-border/40 text-lg font-bold rounded-xl"
                    />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Rows</span>
                    <Input
                        type="number"
                        value={rows}
                        onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 h-12 text-center bg-muted/20 border-border/40 text-lg font-bold rounded-xl"
                    />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Gap</span>
                    <Input
                        type="number"
                        value={gap}
                        onChange={(e) => setGap(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-16 h-12 text-center bg-muted/20 border-border/40 text-lg font-bold rounded-xl"
                    />
                </div>
            </div>

            {/* Grid Area */}
            <div className="relative aspect-video w-full bg-[#050c1c] rounded-2xl border border-border/20 p-4 transition-all duration-300 shadow-inner group overflow-hidden">
                {/* Visual Grid Background */}
                <div
                    className="absolute inset-4 grid pointer-events-none opacity-20"
                    style={{
                        gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        gridTemplateRows: `repeat(${rows}, 1fr)`,
                        gap: `${gap * 0.25}rem`
                    }}
                >
                    {(Array.from({ length: cols * rows }) || []).map((_, i) => (
                        <div key={i} className="border border-dashed border-primary/30 rounded-lg"></div>
                    ))}
                </div>

                {/* Interaction Grid */}
                <div
                    ref={containerRef}
                    className="relative w-full h-full grid"
                    style={{
                        gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        gridTemplateRows: `repeat(${rows}, 1fr)`,
                        gap: `${gap * 0.25}rem`
                    }}
                >
                    {/* Empty Cells with + signs */}
                    {(Array.from({ length: cols * rows }) || []).map((_, i) => {
                        const row = Math.floor(i / cols) + 1
                        const col = (i % cols) + 1
                        return (
                            <button
                                key={i}
                                onClick={() => addItem(col, row)}
                                className="flex items-center justify-center rounded-lg bg-primary/5 hover:bg-primary/20 transition-all border border-transparent hover:border-primary/30"
                            >
                                <Plus className="size-4 text-primary/30" />
                            </button>
                        )
                    })}

                    {/* Placed Items */}
                    {items?.map((item, index) => (
                        <div
                            key={item.id}
                            style={{
                                gridColumn: `${item.colStart} / span ${item.colSpan}`,
                                gridRow: `${item.rowStart} / span ${item.rowSpan}`,
                                cursor: draggingItem?.id === item.id ? 'grabbing' : 'grab'
                            }}
                            className={cn(
                                "group/item relative rounded-xl shadow-lg flex items-center justify-center text-2xl font-black transition-all",
                                item.color,
                                draggingItem?.id === item.id && "z-50 scale-[1.02] shadow-2xl opacity-90",
                                resizingItem === item.id && "z-50 shadow-2xl ring-2 ring-primary"
                            )}
                            onMouseDown={(e) => {
                                if ((e.target as HTMLElement).closest('.resize-handle')) return
                                if ((e.target as HTMLElement).closest('.delete-btn')) return
                                handleMouseDown(e, item.id, "move")
                            }}
                        >
                            {index + 1}

                            {/* Delete Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    removeItem(item.id)
                                }}
                                className="delete-btn absolute -top-2 -right-2 size-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity hover:scale-110 shadow-lg"
                            >
                                <X className="size-3" />
                            </button>

                            {/* Resize Handle */}
                            <div
                                className="resize-handle absolute bottom-1 right-1 size-6 cursor-nwse-resize flex items-center justify-center text-current/50 opacity-0 group-hover/item:opacity-100 transition-opacity hover:text-current"
                                onMouseDown={(e) => {
                                    e.stopPropagation()
                                    handleMouseDown(e, item.id, "resize")
                                }}
                            >
                                <div className="size-2 border-r-2 border-b-2 border-current"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col gap-6">
                <div className="flex justify-center gap-4">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={reset}
                        className="bg-transparent border-border/40 hover:bg-white/5 h-12 px-8 rounded-xl font-bold"
                    >
                        <RotateCcw className="mr-2 size-4" />
                        Reset
                    </Button>
                    <Button
                        size="lg"
                        onClick={copyCode}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-12 rounded-xl font-bold shadow-lg shadow-primary/20"
                    >
                        <Copy className="mr-2 size-4" />
                        Copy Code
                    </Button>
                </div>

                {/* Code Preview */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm font-medium">
                        <span className="text-muted-foreground">Format:</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setFormat("jsx")}
                                className={cn(
                                    "px-3 py-1 rounded-full border transition-all",
                                    format === "jsx" ? "bg-primary/20 border-primary text-primary" : "border-border/40 text-muted-foreground hover:border-muted"
                                )}
                            >
                                JSX
                            </button>
                            <button
                                onClick={() => setFormat("html")}
                                className={cn(
                                    "px-3 py-1 rounded-full border transition-all",
                                    format === "html" ? "bg-primary/20 border-primary text-primary" : "border-border/40 text-muted-foreground hover:border-muted"
                                )}
                            >
                                HTML
                            </button>
                        </div>
                    </div>
                    <div className="relative group">
                        <pre className="p-6 rounded-2xl bg-muted/20 border border-border/40 text-sm font-mono text-muted-foreground overflow-auto max-h-[300px]">
                            <code>{getGeneratedCode()}</code>
                        </pre>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" onClick={copyCode} className="size-8">
                                <Copy className="size-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
