import styles from "@styles/algorithm.module.css";
import { CellProp } from "./types";

const cellStyle = [
  styles.boxCell,
  styles.boxCell_blocked,
  styles.boxCell_marked,
];

export const Cell: React.FC<CellProp> = ({
  size,
  status,
  onClick,
  coordinate,
}) => {
  return (
    <div
      className={cellStyle[status]}
      onClick={() => onClick(coordinate)}
      style={{ width: size, height: size }}
    />
  );
};
