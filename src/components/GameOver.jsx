export default function GameOver({winner, drawGame}) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {drawGame ? <p>It's a draw!</p> : <p>{winner} won!</p>}
      <button>Start Over</button>
    </div>
  )
}