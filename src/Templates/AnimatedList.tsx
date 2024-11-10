import { useEffect, useRef, useState } from "react";
import "../Templates/ReusableCSS.css";
import "./AnimatedList.css";

interface Props {
  choices: string[];
  names: string[];
  changeMenu: (name: string) => void;
}

const AnimatedList = (props: Props) => {
  // Algorithm choices
  const choices = props.choices;
  const menuNames = props.names;

  // States
  const [HoverIndex, setHoverIndex] = useState(-1);
  const [isFading, setIsFading] = useState(false);
  const [isAppearing, setIsAppearing] = useState(true);

  // Refs
  const choiceRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Play initial animation for all buttons
  const expandAll = () => {
    choiceRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => {
          ref.classList.remove("reduction");
          ref.classList.add("expansion");

          if (index == 0) {
            const handleAnimationEnd = (event: { animationName: string }) => {
              if (event.animationName != "expand") return;

              // Remove the event listener after it fires
              ref!.removeEventListener("animationend", handleAnimationEnd);

              // Allow selection
              setIsAppearing(false);
            };

            ref?.addEventListener("animationend", handleAnimationEnd);
          }
        }, index * 200);
      }
    });
  };

  const reduceAll = () => {
    choiceRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => {
          ref.classList.remove("expansion");
          ref.classList.add("reduction");
        }, index * 200);
      }
    });
  };

  const handleClick = (index: number) => {
    // Already clicked
    if (isFading || isAppearing) return;

    setIsFading(true);

    var ind = choices.length - 1;
    while (ind > 0 && !choiceRefs.current[ind]) {
      ind--;
    }

    if (choiceRefs.current[ind] != null) {
      const handleAnimationEnd = (event: { animationName: string }) => {
        if (event.animationName != "shrink") return;

        // Remove the event listener after it fires
        choiceRefs.current[ind]!.removeEventListener(
          "animationend",
          handleAnimationEnd
        );

        // Initialize main menu
        props.changeMenu(menuNames[index]);
      };

      choiceRefs.current[ind]?.addEventListener(
        "animationend",
        handleAnimationEnd
      );

      reduceAll();
    }
    // Add the event listener
  };

  // Button hover animation
  const handleHover = (index: number) => {
    // Buttons are disappearing
    if (isFading) return;

    // Disable previous button animation
    if (HoverIndex != -1 && choiceRefs.current[HoverIndex]) {
      choiceRefs.current[HoverIndex].classList.remove("hovered_choice");
    }

    if (index != -1 && choiceRefs.current[index]) {
      choiceRefs.current[index].classList.add("hovered_choice");
    }

    // Update state value
    setHoverIndex(index);
  };

  // Call expandAll after components get created
  useEffect(() => {
    expandAll();
  }, []);

  // Elements
  return (
    <div className="main_component">
      <div className="choice_container">
        {choices.map((item, index) => (
          <button
            key={index}
            ref={(el) => (choiceRefs.current[index] = el)}
            className="choice"
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(-1)}
            onClick={() => handleClick(index)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimatedList;
