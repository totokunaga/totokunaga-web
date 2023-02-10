import Coordinate from "@utils/classes/Coordinate";
import { getPathfindingAnimation, initMatrix } from "@utils/functions";
import { COLS, ROWS } from "@utils/constants";
import { CellInfo, PathfindingAnimation, PathfindingArg } from "@utils/types";
import { isValidCell } from "./helper-functions";

export const randomWalk = ({
  grid,
  start,
  end,
}: PathfindingArg): PathfindingAnimation[] => {
  const animations: PathfindingAnimation[] = [];

  let cells: CellInfo[] = [[start, null]];
  const rowSize = grid.length;
  const colSize = grid[0].length;
  const prevs: (Coordinate | null)[][] = initMatrix(rowSize, colSize, null);
  const visitedCells: CellInfo[] = [];

  prevs[start.row][start.col] = start;
  let pathFound = false;

  while (!pathFound && cells.length > 0) {
    const n = cells.length;
    const randomIndex = Math.round(Math.random() * (n - 1));
    const [current, prev] = cells[randomIndex];

    const { row, col } = current;
    visitedCells.push([current, prev]);
    animations.push(getPathfindingAnimation("visit", [current]));
    if (current.isEqual(end)) {
      pathFound = true;
      break;
    }

    for (let i = 0; i < ROWS.length; i++) {
      const nextRow = row + ROWS[i];
      const nextCol = col + COLS[i];
      const nextCoordinate = new Coordinate(nextRow, nextCol, grid);
      if (isValidCell(grid, prevs, nextCoordinate)) {
        prevs[nextRow][nextCol] = current;
        cells.push([nextCoordinate, current]);
      }
    }

    // const next: CellInfo[] = [];

    // for (const [current, prev] of cells) {
    //   const { row, col } = current;
    //   visitedCells.push([current, prev]);
    //   animations.push(getPathfindingAnimation("visit", [current]));
    //   if (current.isEqual(end)) {
    //     pathFound = true;
    //     break;
    //   }

    //   const candidateCoordinates: Coordinate[] = [];
    //   for (let i = 0; i < ROWS.length; i++) {
    //     const nextRow = row + ROWS[i];
    //     const nextCol = col + COLS[i];
    //     const nextCoordinate = new Coordinate(nextRow, nextCol, grid);
    //     if (isValidCell(grid, prevs, nextCoordinate)) {
    //       prevs[nextRow][nextCol] = current;
    //       next.push([nextCoordinate, current]);
    //       candidateCoordinates.push(nextCoordinate);
    //     }
    //   }
    // }

    // cells = next;
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
