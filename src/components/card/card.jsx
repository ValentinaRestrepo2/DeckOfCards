import "./card.css";

export const Card = ({ card, onClick, selecting, disabled }) => {
  const handleOnClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <img
      onClick={handleOnClick}
      className={`card ${selecting && "card-selecting"} ${
        disabled && "card-disabled"
      }`}
      src={card.image}
      alt={`${card.suit} ${card.value}`}
    />
  );
};
