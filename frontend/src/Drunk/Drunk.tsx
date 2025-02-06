import {useEffect, useState} from 'react';
import { EvervaultCard } from "../components/CryptoCard";
import Header from "../Header/Header";
// @ts-ignore
import Image from "../assets/Rock-paper-scissors.svg.png"



// @ts-ignore
const link = import.meta.env.VITE_API_URL2;

function Drunk({ drunkPush, isExpanded }) {
    const [apiResponse, setApiResponse] = useState({
                result: null,
                confidence: null,
                message: null
            });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [myMove, setmyMove] = useState("");
    useEffect(() => {
        if (apiResponse.result === "rock"){
            setmyMove("paper");
        } else if (apiResponse.result === "paper"){
            setmyMove("scissors");
        } else if(apiResponse.result === "scissors"){
            setmyMove("rock");
        }
    }, [apiResponse]);
    // @ts-ignore
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Reset states for new upload
        setApiResponse({
                result: null,
                confidence: null,
                message: null
            });
        setError(null);
        setIsLoading(true);

        const formData = new FormData();
        formData.append('photo', file); // Match the backend's expected field name

        try {
            const response = await fetch(`${link}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to analyze image');
            }

            setApiResponse({
                result: data.prediction,
                confidence: (data.confidence * 100).toFixed(1) + '%',
                message: data.message
            });

        } catch (error) {
            setError(error.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const first = (
        <div className="border border-black flex flex-col items-start w-full h-full p-4 relative">
            <EvervaultCard text="Drunk" drunkPush={drunkPush} />
        </div>
    );

    const second = (<>
            <Header/>
            <div className="border border-black flex flex-col items-start w-full h-full relative">
                <div className="w-full h-full flex flex-col m-0">
                    <EvervaultCard text="Drunk" drunkPush={drunkPush} className="m-0"/>
                </div>
            </div>
            <div
                className="bg-gradient-to-b from-black to-slate-900 w-full min-h-screen flex flex-col items-center justify-center p-6">
                {/* Image with White Background */}
                <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
                    <img src={Image} alt="rock-paper-scissors" className="w-64 h-64"/>
                </div>

                {/* Title and Description */}
                <p className="text-4xl font-bold text-white text-center mb-8">
                    Had a great night? Let's play rock-paper-scissors for your apartment!<br/>
                    Show me your hand gesture (make sure it's visible and looks like the picture above):
                </p>

                {/* File Upload Button */}
                <label className="relative cursor-pointer">
                    <input
                        type="file"
                        onChange={handleFileUpload}
                        accept="image/*"
                        disabled={isLoading}
                        className="hidden"
                    />
                    <div
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg">
                        {isLoading ? 'Uploading...' : 'Choose Photo'}
                    </div>
                </label>

                {/* Loading State */}
                {isLoading && (
                    <div className="mt-6 flex items-center gap-3 text-gray-300">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300"></div>
                        <span className="text-lg">Analyzing your move...</span>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="mt-6 p-4 bg-red-500/10 text-red-500 rounded-lg backdrop-blur-sm">
                        ⚠️ Error: {error}
                    </div>
                )}

                {/* API Response */}
                {apiResponse.result && (
                    <div
                        className="mt-6 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg w-full max-w-md">
                        <h3 className="text-2xl font-bold text-white mb-4">Game Result:</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">
                        I can say with {apiResponse.confidence} confidence that your move is: {apiResponse.result}
                    </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-white">So I will throw:</span>
                                <span className="text-white">{myMove}.</span>
                            </div>
                            <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">
                        Looks like you'll be living on the street, my friend.
                    </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );

    return isExpanded ? second : first;
}

export default Drunk;
