import { useState } from "react";

import { GameContext } from "./game-context";

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState({ id: "", winner: null });
  const [playerOne, setPlayerOne] = useState({
    name: "",
    cards: [],
    canSelectNewCard: false,
    newCard: null,
  });
  const [playerTwo, setPlayerTwo] = useState({
    name: "",
    cards: [],
    canSelectNewCard: false,
    newCard: null,
  });

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
        playerOne,
        playerTwo,
        setPlayerOne,
        setPlayerTwo,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
