import { Board } from './board';

export const minimax = (
  board: Board,
  depth: number,
  isMaximizingPlayer: boolean
) => {
  if (board.checkWin() === 'X') return 10;
  else if (board.checkWin() === 'O') return -100;
  else if (board.checkWin() === 'T') return 0;

  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (board.get(i, j) === '') {
          board.makeMove(i, j, 'X');
          let score = minimax(board.copy(), depth + 1, false);
          board.makeMove(i, j, '');
          bestScore = Math.max(score, bestScore);
        }

    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (board.get(i, j) === '') {
          board.makeMove(i, j, 'O');
          let score = minimax(board.copy(), depth + 1, true);
          board.makeMove(i, j, '');
          bestScore = Math.min(score, bestScore);
        }

    return bestScore;
  }
};

export const findBestMove = (board: Board) => {
  let bestScore = -Infinity;
  let move: [number, number] = [0, 0];
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (board.get(i, j) === '') {
        board.makeMove(i, j, 'X');
        let score = minimax(board.copy(), 0, false);
        board.makeMove(i, j, '');
        if (score > bestScore) {
          bestScore = score;
          move = [i, j];
        }
      }

  return move;
};
