import { CELL_EMPTY } from "@components/algorithms";
import Coordinate from "@utils/classes/Coordinate";

export const isValidCell = (
  grid: number[][],
  visited: boolean[][],
  coordinate: Coordinate
) => {
  const { row, col } = coordinate;
  const isRowInbound = row >= 0 && row < grid.length;
  const isColInbound = col >= 0 && col < grid[0].length;

  return (
    isRowInbound &&
    isColInbound &&
    !visited[row][col] &&
    grid[row][col] === CELL_EMPTY
  );
};
