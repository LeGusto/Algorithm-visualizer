import { useEffect, useRef, useState } from "react";
import "./BinarySearch.css";
import "../Templates/ReusableCSS.css";

interface Props {
  changeMenu: (name: string) => void;
}

const BinarySearch = (props: Props) => {
  // Entries in array
  var numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const searchVal = 2;

  const screenWidth = window.screen.width;
  while (numArray.length * 50 > screenWidth - 10) numArray.pop();

  // States
  const [LeftPointerIndex, setLeftPointerIndex] = useState(0);
  const [RightPointerIndex, setRightPointerIndex] = useState(
    numArray.length - 1
  );
  const [NextStep, setNextStep] = useState("Middle value");
  const [isFading, setIsFading] = useState(false);

  // Refs
  const arrayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrayContainerRef = useRef<HTMLDivElement | null>(null);
  const leftPointerRef = useRef<HTMLDivElement | null>(null);
  const rightPointerRef = useRef<HTMLDivElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const mainContainerRef = useRef<HTMLDivElement | null>(null);

  const fixPointer = (
    pointer: HTMLDivElement | null,
    item: HTMLDivElement | null
  ) => {
    if (pointer) {
      if (item) {
        // Get absolute position of first element in array
        var rect = item.getBoundingClientRect();

        pointer.style.top = `${
          rect.top + window.scrollY - pointer.offsetHeight - 10
        }px`;

        pointer.style.left = `${
          rect.left + window.scrollX + rect.width / 2 - pointer.offsetWidth / 2
        }px`;

        item.classList.add("selected_element");
      }
    }
  };

  // Find next pointer boundaries using BS
  const handleNextClick = () => {
    if (isFading) return;

    const mid =
      LeftPointerIndex + Math.floor((RightPointerIndex - LeftPointerIndex) / 2);

    if (mid < 0 || mid >= numArray.length) {
      throw new Error(`Invalid binary search array index: ${mid}`);
    }

    if (NextStep == "Middle value") {
      setNextStep("Pointers");
      arrayRefs.current[mid]?.classList.add("middle_value");
      return;
    }

    arrayRefs.current[mid]?.classList.remove("middle_value");
    setNextStep("Middle value");

    if (numArray[mid] < searchVal) {
      arrayRefs.current[LeftPointerIndex]?.classList.remove("selected_element");
      setLeftPointerIndex(mid + 1);
    } else if (numArray[mid] > searchVal) {
      arrayRefs.current[RightPointerIndex]?.classList.remove(
        "selected_element"
      );
      setRightPointerIndex(mid - 1);
    } else console.log("Done");
  };

  const handleReturnClick = () => {
    // Already clicked
    if (isFading) return;

    setIsFading(true);

    if (mainContainerRef) {
      const handleAnimationEnd = (event: { animationName: string }) => {
        if (event.animationName != "fade") return;

        // Remove the event listener after it fires
        mainContainerRef.current!.removeEventListener(
          "animationend",
          handleAnimationEnd
        );

        // Initialize main menu
        props.changeMenu("back");
      };

      mainContainerRef.current?.addEventListener(
        "animationend",
        handleAnimationEnd
      );
      mainContainerRef.current?.classList.add("fade");
    }
    // Add the event listener
  };

  // Update pointers after index change
  useEffect(() => {
    fixPointer(rightPointerRef.current, arrayRefs.current[RightPointerIndex]);
    fixPointer(leftPointerRef.current, arrayRefs.current[LeftPointerIndex]);
  }, [LeftPointerIndex, RightPointerIndex]);

  return (
    <>
      <div className="main_component" ref={mainContainerRef}>
        <div className="binary_main">
          <p>Searching for: {searchVal}</p>
          <div
            className="binary_search_array"
            ref={arrayContainerRef}
            //style={{ marginLeft: (-numArray.length * 25).toString() + "px" }}
          >
            {numArray.map((item, index) => (
              <div
                key={index}
                ref={(el) => (arrayRefs.current[index] = el)}
                className="array_element"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="button_container">
            <button
              className="binary_next"
              ref={nextButtonRef}
              onClick={() => handleReturnClick()}
            >
              Quit
            </button>

            <button
              className="binary_next"
              ref={nextButtonRef}
              onClick={() => handleNextClick()}
            >
              Next
            </button>
          </div>
        </div>

        <div className="pointer" ref={leftPointerRef}>
          <div className="pointer_text"></div>
          <div className="pointer_arrow"></div>
        </div>

        <div className="pointer" ref={rightPointerRef}>
          <div className="pointer_text"></div>
          <div className="pointer_arrow"></div>
        </div>
      </div>
    </>
  );
};

export default BinarySearch;
