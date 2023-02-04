import Coordinate from "@utils/classes/Coordinate";
import { CellType, CSSStyle } from "@utils/types";

export type CellProp = CSSStyle & {
  size: number | string;
  status: CellType;
  isStart?: boolean;
  isEnd?: boolean;
  coordinate?: Coordinate;
  disabled?: boolean;
  onClick?: (coordinate: Coordinate) => void;
};
