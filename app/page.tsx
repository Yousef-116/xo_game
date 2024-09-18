"use client";
import Cell from "./components/cell";
import { useEffect, useState } from "react";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Home() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [go, setGo] = useState("circle");
  const [winner, setWinner] = useState(""); // Use state for winner

  function reset_the_variables() {
    setCells(["", "", "", "", "", "", "", "", ""]);
    setGo("circle");
    setWinner("");
  }
  useEffect(() => {
    let currentWinner = "";
    winningCombos.forEach(combo => {
      if (cells[combo[0]] === cells[combo[1]] && cells[combo[1]] === cells[combo[2]] && cells[combo[0]] !== "") {
        currentWinner = cells[combo[0]];
        /*console.log(currentWinner)*/
      }
    });
    if (currentWinner) {
      setWinner(currentWinner); // Update winner state with the correct player
    }
    else if (cells.every(cell => cell !== "") && winner === "") {
      setWinner("Draw!");
    }
  }, [cells]);

  // useEffect(() => {
  // }, [cells]);

  return (
    <div className="container">
      <div className="message">
        {winner !== "" ? (
          winner === "Draw!" ? (
            "Draw!"
          ) : (
            <>Player <span className={winner === "circle" ? "circle" : "cross"}>{winner}</span> wins!</>
          )
        ) : (
          `It's now ${go}'s turn`
        )}
      </div>
      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell id={index} go={go} setGo={setGo} key={index} cells={cells} setCells={setCells} winner={winner} />
        ))}
      </div>
      <button className="reset-btn" onClick={reset_the_variables}>Reset</button>
    </div>
  );
}
