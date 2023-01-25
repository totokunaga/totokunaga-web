export type CellProp = {
  size: number;
  status: number;
  coordinate: [number, number];
  onClick: (coordinate: [number, number]) => void;
};
