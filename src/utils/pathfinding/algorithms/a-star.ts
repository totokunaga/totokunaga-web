import Coordinate from "@utils/classes/Coordinate";
import { MinHeap } from "@utils/data-structure/MinHeap";
import { initMatrix } from "@utils/functions";
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

  const rowSize = grid.length;
  const colSize = grid[0].length;
  const visitedCells: CellInfo[] = [];
  const prevs: (Coordinate | null)[][] = initMatrix(rowSize, colSize, null);
  const distances: number[][] = initMatrix(rowSize, colSize, Infinity);
  distances[start.row][start.col] = 0;

  while (heap.size() > 0) {
    const [cell] = heap.pop() as WeightedCoordinate;
    const [coordinate, prev] = cell;
    const { row, col } = coordinate;
    if (prevs[row][col]) {
      continue;
    }

    visitedCells.push([coordinate, prev]);
    prevs[row][col] = prev || start;
    if (coordinate.isEqual(end)) {
      return [visitedCells, prevs];
    }

    const potentialDistanceFromStart = distances[row][col] + 1;
    for (let i = 0; i < ROWS.length; i++) {
      const nextRow = row + ROWS[i];
      const nextCol = col + COLS[i];
      const adjCoordinate = new Coordinate(nextRow, nextCol, grid);
      const adjDistanceFromStart = distances[nextRow][nextCol];

      if (
        potentialDistanceFromStart <= adjDistanceFromStart &&
        isValidCell(grid, prevs, adjCoordinate)
      ) {
        distances[nextRow][nextCol] = potentialDistanceFromStart;
        const nextWeight =
          potentialDistanceFromStart +
          adjCoordinate.getManhattanDistanceFrom(end);
        const nextCell: WeightedCoordinate = [
          [adjCoordinate, coordinate],
          nextWeight,
        ];
        heap.push(nextCell);
      }
    }
  }

  return [visitedCells, prevs];
};
