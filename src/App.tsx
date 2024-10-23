import Startup from "./BasicMenus/Startup";
import MainMenu from "./BasicMenus/MainMenu";
import GeneralSelection from "./GeneralAlgorithms/GeneralSelection";
import BinarySearch from "./GeneralAlgorithms/BinarySearch";
import "./BasicMenus/Startup.css";
import "./Templates/AnimatedList.css";
import { useState } from "react";

const validMenus = ["startup", "main menu", "general", "binary search"];

function App() {
  // State to control visibility of Startup
  const [CurrentMenu, setCurrentMenu] = useState<string>("startup");
  // Undo stack state for menus
  const [menuStack, setMenuStack] = useState<string[]>([]);

  const changeMenu = (name: string) => {
    name = name.toLowerCase();
    if (!validMenus.includes(name)) {
      throw new Error("Invalid menu name");
    }

    // Return to previous menu
    if (name == "back") {
      if (menuStack.length == 0) {
        throw new Error("Cannot undo: stack is empty");
      }

      setCurrentMenu(menuStack[menuStack.length - 1]);
      setMenuStack((prevStack) => prevStack.slice(0, -1));
    } else {
      setMenuStack((prevStack) => [...prevStack, CurrentMenu]);
      setCurrentMenu(name);
    }
  };

  const menuComponents: Record<string, JSX.Element> = {
    startup: <Startup changeMenu={changeMenu} />,
    "main menu": <MainMenu changeMenu={changeMenu} />,
    general: <GeneralSelection changeMenu={changeMenu} />,
    "binary search": <BinarySearch changeMenu={changeMenu} />,
  };

  return (
    <>
      <h1>Algorithm Visualizer</h1>
      {menuComponents[CurrentMenu]}
    </>
  );
}

export default App;
