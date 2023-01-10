import P5 from 'p5';

export type Player = 'X' | 'O';
export type BoxType = '' | Player;

export class Board {
  private board: BoxType[][];

  constructor() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }

  public makeMove(i: number, j: number, player: BoxType) {
    if (this.board[i][j] === '') {
      this.board[i][j] = player;
    }
  }

  public checkWin = () => {
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] !== '' &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2]
      )
        return this.board[i][0];
    }

    for (let j = 0; j < 3; j++) {
      if (
        this.board[0][j] !== '' &&
        this.board[0][j] === this.board[1][j] &&
        this.board[1][j] === this.board[2][j]
      )
        return this.board[0][j];
    }

    if (
      this.board[0][0] !== '' &&
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]
    )
      return this.board[0][0];

    if (
      this.board[2][0] !== '' &&
      this.board[2][0] === this.board[1][1] &&
      this.board[1][1] === this.board[0][2]
    )
      return this.board[2][0];

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) if (this.board[i][j] === '') return null;

    return 'T';
  };

  public get(i: number, j: number) {
    return this.board[i][j];
  }

  public copy = () => {
    const newBoard = new Board();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        newBoard.makeMove(i, j, this.board[i][j]);
      }
    }
    return newBoard;
  };

  public draw(p5: P5, windowWidth: number) {
    const boxSize = windowWidth / 3;
    p5.stroke('#005f73');
    p5.strokeWeight(2);
    p5.line(boxSize, 0, boxSize, windowWidth);
    p5.line(boxSize * 2, 0, boxSize * 2, windowWidth);
    p5.line(0, boxSize, windowWidth, boxSize);
    p5.line(0, boxSize * 2, windowWidth, boxSize * 2);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const x = boxSize * i + boxSize / 2;
        const y = boxSize * j + boxSize / 2;
        const spot = this.board[i][j];
        p5.textSize(32);
        let r = boxSize / 4;
        if (spot === 'X') {
          p5.line(x - r, y - r, x + r, y + r);
          p5.line(x + r, y - r, x - r, y + r);
        } else if (spot === 'O') {
          p5.noFill();
          p5.ellipse(x, y, r * 2);
        }
      }
    }
  }
}
