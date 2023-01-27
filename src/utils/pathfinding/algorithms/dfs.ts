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
) => {
  visitedCells.push([...current, prev]);
  const [r, c] = current;
  if (r === end[0] && c === end[1]) {
    return true;
  }

  for (let i = 0; i < ROWS.length; i++) {
    const nextRow = r + ROWS[i];
    const nextCol = c + COLS[i];
    if (isValidCell(grid, visited, nextRow, nextCol)) {
      visited[nextRow][nextCol] = true;
      const next: Coordinate = [nextRow, nextCol];
      if (recursiveDFS(grid, end, next, current, visited, visitedCells)) {
        return true;
      }
    }
  }

  return false;
};

const dfs = (
  grid: number[][],
  start: [number, number],
  end: [number, number]
) => {
  const visited = Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => false)
  );
  visited[start[0]][start[1]] = true;

  const visitedCells: CellInfo[] = [];
  recursiveDFS(grid, end, start, null, visited, visitedCells);

  for (let i = 0; i < visitedCells.length; i++) {
    const cell = visitedCells[i];
    if (cell[0] === end[0] && cell[1] === end[1]) {
      console.log(i, visitedCells);
    }
  }
  return visitedCells;
};

export { dfs };
