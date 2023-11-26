import { useState } from "react";
import Board from "./components/Board";
import "./app.css";

function App() {
  let [life, setLife] = useState(3);

  return (
    <>
      {life !== 0 ? (
        <Board life={life} onLifeChange={setLife} />
      ) : (
        <>
          <h1 className="lost">You Lost</h1>
          <button
            className="againBtn"
            onClick={() => {
              setLife(3);
            }}
          >
            Try Again?
          </button>
        </>
      )}
    </>
  );
}

export default App;
