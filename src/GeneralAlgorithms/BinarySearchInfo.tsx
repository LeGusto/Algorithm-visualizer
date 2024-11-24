import { useRef, useState } from "react";
import "./BinarySearchInfo.css";
import "../Templates/ReusableCSS.css";

interface Props {
  changeMenu: (name: string) => void;
}

const BinarySearchInfo = (props: Props) => {
  // States
  const [isFading, setIsFading] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (name: string) => {
    if (!containerRef.current || isFading) return;
    setIsFading(true);

    const handleAnimationEnd = (event: { animationName: string }) => {
      if (event.animationName != "fade") return;

      // Remove the event listener after it fires
      containerRef.current!.removeEventListener(
        "animationend",
        handleAnimationEnd
      );

      // Initialize next menu
      props.changeMenu(name);
    };

    containerRef.current?.addEventListener("animationend", handleAnimationEnd);
    containerRef.current?.classList.add("fade");
  };

  return (
    <div className="main_component" ref={containerRef}>
      <div className="binary_info_box">
        <p>
          <b>Binary search</b> is an algorithm for quickly finding a specific
          value in a sorted array by repeatedly dividing the search range in
          half. The intuition behind the algorithm is that if we always check
          the middle value of a range, we have only three possible options:
        </p>
        <ol style={{ textAlign: "left" }}>
          <li>We found the value we are searching for </li>
          <li>
            The value we are searching for is less than middle value, so we can
            discard all elements greater than the middle value
          </li>
          <li>
            The value we are searching for is greater than middle value, so we
            can discard all elements less than the middle value
          </li>
        </ol>
        <p></p>
        <div className="binary_button_container">
          <button className="binary_button" onClick={() => handleClick("Back")}>
            Back
          </button>
          <button
            className="binary_button"
            onClick={() => handleClick("Binary Search")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BinarySearchInfo;
