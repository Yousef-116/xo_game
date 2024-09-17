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
}

function Cell({ id, go, setGo, cells, setCells, winner }: CellProps) {
    return (
        <div className={`square ${cells[id]}`} onClick={(e: any) => {
            if (winner === "" || winner === "Draw!") {
                const isTaken = !!cells[id];
                console.log(id);
                if (!isTaken) {
                    const newCells = [...cells]; // Create a new array
                    newCells[id] = go; // Update the new array
                    setCells(newCells); // Set the new array in state

                    if (go === "circle") {
                        setGo("cross");
                    } else if (go === "cross") {
                        setGo("circle");
                    }
                }
            }
        }} >
            {cells[id] ? (cells[id] === "circle" ? <Icon className="c" icon="material-symbols:circle-outline" /> : <Icon className="x" icon="maki:cross" />) : null}
        </div>
    );
}

export default Cell;
