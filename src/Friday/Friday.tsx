import "./Friday.modules.css";
import { LampContainer } from "../Lamp";
import { useState, useEffect } from "react";
import { GlareCard } from "../FocusCards";
import Header from "../Header/Header";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Cocktail from "../cards/Cocktail";

// Define types for Cocktail and API response
type CocktailType = {
    id: string;
    name: string;
    image: string;
};

type ApiResponse = {
    results: CocktailType[];
    next: string | null;
    previous: string | null;
};

// @ts-ignore
const link = import.meta.env.VITE_API_URL;
console.log(link);
// Function to fetch data from the API
async function fetchData(page: string): Promise<ApiResponse> {
    try {
        const response = await axios.get<ApiResponse>(page);
        console.log("API Response:", response.data); // Debugging: Log API response
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return { results: [], next: null, previous: null }; // Ensure results is always an array
    }
}

// Function to filter cocktails by name
async function filterByName(name: string): Promise<CocktailType[]> {
    if (!name.trim()) return [];
    try {
        const response = await axios.get<ApiResponse>(`${link}?name=${name}`);
        console.log("Filtered by Name Response:", response.data); // Debugging: Log API response
        return response.data.results || []; // Ensure results is always an array
    } catch (error) {
        console.error("Error fetching filtered data:", error);
        return [];
    }
}

// Function to filter cocktails by ingredients
async function filterByIngredients(ingredients: string): Promise<CocktailType[]> {
    if (!ingredients.trim()) return [];
    const query = ingredients
        .split(" ")
        .map((ingredient, index) => `ingredient${index + 1}=${ingredient.trim()}`)
        .join("&");
    try {
        const response = await axios.get<ApiResponse>(`${link}?${query}`);
        console.log("Filtered by Ingredients Response:", response.data); // Debugging: Log API response
        return response.data.results || []; // Ensure results is always an array
    } catch (error) {
        console.error("Error fetching filtered data:", error);
        return [];
    }
}

function Friday({ fridayPush, isExpanded }: { fridayPush: () => void; isExpanded: boolean }) {
    const [cocktails, setCocktails] = useState<CocktailType[]>([]); // Initialized as empty array
    const [cocktailName, setCocktailName] = useState("");
    const [page, setPage] = useState(link);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [previousPage, setPreviousPage] = useState<string | null>(null);
    const [spesCocktail, setSpesCocktail] = useState<CocktailType | false>(false);
    const [cocktailIngredients, setCocktailIngredients] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Fetch cocktails when the page changes
    useEffect(() => {
        const fetchCocktails = async () => {
            setIsLoading(true);
            try {
                const data = await fetchData(page);
                setNextPage(data.next);
                setPreviousPage(data.previous);
                setCocktails(data.results || []); // Ensure results is always an array
            } catch (error) {
                console.error("Error fetching data:", error);
                setCocktails([]); // Fallback to empty array on error
            } finally {
                setIsLoading(false);
            }
        };
        fetchCocktails();
    }, [page]);

    // Filter cocktails by name
    useEffect(() => {
        const fetchFilteredCocktails = async () => {
            if (cocktailName.trim()) {
                setIsLoading(true);
                try {
                    const data = await filterByName(cocktailName);
                    setCocktails(data || []); // Ensure results is always an array
                } catch (error) {
                    console.error("Error fetching filtered data:", error);
                    setCocktails([]); // Fallback to empty array on error
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchFilteredCocktails();
    }, [cocktailName]);

    // Filter cocktails by ingredients
    useEffect(() => {
        const fetchFilteredCocktails = async () => {
            if (cocktailIngredients.trim()) {
                setIsLoading(true);
                try {
                    const data = await filterByIngredients(cocktailIngredients);
                    setCocktails(data || []); // Ensure results is always an array
                } catch (error) {
                    console.error("Error fetching filtered data:", error);
                    setCocktails([]); // Fallback to empty array on error
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchFilteredCocktails();
    }, [cocktailIngredients]);

    // Pagination functions
    const next = () => nextPage && setPage(nextPage);
    const previous = () => previousPage && setPage(previousPage);

    // First view when not expanded
    const first = (
        <LampContainer>
            <div className="relative z-10 flex items-center justify-center">
                <div className="relative h-44 w-44 flex items-center justify-center text-white font-bold text-7xl">
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

    // Cocktail detail view
    const cocktailDetail = spesCocktail && <Cocktail show={spesCocktail} component="friday" />;

    // Main content
    if (!isExpanded) return first;
    if (spesCocktail) return cocktailDetail;

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center">
                <LampContainer>
                    <div className="relative z-10 flex items-center justify-center">
                        <div className="relative h-44 w-44 flex items-center justify-center text-white font-bold text-7xl">
                            Friday
                        </div>
                    </div>
                    <SearchBar filterName={setCocktailName} filterIngredient={setCocktailIngredients} />
                </LampContainer>
            </div>
            {isLoading ? (
                <div className="mt-6 flex items-center gap-3 text-gray-300">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300"></div>
                    <span className="text-lg">Analyzing your move...</span>
                </div>
            ) : (
                <div className="min-h-screen relative w-full bg-gradient-to-b from-slate-950 to-slate-800">
                    {cocktails?.length > 0 ? (
                        <div className="flex flex-wrap flex-row justify-around p-8 gap-4">
                            {cocktails.map((cocktail) => (
                                <button key={cocktail.id} onClick={() => setSpesCocktail(cocktail)}>
                                    <GlareCard>
                                        <img
                                            src={cocktail.image}
                                            alt={cocktail.name}
                                            className="w-full h-auto rounded-lg shadow-lg"
                                        />
                                        <h3 className="text-2xl text-white font-bold font-sans mt-4 text-center">
                                            {cocktail.name}
                                        </h3>
                                    </GlareCard>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-white text-center mt-8">No cocktails found.</div>
                    )}
                    <div className="flex justify-center mt-6 gap-4">
                        {previousPage && !cocktailName.trim() && !cocktailIngredients.trim() && (
                            <button
                                onClick={previous}
                                className="inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                            >
                                Previous
                            </button>
                        )}
                        {nextPage && !cocktailName.trim() && !cocktailIngredients.trim() && (
                            <button
                                onClick={next}
                                className="inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                            >
                                Next ➜
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Friday;