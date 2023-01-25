import { COLS, ROWS } from "./constants";
import { isValidCell } from "./functions";
import { CellInfo } from "./types";

const bfs = (
  grid: number[][],
  start: [number, number],
  end: [number, number]
) => {
  let q: CellInfo[] = [[...start, null]];
  const visited = Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => false)
  );
  const visitedCells: CellInfo[] = [];

  visited[start[0]][start[1]] = true;

  while (q.length > 0) {
    const next: CellInfo[] = [];

    for (const [r, c, prev] of q) {
      visitedCells.push([r, c, prev]);
      if (r === end[0] && c === end[1]) {
        return visitedCells;
      }

      for (let i = 0; i < ROWS.length; i++) {
        const nextRow = r + ROWS[i];
        const nextCol = c + COLS[i];
        if (isValidCell(grid, visited, nextRow, nextCol)) {
          visited[nextRow][nextCol] = true;
          next.push([nextRow, nextCol, [r, c]]);
        }
      }
    }

    q = next;
  }

  return visitedCells;
};

export { bfs };
