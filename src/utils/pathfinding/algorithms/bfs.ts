import Coordinate from "@utils/classes/Coordinate";
import { COLS, ROWS } from "../constants";
import { isValidCell } from "../functions";
import { CellInfo } from "../types";

export const bfs = (grid: number[][], start: Coordinate, end: Coordinate) => {
  let q: CellInfo[] = [[start, null]];
  const prevs: (Coordinate | null)[][] = Array.from(
    { length: grid.length },
    () => Array.from({ length: grid[0].length }, () => null)
  );
  const visitedCells: CellInfo[] = [];

  prevs[start.row][start.col] = start;

  while (q.length > 0) {
    const next: CellInfo[] = [];

    for (const [current, prev] of q) {
      const { row, col } = current;
      visitedCells.push([current, prev]);
      if (current.isEqual(end)) {
        return [visitedCells, prevs];
      }

      for (let i = 0; i < ROWS.length; i++) {
        const nextRow = row + ROWS[i];
        const nextCol = col + COLS[i];
        const nextCoordinate = new Coordinate(nextRow, nextCol, grid);
        if (isValidCell(grid, prevs, nextCoordinate)) {
          prevs[nextRow][nextCol] = current;
          next.push([nextCoordinate, current]);
        }
      }
    }

    q = next;
  }

  return [visitedCells, prevs];
};
