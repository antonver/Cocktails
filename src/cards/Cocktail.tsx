import { BackgroundLines } from "../Background";
import Friday from "../Friday/Friday";
import Header from "../Header/Header";
import {useEffect, useState} from "react";
import {Hangover} from "../Hangover/Hangover";

function Cocktail({ show, component }) {
    const [comp, setComp] = useState("");

    let alcoholic;
    console.log(show.alcoholic);
    if (show.alcoholic) {
        alcoholic = "Alcoholic";
    } else {
        alcoholic = "Not alcoholic";
    }
    const reloadPage = () => {
        window.location.reload(); // This should reload the page
    };

    const onBack = () => {setComp(component)}

    if (comp === "friday") return <Friday fridayPush={() => 1} isExpanded={true}/>
    if (comp === "hangover") return <Hangover hangoverPush={() => 1} isExpanded={true}/>
    return (<>

            <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-800 relative overflow-hidden">
                <button
                    onClick={onBack}
                    aria-label="Reload page"
                    className="bg-gradient-to-b from-slate-950 to-slate-800 inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 "
                >
                    Back
                </button>
                <BackgroundLines
                    className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-800 relative overflow-hidden">

                    {/* Background lines effect */}
                    <div
                        className="absolute inset-0 opacity-20 [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]">
                        <div
                            className="absolute inset-0 [background-image:repeating-linear-gradient(to_right,rgba(148,163,184,0.1)_0px_1px,transparent_1px_24px)] animate-line-move"></div>
                        <div
                            className="absolute inset-0 [background-image:repeating-linear-gradient(to_bottom,rgba(148,163,184,0.1)_0px_1px,transparent_1px_24px)]"></div>
                    </div>

                    {/* Content container */}
                    <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 sm:py-12">
                        <div
                            className="bg-slate-900/70 backdrop-blur-lg rounded-2xl border border-slate-800/50 p-6 sm:p-8 shadow-2xl shadow-slate-950/50">
                            {/* Flex container for image and description */}
                            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                                {/* Image on the left */}
                                <div className="flex-shrink-0 w-full sm:w-1/2 aspect-[2/2] overflow-hidden rounded-lg">
                                    <img
                                        src={show.image}
                                        alt={show.name}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Description on the right */}
                                <div className="flex-1 flex flex-col justify-center"> {/* Center text vertically */}
                                    {/* Show name */}
                                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3">
                                        {show.name}
                                    </h1>

                                    {/* Instruction */}
                                    <p className="text-slate-300 text-base mb-4 leading-relaxed">
                                        {show.instruction}
                                    </p>

                                    {/* Alcoholic type */}
                                    <div className="inline-block bg-slate-800/50 px-3 py-1.5 rounded-full mb-4">
                                        <p className="text-slate-200 text-xs font-medium">
                                            Type: <span className="text-indigo-400">{alcoholic}</span>
                                        </p>
                                    </div>

                                    {/* Ingredients */}
                                    <div className="space-y-2">
                                        <h2 className="text-lg font-semibold text-slate-100 mb-1">
                                            Ingredients
                                        </h2>
                                        <p className="text-slate-300 text-base">{show.ingredients}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BackgroundLines>
            </div>
        </>
    );
}

export default Cocktail;
