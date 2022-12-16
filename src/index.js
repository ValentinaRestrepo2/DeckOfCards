import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { GameProvider } from "./contexts/game/game-provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>
);