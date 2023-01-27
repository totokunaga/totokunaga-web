import Coordinate from "@utils/classes/Coordinate";
import { COLS, ROWS } from "../constants";
import { isValidCell } from "../functions";
import { CellInfo } from "../types";

const recursiveDFS = (
  grid: number[][],
  end: Coordinate,
  current: Coordinate,
  prev: Coordinate | null,
  visited: boolean[][],
  visitedCells: CellInfo[]
): [boolean, CellInfo[]] => {
  visitedCells.push([current, prev]);
  const { row, col } = current;
  if (current.isEqual(end)) {
    return [true, visitedCells];
  }

  for (let i = 0; i < ROWS.length; i++) {
    const nextRow = row + ROWS[i];
    const nextCol = col + COLS[i];
    const nextCoordinate = new Coordinate(nextRow, nextCol);
    if (isValidCell(grid, visited, nextCoordinate)) {
      visited[nextRow][nextCol] = true;
      if (
        recursiveDFS(
          grid,
          end,
          nextCoordinate,
          current,
          visited,
          visitedCells
        )[0]
      ) {
        return [true, visitedCells];
      }
    }
  }

  return [false, visitedCells];
};

export const dfs = (grid: number[][], start: Coordinate, end: Coordinate) => {
  const visited = Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => false)
  );
  visited[start.row][start.col] = true;

  return recursiveDFS(grid, end, start, null, visited, [])[1];
};
