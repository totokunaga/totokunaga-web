import Coordinate from "@utils/classes/Coordinate";
import { CellType } from "@utils/types";

export type CellProp = {
  size: number;
  status: CellType;
  isStart?: boolean;
  isEnd?: boolean;
  coordinate?: Coordinate;
  disabled?: boolean;
  onClick?: (coordinate: Coordinate) => void;
};
