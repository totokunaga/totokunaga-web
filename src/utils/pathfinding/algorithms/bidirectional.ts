import Coordinate from "@utils/classes/Coordinate";
import { initMatrix } from "@utils/functions";
import { COLS, ROWS } from "../constants";
import { isValidCell } from "../functions";
import { CellInfo } from "../types";

export const bidirectional = (
  grid: number[][],
  start: Coordinate,
  end: Coordinate
): [CellInfo[], (Coordinate | null)[][]] => {
  let qStart: CellInfo[] = [[start, null]];
  let qEnd: CellInfo[] = [[end, null]];
  const rowSize = grid.length;
  const colSize = grid[0].length;
  const prevs: (Coordinate | null)[][] = initMatrix(rowSize, colSize, null);
  const types = initMatrix(rowSize, colSize, 0);
  const visitedCells: CellInfo[] = [];

  prevs[start.row][start.col] = start;
  types[start.row][start.col] = 1;
  prevs[end.row][end.col] = end;
  types[end.row][end.col] = -1;

  let pathFound = false;
  while (!pathFound || qStart.length > 0 || qEnd.length > 0) {
    let nextStart: CellInfo[] = [];
    let nextEnd: CellInfo[] = [];

    while (qStart.length > 0 && qEnd.length > 0) {
      const [currentStart, prevStart] = qStart.pop() as CellInfo;
      const [currentEnd, prevEnd] = qEnd.pop() as CellInfo;

      visitedCells.push([currentStart, prevStart]);
      visitedCells.push([currentEnd, prevEnd]);
      const { row: rowStart, col: colStart } = currentStart;
      const { row: rowEnd, col: colEnd } = currentEnd;

      if (
        currentStart.isEqual(currentEnd) ||
        types[rowStart][colStart] === -1 ||
        types[rowEnd][colEnd] === 1
      ) {
        pathFound = true;
        console.log("called 1");
        break;
      }

      for (let i = 0; i < ROWS.length; i++) {
        const nextRowStart = rowStart + ROWS[i];
        const nextColStart = colStart + COLS[i];
        const nextRowEnd = rowEnd + ROWS[i];
        const nextColEnd = colEnd + COLS[i];
        const nextCoordinateStart = new Coordinate(
          nextRowStart,
          nextColStart,
          grid
        );
        const nextCoordinateEnd = new Coordinate(nextRowEnd, nextColEnd, grid);
        if (isValidCell(grid, prevs, nextCoordinateStart)) {
          prevs[nextRowStart][nextColStart] = currentStart;
          types[nextRowStart][nextColStart] = 1;
          nextStart.push([nextCoordinateStart, currentStart]);
        }
        if (isValidCell(grid, prevs, nextCoordinateEnd)) {
          prevs[nextRowEnd][nextColEnd] = currentStart;
          types[nextRowEnd][nextColEnd] = -1;
          nextEnd.push([nextCoordinateEnd, currentEnd]);
        }
      }
    }

    while (qStart.length > 0) {
      const q = qStart;
      const next = nextStart;
      const [current, prev] = q.pop() as CellInfo;
      visitedCells.push([current, prev]);

      const { row, col } = current;
      if (types[row][col] === -1) {
        pathFound = true;
        console.log("called 2", row, col);
        break;
      }

      for (let i = 0; i < ROWS.length; i++) {
        const nextRow = row + ROWS[i];
        const nextCol = col + COLS[i];
        const nextCoordinateStart = new Coordinate(nextRow, nextCol, grid);
        if (isValidCell(grid, prevs, nextCoordinateStart)) {
          prevs[nextRow][nextCol] = current;
          types[nextRow][nextCol] = -1;
          next.push([nextCoordinateStart, current]);
        }
      }

      nextStart = next;
    }

    while (qEnd.length > 0) {
      const q = qEnd;
      const next = nextEnd;
      const [current, prev] = q.pop() as CellInfo;
      visitedCells.push([current, prev]);

      const { row, col } = current;
      if (types[row][col] === 1) {
        pathFound = true;
        console.log("called 3");
        break;
      }

      for (let i = 0; i < ROWS.length; i++) {
        const nextRow = row + ROWS[i];
        const nextCol = col + COLS[i];
        const nextCoordinateEnd = new Coordinate(nextRow, nextCol, grid);
        if (isValidCell(grid, prevs, nextCoordinateEnd)) {
          prevs[nextRow][nextCol] = current;
          types[nextRow][nextCol] = -1;
          next.push([nextCoordinateEnd, current]);
        }
      }

      nextEnd = next;
    }

    qStart = nextStart;
    qEnd = nextEnd;
  }

  console.log("called", visitedCells, types);
  return [visitedCells, prevs];
};
