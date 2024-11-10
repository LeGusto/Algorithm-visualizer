import AnimatedList from "../Templates/AnimatedList";
import "../Templates/ReusableCSS.css";

interface Props {
  changeMenu: (name: string) => void;
}

const MainMenu = (props: Props) => {
  const options = ["General", "Sorting", "Graph"];
  const names = ["General", "Sorting", "Graph"];

  return (
    <AnimatedList
      choices={options}
      names={names}
      changeMenu={props.changeMenu}
    />
  );
};

export default MainMenu;
