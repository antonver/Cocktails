import { useState } from "react";

function SearchBar({filterName, filterIngredient}) {
    const [searchTerm, setSearchTerm] = useState("");  // State to store input value

    const handleChange = (event) => {
        setSearchTerm(event.target.value); // Update state with input value
    };

    const handleSearchName = () => {
        filterName(searchTerm);
    };

    const handleSearchIngredient = () => {
        filterIngredient(searchTerm);
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
                className="border p-2 rounded-lg"
            />
            <button onClick={handleSearchName} className="h-8 animate-shimmer items-center justify-center rounded-md border border-blue-500 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
                Search by name
            </button>
            <button onClick={handleSearchIngredient} className="h-8 animate-shimmer items-center justify-center rounded-md border border-green-600 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
                Search by ingredients
            </button>
        </div>
    );
}

export default SearchBar;
