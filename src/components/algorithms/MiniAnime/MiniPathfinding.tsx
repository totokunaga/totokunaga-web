import { initMatrix } from "@utils/functions";
import { BLOCKED_2, cellMap, EMPTY_0, PATH_3 } from "@utils/types";
import { useEffect, useState } from "react";
import { Cell } from "../pathfinding";

const gridSize = 5;
const startAnimationOffset = 100;
const restartAnimationOffset = 1500;
const animationSpeed = 250;
const cellAnimationOrder: {
  r: number;
  c: number;
  cellType: number;
  additionalTimeout?: number;
}[] = [
  { r: 1, c: 2, cellType: BLOCKED_2 },
  { r: 2, c: 2, cellType: BLOCKED_2 },
  { r: 3, c: 2, cellType: BLOCKED_2 },
  { r: 2, c: 0, cellType: PATH_3, additionalTimeout: 500 },
  { r: 2, c: 1, cellType: PATH_3 },
  { r: 1, c: 1, cellType: PATH_3 },
  { r: 0, c: 1, cellType: PATH_3 },
  { r: 0, c: 2, cellType: PATH_3 },
  { r: 0, c: 3, cellType: PATH_3 },
  { r: 0, c: 4, cellType: PATH_3 },
  { r: 1, c: 4, cellType: PATH_3 },
  { r: 2, c: 4, cellType: PATH_3 },
  { r: 3, c: 4, cellType: PATH_3 },
  { r: 4, c: 4, cellType: PATH_3 },
];

export const MiniPathfinding: React.FC = () => {
  const [grid, setGrid] = useState(initMatrix(gridSize, gridSize, EMPTY_0));
  const [doneAnimation, setDoneAnimation] = useState(false);

  useEffect(() => {
    if (doneAnimation) {
      setTimeout(() => {
        setGrid(initMatrix(gridSize, gridSize, EMPTY_0));
        setDoneAnimation(false);
      }, restartAnimationOffset);
    } else {
      let extraTimeout = 0;
      cellAnimationOrder.forEach(({ r, c, cellType, additionalTimeout }, i) => {
        extraTimeout += additionalTimeout || 0;
        setTimeout(() => {
          grid[r][c] = cellType;
          setGrid([...grid]);
          if (i === cellAnimationOrder.length - 1) {
            setDoneAnimation(true);
          }
        }, startAnimationOffset + animationSpeed * i + extraTimeout);
      });
    }
  }, [doneAnimation]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      {grid.map((row, r) => (
        <div key={r} style={{ display: "flex" }}>
          {row.map((value, c) => {
            const isStart = r === 2 && c == 0;
            const isEnd = r === 4 && c == 4;
            return (
              <Cell
                key={c}
                status={cellMap[value]}
                isStart={isStart}
                isEnd={isEnd}
                size={"min(9vw, 35px)"}
                cursor={"pointer"}
                margin={"min(.5vw, 2.5px)"}
                disabled={true}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};