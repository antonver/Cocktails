import Friday from "./Friday/Friday";
import Drunk from "./Drunk/Drunk";
import { Hangover } from "./Hangover/Hangover";
import {useState} from "react";
import { motion } from "framer-motion";


const App = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);
    const [isExpanded3, setIsExpanded3] = useState(false);

    function addFridayContent(){
        return (
            <>

            </>
        );
    }




    const fridayPush = () => {
        setIsExpanded(true);
    };

    const drunkPush = () => {
        setIsExpanded2(true);
    };

    const hangoverPush = () => {
        setIsExpanded3(true);
    };

    return (
        <>
            <div className="flex h-screen w-full">
                <motion.div
                    className={`border-r-0 border-black`}
                    initial={{flex: 1}}
                    animate={(isExpanded2 || isExpanded3) ?
                        {width: 0, padding: 0, margin: 0, border: 'none'}
                        : isExpanded ? {width: '100%'}
                            : {width: '33.33%'}}
                    transition={{duration: 2, ease: "easeOut"}}
                    onAnimationComplete={() => addFridayContent()}
                >
                    <Friday fridayPush={fridayPush} isExpanded={isExpanded}/>
                </motion.div>
                <motion.div
                    className={`bg-black overflow-hidden`}
                    initial={{width: '33.33%'}}
                    animate={(isExpanded || isExpanded3) ?
                        {width: 0, padding: 0, margin: 0, border: 'none'}
                        : isExpanded2 ? {width: '100%'}
                            : {width: '33.33%'}}
                    transition={{duration: 2, ease: "easeOut"}} // Adjust bounce value for desired effect
                >
                    <Drunk drunkPush={drunkPush} isExpanded={isExpanded2}/>
                </motion.div>
                <motion.div
                    className="bg-black"
                    initial={{
                        width: '33.33%',
                        padding: 0,
                        margin: 0,
                        overflow: 'hidden'  // Initial overflow state
                    }}
                    animate={(isExpanded || isExpanded2) ?
                        {
                            width: 0,
                            padding: 0,
                            margin: 0,
                            border: 'none',
                            overflow: 'hidden'
                        } : isExpanded3 ?
                            {
                                width: '100%',
                                overflow: 'visible'  // Remove overflow when expanded
                            } :
                            {
                                width: '33.33%',
                                overflow: 'hidden'   // Maintain overflow in other states
                            }}
                    transition={{duration: 2, ease: "easeOut"}}
                >
                    <Hangover hangoverPush={hangoverPush} isExpanded={isExpanded3}/>
                </motion.div>

            </div>
        </>
    );
};

export default App;