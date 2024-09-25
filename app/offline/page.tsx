"use client";
import Cell from "../components/cell";
import { useEffect, useState } from "react";
import ResultRow from "../components/resultRow";
import { Icon } from "@iconify/react/dist/iconify.js";

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
        let turnOn: string;
        if (winner == "Draw!") {
            //console.log("go value : " + go);
            turnOn = go;
        }
        else {
            turnOn = winner;
        }
        setGo(turnOn);
        //setGo(winner);
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
    const handleCellClick = (index: number) => {
        if (cells[index] === "" && !winner) {
            const newCells = [...cells];
            newCells[index] = go;
            setCells(newCells);
            setGo(go === "circle" ? "cross" : "circle");
        }
    };

    return (
        <div className="container">
            <div className="message">
                {winner !== "" ? (
                    winner === "Draw!" ? (
                        "Draw!"
                    ) : (
                        <>Player <span className={winner === "circle" ? "circle" : "cross"}>{winner}</span> wins!</>
                    )
                ) : ""}

                {winner && winner !== "" && (
                    <button className="reset-btn" onClick={reset_the_variables}>
                        Reset
                    </button>
                )}
            </div>
            <div className="toggle-turn">
                <div className={`${go === "circle" ? "circle" : ""}`}><Icon className="" icon="material-symbols:circle-outline" /></div>
                <div className={`${go === "cross" ? "cross" : ""}`}><Icon className="" icon="maki:cross" /></div>
            </div>
            <div className="gameboard">
                {cells.map((cell, index) => (
                    <Cell
                        //key={index}
                        id={index}
                        go={go}
                        //setGo={setGo}
                        cells={cells}
                        //setCells={setCells}
                        roomPlayerOne={"circle"}

                        winner={winner}
                        winningIndices={winningIndices}
                        handleCellClick={handleCellClick}
                    />
                ))}
            </div>
            <ResultRow player1={player1} player2={player2} draw={draw} ></ResultRow>
        </div>
    );
}