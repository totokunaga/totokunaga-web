import styles from "@styles/algorithm.module.css";
import Image from "next/image";
import { Arrow } from "../Arrow";
import { CellProp } from "./types";
import StarImage from "@assets/star.svg";
import { CELL_SIZE } from "@utils/pathfinding";
import { useMemo } from "react";

const cellStyle = [
  styles.boxCell,
  styles.boxCell_blocked,
  styles.boxCell_marked,
];

export const CELL_EMPTY = 0;
export const CELL_BLOCKED = 1;
export const CELL_MARKED = 2;

export const Cell: React.FC<CellProp> = ({
  size,
  status,
  isStart = false,
  isEnd = false,
  coordinate,
  onClick,
}) => {
  const symbolSize = useMemo(() => Math.floor((5 * size) / 6), [size]);

  return (
    <div
      className={cellStyle[status]}
      onClick={() => onClick(coordinate)}
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
