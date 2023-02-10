import style from "./cell.module.scss";
import { Arrow } from "../Arrow";
import { useCallback, useMemo } from "react";
import Coordinate from "@utils/classes/Coordinate";
import { Icon } from "@components/common";
import { CellType, CSSStyle } from "@utils/types";

type TestCellProp = CSSStyle & {
  status: CellType;
  height: number | string;
  width: number | string;
  isStart?: boolean;
  isEnd?: boolean;
  coordinate?: Coordinate;
  disabled?: boolean;
  onClick?: (coordinate: Coordinate) => void;
};

export const TestCell: React.FC<TestCellProp> = ({
  width,
  height,
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
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: disabled ? "default" : undefined,
        ...prop,
      }}
    >
      {isStart && (
        <Icon icon={"chevron"} width={"80%"} height={"80%"} margin={"auto"} />
      )}
      {isEnd && (
        <Icon
          icon={"star"}
          width={"80%"}
          height={"80%"}
          fill={"#F4BB44"}
          margin={"auto"}
        />
      )}
    </div>
  );
};
