import "./Friday.modules.css";
import { motion } from "framer-motion";
import { LampContainer } from "../Lamp";
import { LampContainer2 } from "../Lamp2";
import { GlareCardDemo } from "../cards/Card";
import { useState, useEffect } from "react";
import {BackgroundLines} from "../Background";
import {GlareCard} from "../FocusCards";

function Friday({ fridayPush, isExpanded }) {
    // Define the first and second components
    const first = (
        <LampContainer>
            <div className="relative z-10 flex items-center justify-center">
                <div className="relative h-44 w-44 flex items-center justify-center text-white font-bold text-7xl">
                    <div />
                    <button
                        className="appearance-none bg-transparent border-none p-0 m-0"
                        onClick={fridayPush}
                    >
                        Friday
                    </button>
                </div>
            </div>
        </LampContainer>
    );
    const second = (
        <>
            <div className="flex flex-col items-center justify-center">
                <LampContainer>
                    <div className="relative z-10 flex items-center justify-center">
                        <div
                            className="relative h-44 w-44 flex items-center justify-center text-white font-bold text-7xl">
                            <div/>
                            Friday
                        </div>
                    </div>
                </LampContainer>
            </div>

            {/* New block with custom background and cards */}
            <div className="min-h-screen relative w-full bg-gradient-to-b from-slate-950 to-slate-800">
                <div className="flex flex-wrap flex-row justify-around p-8 gap-4">
                    <GlareCardDemo/>
                    <GlareCardDemo/>
                    <GlareCardDemo/>
                    <GlareCardDemo/>
                    <GlareCardDemo/>
                    <GlareCardDemo/>
                    <GlareCardDemo/>
                    <GlareCardDemo/>
                    <GlareCardDemo/>
                    <GlareCardDemo/>
                    <GlareCardDemo/>
                    <GlareCardDemo/>
                </div>
            </div>

        </>
    );


    return isExpanded ? second : first;
}

export default Friday;