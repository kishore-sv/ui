"use client"

import React, { useEffect, useRef } from "react"
import { createSwapy, type Swapy } from "swapy"

export interface SwapyLayoutProps {
    children: React.ReactNode
    id: string
    config?: any
    onSwap?: (event: any) => void
    className?: string
}

export function SwapyLayout({
    children,
    id,
    config,
    onSwap,
    className
}: SwapyLayoutProps) {
    const swapyRef = useRef<Swapy | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        swapyRef.current = createSwapy(containerRef.current, config)

        if (onSwap) {
            swapyRef.current.onSwap(onSwap)
        }

        return () => {
            swapyRef.current?.destroy()
        }
    }, [config, onSwap])

    return (
        <div ref={containerRef} id={id} className={className}>
            {children}
        </div>
    )
}

export interface SwapySlotProps {
    children: React.ReactNode
    id: string
    className?: string
}

export function SwapySlot({
    children,
    id,
    className
}: SwapySlotProps) {
    return (
        <div data-swapy-slot={id} className={className}>
            {children}
        </div>
    )
}

export interface SwapyItemProps {
    children: React.ReactNode
    id: string
    className?: string
}

export function SwapyItem({
    children,
    id,
    className
}: SwapyItemProps) {
    return (
        <div data-swapy-item={id} className={className}>
            {children}
        </div>
    )
}

export interface DragHandleProps {
    children: React.ReactNode
    className?: string
}

export function DragHandle({
    children,
    className
}: DragHandleProps) {
    return (
        <div data-swapy-handle className={className}>
            {children}
        </div>
    )
}
