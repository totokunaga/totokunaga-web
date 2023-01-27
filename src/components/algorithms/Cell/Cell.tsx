import styles from "@styles/algorithm.module.css";
import Image from "next/image";
import { Arrow } from "../Arrow";
import { CellProp } from "./types";
import StarImage from "@assets/star.svg";

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
        <Image alt={"star"} src={StarImage} width={25} height={25} />
      ) : undefined}
    </div>
  );
};
