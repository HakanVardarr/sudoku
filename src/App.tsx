import { useState } from "react";
import Board from "./components/Board";
import { YouLost } from "./components/YouLost";
import "./app.css";

function App() {
  let [life, setLife] = useState(3);
  // let [start, setStart] = useState(false);

  return (
    <>
      {life !== 0 ? (
        <Board life={life} onLifeChange={setLife} />
      ) : (
        <YouLost onClick={setLife} />
      )}
    </>
  );
}

export default App;
