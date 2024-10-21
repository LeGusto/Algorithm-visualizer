import { useEffect, useRef, useState } from "react";
import "./App.css";




const Startup = () => {

    // Container of startup
    const box = useRef<HTMLDivElement | null>(null);
    // Start button
    const btt = useRef<HTMLButtonElement | null>(null);

    // States
    const [IsShown, setIsShown] = useState(false);
    const [isFading, setIsFading] = useState(false);

    // Hover animation for intro screen
    const handleHover = (adder: Boolean) => {
        // If the element is fading disable toggling the animation
        if (btt.current && box.current && !isFading) {
            if (adder) {btt.current.classList.add("hovered_button"); box.current.classList.add("hovered_main");}
            else {btt.current.classList.remove("hovered_button"); box.current.classList.remove("hovered_main");}
        }
    }

    // Fade animation once start is clicked
    const handleClick = () => {

        if (box.current) {
            setIsFading(true);
            box.current.classList.add("elementToFadeOut")

            const handleAnimationEnd = () => {
                // Remove the event listener after it fires
                box.current?.removeEventListener('animationend', handleAnimationEnd)
                // Hide the component after the animation
                box.current!.style.display = 'none'
            }
            // Add the event listener
            box.current.addEventListener('animationend', handleAnimationEnd)
        }
    }

    useEffect(() => {
        handleHover(IsShown);
    }, [IsShown]); // Dependency array with IsShown

    // Elements
    return (
        <div className="main_component" ref={box}>
            <p>Welcome!</p>
            <p>
                 This project was created to help me better understand how algorithms work in detail. Moreover, the website contains multiple algorithms for convenience. 
            </p>
            
            <button id="start_button" ref={btt}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
                onClick={handleClick}
            >
            Start</button>
        </div>
        
    )


}

export default Startup;