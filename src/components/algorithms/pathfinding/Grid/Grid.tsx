import { useCallback, useEffect, useState } from "react";

import { pathfindingPageId } from "@utils/constants";
import { TestCell } from "../Cell";
import { GridProp } from "./types";
import Coordinate from "@utils/classes/Coordinate";
import {
  animateCell,
  initMatrix,
  pathfindingAlgorithms,
} from "@utils/functions";
import { useSelector } from "react-redux";
import {
  selectPathfindingController,
  setClearExecuted,
  setPathfindingAlgorithmExecuted,
} from "@utils/slices";
import { useDispatch } from "react-redux";
import {
  BLOCKED_2,
  cellMap,
  EMPTY_0,
  PATH_3,
  SELECTED_4,
  VISITED_1,
} from "@utils/types";

export const Grid: React.FC<GridProp> = (props) => {
  const { rowSize, colSize, unmarkExecuted, setUnmarkExecuted } = props;

  const [grid, setGrid] = useState(initMatrix(rowSize, colSize, EMPTY_0));
  const [start, setStart] = useState(new Coordinate(0, 0, grid));
  const [end, setEnd] = useState(
    new Coordinate(rowSize - 1, colSize - 1, grid)
  );
  const [isStartFocused, setStartFocused] = useState(false);
  const [isEndFocused, setEndFocused] = useState(false);

  const dispatch = useDispatch();
  const { clearExecuted, clearableCells, algorithm, algorithmExecuted } =
    useSelector(selectPathfindingController);

  const onClickCell = useCallback(
    (coordinate: Coordinate) => {
      if (!algorithmExecuted) {
        const { row, col } = coordinate;
        if (isStartFocused || isEndFocused) {
          if (!coordinate.isEqual(end) && !coordinate.isEqual(start)) {
            if (isStartFocused) {
              setStart(coordinate);
              setStartFocused(false);
              grid[start.row][start.col] = EMPTY_0;
            } else {
              setEnd(coordinate);
              setEndFocused(false);
              grid[end.row][end.col] = EMPTY_0;
            }
            grid[row][col] = EMPTY_0;
            setGrid([...grid]);
          }
        } else {
          if (coordinate.isEqual(start)) {
            setStartFocused(true);
            grid[row][col] = SELECTED_4;
          } else if (coordinate.isEqual(end)) {
            setEndFocused(true);
            grid[row][col] = SELECTED_4;
          } else {
            const status = grid[row][col];
            grid[row][col] = status !== BLOCKED_2 ? BLOCKED_2 : EMPTY_0;
          }
          setGrid([...grid]);
        }
      }
    },
    [start, end, grid, algorithmExecuted, isStartFocused, isEndFocused]
  );

  // When "Start" button is hit
  useEffect(() => {
    if (algorithmExecuted) {
      grid.forEach((r, i) =>
        r.forEach((c, j) => {
          grid[i][j] = grid[i][j] === BLOCKED_2 ? BLOCKED_2 : EMPTY_0;
        })
      );
      setGrid([...grid]);

      const animations = pathfindingAlgorithms[algorithm]({ grid, start, end });

      let timeoutAmount = 0;
      let baseGrid = grid;
      animations.forEach((animation, i) => {
        setTimeout(() => {
          const newGrid = animateCell(baseGrid, animation);
          baseGrid = newGrid;
          setGrid(newGrid);

          if (i === animations.length - 1) {
            dispatch(setPathfindingAlgorithmExecuted(false));
          }
        }, timeoutAmount);

        timeoutAmount += animation.duration;
      });
    }
  }, [dispatch, algorithm, algorithmExecuted, start, end]);

  // When "Clear" button is hit
  useEffect(() => {
    if (clearExecuted) {
      grid.forEach((r, i) =>
        r.forEach((c, j) => {
          if (clearableCells.Blocked && grid[i][j] === BLOCKED_2)
            grid[i][j] = EMPTY_0;
          else if (clearableCells.Path && grid[i][j] === PATH_3)
            grid[i][j] = EMPTY_0;
          else if (clearableCells.Visited && grid[i][j] === VISITED_1)
            grid[i][j] = EMPTY_0;
        })
      );
      setGrid([...grid]);
      dispatch(setClearExecuted(false));
    }
  }, [clearExecuted]);

  // When non-blocked cell clear
  useEffect(() => {
    if (unmarkExecuted) {
      grid.forEach((r, i) =>
        r.forEach((c, j) => {
          if (grid[i][j] !== BLOCKED_2) {
            grid[i][j] = EMPTY_0;
          }
        })
      );
      setGrid([...grid]);
      setUnmarkExecuted(false);
    }
  }, [unmarkExecuted, setUnmarkExecuted]);

  // When a client window size is changed
  useEffect(() => {
    const resizedGrid = initMatrix(rowSize, colSize, EMPTY_0);

    const resizedRow = resizedGrid.length;
    const resizedCol = resizedRow ? resizedGrid[0].length : 0;
    const middleRow = Math.floor(resizedRow / 2);
    const middleCol = Math.floor(resizedCol / 2);
    setStart(new Coordinate(middleRow, Math.floor(resizedCol / 4), grid));
    setEnd(new Coordinate(middleRow, Math.floor((3 * resizedCol) / 4), grid));

    const oneThirdRow = Math.floor(resizedRow / 3);
    if (middleCol) {
      for (let r = oneThirdRow; r < (oneThirdRow + 1) * 2; r++) {
        if (resizedGrid.length > 0) {
          resizedGrid[r][middleCol] = BLOCKED_2;
        }
      }
    }
    setGrid(resizedGrid);
  }, [rowSize, colSize]);

  return (
    <div
      id={pathfindingPageId}
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {grid.map((row, r) => (
        <div
          key={r}
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            height: "100%",
          }}
        >
          {row.map((type, c) => {
            const coordinate = new Coordinate(r, c, grid);
            const isStart = start.isEqual(coordinate);
            const isEnd = end.isEqual(coordinate);
            return (
              <TestCell
                key={c}
                width={`100%`}
                height={`95%`}
                status={cellMap[type]}
                isStart={isStart}
                isEnd={isEnd}
                coordinate={coordinate}
                onClick={onClickCell}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
