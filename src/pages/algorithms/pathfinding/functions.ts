import { CELL_EMPTY } from "@components/algorithms";

export const isValidCell = (
  grid: number[][],
  visited: boolean[][],
  row: number,
  col: number
) => {
  return (
    row >= 0 &&
    row < grid.length &&
    col >= 0 &&
    col < grid[0].length &&
    !visited[row][col] &&
    grid[row][col] === CELL_EMPTY
  );
};
