import Coordinate from "@utils/classes/Coordinate";
import { getPathfindingAnimation, initMatrix } from "@utils/functions";
import { COLS, ROWS } from "@utils/constants";
import { CellInfo, PathfindingAnimation, PathfindingArg } from "@utils/types";
import { isValidCell } from "./helper-functions";

const recursiveDFS = (
  grid: number[][],
  end: Coordinate,
  current: Coordinate,
  prev: Coordinate | null,
  prevs: (Coordinate | null)[][],
  visitedCells: CellInfo[],
  animations: PathfindingAnimation[]
): [boolean, CellInfo[], (Coordinate | null)[][]] => {
  visitedCells.push([current, prev]);
  animations.push(getPathfindingAnimation("visit", [current]));

  const { row, col } = current;
  if (current.isEqual(end)) {
    return [true, visitedCells, prevs];
  }

  for (let i = 0; i < ROWS.length; i++) {
    const nextRow = row + ROWS[i];
    const nextCol = col + COLS[i];
    const nextCoordinate = new Coordinate(nextRow, nextCol, grid);
    if (isValidCell(grid, prevs, nextCoordinate)) {
      prevs[nextRow][nextCol] = current;
      if (
        recursiveDFS(
          grid,
          end,
          nextCoordinate,
          current,
          prevs,
          visitedCells,
          animations
        )[0]
      ) {
        return [true, visitedCells, prevs];
      }
    }
  }

  return [false, visitedCells, prevs];
};

export const dfs = ({
  grid,
  start,
  end,
}: PathfindingArg): PathfindingAnimation[] => {
  const animations: PathfindingAnimation[] = [];
  const rowSize = grid.length;
  const colSize = grid[0].length;
  const prevs: (Coordinate | null)[][] = initMatrix(rowSize, colSize, null);
  prevs[start.row][start.col] = start;

  const result = recursiveDFS(grid, end, start, null, prevs, [], animations);

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
