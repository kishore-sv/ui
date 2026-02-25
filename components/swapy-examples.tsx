"use client"

import { useMemo, useState } from 'react';
import { SlotItemMapArray, utils } from 'swapy';
import {
    SwapyItem,
    SwapyLayout,
    SwapySlot,
} from '@/components/ui/swapy';
import { cn } from "@/lib/utils"

const initialItems = [
    { id: '1', content: 'Design', color: 'bg-emerald-500' },
    { id: '2', content: 'Strategy', color: 'bg-blue-500' },
    { id: '3', content: 'Code', color: 'bg-purple-500' },
];

export function SwapySimpleExample() {
    const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(
        utils.initSlotItemMap(initialItems, 'id')
    );

    const slottedItems = useMemo(
        () => utils.toSlottedItems(initialItems, 'id', slotItemMap),
        [initialItems, slotItemMap]
    );

    return (
        <SwapyLayout
            id='swapy-simple'
            onSwap={(event) => {
                setSlotItemMap(event.newSlotItemMap.asArray);
            }}
        >
            <div className="grid grid-cols-3 gap-4">
                {slottedItems?.map(({ slotId, itemId }) => {
                    const item = initialItems.find((i) => i.id === itemId);
                    return (
                        <SwapySlot key={slotId} id={slotId} className="h-32 border border-dashed rounded-lg flex items-center justify-center bg-muted/20">
                            <SwapyItem id={itemId} className={cn("w-[90%] h-[90%] text-white font-bold rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg", item?.color)}>
                                {item?.content}
                            </SwapyItem>
                        </SwapySlot>
                    );
                })}
            </div>
        </SwapyLayout>
    );
}

const teamItems = [
    { id: 't1', name: 'Alex', role: 'Lead', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
    { id: 't2', name: 'Sarah', role: 'Dev', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { id: 't3', name: 'Mike', role: 'UI/UX', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
    { id: 't4', name: 'Emily', role: 'QA', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
]

export function SwapyTeamExample() {
    const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(
        utils.initSlotItemMap(teamItems, 'id')
    );

    const slottedItems = useMemo(
        () => utils.toSlottedItems(teamItems, 'id', slotItemMap),
        [teamItems, slotItemMap]
    );

    return (
        <SwapyLayout
            id='swapy-team'
            onSwap={(event) => {
                setSlotItemMap(event.newSlotItemMap.asArray);
            }}
        >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {slottedItems?.map(({ slotId, itemId }) => {
                    const item = teamItems.find((i) => i.id === itemId);
                    return (
                        <SwapySlot key={slotId} id={slotId} className="aspect-square border border-dashed rounded-full flex items-center justify-center bg-muted/20">
                            <SwapyItem id={itemId} className="group relative w-[90%] h-[90%] rounded-full overflow-hidden cursor-grab active:cursor-grabbing shadow-lg">
                                <img src={item?.image} alt={item?.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2">
                                    <span className="font-bold text-xs">{item?.name}</span>
                                    <span className="text-[10px] text-zinc-300">{item?.role}</span>
                                </div>
                            </SwapyItem>
                        </SwapySlot>
                    );
                })}
            </div>
        </SwapyLayout>
    );
}
