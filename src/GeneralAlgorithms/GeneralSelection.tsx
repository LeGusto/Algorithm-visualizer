import AnimatedList from "../Templates/AnimatedList";

interface Props {
  changeMenu: (name: string) => void;
}

const GeneralSelection = (props: Props) => {
  const options = ["Binary search", "Back"];
  const names = ["Binary search info", "Back"];

  return (
    <AnimatedList
      choices={options}
      names={names}
      changeMenu={props.changeMenu}
    />
  );
};

export default GeneralSelection;
