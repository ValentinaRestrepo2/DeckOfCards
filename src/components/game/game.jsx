import "./game.css";
import { useGame } from "../../hooks/useGame";
import { NewCards } from "../new-cards/new-cards";
import { Card } from "../card/card";

export const Game = () => {
  const { playerOne, playerTwo, setPlayerOne, setPlayerTwo } = useGame();

  const handleCardClick = (player, index, card) => {
    let tempCards;

    if (player === 1) {
      tempCards = playerOne.cards;
      tempCards[index] = card;
      setPlayerOne({
        ...playerOne,
        cards: tempCards,
        newCard: null,
        canSelectNewCard: false,
      });
    }

    if (player === 2) {
      tempCards = playerTwo.cards;
      tempCards[index] = card;
      setPlayerTwo({
        ...playerTwo,
        cards: tempCards,
        newCard: null,
        canSelectNewCard: false,
      });
    }

  };

  return (
    <div className="game">
      <div className="player-container">
        <h2 className="player-name">{playerOne.name}</h2>
        <div className="cards-container">
          {playerOne.cards.map((card, index) => (
            <Card
              onClick={() => handleCardClick(1, index, playerOne.newCard)}
              card={card}
              selecting={playerOne.newCard}
              disabled={!playerOne.newCard}
              key={index}
            />
          ))}
        </div>
      </div>
      <span className="versus">VS</span>
      <div className="player-container">
        <div className="cards-container">
          {playerTwo.cards.map((card, index) => (
            <Card
              onClick={() => handleCardClick(2, index, playerTwo.newCard)}
              card={card}
              selecting={playerTwo.newCard}
              disabled={!playerTwo.newCard}
              key={index}
            />
          ))}
        </div>
        <h2 className="player-name">{playerTwo.name}</h2>
      </div>
      <NewCards />
    </div>
  );
};
