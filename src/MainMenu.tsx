import { useEffect, useRef, useState } from "react";

const MainMenu = () => {
  // Algorithm choices
  const choices = ["Sorting", "General", "Graph"];

  // States
  const [HoverIndex, setHoverIndex] = useState(-1);

  // Refs
  const choiceRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Play initial animation for all buttons
  const expandAll = () => {
    choiceRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => {
          ref.classList.add("choice");
        }, index * 200);
      }
    });
  };

  // Button hover animation
  const handleHover = (index: number) => {
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
    <div className="main_menu">
      {choices.map((item, index) => (
        <button
          key={index}
          ref={(el) => (choiceRefs.current[index] = el)}
          className="choice_init"
          onMouseEnter={() => handleHover(index)}
          onMouseLeave={() => handleHover(-1)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default MainMenu;
