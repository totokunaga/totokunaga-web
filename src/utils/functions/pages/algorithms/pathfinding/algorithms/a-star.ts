import Coordinate from "@utils/classes/Coordinate";
import Heap from "@utils/classes/Heap";
import { getPathfindingAnimation, initMatrix } from "@utils/functions";
import { COLS, ROWS } from "@utils/constants";
import { CellInfo, PathfindingAnimation, PathfindingArg } from "@utils/types";
import { isValidCell } from "./helper-functions";

type WeightedCoordinate = [CellInfo, number];
const isLessThan = (one: WeightedCoordinate, two: WeightedCoordinate) => {
  return one[1] < two[1];
};

export const aStar = ({
  grid,
  start,
  end,
}: PathfindingArg): PathfindingAnimation[] => {
  const animations: PathfindingAnimation[] = [];

  const initEntry: WeightedCoordinate = [[start, null], 0];
  const heap = new Heap<WeightedCoordinate>([initEntry], isLessThan);

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
    animations.push(getPathfindingAnimation("visit", [coordinate]));

    prevs[row][col] = prev || start;
    if (coordinate.isEqual(end)) {
      break;
      // return [visitedCells, prevs];
    }

    const potentialDistanceFromStart = distances[row][col] + 1;
    for (let i = 0; i < ROWS.length; i++) {
      const nextRow = row + ROWS[i];
      const nextCol = col + COLS[i];
      const adjCoordinate = new Coordinate(nextRow, nextCol, grid);

      if (isValidCell(grid, prevs, adjCoordinate)) {
        const adjDistanceFromStart = distances[nextRow][nextCol];
        if (potentialDistanceFromStart < adjDistanceFromStart) {
          distances[nextRow][nextCol] = potentialDistanceFromStart;
          const heuristicWeight = adjCoordinate.getManhattanDistanceFrom(end);
          const nextWeight = potentialDistanceFromStart + heuristicWeight;
          const nextCell: WeightedCoordinate = [
            [adjCoordinate, coordinate],
            nextWeight,
          ];

          heap.push(nextCell);
        }
      }
    }
  }

  if (prevs[end.row][end.col]) {
    const cellsInPath: Coordinate[] = [];
    let currentCell = end;
    while (!currentCell.isEqual(start)) {
      cellsInPath.push(currentCell);
      const nextCell = prevs[currentCell.row][currentCell.col];
      if (nextCell) {
        currentCell = nextCell;
      }
    }
    cellsInPath.push(start);

    const pathSize = cellsInPath.length;
    cellsInPath.forEach((_, i) => {
      animations.push(
        getPathfindingAnimation("trace", [cellsInPath[pathSize - i - 1]])
      );
    });
  }

  return animations;
};
