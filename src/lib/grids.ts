import P5 from 'p5';
import { GridState } from '../types/grid';

export class Grid {
  public state: GridState;
  public i: number;
  public j: number;
  public f: number;
  public g: number;
  public h: number;

  constructor(state: GridState, i: number, j: number) {
    this.state = state;
    this.i = i;
    this.j = j;
    this.f = Infinity;
    this.g = Infinity;
    this.h = 0;
  }

  public draw(p5: P5, gridSize: number) {
    const { i, j, state } = this;
    const x = j * gridSize;
    const y = i * gridSize;

    if (state === 'empty') p5.fill('#f5ebe0');
    else if (state === 'wall') p5.fill('#001219');
    else if (state === 'start') p5.fill('#ee9b00');
    else if (state === 'end') p5.fill('#9b2226');
    else if (state === 'visited') p5.fill('#94d2bd');
    else if (state === 'path') p5.fill('#cdb4db');
    else if (state === 'current') p5.fill('#005f73');

    p5.stroke(255);
    p5.rect(x, y, gridSize, gridSize);
  }

  public changeState(state: GridState) {
    this.state = state;
  }

  public getNeighbors = (grids: Grid[][]) => {
    const { i, j } = this;
    const neighbors: Grid[] = [];
    if (i > 0) neighbors.push(grids[i - 1][j]);
    if (i < grids.length - 1) neighbors.push(grids[i + 1][j]);
    if (j > 0) neighbors.push(grids[i][j - 1]);
    if (j < grids.length - 1) neighbors.push(grids[i][j + 1]);
    // corner grids
    // if (i > 0 && j > 0) neighbors.push(grids[i - 1][j - 1]);
    // if (i > 0 && j < grids.length - 1) neighbors.push(grids[i - 1][j + 1]);
    // if (i < grids.length - 1 && j > 0) neighbors.push(grids[i + 1][j - 1]);
    // if (i < grids.length - 1 && j < grids.length - 1)
    //   neighbors.push(grids[i + 1][j + 1]);

    return neighbors;
  };
}
