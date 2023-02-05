import style from "./cell.module.scss";
import { Arrow } from "../Arrow";
import { CellProp } from "./types";
import { useCallback, useMemo } from "react";
import Coordinate from "@utils/classes/Coordinate";
import { ClearableCellType, BLOCKED, PATH, VISITED } from "@utils/types";
import { Icon } from "@components/common";

export const cellTypes: Array<ClearableCellType> = [BLOCKED, VISITED, PATH];

export const Cell: React.FC<CellProp> = ({
  size,
  status,
  isStart = false,
  isEnd = false,
  coordinate,
  disabled = false,
  onClick,
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
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: disabled ? "default" : undefined,
        ...prop,
      }}
    >
      {isStart ? <Arrow /> : undefined}
      {isEnd ? (
        <Icon
          icon={"star"}
          width={"1.4rem"}
          height={"1.4rem"}
          fill={"#F4BB44"}
        />
      ) : undefined}
    </div>
  );
};
