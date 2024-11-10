import { useCallback, useEffect, useRef, useState } from "react";
import "./BinarySearch.css";

interface Props {
  changeMenu: (name: string) => void;
}

const BinarySearch = (props: Props) => {
  // Entries in array
  var numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const searchVal = 2;

  // States
  const [LeftPointerIndex, setLeftPointerIndex] = useState(0);
  const [RightPointerIndex, setRightPointerIndex] = useState(
    numArray.length - 1
  );

  // Refs
  const arrayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrayContainerRef = useRef<HTMLDivElement | null>(null);
  const leftPointerRef = useRef<HTMLDivElement | null>(null);
  const rightPointerRef = useRef<HTMLDivElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  const fixPointer = useCallback(
    (pointer: HTMLDivElement | null, item: HTMLDivElement | null) => {
      if (pointer) {
        pointer.style.position = "absolute";
        if (item) {
          // Get absolute position of first element in array
          var rect = item.getBoundingClientRect();

          pointer.style.top = `${
            rect.top + window.scrollY - pointer.offsetHeight - 10
          }px`;

          pointer.style.left = `${
            rect.left +
            window.scrollX +
            rect.width / 2 -
            pointer.offsetWidth / 2
          }px`;

          item.classList.add("selected_element");
        }
      }
    },
    []
  );

  // Find next pointer boundaries using BS
  const handleNextClick = () => {
    console.log(`Searching: ${searchVal}`);

    const mid =
      LeftPointerIndex + Math.floor((RightPointerIndex - LeftPointerIndex) / 2);

    if (mid < 0 || mid >= numArray.length) {
      throw new Error(`Invalid binary search array index: ${mid}`);
    }
    console.log(numArray[mid]);

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

  // Update pointers after index change
  useEffect(() => {
    fixPointer(leftPointerRef.current, arrayRefs.current[LeftPointerIndex]);
    fixPointer(rightPointerRef.current, arrayRefs.current[RightPointerIndex]);
  }, [LeftPointerIndex, RightPointerIndex]);

  return (
    <>
      <div className="binary_main">
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

        <button
          className="binary_next"
          ref={nextButtonRef}
          onClick={() => handleNextClick()}
        ></button>
      </div>

      <div className="pointer" ref={leftPointerRef}>
        <div className="pointer_text">Left</div>
        <div className="pointer_arrow"></div>
      </div>

      <div className="pointer" ref={rightPointerRef}>
        <div className="pointer_text">Right</div>
        <div className="pointer_arrow"></div>
      </div>
    </>
  );
};

export default BinarySearch;
