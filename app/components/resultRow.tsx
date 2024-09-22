import { Icon } from '@iconify/react';
import React from 'react';

type CellProps = {
    player1: number;
    player2: number;
    draw: number;
}

function ResultRow({ player1, player2, draw }: CellProps) {
    return (
        <div className="result-row gameboard">
            <div className="p1"><Icon className="" icon="material-symbols:circle-outline" /> <div>{player1}</div> </div>
            <div className="draw"><Icon className='' icon="f7:infinite" /> <div>{draw}</div></div>
            <div className="p2"><Icon className="x" icon="maki:cross" /><div>{player2}</div></div>
        </div>
    );
}

export default ResultRow;