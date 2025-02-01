import { useState, useEffect } from "react";
import { GlareCard } from "../FocusCards";
import Header from "../Header/Header";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Cocktail from "../cards/Cocktail";
"use client";
import "react";
import {
    TextRevealCard,
} from "../RevealCard";

const link = `http://localhost:8000/cocktails/?nonalcoholic=1&`;

function fetchData(page) {
    return axios.get(page)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching data:", error);
            return { results: [], next: null, previous: null };
        });
}

function filterByName(name) {
    if (!name.trim()) {
        // @ts-ignore
        return Promise.resolve([]);
    }


    return axios.get(`${link}name=${name}`)
        .then(response => response.data.results)
        .catch(error => {
            console.error("Error fetching filtered data:", error);
            return [];
        });
}

function filterByIngredients(ingredients) {
    if (!ingredients.trim()) {
        // @ts-ignore
        return Promise.resolve([]);
    }
    let i = 0;
    let line = "";
    for (let ingredient of ingredients.split(" ")) {
        i++;
        line += `ingredient${i}=${ingredient.trim()}&`;
    }

    line = line.slice(0, -1);
    return axios.get(`${link}${line}`)
        .then(response => response.data.results)
        .catch(error => {
            console.error("Error fetching filtered data:", error);
            return [];
        });
}

export function Hangover({hangoverPush, isExpanded}) {
    const [cocktails, setCocktails] = useState([]);
    const [cocktailName, setCocktailName] = useState("");
    const [page, setPage] = useState(link);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [spesCocktail, setSpesCocktail] = useState(false);
    const [cocktailIngedients, setCocktailIngedients] = useState("");

    useEffect(() => {
        fetchData(page)
            .then(data => {
                setNextPage(data.next);
                setPreviousPage(data.previous);
                setCocktails(data.results);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [page]);

    useEffect(() => {
        if (cocktailName.trim()) {
            filterByName(cocktailName)
                .then(data => setCocktails(data))
                .catch(error => console.error("Error fetching filtered data:", error));
        }
    }, [cocktailName]);

    useEffect(() => {
        if (cocktailIngedients.trim()) {
            filterByIngredients(cocktailIngedients)
                .then(data => setCocktails(data))
                .catch(error => console.error("Error fetching filtered data:", error));
        }
    }, [cocktailIngedients]);



    const next = () => nextPage && setPage(nextPage);
    const previous = () => previousPage && setPage(previousPage);
    const filterName = (name) => setCocktailName(name);
    const chooseCocktail = (cocktail) => setSpesCocktail(cocktail);
    const filterIngredients = (ingedients) => setCocktailIngedients(ingedients);

    const first = (
        <div className="flex items-center justify-center bg-[#0E0E10] h-full rounded-2xl w-full">

            <TextRevealCard
                text="It was GOOD!"
                revealText="Hangover"
                hangoverPush={hangoverPush}
            >
            </TextRevealCard>

        </div>
    );


    const cocktail = <Cocktail show={spesCocktail} component={"hangover"}></Cocktail>;

    if (!isExpanded) return first;

    if (spesCocktail !== false) return cocktail;

    return (
        <>
            <Header/>
            <div
                className="min-h-screen flex items-center flex-col justify-center bg-gradient-to-b from-black to-[#2d2d32]">
                <div className="bg-[#1d1c20] border border-white/[0.08] w-[40rem] rounded-lg p-8 relative mx-4">
                    <h1 className="text-7xl font-bold text-white bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100 text-center mb-4">
                        Hangover
                    </h1>
                </div>
                <SearchBar filterName={filterName} filterIngredient={filterIngredients}/>
            </div>

            <div className="min-h-screen relative w-full bg-gradient-to-b from-[#2d2d32] to-[#4a4a4f]">
                <div className="flex flex-wrap flex-row justify-around p-8 gap-4">
                    {cocktails.map((cocktail, index) => (
                        <button onClick={() => chooseCocktail(cocktail)}>
                            <GlareCard key={cocktail.id || index} className={"bg-gray-700"}>
                                <img src={cocktail.image} alt={cocktail.name}
                                     className="w-full h-auto rounded-lg shadow-lg"/>
                                <h3 className="text-2xl text-white font-bold font-sans mt-4 text-center">
                                    {cocktail.name}
                                </h3>
                            </GlareCard></button>
                    ))}
                </div>

                <div className="flex justify-center mt-6 gap-4">
                    {previousPage && cocktailIngedients === "" && cocktailName === "" && (
                        <button
                            onClick={previous}
                            className="inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-blue-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                        >
                            Previous
                        </button>
                    )}
                    {nextPage && cocktailIngedients === "" && cocktailName === "" && (
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
