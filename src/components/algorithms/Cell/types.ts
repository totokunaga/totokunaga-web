export type CellProp = {
  size: number;
  status: number;
  isStart: boolean;
  isEnd: boolean;
  coordinate: [number, number];
  onClick: (coordinate: [number, number]) => void;
};
