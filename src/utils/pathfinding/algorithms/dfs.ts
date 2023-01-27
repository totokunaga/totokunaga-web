import { COLS, ROWS } from "../constants";
import { isValidCell } from "../functions";
import { CellInfo, Coordinate } from "../types";

const recursiveDFS = (
  grid: number[][],
  end: Coordinate,
  current: Coordinate,
  prev: Coordinate | null,
  visited: boolean[][],
  visitedCells: CellInfo[]
): [boolean, CellInfo[]] => {
  visitedCells.push([...current, prev]);
  const [r, c] = current;
  if (r === end[0] && c === end[1]) {
    return [true, visitedCells];
  }

  for (let i = 0; i < ROWS.length; i++) {
    const nextRow = r + ROWS[i];
    const nextCol = c + COLS[i];
    if (isValidCell(grid, visited, nextRow, nextCol)) {
      visited[nextRow][nextCol] = true;
      const next: Coordinate = [nextRow, nextCol];
      if (recursiveDFS(grid, end, next, current, visited, visitedCells)[0]) {
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
  visited[start[0]][start[1]] = true;

  return recursiveDFS(grid, end, start, null, visited, [])[1];
};
