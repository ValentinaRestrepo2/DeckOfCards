import { useContext } from "react";

import { GameContext } from "../contexts/game/game-context";

export const useGame = () => useContext(GameContext);
