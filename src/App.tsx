import Startup from "./BasicMenus/Startup";
import MainMenu from "./BasicMenus/MainMenu";
import GeneralSelection from "./GeneralAlgorithms/GeneralSelection";
import "./BasicMenus/Startup.css";
import "./Templates/AnimatedList.css";
import { useRef, useState } from "react";

// Undo stack for menus
var menuStack: string[] = [];

function App() {
  const [CurrentMenu, setCurrentMenu] = useState("startup"); // State to control visibility of Startup

  const changeMenu = (name: string) => {
    name = name.toLowerCase();

    // Return to previous menu
    if (name == "back") {
      setCurrentMenu(menuStack[menuStack.length - 1]);
      menuStack.pop();
    } else {
      menuStack.push(CurrentMenu);
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
