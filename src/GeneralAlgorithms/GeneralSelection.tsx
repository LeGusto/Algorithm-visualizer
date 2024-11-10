import { useEffect, useRef, useState } from "react";
import AnimatedList from "../Templates/AnimatedList";

interface Props {
  changeMenu: (name: string) => void;
}

const GeneralSelection = (props: Props) => {
  const options = ["Binary search", "Back"];

  return <AnimatedList choices={options} changeMenu={props.changeMenu} />;
};

export default GeneralSelection;
