import "./App.css";
import { Form } from "./components/form/form";
import { Game } from "./components/game/game";
import { useGame } from "./hooks/useGame";

const App = () => {
  const { game } = useGame();

  return (
    <main>
      <h1>Deck of Cards</h1>
      {game.id ? <Game /> : <Form />}
    </main>
  );
};

export default App;
