export type BarStatus = "normal" | "swap" | "focus" | "done";
export type SortingAnimationType =
  | BarStatus
  | "clear"
  | "reset"
  | "move"
  | "none";

export class SortingPrevAnimationType {
  type: SortingAnimationType;

  constructor(type: SortingAnimationType) {
    this.type = type;
  }
}

export type SortableBar = {
  value: number;
  status: SortingAnimationType;
  relativeIndex: number;
};

export type InnerValue = {
  value: number;
  status: SortingAnimationType;
  size: number;
  left: number | string;
};

export type SortingAnimation = {
  type: SortingAnimationType;
  positionOne?: number;
  positionTwo?: number;
  positions?: number[];
  duration: number;
};

export type SortingAlgorithm =
  | "Quicksort"
  | "Selection"
  | "Bubble"
  | "Insertion"
  | "Heapsort";
export type SortingFunction = (values: number[]) => SortingAnimation[];
