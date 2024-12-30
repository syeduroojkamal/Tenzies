import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import "./App.css";

export default function App() {
  const [allButtonsState, setAllButtonsState] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [allButtonsNumber, setAllButtonsNumber] = useState([]);

  const CheckWin = () => {
    if (
      allButtonsNumber.every((val) => val === allButtonsNumber[0]) &&
      allButtonsState.every((val) => val === true)
    ) {
      return <Confetti width={window.innerWidth} height={window.innerHeight} />;
    }
  };

  function toggeleButton(e) {
    if (e.target.classList.contains("onButton")) {
      e.target.classList.remove("onButton");
    } else {
      e.target.classList.add("onButton");
    }
    setAllButtonsState((prev) => {
      const temp = [...prev];
      temp[e.target.getAttribute("data-index")] =
        !temp[e.target.getAttribute("data-index")];
      return temp;
    });
  }

  const isExecuted = useRef(false);
  useEffect(() => {
    if (!isExecuted.current) {
      for (let i = 0; i < 10; i++) {
        setAllButtonsNumber((prev) => [
          ...prev,
          Math.floor(Math.random() * 9) + 1,
        ]);
      }
      isExecuted.current = true;
    }
  }, []);

  const randomlyGeneratedButtons = allButtonsNumber.map((rand, index) => (
    <button id={index} key={index} data-index={index}>
      {rand}
    </button>
  ));

  function roll() {
    for (let i = 0; i < allButtonsState.length; i++) {
      if (!allButtonsState[i]) {
        setAllButtonsNumber((prev) => {
          const temp = [...prev];
          temp[i] = Math.floor(Math.random() * 9) + 1;
          return temp;
        });
      }
    }
  }

  return (
    <main>
      <h1>Tenzies</h1>
      <p>
        Roll untill all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div onClick={toggeleButton} className="diceContainer">
        {randomlyGeneratedButtons}
      </div>
      <button className="rollButton" onClick={roll}>
        Roll
      </button>
      <CheckWin />
    </main>
  );
}
