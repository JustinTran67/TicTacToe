import React, { useState, useEffect } from 'react';

function Gameboard({ value, onSquareClick }) {

    return (
        <button className="gameSquare" onClick={onSquareClick}>{value}</button>
    );
}

function Board({xTurn, squares, onPlay, player1, player2}) {

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
    const winPlayer = (winner === "X") ? player1 : player2;
    const result = (winPlayer) ? winPlayer : winner ;
    let status;
    if (winner) {
        if (winner === "Draw") {
            status = "It's a Draw!";
        } else {
            status = "Winner: " + result;
        }
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
    const[history, setHistory] = useState([Array(9).fill(null)]);
    const[currentMove, setCurrentMove] = useState(0);
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");

    const xTurn = (currentMove % 2) === 0;
    const currentSquares = history[currentMove];
    

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length -1);
    }

    useEffect(() => {
        const winner = calculateWinner(currentSquares);
        if (winner) {
            handleWin(winner, player1, player2);
        }
    }, [currentSquares]);

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
                <button className="jumpTo" onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    });

    return ( 
        <div>
            <div>
                <label htmlFor="player1" className="player1"></label>
                    <input type="text" id="player1" name = 'player1' placeholder='Enter Player "X" Name' value={player1} onChange={(e) => setPlayer1(e.target.value)} />
                <label htmlFor="player2" className="player2"></label>
                    <input type="text" id="player2" name = 'player2' placeholder='Enter Player "O" Name' value={player2} onChange={(e) => setPlayer2(e.target.value)} />
            </div>
            <div className="game-board">
                <Board xTurn={xTurn} squares={currentSquares} onPlay={handlePlay} player1={player1} player2={player2} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

function handleWin(winner, player1, player2) {
    const winPlayer = (winner === "X") ? player1 : player2;
    const losePlayer = (winner === "X") ? player2 : player1;
    const loseAlt = (winner === "X" ? "O" : "X");

    const winOrTie = (winner === "Draw") ? "Draw" : "Win";
    const loseOrTie = (winner === "Draw") ? "Draw" : "Lose";

    const winAlt = (winner === "Draw") ? "O" : winner; //built for tie cases.
    
    
    const winScoreData = {
        player: winPlayer || winAlt,
        result: winOrTie,
    }
    const loseScoreData = {
        player: losePlayer || loseAlt,
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