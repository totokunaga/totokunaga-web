import { Dispatch, SetStateAction } from "react";

export type GridProp = {
  rowSize: number;
  colSize: number;
  cellSize?: number;
  // algorithmExecuted: boolean;
  // setAlgorithmExecuted: Dispatch<SetStateAction<boolean>>;
  unmarkExecuted: boolean;
  setUnmarkExecuted: Dispatch<SetStateAction<boolean>>;
};
