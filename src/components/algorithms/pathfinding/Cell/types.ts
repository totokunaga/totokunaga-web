import Coordinate from "@utils/classes/Coordinate";
import { CellType, CSSStyle } from "@utils/types";

export type CellProp = CSSStyle & {
  status: CellType;
  height: number | string;
  width: number | string;
  isStart?: boolean;
  isEnd?: boolean;
  coordinate?: Coordinate;
  disabled?: boolean;
  onClick?: (coordinate: Coordinate) => void;
};
