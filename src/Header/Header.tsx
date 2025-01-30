import { useEffect, useState, useRef } from "react";
// @ts-ignore
import image from "../assets/house-blank.svg";
function Header({fridayPush}) {
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY.current) {
                // User is scrolling down
                setIsHidden(true);
            } else {
                // User is scrolling up
                setIsHidden(false);
            }
            if (window.scrollY === 0) {
                setIsHidden(false);
            }
            lastScrollY.current = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const reloadPage = () => {
        window.location.reload(); // Перезагружает текущую страницу
    };
    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out bg-purple text-white text-lg font-bold h-16  ${
                isHidden ? "-translate-y-full" : "translate-y-0"
            }`}
        >
            <nav className="flex justify-left space-x-6 py-2">
                <button
                    onClick={reloadPage}
                    className=" inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-purple-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 "
                >
                    Home
                </button>
            </nav>
        </header>
    );
}

export default Header;


// Button code

