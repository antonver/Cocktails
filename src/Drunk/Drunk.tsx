import "./Drunk.modules.css";
import {EvervaultCard} from "../CryptoCard";

function Drunk({drunkPush, isExpanded}) {
    return (
        <div className="border border-black flex flex-col items-start w-full h-full p-4 relative">

                <EvervaultCard text="Drunk" drunkPush={drunkPush}/>
        </div>

);
}

export default Drunk;
