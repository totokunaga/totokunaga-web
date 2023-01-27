import { MinHeap } from "@utils/data-structure/MinHeap";
import { COLS, ROWS } from "../constants";
import { isValidCell } from "../functions";
import { CellInfo, Coordinate } from "../types";

type WeightedCoordinate = [CellInfo, number];
const weightedCoordinateLessThan = (
  one: WeightedCoordinate,
  two: WeightedCoordinate
) => {
  return one[1] < two[1];
};

export const aStar = (
  grid: number[][],
  start: [number, number],
  end: [number, number]
) => {
  const heap = new MinHeap<WeightedCoordinate>(
    [[[...start, null], 0]],
    weightedCoordinateLessThan
  );
  const visited = Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => false)
  );
  const visitedCells: CellInfo[] = [];

  while (heap.size() > 0) {
    const [cell] = heap.pop() as WeightedCoordinate;
    const [r, c, prev] = cell;
    if (visited[r][c]) {
      continue;
    }

    visitedCells.push([r, c, prev]);
    visited[r][c] = true;
    if (r === end[0] && c === end[1]) {
      return visitedCells;
    }

    for (let i = 0; i < ROWS.length; i++) {
      const nextRow = r + ROWS[i];
      const nextCol = c + COLS[i];
      if (isValidCell(grid, visited, nextRow, nextCol)) {
        const nextWeight = heuristic(nextRow, nextCol, end);
        const nextCell: WeightedCoordinate = [
          [nextRow, nextCol, [r, c]],
          nextWeight,
        ];
        heap.push(nextCell);
      }
    }
  }

  return visitedCells;
};

const heuristic = (r: number, c: number, end: Coordinate) => {
  const rDiff = Math.abs(r - end[0]);
  const cDiff = Math.abs(c - end[1]);
  return Math.sqrt(rDiff ** 2 + cDiff ** 2);
};
