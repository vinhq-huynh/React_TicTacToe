import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    return "O";
  }
  return "X";
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = initialGameBoard;
  let winner = null;
  let drawGame = false;

  // Deriving board state
  for (const turn of gameTurns) {
    // Destructuring turn object
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  // Check for winning conditions
  if (gameTurns.length > 4) {
    for (const combo of WINNING_COMBINATIONS) {
      const firstSymbol = gameBoard[combo[0].row][combo[0].column];
      const secondSymbol = gameBoard[combo[1].row][combo[1].column];
      const thirdSymbol = gameBoard[combo[2].row][combo[2].column];

      if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
        winner = firstSymbol;
      }
    }    
  }
  if (gameTurns.length === 9 && !winner) drawGame = true;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevGameTurns => {
      const playerSymbol = deriveActivePlayer(prevGameTurns); 

      // Update with the new turn (an object with square info and player info)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: playerSymbol }, ...prevGameTurns];
      return updatedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer === "X"} initialName="Player 1" symbol="X" />
          <Player isActive={activePlayer === "O"} initialName="Player 2" symbol="O" />
        </ol>
        {(winner || drawGame) && <GameOver winner={winner} drawGame={drawGame}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
