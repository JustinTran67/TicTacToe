import Scorelist from './components/Scorelist';
import Game from './components/Game';
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
        <div className = "main-game">
          <h1>TicTacToe</h1>
          <Game />
        </div>
        <div className = "score-list-from-backend">
          <Scorelist />
        </div>
      </body>
    </html>
  );
}
