"use client";
import "react";
import {
    TextRevealCard,
    TextRevealCardDescription,
    TextRevealCardTitle,
} from "../RevealCard";

export function Hangover() {
    return (
        <div className="flex items-center justify-center bg-[#0E0E10] h-full rounded-2xl w-full">
            <TextRevealCard
                text="It was GOOD!"
                revealText="Hangover"
            >
            </TextRevealCard>
        </div>
    );
}


