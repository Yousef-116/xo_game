"use client";
import { useEffect, useState, Suspense } from "react";
import ResultRow from "../components/resultRow";
import Cell from "../components/cell";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { initializeApp } from "firebase/app";
import { useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQJQpmKp-Ffkz9To51pA9ZxD_7oC3zN38",
    authDomain: "xo-game-ae7b9.firebaseapp.com",
    projectId: "xo-game-ae7b9",
    storageBucket: "xo-game-ae7b9.appspot.com",
    messagingSenderId: "418879005181",
    appId: "1:418879005181:web:5893d95d07bc3b751bb994",
    measurementId: "G-8NX5EMW78T",
    databaseURL: "https://xo-game-ae7b9-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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

function GameComponent() {
    const [cells, setCells] = useState(Array(9).fill(""));
    const [go, setGo] = useState("circle");
    const [winner, setWinner] = useState("");
    const [player1, setPlayer1] = useState(0);
    const [player2, setPlayer2] = useState(0);
    const [draw, setDraw] = useState(0);
    const [winningIndices, setWinningIndices] = useState<number[]>([]);

    const searchParams = useSearchParams();
    const roomId = searchParams.get("roomId");
    const playerOne = searchParams.get("playerOne") || "circle";
    const playerTwo = searchParams.get("playerTwo") || "cross";

    const [roomPlayerOne, setRoomPlayerOne] = useState("");
    const [roomPlayerTwo, setRoomPlayerTwo] = useState("");

    useEffect(() => {
        const roomRef = ref(db, `rooms/${roomId}`);

        const unsubscribe = onValue(roomRef, (snapshot) => {
            const room = snapshot.val();
            if (room) {
                setCells(room.board);
                setGo(room.turn);
                setRoomPlayerOne(room.players.playerOne);
                setRoomPlayerTwo(room.players.playerTwo);
                checkWinner(room.board, room.players.playerOne, room.players.playerTwo);
            }
        });

        return () => unsubscribe();
    }, [db, roomId]);

    const resetVariables = async () => {
        setCells(Array(9).fill(""));
        let turnOn = winner === "Draw!" ? go : winner;
        setGo(turnOn);
        setWinner("");
        setWinningIndices([]);
        const roomRef = ref(db, `rooms/${roomId}`);
        await update(roomRef, { board: Array(9).fill(""), turn: turnOn });
    };

    const handleCellClick = (index: number) => {
        if (cells[index] === "" && !winner && go === playerOne) {
            const newCells = [...cells];
            newCells[index] = go;
            setCells(newCells);
            const roomRef = ref(db, `rooms/${roomId}`);
            update(roomRef, {
                board: newCells,
                turn: go === roomPlayerOne ? roomPlayerTwo : roomPlayerOne
            });

            setGo(go === roomPlayerOne ? roomPlayerTwo : roomPlayerOne);
        }
    };

    const checkWinner = (newCells: string[], currentRoomPlayerOne: string, currentRoomPlayerTwo: string) => {
        let currentWinner = "";
        winningCombos.forEach(combo => {
            if (
                newCells[combo[0]] === newCells[combo[1]] &&
                newCells[combo[1]] === newCells[combo[2]] &&
                newCells[combo[0]] !== ""
            ) {
                currentWinner = newCells[combo[0]];
                setWinningIndices(combo);
            }
        });

        if (currentWinner) {
            setWinner(currentWinner);
            if (currentWinner === currentRoomPlayerOne) {
                setPlayer1(prev => prev + 1);
            } else if (currentWinner === currentRoomPlayerTwo) {
                setPlayer2(prev => prev + 1);
            }
        } else if (newCells.every(cell => cell !== "") && winner === "") {
            currentWinner = "Draw";
            setWinner("Draw!");
            setDraw(prev => prev + 1);
        }
        if (currentWinner === "") {
            setWinningIndices([]);
            setWinner("");
        }
    };

    return (
        <div className="container">
            <div className="message">
                {winner ? (winner === "Draw!" ? "Draw!" : <>Player <span className={winner === "circle" ? "circle" : "cross"}>{winner}</span> wins!</>) : `It's now ${go}'s turn`}
                {winner && (
                    <button className="reset-btn" onClick={resetVariables}>Reset</button>
                )}
            </div>
            <div className="toggle-turn">
                <div className={`${go === roomPlayerOne ? "circle" : ""}`}><Icon className="c" icon="material-symbols:circle-outline" /></div>
                <div className={`${go === roomPlayerTwo ? "cross" : ""}`}><Icon className="x" icon="maki:cross" /></div>
            </div>
            <div className="gameboard">
                {cells.map((cell, index) => (
                    <Cell
                        key={index}
                        id={index}
                        go={go}
                        cells={cells}
                        roomPlayerOne={roomPlayerOne}
                        winner={winner}
                        winningIndices={winningIndices}
                        handleCellClick={handleCellClick}
                    />
                ))}
            </div>
            <ResultRow player1={player1} player2={player2} draw={draw} />
        </div>
    );
}

export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GameComponent />
        </Suspense>
    );
}