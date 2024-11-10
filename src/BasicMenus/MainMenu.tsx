import AnimatedList from "../Templates/AnimatedList";

interface Props {
  changeMenu: (name: string) => void;
}

const MainMenu = (props: Props) => {
  const options = ["General", "Sorting", "Graph"];

  return <AnimatedList choices={options} changeMenu={props.changeMenu} />;
};

export default MainMenu;
