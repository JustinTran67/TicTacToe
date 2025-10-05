import React, { useState, useEffect } from 'react';

function Gameboard({ value, onSquareClick }) {

    return (
        <button className="gameSquare" onMouseOver={hover} onMouseOut={normal} onClick={onSquareClick}>{value}</button>
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

    const winner = calculateWinner(squares); //Find a way to handle ties.
    let status;
    if (winner) {
        if (winner === "Draw") {
            status = "It's a Draw!";
        } else {
            status = "Winner: " + winner;
        }
    } else {
        if (xTurn) {
            status = "Turn: X";
        } else {
            status = "Turn: O";
        }
    }

    useEffect(() => {
        if (winner) {
            handleWin(winner);
        }
    }, [winner]);


    
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
    const[history, setHistory] = useState([Array(9).fill(null)]);
    const[currentMove, setCurrentMove] = useState(0);
    const xTurn = (currentMove % 2) === 0;
    const currentSquares = history[currentMove];
    

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length -1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = "Go to move #" + move;
        } else {
            description = "Go to game start";
        }
        return (
            <li key={move}>
                <button className="jumpTo" onMouseOver={hover} onMouseOut={normal} onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    });

    return (
        <div>
            <div className="game-board">
                <Board xTurn={xTurn} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

function handleWin(winner) { // 10/4/25: Create a way to input custom names.
    let winOrTie = "Win";
    let loseOrTie = "Lose";
    if (winner === "Draw") {
        winOrTie = "Draw";
        loseOrTie = "Draw";
    }
    
    const winScoreData = {
        player: winner,
        result: winOrTie,
    }
    const loseScoreData = {
        player: (winner === "X") ? "O" : "X",
        result: loseOrTie,
    }

    postScore(winScoreData);
    postScore(loseScoreData);
}

function postScore(scoreData) {
    fetch('http://localhost:8000/api/scores/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
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
    if (squares.every(square => square !== null)) {
        return "Draw";
    }
    return null;
}

function hover(thisButton) {
    thisButton.target.style.backgroundColor = "#FFAC1C";
}
function normal(thisButton) {
    thisButton.target.style.backgroundColor = "#FFBF00";
}