import { useCallback, useEffect, useState } from "react";

import { CELL_SIZE, MARK_DELAY } from "@utils/pathfinding/constants";
import { Cell, CELL_BLOCKED, CELL_EMPTY, CELL_MARKED } from "../Cell";
import { GridProp } from "./types";
import Coordinate from "@utils/classes/Coordinate";

const Grid: React.FC<GridProp> = (props) => {
  const {
    rowSize,
    colSize,
    cellSize = CELL_SIZE,
    pathfindingAlgorithm,
    algorithmExecuted,
    setAlgorithmExecuted,
    clearExecuted,
    setClearExecuted,
    unmarkExecuted,
    setUnmarkExecuted,
  } = props;

  const [start, setStart] = useState(new Coordinate(0, 0));
  const [end, setEnd] = useState(new Coordinate(rowSize - 1, colSize - 1));
  const [grid, setGrid] = useState(
    Array.from({ length: rowSize }, () =>
      Array.from({ length: colSize }, () => CELL_EMPTY)
    )
  );

  const onClickCell = useCallback(
    (coordinate: Coordinate) => {
      if (!algorithmExecuted) {
        const { row, col } = coordinate;
        const status = grid[row][col];
        grid[row][col] = Math.abs(status - 1);
        setGrid([...grid]);
      }
    },
    [grid, algorithmExecuted]
  );

  const onMarked = useCallback(
    (coordinate: Coordinate) => {
      const { row, col } = coordinate;
      grid[row][col] = CELL_MARKED;
      setGrid([...grid]);
    },
    [grid]
  );

  // When "Start" button is hit
  useEffect(() => {
    if (algorithmExecuted) {
      grid.forEach((r, i) =>
        r.forEach((c, j) => {
          grid[i][j] = grid[i][j] === CELL_BLOCKED ? CELL_BLOCKED : CELL_EMPTY;
        })
      );
      setGrid([...grid]);

      const visitedCells = pathfindingAlgorithm(grid, start, end);
      visitedCells.forEach(([coordinate], i) => {
        setTimeout(() => {
          onMarked(coordinate);
          if (i === visitedCells.length - 1) {
            setAlgorithmExecuted(false);
          }
        }, i * MARK_DELAY);
      });
    }
  }, [
    pathfindingAlgorithm,
    algorithmExecuted,
    setAlgorithmExecuted,
    start,
    end,
  ]);

  // When "Clear" button is hit
  useEffect(() => {
    if (clearExecuted) {
      grid.forEach((r, i) => r.forEach((c, j) => (grid[i][j] = CELL_EMPTY)));
      setGrid([...grid]);
      setClearExecuted(false);
    }
  }, [clearExecuted, setClearExecuted]);

  useEffect(() => {
    if (unmarkExecuted) {
      grid.forEach((r, i) =>
        r.forEach((c, j) => {
          if (grid[i][j] === CELL_MARKED) {
            grid[i][j] = CELL_EMPTY;
          }
        })
      );
      setGrid([...grid]);
      setUnmarkExecuted(false);
    }
  }, [unmarkExecuted, setUnmarkExecuted]);

  // When a client window size is changed
  useEffect(() => {
    const resizedGrid = Array.from({ length: rowSize }, () =>
      Array.from({ length: colSize }, () => CELL_EMPTY)
    );

    const resizedRow = resizedGrid.length;
    const resizedCol = resizedRow ? resizedGrid[0].length : 0;
    const middleRow = Math.floor(resizedRow / 2);
    const middleCol = Math.floor(resizedCol / 2);
    setStart(new Coordinate(middleRow, Math.floor(resizedCol / 4)));
    setEnd(new Coordinate(middleRow, Math.floor((3 * resizedCol) / 4)));

    const oneThirdRow = Math.floor(resizedRow / 3);
    if (middleCol) {
      for (let r = oneThirdRow; r < (oneThirdRow + 1) * 2; r++) {
        if (resizedGrid.length > 0) {
          resizedGrid[r][middleCol] = CELL_BLOCKED;
        }
      }
    }
    setGrid(resizedGrid);
  }, [rowSize, colSize]);

  return (
    <div>
      {grid.map((row, r) => (
        <div key={r} style={{ display: "flex" }}>
          {row.map((type, c) => (
            <Cell
              key={c}
              size={cellSize}
              status={type}
              isStart={start.isEqual(new Coordinate(r, c))}
              isEnd={end.isEqual(new Coordinate(r, c))}
              coordinate={new Coordinate(r, c)}
              onClick={onClickCell}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
