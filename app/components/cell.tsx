import { Dispatch, SetStateAction } from "react";
import React from 'react';
import { Icon } from '@iconify/react';

type CellProps = {
    id: number;
    go: string;
    cells: string[];
    roomPlayerOne: string;
    winner: string;
    winningIndices: number[];
    handleCellClick: (index: number) => void;
}

function Cell({ id, go, cells, roomPlayerOne, winner, winningIndices, handleCellClick }: CellProps) {
    const isWinningCell = winningIndices.includes(id);
    const cellStyle = isWinningCell ? (winner === "circle" ? "p1w" : "p2w") : "";

    const handleClick = () => {
        if (winner === "" || winner === "Draw!") {
            const isTaken = !!cells[id];
            if (!isTaken) {
                //console.log("roomplayerone: " + roomPlayerOne + " cells-id : " + cells[id]);
                //console.log("Cell clicked:", id);
                handleCellClick(id); // Call the function to handle the click
            }
        }
    };

    return (
        <div
            className={`square ${cells[id] === roomPlayerOne ? "circle" : "cross"} ${cellStyle}`}
            onClick={handleClick}
        >
            {cells[id] && (
                <>
                    {(() => {
                        if (cells[id] === "circle" || cells[id] === roomPlayerOne) {
                            return <Icon className="c" icon="material-symbols:circle-outline" />;
                        } else if (cells[id] === "cross" || cells[id] !== "") {
                            return <Icon className="x" icon="maki:cross" />;
                        }


                        return null; // Return null if none of the conditions are met
                    })()}
                </>
            )}
        </div>
    );
}

export default Cell;
