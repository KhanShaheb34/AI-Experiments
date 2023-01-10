import p5 from 'p5';

export type GridState =
  | 'empty'
  | 'filled'
  | 'wall'
  | 'start'
  | 'end'
  | 'visited'
  | 'path'
  | 'current';

export type Grid = {
  state: GridState;
  i: number;
  j: number;
  draw: (p5: p5) => void;
};
