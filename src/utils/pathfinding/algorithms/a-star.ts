import Coordinate from "@utils/classes/Coordinate";
import { MinHeap } from "@utils/data-structure/MinHeap";
import { COLS, ROWS } from "../constants";
import { isValidCell } from "../functions";
import { CellInfo } from "../types";

type WeightedCoordinate = [CellInfo, number];
const weightedCoordinateLessThan = (
  one: WeightedCoordinate,
  two: WeightedCoordinate
) => {
  return one[1] < two[1];
};

export const aStar = (grid: number[][], start: Coordinate, end: Coordinate) => {
  const heap = new MinHeap<WeightedCoordinate>(
    [[[start, null], 0]],
    weightedCoordinateLessThan
  );
  const visited = Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => false)
  );
  const visitedCells: CellInfo[] = [];

  while (heap.size() > 0) {
    const [cell] = heap.pop() as WeightedCoordinate;
    const [coordinate, prev] = cell;
    const { row, col } = coordinate;
    if (visited[row][col]) {
      continue;
    }

    visitedCells.push([coordinate, prev]);
    visited[row][col] = true;
    if (coordinate.isEqual(end)) {
      return visitedCells;
    }

    for (let i = 0; i < ROWS.length; i++) {
      const nextRow = row + ROWS[i];
      const nextCol = col + COLS[i];
      const nextCoordinate = new Coordinate(nextRow, nextCol);
      if (isValidCell(grid, visited, nextCoordinate)) {
        const nextWeight = heuristic(nextCoordinate, end);
        const nextCell: WeightedCoordinate = [
          [nextCoordinate, coordinate],
          nextWeight,
        ];
        heap.push(nextCell);
      }
    }
  }

  return visitedCells;
};

const heuristic = (current: Coordinate, end: Coordinate) => {
  const rDiff = Math.abs(current.row - end.row);
  const cDiff = Math.abs(current.col - end.col);
  return Math.sqrt(rDiff ** 2 + cDiff ** 2);
};
