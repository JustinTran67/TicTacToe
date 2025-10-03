import React, {useState} from 'react';
import Gameboard from './Gameboard';

export default function Board() {
    const[xTurn, setXTurn] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        if (xTurn) {
            status = "Turn: X";
        } else {
            status = "Turn: O";
        }
    }

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xTurn) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        setSquares(nextSquares);
        setXTurn(!xTurn);
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const[a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
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
            <div>
                <p>{status}</p>
            </div>
        </div>
    );
}