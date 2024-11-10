import { useEffect, useRef, useState } from "react";
import AnimatedList from "../Templates/AnimatedList";

interface Props {
  changeMenu: (name: string) => void;
}

const SortingSelection = (props: Props) => {
  const options = ["Back"];

  return <AnimatedList choices={options} changeMenu={props.changeMenu} />;
};

export default SortingSelection;
