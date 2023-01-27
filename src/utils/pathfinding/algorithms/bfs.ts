import Coordinate from "@utils/classes/Coordinate";
import { COLS, ROWS } from "../constants";
import { isValidCell } from "../functions";
import { CellInfo } from "../types";

export const bfs = (grid: number[][], start: Coordinate, end: Coordinate) => {
  let q: CellInfo[] = [[start, null]];
  const visited = Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => false)
  );
  const visitedCells: CellInfo[] = [];

  visited[start.row][start.col] = true;

  while (q.length > 0) {
    const next: CellInfo[] = [];

    for (const [current, prev] of q) {
      const { row, col } = current;
      visitedCells.push([current, prev]);
      if (current.isEqual(end)) {
        return visitedCells;
      }

      for (let i = 0; i < ROWS.length; i++) {
        const nextRow = row + ROWS[i];
        const nextCol = col + COLS[i];
        const nextCoordinate = new Coordinate(nextRow, nextCol);
        if (isValidCell(grid, visited, nextCoordinate)) {
          visited[nextRow][nextCol] = true;
          next.push([nextCoordinate, current]);
        }
      }
    }

    q = next;
  }

  return visitedCells;
};
