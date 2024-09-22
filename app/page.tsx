"use client";
import Cell from "./components/cell";
import { useEffect, useState } from "react";
import ResultRow from "./components/resultRow";

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
  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);
  const [draw, setDraw] = useState(0);
  const [winningIndices, setWinningIndices] = useState<number[]>([]);

  function reset_the_variables() {
    setCells(["", "", "", "", "", "", "", "", ""]);
    setGo(winner);
    setWinner("");
    setWinningIndices([]);
  }
  useEffect(() => {
    let currentWinner = "";
    winningCombos.forEach(combo => {
      if (cells[combo[0]] === cells[combo[1]] && cells[combo[1]] === cells[combo[2]] && cells[combo[0]] !== "") {
        currentWinner = cells[combo[0]];
        setWinningIndices(combo);
      }
    });

    if (currentWinner) {
      // Only set the winner if it has changed
      if (winner !== currentWinner) {
        setWinner(currentWinner);
        if (currentWinner === "circle") {
          setPlayer1(prev => prev + 1);
        } else if (currentWinner === "cross") {
          setPlayer2(prev => prev + 1);
        }
      }
    } else if (cells.every(cell => cell !== "") && winner === "") {
      setWinner("Draw!");
      setDraw(prev => prev + 1);
    }

    console.log(winningIndices);
  }, [cells, winner]);

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


        {winner && winner !== "" && (
          <button className="reset-btn" onClick={reset_the_variables}>
            Reset
          </button>
        )}
      </div>
      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell id={index} go={go} setGo={setGo} key={index} cells={cells} setCells={setCells} winner={winner} winningIndices={winningIndices} />
        ))}
      </div>
      <ResultRow player1={player1} player2={player2} draw={draw} ></ResultRow>
    </div>
  );
}
