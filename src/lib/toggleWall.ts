import P5 from 'p5';
import { Display } from '../display';

export const toggleWall = (p5: P5, display: Display, gridSize: number) => {
  const j = Math.floor(p5.mouseX / gridSize);
  const i = Math.floor(p5.mouseY / gridSize);

  if (display.get(i, j).state === 'empty') display.put(i, j, 'wall');
  else if (display.get(i, j).state === 'wall') display.put(i, j, 'empty');
};
