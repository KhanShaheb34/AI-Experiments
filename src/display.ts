import P5 from 'p5';
import { Grid } from './grids';
import { GridState } from './types/grid';

export class Display {
  public grids: Grid[][];
  public resolution: number;
  public gridSize: number;

  constructor(resolution: number, gridSize: number) {
    this.resolution = resolution;
    this.gridSize = gridSize;
    this.grids = this.createEmptyGrids();
  }

  private createEmptyGrids() {
    const grids: Grid[][] = [];
    for (let i = 0; i < this.resolution; i++) {
      grids[i] = [];
      for (let j = 0; j < this.resolution; j++) {
        grids[i][j] = new Grid('empty', i, j);
      }
    }
    return grids;
  }

  public draw(p5: P5) {
    for (const row of this.grids) {
      for (const grid of row) {
        grid.draw(p5, this.gridSize);
      }
    }
  }

  public changeState(grid: Grid, state: GridState) {
    this.grids[grid.i][grid.j].changeState(state);
  }

  public put(i: number, j: number, state: GridState) {
    this.grids[i][j].changeState(state);
  }

  public get(i: number, j: number) {
    return this.grids[i][j];
  }

  public setRandomWall(randomWallCount: number) {
    for (let i = 0; i < randomWallCount; i++) {
      const randomI = Math.floor(Math.random() * this.resolution);
      const randomJ = Math.floor(Math.random() * this.resolution);
      if (this.grids[randomI][randomJ].state === 'empty')
        this.grids[randomI][randomJ].changeState('wall');
    }
  }

  public calculateHeuristics = (endGrid: Grid) => {
    this.grids.forEach((row) => {
      row.forEach((grid) => {
        grid.h = Math.abs(grid.i - endGrid.i) + Math.abs(grid.j - endGrid.j);
      });
    });
  };

  public reset = () => {
    this.grids = this.createEmptyGrids();
  };
}
