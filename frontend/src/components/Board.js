import React, {useState} from 'react';
import Gameboard from './Gameboard';

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(i) {
        const nextSquares = squares.slice();
        nextSquares[i] = "X";
        setSquares(nextSquares);
    }
    
    return (
        <div>
            <div className="board-row">
                <Gameboard value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Gameboard value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Gameboard value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Gameboard value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Gameboard value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Gameboard value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Gameboard value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Gameboard value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Gameboard value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </div>
    );
}