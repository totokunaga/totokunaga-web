import styles from "@styles/algorithm.module.css";
import Image from "next/image";
import { Arrow } from "../Arrow";
import { CellProp } from "./types";
import StarImage from "@assets/star.svg";
import { useCallback, useMemo } from "react";
import Coordinate from "@utils/classes/Coordinate";

const cellStyle = [
  styles.cell,
  styles.cell_blocked,
  styles.cell_marked,
  styles.cell_in_path,
];

export const CELL_EMPTY = 0;
export const CELL_BLOCKED = 1;
export const CELL_MARKED = 2;
export const CELL_IN_PATH = 3;
export const cellTypes = [
  { type: CELL_EMPTY, name: "Empty" },
  { type: CELL_BLOCKED, name: "Blocked" },
  { type: CELL_MARKED, name: "Visited" },
  { type: CELL_IN_PATH, name: "Path" },
];

export const Cell: React.FC<CellProp> = ({
  size,
  status,
  isStart = false,
  isEnd = false,
  coordinate,
  disabled = false,
  onClick,
}) => {
  const symbolSize = useMemo(() => Math.floor((5 * size) / 6), [size]);

  const onClickCell = useCallback(
    (coordinate?: Coordinate) => {
      if (onClick && coordinate && !disabled && !isStart && !isEnd) {
        onClick(coordinate);
      }
    },
    [coordinate, onClick, isStart, isEnd]
  );

  return (
    <div
      className={cellStyle[status]}
      onClick={() => onClickCell(coordinate)}
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: disabled ? "default" : undefined,
      }}
    >
      {isStart ? <Arrow /> : undefined}
      {isEnd ? (
        <Image
          alt={"star"}
          src={StarImage}
          width={symbolSize}
          height={symbolSize}
        />
      ) : undefined}
    </div>
  );
};
