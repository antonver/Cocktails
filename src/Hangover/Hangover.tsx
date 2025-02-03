import { useState, useEffect } from "react";
import { GlareCard } from "../FocusCards";
import Header from "../Header/Header";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Cocktail from "../cards/Cocktail";
import { TextRevealCard } from "../RevealCard";

// Access environment variable
// For Vite:
const link_all = "https://b3eb14bb-f096-43b6-b587-7e697b70edf2-dev.e1-eu-north-azure.choreoapis.dev/cocktails/backend/v1.0"
// For Create React App:
// const link_all = process.env.REACT_APP_API_URL;

const link = `${link_all}?nonalcoholic=1&`;

// Fetch data from the API
function fetchData(page) {
    return axios.get(page)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching data:", error);
            return { results: [], next: null, previous: null };
        });
}

// Filter cocktails by name
function filterByName(name) {
    if (!name.trim()) {
        return Promise.resolve([]);
    }
    return axios.get(`${link}name=${name}`)
        .then(response => response.data.results)
        .catch(error => {
            console.error("Error fetching filtered data:", error);
            return [];
        });
}

// Filter cocktails by ingredients
function filterByIngredients(ingredients) {
    if (!ingredients.trim()) {
        return Promise.resolve([]);
    }
    let query = ingredients
        .split(" ")
        .map((ingredient, index) => `ingredient${index + 1}=${ingredient.trim()}`)
        .join("&");
    return axios.get(`${link}${query}`)
        .then(response => response.data.results)
        .catch(error => {
            console.error("Error fetching filtered data:", error);
            return [];
        });
}

export function Hangover({ hangoverPush, isExpanded }) {
    const [cocktails, setCocktails] = useState([]);
    const [cocktailName, setCocktailName] = useState("");
    const [page, setPage] = useState(link);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [spesCocktail, setSpesCocktail] = useState(false);
    const [cocktailIngredients, setCocktailIngredients] = useState("");

    // Fetch data when the page changes
    useEffect(() => {
        fetchData(page)
            .then(data => {
                setNextPage(data.next);
                setPreviousPage(data.previous);
                setCocktails(data.results || []); // Ensure results is always an array
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [page]);

    // Filter cocktails by name
    useEffect(() => {
        if (cocktailName.trim()) {
            filterByName(cocktailName)
                .then(data => setCocktails(data || [])) // Ensure results is always an array
                .catch(error => console.error("Error fetching filtered data:", error));
        }
    }, [cocktailName]);

    // Filter cocktails by ingredients
    useEffect(() => {
        if (cocktailIngredients.trim()) {
            filterByIngredients(cocktailIngredients)
                .then(data => setCocktails(data || [])) // Ensure results is always an array
                .catch(error => console.error("Error fetching filtered data:", error));
        }
    }, [cocktailIngredients]);

    // Pagination functions
    const next = () => nextPage && setPage(nextPage);
    const previous = () => previousPage && setPage(previousPage);

    // First view when not expanded
    const first = (
        <div className="flex items-center justify-center bg-[#0E0E10] h-full rounded-2xl w-full">
            <TextRevealCard
                text="It was GOOD!"
                revealText="Hangover"
                hangoverPush={hangoverPush}
            />
        </div>
    );

    // Cocktail detail view
    const cocktail = <Cocktail show={spesCocktail} component={"hangover"} />;

    if (!isExpanded) return first;
    if (spesCocktail !== false) return cocktail;

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center flex-col justify-center bg-gradient-to-b from-black to-[#2d2d32]">
                <div className="bg-[#1d1c20] border border-white/[0.08] w-[40rem] rounded-lg p-8 relative mx-4">
                    <h1 className="text-7xl font-bold text-white bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100 text-center mb-4">
                        Hangover
                    </h1>
                </div>
                <SearchBar filterName={setCocktailName} filterIngredient={setCocktailIngredients} />
            </div>

            <div className="min-h-screen relative w-full bg-gradient-to-b from-[#2d2d32] to-[#4a4a4f]">
                <div className="flex flex-wrap flex-row justify-around p-8 gap-4">
                    {cocktails?.map((cocktail, index) => (
                        <button key={cocktail.id || index} onClick={() => setSpesCocktail(cocktail)}>
                            <GlareCard className={"bg-gray-700"}>
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

                <div className="flex justify-center mt-6 gap-4">
                    {previousPage && !cocktailIngredients && !cocktailName && (
                        <button
                            onClick={previous}
                            className="inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                        >
                            Previous
                        </button>
                    )}
                    {nextPage && !cocktailIngredients && !cocktailName && (
                        <button
                            onClick={next}
                            className="inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                        >
                            Next ➜
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
