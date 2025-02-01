import "./Friday.modules.css";
import { LampContainer } from "../Lamp";
import { useState, useEffect } from "react";
import { GlareCard } from "../FocusCards";
import Header from "../Header/Header";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Cocktail from "../cards/Cocktail";

// @ts-ignore
const link = import.meta.env.REACT_APP_API_URL;

// Function to fetch data from the API
function fetchData(page) {
    return axios.get(page)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching data:", error);
            return { results: [], next: null, previous: null };
        });
}

// Function to filter cocktails by name
function filterByName(name) {
    if (!name.trim()) {
        // @ts-ignore
        return Promise.resolve([]);
    }
    return axios.get(`${link}?name=${name}`)
        .then(response => response.data.results)
        .catch(error => {
            console.error("Error fetching filtered data:", error);
            return [];
        });
}

// Function to filter cocktails by ingredients
function filterByIngredients(ingredients) {
    if (!ingredients.trim()) {
        // @ts-ignore
        return Promise.resolve([]);
    }
    let query = "";
    ingredients.split(" ").forEach((ingredient, index) => {
        query += `ingredient${index + 1}=${ingredient.trim()}&`;
    });
    query = query.slice(0, -1); // Remove the trailing "&"
    return axios.get(`${link}?${query}`)
        .then(response => response.data.results)
        .catch(error => {
            console.error("Error fetching filtered data:", error);
            return [];
        });
}

function Friday({ fridayPush, isExpanded }) {
    const [cocktails, setCocktails] = useState([]);
    const [cocktailName, setCocktailName] = useState("");
    const [page, setPage] = useState(link);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [spesCocktail, setSpesCocktail] = useState(false);
    const [cocktailIngredients, setCocktailIngredients] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Fetch cocktails when the page changes
    useEffect(() => {
        // @ts-ignore
        const fetchCocktails = async () => {
            setIsLoading(true); // Start loading
            try {
                const data = await fetchData(page);
                setNextPage(data.next);
                setPreviousPage(data.previous);
                setCocktails(data.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false); // Stop loading
            }
        };
        fetchCocktails();
    }, [page]);

    // Filter cocktails by name
    useEffect(() => {
        if (cocktailName.trim()) {
            setIsLoading(true); // Start loading
            filterByName(cocktailName)
                .then(data => {
                    setCocktails(data);
                    setIsLoading(false); // Stop loading
                })
                .catch(error => {
                    console.error("Error fetching filtered data:", error);
                    setIsLoading(false); // Stop loading on error
                });
        } else {
            setIsLoading(false); // Reset loading if no search term
        }
    }, [cocktailName]);

    // Filter cocktails by ingredients
    useEffect(() => {
        if (cocktailIngredients.trim()) {
            setIsLoading(true); // Start loading
            filterByIngredients(cocktailIngredients)
                .then(data => {
                    setCocktails(data);
                    setIsLoading(false); // Stop loading
                })
                .catch(error => {
                    console.error("Error fetching filtered data:", error);
                    setIsLoading(false); // Stop loading on error
                });
        } else {
            setIsLoading(false); // Reset loading if no ingredients
        }
    }, [cocktailIngredients]);

    // Pagination functions
    const next = () => nextPage && setPage(nextPage);
    const previous = () => previousPage && setPage(previousPage);

    // Filtering and selection functions
    const filterName = (name) => setCocktailName(name);
    const chooseCocktail = (cocktail) => setSpesCocktail(cocktail);
    const filterIngredients = (ingredients) => setCocktailIngredients(ingredients);

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
    const cocktailDetail = <Cocktail show={spesCocktail} component={"friday"} />;

    // Main content
    if (!isExpanded) return first;
    if (spesCocktail !== false) return cocktailDetail;

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
                    <SearchBar filterName={filterName} filterIngredient={filterIngredients} />
                </LampContainer>
            </div>
            {isLoading ? (
                <div className="mt-6 flex items-center gap-3 text-gray-300">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300"></div>
                    <span className="text-lg">Analyzing your move...</span>
                </div>
            ) : (
                <div className="min-h-screen relative w-full bg-gradient-to-b from-slate-950 to-slate-800">
                    <div className="flex flex-wrap flex-row justify-around p-8 gap-4">
                        {cocktails.map((cocktail, index) => (
                            <button key={cocktail.id || index} onClick={() => chooseCocktail(cocktail)}>
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