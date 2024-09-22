import { Dispatch, SetStateAction } from "react";
import React from 'react';
import { Icon } from '@iconify/react';

type CellProps = {
    go: string;
    setGo: Dispatch<SetStateAction<string>>;
    id: number;
    cells: string[];
    setCells: Dispatch<SetStateAction<string[]>>;
    winner: string;
    winningIndices: number[]; // Changed to number[] based on your previous setup
}

function Cell({ id, go, setGo, cells, setCells, winner, winningIndices }: CellProps) {
    const isWinningCell = winningIndices.includes(id);
    const cellStyle = isWinningCell ? ( winner === "circle" ? "p1w" : "p2w" ) : "";

    return (
        <div
            className={`square ${cells[id]} ${cellStyle}`}
            //style={cellStyle}
            onClick={() => {
                if (winner === "" || winner === "Draw!") {
                    const isTaken = !!cells[id];
                    if (!isTaken) {
                        const newCells = [...cells]; // Create a new array
                        newCells[id] = go; // Update the new array
                        setCells(newCells); // Set the new array in state

                        setGo(go === "circle" ? "cross" : "circle"); // Toggle between players
                        console.log(winningIndices);
                    }
                }
            }}
        >
            {cells[id] ? (
                cells[id] === "circle" ? (
                    <Icon className="c" icon="material-symbols:circle-outline" />
                ) : cells[id] === "cross" ? (
                    <Icon className="x" icon="maki:cross" />
                ) : cells[id] === "circlewin" ? (
                    <div className="circle-win">Circle Wins!</div>
                ) : cells[id] === "crosswin" ? (
                    <div className="cross-win">Cross Wins!</div>
                ) : null
            ) : null}
        </div>
    );
}

export default Cell;