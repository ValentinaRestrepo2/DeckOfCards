import { useState } from "react";

import { useGame } from "../../hooks/useGame";
import { drawCardsFromDeck } from "../../services/deck-of-cards-service";
import { Card } from "../card/card";
import "./new-cards.css";

export const NewCards = () => {
  const [canRequestMoreCards, setCanRequestMoreCards] = useState(true);
  const [cardForPlayerOne, setCardForPlayerOne] = useState();
  const [cardForPlayerTwo, setCardForPlayerTwo] = useState();

  const { game, playerOne, playerTwo, setPlayerOne, setPlayerTwo } = useGame();

  //Asignacion de las nuevas cartas para cada jugador
  const handleClick = async () => {
    if (canRequestMoreCards) {

      setPlayerOne({ ...playerOne, newCard: null, canSelectNewCard: true });
      setPlayerTwo({ ...playerTwo, newCard: null, canSelectNewCard: true });

      const newCardForPlayerOne = await drawCardsFromDeck(game.id, 1);
      const newCardForPlayerTwo = await drawCardsFromDeck(game.id, 1);

      if (newCardForPlayerOne[0] && newCardForPlayerTwo[0]) {
        setCardForPlayerOne(newCardForPlayerOne[0]);
        setCardForPlayerTwo(newCardForPlayerTwo[0]);
      } else {
        setCanRequestMoreCards(false);
      }
      //Si no tiene mas cartas, es porque la baraja terminó
    } 
  };

  //Arreglo de numeros de cartas del jugador uno
  const valuesCardsPlayerOne = playerOne.cards.map((card) => {
    if(card.value==='ACE'){
      card.value=1
    }
    if(card.value==='JACK'){
      card.value=11
    }
    if(card.value==='QUEEN'){
      card.value=12
    }
    if(card.value==='KING'){
      card.value=13
    }
    return (card.value)
  });
  

  //Arreglo de numeros de cartas del jugador uno
  const valuesCardsPlayerTwo = playerTwo.cards.map((card) => {
    if(card.value==='ACE'){
      card.value=1
    }
    if(card.value==='JACK'){
      card.value=11
    }
    if(card.value==='QUEEN'){
      card.value=12
    }
    if(card.value==='KING'){
      card.value=13
    }
    return (card.value)
  });

  const repeat_counter_one=[0,0,0,0,0,0,0,0,0,0,0,0,0]
  valuesCardsPlayerOne.forEach((value)=>{
    repeat_counter_one[value]++
  })

  const repeat_counter_two=[0,0,0,0,0,0,0,0,0,0,0,0,0]
  valuesCardsPlayerTwo.forEach((value)=>{
    repeat_counter_two[value]++
  })

  function validateTernaQuarter(repeat_counter){
    let countTerna=0, countQuarter=0;
    for(let i=0;i<repeat_counter.length;i++){
      if(repeat_counter[i]===3){
        countTerna=countTerna+1;
      }
      if(repeat_counter[i]===4){
        countQuarter=countQuarter+1
      }
    }
    return [countTerna, countQuarter]
  }

  const validateOne = validateTernaQuarter(repeat_counter_one)
  const validateTwo = validateTernaQuarter(repeat_counter_two)

  function validateWinner(validateOne, validateTwo){
      if(validateOne[0]===2 && validateOne[1]===1){
        return playerOne.name
      }else{
        if(validateTwo[0]===2 && validateTwo[1]===1){
          return playerTwo.name
        }else{
          return 'Ninguno ha ganado'
        }
      }
  }

  const validationWinner = validateWinner(validateOne, validateTwo)


  const handleCardClick = async (player, card) => {
    if (player === 1) setPlayerOne({ ...playerOne, newCard: card });
    if (player === 2) setPlayerTwo({ ...playerTwo, newCard: card });
  };

  return (
    
    <div className="new-card">    

      <p>
        {playerOne.name}<br/>
        # de ternas: {validateOne[0]}<br/>
        # de cuartas: {validateOne[1]}<br/>
      </p>

      <p>
        {playerTwo.name}<br/>
        # de ternas: {validateTwo[0]}<br/>
        # de cuartas: {validateTwo[1]}<br/>
      </p>

      <p>
        Ganador: {validationWinner}
      </p>

      <h3 className="new-card-title">
        {canRequestMoreCards
          ? "Obtener nuevas cartas"
          : "Se acabaron las cartas"}
      </h3>
      <p className="new-card-text">
        {canRequestMoreCards
          ? "Si deseas obtener la carta haz click en ella y luego selecciona en tu listado de cartas por cual la quieres reemplazar"
          : "Haz click en el botón para conocer el ganador"}
      </p>
      <button
        className="new-card-button"
        onClick={handleClick}
      >
        {(canRequestMoreCards ? "Obtener" : "Finalizar")}
      </button>
      {canRequestMoreCards && (
        <div className="cards-for-players">
          <div className="card-for-player-container">
            {cardForPlayerOne && (
              <>
                <span className="card-for-player-text">
                  Carta para {playerOne.name}
                </span>
                <Card
                  //Controla el click de la carta nueva
                  onClick={() => handleCardClick(1, cardForPlayerOne)}
                  card={cardForPlayerOne}
                  disabled={
                    playerOne.newCard !== null || !playerOne.canSelectNewCard
                  }
                />
              </>
            )}
          </div>
          <div className="card-for-player-container">
            {cardForPlayerTwo && (
              <>
                <span className="card-for-player-text">
                  Carta para {playerTwo.name}
                </span>
                <Card
                  onClick={() => handleCardClick(2, cardForPlayerTwo)}
                  card={cardForPlayerTwo}
                  disabled={
                    playerTwo.newCard !== null || !playerTwo.canSelectNewCard
                  }
                />
              </>
            )}
          </div>
        </div>
      )}
      
    </div>
    
  );
};
