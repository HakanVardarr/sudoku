import { useState } from "react";
import Board from "./components/Board";
import { TextButton } from "./components/TextButton";

function App() {
  let [life, setLife] = useState(3);
  let [start, setStart] = useState(false);

  return (
    <>
      {start ? (
        life !== 0 ? (
          <Board life={life} onLifeChange={setLife} />
        ) : (
          <TextButton
            text="You Lost"
            buttonText="Try Again?"
            onClick={() => setLife(3)}
          />
        )
      ) : (
        <TextButton
          text="Press Start"
          buttonText="Start"
          onClick={() => setStart(true)}
        />
      )}
    </>
  );
}

export default App;
