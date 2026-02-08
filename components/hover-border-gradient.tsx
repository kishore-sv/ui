"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const HoverBorderGradient = ({
    children,
    containerClassName,
    className,
    as: Tag = "button",
    duration = 1,
    clockwise = true,
    ...props
}: {
    children: React.ReactNode;
    containerClassName?: string;
    className?: string;
    as?: React.ElementType;
    duration?: number;
    clockwise?: boolean;
} & React.HTMLAttributes<HTMLElement>) => {
    const [hovered, setHovered] = useState(false);
    const [direction, setDirection] = useState<"TOP" | "LEFT" | "BOTTOM" | "RIGHT">("TOP");

    const rotateDirection = (currentDirection: "TOP" | "LEFT" | "BOTTOM" | "RIGHT") => {
        const directions: ("TOP" | "LEFT" | "BOTTOM" | "RIGHT")[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
        const currentIndex = directions.indexOf(currentDirection);
        const nextIndex = clockwise
            ? (currentIndex - 1 + directions.length) % directions.length
            : (currentIndex + 1) % directions.length;
        return directions[nextIndex];
    };

    const movingBackground = (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 h-full w-full"
        >
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,#a855f7_50%,transparent_100%)] animate-[spin_3s_linear_infinite]" />
        </motion.div>
    );

    return (
        <Tag
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
                "relative flex h-min w-fit flex-col flex-nowrap items-center justify-center overflow-visible rounded-full border border-border/40 bg-background/50 p-px decoration-clone transition-all duration-500 hover:bg-transparent",
                containerClassName
            )}
            {...props}
        >
            <div
                className={cn(
                    "z-10 w-auto rounded-[inherit] bg-background px-4 py-2 text-foreground",
                    className
                )}
            >
                {children}
            </div>
            <AnimatePresence mode="wait">
                {hovered && movingBackground}
            </AnimatePresence>
        </Tag>
    );
};
