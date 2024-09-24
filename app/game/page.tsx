"use client";
import { useEffect, useState } from "react";
import ResultRow from "../components/resultRow";
import Cell from "../components/cell";
import { useRouter } from 'next/navigation';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { initializeApp } from "firebase/app";
import { useSearchParams } from "next/navigation";
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

export default function Home() { // Get roomId from params
    const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
    const [go, setGo] = useState("circle");
    const [winner, setWinner] = useState(""); // Use state for winner
    const [player1, setPlayer1] = useState(0);
    const [player2, setPlayer2] = useState(0);
    const [draw, setDraw] = useState(0);
    const [winningIndices, setWinningIndices] = useState<number[]>([]);

    const db = getDatabase();
    const searchParams = useSearchParams();
    const roomId = searchParams.get("roomId");
    const playerOne = searchParams.get("playerOne") || "circle"; // Default to empty string
    const playerTwo = searchParams.get("playerTwo") || "cross";

    const [roomPlayerOne, setRoomPlayerOne] = useState("");
    const [roomPlayerTwo, setRoomPlayerTwo] = useState("");

    useEffect(() => {
        const roomRef = ref(db, `rooms/${roomId}`);

        // Fetch room data
        const unsubscribe = onValue(roomRef, (snapshot) => {
            const room = snapshot.val();
            if (room) {
                setCells(room.board);
                setGo(room.turn);
                const currentRoomPlayerOne = room.players.playerOne; // Store temporarily
                const currentRoomPlayerTwo = room.players.playerTwo; // Store temporarily
                setRoomPlayerOne(currentRoomPlayerOne);
                setRoomPlayerTwo(currentRoomPlayerTwo);
                checkWinner(room.board, currentRoomPlayerOne, currentRoomPlayerTwo); // Pass players to checkWinner
            }
        });

        // Cleanup listener on unmount
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [db, roomId]);

    // useEffect(() => {
    //     console.log("Updated roomPlayerOne: ", roomPlayerOne);
    //     console.log("Updated roomPlayerTwo: ", roomPlayerTwo);
    // }, [roomPlayerOne]);



    async function reset_the_variables() {
        setCells(["", "", "", "", "", "", "", "", ""]);
        let turnOn = "";
        if (winner == "Draw!") {
            console.log("go value : " + go);
            turnOn = go;
        }
        else {
            turnOn = winner;
        }
        setGo(turnOn);
        setWinner("");
        setWinningIndices([]);
        const roomRef = ref(db, `rooms/${roomId}`);
        await update(roomRef, {
            board: ["", "", "", "", "", "", "", "", ""],
            turn: turnOn,
            //Reset: 0, // Reset flag to 0 after resetting
        });
    }

    const handleCellClick = (index: number) => {
        if (cells[index] === "" && !winner && go == playerOne) {
            const newCells = [...cells];
            newCells[index] = go;
            setCells(newCells);
            const roomRef = ref(db, `rooms/${roomId}`);
            update(roomRef, {
                board: newCells,
                turn: go === roomPlayerOne ? roomPlayerTwo : roomPlayerOne // Toggle turn
            })
                .then(() => {
                    //console.log("Board and turn updated in Firebase");
                })
                .catch((error) => {
                    console.error("Error updating Firebase: ", error);
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
            //console.log("Winner detected: " + currentWinner, " winner : ", winner, " p1 : " + currentRoomPlayerOne + " p2 : " + currentRoomPlayerTwo);

            if (currentWinner === currentRoomPlayerOne) {
                setPlayer1(prev => prev + 1);
                //console.log("Player One wins: " + currentRoomPlayerOne);
            } else if (currentWinner === currentRoomPlayerTwo) {
                setPlayer2(prev => prev + 1);
                //console.log("Player Two wins: " + currentRoomPlayerTwo);
            }
        } else if (newCells.every(cell => cell !== "") && winner === "") {
            currentWinner = "Draw";
            setWinner("Draw!");
            setDraw(prev => prev + 1);
        }
        //console.log("winnnerrrrr : ", winner, winner.length)
        if (currentWinner == "") {
            setWinningIndices([]);
            setWinner("");
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
                    <Cell
                        //key={index}
                        id={index}
                        go={go}
                        //setGo={setGo}
                        cells={cells}
                        //setCells={setCells}
                        roomPlayerOne={roomPlayerOne}

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
