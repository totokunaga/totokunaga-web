import Coordinate from "@utils/classes/Coordinate";

export type CellProp = {
  size: number;
  status: number;
  isStart?: boolean;
  isEnd?: boolean;
  coordinate?: Coordinate;
  disabled?: boolean;
  onClick?: (coordinate: Coordinate) => void;
};
