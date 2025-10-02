import React, {useState} from 'react';
import Gameboard from './Gameboard';

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick() {
        const nextSquares = squares.slice();
        nextSquares[0] = "X";
        setSquares(nextSquares);
    }
    
    return (
        <div>
            <div className="board-row">
                <Gameboard value={squares[0]} onSquareClick={handleClick} />
                <Gameboard value={squares[1]}/>
                <Gameboard value={squares[2]}/>
            </div>
            <div className="board-row">
                <Gameboard value={squares[3]}/>
                <Gameboard value={squares[4]}/>
                <Gameboard value={squares[5]}/>
            </div>
            <div className="board-row">
                <Gameboard value={squares[6]}/>
                <Gameboard value={squares[7]}/>
                <Gameboard value={squares[8]}/>
            </div>
        </div>
    );
}