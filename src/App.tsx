import Startup from "./Startup";
import MainMenu from "./MainMenu";
import "./Startup.css";
import "./MainMenu.css";
import { useState } from "react";

function App() {
  const [CurrentMenu, setCurrentMenu] = useState("startup"); // State to control visibility of Startup

  const handleStartupFadeOut = () => {
    console.log("nice");
    setCurrentMenu("main menu");
  };

  return (
    <>
      <h1>Algorithm Visualizer</h1>
      {CurrentMenu === "startup" && (
        <Startup onFadeOut={handleStartupFadeOut} />
      )}
      {CurrentMenu === "main menu" && <MainMenu />}
    </>
  );
}

export default App;
