import P5 from 'p5';
import { Board, Player } from '../lib/board';

let W = Math.min(window.innerWidth, window.innerHeight) * 0.7;
let BOX_SIZE = W / 3;
let board: Board;
let player: Player;
let gameOver = false;

const resetButton = document.getElementById('reset')!;
const playerInfo = document.getElementById('player')!;
resetButton.addEventListener('click', () => {
  gameOver = false;
  board = new Board();
  player = 'X';
  playerInfo.innerHTML = `Player: ${player}`;
});

window.addEventListener('resize', () => {
  W = Math.min(window.innerWidth, window.innerHeight) * 0.7;
  BOX_SIZE = W / 3;
});

const sketch = (p5: P5) => {
  p5.setup = () => {
    p5.createCanvas(W, W);
    board = new Board();
    player = 'X';
  };

  p5.draw = () => {
    p5.background('#f5ebe0');
    board.draw(p5, W);
  };

  p5.windowResized = () => p5.resizeCanvas(W, W);
  p5.mousePressed = () => {
    if (gameOver) return;

    const i = Math.floor(p5.mouseX / BOX_SIZE);
    const j = Math.floor(p5.mouseY / BOX_SIZE);

    if (i < 3 && i >= 0 && j < 3 && j >= 0 && board.get(i, j) === '') {
      board.makeMove(i, j, player);
      player = player === 'X' ? 'O' : 'X';

      playerInfo.innerHTML = `Player: ${player}`;

      const winner = board.checkWin();
      if (winner) {
        gameOver = true;
        playerInfo.innerHTML = `Winner: ${winner}`;
      }
    }
  };
};

new P5(sketch, document.getElementById('canvas')!);
