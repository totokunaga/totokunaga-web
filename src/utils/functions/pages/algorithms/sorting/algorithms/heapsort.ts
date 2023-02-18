import Heap from "@utils/classes/Heap";
import { SortingAnimation, SortingPrevAnimationType } from "@utils/types";
import { swap } from ".";
import { getSortingAnimation } from "..";

export const heapsort = (values: number[]) => {
  const animations: SortingAnimation[] = [];
  const prevAnimation = new SortingPrevAnimationType("none");

  const clone = [...values];
  const swapCallback = (i: number, j: number) => {
    if (i !== j) {
      swap(values, i, j);
      animations.push(getSortingAnimation("swap", [i, j], prevAnimation));
      animations.push(getSortingAnimation("clear", [i, j], prevAnimation));
    }
  };
  const popCallback = (i: number) => {
    animations.push(getSortingAnimation("done", [i], prevAnimation));
  };

  const heap = new Heap(
    clone,
    (one, two) => one > two,
    swapCallback,
    popCallback
  );

  while (heap.size() > 0) {
    heap.pop();
  }

  return animations;
};
