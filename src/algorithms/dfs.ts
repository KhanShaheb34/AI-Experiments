import { Display } from '../lib/display';
import { Grid } from '../lib/grids';
import { toggleWall } from '../lib/toggleWall';
import P5 from 'p5';

let W = Math.min(window.innerWidth, window.innerHeight) * 0.7;
let RESOLUTION = 40;
let GRID_SIZE = W / RESOLUTION;
const START = [0, 0];
const END = [RESOLUTION - 1, RESOLUTION - 1];
let started = false;
let done = false;

const startButton = document.getElementById('start')!;
startButton.addEventListener('click', () => {
  if (done) window.location.reload();

  started = !started;
  startButton.innerHTML = started ? 'Pause' : 'Start';
});

window.addEventListener('resize', () => {
  W = Math.min(window.innerWidth, window.innerHeight) * 0.7;
  GRID_SIZE = W / RESOLUTION;
});

const sketch = (p5: P5) => {
  let display: Display;
  let start: Grid;
  let end: Grid;
  let openSet: Grid[] = [];
  let closedSet: Grid[] = [];
  let cameFrom: Map<Grid, Grid> = new Map();
  let current: Grid;

  p5.setup = () => {
    p5.createCanvas(W, W);
    display = new Display(RESOLUTION, GRID_SIZE);
    display.put(START[0], START[1], 'start');
    display.put(END[0], END[1], 'end');
    display.setRandomWall(RESOLUTION * 3);
    display.calculateHeuristics(display.get(END[0], END[1]));
    start = display.get(START[0], START[1]);
    end = display.get(END[0], END[1]);
    openSet.push(start);
  };

  p5.draw = () => {
    if (started) {
      if (openSet.length > 0 && !done) {
        current = openSet.pop()!;
        if (current.state === 'empty') current.changeState('current');
        closedSet.push(current);

        if (current === end) {
          console.log('DONE!');
          let temp = current;

          while (temp) {
            if (temp.state !== 'start' && temp.state !== 'end')
              display.changeState(temp, 'path');
            temp = cameFrom.get(temp)!;
          }

          done = true;
        }

        const neighbors = current.getNeighbors(display.grids);
        for (const neighbor of neighbors) {
          if (closedSet.includes(neighbor)) continue;
          if (neighbor.state === 'wall') continue;
          if (!openSet.includes(neighbor)) {
            cameFrom.set(neighbor, current);
            openSet.push(neighbor);
          }
        }
      } else {
        console.log('No solution');
        done = true;
      }
    }

    p5.background(255);
    display.draw(p5);
    if (started && current.state !== 'start' && current.state !== 'end')
      current.changeState('visited');
    if (done) startButton.innerHTML = 'Restart';
  };

  p5.windowResized = () => p5.resizeCanvas(W, W);
  p5.mousePressed = () => toggleWall(p5, display, GRID_SIZE);
};

new P5(sketch, document.getElementById('canvas')!);
