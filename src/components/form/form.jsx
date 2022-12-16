import { useState } from "react";

import "./form.css";
import { useGame } from "../../hooks/useGame";
import {
  drawCardsFromDeck,
  getNewDeckId,
} from "../../services/deck-of-cards-service";

export const Form = () => {

  const { game, setGame, setPlayerOne, setPlayerTwo } = useGame();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const deckId = await getNewDeckId();
    setGame({ ...game, id: deckId });

    const nameOfPlayerOne = event.target[0].value;
    const nameOfPlayerTwo = event.target[1].value;

    const cardsForPlayerOne = await drawCardsFromDeck(deckId, 10);
    const cardsForPlayerTwo = await drawCardsFromDeck(deckId, 10);

    setPlayerOne({ name: nameOfPlayerOne, cards: cardsForPlayerOne });
    setPlayerTwo({ name: nameOfPlayerTwo, cards: cardsForPlayerTwo });

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div>
          <label htmlFor="playerOne">Jugador 1</label>
          <input
            id="playerOne"
            type="text"
            placeholder="Introduce el nombre"
            required
          />
        </div>
        <div>
          <label htmlFor="playerTwo">Jugador 2</label>
          <input
            id="playerTwo"
            type="text"
            placeholder="Introduce el nombre"
            required
          />
        </div>
      </div>
      <button>
        {"Jugar"}
      </button>
    </form>
  );
};
