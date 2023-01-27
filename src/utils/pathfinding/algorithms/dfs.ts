import Coordinate from "@utils/classes/Coordinate";
import { COLS, ROWS } from "../constants";
import { isValidCell } from "../functions";
import { CellInfo } from "../types";

const recursiveDFS = (
  grid: number[][],
  end: Coordinate,
  current: Coordinate,
  prev: Coordinate | null,
  prevs: (Coordinate | null)[][],
  visitedCells: CellInfo[]
): [boolean, CellInfo[], (Coordinate | null)[][]] => {
  visitedCells.push([current, prev]);
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
        recursiveDFS(grid, end, nextCoordinate, current, prevs, visitedCells)[0]
      ) {
        return [true, visitedCells, prevs];
      }
    }
  }

  return [false, visitedCells, prevs];
};

export const dfs = (grid: number[][], start: Coordinate, end: Coordinate) => {
  const prevs: (Coordinate | null)[][] = Array.from(
    { length: grid.length },
    () => Array.from({ length: grid[0].length }, () => null)
  );
  prevs[start.row][start.col] = start;

  const result = recursiveDFS(grid, end, start, null, prevs, []);
  return [result[1], result[2]];
};
