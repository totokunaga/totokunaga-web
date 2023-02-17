import style from "./cell.module.scss";
import { useCallback, useMemo } from "react";
import Coordinate from "@utils/classes/Coordinate";
import { Icon } from "@components/common";
import {
  BLOCKED,
  CellType,
  ClearableCellType,
  PATH,
  VISITED,
} from "@utils/types";
import { CellProp } from "./types";

export const cellTypes: Array<ClearableCellType> = [BLOCKED, VISITED, PATH];
const whiteArrowCells = new Set<CellType>(["Empty", "Visited", "Unhoverable"]);

export const Cell: React.FC<CellProp> = ({
  width,
  height,
  status,
  isStart = false,
  isEnd = false,
  coordinate,
  disabled = false,
  onClick,
  darkMode,
  ...prop
}) => {
  const cellClassName = useMemo(() => {
    const classes = [style.cell, style[status]];
    if (disabled) classes.push(style.disabled);
    return classes.join(" ");
  }, [status]);

  const onClickCell = useCallback(
    (coordinate?: Coordinate) => {
      if (onClick && coordinate && !disabled) {
        onClick(coordinate);
      }
    },
    [coordinate, onClick, isStart, isEnd, disabled]
  );

  return (
    <div
      className={cellClassName}
      onClick={() => onClickCell(coordinate)}
      style={{
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: disabled ? "default" : undefined,
        ...prop,
      }}
    >
      <div>
        {isStart && (
          <Icon
            icon={
              darkMode && whiteArrowCells.has(status)
                ? "chevron-white"
                : "chevron"
            }
            width={"100%"}
            height={"100%"}
            margin={"auto"}
          />
        )}
        {isEnd && (
          <Icon
            icon={"star"}
            width={"88%"}
            height={"88%"}
            fill={"#F4BB44"}
            margin={"auto"}
          />
        )}
      </div>
    </div>
  );
};
