import { useState } from "react";
import "./App.css";


const onHover = (adder: Boolean) => {
    var btt = document.getElementById("start_button");
    var box = document.getElementsByClassName("main_component")[0];
    if (btt === null || box === null) return;
    if (adder) {btt.classList.add("hovered_button"); box.classList.add("hovered_main");}
    else {btt.classList.remove("hovered_button"); box.classList.remove("hovered_main");}
}



const Startup = () => {

    const [IsShown, setIsShown] = useState(false);

    return (
        <>
            <p>Welcome!</p>
            <p>
                 This project was created to help me better understand how algorithms work in detail. Moreover, the website contains multiple algorithms for convenience. 
            </p>
            
            <button id="start_button"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
            Start</button>
            {
                onHover(IsShown) 
            }
        </>
    )


}

export default Startup;