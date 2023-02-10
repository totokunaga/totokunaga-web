import Coordinate from "@utils/classes/Coordinate";
import { getPathfindingAnimation, initMatrix } from "@utils/functions";
import { COLS, ROWS } from "@utils/constants";
import { CellInfo, PathfindingAnimation, PathfindingArg } from "@utils/types";
import { isValidCell } from "./helper-functions";

export const bfs = ({
  grid,
  start,
  end,
}: PathfindingArg): PathfindingAnimation[] => {
  const animations: PathfindingAnimation[] = [];

  let q: CellInfo[] = [[start, null]];
  const rowSize = grid.length;
  const colSize = grid[0].length;
  const prevs: (Coordinate | null)[][] = initMatrix(rowSize, colSize, null);
  const visitedCells: CellInfo[] = [];

  prevs[start.row][start.col] = start;
  let pathFound = false;

  while (!pathFound && q.length > 0) {
    const next: CellInfo[] = [];

    for (const [current, prev] of q) {
      const { row, col } = current;
      visitedCells.push([current, prev]);
      animations.push(getPathfindingAnimation("visit", [current]));
      if (current.isEqual(end)) {
        pathFound = true;
        break;
      }

      const candidateCoordinates: Coordinate[] = [];
      for (let i = 0; i < ROWS.length; i++) {
        const nextRow = row + ROWS[i];
        const nextCol = col + COLS[i];
        const nextCoordinate = new Coordinate(nextRow, nextCol, grid);
        if (isValidCell(grid, prevs, nextCoordinate)) {
          prevs[nextRow][nextCol] = current;
          next.push([nextCoordinate, current]);
          candidateCoordinates.push(nextCoordinate);
        }
      }
    }

    q = next;
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
