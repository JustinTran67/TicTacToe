import React, { useState } from 'react';

function Gameboard({ value, onSquareClick }) {
    
    function hover(thisButton) {
        thisButton.target.style.backgroundColor = "grey";
    }
    function normal(thisButton) {
        thisButton.target.style.backgroundColor = "lightgrey";
    }

    return (
        <button onMouseOver={hover} onMouseOut={normal} onClick={onSquareClick}>{value}</button>
    );
}

function Board({xTurn, squares, onPlay}) {

    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xTurn) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

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
                <p className="status">{status}</p>
            </div>
        </div>
    );
}

export default function Game() {
    const[xTurn, setXTurn] = useState(true);
    const[history, setHistory] = useState([Array(9).fill(null)]);
    const currentSquares = history[history.length-1];

    function handlePlay(nextSquares) {
        setHistory([...history, nextSquares]);
        setXTurn(!xTurn);
    }

    return (
        <div>
            <div className="game-board">
                <Board xTurn={xTurn} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{}</ol>
            </div>
        </div>
    )
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