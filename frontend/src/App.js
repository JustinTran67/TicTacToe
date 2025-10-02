import React, { useState } from 'react';
import Scorelist from './components/Scorelist';
import Board from './components/Board';
import Gameboard from './components/Gameboard'; // might delete later if not needed
import './App.css';

export default function App() {

  return (
    <html>
      <title>
        TicTacToe
      </title>
      <head>
        <link rel="stylesheet" href="App.css" />
      </head>
      <body>
        <div>
          <h1>TicTacToe</h1>
          <Board />
        </div>
        <div>
          <Scorelist />
        </div>
      </body>
    </html>
  );
}
