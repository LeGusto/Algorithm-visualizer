import AnimatedList from "../Templates/AnimatedList";

interface Props {
  changeMenu: (name: string) => void;
}

const SortingSelection = (props: Props) => {
  const options = ["Back"];
  const names = ["Back"];

  return (
    <AnimatedList
      choices={options}
      names={names}
      changeMenu={props.changeMenu}
    />
  );
};

export default SortingSelection;
