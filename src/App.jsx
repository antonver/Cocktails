import Header from "./Header/Header";
import Friday from "./Friday/Friday";
import Drunk from "./Drunk/Drunk";
import { Hangover } from "./Hangover/Hangover";
import {useState} from "react";
import { motion } from "framer-motion";


const App = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    function addFridayContent(){
        return (
            <>

            </>
        );
    }




    const fridayPush = () => {
        setIsExpanded(true);
    };

    return (
        <>
            <Header fridayPush={fridayPush} />
            <div className="flex h-screen w-full">
                <motion.div
                    className={`border-r-0 border-black`}
                    initial={{ flex: 1 }}
                    animate={isExpanded ? { width: '100%' } : { flex: 1 }}
                    transition={{ duration: 2, ease: "easeOut"}}
                    onAnimationComplete={() => addFridayContent()}
                >
                    <Friday fridayPush={fridayPush} isExpanded={isExpanded}/>
                </motion.div>
                <motion.div
                    className={`bg-black`}
                    initial={{ width: '33.33%' }}
                    animate={isExpanded ? { width: 0, padding: 0, margin: 0, border: 'none' } : { width: '33.33%' }}
                    transition={{ duration: 2, ease: "easeOut"}} // Adjust bounce value for desired effect
                >
                    <Drunk />
                </motion.div>
                <motion.div
                    className={`bg-black`}
                    initial={{ width: '33.33%' }}
                    animate={isExpanded ? { width: 0, minWidth: 0, padding: 0, margin: 0, border: 'none', overflow: 'hidden' } : { width: '33.33%' }}
                    transition={{ duration: 2, ease: "easeOut"}} // Adjust bounce value for desired effect
                >
                    <Hangover />
                </motion.div>
            </div>
        </>
    );
};

export default App;