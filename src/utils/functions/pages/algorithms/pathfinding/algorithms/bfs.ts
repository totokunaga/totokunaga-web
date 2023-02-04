import Coordinate from "@utils/classes/Coordinate";
import { initMatrix } from "@utils/functions";
import { COLS, ROWS } from "@utils/constants";
import { CellInfo, PathfindingArg } from "@utils/types";
import { isValidCell } from "./helper-functions";

export const bfs = ({
  grid,
  start,
  end,
}: PathfindingArg): [CellInfo[], (Coordinate | null)[][]] => {
  let q: CellInfo[] = [[start, null]];
  const rowSize = grid.length;
  const colSize = grid[0].length;
  const prevs: (Coordinate | null)[][] = initMatrix(rowSize, colSize, null);
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
