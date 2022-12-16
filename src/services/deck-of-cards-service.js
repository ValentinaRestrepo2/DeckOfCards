export const getNewDeckId = async () => {
  try {
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const data = await response.json();

    return data.deck_id;
  } catch (e) {
    console.log(e);
  }

  return null;
};

export const drawCardsFromDeck = async (deckId, quantity) => {
  try {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${quantity}`
    );
    const data = await response.json();

    return data.cards;
  } catch (e) {
    console.log(e);
  }

  return null;
};
