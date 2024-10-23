import { useCallback, useEffect, useRef, useState } from "react";
import "./BinarySearch.css";

interface Props {
  changeMenu: (name: string) => void;
}

const BinarySearch = (props: Props) => {
  // Entries in array
  var numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
        }
      }
    },
    []
  );

  // Update pointers after index change
  useEffect(() => {
    fixPointer(leftPointerRef.current, arrayRefs.current[LeftPointerIndex]);
    fixPointer(rightPointerRef.current, arrayRefs.current[RightPointerIndex]);
  }, [LeftPointerIndex, RightPointerIndex]);

  return (
    <div className="binary_main">
      <div
        className="binary_search_array"
        ref={arrayContainerRef}
        style={{ marginLeft: (-numArray.length * 25).toString() + "px" }}
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

      <div className="pointer" ref={leftPointerRef}>
        <div className="pointer_text">Left pointer</div>
        <div className="pointer_arrow"></div>
      </div>

      <div className="pointer" ref={rightPointerRef}>
        <div className="pointer_text">Right pointer</div>
        <div className="pointer_arrow"></div>
      </div>
    </div>
  );
};

export default BinarySearch;
