import Startup from "./BasicMenus/Startup";
import MainMenu from "./BasicMenus/MainMenu";
import GeneralSelection from "./GeneralAlgorithms/GeneralSelection";
import "./BasicMenus/Startup.css";
import "./Templates/AnimatedList.css";
import { useRef, useState } from "react";

function App() {
  // State to control visibility of Startup
  const [CurrentMenu, setCurrentMenu] = useState("startup");
  // Undo stack state for menus
  const [menuStack, setMenuStack] = useState<string[]>([]);

  const changeMenu = (name: string) => {
    name = name.toLowerCase();

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

  return (
    <>
      <h1>Algorithm Visualizer</h1>
      {CurrentMenu === "startup" && <Startup changeMenu={changeMenu} />}
      {CurrentMenu === "main menu" && <MainMenu changeMenu={changeMenu} />}
      {CurrentMenu === "general" && (
        <GeneralSelection changeMenu={changeMenu} />
      )}
    </>
  );
}

export default App;
